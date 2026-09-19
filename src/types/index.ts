export type UserRole = 
  | 'citizen' 
  | 'student' 
  | 'mentor' 
  | 'government' 
  | 'industry' 
  | 'ngo';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  title: string;
  organization: string;
  location: string;
  governmentId?: string;
  isGovtVerified?: boolean;
  departmentCode?: string;
  authProvider?: 'credentials' | 'google' | 'govt_sso' | 'github' | 'linkedin';
}

export type PriorityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface PriorityBreakdown {
  severity: number; // weight 30%
  populationImpact: number; // weight 25%
  geographicSpread: number; // weight 15%
  urgency: number; // weight 15%
  duplicateSignal: number; // weight 10%
  feasibility: number; // weight 5%
  overallScore: number; // 0-100
  level: PriorityLevel;
}

export interface GovernmentOverride {
  originalScore: number;
  originalLevel: PriorityLevel;
  overrideScore: number;
  overrideLevel: PriorityLevel;
  reason: string;
  officerName: string;
  timestamp: string;
}

export interface CitizenReport {
  id: string;
  trackingId: string;
  challengeId?: string;
  title: string;
  description: string;
  category: string;
  district: string;
  block: string;
  locality: string;
  landmark?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  affectedCountEstimate: number;
  urgencyLevel: 'Low' | 'Medium' | 'High' | 'Emergency';
  evidencePhotos: string[];
  evidenceDoc?: string;
  status: 'Submitted' | 'Under Review' | 'Clustered' | 'Verified' | 'Resolved' | 'Rejected';
  submittedBy: string;
  contactNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProblemCluster {
  clusterId: string;
  masterChallengeId: string;
  similarityScore: number; // e.g. 91%
  villageCount: number;
  affectedVillages: string[];
  reportIds: string[];
  detectionDate: string;
  aiRationale: string;
}

export type ChallengeStatus = 
  | 'unverified' 
  | 'verified' 
  | 'published' 
  | 'adopted' 
  | 'in_progress' 
  | 'implementation' 
  | 'impact_verification' 
  | 'resolved';

export interface UniversityTeam {
  teamId: string;
  teamName: string;
  university: string;
  department: string;
  leadStudent: string;
  teamMembers: string[];
  facultyMentor: string;
  proposedTech: string[];
  proposalSummary: string;
  adoptionDate: string;
  mentorStatus: 'pending' | 'approved' | 'changes_requested';
  mentorNotes?: string;
  milestones: {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    completed: boolean;
    completedDate?: string;
  }[];
}

export interface IndustrySupport {
  supportId: string;
  partnerName: string;
  organization: string;
  supportType: 'Funding & Equipment' | 'Technical Mentorship' | 'Hardware Labs' | 'CSR Grant';
  commitmentDetails: string;
  assignedMentor?: string;
  status: 'Pledged' | 'Active' | 'Disbursed';
  committedDate: string;
}

export interface FieldEvidence {
  partnerName: string;
  ngoName: string;
  photos: string[];
  installationReport: string;
  measuredTdsBefore?: number;
  measuredTdsAfter?: number;
  beneficiariesCount: number;
  officerNotes: string;
  submissionDate: string;
  status: 'Draft' | 'Submitted' | 'Verified';
}

export interface ImpactVerification {
  originalAffectedPop: number;
  actualReachedCount: number;
  verificationDate: string;
  verifiedByOfficer: string;
  department: string;
  credentialId: string;
  status: 'Verified' | 'Pending Evidence' | 'Rejected';
  remarks: string;
}

export interface Challenge {
  id: string;
  code: string; // e.g., 'JH-WTR-1042'
  title: string;
  description: string;
  category: string;
  district: string;
  block: string;
  locality: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  status: ChallengeStatus;
  priorityScore: number; // 0-100
  priorityLevel: PriorityLevel;
  breakdown: PriorityBreakdown;
  governmentOverride?: GovernmentOverride;
  reportCount: number;
  affectedPopulation: number;
  affectedVillages: string[];
  department: string;
  requiredSkills: string[];
  suggestedDepartments: string[];
  verificationStatus: 'unverified' | 'verified' | 'rejected' | 'more_evidence';
  verifiedAt?: string;
  verifiedBy?: string;
  photos: string[];
  cluster?: ProblemCluster;
  adoption?: UniversityTeam;
  industrySupport?: IndustrySupport;
  fieldEvidence?: FieldEvidence;
  impactVerification?: ImpactVerification;
  createdAt: string;
  updatedAt: string;
}

export interface CredentialRecord {
  id: string; // e.g., 'SS-2026-1042'
  challengeCode: string;
  title: string;
  district: string;
  state: string;
  university: string;
  teamName: string;
  teamMembers: string[];
  facultyMentor: string;
  industryPartner: string;
  fieldPartner: string;
  impactPopulation: number;
  verificationHash: string;
  issuedAt: string;
  governmentDepartment: string;
  verifiedByOfficer: string;
  status: 'VERIFIED' | 'REVOKED';
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  actorRole: UserRole | 'system';
  actorName: string;
  action: string;
  details: string;
  challengeCode?: string;
}

export interface SystemNotification {
  id: string;
  timestamp: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'critical';
  link?: string;
  targetRole?: UserRole;
  read: boolean;
}

