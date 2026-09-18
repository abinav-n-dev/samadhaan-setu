import { describe, it, expect } from 'vitest';
import { 
  INITIAL_CHALLENGES, 
  MOCK_CITIZEN_REPORTS_JH_1042 
} from '../src/data/mockData';
import { analyzeReportSimilarity, processReportSubmission } from '../src/services/duplicateService';
import { calculatePriorityScore } from '../src/services/priorityService';
import { 
  buildCredentialRecordData, 
  computeHash, 
  verifyHash 
} from '../src/services/credentialService';
import { safeParseJSON } from '../src/context/StateContext';
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
      evidencePhotos: ['/images/water-turbid.svg'],
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
      photos: ['/images/field-evidence.svg'],
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

  it('verifyImpact builds credential from the correct challenge data without hardcoded fallbacks', () => {
    const customChallenge = {
      code: 'JH-ROD-2026',
      title: 'Damaged Culvert Bridge in Shikaripara',
      district: 'Dumka',
      state: 'Jharkhand',
      department: 'Rural Works Department',
      affectedPopulation: 1400,
      adoption: {
        university: 'National Institute of Technology (NIT) Jamshedpur',
        teamName: 'BridgeCraft Innovators',
        teamMembers: ['Aman Verma', 'Pooja Rani'],
        facultyMentor: 'Dr. S. K. Choudhary',
      },
      industrySupport: {
        partnerName: 'Larsen & Toubro CSR',
      },
      fieldEvidence: {
        ngoName: 'Gram Vikas Kendra',
        beneficiariesCount: 1350,
      },
    };

    const cred = buildCredentialRecordData(
      customChallenge,
      {
        actualReachedCount: 1350,
        verifiedByOfficer: 'A. K. Mishra, Executive Engineer',
        department: 'Rural Works Department',
      },
      '2026-09-18T10:00:00Z',
      'SS-2026-ROD-01'
    );

    expect(cred.university).toBe('National Institute of Technology (NIT) Jamshedpur');
    expect(cred.teamName).toBe('BridgeCraft Innovators');
    expect(cred.industryPartner).toBe('Larsen & Toubro CSR');
    expect(cred.fieldPartner).toBe('Gram Vikas Kendra');
    expect(cred.impactPopulation).toBe(1350);
    expect(cred.verifiedByOfficer).toBe('A. K. Mishra, Executive Engineer');
  });

  it('computes real SHA-256 hash and verifies via verifyHash', async () => {
    const credBase = {
      id: 'SS-2026-TEST-99',
      challengeCode: 'JH-WTR-TEST',
      teamName: 'CleanWater Pioneers',
      university: 'IIT ISM Dhanbad',
      teamMembers: ['Ravi Kumar', 'Sneha Roy'],
      impactPopulation: 1200,
      issuedAt: '2026-09-19T00:00:00Z',
      verifiedByOfficer: 'DC Dumka',
      governmentDepartment: 'Drinking Water & Sanitation Dept',
    };

    const hash = await computeHash(credBase);
    expect(hash).toMatch(/^0x[a-f0-9]{64}$/);

    const fullCred: CredentialRecord = {
      ...credBase,
      title: 'Test Clean Water',
      district: 'Dumka',
      state: 'Jharkhand',
      facultyMentor: 'Dr. Mentor',
      industryPartner: 'CSR Partner',
      fieldPartner: 'NGO Partner',
      verificationHash: hash,
      status: 'VERIFIED',
    };

    const isValid = await verifyHash(fullCred);
    expect(isValid).toBe(true);
  });

  it('tampering with a single field in a credential makes verifyHash return false', async () => {
    const credBase = {
      id: 'SS-2026-TEST-99',
      challengeCode: 'JH-WTR-TEST',
      teamName: 'CleanWater Pioneers',
      university: 'IIT ISM Dhanbad',
      teamMembers: ['Ravi Kumar', 'Sneha Roy'],
      impactPopulation: 1200,
      issuedAt: '2026-09-19T00:00:00Z',
      verifiedByOfficer: 'DC Dumka',
      governmentDepartment: 'Drinking Water & Sanitation Dept',
    };

    const hash = await computeHash(credBase);

    const legitCred: CredentialRecord = {
      ...credBase,
      title: 'Test Clean Water',
      district: 'Dumka',
      state: 'Jharkhand',
      facultyMentor: 'Dr. Mentor',
      industryPartner: 'CSR Partner',
      fieldPartner: 'NGO Partner',
      verificationHash: hash,
      status: 'VERIFIED',
    };

    // Tamper with impact population (e.g. claim 50,000 instead of 1,200)
    const tamperedCred = { ...legitCred, impactPopulation: 50000 };
    const isTamperedValid = await verifyHash(tamperedCred);
    expect(isTamperedValid).toBe(false);

    // Tamper with university name
    const tamperedUni = { ...legitCred, university: 'Fake University' };
    expect(await verifyHash(tamperedUni)).toBe(false);
  });

  it('safeParseJSON returns fallback when JSON is corrupted or null', () => {
    const fallback = [{ id: 'fallback-1' }];
    expect(safeParseJSON('invalid json {{{', fallback)).toEqual(fallback);
    expect(safeParseJSON(null, fallback)).toEqual(fallback);
    expect(safeParseJSON('', fallback)).toEqual(fallback);
    expect(safeParseJSON('{"valid": true}', { valid: false })).toEqual({ valid: true });
  });

  it('processReportSubmission clusters duplicate report and increments challenge reportCount', () => {
    const challenge: Challenge = {
      id: 'c-wtr-1042',
      code: 'JH-WTR-1042',
      title: 'Contaminated Well Drinking Water in Hansdiha',
      description: 'High fluoride and arsenic contamination reported in public well',
      category: 'Water & Sanitation',
      district: 'Dumka',
      block: 'Hansdiha',
      locality: 'Hansdiha Ward 4',
      coordinates: { lat: 24.2690, lng: 87.2480 },
      status: 'published',
      priorityScore: 88,
      priorityLevel: 'CRITICAL',
      breakdown: { overallScore: 88, level: 'CRITICAL', factors: { severity: 90, populationImpact: 85, geographicSpread: 75, urgency: 90, duplicateSignal: 80, feasibility: 80 } },
      reportCount: 5,
      affectedPopulation: 1200,
      affectedVillages: ['Hansdiha'],
      department: 'Drinking Water & Sanitation Dept',
      requiredSkills: [],
      suggestedDepartments: [],
      verificationStatus: 'verified',
      photos: [],
      createdAt: '2026-09-01T00:00:00Z',
      updatedAt: '2026-09-01T00:00:00Z',
    };

    const existingReport: CitizenReport = {
      id: 'RPT-001',
      trackingId: 'SS-RPT-1001',
      challengeId: 'c-wtr-1042',
      title: 'Yellow water in Hansdiha handpump',
      description: 'Drinking water is contaminated with pungent smell and yellowish color.',
      category: 'Water & Sanitation',
      district: 'Dumka',
      block: 'Hansdiha',
      locality: 'Hansdiha Ward 4',
      coordinates: { lat: 24.2691, lng: 87.2481 },
      affectedCountEstimate: 100,
      urgencyLevel: 'Emergency',
      evidencePhotos: [],
      status: 'Submitted',
      submittedBy: 'Resident A',
      createdAt: '2026-09-02T00:00:00Z',
      updatedAt: '2026-09-02T00:00:00Z',
    };

    const newReportInput = {
      title: 'Severe contamination in village drinking water pump',
      description: 'Turbid smelly water in the main well affecting residents.',
      category: 'Water & Sanitation',
      district: 'Dumka',
      block: 'Hansdiha',
      locality: 'Hansdiha Ward 4',
      coordinates: { lat: 24.2692, lng: 87.2482 },
      affectedCountEstimate: 150,
      urgencyLevel: 'Emergency' as const,
      evidencePhotos: ['/images/water-turbid.svg'],
      submittedBy: 'Resident B',
    };

    const result = processReportSubmission(
      newReportInput,
      [existingReport],
      [challenge]
    );

    expect(result.newReport.status).toBe('Clustered');
    expect(result.newReport.challengeId).toBe('c-wtr-1042');
    expect(result.updatedChallenges[0].reportCount).toBe(6);
    expect(result.updatedChallenges[0].affectedPopulation).toBe(1200 + 150);
  });
});

