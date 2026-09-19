import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';
import { verifyHash } from '../../services/credentialService';
import { 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  GraduationCap, 
  Building, 
  HeartHandshake, 
  ArrowLeft,
  Lock,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';

export const VerifyCredentialPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { credentials } = useAppState();

  const credential = credentials.find(c => c.id === id || c.challengeCode === id) || (id ? undefined : credentials[0]);

  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(true);
  const [showHowComputed, setShowHowComputed] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    if (!credential) {
      setIsValid(false);
      setIsVerifying(false);
      return;
    }

    setIsVerifying(true);
    verifyHash(credential)
      .then(valid => {
        if (isMounted) {
          setIsValid(valid);
          setIsVerifying(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsValid(false);
          setIsVerifying(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [credential]);

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
            className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition shadow-sm"
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
        <span className="text-[11px] font-mono font-bold text-brand-textMuted bg-gray-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
          Public Trust Verification Desk
        </span>
      </div>

      {/* Tamper Alert Banner */}
      {!isVerifying && isValid === false && (
        <div className="p-4 rounded-2xl bg-red-50 border-2 border-red-400 text-red-900 flex items-start gap-3 shadow-sm">
          <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <div className="font-extrabold uppercase tracking-wide text-red-700">
              Tampered / Hash Mismatch
            </div>
            <p className="text-red-800 leading-relaxed">
              Cryptographic Integrity Alert: The data in this record does not match its SHA-256 hash. One or more governance fields (such as beneficiary reach, team, or department) have been altered since official signoff.
            </p>
          </div>
        </div>
      )}

      {/* Verifiable Impact Credential Certificate Card */}
      <div className={`bg-white dark:bg-slate-900 rounded-xl border-2 overflow-hidden transition-colors ${
        !isVerifying && isValid === false 
          ? 'border-red-500 shadow-lg' 
          : 'border-slate-900 dark:border-slate-700 shadow-md'
      }`}>
        {/* Certificate Top Header */}
        <div className={`${
          !isVerifying && isValid === false ? 'bg-red-950' : 'bg-slate-900'
        } text-white p-6 sm:p-8 relative overflow-hidden`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`font-mono font-bold text-[10px] px-2 py-0.5 rounded tracking-widest uppercase ${
                  !isVerifying && isValid === false 
                    ? 'bg-red-500 text-white' 
                    : 'bg-emerald-600 text-white'
                }`}>
                  {!isVerifying && isValid === false ? 'Integrity Failed' : 'Government Validated'}
                </span>
                <span className="text-gray-300 text-xs font-mono font-bold">
                  {credential.id}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Verified Impact Credential
              </h1>
              <p className="text-xs text-emerald-300 mt-1">
                Issued under SamadhanSetu Civic Innovation Registry • Govt of Jharkhand
              </p>
            </div>

            {/* Verification Seal Badge */}
            <div className={`flex items-center gap-3 p-3 rounded-xl border self-start sm:self-center ${
              isVerifying 
                ? 'bg-slate-800 border-slate-700' 
                : isValid 
                ? 'bg-slate-800 border-emerald-500/40' 
                : 'bg-red-900/60 border-red-500/50'
            }`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isVerifying 
                  ? 'bg-slate-700 text-slate-300' 
                  : isValid 
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {isVerifying ? (
                  <ShieldCheck className="w-6 h-6 animate-pulse" />
                ) : isValid ? (
                  <ShieldCheck className="w-6 h-6" />
                ) : (
                  <AlertTriangle className="w-6 h-6" />
                )}
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-300 block">
                  Official Status
                </span>
                <span className={`text-xs font-extrabold flex items-center gap-1 ${
                  isVerifying 
                    ? 'text-gray-300' 
                    : isValid 
                    ? 'text-emerald-400' 
                    : 'text-red-300'
                }`}>
                  {isVerifying ? (
                    'VERIFYING HASH...'
                  ) : isValid ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      VERIFIED
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                      Tampered / hash mismatch
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Body Content */}
        <div className="p-6 sm:p-8 space-y-6 text-xs text-brand-text dark:text-slate-200">
          {/* Main Title & Problem */}
          <div className="space-y-1 border-b border-brand-border dark:border-slate-800 pb-4">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Implemented Civic Intervention
            </span>
            <h2 className="text-xl font-extrabold text-brand-text dark:text-white">
              {credential.title}
            </h2>
            <div className="flex items-center gap-2 text-brand-textMuted dark:text-slate-400 pt-1">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>Target Locality: <strong>{credential.district}, {credential.state}</strong></span>
              <span>•</span>
              <span>Challenge Reference: <strong>#{credential.challengeCode}</strong></span>
            </div>
          </div>

          {/* Key Beneficiary Metric Highlight */}
          <div className="bg-brand-mintSoft/50 dark:bg-slate-800/60 border border-brand-mint dark:border-slate-700 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider block">
                Audited Beneficiaries Reached
              </span>
              <div className="text-3xl font-black font-mono text-brand-dark dark:text-white mt-0.5">
                {credential.impactPopulation.toLocaleString()} Citizens
              </div>
              <p className="text-[11px] text-emerald-800 dark:text-emerald-300 mt-1">
                Verified on-ground by District Health Office & Gram Sabha
              </p>
            </div>
            <div className="sm:text-right">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                Issuance Date
              </span>
              <div className="text-sm font-bold font-mono text-brand-text dark:text-white mt-0.5">
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
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-slate-800/50 border border-brand-border dark:border-slate-800 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-brand-text dark:text-white">
                <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Academic Team</span>
              </div>
              <p className="font-bold text-brand-text dark:text-white">{credential.university}</p>
              <p className="text-brand-textMuted dark:text-slate-400 text-[11px]">Team: {credential.teamName}</p>
              <p className="text-gray-400 text-[10px]">Lead: {credential.teamMembers[0]}</p>
            </div>

            {/* Industry CSR */}
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-slate-800/50 border border-brand-border dark:border-slate-800 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-brand-text dark:text-white">
                <Building className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Industry / CSR</span>
              </div>
              <p className="font-bold text-brand-text dark:text-white">{credential.industryPartner}</p>
              <p className="text-brand-textMuted dark:text-slate-400 text-[11px]">Grant & Hardware Sponsorship</p>
            </div>

            {/* Field NGO */}
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-slate-800/50 border border-brand-border dark:border-slate-800 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-brand-text dark:text-white">
                <HeartHandshake className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Field Partner</span>
              </div>
              <p className="font-bold text-brand-text dark:text-white">{credential.fieldPartner}</p>
              <p className="text-brand-textMuted dark:text-slate-400 text-[11px]">Ground Deployment & Handover</p>
            </div>
          </div>

          {/* Government Attestation Signoff */}
          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-700 dark:text-blue-400" />
                Administrative Sign-Off Authority
              </span>
              <span className="text-[10px] text-blue-700 dark:text-blue-400 font-mono">Government of Jharkhand</span>
            </div>
            <p className="text-blue-900 dark:text-blue-200 font-semibold pt-1">
              Signed & Certified by: {credential.verifiedByOfficer}
            </p>
            <p className="text-blue-700 dark:text-blue-300 text-[11px]">
              {credential.governmentDepartment}
            </p>
          </div>

          {/* Cryptographic Proof Hash */}
          <div className={`p-4 rounded-xl border space-y-2 ${
            !isVerifying && isValid === false 
              ? 'bg-red-50/50 dark:bg-red-950/30 border-red-300 dark:border-red-800' 
              : 'bg-brand-bg dark:bg-slate-800/40 border-brand-border dark:border-slate-800'
          }`}>
            <div className="flex items-center justify-between text-[11px] font-bold text-brand-text dark:text-white">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-900 dark:text-emerald-400" />
                Immutable Verification Hash (SHA-256)
              </span>
              <span className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold ${
                isVerifying
                  ? 'bg-gray-200 text-gray-700 dark:bg-slate-700 dark:text-slate-300'
                  : isValid
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
              }`}>
                {isVerifying ? 'Verifying...' : isValid ? 'Status: Verified' : 'Status: Tampered / hash mismatch'}
              </span>
            </div>
            <div className="font-mono text-[11px] text-brand-textMuted dark:text-slate-300 break-all bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-brand-border dark:border-slate-700">
              {credential.verificationHash}
            </div>
          </div>

          {/* How This Hash Is Computed (Expandable Section) */}
          <div className="border border-brand-border dark:border-slate-800 rounded-xl overflow-hidden bg-gray-50/50 dark:bg-slate-800/30">
            <button
              type="button"
              onClick={() => setShowHowComputed(!showHowComputed)}
              className="w-full flex items-center justify-between p-3.5 text-left text-xs font-bold text-brand-text dark:text-white hover:bg-gray-100/50 dark:hover:bg-slate-800/60 transition"
            >
              <span className="flex items-center gap-2">
                <Info className="w-4 h-4 text-brand-primary" />
                How this hash is computed
              </span>
              {showHowComputed ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>
            {showHowComputed && (
              <div className="p-4 border-t border-brand-border dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2.5 text-xs text-brand-textMuted dark:text-slate-300">
                <p className="leading-relaxed">
                  The cryptographic fingerprint is an asynchronous <strong className="text-brand-text dark:text-white font-mono">SHA-256</strong> digest computed via the Web Crypto API (<code className="font-mono text-[11px] bg-gray-100 dark:bg-slate-800 px-1 py-0.5 rounded">crypto.subtle.digest</code>) over a canonicalized JSON string containing exactly the following 9 governance fields:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-mono text-[11px] pt-1">
                  <div className="p-1.5 rounded bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                    <span className="text-brand-primary font-bold">1. id:</span> {credential.id}
                  </div>
                  <div className="p-1.5 rounded bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                    <span className="text-brand-primary font-bold">2. challengeCode:</span> {credential.challengeCode}
                  </div>
                  <div className="p-1.5 rounded bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                    <span className="text-brand-primary font-bold">3. teamName:</span> {credential.teamName}
                  </div>
                  <div className="p-1.5 rounded bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                    <span className="text-brand-primary font-bold">4. university:</span> {credential.university}
                  </div>
                  <div className="p-1.5 rounded bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 sm:col-span-2">
                    <span className="text-brand-primary font-bold">5. teamMembers:</span> [{credential.teamMembers.join(', ')}]
                  </div>
                  <div className="p-1.5 rounded bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                    <span className="text-brand-primary font-bold">6. impactPopulation:</span> {credential.impactPopulation}
                  </div>
                  <div className="p-1.5 rounded bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                    <span className="text-brand-primary font-bold">7. issuedAt:</span> {credential.issuedAt}
                  </div>
                  <div className="p-1.5 rounded bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                    <span className="text-brand-primary font-bold">8. verifiedByOfficer:</span> {credential.verifiedByOfficer}
                  </div>
                  <div className="p-1.5 rounded bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                    <span className="text-brand-primary font-bold">9. governmentDepartment:</span> {credential.governmentDepartment}
                  </div>
                </div>
                <p className="text-[11px] text-gray-400 pt-1">
                  Tampering with any character, beneficiary count, or signatory name produces a completely mismatched SHA-256 digest, immediately flagging the credential as invalid.
                </p>
              </div>
            )}
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
