import React, { useState } from 'react';
import { useAppState } from '../../context/StateContext';
import { UserRole } from '../../types';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  RotateCcw, 
  Compass, 
  ChevronRight, 
  CheckCircle2, 
  X,
  ExternalLink,
  Shield,
  GraduationCap,
  Briefcase,
  HeartHandshake,
  UserCheck
} from 'lucide-react';

export const DemoRoleSwitcher: React.FC = () => {
  const { role, switchRole, resetToDemoDefaults, goldenStep, setGoldenStep, t } = useAppState();
  const [showTourModal, setShowTourModal] = useState(false);
  const navigate = useNavigate();

  const roles: { key: UserRole; label: string; icon: React.ReactNode; path: string }[] = [
    { key: 'government', label: t('role.government', 'Government Officer'), icon: <Shield className="w-3.5 h-3.5" />, path: '/government' },
    { key: 'student', label: t('role.student', 'Student / Innovator'), icon: <GraduationCap className="w-3.5 h-3.5" />, path: '/university' },
    { key: 'mentor', label: t('role.mentor', 'Faculty Mentor'), icon: <UserCheck className="w-3.5 h-3.5" />, path: '/university/mentors' },
    { key: 'industry', label: t('role.industry', 'Industry / CSR'), icon: <Briefcase className="w-3.5 h-3.5" />, path: '/industry' },
    { key: 'ngo', label: t('role.ngo', 'NGO / Field Partner'), icon: <HeartHandshake className="w-3.5 h-3.5" />, path: '/ngo' },
    { key: 'citizen', label: t('role.citizen', 'Citizen Reporter'), icon: <Users className="w-3.5 h-3.5" />, path: '/citizen' },
  ];

  const tourSteps = [
    { step: 1, title: 'Government Command Center', role: 'government' as UserRole, path: '/government', desc: 'Evaluator observes 1,284 reports, 84 critical, and live GIS map with red critical markers.' },
    { step: 2, title: 'Inspect Critical Problem', role: 'government' as UserRole, path: '/challenges/c-wtr-1042', desc: 'Click #JH-WTR-1042 (Contaminated Drinking Water, Dumka, 94/100 score).' },
    { step: 3, title: 'Duplicate Intelligence (37 Reports)', role: 'government' as UserRole, path: '/challenges/c-wtr-1042', desc: 'Inspect AI cluster synthesizing 37 citizen reports across 3 villages into 1 master challenge.' },
    { step: 4, title: 'AI Priority & Government Override', role: 'government' as UserRole, path: '/challenges/c-wtr-1042', desc: 'Review 6 transparent factor bars. Government officer can confirm or override priority with audit reason.' },
    { step: 5, title: 'Government Verification', role: 'government' as UserRole, path: '/challenges/c-wtr-1042', desc: 'Government officer officially verifies challenge, moving status to Published / Verified.' },
    { step: 6, title: 'Student Discovery & AI Match', role: 'student' as UserRole, path: '/university', desc: 'Switch to Student. AI matchmaking recommends #JH-WTR-1042 with a 92% skill & department match.' },
    { step: 7, title: 'University Team Adopts Challenge', role: 'student' as UserRole, path: '/university/challenges', desc: 'BIT Mesra student team submits capstone project proposal with milestones.' },
    { step: 8, title: 'Faculty Mentor Approval', role: 'mentor' as UserRole, path: '/university/mentors', desc: 'Faculty mentor reviews technical viability and signs off on university credit.' },
    { step: 9, title: 'Industry CSR Support & Mentorship', role: 'industry' as UserRole, path: '/industry/projects', desc: 'Tata Steel CSR discovers project and pledges ₹3.8L grant and dedicated technical mentor.' },
    { step: 10, title: 'NGO Field Implementation', role: 'ngo' as UserRole, path: '/ngo/evidence', desc: 'Grassroots partner uploads solar kiosk photos, TDS test drop (890 -> 142 ppm), and 2,615 beneficiaries.' },
    { step: 11, title: 'Government Impact Verification', role: 'government' as UserRole, path: '/government/impact', desc: 'District Magistrate verifies ground evidence and certifies population reach.' },
    { step: 12, title: 'Impact Showcase & Resolution', role: 'government' as UserRole, path: '/solutions', desc: 'Public impact showcase with citizen reach and verified outcomes.' },
  ];

  const handleRoleClick = (r: UserRole, path: string) => {
    switchRole(r);
    navigate(path);
  };

  const jumpToTourStep = (stepIdx: number) => {
    const s = tourSteps[stepIdx];
    if (s) {
      setGoldenStep(s.step);
      switchRole(s.role);
      navigate(s.path);
      setShowTourModal(false);
    }
  };

  return (
    <>
      <header aria-label="Demo role selector" className="bg-brand-darkSecondary text-white border-b border-brand-sidebarActive px-3 sm:px-6 py-2 text-xs flex flex-wrap items-center justify-between gap-2.5 z-40 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-brand-sidebarActive px-2.5 py-1 rounded-md border border-brand-border/20">
            <span className="h-2 w-2 rounded-full bg-brand-mintBright animate-pulse" />
            <span className="font-bold text-brand-mint text-[11px] tracking-wider uppercase">{t('demo.badge', 'SIH 2026 DEMO MODE')}</span>
          </div>

          <span className="hidden md:inline text-gray-400 text-[11px]">
            {t('demo.active_role', 'Active Role')}: <strong className="text-white capitalize">{role}</strong>
          </span>
        </div>

        {/* Role Quick Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto py-0.5">
          {roles.map((r) => (
            <button
              key={r.key}
              onClick={() => handleRoleClick(r.key, r.path)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                role === r.key
                  ? 'bg-brand-mint text-brand-dark shadow-xs'
                  : 'text-gray-300 hover:text-white hover:bg-brand-sidebarActive'
              }`}
            >
              {r.icon}
              <span>{r.label}</span>
            </button>
          ))}
        </div>

        {/* Golden tour & reset */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTourModal(true)}
            className="flex items-center gap-1.5 px-3 py-1 bg-brand-mint text-brand-dark rounded-lg font-bold text-xs hover:bg-brand-mintBright transition shadow-xs"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{t('demo.golden_tour', 'Golden Tour')} ({t('demo.step', 'Step')} {goldenStep}/12)</span>
          </button>

          <button
            onClick={resetToDemoDefaults}
            title={t('demo.reset', 'Reset to initial prototype dataset')}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-brand-sidebarActive transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Guided Tour Modal */}
      {showTourModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-brand-border shadow-modal max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 bg-brand-dark text-white flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-brand-sidebarActive text-brand-mint px-2 py-0.5 rounded">
                    SIH 2026 Golden Path
                  </span>
                  <span className="text-xs text-gray-300">Challenge #JH-WTR-1042</span>
                </div>
                <h3 className="text-lg font-extrabold text-white mt-1">
                  12-Step Problem-to-Impact Ecosystem Journey
                </h3>
              </div>
              <button
                onClick={() => setShowTourModal(false)}
                className="text-gray-400 hover:text-white p-1.5 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-2.5 text-xs">
              <p className="text-brand-textMuted mb-4 text-xs">
                Follow one master problem from initial citizen report to cryptographic government-certified credential. Click any step to jump straight into that stakeholder view:
              </p>

              {tourSteps.map((s, idx) => {
                const isCurrent = goldenStep === s.step;
                return (
                  <div
                    key={s.step}
                    onClick={() => jumpToTourStep(idx)}
                    className={`p-3 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                      isCurrent
                        ? 'border-brand-mint bg-brand-mintSoft/40 ring-1 ring-brand-mint'
                        : 'border-brand-border bg-white hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        isCurrent
                          ? 'bg-slate-900 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {s.step}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-brand-text text-sm">{s.title}</h4>
                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                          {s.role}
                        </span>
                      </div>
                      <p className="text-brand-textMuted mt-1 leading-relaxed">{s.desc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                  </div>
                );
              })}
            </div>

            <div className="p-4 bg-brand-bg border-t border-brand-border flex items-center justify-between">
              <span className="text-xs text-brand-textMuted">
                All roles maintain synchronized state in memory & local storage.
              </span>
              <button
                onClick={() => setShowTourModal(false)}
                className="px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-lg text-xs font-semibold transition shadow-sm"
              >
                Close Tour Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

