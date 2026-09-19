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
import { buildCredentialRecordData, computeHash } from '../services/credentialService';
import { translate, Language } from '../services/i18n';
import { isSupabaseConfigured } from '../services/supabase';
import {
  fetchChallengesFromDb,
  fetchReportsFromDb,
  fetchCredentialsFromDb,
  fetchAuditLogsFromDb,
  upsertChallengeToDb,
  insertReportToDb,
  insertCredentialToDb,
  insertAuditLogToDb,
  seedSupabaseIfEmpty,
} from '../services/supabaseDb';

export const ROLE_PROFILES: Record<UserRole, UserProfile> = {
  government: {
    id: 'usr-gov-01',
    name: 'Sanjay K. Verma, IAS',
    email: 'dm.dumka@jharkhand.gov.in',
    role: 'government',
    title: 'District Magistrate & Collector',
    organization: 'District Administration Dumka',
    location: 'Dumka, Jharkhand',
    governmentId: 'IAS-JH-1998-042',
    isGovtVerified: true,
    departmentCode: 'JH-GOV-DM-04',
    authProvider: 'govt_sso',
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
  login: (role: UserRole, customProfile?: Partial<UserProfile>) => void;
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
  // Appearance & Localization
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
  // Database & Cloud Sync
  dbMode: 'cloud' | 'local';
  dbSyncStatus: 'idle' | 'syncing' | 'synced' | 'error';
  refreshFromCloud: () => Promise<void>;
  // Actions
  submitCitizenReport: (report: Omit<CitizenReport, 'id' | 'trackingId' | 'status' | 'createdAt' | 'updatedAt'>) => CitizenReport;
  verifyChallenge: (challengeId: string, officerName?: string) => void;
  overridePriority: (challengeId: string, newScore: number, newLevel: PriorityLevel, reason: string, officerName?: string) => void;
  adoptChallenge: (challengeId: string, proposal: Partial<UniversityTeam>) => void;
  approveMentorProposal: (challengeId: string, mentorNotes?: string) => void;
  commitIndustrySupport: (challengeId: string, support: Partial<IndustrySupport>) => void;
  submitFieldEvidence: (challengeId: string, evidence: Partial<FieldEvidence>) => void;
  verifyImpact: (challengeId: string, verificationData: Partial<ImpactVerification>) => Promise<CredentialRecord>;
  resetToDemoDefaults: () => void;
  addToast: (title: string, description: string, type?: 'success' | 'info' | 'warning') => void;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const STORAGE_KEY_CHALLENGES = 'samadhansetu_challenges_v2';
export const STORAGE_KEY_REPORTS = 'samadhansetu_reports_v2';
export const STORAGE_KEY_CREDENTIALS = 'samadhansetu_credentials_v2';
export const STORAGE_KEY_LOGS = 'samadhansetu_logs_v2';
export const STORAGE_KEY_ROLE = 'samadhansetu_role_v2';
export const STORAGE_KEY_AUTH = 'samadhansetu_auth_v2';
export const STORAGE_KEY_THEME = 'samadhansetu_theme_v2';
export const STORAGE_KEY_LANG = 'samadhansetu_lang_v2';

/**
 * Safely parses JSON from storage, falling back to mock defaults if corrupt or missing.
 */
export function safeParseJSON<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn('[SamadhanSetu] Corrupt localStorage item detected, falling back to default:', err);
    return fallback;
  }
}

/**
 * Safely writes to localStorage, catching QuotaExceededError or security exceptions without crashing.
 */
export function safeSetStorage(key: string, value: string, onQuotaExceeded?: () => void): boolean {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, value);
      return true;
    }
  } catch (err: any) {
    console.warn(`[SamadhanSetu] Storage write failed for key "${key}":`, err);
    if (onQuotaExceeded) {
      onQuotaExceeded();
    }
  }
  return false;
}

