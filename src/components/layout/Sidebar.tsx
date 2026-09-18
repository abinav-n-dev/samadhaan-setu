import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';
import { 
  Home, 
  Compass, 
  Award, 
  HelpCircle, 
  ShieldCheck, 
  Map, 
  FileText, 
  CheckSquare, 
  BarChart3, 
  Clock, 
  PlusCircle, 
  ListOrdered, 
  GraduationCap, 
  Layers, 
  Briefcase, 
  HeartHandshake, 
  UploadCloud,
  CheckCircle,
  ExternalLink,
  LogIn,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpenMobile = false, onCloseMobile }) => {
  const { role, currentUser, isAuthenticated, logout } = useAppState();

  const getRoleLinks = () => {
    switch (role) {
      case 'government':
        return [
          { to: '/government', label: 'Command Center', icon: <ShieldCheck className="w-4 h-4" /> },
          { to: '/government/verification', label: 'Incoming & Duplicate Queue', icon: <Layers className="w-4 h-4" /> },
          { to: '/government/map', label: 'Live GIS Problem Map', icon: <Map className="w-4 h-4" /> },
          { to: '/government/challenges', label: 'Challenges Registry', icon: <FileText className="w-4 h-4" /> },
          { to: '/government/impact', label: 'Impact Verification Desk', icon: <CheckSquare className="w-4 h-4" /> },
          { to: '/government/analytics', label: 'Geographic Analytics', icon: <BarChart3 className="w-4 h-4" /> },
          { to: '/government/audit', label: 'Transparent Audit Log', icon: <Clock className="w-4 h-4" /> },
        ];
      case 'citizen':
        return [
          { to: '/citizen', label: 'Citizen Dashboard', icon: <Home className="w-4 h-4" /> },
          { to: '/citizen/report', label: 'Report a Problem', icon: <PlusCircle className="w-4 h-4" /> },
          { to: '/citizen/reports', label: 'My Submissions & Tracking', icon: <ListOrdered className="w-4 h-4" /> },
        ];
      case 'student':
        return [
          { to: '/university', label: 'Innovation Dashboard', icon: <GraduationCap className="w-4 h-4" /> },
          { to: '/university/challenges', label: 'Recommended Challenges', icon: <Compass className="w-4 h-4" /> },
          { to: '/university/projects', label: 'Active Projects & Milestones', icon: <CheckCircle className="w-4 h-4" /> },
          { to: '/university/achievements', label: 'Student Impact Profile', icon: <Award className="w-4 h-4" /> },
        ];
      case 'mentor':
        return [
          { to: '/university/mentors', label: 'Proposal Review Desk', icon: <CheckSquare className="w-4 h-4" /> },
          { to: '/university/projects', label: 'Supervised Student Teams', icon: <GraduationCap className="w-4 h-4" /> },
          { to: '/explore', label: 'Browse Challenges', icon: <Compass className="w-4 h-4" /> },
        ];
      case 'industry':
        return [
          { to: '/industry', label: 'CSR Portfolio & Impact', icon: <Briefcase className="w-4 h-4" /> },
          { to: '/industry/projects', label: 'Discover University Projects', icon: <Compass className="w-4 h-4" /> },
          { to: '/solutions', label: 'Proven Implementations', icon: <Award className="w-4 h-4" /> },
        ];
      case 'ngo':
        return [
          { to: '/ngo', label: 'Field Operations Desk', icon: <HeartHandshake className="w-4 h-4" /> },
          { to: '/ngo/evidence', label: 'Submit Field Evidence', icon: <UploadCloud className="w-4 h-4" /> },
          { to: '/government/map', label: 'Ground Incident Map', icon: <Map className="w-4 h-4" /> },
        ];
      default:
        return [];
    }
  };

  const publicLinks = [
    { to: '/', label: 'Overview', icon: <Home className="w-4 h-4" /> },
    { to: '/explore', label: 'Explore Challenges', icon: <Compass className="w-4 h-4" /> },
    { to: '/solutions', label: 'Impact Showcase', icon: <Award className="w-4 h-4" /> },
    { to: '/how-it-works', label: 'How Ecosystem Works', icon: <HelpCircle className="w-4 h-4" /> },
    { to: '/verify/SS-2026-1042', label: 'Verify Credential', icon: <ExternalLink className="w-4 h-4" /> },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-brand-dark text-gray-300 flex flex-col border-r border-brand-sidebarActive transition-transform duration-200 lg:translate-x-0 ${
        isOpenMobile ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Brand Header */}
      <div className="p-5 border-b border-brand-sidebarActive">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-brand-sidebarActive border border-brand-mint/40 flex items-center justify-center text-brand-mint">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 18h16" />
              <path d="M4 18a8 8 0 0 1 16 0" />
              <circle cx="12" cy="10" r="2" fill="#8FF0C8" />
              <path d="M12 10v8" />
            </svg>
          </div>
          <div>
            <div className="font-extrabold text-white text-base tracking-wide font-sans">
              SAMADHAN<span className="text-brand-mint">SETU</span>
            </div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
              Problem to Impact
            </div>
          </div>
        </Link>

        {/* Role context badge */}
        <div className="mt-4 px-3 py-1.5 rounded-lg bg-brand-sidebarActive border border-brand-mint/20 flex items-center justify-between">
          <span className="text-[11px] text-gray-300">
            {isAuthenticated ? 'Active Portal:' : 'Guest Mode:'}
          </span>
          <Link
            to="/login"
            onClick={onCloseMobile}
            className="text-[11px] font-bold text-brand-mint uppercase tracking-wider hover:underline flex items-center gap-1"
            title="Click to switch portal"
          >
            <span>{isAuthenticated ? role : 'Select Role'}</span>
            <span className="text-[10px] text-gray-400 font-normal lowercase">(switch)</span>
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 text-xs">
        {/* If Logged In: Show Role-specific Workspace Tools */}
        {isAuthenticated && currentUser ? (
          <>
            <div>
              <div className="px-3 mb-2 text-[10px] font-bold text-brand-mint uppercase tracking-wider flex items-center justify-between">
                <span>{role} Workspace</span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-mint animate-pulse" />
              </div>
              <nav className="space-y-1">
                {getRoleLinks().map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/government' || link.to === '/citizen' || link.to === '/university' || link.to === '/industry' || link.to === '/ngo'}
                    onClick={onCloseMobile}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition ${
                        isActive
                          ? 'bg-brand-sidebarActive text-brand-mint font-semibold'
                          : 'text-gray-300 hover:text-white hover:bg-brand-sidebarActive/60'
                      }`
                    }
                  >
                    <span className="text-current">{link.icon}</span>
                    <span>{link.label}</span>
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Ecosystem links for logged-in user */}
            <div>
              <div className="px-3 mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Public Discovery
              </div>
              <nav className="space-y-1">
                {publicLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={onCloseMobile}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition ${
                        isActive
                          ? 'bg-brand-sidebarActive text-brand-mint font-semibold'
                          : 'text-gray-400 hover:text-white hover:bg-brand-sidebarActive/40'
                      }`
                    }
                  >
                    <span className="text-current">{link.icon}</span>
                    <span>{link.label}</span>
                  </NavLink>
                ))}
              </nav>
            </div>
          </>
        ) : (
          /* If Logged Out: Show Public Navigation and Stakeholder Portal Selectors */
          <>
            <div>
              <div className="px-3 mb-2 text-[10px] font-bold text-brand-mint uppercase tracking-wider">
                Platform Navigation
              </div>
              <nav className="space-y-1">
                {publicLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={onCloseMobile}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition ${
                        isActive
                          ? 'bg-brand-sidebarActive text-brand-mint font-semibold'
                          : 'text-gray-300 hover:text-white hover:bg-brand-sidebarActive/60'
                      }`
                    }
                  >
                    <span className="text-current">{link.icon}</span>
                    <span>{link.label}</span>
                  </NavLink>
                ))}
              </nav>
            </div>

            <div>
              <div className="px-3 mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
                <span>Stakeholder Portals</span>
                <span className="text-[9px] text-brand-mint font-normal">Sign In</span>
              </div>
              <nav className="space-y-1">
                <Link
                  to="/login"
                  onClick={onCloseMobile}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-brand-sidebarActive/60 font-medium transition"
                >
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span>Government Center</span>
                </Link>
                <Link
                  to="/login"
                  onClick={onCloseMobile}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-brand-sidebarActive/60 font-medium transition"
                >
                  <Home className="w-4 h-4 text-amber-400" />
                  <span>Citizen Portal</span>
                </Link>
                <Link
                  to="/login"
                  onClick={onCloseMobile}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-brand-sidebarActive/60 font-medium transition"
                >
                  <GraduationCap className="w-4 h-4 text-indigo-400" />
                  <span>University & Students</span>
                </Link>
                <Link
                  to="/login"
                  onClick={onCloseMobile}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-brand-sidebarActive/60 font-medium transition"
                >
                  <Briefcase className="w-4 h-4 text-emerald-400" />
                  <span>Industry / CSR Grants</span>
                </Link>
                <Link
                  to="/login"
                  onClick={onCloseMobile}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-brand-sidebarActive/60 font-medium transition"
                >
                  <HeartHandshake className="w-4 h-4 text-purple-400" />
                  <span>Field NGO Desk</span>
                </Link>
              </nav>
            </div>
          </>
        )}
      </div>

      {/* Bottom Profile / Institution info */}
      <div className="p-3.5 border-t border-brand-sidebarActive bg-brand-darkSecondary text-xs">
        {isAuthenticated && currentUser ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-brand-sidebarActive border border-brand-mint/30 flex items-center justify-center font-bold text-brand-mint shrink-0">
                {currentUser.name[0]}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-white truncate text-[11px]">
                  {currentUser.name}
                </div>
                <div className="text-[10px] text-gray-400 truncate">
                  {currentUser.title}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-1 text-[11px] border-t border-brand-sidebarActive/60">
              <Link
                to="/login"
                onClick={onCloseMobile}
                className="text-brand-mint hover:underline font-semibold"
              >
                Switch Portal →
              </Link>
              <button
                type="button"
                onClick={() => logout()}
                className="text-gray-400 hover:text-red-400 transition"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between py-1">
            <span className="text-gray-400 text-[11px]">Visitor Mode</span>
            <Link
              to="/login"
              onClick={onCloseMobile}
              className="inline-flex items-center gap-1 text-xs font-bold text-brand-mint hover:underline"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Portal Login</span>
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
};

