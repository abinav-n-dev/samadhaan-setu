import { PriorityBreakdown, PriorityLevel } from '../types';

export function calculatePriorityScore(factors: {
  severity: number;
  populationImpact: number;
  geographicSpread: number;
  urgency: number;
  duplicateSignal: number;
  feasibility: number;
}): PriorityBreakdown {
  // Weights defined in the product specification:
  // Severity: 30%
  // Population Impact: 25%
  // Geographic Spread: 15%
  // Urgency: 15%
  // Duplicate / Community Signal: 10%
  // Feasibility: 5%
  const weightedScore = Math.round(
    factors.severity * 0.30 +
    factors.populationImpact * 0.25 +
    factors.geographicSpread * 0.15 +
    factors.urgency * 0.15 +
    factors.duplicateSignal * 0.10 +
    factors.feasibility * 0.05
  );

  let level: PriorityLevel = 'LOW';
  if (weightedScore >= 85) level = 'CRITICAL';
  else if (weightedScore >= 70) level = 'HIGH';
  else if (weightedScore >= 50) level = 'MEDIUM';

  return {
    ...factors,
    overallScore: Math.min(100, Math.max(0, weightedScore)),
    level,
  };
}

export function getPriorityColorClass(level: PriorityLevel): {
  bg: string;
  text: string;
  border: string;
  badgeBg: string;
} {
  switch (level) {
    case 'CRITICAL':
      return {
        bg: 'bg-red-500',
        text: 'text-red-700',
        border: 'border-red-200',
        badgeBg: 'bg-red-50 text-red-700 border-red-200',
      };
    case 'HIGH':
      return {
        bg: 'bg-orange-500',
        text: 'text-orange-700',
        border: 'border-orange-200',
        badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
      };
    case 'MEDIUM':
      return {
        bg: 'bg-amber-500',
        text: 'text-amber-700',
        border: 'border-amber-200',
        badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
      };
    case 'LOW':
    default:
      return {
        bg: 'bg-emerald-500',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      };
  }
}

