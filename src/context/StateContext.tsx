import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Challenge, 
  CitizenReport, 
  CredentialRecord, 
  AuditEntry, 
  SystemNotification, 
  UserRole,
  PriorityLevel,
  UniversityTeam,
  IndustrySupport,
  FieldEvidence,
  ImpactVerification,
  UserProfile
} from '../types';
import { 
  MOCK_CITIZEN_REPORTS_JH_1042, 
  INITIAL_CHALLENGES, 
  INITIAL_CREDENTIALS, 
  INITIAL_AUDIT_LOGS, 
  INITIAL_NOTIFICATIONS 
} from '../data/mockData';
import { analyzeReportSimilarity } from '../services/duplicateService';

export const ROLE_PROFILES: Record<UserRole, UserProfile> = {
  government: {
    id: 'usr-gov-01',
    name: 'Sanjay K. Verma, IAS',
    email: 'dm.dumka@jharkhand.gov.in',
    role: 'government',
    title: 'District Magistrate & Collector',
    organization: 'District Administration Dumka',
    location: 'Dumka, Jharkhand',
  },
  citizen: {
    id: 'usr-cit-01',
    name: 'Sunita Soren',
    email: 'sunita.soren@hansdiha.org',
    role: 'citizen',
    title: 'Citizen Reporter & Community Lead',
    organization: 'Hansdiha Gram Sabha',
    location: 'Hansdiha, Dumka',
  },
  student: {
    id: 'usr-stu-01',
    name: 'Aarav Sengupta',
    email: 'aarav.sengupta@bitmesra.ac.in',
    role: 'student',
    title: 'Student Team Lead (AquaShield)',
    organization: 'BIT Mesra, Ranchi',
    location: 'Ranchi, Jharkhand',
  },
  mentor: {
    id: 'usr-men-01',
    name: 'Dr. Rameshwar Mahato',
    email: 'r.mahato@bitmesra.ac.in',
    role: 'mentor',
    title: 'Professor of Fluid Dynamics',
    organization: 'BIT Mesra Department of Civil Engineering',
    location: 'Ranchi, Jharkhand',
  },
  industry: {
    id: 'usr-ind-01',
    name: 'Er. Rajesh Sharma',
    email: 'rajesh.sharma@tatasteel.com',
    role: 'industry',
    title: 'Lead Water Treatment Specialist',
    organization: 'Tata Steel CSR Foundation',
    location: 'Jamshedpur, Jharkhand',
  },
  ngo: {
    id: 'usr-ngo-01',
    name: 'Anita Murmu',
    email: 'anita@prathamvikas.org',
    role: 'ngo',
    title: 'Field Operations Coordinator',
    organization: 'Pratham Gramin Vikas Trust',
    location: 'Dumka, Jharkhand',
  },
};

interface Toast {
  id: string;
  title: string;
  description: string;
  type: 'success' | 'info' | 'warning';
}

