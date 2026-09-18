import { CitizenReport, Challenge } from '../types';

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

export const DUPLICATE_DETECTION_KEYWORDS = [
  'water', 'turbidity', 'fluoride', 'yellow', 'smell', 'road', 'culvert', 
  'bridge', 'solar', 'hospital', 'ash',
  // Hindi transliterations
  'paani', 'sadak', 'bijli', 'aspatal', 'nal', 'handpump',
  // Civic infrastructure and health markers
  'contamination', 'pipeline', 'drainage', 'borewell', 'swasthya',
  'transformer', 'pothole', 'arsenic', 'sewage', 'kooda', 'kachra', 'tanki',
  'mud', 'leakage'
];

/**
 * Smart rule-based matching engine for clustering citizen submissions.
 * Uses deterministic weighted scoring across category (30%), geographic proximity (40%),
 * and semantic keyword overlap (30%).
 */
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
  const presentKeywords = DUPLICATE_DETECTION_KEYWORDS.filter(k => queryText.includes(k));

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

/**
 * Pure function to process a citizen report submission, run rule-based similarity,
 * cluster it with an existing challenge if similarity >= 80%, and bump report count.
 */
export function processReportSubmission(
  reportData: Omit<CitizenReport, 'id' | 'trackingId' | 'status' | 'createdAt' | 'updatedAt'>,
  existingReports: CitizenReport[],
  existingChallenges: Challenge[]
): {
  newReport: CitizenReport;
  updatedChallenges: Challenge[];
  similarityScore: number;
  matchedClusterId?: string;
} {
  const id = `RPT-CIT-${Date.now().toString().slice(-4)}`;
  const trackingId = `SS-RPT-${Math.floor(20500 + Math.random() * 9000)}`;
  const now = new Date().toISOString();

  const similarity = analyzeReportSimilarity(reportData, existingReports);

  const newReport: CitizenReport = {
    ...reportData,
    id,
    trackingId,
    evidencePhotos: (reportData.evidencePhotos || []).slice(0, 3),
    status: similarity.similarityScore >= 80 ? 'Clustered' : 'Submitted',
    challengeId: similarity.recommendedClusterId,
    createdAt: now,
    updatedAt: now,
  };

  const updatedChallenges = existingChallenges.map(c => {
    if (similarity.recommendedClusterId && (c.id === similarity.recommendedClusterId || c.code === similarity.recommendedClusterId)) {
      return {
        ...c,
        reportCount: c.reportCount + 1,
        affectedPopulation: c.affectedPopulation + (reportData.affectedCountEstimate || 50),
        updatedAt: now,
      };
    }
    return c;
  });

  return {
    newReport,
    updatedChallenges,
    similarityScore: similarity.similarityScore,
    matchedClusterId: similarity.recommendedClusterId,
  };
}
