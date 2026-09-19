import { Challenge, CitizenReport, CredentialRecord, AuditEntry } from '../types';
import { getSupabaseClient } from './supabase';

// ==========================================
// Challenge Mappers
// ==========================================

export function mapChallengeToRow(c: Challenge) {
  return {
    id: c.id,
    code: c.code,
    title: c.title,
    description: c.description,
    category: c.category,
    district: c.district,
    block: c.block,
    locality: c.locality,
    lat: c.coordinates.lat,
    lng: c.coordinates.lng,
    status: c.status,
    priority_score: c.priorityScore,
    priority_level: c.priorityLevel,
    breakdown: c.breakdown,
    government_override: c.governmentOverride || null,
    report_count: c.reportCount,
    affected_population: c.affectedPopulation,
    affected_villages: c.affectedVillages || [],
    department: c.department,
    required_skills: c.requiredSkills || [],
    suggested_departments: c.suggestedDepartments || [],
    verification_status: c.verificationStatus,
    verified_at: c.verifiedAt || null,
    verified_by: c.verifiedBy || null,
    photos: c.photos || [],
    cluster: c.cluster || null,
    adoption: c.adoption || null,
    industry_support: c.industrySupport || null,
    field_evidence: c.fieldEvidence || null,
    impact_verification: c.impactVerification || null,
    created_at: c.createdAt,
    updated_at: c.updatedAt,
  };
}

