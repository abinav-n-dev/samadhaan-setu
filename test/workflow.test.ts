import { describe, it, expect } from 'vitest';
import { 
  INITIAL_CHALLENGES, 
  MOCK_CITIZEN_REPORTS_JH_1042 
} from '../src/data/mockData';
import { analyzeReportSimilarity } from '../src/services/duplicateService';
import { calculatePriorityScore } from '../src/services/priorityService';
import { 
  Challenge, 
  CitizenReport, 
  UniversityTeam, 
  IndustrySupport, 
  FieldEvidence, 
  ImpactVerification, 
  CredentialRecord 
} from '../src/types';

describe('SamadhanSetu End-to-End Civic Innovation Workflow', () => {
  // We simulate the lifecycle of a civic problem through all 8 stakeholder phases

  it('executes the full 8-step ecosystem pipeline without data anomalies', () => {
    // Stage 1: Citizen Problem Intake
    const rawCitizenReport = {
      title: 'Borewell water turned yellow and smelling in Hansdiha',
      description: 'Water has turned yellow-brown with high turbidity and smell. Multiple children sick with stomach cramps.',
      category: 'Water & Sanitation',
      district: 'Dumka',
      block: 'Hansdiha Block',
      locality: 'Hansdiha Ward 2',
      coordinates: { lat: 24.2692, lng: 87.2482 },
      affectedCountEstimate: 150,
      urgencyLevel: 'Emergency' as const,
      evidencePhotos: ['https://images.unsplash.com/photo-water.jpg'],
      submittedBy: 'Sunita Soren',
    };

    const duplicateResult = analyzeReportSimilarity(rawCitizenReport, MOCK_CITIZEN_REPORTS_JH_1042);
    expect(duplicateResult.similarityScore).toBeGreaterThanOrEqual(80);
    expect(duplicateResult.recommendedClusterId).toBe('c-wtr-1042');

    // Stage 2: Synthesis into Challenge
    const initialFactors = {
      severity: 96,
      populationImpact: 91,
      geographicSpread: 76,
      urgency: 95,
      duplicateSignal: 88,
      feasibility: 82,
    };
    const calculatedBreakdown = calculatePriorityScore(initialFactors);
    expect(calculatedBreakdown.overallScore).toBe(90);
    expect(calculatedBreakdown.level).toBe('CRITICAL');

    let challenge: Challenge = {
      id: 'c-test-1042',
      code: 'JH-WTR-TEST',
      title: 'Contaminated Drinking Water in Hansdiha Cluster',
      description: rawCitizenReport.description,
      category: rawCitizenReport.category,
      district: rawCitizenReport.district,
      block: rawCitizenReport.block,
      locality: rawCitizenReport.locality,
      coordinates: rawCitizenReport.coordinates,
      status: 'unverified',
      priorityScore: calculatedBreakdown.overallScore,
      priorityLevel: calculatedBreakdown.level,
      breakdown: calculatedBreakdown,
      reportCount: 38,
      affectedPopulation: 2840,
      affectedVillages: ['Hansdiha', 'Kathikund'],
      department: 'Drinking Water & Sanitation Dept',
      requiredSkills: ['Environmental Engineering', 'IoT Sensor Telemetry', 'Solar Water Filtration'],
      suggestedDepartments: ['Environmental Engineering', 'Civil Engineering'],
      verificationStatus: 'unverified',
      photos: rawCitizenReport.evidencePhotos,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    expect(challenge.status).toBe('unverified');

    // Stage 3: Administrative Verification & Priority Override
    challenge = {
      ...challenge,
      status: 'verified',
      verificationStatus: 'verified',
      verifiedAt: new Date().toISOString(),
      verifiedBy: 'Sanjay K. Verma, IAS (DM Dumka)',
      priorityScore: 94,
      priorityLevel: 'CRITICAL',
      governmentOverride: {
        originalScore: 90,
        originalLevel: 'CRITICAL',
        overrideScore: 94,
        overrideLevel: 'CRITICAL',
        reason: 'Urgent health hazard validated by District Health Officer',
        officerName: 'Sanjay K. Verma, IAS',
        timestamp: new Date().toISOString(),
      },
    };
    expect(challenge.verificationStatus).toBe('verified');
    expect(challenge.governmentOverride?.overrideScore).toBe(94);

    // Stage 4: University Adoption by Student Engineering Team
    const studentProposal: UniversityTeam = {
      teamId: 'TEAM-BIT-01',
      teamName: 'AquaShield Innovators',
      university: 'Birla Institute of Technology (BIT) Mesra',
      department: 'Environmental Engineering',
      leadStudent: 'Aarav Sengupta',
      teamMembers: ['Aarav Sengupta', 'Ananya Sharma', 'Rohan Dutta', 'Vikramaditya Roy'],
      facultyMentor: 'Dr. Rameshwar Mahato',
      proposedTech: ['Solar Membrane Ultrafiltration', 'Activated Alumina Fluoride Adsorber', 'ESP32 IoT Telemetry'],
      proposalSummary: 'Community scale solar filtration kiosk with real-time water quality IoT sensing.',
      adoptionDate: new Date().toISOString(),
      mentorStatus: 'pending',
      milestones: [
        { id: 'm1', title: 'Lab Water Assay', description: 'Sample testing', dueDate: '2026-09-25', completed: false },
        { id: 'm2', title: 'Prototype Assembly', description: 'Membrane integration', dueDate: '2026-10-10', completed: false },
      ],
    };

    challenge = {
      ...challenge,
      status: 'adopted',
      adoption: studentProposal,
    };
    expect(challenge.status).toBe('adopted');
    expect(challenge.adoption?.mentorStatus).toBe('pending');

    // Stage 5: Faculty Academic Mentor Approval
    challenge = {
      ...challenge,
      status: 'in_progress',
      adoption: {
        ...challenge.adoption!,
        mentorStatus: 'approved',
        mentorNotes: 'Approved for university academic capstone credit.',
      },
    };
    expect(challenge.status).toBe('in_progress');
    expect(challenge.adoption?.mentorStatus).toBe('approved');

    // Stage 6: Corporate CSR Capital Pledged (Section 135)
    const csrSupport: IndustrySupport = {
      supportId: 'IND-TATA-01',
      partnerName: 'Tata Steel Foundation',
      organization: 'Tata Steel Ltd, Jamshedpur',
      supportType: 'CSR Grant',
      commitmentDetails: 'Grant of ₹3,80,000 for ultrafiltration membrane cartridges.',
      assignedMentor: 'Er. Rajesh Sharma',
      status: 'Active',
      committedDate: new Date().toISOString(),
    };

    challenge = {
      ...challenge,
      status: 'implementation',
      industrySupport: csrSupport,
    };
    expect(challenge.status).toBe('implementation');
    expect(challenge.industrySupport?.partnerName).toBe('Tata Steel Foundation');

    // Stage 7: NGO Field Deployment & Ground Telemetry Evidence
    const groundEvidence: FieldEvidence = {
      partnerName: 'Pratham Gramin Vikas Trust',
      ngoName: 'Pratham Gramin Vikas Trust',
      photos: ['https://images.unsplash.com/kiosk.jpg'],
      installationReport: 'Solar filtration unit active. 1,200 L/hr capacity.',
      measuredTdsBefore: 890,
      measuredTdsAfter: 142,
      beneficiariesCount: 2615,
      officerNotes: 'Gram Sabha sign-off completed.',
      submissionDate: new Date().toISOString(),
      status: 'Submitted',
    };

    challenge = {
      ...challenge,
      status: 'impact_verification',
      fieldEvidence: groundEvidence,
    };
    expect(challenge.status).toBe('impact_verification');
    expect(challenge.fieldEvidence?.measuredTdsAfter).toBe(142);

    // Stage 8: Government Impact Verification & Cryptographic Credential Minting
    const impactVerification: ImpactVerification = {
      originalAffectedPop: challenge.affectedPopulation,
      actualReachedCount: challenge.fieldEvidence.beneficiariesCount,
      verificationDate: new Date().toISOString(),
      verifiedByOfficer: 'Sanjay K. Verma, IAS (DM Dumka)',
      department: challenge.department,
      credentialId: 'SS-2026-TEST',
      status: 'Verified',
      remarks: 'Verified 92.1% population coverage. Water quality within BIS 10500 standards.',
    };

    challenge = {
      ...challenge,
      status: 'resolved',
      impactVerification,
    };

    const credential: CredentialRecord = {
      id: impactVerification.credentialId,
      challengeCode: challenge.code,
      title: challenge.title,
      district: challenge.district,
      state: 'Jharkhand',
      university: challenge.adoption!.university,
      teamName: challenge.adoption!.teamName,
      teamMembers: challenge.adoption!.teamMembers,
      facultyMentor: challenge.adoption!.facultyMentor,
      industryPartner: challenge.industrySupport!.partnerName,
      fieldPartner: challenge.fieldEvidence!.ngoName,
      impactPopulation: challenge.fieldEvidence!.beneficiariesCount,
      verificationHash: '0x8f3c1a9e7d2b45f6a1e8c9b03417e298db54cf60a749321e',
      issuedAt: impactVerification.verificationDate,
      governmentDepartment: challenge.department,
      verifiedByOfficer: impactVerification.verifiedByOfficer,
      status: 'VERIFIED',
    };

    expect(challenge.status).toBe('resolved');
    expect(credential.status).toBe('VERIFIED');
    expect(credential.impactPopulation).toBe(2615);
    expect(credential.verificationHash.startsWith('0x')).toBe(true);
  });
});

