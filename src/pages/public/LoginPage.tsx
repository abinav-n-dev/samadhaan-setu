import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';
import { UserRole } from '../../types';
import { 
  ShieldCheck, 
  Users, 
  GraduationCap, 
  UserCheck, 
  Building, 
  HeartHandshake, 
  ArrowRight, 
  Lock,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAppState();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole>('government');

  const roleOptions: {
    role: UserRole;
    title: string;
    description: string;
    persona: string;
    institution: string;
    icon: React.ReactNode;
    destination: string;
    badgeColor: string;
  }[] = [
    {
      role: 'government',
      title: 'District & State Government',
      description: 'Review incoming citizen reports, synthesize duplicate clusters, override priorities, and certify impact.',
      persona: 'Sanjay K. Verma, IAS',
      institution: 'District Magistrate, Dumka (Govt of Jharkhand)',
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
      destination: '/government',
      badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
    },
    {
      role: 'citizen',
      title: 'Citizen & Community Reporter',
      description: 'Report local drinking water and road issues with GPS geotagging and track field progress transparently.',
      persona: 'Sunita Soren',
      institution: 'Hansdiha Gram Sabha, Dumka',
      icon: <Users className="w-6 h-6 text-amber-600" />,
      destination: '/citizen',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    {
      role: 'student',
      title: 'University Student Innovator',
      description: 'Adopt verified civic challenges for accredited engineering capstone credit and credentials.',
      persona: 'Aarav Sengupta',
      institution: 'BIT Mesra (Civil & Environmental Engineering)',
      icon: <GraduationCap className="w-6 h-6 text-indigo-600" />,
      destination: '/university',
      badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    },
    {
      role: 'mentor',
      title: 'Faculty Academic Mentor',
      description: 'Review student proposal feasibility, validate milestones, and authorize university credit.',
      persona: 'Dr. Rameshwar Mahato',
      institution: 'Professor & Head of Environmental Fluid Dynamics',
      icon: <UserCheck className="w-6 h-6 text-indigo-700" />,
      destination: '/university/mentors',
      badgeColor: 'bg-indigo-50 text-indigo-900 border-indigo-200',
    },
    {
      role: 'industry',
      title: 'Industry & Corporate CSR',
      description: 'Pledge Section 135 CSR grants, specialized equipment labs, and technical mentorship.',
      persona: 'Er. Rajesh Sharma',
      institution: 'Tata Steel CSR Foundation, Jamshedpur',
      icon: <Building className="w-6 h-6 text-emerald-600" />,
      destination: '/industry',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      role: 'ngo',
      title: 'NGO & Field Implementation Partner',
      description: 'Deploy hardware on ground, conduct Gram Sabha audits, and upload telemetry verification.',
      persona: 'Anita Murmu',
      institution: 'Pratham Gramin Vikas Trust, Dumka Unit',
      icon: <HeartHandshake className="w-6 h-6 text-purple-600" />,
      destination: '/ngo',
      badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
    },
  ];

  const handleLoginSubmit = (roleKey: UserRole, destination: string) => {
    login(roleKey);
    navigate(destination);
  };

  const currentOption = roleOptions.find(o => o.role === selectedRole) || roleOptions[0];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-textMuted hover:text-brand-dark"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Landing Page</span>
        </Link>

        <span className="text-[11px] font-mono font-bold text-brand-textMuted bg-gray-100 px-2.5 py-1 rounded-md">
          Single Sign-On Gate
        </span>
      </div>

      <div className="text-center space-y-2 max-w-xl mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-brand-dark text-brand-mint border border-brand-mint/30 flex items-center justify-center mx-auto mb-3">
          <Lock className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-extrabold text-brand-text">
          Select Your Stakeholder Portal
        </h1>
        <p className="text-xs sm:text-sm text-brand-textMuted leading-relaxed">
          Log into your specialized workspace. Each dashboard provides tailored operational permissions, analytics, and workflow actions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roleOptions.map((opt) => {
          const isSelected = selectedRole === opt.role;
          return (
            <div
              key={opt.role}
              onClick={() => setSelectedRole(opt.role)}
              className={`p-6 rounded-3xl border transition cursor-pointer flex flex-col justify-between space-y-4 ${
                isSelected
                  ? 'border-brand-mint bg-brand-mintSoft/30 ring-2 ring-brand-mint shadow-elevated'
                  : 'border-brand-border bg-white hover:border-gray-300 hover:shadow-subtle'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                    {opt.icon}
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${opt.badgeColor}`}>
                    {opt.role.toUpperCase()}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-base text-brand-text">{opt.title}</h3>
                  <p className="text-brand-textMuted text-xs mt-1.5 leading-relaxed">
                    {opt.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 space-y-3">
                <div className="text-xs">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Demo Profile:</span>
                  <strong className="text-brand-text block">{opt.persona}</strong>
                  <span className="text-brand-textMuted text-[11px] truncate block">{opt.institution}</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleLoginSubmit(opt.role, opt.destination)}
                  className="w-full py-2 bg-brand-dark text-brand-mint rounded-xl font-bold text-xs hover:bg-brand-darkSecondary transition flex items-center justify-center gap-1.5"
                >
                  <span>Sign In as {opt.role}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

