import { describe, it, expect } from 'vitest';
import { 
  INITIAL_CHALLENGES, 
  MOCK_CITIZEN_REPORTS_JH_1042, 
  INITIAL_CREDENTIALS, 
  INITIAL_AUDIT_LOGS, 
  INITIAL_NOTIFICATIONS 
} from '../src/data/mockData';

describe('mockData integrity', () => {
  it('has valid INITIAL_CHALLENGES with unique IDs and codes', () => {
    expect(INITIAL_CHALLENGES.length).toBeGreaterThanOrEqual(6);
    const ids = new Set<string>();
    const codes = new Set<string>();

    for (const c of INITIAL_CHALLENGES) {
      expect(ids.has(c.id)).toBe(false);
      ids.add(c.id);

      expect(codes.has(c.code)).toBe(false);
      codes.add(c.code);

      expect(c.title.length).toBeGreaterThan(5);
      expect(c.district.length).toBeGreaterThan(1);
      expect(c.coordinates.lat).toBeGreaterThan(20);
      expect(c.coordinates.lat).toBeLessThan(26);
      expect(c.coordinates.lng).toBeGreaterThan(83);
      expect(c.coordinates.lng).toBeLessThan(89);

      expect(c.priorityScore).toBeGreaterThanOrEqual(0);
      expect(c.priorityScore).toBeLessThanOrEqual(100);
      expect(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']).toContain(c.priorityLevel);
      expect(c.affectedPopulation).toBeGreaterThan(0);
      expect(c.requiredSkills.length).toBeGreaterThan(0);
      expect(c.suggestedDepartments.length).toBeGreaterThan(0);
    }
  });

  it('has valid MOCK_CITIZEN_REPORTS_JH_1042', () => {
    expect(MOCK_CITIZEN_REPORTS_JH_1042.length).toBe(37);
    const trackingIds = new Set<string>();

    for (const r of MOCK_CITIZEN_REPORTS_JH_1042) {
      expect(trackingIds.has(r.trackingId)).toBe(false);
      trackingIds.add(r.trackingId);

      expect(r.challengeId).toBe('c-wtr-1042');
      expect(r.category).toBe('Water & Sanitation');
      expect(r.district).toBe('Dumka');
      expect(r.coordinates.lat).toBeGreaterThan(24.1);
      expect(r.coordinates.lat).toBeLessThan(24.5);
      expect(r.coordinates.lng).toBeGreaterThan(87.1);
      expect(r.coordinates.lng).toBeLessThan(87.5);
      expect(r.submittedBy.length).toBeGreaterThan(0);
    }
  });

  it('has valid INITIAL_CREDENTIALS with valid cryptographic hashes', () => {
    expect(INITIAL_CREDENTIALS.length).toBeGreaterThanOrEqual(2);
    for (const cred of INITIAL_CREDENTIALS) {
      expect(cred.id).toMatch(/^SS-\d{4}-\d+/);
      expect(cred.verificationHash).toMatch(/^0x[a-f0-9]{48}/);
      expect(cred.status).toBe('VERIFIED');
      expect(cred.impactPopulation).toBeGreaterThan(0);
      expect(cred.university.length).toBeGreaterThan(0);
    }
  });

  it('has chronological INITIAL_AUDIT_LOGS with required fields', () => {
    expect(INITIAL_AUDIT_LOGS.length).toBeGreaterThanOrEqual(8);
    for (const log of INITIAL_AUDIT_LOGS) {
      expect(log.id).toBeDefined();
      expect(log.timestamp).toBeDefined();
      expect(log.actorRole).toBeDefined();
      expect(log.actorName).toBeDefined();
      expect(log.action.length).toBeGreaterThan(0);
      expect(log.details.length).toBeGreaterThan(0);
    }
  });

  it('has INITIAL_NOTIFICATIONS with target roles and links', () => {
    expect(INITIAL_NOTIFICATIONS.length).toBeGreaterThanOrEqual(4);
    for (const notif of INITIAL_NOTIFICATIONS) {
      expect(notif.id).toBeDefined();
      expect(notif.title.length).toBeGreaterThan(0);
      expect(notif.link).toBeDefined();
      expect(notif.link?.startsWith('/')).toBe(true);
    }
  });
});

