import { describe, it, expect } from 'vitest';
import { isSupabaseConfigured, getSupabaseClient } from '../src/services/supabase';
import {
  mapChallengeToRow,
  mapRowToChallenge,
  mapReportToRow,
  mapRowToReport,
  mapCredentialToRow,
  mapRowToCredential,
  mapAuditToRow,
  mapRowToAudit,
} from '../src/services/supabaseDb';
import { 
  INITIAL_CHALLENGES, 
  MOCK_CITIZEN_REPORTS_JH_1042, 
  INITIAL_CREDENTIALS,
  INITIAL_AUDIT_LOGS
} from '../src/data/mockData';

describe('Supabase Database Integration & Mapping', () => {
  it('safely evaluates Supabase configuration without throwing exceptions', () => {
    const configured = isSupabaseConfigured();
    expect(typeof configured).toBe('boolean');

    const client = getSupabaseClient();
    if (configured) {
      expect(client).not.toBeNull();
    } else {
      expect(client).toBeNull();
    }
  });

  it('bidirectionally maps Challenge models to PostgreSQL table schema', () => {
    const sampleChallenge = INITIAL_CHALLENGES[0];
    const row = mapChallengeToRow(sampleChallenge);

    expect(row.id).toBe(sampleChallenge.id);
    expect(row.code).toBe(sampleChallenge.code);
    expect(row.lat).toBe(sampleChallenge.coordinates.lat);
    expect(row.lng).toBe(sampleChallenge.coordinates.lng);
    expect(row.priority_score).toBe(sampleChallenge.priorityScore);
    expect(row.priority_level).toBe(sampleChallenge.priorityLevel);
    expect(row.report_count).toBe(sampleChallenge.reportCount);

    const rehydrated = mapRowToChallenge(row);
    expect(rehydrated.id).toBe(sampleChallenge.id);
    expect(rehydrated.code).toBe(sampleChallenge.code);
    expect(rehydrated.coordinates.lat).toBe(sampleChallenge.coordinates.lat);
    expect(rehydrated.coordinates.lng).toBe(sampleChallenge.coordinates.lng);
    expect(rehydrated.priorityScore).toBe(sampleChallenge.priorityScore);
    expect(rehydrated.category).toBe(sampleChallenge.category);
  });

  it('bidirectionally maps CitizenReport models to PostgreSQL table schema', () => {
    const sampleReport = MOCK_CITIZEN_REPORTS_JH_1042[0];
    const row = mapReportToRow(sampleReport);

    expect(row.id).toBe(sampleReport.id);
    expect(row.tracking_id).toBe(sampleReport.trackingId);
    expect(row.lat).toBe(sampleReport.coordinates.lat);
    expect(row.lng).toBe(sampleReport.coordinates.lng);

    const rehydrated = mapRowToReport(row);
    expect(rehydrated.id).toBe(sampleReport.id);
    expect(rehydrated.trackingId).toBe(sampleReport.trackingId);
    expect(rehydrated.coordinates.lat).toBe(sampleReport.coordinates.lat);
    expect(rehydrated.coordinates.lng).toBe(sampleReport.coordinates.lng);
    expect(rehydrated.district).toBe(sampleReport.district);
  });

  it('bidirectionally maps CredentialRecord models to PostgreSQL table schema', () => {
    const sampleCred = INITIAL_CREDENTIALS[0];
    const row = mapCredentialToRow(sampleCred);

    expect(row.id).toBe(sampleCred.id);
    expect(row.challenge_code).toBe(sampleCred.challengeCode);
    expect(row.verification_hash).toBe(sampleCred.verificationHash);

    const rehydrated = mapRowToCredential(row);
    expect(rehydrated.id).toBe(sampleCred.id);
    expect(rehydrated.challengeCode).toBe(sampleCred.challengeCode);
    expect(rehydrated.verificationHash).toBe(sampleCred.verificationHash);
    expect(rehydrated.university).toBe(sampleCred.university);
  });

  it('bidirectionally maps AuditEntry models to PostgreSQL table schema', () => {
    const sampleAudit = INITIAL_AUDIT_LOGS[0];
    const row = mapAuditToRow(sampleAudit);

    expect(row.id).toBe(sampleAudit.id);
    expect(row.action).toBe(sampleAudit.action);
    expect(row.actor_name).toBe(sampleAudit.actorName);

    const rehydrated = mapRowToAudit(row);
    expect(rehydrated.id).toBe(sampleAudit.id);
    expect(rehydrated.action).toBe(sampleAudit.action);
    expect(rehydrated.actorName).toBe(sampleAudit.actorName);
  });
});