interface StateContextType {
  role: UserRole;
  switchRole: (newRole: UserRole) => void;
  isAuthenticated: boolean;
  currentUser: UserProfile | null;
  login: (role: UserRole) => void;
  logout: () => void;
  challenges: Challenge[];
  reports: CitizenReport[];
  credentials: CredentialRecord[];
  auditLogs: AuditEntry[];
  notifications: SystemNotification[];
  toasts: Toast[];
  dismissToast: (id: string) => void;
  goldenStep: number;
  setGoldenStep: (step: number) => void;
  // Actions
  submitCitizenReport: (report: Omit<CitizenReport, 'id' | 'trackingId' | 'status' | 'createdAt' | 'updatedAt'>) => CitizenReport;
  verifyChallenge: (challengeId: string, officerName?: string) => void;
  overridePriority: (challengeId: string, newScore: number, newLevel: PriorityLevel, reason: string, officerName?: string) => void;
  adoptChallenge: (challengeId: string, proposal: Partial<UniversityTeam>) => void;
  approveMentorProposal: (challengeId: string, mentorNotes?: string) => void;
  commitIndustrySupport: (challengeId: string, support: Partial<IndustrySupport>) => void;
  submitFieldEvidence: (challengeId: string, evidence: Partial<FieldEvidence>) => void;
  verifyImpact: (challengeId: string, verificationData: Partial<ImpactVerification>) => CredentialRecord;
  resetToDemoDefaults: () => void;
  addToast: (title: string, description: string, type?: 'success' | 'info' | 'warning') => void;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

const STORAGE_KEY_CHALLENGES = 'samadhansetu_challenges_v2';
const STORAGE_KEY_REPORTS = 'samadhansetu_reports_v2';
const STORAGE_KEY_CREDENTIALS = 'samadhansetu_credentials_v2';
const STORAGE_KEY_LOGS = 'samadhansetu_logs_v2';
const STORAGE_KEY_ROLE = 'samadhansetu_role_v2';
const STORAGE_KEY_AUTH = 'samadhansetu_auth_v2';

export const StateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY_ROLE) || localStorage.getItem(STORAGE_KEY_ROLE);
    return (saved as UserRole) || 'government';
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY_AUTH);
    // Default is LOGGED OUT (false) on clean visit!
    return saved === 'true';
  });

  const currentUser = isAuthenticated ? ROLE_PROFILES[role] : null;

  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_CHALLENGES);
    return saved ? JSON.parse(saved) : INITIAL_CHALLENGES;
  });

  const [reports, setReports] = useState<CitizenReport[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_REPORTS);
    return saved ? JSON.parse(saved) : MOCK_CITIZEN_REPORTS_JH_1042;
  });

  const [credentials, setCredentials] = useState<CredentialRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_CREDENTIALS);
    return saved ? JSON.parse(saved) : INITIAL_CREDENTIALS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditEntry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_LOGS);
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [notifications, setNotifications] = useState<SystemNotification[]>(INITIAL_NOTIFICATIONS);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [goldenStep, setGoldenStep] = useState<number>(1);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CHALLENGES, JSON.stringify(challenges));
  }, [challenges]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CREDENTIALS, JSON.stringify(credentials));
  }, [credentials]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ROLE, role);
    sessionStorage.setItem(STORAGE_KEY_ROLE, role);
  }, [role]);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY_AUTH, isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  const login = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setIsAuthenticated(true);
    sessionStorage.setItem(STORAGE_KEY_AUTH, 'true');
    sessionStorage.setItem(STORAGE_KEY_ROLE, selectedRole);
    const profile = ROLE_PROFILES[selectedRole];
    addToast('Authenticated', `Signed in as ${profile.name} (${profile.title})`, 'success');
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(STORAGE_KEY_AUTH);
    addToast('Signed Out', 'You have been signed out to public visitor mode.', 'info');
  };

  const addToast = (title: string, description: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts(prev => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
    addToast('Role Switched', `Active view updated to ${newRole.toUpperCase()} mode.`, 'info');
  };

  const submitCitizenReport = (reportData: Omit<CitizenReport, 'id' | 'trackingId' | 'status' | 'createdAt' | 'updatedAt'>): CitizenReport => {
    const id = `RPT-CIT-${Date.now().toString().slice(-4)}`;
    const trackingId = `SS-RPT-${Math.floor(20500 + Math.random() * 9000)}`;
    const now = new Date().toISOString();

    const similarity = analyzeReportSimilarity(reportData, reports);

    const newReport: CitizenReport = {
      ...reportData,
      id,
      trackingId,
      status: similarity.similarityScore >= 80 ? 'Clustered' : 'Submitted',
      challengeId: similarity.recommendedClusterId,
      createdAt: now,
      updatedAt: now,
    };

    setReports(prev => [newReport, ...prev]);

    // If matches an existing challenge, bump report count
    if (similarity.recommendedClusterId) {
      setChallenges(prev => prev.map(c => {
        if (c.id === similarity.recommendedClusterId) {
          return {
            ...c,
            reportCount: c.reportCount + 1,
            affectedPopulation: c.affectedPopulation + (reportData.affectedCountEstimate || 50),
            updatedAt: now,
          };
        }
        return c;
      }));
    }

    // Add audit entry
    const audit: AuditEntry = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: now,
      actorRole: 'citizen',
      actorName: reportData.submittedBy || 'Citizen Reporter',
      action: `Citizen Report Submitted (${trackingId})`,
      details: `Report for "${reportData.title}" filed in ${reportData.district}. Duplicate analysis score: ${similarity.similarityScore}%.`,
      challengeCode: similarity.recommendedClusterId ? 'JH-WTR-1042' : undefined,
    };
    setAuditLogs(prev => [audit, ...prev]);

    // Add notification
    const notif: SystemNotification = {
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      title: 'New Citizen Report Received',
      message: `${reportData.title} logged in ${reportData.district}. AI duplicate similarity: ${similarity.similarityScore}%.`,
      type: similarity.similarityScore >= 80 ? 'critical' : 'info',
      link: '/government/verification',
      targetRole: 'government',
      read: false,
    };
    setNotifications(prev => [notif, ...prev]);

    addToast('Report Submitted Successfully', `Tracking ID: ${trackingId}. AI cluster analysis complete.`, 'success');
    return newReport;
  };

  const verifyChallenge = (challengeId: string, officerName = 'Sanjay K. Verma, IAS') => {
    const now = new Date().toISOString();
    let challengeCode = '';

    setChallenges(prev => prev.map(c => {
      if (c.id === challengeId) {
        challengeCode = c.code;
        return {
          ...c,
          status: 'verified',
          verificationStatus: 'verified',
          verifiedAt: now,
          verifiedBy: officerName,
          updatedAt: now,
        };
      }
      return c;
    }));

    const audit: AuditEntry = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: now,
      actorRole: 'government',
      actorName: officerName,
      action: 'Challenge Verified by Government',
      details: `Official verification confirmed for ${challengeCode}. Published to university adoption registry.`,
      challengeCode,
    };
    setAuditLogs(prev => [audit, ...prev]);
    addToast('Challenge Verified', `${challengeCode} verified & published for university discovery.`, 'success');
  };

  const overridePriority = (
    challengeId: string, 
    newScore: number, 
    newLevel: PriorityLevel, 
    reason: string, 
    officerName = 'Sanjay K. Verma, IAS'
  ) => {
    const now = new Date().toISOString();
    let challengeCode = '';

    setChallenges(prev => prev.map(c => {
      if (c.id === challengeId) {
        challengeCode = c.code;
        return {
          ...c,
          priorityScore: newScore,
          priorityLevel: newLevel,
          governmentOverride: {
            originalScore: c.priorityScore,
            originalLevel: c.priorityLevel,
            overrideScore: newScore,
            overrideLevel: newLevel,
            reason,
            officerName,
            timestamp: now,
          },
          updatedAt: now,
        };
      }
      return c;
    }));

    const audit: AuditEntry = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: now,
      actorRole: 'government',
      actorName: officerName,
      action: `Priority Overridden to ${newLevel} (${newScore}/100)`,
      details: `Justification: "${reason}". Updated by ${officerName}.`,
      challengeCode,
    };
    setAuditLogs(prev => [audit, ...prev]);
    addToast('Priority Override Applied', `Challenge priority updated to ${newLevel} (${newScore}/100).`, 'warning');
  };

  const adoptChallenge = (challengeId: string, proposal: Partial<UniversityTeam>) => {
    const now = new Date().toISOString();
    let challengeCode = '';

    const newTeam: UniversityTeam = {
      teamId: `TEAM-${Date.now().toString().slice(-4)}`,
      teamName: proposal.teamName || 'Innovators Guild',
      university: proposal.university || 'Birla Institute of Technology (BIT) Mesra',
      department: proposal.department || 'Civil & Environmental Engineering',
      leadStudent: proposal.leadStudent || 'Student Lead',
      teamMembers: proposal.teamMembers || ['Student Lead', 'Co-Researcher 1', 'Co-Researcher 2'],
      facultyMentor: proposal.facultyMentor || 'Dr. Rameshwar Mahato',
      proposedTech: proposal.proposedTech || ['Solar Membrane Filtration', 'IoT Sensor Telemetry'],
      proposalSummary: proposal.proposalSummary || 'Community scale deployment proposal.',
      adoptionDate: now,
      mentorStatus: 'pending',
      milestones: [
        { id: 'm1', title: 'Site Inspection & Lab Diagnostics', description: 'Baseline sample chemical and microbial assay', dueDate: '2026-09-25', completed: false },
        { id: 'm2', title: 'Prototype Assembly & Sensor Calibration', description: 'Hardware integration and telemetry testing', dueDate: '2026-10-10', completed: false },
        { id: 'm3', title: 'Field Commissioning & Panchayat Handover', description: 'On-site installation and operator training', dueDate: '2026-10-25', completed: false },
      ],
    };

    setChallenges(prev => prev.map(c => {
      if (c.id === challengeId) {
        challengeCode = c.code;
        return {
          ...c,
          status: 'adopted',
          adoption: newTeam,
          updatedAt: now,
        };
      }
      return c;
    }));

    const audit: AuditEntry = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: now,
      actorRole: 'student',
      actorName: `${newTeam.leadStudent} (${newTeam.university})`,
      action: 'Challenge Adopted & Proposal Submitted',
      details: `Submitted proposal for ${challengeCode}. Pending faculty mentor review.`,
      challengeCode,
    };
    setAuditLogs(prev => [audit, ...prev]);
    addToast('Challenge Adopted', `Proposal registered for ${challengeCode}. Sent to faculty mentor for approval.`, 'success');
  };

  const approveMentorProposal = (challengeId: string, mentorNotes = 'Academic rigor and field methodology approved for capstone credit.') => {
    const now = new Date().toISOString();
    let challengeCode = '';

    setChallenges(prev => prev.map(c => {
      if (c.id === challengeId && c.adoption) {
        challengeCode = c.code;
        return {
          ...c,
          status: 'in_progress',
          adoption: {
            ...c.adoption,
            mentorStatus: 'approved',
            mentorNotes,
          },
          updatedAt: now,
        };
      }
      return c;
    }));

    const audit: AuditEntry = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: now,
      actorRole: 'mentor',
      actorName: 'Dr. Rameshwar Mahato (Faculty Mentor)',
      action: 'Mentor Proposal Approved',
      details: `Approved student plan for ${challengeCode}. Notes: "${mentorNotes}".`,
      challengeCode,
    };
    setAuditLogs(prev => [audit, ...prev]);
    addToast('Mentor Approval Confirmed', `Project plan approved for ${challengeCode}. Ready for industry CSR matching.`, 'success');
  };

  const commitIndustrySupport = (challengeId: string, support: Partial<IndustrySupport>) => {
    const now = new Date().toISOString();
    let challengeCode = '';

    const newSupport: IndustrySupport = {
      supportId: `IND-${Date.now().toString().slice(-4)}`,
      partnerName: support.partnerName || 'Tata Steel Foundation & CleanTech CSR',
      organization: support.organization || 'Tata Steel Ltd, Jamshedpur',
      supportType: support.supportType || 'CSR Grant',
      commitmentDetails: support.commitmentDetails || 'Financial sponsorship and hardware test bench allocation.',
      assignedMentor: support.assignedMentor || 'Er. Rajesh Sharma (Lead Water Specialist)',
      status: 'Active',
      committedDate: now,
    };

    setChallenges(prev => prev.map(c => {
      if (c.id === challengeId) {
        challengeCode = c.code;
        return {
          ...c,
          industrySupport: newSupport,
          status: 'implementation',
          updatedAt: now,
        };
      }
      return c;
    }));

    const audit: AuditEntry = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: now,
      actorRole: 'industry',
      actorName: `${newSupport.assignedMentor || newSupport.partnerName}`,
      action: 'Industry Sponsorship & Mentorship Pledged',
      details: `${newSupport.partnerName} committed ${newSupport.supportType} to ${challengeCode}.`,
      challengeCode,
    };
    setAuditLogs(prev => [audit, ...prev]);
    addToast('Industry Support Confirmed', `${newSupport.partnerName} assigned resource commitment.`, 'success');
  };

  const submitFieldEvidence = (challengeId: string, evidence: Partial<FieldEvidence>) => {
    const now = new Date().toISOString();
    let challengeCode = '';

    const newEvidence: FieldEvidence = {
      partnerName: evidence.partnerName || 'Pratham Gramin Vikas Trust',
      ngoName: evidence.ngoName || 'Pratham Gramin Vikas Trust',
      photos: evidence.photos || [
        'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
      ],
      installationReport: evidence.installationReport || 'On-site installation and operational handover completed successfully.',
      measuredTdsBefore: evidence.measuredTdsBefore ?? 890,
      measuredTdsAfter: evidence.measuredTdsAfter ?? 142,
      beneficiariesCount: evidence.beneficiariesCount || 2615,
      officerNotes: evidence.officerNotes || 'Village Gram Sabha signoff acquired.',
      submissionDate: now,
      status: 'Submitted',
    };

    setChallenges(prev => prev.map(c => {
      if (c.id === challengeId) {
        challengeCode = c.code;
        return {
          ...c,
          fieldEvidence: newEvidence,
          status: 'impact_verification',
          updatedAt: now,
        };
      }
      return c;
    }));

    const audit: AuditEntry = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: now,
      actorRole: 'ngo',
      actorName: newEvidence.ngoName,
      action: 'Field Implementation Evidence Submitted',
      details: `Reported ${newEvidence.beneficiariesCount} citizens impacted. Evidence uploaded for government verification.`,
      challengeCode,
    };
    setAuditLogs(prev => [audit, ...prev]);
    addToast('Field Evidence Logged', `Submitted implementation evidence for ${challengeCode}. Awaiting DC/DM signoff.`, 'success');
  };

  const verifyImpact = (challengeId: string, verificationData: Partial<ImpactVerification>): CredentialRecord => {
    const now = new Date().toISOString();
    let updatedChallenge: Challenge | undefined;

    const credentialId = `SS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const randomHash = `0x${Array.from({ length: 48 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;

    setChallenges(prev => prev.map(c => {
      if (c.id === challengeId) {
        const impact: ImpactVerification = {
          originalAffectedPop: c.affectedPopulation,
          actualReachedCount: verificationData.actualReachedCount || c.fieldEvidence?.beneficiariesCount || 2615,
          verificationDate: now,
          verifiedByOfficer: verificationData.verifiedByOfficer || 'Sanjay K. Verma, IAS (DM Dumka)',
          department: verificationData.department || c.department,
          credentialId,
          status: 'Verified',
          remarks: verificationData.remarks || 'Impact verified on-site through joint field inspection.',
        };
        const resolvedChallenge = {
          ...c,
          status: 'resolved' as const,
          impactVerification: impact,
          updatedAt: now,
        };
        updatedChallenge = resolvedChallenge;
        return resolvedChallenge;
      }
      return c;
    }));

    const newCredential: CredentialRecord = {
      id: credentialId,
      challengeCode: updatedChallenge?.code || 'JH-WTR-1042',
      title: updatedChallenge?.title || 'Contaminated Drinking Water Remediation',
      district: updatedChallenge?.district || 'Dumka',
      state: 'Jharkhand',
      university: updatedChallenge?.adoption?.university || 'Birla Institute of Technology (BIT) Mesra',
      teamName: updatedChallenge?.adoption?.teamName || 'AquaShield Innovators',
      teamMembers: updatedChallenge?.adoption?.teamMembers || ['Aarav Sengupta', 'Ananya Sharma', 'Rohan Dutta', 'Vikramaditya Roy'],
      facultyMentor: updatedChallenge?.adoption?.facultyMentor || 'Dr. Rameshwar Mahato',
      industryPartner: updatedChallenge?.industrySupport?.partnerName || 'Tata Steel Foundation',
      fieldPartner: updatedChallenge?.fieldEvidence?.ngoName || 'Pratham Gramin Vikas Trust',
      impactPopulation: verificationData.actualReachedCount || 2615,
      verificationHash: randomHash,
      issuedAt: now,
      governmentDepartment: updatedChallenge?.department || 'Drinking Water & Sanitation Dept, Govt of Jharkhand',
      verifiedByOfficer: verificationData.verifiedByOfficer || 'Sanjay K. Verma, IAS (DM Dumka)',
      status: 'VERIFIED',
    };

    setCredentials(prev => [newCredential, ...prev]);

    const audit: AuditEntry = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: now,
      actorRole: 'government',
      actorName: newCredential.verifiedByOfficer,
      action: `Government Impact Verified & Credential ${credentialId} Issued`,
      details: `Verified ${newCredential.impactPopulation} citizens reached. Verifiable cryptographic credential minted.`,
      challengeCode: updatedChallenge?.code,
    };
    setAuditLogs(prev => [audit, ...prev]);

    addToast('Impact Verified & Credential Issued', `Verifiable Credential ${credentialId} issued!`, 'success');
    return newCredential;
  };

  const resetToDemoDefaults = () => {
    localStorage.removeItem(STORAGE_KEY_CHALLENGES);
    localStorage.removeItem(STORAGE_KEY_REPORTS);
    localStorage.removeItem(STORAGE_KEY_CREDENTIALS);
    localStorage.removeItem(STORAGE_KEY_LOGS);
    localStorage.removeItem(STORAGE_KEY_ROLE);
    setChallenges(INITIAL_CHALLENGES);
    setReports(MOCK_CITIZEN_REPORTS_JH_1042);
    setCredentials(INITIAL_CREDENTIALS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setRole('government');
    setGoldenStep(1);
    addToast('Demo State Reset', 'Restored pristine prototype demonstration records.', 'info');
  };

  return (
    <StateContext.Provider
      value={{
        role,
        switchRole,
        isAuthenticated,
        currentUser,
        login,
        logout,
        challenges,
        reports,
        credentials,
        auditLogs,
        notifications,
        toasts,
        dismissToast,
        goldenStep,
        setGoldenStep,
        submitCitizenReport,
        verifyChallenge,
        overridePriority,
        adoptChallenge,
        approveMentorProposal,
        commitIndustrySupport,
        submitFieldEvidence,
        verifyImpact,
        resetToDemoDefaults,
        addToast,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useAppState must be used within a StateProvider');
  }
  return context;
};

