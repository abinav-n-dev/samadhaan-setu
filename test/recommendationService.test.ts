import { describe, it, expect } from 'vitest';
import { getUniversityRecommendation } from '../src/services/recommendationService';
import { Challenge } from '../src/types';

describe('recommendationService', () => {
  const sampleChallenge: Challenge = {
    id: 'c-test-01',
    code: 'JH-TEST-01',
    title: 'Solar Water Micro-Filtration',
    description: 'Water filtration testing',
    category: 'Water & Sanitation',
    district: 'Dumka',
    block: 'Hansdiha Block',
    locality: 'Hansdiha',
    coordinates: { lat: 24.269, lng: 87.248 },
    status: 'verified',
    priorityScore: 90,
    priorityLevel: 'CRITICAL',
    breakdown: {
      severity: 90,
      populationImpact: 90,
      geographicSpread: 80,
      urgency: 90,
      duplicateSignal: 80,
      feasibility: 80,
      overallScore: 90,
      level: 'CRITICAL',
    },
    reportCount: 10,
    affectedPopulation: 1500,
    affectedVillages: ['Village A'],
    department: 'Drinking Water Dept',
    requiredSkills: ['Environmental Engineering', 'IoT Sensor Telemetry', 'Solar Water Filtration'],
    suggestedDepartments: ['Environmental Engineering', 'Civil Engineering'],
    verificationStatus: 'verified',
    photos: [],
    createdAt: '2026-09-12T10:00:00Z',
    updatedAt: '2026-09-12T10:00:00Z',
  };

  it('calculates high match for matching department and overlapping skills', () => {
    const studentProfile = {
      university: 'BIT Mesra',
      department: 'Environmental Engineering',
      skills: ['IoT Sensor Telemetry', 'Solar Water Filtration', 'Microcontrollers'],
    };

    const match = getUniversityRecommendation(sampleChallenge, studentProfile);
    // Base: 50
    // Dept match: +25
    // Skills match: 2 matching * 7 = +14
    // Regional priority (Dumka): +5
    // Expected ~94
    expect(match.matchScore).toBeGreaterThanOrEqual(90);
    expect(match.matchScore).toBeLessThanOrEqual(96);
    expect(match.reasons.length).toBeGreaterThanOrEqual(3);
  });

  it('calculates lower score when department does not match and skills differ', () => {
    const studentProfile = {
      university: 'Some College',
      department: 'English Literature',
      skills: ['Creative Writing', 'Public Relations'],
    };

    const distantChallenge = {
      ...sampleChallenge,
      district: 'Bokaro',
    };

    const match = getUniversityRecommendation(distantChallenge, studentProfile);
    // Base 50, no dept match (+0), no skill match (+0), not Dumka/Ranchi (+0)
    expect(match.matchScore).toBe(50);
  });

  it('clamps matchScore between 45 and 96', () => {
    const studentProfile = {
      university: 'Top Tech',
      department: 'Environmental Engineering',
      skills: ['Environmental Engineering', 'IoT Sensor Telemetry', 'Solar Water Filtration', 'Extra Skill'],
    };

    const match = getUniversityRecommendation(sampleChallenge, studentProfile);
    expect(match.matchScore).toBeLessThanOrEqual(96);
    expect(match.matchScore).toBeGreaterThanOrEqual(45);
  });
});

