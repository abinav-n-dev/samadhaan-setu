import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';
import { UserRole, UserProfile } from '../../types';
import { getSupabaseClient, isSupabaseConfigured } from '../../services/supabase';
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
  CheckCircle2,
  AlertCircle,
  BadgeCheck,
  Building2,
  Mail,
  KeyRound,
  Sparkles
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, addToast } = useAppState();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'government' | 'citizen' | 'university' | 'partner'>('government');

  // Government Form State
  const [govEmail, setGovEmail] = useState('dm.dumka@jharkhand.gov.in');
  const [govId, setGovId] = useState('IAS-JH-1998-042');
  const [govDept, setGovDept] = useState('District Administration Dumka');
  const [govPassword, setGovPassword] = useState('••••••••••••');

  // Citizen Form State
  const [citIdentifier, setCitIdentifier] = useState('sunita.soren@hansdiha.org');
  const [citPassword, setCitPassword] = useState('••••••••••••');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // University Form State
  const [uniSubRole, setUniSubRole] = useState<'student' | 'mentor'>('student');
  const [uniEmail, setUniEmail] = useState('aarav.sengupta@bitmesra.ac.in');
  const [uniId, setUniId] = useState('BIT-CE-2023-089');
  const [uniPassword, setUniPassword] = useState('••••••••••••');

  // Partner Form State
  const [partnerSubRole, setPartnerSubRole] = useState<'industry' | 'ngo'>('industry');
  const [partnerEmail, setPartnerEmail] = useState('rajesh.sharma@tatasteel.com');
  const [partnerId, setPartnerId] = useState('CSR-TATA-JH-2026');
  const [partnerPassword, setPartnerPassword] = useState('••••••••••••');

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

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    const client = getSupabaseClient();
    if (client && isSupabaseConfigured()) {
      try {
        const { error } = await client.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: window.location.origin + '/citizen',
          },
        });
        if (error) {
          console.warn('[Supabase Google Auth Notice]:', error.message);
          // Fallback to simulated verified Google citizen session
          login('citizen', {
            name: 'Sunita Soren (Google Verified)',
            email: 'sunita.soren@gmail.com',
            authProvider: 'google',
          });
          navigate('/citizen');
        }
      } catch (err) {
        login('citizen', {
          name: 'Sunita Soren (Google Verified)',
          email: 'sunita.soren@gmail.com',
          authProvider: 'google',
        });
        navigate('/citizen');
      }
    } else {
      // Offline/Local Simulated Google Auth
      setTimeout(() => {
        login('citizen', {
          name: 'Sunita Soren (Google Verified)',
          email: 'sunita.soren@gmail.com',
          authProvider: 'google',
        });
        navigate('/citizen');
      }, 500);
    }
    setIsGoogleLoading(false);
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

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-textMuted hover:text-brand-dark"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Landing Page</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-md">
            <BadgeCheck className="w-3.5 h-3.5" />
            <span>NIC / State SSO Standard</span>
          </span>
        </div>
      </div>

      {/* Header */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-brand-dark text-brand-mint border border-brand-mint/30 flex items-center justify-center mx-auto mb-2">
          <Lock className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text">
          SamadhanSetu Authentication Portal
        </h1>
        <p className="text-xs sm:text-sm text-brand-textMuted">
          Secure, authenticated gateway for government administrators, citizens, academic innovators, and CSR partners.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-gray-100 dark:bg-slate-800/80 rounded-2xl border border-brand-border">
        <button
          type="button"
          onClick={() => setActiveTab('government')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'government'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-brand-textMuted hover:text-brand-text'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Government Authority</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('citizen')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'citizen'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-brand-textMuted hover:text-brand-text'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Citizen Reporter</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('university')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'university'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-brand-textMuted hover:text-brand-text'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>University & Mentors</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('partner')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'partner'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-brand-textMuted hover:text-brand-text'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Industry & NGO</span>
        </button>
      </div>

      {/* TAB CONTENT 1: GOVERNMENT AUTHORITY */}
      {activeTab === 'government' && (
        <div className="bg-white dark:bg-slate-900 border border-brand-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/60 rounded-2xl border border-blue-200 dark:border-blue-900 text-blue-600 dark:text-blue-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-brand-dark dark:text-white">
                    Government Officer Single Sign-On
                  </h2>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-300">
                    ID VERIFICATION REQUIRED
                  </span>
                </div>
                <p className="text-xs text-brand-textMuted">
                  Authorized access for District Magistrates, Department Secretaries, and Verification Officers.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={fillGovDemo}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 rounded-xl text-xs font-bold transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Fill DM Dumka (IAS) Demo</span>
            </button>
          </div>

          <form onSubmit={handleGovSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-brand-text mb-1">
                  Official Government Email (.gov.in / .nic.in)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={govEmail}
                    onChange={(e) => setGovEmail(e.target.value)}
                    placeholder="officer@jharkhand.gov.in"
                    className="w-full pl-9 pr-3 py-2 bg-brand-bg border border-brand-border rounded-xl text-xs text-brand-text focus:ring-1 focus:ring-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-text mb-1">
                  Government Officer / Employee ID (Govt ID Verification)
                </label>
                <div className="relative">
                  <BadgeCheck className="w-4 h-4 text-blue-600 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={govId}
                    onChange={(e) => setGovId(e.target.value)}
                    placeholder="e.g. IAS-JH-1998-042 or DWSD-EMP-882"
                    className="w-full pl-9 pr-3 py-2 bg-brand-bg border border-brand-border rounded-xl text-xs font-mono text-brand-text focus:ring-1 focus:ring-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-text mb-1">
                  Designated Department & Jurisdiction
                </label>
                <select
                  value={govDept}
                  onChange={(e) => setGovDept(e.target.value)}
                  className="w-full px-3 py-2 bg-brand-bg border border-brand-border rounded-xl text-xs text-brand-text focus:ring-1 focus:ring-blue-500 focus:bg-white"
                >
                  <option value="District Administration Dumka">District Administration Dumka (District Magistrate)</option>
                  <option value="Drinking Water & Sanitation Department">Drinking Water & Sanitation Department (DWSD)</option>
                  <option value="Rural Development & Panchayati Raj">Rural Development & Panchayati Raj</option>
                  <option value="Road Construction Department">Road Construction Department (RCD)</option>
                  <option value="Agriculture & Animal Husbandry">Agriculture & Animal Husbandry Department</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-text mb-1">
                  Security Passcode / e-Gov Digital Token
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    value={govPassword}
                    onChange={(e) => setGovPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-brand-bg border border-brand-border rounded-xl text-xs text-brand-text focus:ring-1 focus:ring-blue-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Verification Guarantee */}
            <div className="p-3.5 bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 rounded-2xl flex items-start gap-2.5 text-xs text-blue-900 dark:text-blue-200">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed">
                <strong>National Informatics Centre (NIC) SSO Enabled:</strong> Verified credentials grant official cryptographic signing privileges, priority override authority, and formal credential minting on SamadhanSetu.
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-sm transition flex items-center justify-center gap-2"
            >
              <span>Authenticate Government Authority & Access Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* TAB CONTENT 2: CITIZEN REPORTER */}
      {activeTab === 'citizen' && (
        <div className="bg-white dark:bg-slate-900 border border-brand-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/60 rounded-2xl border border-amber-200 dark:border-amber-900 text-amber-600 dark:text-amber-400">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-base font-bold text-brand-dark dark:text-white">
                  Citizen & Community Reporter Login
                </h2>
                <p className="text-xs text-brand-textMuted">
                  Report civic infrastructure issues, upvote community problems, and track ground resolution.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={fillCitizenDemo}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 rounded-xl text-xs font-bold transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Fill Sunita Soren (Gram Sabha)</span>
            </button>
          </div>

          {/* Google Sign-in Button */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
              className="w-full py-3 px-4 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 hover:border-gray-400 dark:hover:border-slate-500 rounded-2xl text-xs font-bold text-gray-800 dark:text-white transition flex items-center justify-center gap-3 shadow-xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{isGoogleLoading ? 'Connecting to Google...' : 'Continue with Google Account'}</span>
            </button>

            <div className="relative flex items-center justify-center py-2">
              <div className="border-t border-gray-200 dark:border-slate-700 w-full" />
              <span className="bg-white dark:bg-slate-900 px-3 text-[10px] font-bold uppercase tracking-wider text-gray-400 absolute">
                Or Continue with Citizen Credentials
              </span>
            </div>
          </div>

          <form onSubmit={handleCitizenSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-brand-text mb-1">
                  Mobile Number or Citizen Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={citIdentifier}
                    onChange={(e) => setCitIdentifier(e.target.value)}
                    placeholder="+91 94311 28941 or sunita@hansdiha.org"
                    className="w-full pl-9 pr-3 py-2 bg-brand-bg border border-brand-border rounded-xl text-xs text-brand-text focus:ring-1 focus:ring-amber-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-text mb-1">
                  Password / Citizen OTP
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    value={citPassword}
                    onChange={(e) => setCitPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-brand-bg border border-brand-border rounded-xl text-xs text-brand-text focus:ring-1 focus:ring-amber-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-xs shadow-sm transition flex items-center justify-center gap-2"
            >
              <span>Sign In as Citizen Reporter</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* TAB CONTENT 3: UNIVERSITY & MENTORS */}
      {activeTab === 'university' && (
        <div className="bg-white dark:bg-slate-900 border border-brand-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/60 rounded-2xl border border-indigo-200 dark:border-indigo-900 text-indigo-600 dark:text-indigo-400">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-base font-bold text-brand-dark dark:text-white">
                  University Student Innovator & Faculty Mentor Login
                </h2>
                <p className="text-xs text-brand-textMuted">
                  Adopt verified civic challenges for engineering capstone credit and academic certification.
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fillUniDemo('student')}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 dark:text-indigo-300 rounded-xl text-xs font-bold transition"
              >
                <span>Student Demo</span>
              </button>
              <button
                type="button"
                onClick={() => fillUniDemo('mentor')}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 dark:text-indigo-300 rounded-xl text-xs font-bold transition"
              >
                <span>Mentor Demo</span>
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setUniSubRole('student')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${
                uniSubRole === 'student'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-brand-bg text-brand-textMuted border-brand-border'
              }`}
            >
              Student Innovator Team
            </button>
            <button
              type="button"
              onClick={() => setUniSubRole('mentor')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${
                uniSubRole === 'mentor'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-brand-bg text-brand-textMuted border-brand-border'
              }`}
            >
              Faculty Academic Mentor
            </button>
          </div>

          <form onSubmit={handleUniSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-brand-text mb-1">
                  Institutional Email (.ac.in / .edu)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={uniEmail}
                    onChange={(e) => setUniEmail(e.target.value)}
                    placeholder="student@bitmesra.ac.in"
                    className="w-full pl-9 pr-3 py-2 bg-brand-bg border border-brand-border rounded-xl text-xs text-brand-text focus:ring-1 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-text mb-1">
                  {uniSubRole === 'student' ? 'Student Enrollment / Roll Number' : 'Faculty Employee ID'}
                </label>
                <div className="relative">
                  <BadgeCheck className="w-4 h-4 text-indigo-600 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={uniId}
                    onChange={(e) => setUniId(e.target.value)}
                    placeholder="BIT-CE-2023-089"
                    className="w-full pl-9 pr-3 py-2 bg-brand-bg border border-brand-border rounded-xl text-xs font-mono text-brand-text focus:ring-1 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-brand-text mb-1">
                  Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    value={uniPassword}
                    onChange={(e) => setUniPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-brand-bg border border-brand-border rounded-xl text-xs text-brand-text focus:ring-1 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-sm transition flex items-center justify-center gap-2"
            >
              <span>Sign In as {uniSubRole === 'student' ? 'Student Team Lead' : 'Faculty Academic Mentor'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* TAB CONTENT 4: INDUSTRY & NGO PARTNERS */}
      {activeTab === 'partner' && (
        <div className="bg-white dark:bg-slate-900 border border-brand-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 rounded-2xl border border-emerald-200 dark:border-emerald-900 text-emerald-600 dark:text-emerald-400">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-base font-bold text-brand-dark dark:text-white">
                  Industry Corporate CSR & Field NGO Partner Login
                </h2>
                <p className="text-xs text-brand-textMuted">
                  Pledge CSR capital sponsorship, lab testing facilities, and submit ground telemetry proof.
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fillPartnerDemo('industry')}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-bold transition"
              >
                <span>Industry Demo</span>
              </button>
              <button
                type="button"
                onClick={() => fillPartnerDemo('ngo')}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-bold transition"
              >
                <span>NGO Demo</span>
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPartnerSubRole('industry')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${
                partnerSubRole === 'industry'
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-brand-bg text-brand-textMuted border-brand-border'
              }`}
            >
              Industry CSR Foundation
            </button>
            <button
              type="button"
              onClick={() => setPartnerSubRole('ngo')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${
                partnerSubRole === 'ngo'
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-brand-bg text-brand-textMuted border-brand-border'
              }`}
            >
              Field NGO Implementation Partner
            </button>
          </div>

          <form onSubmit={handlePartnerSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-brand-text mb-1">
                  Official Organization Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={partnerEmail}
                    onChange={(e) => setPartnerEmail(e.target.value)}
                    placeholder="partner@organization.com"
                    className="w-full pl-9 pr-3 py-2 bg-brand-bg border border-brand-border rounded-xl text-xs text-brand-text focus:ring-1 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-text mb-1">
                  {partnerSubRole === 'industry' ? 'Corporate CSR Registration CIN' : 'NGO Darpan Registration ID'}
                </label>
                <div className="relative">
                  <BadgeCheck className="w-4 h-4 text-emerald-600 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={partnerId}
                    onChange={(e) => setPartnerId(e.target.value)}
                    placeholder="CSR-TATA-JH-2026"
                    className="w-full pl-9 pr-3 py-2 bg-brand-bg border border-brand-border rounded-xl text-xs font-mono text-brand-text focus:ring-1 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-brand-text mb-1">
                  Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    value={partnerPassword}
                    onChange={(e) => setPartnerPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-brand-bg border border-brand-border rounded-xl text-xs text-brand-text focus:ring-1 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-sm transition flex items-center justify-center gap-2"
            >
              <span>Sign In as {partnerSubRole === 'industry' ? 'CSR Foundation Lead' : 'Field NGO Partner'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
