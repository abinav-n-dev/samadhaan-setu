import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';
import { PriorityBadge } from '../../components/common/PriorityBadge';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PriorityBreakdown } from '../../components/common/PriorityBreakdown';
import { ProblemMap } from '../../components/map/ProblemMap';
import { 
  ArrowLeft, 
  MapPin, 
  Users, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  GraduationCap, 
  Building, 
  AlertTriangle, 
  Layers, 
  Clock, 
  Check, 
  Award,
  ExternalLink,
  ChevronRight,
  X,
  Send,
  UserCheck,
  FileCheck2,
  Calendar
} from 'lucide-react';
import { PriorityLevel } from '../../types';

export const ChallengeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    challenges, 
    reports, 
    role, 
    isAuthenticated,
    verifyChallenge, 
    overridePriority, 
    adoptChallenge, 
    approveMentorProposal, 
    commitIndustrySupport, 
    submitFieldEvidence, 
    verifyImpact,
    addToast
  } = useAppState();

  const navigate = useNavigate();

  // Find challenge by ID or code
  const challenge = challenges.find(c => c.id === id || c.code === id) || (id ? undefined : challenges[0]);

  // Linked citizen reports
  const linkedReports = challenge 
    ? reports.filter(r => r.challengeId === challenge.id || challenge.cluster?.reportIds.includes(r.id))
    : [];

  // Modals state
  const [showReportsDrawer, setShowReportsDrawer] = useState(false);
  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [showAdoptModal, setShowAdoptModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);

  // Form states
  const [overrideScore, setOverrideScore] = useState<number>(94);
  const [overrideLevel, setOverrideLevel] = useState<PriorityLevel>('CRITICAL');
  const [overrideReason, setOverrideReason] = useState<string>(
    'Emergency fluorosis outbreak confirmed by District Health Officer. Immediate intervention required.'
  );

  // Adopt form state
  const [teamName, setTeamName] = useState('AquaShield Innovators');
  const [universityName, setUniversityName] = useState('Birla Institute of Technology (BIT) Mesra');
  const [departmentName, setDepartmentName] = useState('Civil & Environmental Engineering');
  const [mentorName, setMentorName] = useState('Dr. Rameshwar Mahato');
  const [approachSummary, setApproachSummary] = useState(
    'Deployment of a modular, solar-assisted community micro-filtration kiosk with activated alumina cartridges, gravity settling tank, and real-time GSM telemetry for continuous water quality monitoring.'
  );

  // Synchronize adopt defaults with current challenge so non-1042 challenges don't show BIT Mesra
  useEffect(() => {
    if (challenge) {
      if (challenge.code === 'JH-WTR-1042') {
        setTeamName('AquaShield Innovators');
        setUniversityName('Birla Institute of Technology (BIT) Mesra');
        setDepartmentName('Civil & Environmental Engineering');
        setMentorName('Dr. Rameshwar Mahato');
        setApproachSummary(
          'Deployment of a modular, solar-assisted community micro-filtration kiosk with activated alumina cartridges, gravity settling tank, and real-time GSM telemetry for continuous water quality monitoring.'
        );
      } else {
        setTeamName(`${challenge.category.split(' ')[0]} Engineering Team`);
        setUniversityName(
          challenge.district === 'Dumka'
            ? 'Sido Kanhu Murmu University, Dumka'
            : 'National Institute of Technology (NIT) Jamshedpur'
        );
        setDepartmentName(challenge.suggestedDepartments[0] || challenge.department || 'Engineering');
        setMentorName('Dr. S. K. Verma');
        setApproachSummary(
          `Engineered capstone solution and field implementation proposal for ${challenge.title} in ${challenge.district}.`
        );
      }
    }
  }, [challenge?.id]);

  // Industry support state
  const [supportType, setSupportType] = useState<'Funding & Equipment' | 'CSR Grant' | 'Technical Mentorship'>('CSR Grant');
  const [commitmentDetails, setCommitmentDetails] = useState('₹3,80,000 grant and continuous cartridge sponsorship.');
  const [assignedMentor, setAssignedMentor] = useState('Er. Rajesh Sharma (Tata Steel CSR)');

  // Evidence state
  const [beneficiariesReached, setBeneficiariesReached] = useState(2615);
  const [testNotes, setTestNotes] = useState(
    'Solar filtration kiosk commissioned at Hansdiha main junction. Continuous output of 1,200 L/hr. TDS dropped from 890 ppm to 142 ppm; Fluoride dropped from 3.8 mg/L to 0.45 mg/L.'
  );

  const handleVerify = () => {
    if (!challenge) return;
    verifyChallenge(challenge.id);
  };

  const handleOverrideSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!challenge) return;
    overridePriority(challenge.id, overrideScore, overrideLevel, overrideReason);
    setShowOverrideModal(false);
  };

  const handleAdoptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!challenge) return;
    adoptChallenge(challenge.id, {
      teamName,
      university: universityName,
      department: departmentName,
      facultyMentor: mentorName,
      proposalSummary: approachSummary,
      leadStudent: 'Aarav Sengupta',
      teamMembers: ['Aarav Sengupta', 'Ananya Sharma', 'Rohan Dutta', 'Vikramaditya Roy'],
      proposedTech: ['Solar Membrane Kiosk', 'Activated Alumina', 'IoT GSM Telemetry'],
    });
    setShowAdoptModal(false);
  };

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!challenge) return;
    commitIndustrySupport(challenge.id, {
      partnerName: 'Tata Steel Foundation & CleanTech CSR',
      organization: 'Tata Steel Ltd, Jamshedpur',
      supportType,
      commitmentDetails,
      assignedMentor,
    });
    setShowSupportModal(false);
  };

  const handleEvidenceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!challenge) return;
    submitFieldEvidence(challenge.id, {
      ngoName: 'Pratham Gramin Vikas Trust (Dumka Chapter)',
      beneficiariesCount: Number(beneficiariesReached),
      installationReport: testNotes,
      measuredTdsBefore: 890,
      measuredTdsAfter: 142,
    });
    setShowEvidenceModal(false);
  };

  const handleImpactSignoff = async () => {
    if (!challenge) return;
    await verifyImpact(challenge.id, {
      actualReachedCount: Number(beneficiariesReached) || 2615,
      remarks: 'Certified 92.1% population reach. Field test telemetry verified by PHC Dumka.',
    });
    addToast('Impact Verified', 'Impact has been officially verified and certified.', 'success');
  };

  if (!challenge) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
          <FileText className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-extrabold text-brand-text">Challenge Not Found</h2>
        <p className="text-xs text-brand-textMuted max-w-md mx-auto">
          No civic challenge matching identifier <span className="font-mono font-bold text-brand-dark">"{id}"</span> was found.
        </p>
        <div className="pt-3">
          <Link
            to="/explore"
            className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition shadow-xs"
          >
            Explore All Challenges
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Breadcrumbs & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          to="/explore"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore Challenges</span>
        </Link>

        <div className="flex items-center gap-2">
          <StatusBadge status={challenge.status} />
          <PriorityBadge
            level={challenge.governmentOverride ? challenge.governmentOverride.overrideLevel : challenge.priorityLevel}
            score={challenge.governmentOverride ? challenge.governmentOverride.overrideScore : challenge.priorityScore}
            showScore
            size="lg"
          />
        </div>
      </div>

      {/* Main Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
                #{challenge.code}
              </span>
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                {challenge.category}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {challenge.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-slate-400" />
                <strong>{challenge.locality}, {challenge.district}, Jharkhand</strong>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4 text-slate-400" />
                ~{challenge.affectedPopulation.toLocaleString()} affected residents
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-slate-400" />
                Logged: {new Date(challenge.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Quick Role Actions CTA Box */}
          <div className="flex flex-col gap-2 min-w-[200px] sm:self-center">
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-lg font-bold text-xs hover:bg-slate-800 shadow-xs transition"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Sign In to Take Action</span>
              </Link>
            ) : (
              <>
                {role === 'government' && (
                  <>
                    {challenge.verificationStatus !== 'verified' ? (
                      <button
                        onClick={handleVerify}
                        className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-lg font-bold text-xs hover:bg-emerald-700 shadow-xs transition"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Verify Challenge</span>
                      </button>
                    ) : (
                      <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <div>
                          <div className="font-bold">Government Verified</div>
                          <div className="text-[11px] text-blue-700">{challenge.verifiedBy || 'DM Dumka'}</div>
                        </div>
                      </div>
                    )}

                    {challenge.status === 'impact_verification' && (
                      <button
                        onClick={handleImpactSignoff}
                        className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-emerald-700 shadow-subtle transition"
                      >
                        <Award className="w-4 h-4" />
                        <span>Sign Off & Issue Credential</span>
                      </button>
                    )}
                  </>
                )}

                {role === 'student' && !challenge.adoption && (
                  <button
                    onClick={() => setShowAdoptModal(true)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-indigo-700 shadow-subtle transition"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Adopt Challenge for Capstone</span>
                  </button>
                )}

                {role === 'mentor' && challenge.adoption && challenge.adoption.mentorStatus === 'pending' && (
                  <button
                    onClick={() => approveMentorProposal(challenge.id)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-indigo-800 shadow-subtle transition"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Approve Student Proposal</span>
                  </button>
                )}

                {role === 'industry' && !challenge.industrySupport && (
                  <button
                    onClick={() => setShowSupportModal(true)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-emerald-800 shadow-subtle transition"
                  >
                    <Building className="w-4 h-4" />
                    <span>Commit Industry / CSR Support</span>
                  </button>
                )}

                {role === 'ngo' && !challenge.fieldEvidence && (
                  <button
                    onClick={() => setShowEvidenceModal(true)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-purple-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-purple-800 shadow-subtle transition"
                  >
                    <Send className="w-4 h-4" />
                    <span>Upload Field Evidence</span>
                  </button>
                )}
              </>
            )}

            {challenge.status === 'resolved' && (
              <div className="w-full inline-flex items-center justify-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-4 py-2.5 rounded-lg font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Field Impact Verified & Resolved</span>
              </div>
            )}
          </div>
        </div>

        {/* 10-Step Progress Pipeline Tracker */}
        <div className="pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            <span>Problem-to-Impact Progress</span>
            <span className="text-slate-800 font-mono font-bold capitalize">Status: {challenge.status.replace('_', ' ')}</span>
          </div>
          <div className="grid grid-cols-5 gap-1.5 text-center text-[10px] font-semibold">
            <div className="bg-emerald-600 text-white py-1.5 rounded-md shadow-xs">
              1. Reported
            </div>
            <div className={`py-1.5 rounded-md ${challenge.verificationStatus === 'verified' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-400'}`}>
              2. Gov Verified
            </div>
            <div className={`py-1.5 rounded-md ${challenge.adoption ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-400'}`}>
              3. Univ Adopted
            </div>
            <div className={`py-1.5 rounded-md ${challenge.industrySupport ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-400'}`}>
              4. CSR Backed
            </div>
            <div className={`py-1.5 rounded-md ${challenge.status === 'resolved' ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-300' : 'bg-slate-100 text-slate-400'}`}>
              5. Credentialed
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Problem Details, Map, Duplicate Intelligence, Field Evidence */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description & Impact summary */}
          <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-subtle space-y-4">
            <h3 className="text-base font-bold text-brand-text">Ground Problem Description</h3>
            <p className="text-xs sm:text-sm text-brand-textMuted leading-relaxed">
              {challenge.description}
            </p>

            {/* Photos */}
            {challenge.photos && challenge.photos.length > 0 && (
              <div>
                <span className="text-xs font-bold text-brand-text block mb-2">
                  Citizen & Field Inspection Evidence ({challenge.photos.length} photos)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {challenge.photos.map((photo, i) => (
                    <div key={i} className="rounded-xl overflow-hidden border border-brand-border bg-gray-50 h-36">
                      <img src={photo} alt={`Evidence ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Duplicate Intelligence Component */}
          <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-subtle space-y-4">
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-brand-text">Duplicate Intelligence</h3>
                  <p className="text-xs text-brand-textMuted">
                    AI-assisted spatial and semantic cluster detection
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                {challenge.cluster?.similarityScore || 91}% Similarity Match
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-brand-bg rounded-xl border border-brand-border text-xs">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Total Linked Reports</span>
                <span className="text-xl font-mono font-extrabold text-brand-text mt-1 block">
                  {challenge.reportCount}
                </span>
                <span className="text-[11px] text-brand-textMuted">Individual citizen submissions</span>
              </div>

              <div className="p-3 bg-brand-bg rounded-xl border border-brand-border text-xs">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Villages Affected</span>
                <span className="text-xl font-mono font-extrabold text-brand-text mt-1 block">
                  {challenge.affectedVillages.length}
                </span>
                <span className="text-[11px] text-brand-textMuted">
                  {challenge.affectedVillages.join(', ')}
                </span>
              </div>

              <div className="p-3 bg-brand-bg rounded-xl border border-brand-border text-xs">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Community Signal</span>
                <span className="text-xl font-mono font-extrabold text-emerald-700 mt-1 block">
                  Very High
                </span>
                <span className="text-[11px] text-brand-textMuted">Independent cluster signal</span>
              </div>
            </div>

            <p className="text-xs text-brand-textMuted leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
              <strong>AI Cluster Rationale:</strong> {challenge.cluster?.aiRationale || 'Synthesized multiple citizen submissions within a 6.2 km radius citing identical geochemical groundwater anomalies.'}
            </p>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-brand-textMuted">
                Duplicate count contributes to community signal; severity remains independent.
              </span>
              <button
                type="button"
                onClick={() => setShowReportsDrawer(true)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-dark hover:underline"
              >
                <span>View {challenge.reportCount} Linked Reports</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* GIS Location Map */}
          <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-brand-text flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-dark" />
                <span>Geospatial Intelligence Coordinates</span>
              </h3>
              <span className="font-mono text-xs text-brand-textMuted bg-gray-100 px-2 py-0.5 rounded">
                Lat: {challenge.coordinates.lat.toFixed(4)}, Lng: {challenge.coordinates.lng.toFixed(4)}
              </span>
            </div>

            <ProblemMap
              challenges={[challenge]}
              selectedChallengeId={challenge.id}
              height="340px"
              showFilters={false}
            />
          </div>

          {/* University Adoption & Project Details */}
          {challenge.adoption && (
            <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-subtle space-y-4">
              <div className="flex items-center justify-between border-b border-brand-border pb-3">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-base text-brand-text">University Innovation Team</h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Capstone Credit Approved
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-gray-400 font-semibold block">University:</span>
                  <span className="font-bold text-brand-text text-sm">{challenge.adoption.university}</span>
                  <span className="text-brand-textMuted block mt-0.5">{challenge.adoption.department}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block">Student Lead & Team:</span>
                  <span className="font-bold text-brand-text">{challenge.adoption.leadStudent}</span>
                  <span className="text-brand-textMuted block text-[11px] mt-0.5">
                    Roster: {challenge.adoption.teamMembers.join(', ')}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-brand-bg rounded-xl border border-brand-border text-xs space-y-1">
                <span className="font-bold text-brand-text block">Proposed Technical Approach:</span>
                <p className="text-brand-textMuted leading-relaxed">{challenge.adoption.proposalSummary}</p>
                <div className="pt-2 flex flex-wrap gap-1">
                  {challenge.adoption.proposedTech.map((t) => (
                    <span key={t} className="bg-white border border-brand-border px-2 py-0.5 rounded text-[11px] font-medium text-brand-dark">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Milestones */}
              {challenge.adoption.milestones && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-brand-text block">Project Milestones:</span>
                  <div className="space-y-2">
                    {challenge.adoption.milestones.map((m) => (
                      <div key={m.id} className="flex items-start gap-2.5 text-xs p-2 rounded-lg bg-gray-50 border border-gray-100">
                        <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          m.completed ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {m.completed ? <Check className="w-2.5 h-2.5" /> : <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between font-semibold text-brand-text">
                            <span>{m.title}</span>
                            <span className="text-[11px] text-gray-400 font-mono">Due: {m.dueDate}</span>
                          </div>
                          <p className="text-brand-textMuted text-[11px]">{m.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Industry Support & Field Evidence */}
          {(challenge.industrySupport || challenge.fieldEvidence) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {challenge.industrySupport && (
                <div className="bg-white rounded-2xl border border-brand-border p-5 shadow-subtle text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-brand-text">
                    <Building className="w-4 h-4 text-emerald-600" />
                    <span>Industry / CSR Partner</span>
                  </div>
                  <div className="font-bold text-sm text-brand-text">{challenge.industrySupport.partnerName}</div>
                  <p className="text-brand-textMuted">{challenge.industrySupport.commitmentDetails}</p>
                  <div className="pt-2 text-[11px] text-emerald-800 font-semibold">
                    Mentor: {challenge.industrySupport.assignedMentor}
                  </div>
                </div>
              )}

              {challenge.fieldEvidence && (
                <div className="bg-white rounded-2xl border border-brand-border p-5 shadow-subtle text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-brand-text">
                    <Send className="w-4 h-4 text-purple-600" />
                    <span>Field NGO Implementation</span>
                  </div>
                  <div className="font-bold text-sm text-brand-text">{challenge.fieldEvidence.ngoName}</div>
                  <p className="text-brand-textMuted">{challenge.fieldEvidence.installationReport}</p>
                  <div className="pt-2 flex justify-between text-[11px] text-purple-800 font-bold">
                    <span>Beneficiaries: {challenge.fieldEvidence.beneficiariesCount}</span>
                    <span>TDS: {challenge.fieldEvidence.measuredTdsBefore} → {challenge.fieldEvidence.measuredTdsAfter} ppm</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: AI Priority Assessment & Department Metadata */}
        <div className="space-y-6">
          {/* Transparent AI Priority Breakdown */}
          <PriorityBreakdown
            breakdown={challenge.breakdown}
            override={challenge.governmentOverride}
            canOverride={role === 'government'}
            onOpenOverrideModal={() => setShowOverrideModal(true)}
          />

          {/* Institutional Department & Skill Matrix */}
          <div className="bg-white rounded-2xl border border-brand-border p-5 shadow-subtle space-y-4 text-xs">
            <h4 className="font-bold text-sm text-brand-text">Government Department & Skills</h4>

            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                Responsible Government Body:
              </span>
              <p className="font-semibold text-brand-text">{challenge.department}</p>
            </div>

            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                Suggested University Disciplines:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {challenge.suggestedDepartments.map(dept => (
                  <span key={dept} className="bg-blue-50 text-blue-800 font-medium px-2 py-0.5 rounded text-[11px]">
                    {dept}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                Required Technical Skillsets:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {challenge.requiredSkills.map(skill => (
                  <span key={skill} className="bg-gray-100 text-gray-700 font-medium px-2 py-0.5 rounded text-[11px]">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Linked Reports Drawer / Modal */}
      {showReportsDrawer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-end">
          <div className="bg-white h-full w-full max-w-xl p-6 shadow-modal flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between border-b border-brand-border pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    #{challenge.code}
                  </span>
                  <span className="text-xs text-slate-500 font-bold uppercase">
                    Cluster Evidence Dossier
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  {linkedReports.length} Linked Citizen Submissions
                </h3>
              </div>
              <button
                onClick={() => setShowReportsDrawer(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-4 text-xs">
              <p className="text-slate-600">
                All 37 independent citizen submissions have been clustered into this challenge. Each submission preserves individual geographic coordinates and timestamped photo evidence.
              </p>

              {linkedReports.map((r, idx) => (
                <div key={r.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-800 text-xs">
                      #{idx + 1} — {r.trackingId}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900">{r.title}</h4>
                  <p className="text-slate-600 leading-relaxed">{r.description}</p>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-200">
                    <span>Citizen: {r.submittedBy}</span>
                    <span>Locality: {r.locality}</span>
                    <span className="font-semibold text-rose-600">Urgency: {r.urgencyLevel}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-200">
              <button
                onClick={() => setShowReportsDrawer(false)}
                className="w-full py-2 bg-slate-900 text-white rounded-lg font-bold text-xs hover:bg-slate-800 transition"
              >
                Close Evidence Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Government Priority Override Modal */}
      {showOverrideModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleOverrideSubmit}
            className="bg-white rounded-2xl border border-brand-border shadow-modal max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150 text-xs"
          >
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <h3 className="font-bold text-sm text-brand-text flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-dark" />
                Administrative Priority Override
              </h3>
              <button
                type="button"
                onClick={() => setShowOverrideModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block font-semibold text-brand-text mb-1">
                AI Suggested Assessment:
              </label>
              <div className="p-2.5 rounded-lg bg-gray-100 font-mono font-bold text-brand-text flex justify-between">
                <span>Calculated Model Score:</span>
                <span>{challenge.breakdown.overallScore} / 100 ({challenge.breakdown.level})</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-brand-text mb-1">
                  Government Priority Level:
                </label>
                <select
                  value={overrideLevel}
                  onChange={(e) => setOverrideLevel(e.target.value as PriorityLevel)}
                  className="w-full bg-brand-bg border border-brand-border rounded-lg p-2 font-semibold text-brand-text"
                >
                  <option value="CRITICAL">CRITICAL</option>
                  <option value="HIGH">HIGH</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="LOW">LOW</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-brand-text mb-1">
                  Override Score (0-100):
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={overrideScore}
                  onChange={(e) => setOverrideScore(Number(e.target.value))}
                  className="w-full bg-brand-bg border border-brand-border rounded-lg p-2 font-mono font-bold text-brand-text"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-brand-text mb-1">
                Administrative Justification (Mandatory for Audit Trail):
              </label>
              <textarea
                rows={3}
                required
                value={overrideReason}
                onChange={(e) => setOverrideReason(e.target.value)}
                className="w-full bg-brand-bg border border-brand-border rounded-lg p-2.5 text-brand-text"
                placeholder="State the ground reason (e.g. Health Officer confirmation, school closure danger)..."
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowOverrideModal(false)}
                className="px-4 py-2 rounded-lg border border-brand-border text-brand-textMuted font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition shadow-xs"
              >
                Confirm Priority Override
              </button>
            </div>
          </form>
        </div>
      )}

      {/* University Adoption Modal */}
      {showAdoptModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleAdoptSubmit}
            className="bg-white rounded-2xl border border-brand-border shadow-modal max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150 text-xs"
          >
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <h3 className="font-bold text-sm text-brand-text flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                Submit Academic Project Adoption Proposal
              </h3>
              <button
                type="button"
                onClick={() => setShowAdoptModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-brand-text mb-1">Team Name:</label>
                <input
                  type="text"
                  required
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full bg-brand-bg border border-brand-border rounded-lg p-2 font-medium text-brand-text"
                />
              </div>
              <div>
                <label className="block font-semibold text-brand-text mb-1">Faculty Mentor:</label>
                <input
                  type="text"
                  required
                  value={mentorName}
                  onChange={(e) => setMentorName(e.target.value)}
                  className="w-full bg-brand-bg border border-brand-border rounded-lg p-2 font-medium text-brand-text"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-brand-text mb-1">University / Institute:</label>
                <input
                  type="text"
                  required
                  value={universityName}
                  onChange={(e) => setUniversityName(e.target.value)}
                  className="w-full bg-brand-bg border border-brand-border rounded-lg p-2 font-medium text-brand-text"
                />
              </div>
              <div>
                <label className="block font-semibold text-brand-text mb-1">Department:</label>
                <input
                  type="text"
                  required
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                  className="w-full bg-brand-bg border border-brand-border rounded-lg p-2 font-medium text-brand-text"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-brand-text mb-1">Proposed Technical Approach:</label>
              <textarea
                rows={3}
                required
                value={approachSummary}
                onChange={(e) => setApproachSummary(e.target.value)}
                className="w-full bg-brand-bg border border-brand-border rounded-lg p-2 text-brand-text"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAdoptModal(false)}
                className="px-4 py-2 rounded-lg border border-brand-border text-brand-textMuted font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition"
              >
                Submit Proposal for Mentor Review
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Industry Support Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleSupportSubmit}
            className="bg-white rounded-2xl border border-brand-border shadow-modal max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150 text-xs"
          >
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <h3 className="font-bold text-sm text-brand-text flex items-center gap-1.5">
                <Building className="w-4 h-4 text-emerald-600" />
                Commit Industry / CSR Support
              </h3>
              <button
                type="button"
                onClick={() => setShowSupportModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block font-semibold text-brand-text mb-1">Support Type:</label>
              <select
                value={supportType}
                onChange={(e) => setSupportType(e.target.value as any)}
                className="w-full bg-brand-bg border border-brand-border rounded-lg p-2 font-medium text-brand-text"
              >
                <option value="CSR Grant">CSR Financial Grant</option>
                <option value="Funding & Equipment">Funding & Specialized Equipment</option>
                <option value="Technical Mentorship">Technical Mentorship & Lab Testing</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-brand-text mb-1">Commitment Details:</label>
              <input
                type="text"
                required
                value={commitmentDetails}
                onChange={(e) => setCommitmentDetails(e.target.value)}
                className="w-full bg-brand-bg border border-brand-border rounded-lg p-2 text-brand-text"
              />
            </div>

            <div>
              <label className="block font-semibold text-brand-text mb-1">Assigned Technical Mentor:</label>
              <input
                type="text"
                required
                value={assignedMentor}
                onChange={(e) => setAssignedMentor(e.target.value)}
                className="w-full bg-brand-bg border border-brand-border rounded-lg p-2 text-brand-text"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowSupportModal(false)}
                className="px-4 py-2 rounded-lg border border-brand-border text-brand-textMuted font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-emerald-700 text-white font-bold hover:bg-emerald-800 transition"
              >
                Confirm Support Commitment
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Field Evidence Modal */}
      {showEvidenceModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleEvidenceSubmit}
            className="bg-white rounded-2xl border border-brand-border shadow-modal max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150 text-xs"
          >
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <h3 className="font-bold text-sm text-brand-text flex items-center gap-1.5">
                <Send className="w-4 h-4 text-purple-600" />
                Upload Field Implementation Evidence
              </h3>
              <button
                type="button"
                onClick={() => setShowEvidenceModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block font-semibold text-brand-text mb-1">
                Verified Beneficiaries Reached:
              </label>
              <input
                type="number"
                required
                value={beneficiariesReached}
                onChange={(e) => setBeneficiariesReached(Number(e.target.value))}
                className="w-full bg-brand-bg border border-brand-border rounded-lg p-2 font-mono font-bold text-brand-text"
              />
            </div>

            <div>
              <label className="block font-semibold text-brand-text mb-1">
                Field Installation & Test Metrics Report:
              </label>
              <textarea
                rows={3}
                required
                value={testNotes}
                onChange={(e) => setTestNotes(e.target.value)}
                className="w-full bg-brand-bg border border-brand-border rounded-lg p-2 text-brand-text"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowEvidenceModal(false)}
                className="px-4 py-2 rounded-lg border border-brand-border text-brand-textMuted font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-purple-700 text-white font-bold hover:bg-purple-800 transition"
              >
                Submit Evidence to Government
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

