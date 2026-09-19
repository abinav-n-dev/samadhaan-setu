import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Users, 
  FileCheck2, 
  ArrowRight, 
  Building, 
  GraduationCap, 
  HeartHandshake, 
  ExternalLink 
} from 'lucide-react';

export const ImpactVerificationPage: React.FC = () => {
  const { challenges, verifyImpact, addToast } = useAppState();
  const navigate = useNavigate();

  // Find challenges ready for impact verification (such as #JH-WTR-1042)
  const readyChallenges = challenges.filter(c => c.fieldEvidence || c.status === 'impact_verification' || c.status === 'resolved');
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>(readyChallenges[0]?.id || challenges[0]?.id || '');
  const selectedChallenge = challenges.find(c => c.id === selectedChallengeId) || readyChallenges[0] || challenges[0];

  const [actualReached, setActualReached] = useState<number>(() =>
    selectedChallenge?.fieldEvidence?.beneficiariesCount || selectedChallenge?.affectedPopulation || 2615
  );
  const [remarks, setRemarks] = useState(
    'Certified 92.1% population coverage reached. Significant drop in pediatric acute clinic visits documented by PHC Hansdiha within 72 hours of commissioning.'
  );

  const handleSelectChallenge = (id: string) => {
    setSelectedChallengeId(id);
    const target = challenges.find(c => c.id === id);
    if (target) {
      setActualReached(target.fieldEvidence?.beneficiariesCount || target.affectedPopulation || 2615);
    }
  };

  const handleVerifyImpact = async () => {
    if (!selectedChallenge) return;
    await verifyImpact(selectedChallenge.id, {
      actualReachedCount: Number(actualReached),
      remarks,
    });
    addToast('Impact Verified', 'Impact has been officially verified and certified.', 'success');
    navigate(`/challenges/${selectedChallenge.id}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-brand-textMuted">
          Executive Impact Governance
        </span>
        <h1 className="text-2xl font-extrabold text-brand-text mt-0.5">
          Government Impact Verification Desk
        </h1>
        <p className="text-xs text-brand-textMuted mt-1">
          Final stage of the SamadhanSetu ecosystem: inspect ground implementation evidence, validate verified beneficiary reach against baseline estimates, and issue public cryptographic credentials.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-brand-border p-6 sm:p-8 shadow-subtle space-y-6 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand-border pb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] uppercase font-bold text-gray-400">Select Target Challenge:</span>
              <select
                value={selectedChallenge.id}
                onChange={(e) => handleSelectChallenge(e.target.value)}
                className="bg-brand-bg border border-brand-border rounded-lg px-2.5 py-1 text-xs font-bold text-brand-text focus:outline-none focus:ring-1 focus:ring-brand-mint"
              >
                {readyChallenges.map(c => (
                  <option key={c.id} value={c.id}>
                    #{c.code} — {c.title} ({c.status.replace('_', ' ')})
                  </option>
                ))}
              </select>
            </div>
            <h2 className="text-xl font-extrabold text-brand-text mt-1">{selectedChallenge.title}</h2>
          </div>

          <span className={`text-xs font-bold px-3 py-1 rounded-full border self-start sm:self-center flex items-center gap-1.5 ${
            selectedChallenge.status === 'resolved' 
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
              : 'bg-amber-50 text-amber-800 border-amber-200'
          }`}>
            {selectedChallenge.status === 'resolved' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
            <span>{selectedChallenge.status === 'resolved' ? 'Impact Certified' : 'Awaiting Executive Sign-Off'}</span>
          </span>
        </div>

        {/* Baseline vs Actual Reach Comparison Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-4 rounded-2xl bg-brand-bg border border-brand-border">
            <span className="text-[10px] uppercase font-bold text-gray-400 font-sans block">Original Affected Baseline</span>
            <span className="text-2xl font-black text-brand-dark mt-1 block">
              {selectedChallenge.affectedPopulation.toLocaleString()}
            </span>
            <span className="text-[11px] text-brand-textMuted font-sans">Citizens in Dumka cluster</span>
          </div>

          <div className="p-4 rounded-2xl bg-brand-mintSoft border border-brand-mint">
            <span className="text-[10px] uppercase font-bold text-emerald-800 font-sans block">Audited People Reached</span>
            <span className="text-2xl font-black text-emerald-900 mt-1 block">
              {actualReached.toLocaleString()}
            </span>
            <span className="text-[11px] text-emerald-800 font-sans">92.1% verified coverage</span>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
            <span className="text-[10px] uppercase font-bold text-blue-800 font-sans block">Water Quality Improvement</span>
            <span className="text-xl font-black text-blue-900 mt-1 block">
              890 → 142 ppm
            </span>
            <span className="text-[11px] text-blue-800 font-sans">TDS & Fluoride &lt; 0.5 mg/L</span>
          </div>
        </div>

        {/* Multi-Partner Attestation Evidence Checklist */}
        <div className="space-y-3 pt-2">
          <h3 className="font-bold text-sm text-brand-text">Field Dossier & Partner Sign-Offs</h3>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-2 font-medium text-brand-text">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>On-Site Solar Filtration Kiosk Installation Telemetry</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-700 font-bold">ATTESTED</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-2 font-medium text-brand-text">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Birla Institute of Technology (BIT) Mesra Engineering Capstone Report</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-700 font-bold">ATTESTED</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-2 font-medium text-brand-text">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Tata Steel Foundation CSR Grant & Hardware Certification</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-700 font-bold">ATTESTED</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-2 font-medium text-brand-text">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Pratham Gramin Vikas Trust Field Beneficiary Audit & Gram Sabha Sign-Off</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-700 font-bold">ATTESTED</span>
            </div>
          </div>
        </div>

        {/* Administrative Remarks */}
        <div className="space-y-2 text-xs">
          <label className="block font-bold text-brand-text">
            District Magistrate Attestation & Remarks:
          </label>
          <textarea
            rows={3}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="w-full p-3 bg-brand-bg border border-brand-border rounded-xl text-brand-text focus:outline-none"
          />
        </div>

        {/* Verify & Mint Action */}
        <div className="pt-4 border-t border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-brand-textMuted">
            <ShieldCheck className="w-4 h-4 text-brand-dark" />
            <span>Authorized by Sanjay K. Verma, IAS (District Magistrate, Dumka)</span>
          </div>

          <button
            type="button"
            onClick={handleVerifyImpact}
            className="inline-flex items-center justify-center gap-2 bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold text-xs hover:bg-emerald-800 shadow-elevated transition"
          >
            <Award className="w-4 h-4" />
            <span>Verify Impact & Issue Public Credential</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

