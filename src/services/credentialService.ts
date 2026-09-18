/**
 * SamadhanSetu Cryptographic Credential Service
 * 
 * Computes and verifies SHA-256 integrity hashes for impact credentials
 * using the Web Crypto API (crypto.subtle).
 */

import { CredentialRecord } from '../types';

export interface CredentialCanonicalFields {
  id: string;
  challengeCode: string;
  teamName: string;
  university: string;
  teamMembers: string[];
  impactPopulation: number;
  issuedAt: string;
  verifiedByOfficer: string;
  governmentDepartment: string;
}

/**
 * Builds canonical credential record fields from a challenge and verification inputs.
 * Ensures no hardcoded fallback names leak across different challenges.
 */
export function buildCredentialRecordData(
  challenge: {
    code: string;
    title: string;
    district: string;
    state?: string;
    department: string;
    affectedPopulation: number;
    adoption?: {
      university: string;
      teamName: string;
      teamMembers: string[];
      facultyMentor: string;
    };
    industrySupport?: {
      partnerName: string;
    };
    fieldEvidence?: {
      ngoName: string;
      beneficiariesCount?: number;
    };
  },
  verificationData: {
    actualReachedCount?: number;
    verifiedByOfficer?: string;
    department?: string;
  },
  now: string,
  credentialId: string
): Omit<CredentialRecord, 'verificationHash'> {
  return {
    id: credentialId,
    challengeCode: challenge.code,
    title: challenge.title,
    district: challenge.district,
    state: challenge.state || 'Jharkhand',
    university: challenge.adoption?.university || 'University Partner',
    teamName: challenge.adoption?.teamName || 'Innovation Team',
    teamMembers: challenge.adoption?.teamMembers || ['Lead Student Innovator'],
    facultyMentor: challenge.adoption?.facultyMentor || 'Faculty Advisor',
    industryPartner: challenge.industrySupport?.partnerName || 'CSR Partner',
    fieldPartner: challenge.fieldEvidence?.ngoName || 'Field Partner NGO',
    impactPopulation: verificationData.actualReachedCount || challenge.fieldEvidence?.beneficiariesCount || challenge.affectedPopulation,
    issuedAt: now,
    governmentDepartment: verificationData.department || challenge.department,
    verifiedByOfficer: verificationData.verifiedByOfficer || 'District Magistrate & Collector',
    status: 'VERIFIED',
  };
}

/**
 * Returns a stable, deterministic JSON string of the credential's core governance fields.
 * The order of fields is strictly canonical:
 * id, challengeCode, teamName, university, teamMembers, impactPopulation, issuedAt, verifiedByOfficer, governmentDepartment
 */
export function canonicalize(credential: CredentialCanonicalFields): string {
  const normalized = {
    id: credential.id,
    challengeCode: credential.challengeCode,
    teamName: credential.teamName,
    university: credential.university,
    teamMembers: Array.isArray(credential.teamMembers) ? credential.teamMembers : [],
    impactPopulation: Number(credential.impactPopulation),
    issuedAt: credential.issuedAt,
    verifiedByOfficer: credential.verifiedByOfficer,
    governmentDepartment: credential.governmentDepartment,
  };
  return JSON.stringify(normalized);
}

/**
 * Computes an immutable SHA-256 digest over the canonicalized credential JSON.
 * Returns the hash string formatted as "0x" + 64 hex characters.
 */
export async function computeHash(credential: CredentialCanonicalFields): Promise<string> {
  const canonical = canonicalize(credential);
  const encoder = new TextEncoder();
  const data = encoder.encode(canonical);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return `0x${hex}`;
}

/**
 * Recomputes the SHA-256 digest of the credential fields and compares against the stored hash.
 * Returns true only if the credential has not been tampered with.
 */
export async function verifyHash(
  credential: CredentialCanonicalFields & { verificationHash?: string }
): Promise<boolean> {
  if (!credential || !credential.verificationHash) {
    return false;
  }
  try {
    const computed = await computeHash(credential);
    return credential.verificationHash.toLowerCase() === computed.toLowerCase();
  } catch {
    return false;
  }
}
