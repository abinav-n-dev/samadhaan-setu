import { describe, it, expect } from 'vitest';
import { calculateDistanceKm, analyzeReportSimilarity } from '../src/services/duplicateService';
import { CitizenReport } from '../src/types';

describe('duplicateService', () => {
  describe('calculateDistanceKm', () => {
    it('returns 0 for identical coordinates', () => {
      const dist = calculateDistanceKm(24.269, 87.248, 24.269, 87.248);
      expect(dist).toBeCloseTo(0, 4);
    });

    it('calculates approximately correct distance between known points', () => {
      // Dumka (~24.269, 87.248) to Ranchi (~23.344, 85.309)
      // Great-circle distance is roughly 220-230 km
      const dist = calculateDistanceKm(24.269, 87.248, 23.344, 85.309);
      expect(dist).toBeGreaterThan(200);
      expect(dist).toBeLessThan(250);
    });

    it('calculates close local distances accurately', () => {
      // Roughly 0.01 deg lat is ~1.11 km
      const dist = calculateDistanceKm(24.269, 87.248, 24.279, 87.248);
      expect(dist).toBeGreaterThan(1.0);
      expect(dist).toBeLessThan(1.2);
    });
  });

  describe('analyzeReportSimilarity', () => {
    const existingReports: CitizenReport[] = [
      {
        id: 'RPT-001',
        trackingId: 'SS-RPT-1001',
        challengeId: 'c-wtr-1042',
        title: 'Severe fluoride turbidity in Hansdiha drinking water pump',
        description: 'Water has turned yellow-brown with high TDS and pungent smell. Over 180 residents affected.',
        category: 'Water & Sanitation',
        district: 'Dumka',
        block: 'Hansdiha Block',
        locality: 'Hansdiha',
        coordinates: { lat: 24.269, lng: 87.248 },
        affectedCountEstimate: 180,
        urgencyLevel: 'Emergency',
        evidencePhotos: [],
        status: 'Clustered',
        submittedBy: 'Sunita Soren',
        createdAt: '2026-09-12T10:00:00Z',
        updatedAt: '2026-09-12T10:00:00Z',
      },
      {
        id: 'RPT-002',
        trackingId: 'SS-RPT-1002',
        challengeId: 'c-rd-0981',
        title: 'Road washed out near bridge culvert',
        description: 'Heavy rain destroyed the rural road and blocked ambulance access.',
        category: 'Roads & Infrastructure',
        district: 'Khunti',
        block: 'Torpa Block',
        locality: 'Torpa',
        coordinates: { lat: 23.076, lng: 85.279 },
        affectedCountEstimate: 300,
        urgencyLevel: 'High',
        evidencePhotos: [],
        status: 'Submitted',
        submittedBy: 'Karan Mehra',
        createdAt: '2026-09-10T10:00:00Z',
        updatedAt: '2026-09-10T10:00:00Z',
      },
    ];

    it('returns 0 score when description or coordinates are missing', () => {
      const result1 = analyzeReportSimilarity({}, existingReports);
      expect(result1.similarityScore).toBe(0);
      expect(result1.matchingReports).toHaveLength(0);

      const result2 = analyzeReportSimilarity({ description: 'Testing' }, existingReports);
      expect(result2.similarityScore).toBe(0);
    });

    it('identifies high similarity for nearby report with same category and keywords', () => {
      const newReport: Partial<CitizenReport> = {
        title: 'Yellow water and fluoride odor in community handpump',
        description: 'Turbidity is very bad and water tastes foul with high smell. Village residents getting sick.',
        category: 'Water & Sanitation',
        coordinates: { lat: 24.270, lng: 87.249 }, // ~150m away from RPT-001
      };

      const result = analyzeReportSimilarity(newReport, existingReports);
      // Category match: 30
      // Proximity <= 5km: 40
      // Keywords ('water', 'turbidity', 'fluoride', 'yellow', 'smell'): matches min(30, 5*10) = 30
      // Total = 100 -> capped at 98
      expect(result.similarityScore).toBeGreaterThanOrEqual(80);
      expect(result.matchingReports).toHaveLength(1);
      expect(result.matchingReports[0].id).toBe('RPT-001');
      expect(result.recommendedClusterId).toBe('c-wtr-1042');
      expect(result.reasons.length).toBeGreaterThan(0);
    });

    it('does not match reports from different categories and distant locations', () => {
      const newReport: Partial<CitizenReport> = {
        title: 'Hospital solar inverter broken',
        description: 'Clinic power backup is offline.',
        category: 'Healthcare',
        coordinates: { lat: 24.482, lng: 86.702 }, // In Deoghar
      };

      const result = analyzeReportSimilarity(newReport, existingReports);
      expect(result.matchingReports).toHaveLength(0);
      expect(result.similarityScore).toBeLessThan(65);
    });

    it('matches Hindi transliterated keywords (paani, handpump, nal, sadak)', () => {
      const newReportHindi: Partial<CitizenReport> = {
        title: 'Gaon ka handpump kharab hai aur ganda paani nikal raha hai',
        description: 'Borewell nal se peela paani aa raha hai, handpump pipe me leakage hai.',
        category: 'Water & Sanitation',
        coordinates: { lat: 24.270, lng: 87.249 },
      };

      const result = analyzeReportSimilarity(newReportHindi, existingReports);
      expect(result.similarityScore).toBeGreaterThanOrEqual(70);
      expect(result.matchingReports.length).toBeGreaterThanOrEqual(1);
    });
  });
});