export function mapRowToChallenge(row: any): Challenge {
  return {
    id: row.id,
    code: row.code,
    title: row.title,
    description: row.description,
    category: row.category,
    district: row.district,
    block: row.block,
    locality: row.locality,
    coordinates: {
      lat: Number(row.lat) || 0,
      lng: Number(row.lng) || 0,
    },
    status: row.status,
    priorityScore: row.priority_score,
    priorityLevel: row.priority_level,
    breakdown: row.breakdown,
    governmentOverride: row.government_override || undefined,
    reportCount: row.report_count,
    affectedPopulation: row.affected_population,
    affectedVillages: row.affected_villages || [],
    department: row.department,
    requiredSkills: row.required_skills || [],
    suggestedDepartments: row.suggested_departments || [],
    verificationStatus: row.verification_status,
    verifiedAt: row.verified_at || undefined,
    verifiedBy: row.verified_by || undefined,
    photos: row.photos || [],
    cluster: row.cluster || undefined,
    adoption: row.adoption || undefined,
    industrySupport: row.industry_support || undefined,
    fieldEvidence: row.field_evidence || undefined,
    impactVerification: row.impact_verification || undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// ==========================================
// Citizen Report Mappers
// ==========================================

export function mapReportToRow(r: CitizenReport) {
  return {
    id: r.id,
    tracking_id: r.trackingId,
    challenge_id: r.challengeId || null,
    title: r.title,
    description: r.description,
    category: r.category,
    district: r.district,
    block: r.block,
    locality: r.locality,
    landmark: r.landmark || null,
    lat: r.coordinates.lat,
    lng: r.coordinates.lng,
    affected_count_estimate: r.affectedCountEstimate,
    urgency_level: r.urgencyLevel,
    evidence_photos: r.evidencePhotos || [],
    evidence_doc: r.evidenceDoc || null,
    status: r.status,
    submitted_by: r.submittedBy,
    contact_number: r.contactNumber || null,
    created_at: r.createdAt,
    updated_at: r.updatedAt,
  };
}

export function mapRowToReport(row: any): CitizenReport {
  return {
    id: row.id,
    trackingId: row.tracking_id,
    challengeId: row.challenge_id || undefined,
    title: row.title,
    description: row.description,
    category: row.category,
    district: row.district,
    block: row.block,
    locality: row.locality,
    landmark: row.landmark || undefined,
    coordinates: {
      lat: Number(row.lat) || 0,
      lng: Number(row.lng) || 0,
    },
    affectedCountEstimate: row.affected_count_estimate,
    urgencyLevel: row.urgency_level,
    evidencePhotos: row.evidence_photos || [],
    evidenceDoc: row.evidence_doc || undefined,
    status: row.status,
    submittedBy: row.submitted_by,
    contactNumber: row.contact_number || undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// ==========================================
// Credential Mappers
// ==========================================

export function mapCredentialToRow(c: CredentialRecord) {
  return {
    id: c.id,
    challenge_code: c.challengeCode,
    title: c.title,
    district: c.district,
    state: c.state,
    university: c.university,
    team_name: c.teamName,
    team_members: c.teamMembers || [],
    faculty_mentor: c.facultyMentor,
    industry_partner: c.industryPartner,
    field_partner: c.fieldPartner,
    impact_population: c.impactPopulation,
    verification_hash: c.verificationHash,
    issued_at: c.issuedAt,
    government_department: c.governmentDepartment,
    verified_by_officer: c.verifiedByOfficer,
    status: c.status,
  };
}

export function mapRowToCredential(row: any): CredentialRecord {
  return {
    id: row.id,
    challengeCode: row.challenge_code,
    title: row.title,
    district: row.district,
    state: row.state,
    university: row.university,
    teamName: row.team_name,
    teamMembers: row.team_members || [],
    facultyMentor: row.faculty_mentor,
    industryPartner: row.industry_partner,
    fieldPartner: row.field_partner,
    impactPopulation: row.impact_population,
    verificationHash: row.verification_hash,
    issuedAt: row.issued_at,
    governmentDepartment: row.government_department,
    verifiedByOfficer: row.verified_by_officer,
    status: row.status,
  };
}

// ==========================================
// Audit Log Mappers
// ==========================================

export function mapAuditToRow(a: AuditEntry) {
  return {
    id: a.id,
    timestamp: a.timestamp,
    actor_role: a.actorRole,
    actor_name: a.actorName,
    action: a.action,
    details: a.details,
    challenge_code: a.challengeCode || null,
  };
}

export function mapRowToAudit(row: any): AuditEntry {
  return {
    id: row.id,
    timestamp: row.timestamp,
    actorRole: row.actor_role,
    actorName: row.actor_name,
    action: row.action,
    details: row.details,
    challengeCode: row.challenge_code || undefined,
  };
}

// ==========================================
// Remote Queries & Mutations
// ==========================================

export async function fetchChallengesFromDb(): Promise<Challenge[] | null> {
  const client = getSupabaseClient();
  if (!client) return null;
  try {
    const { data, error } = await client
      .from('challenges')
      .select('*')
      .order('priority_score', { ascending: false });

    if (error) {
      console.warn('[SamadhanSetu] Supabase fetch challenges failed:', error.message);
      return null;
    }
    return (data || []).map(mapRowToChallenge);
  } catch (err) {
    console.warn('[SamadhanSetu] Error fetching challenges from Supabase:', err);
    return null;
  }
}

export async function upsertChallengeToDb(challenge: Challenge): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;
  try {
    const row = mapChallengeToRow(challenge);
    const { error } = await client.from('challenges').upsert(row);
    if (error) {
      console.warn('[SamadhanSetu] Supabase upsert challenge error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('[SamadhanSetu] Error upserting challenge to Supabase:', err);
    return false;
  }
}

export async function fetchReportsFromDb(): Promise<CitizenReport[] | null> {
  const client = getSupabaseClient();
  if (!client) return null;
  try {
    const { data, error } = await client
      .from('citizen_reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('[SamadhanSetu] Supabase fetch reports failed:', error.message);
      return null;
    }
    return (data || []).map(mapRowToReport);
  } catch (err) {
    console.warn('[SamadhanSetu] Error fetching reports from Supabase:', err);
    return null;
  }
}

export async function insertReportToDb(report: CitizenReport): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;
  try {
    const row = mapReportToRow(report);
    const { error } = await client.from('citizen_reports').upsert(row);
    if (error) {
      console.warn('[SamadhanSetu] Supabase insert report error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('[SamadhanSetu] Error inserting report to Supabase:', err);
    return false;
  }
}

export async function fetchCredentialsFromDb(): Promise<CredentialRecord[] | null> {
  const client = getSupabaseClient();
  if (!client) return null;
  try {
    const { data, error } = await client
      .from('credentials')
      .select('*')
      .order('issued_at', { ascending: false });

    if (error) {
      console.warn('[SamadhanSetu] Supabase fetch credentials failed:', error.message);
      return null;
    }
    return (data || []).map(mapRowToCredential);
  } catch (err) {
    console.warn('[SamadhanSetu] Error fetching credentials from Supabase:', err);
    return null;
  }
}

export async function insertCredentialToDb(cred: CredentialRecord): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;
  try {
    const row = mapCredentialToRow(cred);
    const { error } = await client.from('credentials').upsert(row);
    if (error) {
      console.warn('[SamadhanSetu] Supabase insert credential error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('[SamadhanSetu] Error inserting credential to Supabase:', err);
    return false;
  }
}

export async function fetchAuditLogsFromDb(): Promise<AuditEntry[] | null> {
  const client = getSupabaseClient();
  if (!client) return null;
  try {
    const { data, error } = await client
      .from('audit_logs')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) {
      console.warn('[SamadhanSetu] Supabase fetch audit logs failed:', error.message);
      return null;
    }
    return (data || []).map(mapRowToAudit);
  } catch (err) {
    console.warn('[SamadhanSetu] Error fetching audit logs from Supabase:', err);
    return null;
  }
}

export async function insertAuditLogToDb(audit: AuditEntry): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;
  try {
    const row = mapAuditToRow(audit);
    const { error } = await client.from('audit_logs').upsert(row);
    if (error) {
      console.warn('[SamadhanSetu] Supabase insert audit log error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('[SamadhanSetu] Error inserting audit log to Supabase:', err);
    return false;
  }
}

/**
 * Automatically seeds the Supabase database if tables are empty.
 */
export async function seedSupabaseIfEmpty(
  challenges: Challenge[],
  reports: CitizenReport[],
  credentials: CredentialRecord[],
  auditLogs: AuditEntry[]
): Promise<void> {
  const client = getSupabaseClient();
  if (!client) return;

  try {
    const { data: existingChallenges } = await client.from('challenges').select('id').limit(1);
    if (!existingChallenges || existingChallenges.length === 0) {
      const challengeRows = challenges.map(mapChallengeToRow);
      await client.from('challenges').upsert(challengeRows);
    }

    const { data: existingReports } = await client.from('citizen_reports').select('id').limit(1);
    if (!existingReports || existingReports.length === 0) {
      const reportRows = reports.map(mapReportToRow);
      await client.from('citizen_reports').upsert(reportRows);
    }

    const { data: existingCreds } = await client.from('credentials').select('id').limit(1);
    if (!existingCreds || existingCreds.length === 0) {
      const credRows = credentials.map(mapCredentialToRow);
      await client.from('credentials').upsert(credRows);
    }

    const { data: existingLogs } = await client.from('audit_logs').select('id').limit(1);
    if (!existingLogs || existingLogs.length === 0) {
      const logRows = auditLogs.map(mapAuditToRow);
      await client.from('audit_logs').upsert(logRows);
    }
  } catch (err) {
    console.warn('[SamadhanSetu] Error during auto-seeding Supabase:', err);
  }
}

