import { describe, it, expect } from 'vitest';
import { INITIAL_CHALLENGES } from '../src/data/mockData';

describe('GIS Map & Geospatial Data Integration', () => {
  it('all challenges have valid geographic coordinates located within Jharkhand bounds', () => {
    expect(INITIAL_CHALLENGES.length).toBeGreaterThanOrEqual(6);

    for (const c of INITIAL_CHALLENGES) {
      // Jharkhand latitude is approx 21.98 to 25.33 N
      expect(c.coordinates.lat).toBeGreaterThanOrEqual(21.5);
      expect(c.coordinates.lat).toBeLessThanOrEqual(25.5);

      // Jharkhand longitude is approx 83.33 to 87.95 E
      expect(c.coordinates.lng).toBeGreaterThanOrEqual(83.0);
      expect(c.coordinates.lng).toBeLessThanOrEqual(88.0);
    }
  });

  it('contains expected districts and categories for map layer filters', () => {
    const districts = Array.from(new Set(INITIAL_CHALLENGES.map(c => c.district)));
    const categories = Array.from(new Set(INITIAL_CHALLENGES.map(c => c.category)));

    expect(districts).toContain('Dumka');
    expect(districts).toContain('Dhanbad');
    expect(districts).toContain('Ranchi');

    expect(categories).toContain('Water & Sanitation');
    expect(categories.length).toBeGreaterThanOrEqual(3);
  });

  it('all challenges have complete data necessary for MapPopupContent and LiveMap details panel', () => {
    for (const c of INITIAL_CHALLENGES) {
      expect(c.code).toMatch(/^JH-[A-Z]+-\d+/);
      expect(c.title).toBeTruthy();
      expect(c.locality).toBeTruthy();
      expect(c.district).toBeTruthy();
      expect(c.reportCount).toBeGreaterThanOrEqual(1);
      expect(c.affectedPopulation).toBeGreaterThan(0);
      expect(c.priorityScore).toBeGreaterThanOrEqual(0);
      expect(c.priorityScore).toBeLessThanOrEqual(100);
      expect(c.breakdown).toBeDefined();
      expect(c.breakdown.severity).toBeGreaterThan(0);
      expect(c.breakdown.populationImpact).toBeGreaterThan(0);
      expect(c.requiredSkills.length).toBeGreaterThan(0);
      expect(c.suggestedDepartments.length).toBeGreaterThan(0);
    }
  });

  it('accurately calculates telemetry aggregates for the Live GIS Map bar', () => {
    const total = INITIAL_CHALLENGES.length;
    const critical = INITIAL_CHALLENGES.filter(c => c.priorityLevel === 'CRITICAL' && c.status !== 'resolved').length;
    const adopted = INITIAL_CHALLENGES.filter(c => ['adopted', 'in_progress'].includes(c.status)).length;
    const resolved = INITIAL_CHALLENGES.filter(c => c.status === 'resolved').length;
    const inVerification = INITIAL_CHALLENGES.filter(c => c.status === 'impact_verification').length;
    const totalAffected = INITIAL_CHALLENGES.reduce((acc, c) => acc + (c.affectedPopulation || 0), 0);

    expect(total).toBeGreaterThanOrEqual(6);
    expect(critical).toBeGreaterThanOrEqual(1);
    expect(adopted).toBeGreaterThanOrEqual(1);
    expect(inVerification).toBeGreaterThanOrEqual(1);
    expect(resolved).toBeGreaterThanOrEqual(0);
    expect(totalAffected).toBeGreaterThan(10000);
  });
});
