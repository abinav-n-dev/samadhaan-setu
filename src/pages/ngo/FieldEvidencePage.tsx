import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';
import { 
  UploadCloud, 
  CheckCircle2, 
  FileText, 
  MapPin, 
  Users, 
  Camera, 
  Send,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const FieldEvidencePage: React.FC = () => {
  const { challenges, submitFieldEvidence, addToast } = useAppState();
  const navigate = useNavigate();

  const targetChallenge = challenges.find(c => c.id === 'c-wtr-1042') || challenges[0];

  const [partnerName, setPartnerName] = useState('Pratham Gramin Vikas Trust');
  const [beneficiaries, setBeneficiaries] = useState(2615);
  const [tdsBefore, setTdsBefore] = useState(890);
  const [tdsAfter, setTdsAfter] = useState(142);
  const [installationNotes, setInstallationNotes] = useState(
    'Modular solar micro-filtration kiosk installed at Hansdiha main junction. Continuous output certified at 1,200 L/hr. Water sample lab spectrometry confirms TDS dropped from 890 ppm to 142 ppm, and Fluoride lowered from 3.8 mg/L to 0.45 mg/L (well within WHO standards). Gram Sabha operator trained.'
  );
  const [officerNotes, setOfficerNotes] = useState(
    'Panchayat Pradhan and Gram Sabha conducted joint site inspection and signed off on delivery protocol.'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitFieldEvidence(targetChallenge.id, {
      ngoName: partnerName,
      installationReport: installationNotes,
      measuredTdsBefore: Number(tdsBefore),
      measuredTdsAfter: Number(tdsAfter),
      beneficiariesCount: Number(beneficiaries),
      officerNotes,
    });
    addToast('Field Evidence Submitted', 'Dossier transmitted to District Magistrate for impact signoff.', 'success');
    navigate('/government/impact');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-brand-textMuted">
          Ground Pilot Verification
        </span>
        <h1 className="text-2xl font-extrabold text-brand-text mt-0.5">
          Submit Field Implementation Dossier
        </h1>
        <p className="text-xs text-brand-textMuted mt-1">
          Upload on-site deployment photographs, water spectrometry laboratory results, and verified Gram Sabha beneficiary audits.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 shadow-subtle space-y-6 text-xs"
      >
        {/* Challenge reference */}
        <div className="p-4 rounded-2xl bg-brand-bg border border-brand-border flex items-center justify-between">
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase block">Target Challenge:</span>
            <div className="font-bold text-sm text-brand-text">#{targetChallenge.code} — {targetChallenge.title}</div>
            <div className="text-[11px] text-brand-textMuted">{targetChallenge.locality}, {targetChallenge.district}</div>
          </div>
          <span className="font-mono font-bold text-xs bg-white px-2.5 py-1 rounded border">
            Est. Baseline: ~{targetChallenge.affectedPopulation}
          </span>
        </div>

        {/* Form fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-brand-text mb-1">Implementing NGO / Organization:</label>
            <input
              type="text"
              required
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              className="w-full p-2.5 bg-brand-bg border border-brand-border rounded-xl text-brand-text font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-brand-text mb-1">Audited Beneficiary Reach (Persons):</label>
            <input
              type="number"
              required
              value={beneficiaries}
              onChange={(e) => setBeneficiaries(Number(e.target.value))}
              className="w-full p-2.5 bg-brand-bg border border-brand-border rounded-xl font-mono font-bold text-brand-text"
            />
          </div>
        </div>

        {/* Before vs After Water Quality Metrics */}
        <div className="p-4 rounded-2xl bg-gray-50 border border-brand-border space-y-3">
          <span className="font-bold text-brand-text block">Spectrometry Lab Measurements:</span>
          <div className="grid grid-cols-2 gap-4 font-mono">
            <div>
              <label className="block font-sans text-[11px] text-gray-500 mb-1">Pre-treatment TDS (ppm):</label>
              <input
                type="number"
                value={tdsBefore}
                onChange={(e) => setTdsBefore(Number(e.target.value))}
                className="w-full p-2 bg-white border border-brand-border rounded-lg text-red-600 font-bold"
              />
            </div>
            <div>
              <label className="block font-sans text-[11px] text-gray-500 mb-1">Post-filtration TDS (ppm):</label>
              <input
                type="number"
                value={tdsAfter}
                onChange={(e) => setTdsAfter(Number(e.target.value))}
                className="w-full p-2 bg-white border border-brand-border rounded-lg text-emerald-700 font-bold"
              />
            </div>
          </div>
        </div>

        {/* Installation and field officer notes */}
        <div className="space-y-3">
          <div>
            <label className="block font-bold text-brand-text mb-1">Installation & Operational Report:</label>
            <textarea
              rows={4}
              required
              value={installationNotes}
              onChange={(e) => setInstallationNotes(e.target.value)}
              className="w-full p-3 bg-brand-bg border border-brand-border rounded-xl text-brand-text leading-relaxed"
            />
          </div>

          <div>
            <label className="block font-bold text-brand-text mb-1">Gram Sabha & Panchayat Sign-Off Notes:</label>
            <textarea
              rows={2}
              required
              value={officerNotes}
              onChange={(e) => setOfficerNotes(e.target.value)}
              className="w-full p-3 bg-brand-bg border border-brand-border rounded-xl text-brand-text"
            />
          </div>
        </div>

        {/* Photo evidence checklist */}
        <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs space-y-2 text-emerald-900">
          <span className="font-bold block flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Field Evidence Verification Pack Attached:
          </span>
          <ul className="list-disc pl-5 space-y-1 text-[11px] text-emerald-800">
            <li>Hansdiha community water kiosk geo-tagged photo (24.269°N, 87.248°E)</li>
            <li>Govt Middle School fluoride test spectrometry report signed by PHC Chemist</li>
            <li>Panchayat Pradhan resolution certificate #HS-2026/08</li>
          </ul>
        </div>

        <div className="pt-4 border-t border-brand-border flex items-center justify-between">
          <span className="text-brand-textMuted text-[11px]">
            Transmits directly to District Magistrate for impact signoff.
          </span>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-700 text-white font-bold rounded-xl hover:bg-purple-800 transition shadow-subtle"
          >
            <Send className="w-4 h-4" />
            <span>Submit Evidence to Government</span>
          </button>
        </div>
      </form>
    </div>
  );
};

