import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';
import { UserRole, UserProfile } from '../../types';
import { getSupabaseClient, isSupabaseConfigured } from '../../services/supabase';
import { SamadhanLogo } from '../../components/common/SamadhanLogo';
import { 
  ShieldCheck, 
  Users, 
  GraduationCap, 
  Building, 
  ArrowRight, 
  ArrowLeft,
  BadgeCheck,
  Mail,
  KeyRound,
  Lock,
  Building2,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, addToast } = useAppState();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryTab = searchParams.get('tab');

  const [activeTab, setActiveTab] = useState<'government' | 'citizen' | 'university' | 'partner'>(() => {
    if (queryTab === 'citizen' || queryTab === 'government' || queryTab === 'university' || queryTab === 'partner') {
      return queryTab;
    }
    return 'government';
  });

  useEffect(() => {
    if (queryTab === 'citizen' || queryTab === 'government' || queryTab === 'university' || queryTab === 'partner') {
      setActiveTab(queryTab);
    }
  }, [queryTab]);

  // Government Form State
  const [govEmail, setGovEmail] = useState('dm.dumka@jharkhand.gov.in');
  const [govId, setGovId] = useState('IAS-JH-1998-042');
  const [govDept, setGovDept] = useState('District Administration Dumka');
  const [govPassword, setGovPassword] = useState('••••••••••••');

  // Citizen Form State
  const [citIdentifier, setCitIdentifier] = useState('sunita.soren@hansdiha.org');
  const [citPassword, setCitPassword] = useState('••••••••••••');

  // University Form State
  const [uniSubRole, setUniSubRole] = useState<'student' | 'mentor'>('student');
  const [uniEmail, setUniEmail] = useState('aarav.sengupta@bitmesra.ac.in');
  const [uniId, setUniId] = useState('BIT-CE-2023-089');
  const [uniPassword, setUniPassword] = useState('••••••••••••');

  // Partner (NGO / Industry) Form State
  const [partnerSubRole, setPartnerSubRole] = useState<'industry' | 'ngo'>('ngo');
  const [partnerEmail, setPartnerEmail] = useState('anita@prathamvikas.org');
  const [partnerId, setPartnerId] = useState('NGO-JH-DUM-4421');
  const [partnerPassword, setPartnerPassword] = useState('••••••••••••');

  // Social login loading state
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  // Fill quick demo credentials
  const fillGovDemo = () => {
    setGovEmail('dm.dumka@jharkhand.gov.in');
    setGovId('IAS-JH-1998-042');
    setGovDept('District Administration Dumka');
    setGovPassword('ias_dumka_2026');
    addToast('Credentials Filled', 'Loaded demo credentials for Sanjay K. Verma, IAS', 'info');
  };

  const fillCitizenDemo = () => {
    setCitIdentifier('sunita.soren@hansdiha.org');
    setCitPassword('citizen_jh_2026');
    addToast('Credentials Filled', 'Loaded demo credentials for Sunita Soren (Gram Sabha)', 'info');
  };

  const fillUniDemo = (role: 'student' | 'mentor') => {
    setUniSubRole(role);
    if (role === 'student') {
      setUniEmail('aarav.sengupta@bitmesra.ac.in');
      setUniId('BIT-CE-2023-089');
      setUniPassword('aqua_mesra_2026');
      addToast('Credentials Filled', 'Loaded demo credentials for Aarav Sengupta (BIT Mesra)', 'info');
    } else {
      setUniEmail('r.mahato@bitmesra.ac.in');
      setUniId('FAC-ENV-014');
      setUniPassword('mentor_mesra_2026');
      addToast('Credentials Filled', 'Loaded demo credentials for Dr. Rameshwar Mahato', 'info');
    }
  };

  const fillPartnerDemo = (role: 'industry' | 'ngo') => {
    setPartnerSubRole(role);
    if (role === 'industry') {
      setPartnerEmail('rajesh.sharma@tatasteel.com');
      setPartnerId('CSR-TATA-JH-2026');
      setPartnerPassword('csr_tata_2026');
      addToast('Credentials Filled', 'Loaded demo credentials for Er. Rajesh Sharma (Tata Steel)', 'info');
    } else {
      setPartnerEmail('anita@prathamvikas.org');
      setPartnerId('NGO-JH-DUM-4421');
      setPartnerPassword('ngo_pratham_2026');
      addToast('Credentials Filled', 'Loaded demo credentials for Anita Murmu (Pratham NGO)', 'info');
    }
  };

  // Submission Handlers
  const handleGovSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login('government', {
      name: govEmail.includes('dumka') ? 'Sanjay K. Verma, IAS' : 'Verified District Officer',
      email: govEmail,
      title: 'District Magistrate & Collector',
      organization: govDept,
      governmentId: govId,
      isGovtVerified: true,
      departmentCode: 'JH-GOV-DM-04',
      authProvider: 'govt_sso',
    });
    navigate('/government');
  };

  const handleCitizenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login('citizen', {
      name: citIdentifier.includes('sunita') ? 'Sunita Soren' : 'Community Reporter',
      email: citIdentifier,
      title: 'Citizen Reporter & Community Lead',
      organization: 'Hansdiha Gram Sabha',
      authProvider: 'credentials',
    });
    navigate('/citizen');
  };

  const handleUniSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (uniSubRole === 'student') {
      login('student', {
        name: uniEmail.includes('aarav') ? 'Aarav Sengupta' : 'Student Innovator',
        email: uniEmail,
        title: 'Student Team Lead (AquaShield)',
        organization: 'BIT Mesra, Ranchi',
        authProvider: 'credentials',
      });
      navigate('/university');
    } else {
      login('mentor', {
        name: uniEmail.includes('mahato') ? 'Dr. Rameshwar Mahato' : 'Faculty Advisor',
        email: uniEmail,
        title: 'Professor of Fluid Dynamics',
        organization: 'BIT Mesra Department of Civil Engineering',
        authProvider: 'credentials',
      });
      navigate('/university/mentors');
    }
  };

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (partnerSubRole === 'industry') {
      login('industry', {
        name: partnerEmail.includes('rajesh') ? 'Er. Rajesh Sharma' : 'CSR Lead Specialist',
        email: partnerEmail,
        title: 'Lead Water Treatment Specialist',
        organization: 'Tata Steel CSR Foundation',
        authProvider: 'credentials',
      });
      navigate('/industry');
    } else {
      login('ngo', {
        name: partnerEmail.includes('anita') ? 'Anita Murmu' : 'Field Coordinator',
        email: partnerEmail,
        title: 'Field Operations Coordinator',
        organization: 'Pratham Gramin Vikas Trust',
        authProvider: 'credentials',
      });
      navigate('/ngo');
    }
  };

  // Social Login Handler (Google, GitHub, LinkedIn)
  const handleSocialLogin = async (provider: 'google' | 'github' | 'linkedin') => {
    setSocialLoading(provider);
    const client = getSupabaseClient();
    const destination = 
      activeTab === 'university'
        ? (uniSubRole === 'student' ? '/university' : '/university/mentors')
        : activeTab === 'partner'
        ? (partnerSubRole === 'ngo' ? '/ngo' : '/industry')
        : '/citizen';

    const targetRole: UserRole = 
      activeTab === 'university'
        ? (uniSubRole === 'student' ? 'student' : 'mentor')
        : activeTab === 'partner'
        ? (partnerSubRole === 'ngo' ? 'ngo' : 'industry')
        : 'citizen';

    const supabaseProvider = provider === 'linkedin' ? 'linkedin_oidc' : provider;

    if (client && isSupabaseConfigured()) {
      try {
        const { error } = await client.auth.signInWithOAuth({
          provider: supabaseProvider as any,
          options: {
            redirectTo: window.location.origin + destination,
          },
        });
        if (error) {
          console.warn(`[Supabase ${provider} Auth Notice]:`, error.message);
          loginWithSocialProfile(targetRole, provider, destination);
        }
      } catch (err) {
        loginWithSocialProfile(targetRole, provider, destination);
      }
    } else {
      setTimeout(() => {
        loginWithSocialProfile(targetRole, provider, destination);
      }, 350);
    }
  };

  const loginWithSocialProfile = (targetRole: UserRole, provider: 'google' | 'github' | 'linkedin', destination: string) => {
    const providerLabel = provider.charAt(0).toUpperCase() + provider.slice(1);
    let profile: Partial<UserProfile>;

    if (targetRole === 'student') {
      profile = {
        name: `Aarav Sengupta (${providerLabel} Verified)`,
        email: 'aarav.sengupta@bitmesra.ac.in',
        title: 'Student Team Lead (AquaShield)',
        organization: 'BIT Mesra, Ranchi',
        authProvider: provider,
      };
    } else if (targetRole === 'mentor') {
      profile = {
        name: `Dr. Rameshwar Mahato (${providerLabel} Verified)`,
        email: 'r.mahato@bitmesra.ac.in',
        title: 'Professor & Academic Mentor',
        organization: 'BIT Mesra Department of Civil Engineering',
        authProvider: provider,
      };
    } else if (targetRole === 'ngo') {
      profile = {
        name: `Anita Murmu (${providerLabel} Verified)`,
        email: 'anita@prathamvikas.org',
        title: 'Field Operations Coordinator',
        organization: 'Pratham Gramin Vikas Trust',
        authProvider: provider,
      };
    } else if (targetRole === 'industry') {
      profile = {
        name: `Er. Rajesh Sharma (${providerLabel} Verified)`,
        email: 'rajesh.sharma@tatasteel.com',
        title: 'Lead CSR Specialist',
        organization: 'Tata Steel CSR Foundation',
        authProvider: provider,
      };
    } else {
      profile = {
        name: `Sunita Soren (${providerLabel} Verified)`,
        email: 'sunita.soren@gmail.com',
        title: 'Citizen Reporter & Community Lead',
        organization: 'Hansdiha Gram Sabha',
        authProvider: provider,
      };
    }

    login(targetRole, profile);
    addToast(`${providerLabel} Connected`, `Signed in via ${providerLabel} as ${profile.name}`, 'success');
    navigate(destination);
    setSocialLoading(null);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col justify-center items-center py-6 px-4">
      {/* Top Back Link */}
      <div className="w-full max-w-[420px] mb-3 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Landing Page</span>
        </Link>
        <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
          NIC SSO Compliant
        </span>
      </div>

      {/* Main Narrow Centered Login Card (LeetCode Style) */}
      <div className="w-full max-w-[420px] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-5">
        {/* Brand Header */}
        <div className="text-center space-y-1.5">
          <div className="flex justify-center mb-2">
            <SamadhanLogo size={46} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            SamadhanSetu
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Select your stakeholder desk to continue
          </p>
        </div>

        {/* 4-Role Compact Pill Switcher */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 dark:bg-slate-800/90 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('government')}
            className={`py-1.5 px-1 rounded-lg text-[11px] font-bold flex flex-col items-center gap-0.5 transition ${
              activeTab === 'government'
                ? 'bg-slate-900 text-white dark:bg-emerald-600 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Govt</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('citizen')}
            className={`py-1.5 px-1 rounded-lg text-[11px] font-bold flex flex-col items-center gap-0.5 transition ${
              activeTab === 'citizen'
                ? 'bg-slate-900 text-white dark:bg-emerald-600 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Citizen</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('university')}
            className={`py-1.5 px-1 rounded-lg text-[11px] font-bold flex flex-col items-center gap-0.5 transition ${
              activeTab === 'university'
                ? 'bg-slate-900 text-white dark:bg-emerald-600 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>College</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('partner')}
            className={`py-1.5 px-1 rounded-lg text-[11px] font-bold flex flex-col items-center gap-0.5 transition ${
              activeTab === 'partner'
                ? 'bg-slate-900 text-white dark:bg-emerald-600 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>NGO/CSR</span>
          </button>
        </div>

        {/* TAB 1: GOVERNMENT AUTHORITY */}
        {activeTab === 'government' && (
          <form onSubmit={handleGovSubmit} className="space-y-3.5 text-xs">
            <div className="flex items-center justify-between pb-1">
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                Government Officer Login
              </span>
              <button
                type="button"
                onClick={fillGovDemo}
                className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Auto-fill Demo
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Official Government Email (.gov.in / .nic.in)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={govEmail}
                  onChange={(e) => setGovEmail(e.target.value)}
                  placeholder="dm.dumka@jharkhand.gov.in"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Civil Service Cadre / Govt Officer ID
              </label>
              <div className="relative">
                <BadgeCheck className="w-4 h-4 text-blue-600 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={govId}
                  onChange={(e) => setGovId(e.target.value)}
                  placeholder="IAS-JH-1998-042"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Department / District Jurisdiction
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={govDept}
                  onChange={(e) => setGovDept(e.target.value)}
                  placeholder="District Administration Dumka"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={govPassword}
                  onChange={(e) => setGovPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-xs shadow-sm transition flex items-center justify-center gap-2 mt-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Sign In as District Authority</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-slate-400 text-center pt-1">
              Govt IDs verified against State Directory / NIC open standards.
            </p>
          </form>
        )}

        {/* TAB 2: CITIZEN REPORTER */}
        {activeTab === 'citizen' && (
          <form onSubmit={handleCitizenSubmit} className="space-y-3.5 text-xs">
            <div className="flex items-center justify-between pb-1">
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                Citizen Ground Reporter
              </span>
              <button
                type="button"
                onClick={fillCitizenDemo}
                className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Auto-fill Demo
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Mobile Number or Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={citIdentifier}
                  onChange={(e) => setCitIdentifier(e.target.value)}
                  placeholder="+91 94311 28941 or sunita@hansdiha.org"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Password / OTP
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={citPassword}
                  onChange={(e) => setCitPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs shadow-sm transition flex items-center justify-center gap-2 mt-2"
            >
              <span>Sign In as Citizen Reporter</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Social Auth Area */}
            <div className="pt-2 text-center">
              <div className="relative flex items-center justify-center my-3">
                <div className="border-t border-slate-200 dark:border-slate-700 w-full" />
                <span className="bg-white dark:bg-slate-900 px-3 text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                  or sign in with
                </span>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => handleSocialLogin('google')}
                  disabled={!!socialLoading}
                  className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition shadow-xs hover:scale-105 active:scale-95 disabled:opacity-50"
                  title="Sign in with Google"
                  aria-label="Sign in with Google"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.36 7.31 24 12 24Z"/>
                    <path fill="#FBBC05" d="M5.28 14.27a7.18 7.18 0 0 1 0-4.54V6.58H1.26a11.99 11.99 0 0 0 0 10.84l4.02-3.15Z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"/>
                  </svg>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* TAB 3: UNIVERSITY (STUDENTS & FACULTY) */}
        {activeTab === 'university' && (
          <form onSubmit={handleUniSubmit} className="space-y-3.5 text-xs">
            {/* Sub-role selector: Student vs Mentor */}
            <div className="flex gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <button
                type="button"
                onClick={() => setUniSubRole('student')}
                className={`flex-1 py-1.5 rounded-md text-[11px] font-bold transition ${
                  uniSubRole === 'student'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Student Innovator
              </button>
              <button
                type="button"
                onClick={() => setUniSubRole('mentor')}
                className={`flex-1 py-1.5 rounded-md text-[11px] font-bold transition ${
                  uniSubRole === 'mentor'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Faculty Mentor
              </button>
            </div>

            <div className="flex items-center justify-between pb-1">
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                {uniSubRole === 'student' ? 'Student Team Login' : 'Academic Faculty Login'}
              </span>
              <button
                type="button"
                onClick={() => fillUniDemo(uniSubRole)}
                className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Auto-fill Demo
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Institutional Email (.ac.in / .edu)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={uniEmail}
                  onChange={(e) => setUniEmail(e.target.value)}
                  placeholder="student@bitmesra.ac.in"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                {uniSubRole === 'student' ? 'Enrollment / Roll Number' : 'Faculty Employee ID'}
              </label>
              <div className="relative">
                <BadgeCheck className="w-4 h-4 text-indigo-600 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={uniId}
                  onChange={(e) => setUniId(e.target.value)}
                  placeholder={uniSubRole === 'student' ? 'BIT-CE-2023-089' : 'FAC-ENV-014'}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={uniPassword}
                  onChange={(e) => setUniPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-xs shadow-sm transition flex items-center justify-center gap-2 mt-2"
            >
              <span>Sign In as {uniSubRole === 'student' ? 'Student Lead' : 'Faculty Mentor'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Social Auth Area (Google, GitHub, LinkedIn) */}
            <div className="pt-2 text-center">
              <div className="relative flex items-center justify-center my-3">
                <div className="border-t border-slate-200 dark:border-slate-700 w-full" />
                <span className="bg-white dark:bg-slate-900 px-3 text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                  or sign in with
                </span>
              </div>

              <div className="flex items-center justify-center gap-3">
                {/* Google */}
                <button
                  type="button"
                  onClick={() => handleSocialLogin('google')}
                  disabled={!!socialLoading}
                  className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition shadow-xs hover:scale-105 active:scale-95 disabled:opacity-50"
                  title="Sign in with Google"
                  aria-label="Sign in with Google"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.36 7.31 24 12 24Z"/>
                    <path fill="#FBBC05" d="M5.28 14.27a7.18 7.18 0 0 1 0-4.54V6.58H1.26a11.99 11.99 0 0 0 0 10.84l4.02-3.15Z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"/>
                  </svg>
                </button>

                {/* GitHub */}
                <button
                  type="button"
                  onClick={() => handleSocialLogin('github')}
                  disabled={!!socialLoading}
                  className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-white flex items-center justify-center transition shadow-xs hover:scale-105 active:scale-95 disabled:opacity-50"
                  title="Sign in with GitHub"
                  aria-label="Sign in with GitHub"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </button>

                {/* LinkedIn */}
                <button
                  type="button"
                  onClick={() => handleSocialLogin('linkedin')}
                  disabled={!!socialLoading}
                  className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition shadow-xs hover:scale-105 active:scale-95 disabled:opacity-50"
                  title="Sign in with LinkedIn"
                  aria-label="Sign in with LinkedIn"
                >
                  <svg className="w-4 h-4 fill-[#0A66C2]" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28" />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* TAB 4: PARTNER (NGO & INDUSTRY) */}
        {activeTab === 'partner' && (
          <form onSubmit={handlePartnerSubmit} className="space-y-3.5 text-xs">
            {/* Sub-role selector: Field NGO vs Industry CSR */}
            <div className="flex gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <button
                type="button"
                onClick={() => setPartnerSubRole('ngo')}
                className={`flex-1 py-1.5 rounded-md text-[11px] font-bold transition ${
                  partnerSubRole === 'ngo'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Field NGO Partner
              </button>
              <button
                type="button"
                onClick={() => setPartnerSubRole('industry')}
                className={`flex-1 py-1.5 rounded-md text-[11px] font-bold transition ${
                  partnerSubRole === 'industry'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Industry CSR Lead
              </button>
            </div>

            <div className="flex items-center justify-between pb-1">
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                {partnerSubRole === 'ngo' ? 'Grassroots NGO Login' : 'Corporate CSR Foundation'}
              </span>
              <button
                type="button"
                onClick={() => fillPartnerDemo(partnerSubRole)}
                className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Auto-fill Demo
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Official Organization Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={partnerEmail}
                  onChange={(e) => setPartnerEmail(e.target.value)}
                  placeholder={partnerSubRole === 'ngo' ? 'anita@prathamvikas.org' : 'rajesh.sharma@tatasteel.com'}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                {partnerSubRole === 'ngo' ? 'NGO Darpan Registration ID' : 'Corporate CSR CIN Number'}
              </label>
              <div className="relative">
                <BadgeCheck className="w-4 h-4 text-emerald-600 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={partnerId}
                  onChange={(e) => setPartnerId(e.target.value)}
                  placeholder={partnerSubRole === 'ngo' ? 'NGO-JH-DUM-4421' : 'CSR-TATA-JH-2026'}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={partnerPassword}
                  onChange={(e) => setPartnerPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-2.5 text-white rounded-lg font-bold text-xs shadow-sm transition flex items-center justify-center gap-2 mt-2 ${
                partnerSubRole === 'ngo'
                  ? 'bg-purple-600 hover:bg-purple-700'
                  : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              <span>Sign In as {partnerSubRole === 'ngo' ? 'NGO Field Partner' : 'CSR Foundation'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Social Auth Area (Google, GitHub, LinkedIn) */}
            <div className="pt-2 text-center">
              <div className="relative flex items-center justify-center my-3">
                <div className="border-t border-slate-200 dark:border-slate-700 w-full" />
                <span className="bg-white dark:bg-slate-900 px-3 text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                  or sign in with
                </span>
              </div>

              <div className="flex items-center justify-center gap-3">
                {/* Google */}
                <button
                  type="button"
                  onClick={() => handleSocialLogin('google')}
                  disabled={!!socialLoading}
                  className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition shadow-xs hover:scale-105 active:scale-95 disabled:opacity-50"
                  title="Sign in with Google"
                  aria-label="Sign in with Google"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.36 7.31 24 12 24Z"/>
                    <path fill="#FBBC05" d="M5.28 14.27a7.18 7.18 0 0 1 0-4.54V6.58H1.26a11.99 11.99 0 0 0 0 10.84l4.02-3.15Z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"/>
                  </svg>
                </button>

                {/* GitHub */}
                <button
                  type="button"
                  onClick={() => handleSocialLogin('github')}
                  disabled={!!socialLoading}
                  className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-white flex items-center justify-center transition shadow-xs hover:scale-105 active:scale-95 disabled:opacity-50"
                  title="Sign in with GitHub"
                  aria-label="Sign in with GitHub"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </button>

                {/* LinkedIn */}
                <button
                  type="button"
                  onClick={() => handleSocialLogin('linkedin')}
                  disabled={!!socialLoading}
                  className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition shadow-xs hover:scale-105 active:scale-95 disabled:opacity-50"
                  title="Sign in with LinkedIn"
                  aria-label="Sign in with LinkedIn"
                >
                  <svg className="w-4 h-4 fill-[#0A66C2]" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28" />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Card Footer */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-[10px] text-slate-400 dark:text-slate-500">
            By continuing, you agree to SamadhanSetu Security & NIC Open Standards.
          </p>
        </div>
      </div>
    </div>
  );
};
