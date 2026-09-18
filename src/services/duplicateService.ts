import { CitizenReport } from '../types';

export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function analyzeReportSimilarity(
  newReport: Partial<CitizenReport>,
  existingReports: CitizenReport[]
): {
  similarityScore: number;
  matchingReports: CitizenReport[];
  recommendedClusterId?: string;
  reasons: string[];
} {
  if (!newReport.description || !newReport.coordinates) {
    return { similarityScore: 0, matchingReports: [], reasons: [] };
  }

  const queryText = `${newReport.title || ''} ${newReport.description || ''}`.toLowerCase();
  const keywords = ['water', 'turbidity', 'fluoride', 'yellow', 'smell', 'road', 'culvert', 'bridge', 'solar', 'hospital', 'ash'];
  const presentKeywords = keywords.filter(k => queryText.includes(k));

  const matchingReports: CitizenReport[] = [];
  let maxScore = 0;
  const reasons: string[] = [];

  for (const rep of existingReports) {
    let score = 0;
    
    // Category match
    if (rep.category === newReport.category) {
      score += 30;
    }

    // Geographic proximity
    const dist = calculateDistanceKm(
      newReport.coordinates.lat,
      newReport.coordinates.lng,
      rep.coordinates.lat,
      rep.coordinates.lng
    );

    if (dist <= 5) score += 40;
    else if (dist <= 15) score += 25;
    else if (dist <= 30) score += 10;

    // Text keyword similarity
    const repText = `${rep.title} ${rep.description}`.toLowerCase();
    const commonKeywords = presentKeywords.filter(k => repText.includes(k));
    if (commonKeywords.length > 0) {
      score += Math.min(30, commonKeywords.length * 10);
    }

    if (score >= 65) {
      matchingReports.push(rep);
      if (score > maxScore) maxScore = score;
    }
  }

  if (matchingReports.length > 0) {
    reasons.push(`${matchingReports.length} related submissions detected within geographic cluster`);
    if (presentKeywords.length > 0) {
      reasons.push(`Overlapping semantic markers: ${presentKeywords.join(', ')}`);
    }
  }

  return {
    similarityScore: Math.min(98, maxScore),
    matchingReports,
    recommendedClusterId: matchingReports[0]?.challengeId,
    reasons,
  };
}