export const StateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY_ROLE) || localStorage.getItem(STORAGE_KEY_ROLE);
      return (saved as UserRole) || 'government';
    } catch {
      return 'government';
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY_AUTH);
      return saved === 'true';
    } catch {
      return false;
    }
  });

  const [customUserOverrides, setCustomUserOverrides] = useState<Partial<UserProfile> | null>(() => {
    try {
      const raw = sessionStorage.getItem('samadhansetu_custom_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const currentUser = isAuthenticated 
    ? { ...ROLE_PROFILES[role], ...(customUserOverrides || {}) }
    : null;

  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    return safeParseJSON(localStorage.getItem(STORAGE_KEY_CHALLENGES), INITIAL_CHALLENGES);
  });

  const [reports, setReports] = useState<CitizenReport[]>(() => {
    return safeParseJSON(localStorage.getItem(STORAGE_KEY_REPORTS), MOCK_CITIZEN_REPORTS_JH_1042);
  });

  const [credentials, setCredentials] = useState<CredentialRecord[]>(() => {
    return safeParseJSON(localStorage.getItem(STORAGE_KEY_CREDENTIALS), INITIAL_CREDENTIALS);
  });

  const [auditLogs, setAuditLogs] = useState<AuditEntry[]>(() => {
    return safeParseJSON(localStorage.getItem(STORAGE_KEY_LOGS), INITIAL_AUDIT_LOGS);
  });

  const [notifications, setNotifications] = useState<SystemNotification[]>(INITIAL_NOTIFICATIONS);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [goldenStep, setGoldenStep] = useState<number>(1);

  // Appearance theme (light/dark)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_THEME);
      if (saved === 'dark' || saved === 'light') return saved;
      return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  // Localization (EN / HI)
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LANG);
      return (saved === 'HI' || saved === 'EN') ? saved : 'EN';
    } catch {
      return 'EN';
    }
  });

  useEffect(() => {
    safeSetStorage(STORAGE_KEY_THEME, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    safeSetStorage(STORAGE_KEY_LANG, language);
  }, [language]);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      return next;
    });
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    safeSetStorage(STORAGE_KEY_LANG, lang);
  };

  const t = (key: string, fallback?: string): string => {
    return translate(key, language, fallback);
  };

  // Cloud Database State & Synchronization
  const [dbMode, setDbMode] = useState<'cloud' | 'local'>(() => {
    return isSupabaseConfigured() ? 'cloud' : 'local';
  });
  const [dbSyncStatus, setDbSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'error'>('idle');

  const refreshFromCloud = async () => {
    if (!isSupabaseConfigured()) {
      setDbMode('local');
      setDbSyncStatus('idle');
      return;
    }
    setDbMode('cloud');
    setDbSyncStatus('syncing');
    try {
      await seedSupabaseIfEmpty(INITIAL_CHALLENGES, MOCK_CITIZEN_REPORTS_JH_1042, INITIAL_CREDENTIALS, INITIAL_AUDIT_LOGS);
      const [remoteChallenges, remoteReports, remoteCredentials, remoteLogs] = await Promise.all([
        fetchChallengesFromDb(),
        fetchReportsFromDb(),
        fetchCredentialsFromDb(),
        fetchAuditLogsFromDb(),
      ]);
      if (remoteChallenges && remoteChallenges.length > 0) setChallenges(remoteChallenges);
      if (remoteReports && remoteReports.length > 0) setReports(remoteReports);
      if (remoteCredentials && remoteCredentials.length > 0) setCredentials(remoteCredentials);
      if (remoteLogs && remoteLogs.length > 0) setAuditLogs(remoteLogs);
      setDbSyncStatus('synced');
    } catch (err) {
      console.warn('[SamadhanSetu] Cloud refresh error:', err);
      setDbSyncStatus('error');
    }
  };

  useEffect(() => {
    if (isSupabaseConfigured()) {
      refreshFromCloud();
    }
  }, []);

  // Storage full toast callback
  const handleStorageFull = () => {
    addToast('Storage Alert', 'Storage full, some data was not saved', 'warning');
  };

  // Sync to local storage
  useEffect(() => {
    safeSetStorage(STORAGE_KEY_CHALLENGES, JSON.stringify(challenges), handleStorageFull);
  }, [challenges]);

  useEffect(() => {
    safeSetStorage(STORAGE_KEY_REPORTS, JSON.stringify(reports), handleStorageFull);
  }, [reports]);

  useEffect(() => {
    safeSetStorage(STORAGE_KEY_CREDENTIALS, JSON.stringify(credentials), handleStorageFull);
  }, [credentials]);

  useEffect(() => {
    safeSetStorage(STORAGE_KEY_LOGS, JSON.stringify(auditLogs), handleStorageFull);
  }, [auditLogs]);

  useEffect(() => {
    safeSetStorage(STORAGE_KEY_ROLE, role);
    try {
      sessionStorage.setItem(STORAGE_KEY_ROLE, role);
    } catch {}
  }, [role]);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY_AUTH, isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  const login = (selectedRole: UserRole, customProfile?: Partial<UserProfile>) => {
    setRole(selectedRole);
    setIsAuthenticated(true);
    sessionStorage.setItem(STORAGE_KEY_AUTH, 'true');
    sessionStorage.setItem(STORAGE_KEY_ROLE, selectedRole);

    if (customProfile) {
      setCustomUserOverrides(customProfile);
      try {
        sessionStorage.setItem('samadhansetu_custom_user', JSON.stringify(customProfile));
      } catch {}
    } else {
      setCustomUserOverrides(null);
      sessionStorage.removeItem('samadhansetu_custom_user');
    }

    const profile = { ...ROLE_PROFILES[selectedRole], ...(customProfile || {}) };
    addToast('Authenticated', `Signed in as ${profile.name} (${profile.title})`, 'success');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCustomUserOverrides(null);
    sessionStorage.removeItem(STORAGE_KEY_AUTH);
    sessionStorage.removeItem('samadhansetu_custom_user');
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
      evidencePhotos: (reportData.evidencePhotos || []).slice(0, 3),
      status: similarity.similarityScore >= 80 ? 'Clustered' : 'Submitted',
      challengeId: similarity.recommendedClusterId,
      createdAt: now,
      updatedAt: now,
    };

    setReports(prev => [newReport, ...prev]);

    // If matches an existing challenge, bump report count
    if (similarity.recommendedClusterId) {
      setChallenges(prev => prev.map(c => {
        if (c.id === similarity.recommendedClusterId || c.code === similarity.recommendedClusterId) {
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

    const matchedChallenge = similarity.recommendedClusterId 
      ? challenges.find(c => c.id === similarity.recommendedClusterId || c.code === similarity.recommendedClusterId)
      : undefined;

    // Add audit entry
    const audit: AuditEntry = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: now,
      actorRole: 'citizen',
      actorName: reportData.submittedBy || 'Citizen Reporter',
      action: `Citizen Report Submitted (${trackingId})`,
      details: `Report for "${reportData.title}" filed in ${reportData.district}. Duplicate analysis score: ${similarity.similarityScore}%.`,
      challengeCode: matchedChallenge?.code,
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

    if (isSupabaseConfigured()) {
      insertReportToDb(newReport).catch(e => console.warn('[Supabase] report insert error', e));
      insertAuditLogToDb(audit).catch(e => console.warn('[Supabase] audit insert error', e));
      if (matchedChallenge) {
        upsertChallengeToDb({
          ...matchedChallenge,
          reportCount: matchedChallenge.reportCount + 1,
          affectedPopulation: matchedChallenge.affectedPopulation + (reportData.affectedCountEstimate || 50),
          updatedAt: now,
        }).catch(e => console.warn('[Supabase] challenge reportCount sync error', e));
      }
    }

    return newReport;
  };

  const verifyChallenge = (challengeId: string, officerName = 'Sanjay K. Verma, IAS') => {
    const targetChallenge = challenges.find(c => c.id === challengeId);
    if (!targetChallenge) return;
    const challengeCode = targetChallenge.code;
    const now = new Date().toISOString();

    setChallenges(prev => prev.map(c => {
      if (c.id === challengeId) {
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

    if (isSupabaseConfigured()) {
      upsertChallengeToDb({
        ...targetChallenge,
        status: 'verified',
        verificationStatus: 'verified',
        verifiedAt: now,
        verifiedBy: officerName,
        updatedAt: now,
      }).catch(e => console.warn('[Supabase] challenge verify error', e));
      insertAuditLogToDb(audit).catch(e => console.warn('[Supabase] audit error', e));
    }
  };

  const overridePriority = (
    challengeId: string, 
    newScore: number, 
    newLevel: PriorityLevel, 
    reason: string, 
    officerName = 'Sanjay K. Verma, IAS'
  ) => {
    const targetChallenge = challenges.find(c => c.id === challengeId);
    if (!targetChallenge) return;
    const challengeCode = targetChallenge.code;
    const now = new Date().toISOString();

    setChallenges(prev => prev.map(c => {
      if (c.id === challengeId) {
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

    if (isSupabaseConfigured()) {
      upsertChallengeToDb({
        ...targetChallenge,
        priorityScore: newScore,
        priorityLevel: newLevel,
        governmentOverride: {
          originalScore: targetChallenge.priorityScore,
          originalLevel: targetChallenge.priorityLevel,
          overrideScore: newScore,
          overrideLevel: newLevel,
          reason,
          officerName,
          timestamp: now,
        },
        updatedAt: now,
      }).catch(e => console.warn('[Supabase] override priority error', e));
      insertAuditLogToDb(audit).catch(e => console.warn('[Supabase] audit error', e));
    }
  };

  const adoptChallenge = (challengeId: string, proposal: Partial<UniversityTeam>) => {
    const targetChallenge = challenges.find(c => c.id === challengeId);
    if (!targetChallenge) return;
    const challengeCode = targetChallenge.code;
    const now = new Date().toISOString();

    const newTeam: UniversityTeam = {
      teamId: `TEAM-${Date.now().toString().slice(-4)}`,
      teamName: proposal.teamName || (targetChallenge.code === 'JH-WTR-1042' ? 'AquaShield Innovators' : `${targetChallenge.category.split(' ')[0]} Engineering Team`),
      university: proposal.university || (targetChallenge.code === 'JH-WTR-1042' ? 'Birla Institute of Technology (BIT) Mesra' : 'National Institute of Technology (NIT) Jamshedpur'),
      department: proposal.department || targetChallenge.department || 'Civil & Environmental Engineering',
      leadStudent: proposal.leadStudent || 'Student Lead',
      teamMembers: proposal.teamMembers || ['Student Lead', 'Co-Researcher 1', 'Co-Researcher 2'],
      facultyMentor: proposal.facultyMentor || (targetChallenge.code === 'JH-WTR-1042' ? 'Dr. Rameshwar Mahato' : 'Faculty Advisor'),
      proposedTech: proposal.proposedTech || ['Solar Membrane Filtration', 'IoT Sensor Telemetry'],
      proposalSummary: proposal.proposalSummary || `Community scale deployment proposal for ${targetChallenge.title}.`,
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

    if (isSupabaseConfigured()) {
      upsertChallengeToDb({
        ...targetChallenge,
        status: 'adopted',
        adoption: newTeam,
        updatedAt: now,
      }).catch(e => console.warn('[Supabase] adopt challenge error', e));
      insertAuditLogToDb(audit).catch(e => console.warn('[Supabase] audit error', e));
    }
  };

  const approveMentorProposal = (challengeId: string, mentorNotes = 'Academic rigor and field methodology approved for capstone credit.') => {
    const targetChallenge = challenges.find(c => c.id === challengeId);
    if (!targetChallenge) return;
    const challengeCode = targetChallenge.code;
    const now = new Date().toISOString();

    setChallenges(prev => prev.map(c => {
      if (c.id === challengeId && c.adoption) {
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

    if (isSupabaseConfigured() && targetChallenge.adoption) {
      upsertChallengeToDb({
        ...targetChallenge,
        status: 'in_progress',
        adoption: {
          ...targetChallenge.adoption,
          mentorStatus: 'approved',
          mentorNotes,
        },
        updatedAt: now,
      }).catch(e => console.warn('[Supabase] mentor approval error', e));
      insertAuditLogToDb(audit).catch(e => console.warn('[Supabase] audit error', e));
    }
  };

  const commitIndustrySupport = (challengeId: string, support: Partial<IndustrySupport>) => {
    const targetChallenge = challenges.find(c => c.id === challengeId);
    if (!targetChallenge) return;
    const challengeCode = targetChallenge.code;
    const now = new Date().toISOString();

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

    if (isSupabaseConfigured()) {
      upsertChallengeToDb({
        ...targetChallenge,
        industrySupport: newSupport,
        status: 'implementation',
        updatedAt: now,
      }).catch(e => console.warn('[Supabase] commit industry support error', e));
      insertAuditLogToDb(audit).catch(e => console.warn('[Supabase] audit error', e));
    }
  };

  const submitFieldEvidence = (challengeId: string, evidence: Partial<FieldEvidence>) => {
    const targetChallenge = challenges.find(c => c.id === challengeId);
    if (!targetChallenge) return;
    const challengeCode = targetChallenge.code;
    const now = new Date().toISOString();

    const newEvidence: FieldEvidence = {
      partnerName: evidence.partnerName || 'Pratham Gramin Vikas Trust',
      ngoName: evidence.ngoName || 'Pratham Gramin Vikas Trust',
      photos: evidence.photos || [
        '/images/water-turbid.svg',
        '/images/field-evidence.svg'
      ],
      installationReport: evidence.installationReport || 'On-site installation and operational handover completed successfully.',
      measuredTdsBefore: evidence.measuredTdsBefore ?? 890,
      measuredTdsAfter: evidence.measuredTdsAfter ?? 142,
      beneficiariesCount: evidence.beneficiariesCount || targetChallenge.affectedPopulation || 2615,
      officerNotes: evidence.officerNotes || 'Village Gram Sabha signoff acquired.',
      submissionDate: now,
      status: 'Submitted',
    };

    setChallenges(prev => prev.map(c => {
      if (c.id === challengeId) {
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

    if (isSupabaseConfigured()) {
      upsertChallengeToDb({
        ...targetChallenge,
        fieldEvidence: newEvidence,
        status: 'impact_verification',
        updatedAt: now,
      }).catch(e => console.warn('[Supabase] field evidence error', e));
      insertAuditLogToDb(audit).catch(e => console.warn('[Supabase] audit error', e));
    }
  };

  const verifyImpact = async (challengeId: string, verificationData: Partial<ImpactVerification>): Promise<CredentialRecord> => {
    const now = new Date().toISOString();
    const targetChallenge = challenges.find(c => c.id === challengeId);
    if (!targetChallenge) {
      throw new Error(`Challenge ${challengeId} not found`);
    }

    const credentialId = `SS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const baseCredential = buildCredentialRecordData(targetChallenge, verificationData, now, credentialId);
    const realHash = await computeHash(baseCredential);

    const newCredential: CredentialRecord = {
      ...baseCredential,
      verificationHash: realHash,
    };

    const impact: ImpactVerification = {
      originalAffectedPop: targetChallenge.affectedPopulation,
      actualReachedCount: newCredential.impactPopulation,
      verificationDate: now,
      verifiedByOfficer: newCredential.verifiedByOfficer,
      department: newCredential.governmentDepartment,
      credentialId,
      status: 'Verified',
      remarks: verificationData.remarks || 'Impact verified on-site through joint field inspection.',
    };

    setChallenges(prev => prev.map(c => {
      if (c.id === challengeId) {
        return {
          ...c,
          status: 'resolved' as const,
          impactVerification: impact,
          updatedAt: now,
        };
      }
      return c;
    }));

    setCredentials(prev => [newCredential, ...prev]);

    const audit: AuditEntry = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: now,
      actorRole: 'government',
      actorName: newCredential.verifiedByOfficer,
      action: `Government Impact Verified & Credential ${credentialId} Issued`,
      details: `Verified ${newCredential.impactPopulation} citizens reached. Verifiable cryptographic credential minted.`,
      challengeCode: targetChallenge.code,
    };
    setAuditLogs(prev => [audit, ...prev]);

    addToast('Impact Verified & Credential Issued', `Verifiable Credential ${credentialId} issued!`, 'success');

    if (isSupabaseConfigured()) {
      upsertChallengeToDb({
        ...targetChallenge,
        status: 'resolved' as const,
        impactVerification: impact,
        updatedAt: now,
      }).catch(e => console.warn('[Supabase] verify impact challenge update error', e));
      insertCredentialToDb(newCredential).catch(e => console.warn('[Supabase] insert credential error', e));
      insertAuditLogToDb(audit).catch(e => console.warn('[Supabase] audit error', e));
    }

    return newCredential;
  };

  const resetToDemoDefaults = () => {
    try {
      if (typeof window !== 'undefined') {
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('samadhansetu_')) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach(k => localStorage.removeItem(k));

        const sessionKeys: string[] = [];
        for (let i = 0; i < sessionStorage.length; i++) {
          const key = sessionStorage.key(i);
          if (key && key.startsWith('samadhansetu_')) {
            sessionKeys.push(key);
          }
        }
        sessionKeys.forEach(k => sessionStorage.removeItem(k));
      }
    } catch (e) {
      console.warn('[SamadhanSetu] Failed clearing storage during reset', e);
    }
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
        theme,
        toggleTheme,
        language,
        setLanguage,
        t,
        dbMode,
        dbSyncStatus,
        refreshFromCloud,
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

