import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';
import { UserRole } from '../../types';
import { 
  ShieldCheck, 
  Users, 
  GraduationCap, 
  UserCheck, 
  Building, 
  HeartHandshake, 
  X, 
  ArrowRight, 
  Lock,
  CheckCircle2
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login } = useAppState();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole>('government');

  if (!isOpen) return null;

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
      description: 'Review incoming reports, synthesize duplicate clusters, override priorities, and certify impact.',
      persona: 'Sanjay K. Verma, IAS',
      institution: 'District Magistrate, Dumka (Govt of Jharkhand)',
      icon: <ShieldCheck className="w-5 h-5 text-blue-600" />,
      destination: '/government',
      badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
    },
    {
      role: 'citizen',
      title: 'Citizen & Community Reporter',
      description: 'Report infrastructure & drinking water issues with GPS geotagging and track field progress.',
      persona: 'Sunita Soren',
      institution: 'Hansdiha Gram Sabha, Dumka',
      icon: <Users className="w-5 h-5 text-amber-600" />,
      destination: '/citizen',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    {
      role: 'student',
      title: 'University Student Innovator',
      description: 'Adopt verified civic challenges for accredited engineering capstone credit and credentials.',
      persona: 'Aarav Sengupta',
      institution: 'BIT Mesra (Civil & Environmental Engineering)',
      icon: <GraduationCap className="w-5 h-5 text-indigo-600" />,
      destination: '/university',
      badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    },
    {
      role: 'mentor',
      title: 'Faculty Academic Mentor',
      description: 'Review student proposal feasibility, validate milestones, and authorize university credit.',
      persona: 'Dr. Rameshwar Mahato',
      institution: 'Professor & Head of Environmental Fluid Dynamics',
      icon: <UserCheck className="w-5 h-5 text-indigo-700" />,
      destination: '/university/mentors',
      badgeColor: 'bg-indigo-50 text-indigo-900 border-indigo-200',
    },
    {
      role: 'industry',
      title: 'Industry & Corporate CSR',
      description: 'Pledge Section 135 CSR grants, specialized equipment labs, and technical mentorship.',
      persona: 'Er. Rajesh Sharma',
      institution: 'Tata Steel CSR Foundation, Jamshedpur',
      icon: <Building className="w-5 h-5 text-emerald-600" />,
      destination: '/industry',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      role: 'ngo',
      title: 'NGO & Field Implementation Partner',
      description: 'Deploy hardware on ground, conduct Gram Sabha audits, and upload telemetry verification.',
      persona: 'Anita Murmu',
      institution: 'Pratham Gramin Vikas Trust, Dumka Unit',
      icon: <HeartHandshake className="w-5 h-5 text-purple-600" />,
      destination: '/ngo',
      badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
    },
  ];

  const handleLoginSubmit = (roleKey: UserRole, destination: string) => {
    login(roleKey);
    onClose();
    navigate(destination);
  };

  const currentOption = roleOptions.find(o => o.role === selectedRole) || roleOptions[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-brand-border shadow-modal max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-6 bg-brand-dark text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-sidebarActive border border-brand-mint/40 flex items-center justify-center text-brand-mint">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-brand-mint uppercase tracking-widest">
                SamadhanSetu Single Sign-On
              </div>
              <h3 className="text-xl font-extrabold text-white mt-0.5">
                Select Your Stakeholder Portal
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-brand-sidebarActive transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          <p className="text-brand-textMuted">
            Select your role to access your personalized workspace. Each portal is customized with role-specific permissions, analytics, and operational workflows.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {roleOptions.map((opt) => {
              const isSelected = selectedRole === opt.role;
              return (
                <div
                  key={opt.role}
                  onClick={() => setSelectedRole(opt.role)}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'border-brand-mint bg-brand-mintSoft/30 ring-2 ring-brand-mint shadow-xs'
                      : 'border-brand-border bg-white hover:border-gray-300 hover:bg-gray-50/70'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-lg bg-gray-50 border border-gray-100">
                        {opt.icon}
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${opt.badgeColor}`}>
                        {opt.role.toUpperCase()}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-sm text-brand-text">{opt.title}</h4>
                      <p className="text-brand-textMuted text-[11px] mt-1 leading-relaxed">
                        {opt.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100/80 text-[11px]">
                    <span className="text-gray-400 block text-[10px] uppercase font-semibold">Demo Identity:</span>
                    <strong className="text-brand-text block">{opt.persona}</strong>
                    <span className="text-brand-textMuted text-[10px] truncate block">{opt.institution}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 bg-brand-bg border-t border-brand-border flex items-center justify-between">
          <div className="text-xs text-brand-textMuted flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Signing into: <strong className="text-brand-dark">{currentOption.title}</strong></span>
          </div>

          <button
            type="button"
            onClick={() => handleLoginSubmit(currentOption.role, currentOption.destination)}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-dark text-brand-mint rounded-xl font-bold text-xs hover:bg-brand-darkSecondary transition shadow-elevated"
          >
            <span>Enter as {currentOption.persona.split(' ')[0]}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

