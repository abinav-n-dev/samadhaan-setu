import { Challenge } from '../types';

export interface RecommendationMatch {
  matchScore: number; // e.g. 92%
  reasons: string[];
}

export function getUniversityRecommendation(
  challenge: Challenge,
  studentProfile: {
    university: string;
    department: string;
    skills: string[];
  }
): RecommendationMatch {
  let score = 50; // Base score
  const reasons: string[] = [];

  // Department compatibility check
  const deptMatch = challenge.suggestedDepartments.some(d => 
    d.toLowerCase().includes(studentProfile.department.toLowerCase()) ||
    studentProfile.department.toLowerCase().includes(d.toLowerCase())
  );
  if (deptMatch) {
    score += 25;
    reasons.push(`${studentProfile.department} curricular match`);
  }

  // Skills overlap
  const matchingSkills = challenge.requiredSkills.filter(reqSkill =>
    studentProfile.skills.some(userSkill => 
      userSkill.toLowerCase().includes(reqSkill.toLowerCase()) || 
      reqSkill.toLowerCase().includes(userSkill.toLowerCase())
    )
  );

  if (matchingSkills.length > 0) {
    const skillBonus = Math.min(20, matchingSkills.length * 7);
    score += skillBonus;
    reasons.push(`Core competencies: ${matchingSkills.join(', ')}`);
  }

  // Location/geographic priority
  if (challenge.district.toLowerCase() === 'dumka' || challenge.district.toLowerCase() === 'ranchi') {
    score += 5;
    reasons.push('High regional priority in Jharkhand state focus zone');
  }

  return {
    matchScore: Math.min(96, Math.max(45, score)),
    reasons,
  };
}

