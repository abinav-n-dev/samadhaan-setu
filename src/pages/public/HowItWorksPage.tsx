import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  GraduationCap, 
  Building, 
  HeartHandshake, 
  FileCheck2,
  Sparkles,
  HelpCircle,
  TrendingUp,
  Cpu
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Citizen Reporting & Geotagging',
      role: 'Citizens & Panchayats',
      icon: <Layers className="w-5 h-5 text-amber-600" />,
      desc: 'Citizens report genuine infrastructure, water, medical or school issues via mobile web with browser GPS coordinates, photographic evidence, and community urgency markers.',
    },
    {
      step: '02',
      title: 'AI Duplicate Intelligence & Clustering',
      role: 'System Algorithmic Layer',
      icon: <Cpu className="w-5 h-5 text-brand-dark" />,
      desc: 'Multiple reports from the same village or catchment zone are automatically clustered (e.g. 37 submissions into 1 master challenge) to synthesize real community signal without inflating individual priority.',
    },
    {
      step: '03',
      title: 'Government Verification',
      role: 'District Magistrate / BDO',
      icon: <ShieldCheck className="w-5 h-5 text-blue-600" />,
      desc: 'Administrative officers validate ground veracity, merge/separate clusters, and officially certify the challenge for public academic discovery.',
    },
    {
      step: '04',
      title: 'AI Priority Assessment & Override',
      role: 'Multi-factor Decision Support',
      icon: <TrendingUp className="w-5 h-5 text-red-600" />,
      desc: 'Transparent 6-factor model calculates priority (0-100) based on Severity (30%), Population Impact (25%), Geographic Spread (15%), Urgency (15%), Duplicate Signal (10%), and Feasibility (5%). Officers can override with audited notes.',
    },
    {
      step: '05',
      title: 'University Discovery & Adoption',
      role: 'Engineering Students',
      icon: <GraduationCap className="w-5 h-5 text-indigo-600" />,
      desc: 'Student engineering teams discover verified challenges aligned with their department (Civil, Environmental, IoT, Biomedical) and adopt them as credit-bearing capstone projects.',
    },
    {
      step: '06',
      title: 'Faculty Mentor Sign-Off',
      role: 'University Professors',
      icon: <CheckCircle2 className="w-5 h-5 text-indigo-700" />,
      desc: 'Academic mentors review technical methodology, lab feasibility, and milestones, certifying that the project fulfills institutional capstone curriculum requirements.',
    },
    {
      step: '07',
      title: 'Industry CSR Sponsorship & Mentorship',
      role: 'Corporate Partners',
      icon: <Building className="w-5 h-5 text-emerald-600" />,
      desc: 'Corporate CSR foundations discover vetted prototypes and pledge financial grants, sensor hardware, or senior engineering mentorship for field readiness.',
    },
    {
      step: '08',
      title: 'Field Deployment & NGO Handover',
      role: 'NGO Field Partners',
      icon: <HeartHandshake className="w-5 h-5 text-purple-600" />,
      desc: 'Grassroots partners implement the physical solution on-ground, train village operators, and upload telemetry and water/soil test verification reports.',
    },
    {
      step: '09',
      title: 'Official Government Impact Verification',
      role: 'District Administration',
      icon: <ShieldCheck className="w-5 h-5 text-blue-700" />,
      desc: 'The District Collector/DM inspects audited beneficiary reach and telemetry metrics, certifying that the community problem is genuinely resolved.',
    },
    {
      step: '10',
      title: 'Verifiable Impact Credential',
      role: 'Public Trust Layer',
      icon: <FileCheck2 className="w-5 h-5 text-brand-dark" />,
      desc: 'A permanent verifiable cryptographic achievement credential is generated for the student team and corporate partners, accessible to employers via a public verification ledger.',
    },
  ];

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
          Complete Ecosystem Lifecycle
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          How SamadhanSetu Works
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          From genuine citizen pain point to verified engineering solution. Here is the step-by-step mechanism connecting citizens, administration, universities, and industry.
        </p>
      </div>

      {/* Core Principle Comparison Box */}
      <div className="bg-slate-900 text-white rounded-xl p-6 sm:p-8 border border-slate-800 shadow-md space-y-4">
        <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          The Core Paradigm Shift
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-lg bg-slate-800 border border-slate-700 space-y-1">
            <span className="font-bold text-rose-400 uppercase tracking-wider block">
              Conventional Complaint Portals
            </span>
            <p className="text-slate-300 leading-relaxed">
              Citizens file tickets into a bureaucratic bottleneck; government lacks engineering manpower; tickets stagnate or get closed without root-cause physical solutions.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-slate-800 border border-emerald-500/40 space-y-1">
            <span className="font-bold text-emerald-400 uppercase tracking-wider block">
              SamadhanSetu Ecosystem
            </span>
            <p className="text-slate-300 leading-relaxed">
              Genuine problems are converted into university capstone opportunities with faculty guidance, CSR capital, and field NGO deployment—resulting in measurable, certified impact.
            </p>
          </div>
        </div>
      </div>

      {/* 10 Detailed Steps */}
      <div className="space-y-4">
        {steps.map((s) => (
          <div
            key={s.step}
            className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-slate-300 transition"
          >
            <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center font-mono font-bold text-slate-800 text-base flex-shrink-0">
              {s.step}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h4 className="font-bold text-sm text-slate-900">{s.title}</h4>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  {s.role}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
            </div>

            <div className="hidden sm:block p-2 rounded-lg bg-slate-50 border border-slate-100 flex-shrink-0">
              {s.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="p-8 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-4">
        <h3 className="text-xl font-bold text-slate-900">
          Ready to Experience the Complete Workflow?
        </h3>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          Select any stakeholder portal from the top Login menu to explore role-specific workflows and dashboards.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <Link
            to="/government"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-bold text-xs hover:bg-emerald-700 transition shadow-xs"
          >
            <span>Open Government Center</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-5 py-2.5 rounded-lg font-semibold text-xs hover:bg-slate-50 transition"
          >
            <span>Browse Challenges</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

