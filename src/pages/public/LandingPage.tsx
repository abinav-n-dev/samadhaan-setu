import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';
import { UserRole } from '../../types';
import { 
  ArrowRight, 
  ShieldCheck, 
  GraduationCap, 
  Building, 
  Users, 
  HeartHandshake, 
  CheckCircle2, 
  MapPin, 
  FileCheck2, 
  Sparkles,
  ChevronRight,
  Activity,
  Layers,
  Award,
  Check,
  X,
  Lock,
  Compass,
  Lightbulb,
  Cpu,
  TrendingUp,
  UserCheck
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { login, challenges, t } = useAppState();
  const navigate = useNavigate();

  const totalReports = 1284;
  const verifiedCount = 316;
  const criticalCount = 84;
  const universityTeamsCount = 42;

  const handleRoleLogin = (role: UserRole, destination: string) => {
    login(role);
    navigate(destination);
  };

  const portalRoles: {
    role: UserRole;
    name: string;
    title: string;
    description: string;
    persona: string;
    institution: string;
    destination: string;
    badge: string;
    badgeBg: string;
    icon: React.ReactNode;
    features: string[];
  }[] = [
    {
      role: 'government',
      name: 'District & State Government',
      title: 'Command Center & Verification',
      description: 'Review incoming citizen reports, synthesize duplicate clusters, prioritize challenges, audit field evidence, and issue tamper-proof credentials.',
      persona: 'Sanjay K. Verma, IAS',
      institution: 'District Magistrate, Dumka (Govt of Jharkhand)',
      destination: '/government',
      badge: 'GOVERNMENT',
      badgeBg: 'bg-blue-50 text-blue-800 border-blue-200',
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
      features: [
        'AI duplicate clustering (500m radius)',
        '6-factor weighted priority override',
        'Live GIS heatmap & incident registry',
        'Impact certification & credential minting'
      ],
    },
    {
      role: 'citizen',
      name: 'Citizens & Communities',
      title: 'Ground Problem Reporting',
      description: 'Report local infrastructure, water, and sanitation issues with geotagging and photos. Track resolution stages transparently in real time.',
      persona: 'Sunita Soren',
      institution: 'Hansdiha Gram Sabha, Dumka',
      destination: '/citizen',
      badge: 'CITIZEN',
      badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
      icon: <Users className="w-6 h-6 text-amber-600" />,
      features: [
        '4-step guided photo & GPS submission',
        'Duplicate alert check before submit',
        'Transparent 9-phase progress tracking',
        'Community resolution confirmation'
      ],
    },
    {
      role: 'student',
      name: 'Universities & Students',
      title: 'Academic Capstone Hub',
      description: 'Discover accredited civic challenges vetted by district authorities. Form interdisciplinary student teams and earn academic credits.',
      persona: 'Aarav Sengupta',
      institution: 'BIT Mesra (Civil & Environmental Engineering)',
      destination: '/university',
      badge: 'STUDENT',
      badgeBg: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      icon: <GraduationCap className="w-6 h-6 text-indigo-600" />,
      features: [
        'Vetted engineering challenges for capstones',
        'Milestone submission & mentor review',
        'CSR grant applications (up to ₹5,00,000)',
        'Cryptographic achievement credentials'
      ],
    },
    {
      role: 'mentor',
      name: 'Faculty Academic Mentors',
      title: 'Engineering Review Desk',
      description: 'Guide student engineering teams, review proposal feasibility, sign off on prototype milestones, and authorize university degree credits.',
      persona: 'Dr. Rameshwar Mahato',
      institution: 'Professor & Head of Environmental Fluid Dynamics, BIT Mesra',
      destination: '/university/mentors',
      badge: 'FACULTY MENTOR',
      badgeBg: 'bg-indigo-50 text-indigo-900 border-indigo-200',
      icon: <UserCheck className="w-6 h-6 text-indigo-700" />,
      features: [
        'Proposal technical rigor review',
        'Lab test & simulation approval',
        'Milestone sign-off for grant release',
        'Academic credit authorization'
      ],
    },
    {
      role: 'industry',
      name: 'Industry & Corporate CSR',
      title: 'Section 135 CSR Portfolio',
      description: 'Pledge corporate social responsibility grants to vetted university projects. Track fund disbursement against verifiable milestone telemetry.',
      persona: 'Er. Rajesh Sharma',
      institution: 'Tata Steel CSR Foundation, Jamshedpur',
      destination: '/industry',
      badge: 'INDUSTRY / CSR',
      badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      icon: <Building className="w-6 h-6 text-emerald-600" />,
      features: [
        'Discover high-impact university solutions',
        'Milestone-locked CSR fund pledges',
        'Direct executive engineering mentorship',
        'Verifiable ESG & CSR impact certificates'
      ],
    },
    {
      role: 'ngo',
      name: 'NGOs & Field Implementers',
      title: 'Ground Operations Desk',
      description: 'Partner with student teams to deploy hardware in villages, conduct community user training, upload ground telemetry, and lead Gram Sabha audits.',
      persona: 'Anita Murmu',
      institution: 'Pratham Gramin Vikas Trust, Dumka Unit',
      destination: '/ngo',
      badge: 'FIELD NGO',
      badgeBg: 'bg-purple-50 text-purple-800 border-purple-200',
      icon: <HeartHandshake className="w-6 h-6 text-purple-600" />,
      features: [
        'Village liaison & site deployment',
        'Water test & telemetry uploads',
        'Gram Sabha community social audit',
        'Field evidence verification sign-off'
      ],
    },
  ];

  const comparisonRows = [
    {
      criteria: 'Problem Intake',
      traditional: 'Vague text complaint filed into an unmanaged ticket queue.',
      samadhan: 'Geo-tagged, photo-verified report with instant 500m duplicate check and community corroboration.',
    },
    {
      criteria: 'Duplicate Handling',
      traditional: 'Dozens of identical complaints create bureaucratic clutter and delays.',
      samadhan: 'AI clustering automatically aggregates reports into unified, prioritized challenges.',
    },
    {
      criteria: 'Solution Engine',
      traditional: 'Passed to junior municipal staff with limited technical capability.',
      samadhan: 'Adopted by top engineering universities as accredited final-year Capstone projects.',
    },
    {
      criteria: 'Project Financing',
      traditional: 'Stalls in multi-year government municipal tender budget queues.',
      samadhan: 'Accelerated through Corporate CSR (Section 135) micro-grants with milestone-locked payouts.',
    },
    {
      criteria: 'Ground Deployment',
      traditional: 'Untracked contractor installation without community ownership.',
      samadhan: 'Executed on ground in partnership with local grassroots NGOs and Gram Sabhas.',
    },
    {
      criteria: 'Outcome Verification',
      traditional: 'Ticket marked "closed" on paper without physical verification.',
      samadhan: 'District Magistrate and Gram Sabha audit water & health telemetry, minting tamper-proof credentials.',
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Stakeholder Quick Login Bar at Very Top */}
      <div className="bg-white border border-brand-border rounded-2xl p-4 shadow-subtle flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-brand-dark">
          <Lock className="w-4 h-4 text-brand-dark" />
          <span>PORTAL LOGIN:</span>
          <span className="text-brand-textMuted font-normal hidden sm:inline">
            Choose your stakeholder identity to open your custom dashboard:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {portalRoles.map((p) => (
            <button
              key={p.role}
              type="button"
              onClick={() => handleRoleLogin(p.role, p.destination)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-brand-bg hover:bg-brand-dark hover:text-white border border-brand-border transition shadow-xs"
            >
              <span>{p.name.split(' ')[0]}</span>
              <span className="text-[10px] text-brand-textMuted">→</span>
            </button>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative rounded-3xl bg-brand-dark text-white p-6 sm:p-10 lg:p-12 overflow-hidden border border-brand-sidebarActive shadow-modal">
        <div 
          className="absolute inset-0 opacity-10 bg-[radial-gradient(#8FF0C8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" 
        />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-sidebarActive border border-brand-mint/30 text-xs font-semibold text-brand-mint">
              <span className="w-2 h-2 rounded-full bg-brand-mintBright animate-ping" />
              <span>{t('hero.tag', 'Smart India Hackathon 2026 Innovation Platform')}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {t('hero.title_prefix', 'Bridging Civic Problems with')} <span className="text-brand-mint">{t('hero.title_highlight', 'Engineered, Funded & Verified Solutions.')}</span>
            </h1>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal max-w-2xl">
              {t('hero.desc', 'SamadhanSetu (समाधान सेतु) turns verified community problems into accredited University Capstone projects, funded by Corporate CSR grants, deployed with grassroots NGOs, and audited by District Administration.')}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#portals"
                className="inline-flex items-center gap-2 bg-brand-mint text-brand-dark px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm hover:bg-brand-mintBright transition shadow-elevated"
              >
                <Lock className="w-4 h-4" />
                <span>{t('nav.portal_login', 'Select Portal & Log In')}</span>
              </a>

              <Link
                to="/citizen/report"
                className="inline-flex items-center gap-2 bg-brand-sidebarActive text-white border border-brand-border/30 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm hover:bg-brand-sidebarActive/80 transition"
              >
                <span>{t('hero.btn_report', 'Report a Problem')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/explore"
                className="inline-flex items-center gap-2 text-gray-300 hover:text-white text-xs sm:text-sm font-semibold px-3 py-2"
              >
                <span>{t('hero.btn_explore', 'Explore Challenges')}</span>
              </Link>
            </div>
          </div>

          {/* Live Problem Network Metrics Card (Non-overlapping Grid Item) */}
          <div className="lg:col-span-4 w-full">
            <div className="bg-brand-sidebarActive/90 backdrop-blur-md rounded-2xl border border-brand-mint/20 p-5 shadow-modal text-xs">
              <div className="flex items-center justify-between border-b border-brand-border/20 pb-2 mb-3">
                <span className="font-bold text-brand-mint uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" />
                  Live Network Metrics
                </span>
                <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ACTIVE
                </span>
              </div>

              <div className="space-y-2.5 font-mono">
                <div className="flex justify-between items-center text-gray-200">
                  <span className="text-gray-400 font-sans">Total Reports:</span>
                  <span className="font-bold text-white text-sm">{totalReports.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-gray-200">
                  <span className="text-gray-400 font-sans">Gov-Verified:</span>
                  <span className="font-bold text-brand-mint text-sm">{verifiedCount}</span>
                </div>
                <div className="flex justify-between items-center text-gray-200">
                  <span className="text-gray-400 font-sans">Critical Priority:</span>
                  <span className="font-bold text-red-400 text-sm">{criticalCount}</span>
                </div>
                <div className="flex justify-between items-center text-gray-200">
                  <span className="text-gray-400 font-sans">University Teams:</span>
                  <span className="font-bold text-white text-sm">{universityTeamsCount}</span>
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-brand-border/20 text-[10px] text-gray-400 flex justify-between items-center">
                <span>Verified Impact Pipeline</span>
                <Link to="/government" className="text-brand-mint hover:underline font-semibold font-sans">
                  Command Center →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE CORE IDEA SECTION */}
      <section className="space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-dark bg-brand-mintSoft px-3.5 py-1 rounded-full border border-brand-mint/40">
            {t('vision.tag', 'The Vision & Core Architecture')}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-text tracking-tight">
            {t('vision.title', 'Why Traditional Grievance Systems Fail & How SamadhanSetu Solves It')}
          </h2>
          <p className="text-xs sm:text-sm text-brand-textMuted leading-relaxed">
            {t('vision.desc', 'India does not lack citizen complaints — it lacks an engineering and execution bridge to turn those complaints into verified, sustainable public infrastructure.')}
          </p>
        </div>

        {/* 3 Core Pillars of the Idea */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl border border-brand-border p-6 shadow-subtle hover:border-brand-mint transition space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-brand-text">
              {t('vision.pillar1_title', '1. Ground Reality & Spatial De-Duplication')}
            </h3>
            <p className="text-xs text-brand-textMuted leading-relaxed">
              {t('vision.pillar1_desc', 'Instead of fragmented duplicate text tickets, citizens submit geo-tagged, photo-verified reports. The spatial engine aggregates reports within a 500m radius and scores severity objectively across 6 vital civic factors.')}
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-brand-border p-6 shadow-subtle hover:border-brand-mint transition space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-brand-text">
              {t('vision.pillar2_title', '2. Academic Capstones with Real-World Purpose')}
            </h3>
            <p className="text-xs text-brand-textMuted leading-relaxed">
              {t('vision.pillar2_desc', 'Channels talent from accredited engineering colleges into verified public infrastructure problems as credit-bearing capstone projects under experienced faculty mentorship.')}
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-brand-border p-6 shadow-subtle hover:border-brand-mint transition space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-brand-text">
              {t('vision.pillar3_title', '3. CSR Co-Financing & Verified Public Impact')}
            </h3>
            <p className="text-xs text-brand-textMuted leading-relaxed">
              {t('vision.pillar3_desc', 'Corporate CSR grants provide milestone-locked disbursements. Grassroots NGOs coordinate field adoption, while District Administration conducts public social audits and issues tamper-proof impact credentials.')}
            </p>
          </div>
        </div>
      </section>

      {/* MULTI-ROLE LOGIN PORTAL SECTION */}
      <section id="portals" className="space-y-8 scroll-mt-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-brand-border pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-dark bg-brand-mintSoft px-2.5 py-0.5 rounded">
              {t('portals.tag', 'Multi-Stakeholder Architecture')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-text mt-1">
              {t('portals.title', 'Select Your Institutional Portal to Log In')}
            </h2>
          </div>
          <p className="text-xs text-brand-textMuted max-w-md">
            {t('portals.desc', 'Select your role to access your custom administrative dashboard with role-specific operational permissions.')}
          </p>
        </div>

        {/* 6 Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portalRoles.map((p) => (
            <div
              key={p.role}
              className="bg-white rounded-3xl border border-brand-border p-6 shadow-subtle hover:shadow-modal hover:border-brand-dark transition duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-brand-bg rounded-2xl border border-brand-border/60">
                    {p.icon}
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider ${p.badgeBg}`}>
                    {p.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-base text-brand-text">{p.name}</h3>
                  <div className="text-xs font-semibold text-brand-dark mt-0.5">{p.title}</div>
                  <p className="text-xs text-brand-textMuted mt-2 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                {/* Key Features Pill List */}
                <div className="space-y-1.5 pt-2 border-t border-gray-100">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    Dashboard Capabilities:
                  </span>
                  {p.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-brand-text">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button & Demo Persona */}
              <div className="mt-6 pt-4 border-t border-gray-100 space-y-3">
                <div className="text-[11px] bg-brand-bg p-2 rounded-xl">
                  <span className="text-gray-400 text-[10px] block font-semibold uppercase">Persona:</span>
                  <strong className="text-brand-text block">{p.persona}</strong>
                  <span className="text-brand-textMuted truncate block">{p.institution}</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleRoleLogin(p.role, p.destination)}
                  className="w-full py-2.5 px-4 bg-brand-dark text-brand-mint rounded-xl font-bold text-xs hover:bg-brand-darkSecondary transition flex items-center justify-center gap-2 shadow-xs"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Log In as {p.name.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMPARISON TABLE: TRADITIONAL VS SAMADHANSETU */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-dark bg-brand-mintSoft px-3 py-1 rounded-full">
            Ecosystem Comparison
          </span>
          <h2 className="text-2xl font-extrabold text-brand-text">
            Traditional Complaint Portals vs. SamadhanSetu
          </h2>
          <p className="text-xs text-brand-textMuted">
            See how SamadhanSetu transforms dead-end complaints into verifiable engineering impact.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-brand-border overflow-hidden shadow-subtle">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-brand-bg border-b border-brand-border">
                  <th className="py-3.5 px-5 font-bold text-brand-text uppercase text-[11px] w-1/4">Workflow Phase</th>
                  <th className="py-3.5 px-5 font-bold text-red-700 uppercase text-[11px] w-3/8">
                    Conventional Grievance Portals
                  </th>
                  <th className="py-3.5 px-5 font-bold text-emerald-800 uppercase text-[11px] w-3/8 bg-emerald-50/50">
                    SamadhanSetu Pipeline
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/60 transition">
                    <td className="py-3.5 px-5 font-bold text-brand-text">
                      {row.criteria}
                    </td>
                    <td className="py-3.5 px-5 text-gray-600">
                      <div className="flex items-start gap-2">
                        <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span>{row.traditional}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-5 font-medium text-brand-text bg-emerald-50/30">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{row.samadhan}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Real-World Case Study: Dumka Solar Water Micro-Filtration */}
      <section className="rounded-3xl bg-white border border-brand-border p-6 sm:p-10 shadow-elevated">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-brand-border pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Verified Case Study
            </span>
            <span className="font-mono text-xs text-brand-textMuted">Challenge #JH-WTR-1042</span>
          </div>

          <Link
            to="/challenges/c-wtr-1042"
            className="text-xs font-bold text-brand-dark hover:underline flex items-center gap-1"
          >
            <span>View Full Journey</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-extrabold text-brand-text leading-tight">
              Solar Water Micro-Filtration Kiosk — Hansdiha, Dumka
            </h3>
            <p className="text-xs sm:text-sm text-brand-textMuted leading-relaxed">
              In Hansdiha Panchayat, 37 citizen reports flagged alarming fluoride and iron turbidity. Clustered by SamadhanSetu's duplicate intelligence, the challenge was validated by the District Magistrate, adopted by <strong>BIT Mesra</strong> engineering students, funded by <strong>Tata Steel CSR</strong>, and deployed in partnership with <strong>Pratham Gramin Vikas Trust</strong>.
            </p>

            {/* Before vs After comparison */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-red-50/70 border border-red-200 rounded-xl p-3.5 text-xs space-y-1">
                <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider block">
                  Ground Problem (Before)
                </span>
                <p className="font-semibold text-brand-text">TDS: 890 ppm | Fluoride 3.8 mg/L</p>
                <p className="text-red-700 text-[11px]">Pediatric gastrointestinal & fluorosis outbreak</p>
              </div>

              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3.5 text-xs space-y-1">
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                  Verified Outcome (After)
                </span>
                <p className="font-semibold text-brand-text">TDS: 142 ppm | Fluoride 0.45 mg/L</p>
                <p className="text-emerald-700 text-[11px]">2,615 citizens secured clean potable water</p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/verify/SS-2026-1042"
                className="inline-flex items-center gap-2 bg-brand-dark text-brand-mint text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-brand-darkSecondary transition shadow-xs"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>View Verifiable Credential SS-2026-1042</span>
              </Link>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-brand-border bg-gray-100 shadow-subtle">
            <img
              src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80"
              onError={(e) => {
                const target = e.currentTarget;
                target.onerror = null;
                target.src = "https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&w=1200&q=80";
              }}
              alt="Solar water micro-filtration installation in Dumka"
              className="w-full h-72 object-cover"
            />
            <div className="p-4 bg-brand-bg border-t border-brand-border flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-brand-text font-semibold">
                <MapPin className="w-4 h-4 text-brand-dark" />
                <span>Hansdiha, Dumka, Jharkhand</span>
              </div>
              <span className="font-mono text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                92.1% Coverage Reached
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
