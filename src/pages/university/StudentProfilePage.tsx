import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Code,
  User,
  Mail,
  Phone,
  Lock,
  ChevronRight,
  Check,
  Bell,
  Sparkles,
  Plus,
  X,
  Edit3,
  Save,
  MessageSquare,
  Briefcase
} from 'lucide-react';

export const StudentProfilePage: React.FC = () => {
  const { currentUser, credentials, updateProfile, addToast } = useAppState();
  const navigate = useNavigate();

  // Profile data from currentUser or defaults matching user's reference mockup
  const initialName = currentUser?.name || 'Harshit Gadre';
  const initialEmail = currentUser?.email || 'harshitgadre786@gmail.com';
  const initialPhone = currentUser?.phone || '+91 98765 43210';
  const initialLocation = currentUser?.location || 'Ranchi, Jharkhand';
  const initialOrg = currentUser?.organization || 'BIT Sindri';
  const initialSkills = currentUser?.skills && currentUser.skills.length > 0 
    ? currentUser.skills 
    : ['Python', 'IoT', 'C++', 'React', 'GIS', 'Water Chemistry', 'Solar Filtration'];

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState(initialPhone);
  const [location, setLocation] = useState(initialLocation);
  const [skills, setSkills] = useState<string[]>(initialSkills);
  const [newSkill, setNewSkill] = useState('');

  // Modals for settings items
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Notification toggles
  const [notifPreferences, setNotifPreferences] = useState({
    email: true,
    challenges: true,
    team: true,
    system: true,
  });

  const handleSaveProfile = () => {
    updateProfile({
      name,
      email,
      phone,
      location,
      skills,
    });
    setIsEditing(false);
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newSkill.trim();
    if (trimmed && !skills.some(s => s.toLowerCase() === trimmed.toLowerCase())) {
      const updated = [...skills, trimmed];
      setSkills(updated);
      setNewSkill('');
      updateProfile({ skills: updated });
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updated = skills.filter(s => s !== skillToRemove);
    setSkills(updated);
    updateProfile({ skills: updated });
  };

  const togglePreference = (key: keyof typeof notifPreferences) => {
    setNotifPreferences(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      addToast('Preferences Updated', `${key.charAt(0).toUpperCase() + key.slice(1)} notification settings updated.`, 'info');
      return updated;
    });
  };

  const notificationsFeed = [
    {
      id: 1,
      title: 'Your team has been approved',
      highlight: 'Green Innovators',
      time: '2 hours ago',
      type: 'team'
    },
    {
      id: 2,
      title: 'New comment on your challenge',
      highlight: 'Water shortage in rural areas',
      time: '5 hours ago',
      type: 'comment'
    },
    {
      id: 3,
      title: 'TCS is interested in your solution',
      highlight: 'Smart Irrigation System',
      time: '1 day ago',
      type: 'sponsor'
    },
    {
      id: 4,
      title: 'Your solution has been deployed',
      highlight: 'Waste Segregation App',
      time: '2 days ago',
      type: 'deploy'
    },
    {
      id: 5,
      title: 'Reminder: Team meeting',
      highlight: 'Green Innovators',
      time: '3 days ago',
      type: 'reminder'
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Top Header / Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Link to="/university" className="hover:text-emerald-600 transition">Academic Portal</Link>
            <span>/</span>
            <span className="font-semibold text-slate-900 dark:text-white">User Profile & Settings</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Student Innovator Profile
          </h1>
        </div>

        {/* Action button to explore matching challenges */}
        <Link
          to="/university/challenges?sortBy=skillMatch"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition hover:scale-[1.02] active:scale-[0.98] shrink-0"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Find Challenges Matching My Skills</span>
        </Link>
      </div>

      {/* Main 2-Column Grid matching user's design reference */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* LEFT COLUMN (2/3 width): User Profile + Settings & Preferences */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. USER PROFILE CARD */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs space-y-5">
            {/* Header with Edit Button */}
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-extrabold tracking-wider text-slate-900 dark:text-white uppercase">
                User Profile
              </h2>
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveProfile}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save</span>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1 transition"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>

            {/* Avatar & Main Identity */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-slate-900 dark:bg-emerald-950 text-emerald-400 border-2 border-emerald-500/40 flex items-center justify-center font-extrabold text-xl shadow-xs shrink-0">
                {name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>

              <div className="space-y-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-lg font-bold text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 bg-slate-50 dark:bg-slate-800 w-full"
                    placeholder="Full Name"
                  />
                ) : (
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white leading-tight">
                    {name}
                  </h3>
                )}
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <span className="uppercase font-semibold text-emerald-700 dark:text-emerald-400">STUDENT</span>
                  <span>•</span>
                  <span>{initialOrg}</span>
                </div>
              </div>
            </div>

            {/* Profile Info Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium block mb-0.5">
                  Email
                </span>
                {isEditing ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full font-semibold text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 bg-slate-50 dark:bg-slate-800"
                  />
                ) : (
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{email}</span>
                )}
              </div>

              <div>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium block mb-0.5">
                  Phone
                </span>
                {isEditing ? (
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full font-semibold text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 bg-slate-50 dark:bg-slate-800"
                  />
                ) : (
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{phone}</span>
                )}
              </div>

              <div>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium block mb-0.5">
                  Location
                </span>
                {isEditing ? (
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full font-semibold text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 bg-slate-50 dark:bg-slate-800"
                  />
                ) : (
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{location}</span>
                )}
              </div>

              <div>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium block mb-0.5">
                  Role Affiliation
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold text-[11px] border border-emerald-200 dark:border-emerald-800">
                  STUDENT
                </span>
              </div>
            </div>

            {/* Expertise Skills Section */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Expertise Skills
                </h4>
                <Link
                  to="/university/challenges?sortBy=skillMatch"
                  className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Match Challenges</span>
                </Link>
              </div>

              {/* Skills pills */}
              <div className="flex flex-wrap gap-2 items-center">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition hover:bg-slate-200 dark:hover:bg-slate-700"
                  >
                    <span>{s}</span>
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(s)}
                        className="text-slate-400 hover:text-red-500 transition"
                        title={`Remove ${s}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </span>
                ))}
              </div>

              {/* Add Skill Form in Edit Mode */}
              {isEditing && (
                <form onSubmit={handleAddSkill} className="flex items-center gap-2 pt-1 max-w-sm">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add technical skill (e.g. GIS, Python)..."
                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* 2. SETTINGS & PREFERENCES CARD */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs space-y-5">
            <h2 className="text-xs font-extrabold tracking-wider text-slate-900 dark:text-white uppercase">
              Settings & Preferences
            </h2>

            {/* Profile Information Row */}
            <button
              type="button"
              onClick={() => setShowInfoModal(true)}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-slate-100 dark:border-slate-800/80 transition text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                    Profile Information
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Update basic information and verified email
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition" />
            </button>

            {/* Change Password Row */}
            <button
              type="button"
              onClick={() => setShowPasswordModal(true)}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-slate-100 dark:border-slate-800/80 transition text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                    Change Password
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Secure your account credentials
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition" />
            </button>

            {/* Notification Preferences Sub-section */}
            <div className="pt-2 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                Notification Preferences
              </h4>

              <div className="space-y-2.5 text-xs">
                {/* Email Notifications */}
                <div
                  onClick={() => togglePreference('email')}
                  className="flex items-center justify-between py-1.5 cursor-pointer select-none group"
                >
                  <span className="text-slate-700 dark:text-slate-300 font-medium">Email Notifications</span>
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                    notifPreferences.email 
                      ? 'bg-emerald-600 border-emerald-600 text-white' 
                      : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                  }`}>
                    {notifPreferences.email && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>

                {/* Challenge Updates */}
                <div
                  onClick={() => togglePreference('challenges')}
                  className="flex items-center justify-between py-1.5 cursor-pointer select-none group"
                >
                  <span className="text-slate-700 dark:text-slate-300 font-medium">Challenge Updates</span>
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                    notifPreferences.challenges 
                      ? 'bg-emerald-600 border-emerald-600 text-white' 
                      : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                  }`}>
                    {notifPreferences.challenges && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>

                {/* Team Messages */}
                <div
                  onClick={() => togglePreference('team')}
                  className="flex items-center justify-between py-1.5 cursor-pointer select-none group"
                >
                  <span className="text-slate-700 dark:text-slate-300 font-medium">Team Messages</span>
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                    notifPreferences.team 
                      ? 'bg-emerald-600 border-emerald-600 text-white' 
                      : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                  }`}>
                    {notifPreferences.team && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>

                {/* System Notifications */}
                <div
                  onClick={() => togglePreference('system')}
                  className="flex items-center justify-between py-1.5 cursor-pointer select-none group"
                >
                  <span className="text-slate-700 dark:text-slate-300 font-medium">System Notifications</span>
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                    notifPreferences.system 
                      ? 'bg-emerald-600 border-emerald-600 text-white' 
                      : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                  }`}>
                    {notifPreferences.system && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (1/3 width): NOTIFICATIONS FEED */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h2 className="text-xs font-extrabold tracking-wider text-slate-900 dark:text-white uppercase flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-emerald-600" />
                <span>Notifications</span>
              </h2>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer">
                Feed
              </span>
            </div>

            {/* Notification items matching reference image */}
            <div className="space-y-3">
              {notificationsFeed.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100/70 dark:hover:bg-slate-800 transition space-y-1"
                >
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                    {item.highlight}
                  </p>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 block pt-0.5">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom official banner */}
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-center">
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-snug">
                All societal alerts routed through GoJ dispatch hub.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Verified Academic & Impact Metrics Section */}
      <div className="pt-4 space-y-4">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
          Verified Academic & Societal Impact
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-center">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-[10px] text-slate-400 font-bold uppercase block font-sans">Projects Solved</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white mt-1 block">4</span>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-[10px] text-slate-400 font-bold uppercase block font-sans">Gov Approved</span>
            <span className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1 block">3</span>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-[10px] text-slate-400 font-bold uppercase block font-sans">Pilots Done</span>
            <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1 block">2</span>
          </div>
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 shadow-xs">
            <span className="text-[10px] text-emerald-800 dark:text-emerald-400 font-bold uppercase block font-sans">People Impacted</span>
            <span className="text-2xl font-black text-emerald-900 dark:text-emerald-200 mt-1 block">4,280</span>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-[10px] text-slate-400 font-bold uppercase block font-sans">CSR Mentors</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white mt-1 block">2</span>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-[10px] text-slate-400 font-bold uppercase block font-sans">NGO Partners</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white mt-1 block">1</span>
          </div>
        </div>
      </div>

      {/* Issued Impact Credentials */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Public Verifiable Credentials</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Cryptographic certificates authenticated by state administration</p>
          </div>
          <span className="text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded">
            {credentials.length} Credentials
          </span>
        </div>

        <div className="space-y-3">
          {credentials.map((cred) => (
            <div
              key={cred.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                    #{cred.id}
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full text-[10px]">
                    <CheckCircle2 className="w-3 h-3" /> Impact Verified
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{cred.title}</h4>
                <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                  Beneficiaries: <strong>{cred.impactPopulation.toLocaleString()} citizens</strong> • Issued by {cred.verifiedByOfficer}
                </p>
              </div>

              <Link
                to={`/verify/${cred.id}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg transition shadow-xs self-start sm:self-center shrink-0"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>Verify Credential</span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Info Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Profile Information</h3>
              <button
                type="button"
                onClick={() => setShowInfoModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowInfoModal(false)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  handleSaveProfile();
                  setShowInfoModal(false);
                }}
                className="px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Change Account Password</h3>
              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new secure password"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (newPassword && newPassword === confirmPassword) {
                    addToast('Password Updated', 'Your account credentials have been securely updated.', 'success');
                    setShowPasswordModal(false);
                    setNewPassword('');
                    setConfirmPassword('');
                  } else {
                    addToast('Password Error', 'Passwords must match and cannot be blank.', 'warning');
                  }
                }}
                className="px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default StudentProfilePage;
