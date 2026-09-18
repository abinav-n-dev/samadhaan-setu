import { describe, it, expect } from 'vitest';
import { calculatePriorityScore, getPriorityColorClass } from '../src/services/priorityService';
import { PriorityLevel } from '../src/types';

describe('priorityService', () => {
  describe('calculatePriorityScore', () => {
    it('calculates weighted score according to exact formula', () => {
      // Formula:
      // severity * 0.30 + populationImpact * 0.25 + geographicSpread * 0.15 + urgency * 0.15 + duplicateSignal * 0.10 + feasibility * 0.05
      const factors = {
        severity: 100, // 30
        populationImpact: 100, // 25
        geographicSpread: 100, // 15
        urgency: 100, // 15
        duplicateSignal: 100, // 10
        feasibility: 100, // 5
      };
      const result = calculatePriorityScore(factors);
      expect(result.overallScore).toBe(100);
      expect(result.level).toBe('CRITICAL');
    });

    it('classifies CRITICAL for scores >= 85', () => {
      const factors = {
        severity: 90, // 27
        populationImpact: 90, // 22.5
        geographicSpread: 80, // 12
        urgency: 80, // 12
        duplicateSignal: 80, // 8
        feasibility: 80, // 4
      }; // sum = 85.5 -> 86
      const result = calculatePriorityScore(factors);
      expect(result.overallScore).toBe(86);
      expect(result.level).toBe('CRITICAL');
    });

    it('classifies HIGH for scores >= 70 and < 85', () => {
      const factors = {
        severity: 75,
        populationImpact: 75,
        geographicSpread: 75,
        urgency: 75,
        duplicateSignal: 75,
        feasibility: 75,
      }; // sum = 75
      const result = calculatePriorityScore(factors);
      expect(result.overallScore).toBe(75);
      expect(result.level).toBe('HIGH');
    });

    it('classifies MEDIUM for scores >= 50 and < 70', () => {
      const factors = {
        severity: 55,
        populationImpact: 55,
        geographicSpread: 55,
        urgency: 55,
        duplicateSignal: 55,
        feasibility: 55,
      }; // sum = 55
      const result = calculatePriorityScore(factors);
      expect(result.overallScore).toBe(55);
      expect(result.level).toBe('MEDIUM');
    });

    it('classifies LOW for scores < 50', () => {
      const factors = {
        severity: 30,
        populationImpact: 30,
        geographicSpread: 30,
        urgency: 30,
        duplicateSignal: 30,
        feasibility: 30,
      }; // sum = 30
      const result = calculatePriorityScore(factors);
      expect(result.overallScore).toBe(30);
      expect(result.level).toBe('LOW');
    });

    it('handles minimum boundary 0 and clamps properly', () => {
      const factors = {
        severity: 0,
        populationImpact: 0,
        geographicSpread: 0,
        urgency: 0,
        duplicateSignal: 0,
        feasibility: 0,
      };
      const result = calculatePriorityScore(factors);
      expect(result.overallScore).toBe(0);
      expect(result.level).toBe('LOW');
    });
  });

  describe('getPriorityColorClass', () => {
    it('returns red classes for CRITICAL', () => {
      const colors = getPriorityColorClass('CRITICAL');
      expect(colors.bg).toBe('bg-red-500');
      expect(colors.text).toBe('text-red-700');
      expect(colors.border).toBe('border-red-200');
    });

    it('returns orange classes for HIGH', () => {
      const colors = getPriorityColorClass('HIGH');
      expect(colors.bg).toBe('bg-orange-500');
      expect(colors.text).toBe('text-orange-700');
    });

    it('returns amber classes for MEDIUM', () => {
      const colors = getPriorityColorClass('MEDIUM');
      expect(colors.bg).toBe('bg-amber-500');
      expect(colors.text).toBe('text-amber-700');
    });

    it('returns emerald classes for LOW', () => {
      const colors = getPriorityColorClass('LOW');
      expect(colors.bg).toBe('bg-emerald-500');
      expect(colors.text).toBe('text-emerald-700');
    });
  });
});

