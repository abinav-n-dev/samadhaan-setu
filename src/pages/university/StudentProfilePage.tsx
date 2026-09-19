import React from 'react';
import { Link } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';
import { 
  Award, 
  CheckCircle2, 
  GraduationCap, 
  Users, 
  Building, 
  ShieldCheck, 
  ExternalLink,
  MapPin,
  FileCheck2,
  Code
} from 'lucide-react';

export const StudentProfilePage: React.FC = () => {
  const { credentials } = useAppState();

  const profile = {
    name: 'Aarav Sengupta',
    university: 'Birla Institute of Technology (BIT) Mesra',
    department: 'Civil & Environmental Engineering',
    degree: 'B.Tech Final Year (2026 Batch)',
    projectsSolved: 4,
    govApproved: 3,
    pilotsCompleted: 2,
    peopleImpacted: 4280,
    industryMentors: 2,
    ngoCollaborations: 1,
    skills: ['IoT Sensor Telemetry', 'Water Chemistry', 'Solar Filtration', 'GIS Mapping', 'Python', 'React', 'Embedded C'],
    achievements: [
      'Government-Validated Civic Project (Govt of Jharkhand)',
      'Field Implementation in Tribal Cluster (Hansdiha)',
      'Industry Mentorship with Tata Steel CSR',
      'Verified Community Impact Certificate (SS-2026-1042)',
    ],
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Profile Card */}
      <div className="bg-white rounded-xl border border-brand-border p-6 sm:p-8 shadow-subtle flex flex-col sm:flex-row items-start gap-6">
        <div className="w-20 h-20 rounded-xl bg-slate-900 text-emerald-400 border border-slate-700 flex items-center justify-center font-bold text-2xl flex-shrink-0 shadow-sm">
          AS
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h1 className="text-2xl font-extrabold text-brand-text">{profile.name}</h1>
              <p className="text-xs text-brand-textMuted font-medium">
                {profile.degree} • {profile.department}
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified Student Innovator
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-brand-text font-semibold">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span>{profile.university}</span>
          </div>

          {/* Skills tags */}
          <div className="pt-2 flex flex-wrap gap-1.5">
            {profile.skills.map((s) => (
              <span key={s} className="bg-brand-bg border border-brand-border text-brand-dark font-medium px-2.5 py-0.5 rounded-lg text-[11px]">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Numbers Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-center">
        <div className="p-4 rounded-2xl bg-white border border-brand-border shadow-xs">
          <span className="text-[10px] text-gray-400 font-bold uppercase block font-sans">Projects Solved</span>
          <span className="text-2xl font-black text-brand-dark mt-1 block">{profile.projectsSolved}</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-brand-border shadow-xs">
          <span className="text-[10px] text-gray-400 font-bold uppercase block font-sans">Gov Approved</span>
          <span className="text-2xl font-black text-blue-600 mt-1 block">{profile.govApproved}</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-brand-border shadow-xs">
          <span className="text-[10px] text-gray-400 font-bold uppercase block font-sans">Pilots Done</span>
          <span className="text-2xl font-black text-indigo-600 mt-1 block">{profile.pilotsCompleted}</span>
        </div>
        <div className="p-4 rounded-2xl bg-brand-mintSoft border border-brand-mint shadow-xs">
          <span className="text-[10px] text-emerald-800 font-bold uppercase block font-sans">People Impacted</span>
          <span className="text-2xl font-black text-emerald-900 mt-1 block">{profile.peopleImpacted.toLocaleString()}</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-brand-border shadow-xs">
          <span className="text-[10px] text-gray-400 font-bold uppercase block font-sans">CSR Mentors</span>
          <span className="text-2xl font-black text-brand-dark mt-1 block">{profile.industryMentors}</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-brand-border shadow-xs">
          <span className="text-[10px] text-gray-400 font-bold uppercase block font-sans">NGO Partners</span>
          <span className="text-2xl font-black text-brand-dark mt-1 block">{profile.ngoCollaborations}</span>
        </div>
      </div>

      {/* Verified Achievement Badges */}
      <div className="bg-white rounded-xl border border-brand-border p-6 sm:p-8 shadow-subtle space-y-4">
        <h3 className="text-base font-bold text-brand-text">Verified Competency Badges</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {profile.achievements.map((ach, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="font-semibold text-brand-text">{ach}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Issued Impact Credentials */}
      <div className="bg-white rounded-xl border border-brand-border p-6 sm:p-8 shadow-subtle space-y-4">
        <div className="flex items-center justify-between border-b border-brand-border pb-3">
          <div>
            <h3 className="text-base font-bold text-brand-text">Public Verifiable Credentials</h3>
            <p className="text-xs text-brand-textMuted">Cryptographic certificates authenticated by state administration</p>
          </div>
          <span className="text-xs font-mono font-bold bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
            {credentials.length} Credentials
          </span>
        </div>

        <div className="space-y-3">
          {credentials.map((cred) => (
            <div
              key={cred.id}
              className="p-5 rounded-2xl border border-brand-border bg-gray-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-brand-dark bg-white px-2 py-0.5 rounded border border-gray-200">
                    #{cred.id}
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-800 bg-brand-mintSoft px-2 py-0.5 rounded-full text-[10px]">
                    <CheckCircle2 className="w-3 h-3" /> Impact Verified
                  </span>
                </div>
                <h4 className="font-bold text-sm text-brand-text">{cred.title}</h4>
                <p className="text-brand-textMuted text-[11px]">
                  Beneficiaries: <strong>{cred.impactPopulation.toLocaleString()} citizens</strong> • Issued by {cred.verifiedByOfficer}
                </p>
              </div>

              <Link
                to={`/verify/${cred.id}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white font-semibold text-xs rounded-lg hover:bg-slate-800 transition shadow-sm self-start sm:self-center flex-shrink-0"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>Verify Credential</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

