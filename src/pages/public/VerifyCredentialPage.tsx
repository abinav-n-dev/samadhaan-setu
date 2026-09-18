import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  MapPin, 
  Users, 
  GraduationCap, 
  Building, 
  HeartHandshake, 
  QrCode, 
  ExternalLink,
  ArrowLeft,
  Calendar,
  Lock
} from 'lucide-react';

export const VerifyCredentialPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { credentials } = useAppState();

  const credential = credentials.find(c => c.id === id || c.challengeCode === id) || (id ? undefined : credentials[0]);

  if (!credential) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-extrabold text-brand-text">Credential Not Found</h2>
        <p className="text-xs text-brand-textMuted max-w-md mx-auto">
          No verified credential matching identifier <span className="font-mono font-bold text-brand-dark">"{id}"</span> could be found in the public ledger.
        </p>
        <div className="pt-3 flex justify-center gap-3">
          <Link
            to="/solutions"
            className="px-4 py-2 bg-brand-dark text-brand-mint text-xs font-bold rounded-xl hover:bg-brand-darkSecondary transition"
          >
            Browse Verified Solutions
          </Link>
          {credentials[0] && (
            <Link
              to={`/verify/${credentials[0].id}`}
              className="px-4 py-2 bg-white border border-brand-border text-brand-text text-xs font-bold rounded-xl hover:bg-gray-50 transition"
            >
              View Sample Credential
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Top Back Nav */}
      <div className="flex items-center justify-between">
        <Link
          to="/solutions"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-textMuted hover:text-brand-dark"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Solutions & Case Studies</span>
        </Link>
        <span className="text-[11px] font-mono font-bold text-brand-textMuted bg-gray-100 px-2.5 py-1 rounded-md">
          Public Trust Verification Desk
        </span>
      </div>

      {/* Verifiable Impact Credential Certificate Card */}
      <div className="bg-white rounded-3xl border-2 border-brand-dark shadow-modal overflow-hidden">
        {/* Certificate Top Header */}
        <div className="bg-brand-dark text-white p-6 sm:p-8 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-brand-mint text-brand-dark font-mono font-bold text-[10px] px-2 py-0.5 rounded tracking-widest uppercase">
                  Government Validated
                </span>
                <span className="text-gray-300 text-xs font-mono font-bold">
                  {credential.id}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Verified Impact Credential
              </h1>
              <p className="text-xs text-brand-mint mt-1">
                Issued under SamadhanSetu Civic Innovation Registry • Govt of Jharkhand
              </p>
            </div>

            {/* Verification Seal Badge */}
            <div className="flex items-center gap-3 bg-brand-sidebarActive p-3 rounded-2xl border border-brand-mint/30 self-start sm:self-center">
              <div className="w-10 h-10 rounded-full bg-brand-mintSoft flex items-center justify-center text-emerald-700">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-brand-mint block">
                  Official Status
                </span>
                <span className="text-xs font-extrabold text-white flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  VERIFIED IMPACT
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Body Content */}
        <div className="p-6 sm:p-8 space-y-6 text-xs">
          {/* Main Title & Problem */}
          <div className="space-y-1 border-b border-brand-border pb-4">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Implemented Civic Intervention
            </span>
            <h2 className="text-xl font-extrabold text-brand-text">
              {credential.title}
            </h2>
            <div className="flex items-center gap-2 text-brand-textMuted pt-1">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>Target Locality: <strong>{credential.district}, {credential.state}</strong></span>
              <span>•</span>
              <span>Challenge Reference: <strong>#{credential.challengeCode}</strong></span>
            </div>
          </div>

          {/* Key Beneficiary Metric Highlight */}
          <div className="bg-brand-mintSoft/50 border border-brand-mint rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                Audited Beneficiaries Reached
              </span>
              <div className="text-3xl font-black font-mono text-brand-dark mt-0.5">
                {credential.impactPopulation.toLocaleString()} Citizens
              </div>
              <p className="text-[11px] text-emerald-800 mt-1">
                Verified on-ground by District Health Office & Gram Sabha
              </p>
            </div>
            <div className="sm:text-right">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                Issuance Date
              </span>
              <div className="text-sm font-bold font-mono text-brand-text mt-0.5">
                {new Date(credential.issuedAt).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>

          {/* Tripartite Collaboration Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* University */}
            <div className="p-4 rounded-xl bg-gray-50 border border-brand-border space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-brand-text">
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                <span>Academic Team</span>
              </div>
              <p className="font-bold text-brand-text">{credential.university}</p>
              <p className="text-brand-textMuted text-[11px]">Team: {credential.teamName}</p>
              <p className="text-gray-400 text-[10px]">Lead: {credential.teamMembers[0]}</p>
            </div>

            {/* Industry CSR */}
            <div className="p-4 rounded-xl bg-gray-50 border border-brand-border space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-brand-text">
                <Building className="w-4 h-4 text-emerald-600" />
                <span>Industry / CSR</span>
              </div>
              <p className="font-bold text-brand-text">{credential.industryPartner}</p>
              <p className="text-brand-textMuted text-[11px]">Grant & Hardware Sponsorship</p>
            </div>

            {/* Field NGO */}
            <div className="p-4 rounded-xl bg-gray-50 border border-brand-border space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-brand-text">
                <HeartHandshake className="w-4 h-4 text-purple-600" />
                <span>Field Partner</span>
              </div>
              <p className="font-bold text-brand-text">{credential.fieldPartner}</p>
              <p className="text-brand-textMuted text-[11px]">Ground Deployment & Handover</p>
            </div>
          </div>

          {/* Government Attestation Signoff */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-700" />
                Administrative Sign-Off Authority
              </span>
              <span className="text-[10px] text-blue-700 font-mono">Government of Jharkhand</span>
            </div>
            <p className="text-blue-900 font-semibold pt-1">
              Signed & Certified by: {credential.verifiedByOfficer}
            </p>
            <p className="text-blue-700 text-[11px]">
              {credential.governmentDepartment}
            </p>
          </div>

          {/* Cryptographic Proof Hash */}
          <div className="p-4 rounded-xl bg-brand-bg border border-brand-border space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-brand-text">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-brand-dark" />
                Immutable Verification Hash
              </span>
              <span className="text-emerald-700 font-mono">Status: Ledger Verified</span>
            </div>
            <div className="font-mono text-[11px] text-brand-textMuted break-all bg-white p-2.5 rounded-lg border border-brand-border">
              {credential.verificationHash}
            </div>
          </div>

          {/* Prototype disclaimer */}
          <div className="pt-2 text-center text-[11px] text-gray-400">
            * This verifiable credential is generated as part of the SamadhanSetu Smart India Hackathon 2026 prototype evaluation.
          </div>
        </div>
      </div>
    </div>
  );
};

