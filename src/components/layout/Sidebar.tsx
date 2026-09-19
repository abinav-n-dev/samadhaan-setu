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
  const { role, currentUser, isAuthenticated, logout, t } = useAppState();

  const getRoleLinks = () => {
    switch (role) {
      case 'government':
        return [
          { to: '/government', label: t('side.command_center', 'Command Center'), icon: <ShieldCheck className="w-4 h-4" /> },
          { to: '/government/verification', label: t('side.verification_queue', 'Incoming & Duplicate Queue'), icon: <Layers className="w-4 h-4" /> },
          { to: '/government/map', label: t('side.live_gis_map', 'Live GIS Problem Map'), icon: <Map className="w-4 h-4" /> },
          { to: '/government/challenges', label: t('side.challenges_registry', 'Challenges Registry'), icon: <FileText className="w-4 h-4" /> },
          { to: '/government/impact', label: t('side.impact_desk', 'Impact Verification Desk'), icon: <CheckSquare className="w-4 h-4" /> },
          { to: '/government/analytics', label: t('side.analytics', 'Geographic Analytics'), icon: <BarChart3 className="w-4 h-4" /> },
          { to: '/government/audit', label: t('side.audit_log', 'Transparent Audit Log'), icon: <Clock className="w-4 h-4" /> },
        ];
      case 'citizen':
        return [
          { to: '/citizen', label: t('side.citizen_dashboard', 'Citizen Dashboard'), icon: <Home className="w-4 h-4" /> },
          { to: '/map', label: t('side.live_gis_map', 'Live GIS Problem Map'), icon: <Map className="w-4 h-4" /> },
          { to: '/citizen/report', label: t('side.report_problem', 'Report a Problem'), icon: <PlusCircle className="w-4 h-4" /> },
          { to: '/citizen/reports', label: t('side.my_reports', 'My Submissions & Tracking'), icon: <ListOrdered className="w-4 h-4" /> },
        ];
      case 'student':
        return [
          { to: '/university', label: t('side.university_dashboard', 'Innovation Dashboard'), icon: <GraduationCap className="w-4 h-4" /> },
          { to: '/map', label: t('side.live_gis_map', 'Live GIS Problem Map'), icon: <Map className="w-4 h-4" /> },
          { to: '/university/challenges', label: t('side.recommended_challenges', 'Recommended Challenges'), icon: <Compass className="w-4 h-4" /> },
          { to: '/university/projects', label: t('side.active_projects', 'Active Projects & Milestones'), icon: <CheckCircle className="w-4 h-4" /> },
          { to: '/university/achievements', label: t('side.student_profile', 'Student Impact Profile'), icon: <Award className="w-4 h-4" /> },
        ];
      case 'mentor':
        return [
          { to: '/university/mentors', label: t('side.mentor_review', 'Proposal Review Desk'), icon: <CheckSquare className="w-4 h-4" /> },
          { to: '/university/projects', label: t('side.supervised_teams', 'Supervised Student Teams'), icon: <GraduationCap className="w-4 h-4" /> },
          { to: '/explore', label: t('side.explore_challenges', 'Browse Challenges'), icon: <Compass className="w-4 h-4" /> },
        ];
      case 'industry':
        return [
          { to: '/industry', label: t('side.csr_portfolio', 'CSR Portfolio & Impact'), icon: <Briefcase className="w-4 h-4" /> },
          { to: '/industry/projects', label: t('side.discover_projects', 'Discover University Projects'), icon: <Compass className="w-4 h-4" /> },
          { to: '/solutions', label: t('side.solutions', 'Proven Implementations'), icon: <Award className="w-4 h-4" /> },
        ];
      case 'ngo':
        return [
          { to: '/ngo', label: t('side.field_ops', 'Field Operations Desk'), icon: <HeartHandshake className="w-4 h-4" /> },
          { to: '/ngo/evidence', label: t('side.submit_evidence', 'Submit Field Evidence'), icon: <UploadCloud className="w-4 h-4" /> },
          { to: '/map', label: t('side.incident_map', 'Ground Incident Map'), icon: <Map className="w-4 h-4" /> },
        ];
      default:
        return [];
    }
  };

  const publicLinks = [
    { to: '/', label: t('side.overview', 'Overview'), icon: <Home className="w-4 h-4" /> },
    { to: '/map', label: t('side.live_gis_map', 'Live GIS Problem Map'), icon: <Map className="w-4 h-4" /> },
    { to: '/explore', label: t('side.explore_challenges', 'Explore Challenges'), icon: <Compass className="w-4 h-4" /> },
    { to: '/solutions', label: t('side.solutions', 'Impact Showcase'), icon: <Award className="w-4 h-4" /> },
    { to: '/how-it-works', label: t('side.how_it_works', 'How Ecosystem Works'), icon: <HelpCircle className="w-4 h-4" /> },
    { to: '/verify/SS-2026-1042', label: t('side.verify_credential', 'Verify Credential'), icon: <ExternalLink className="w-4 h-4" /> },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-brand-dark text-gray-300 flex flex-col border-r border-brand-sidebarActive transition-transform duration-200 lg:translate-x-0 ${
        isOpenMobile ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-extrabold text-base shadow-xs">
            स
          </div>
          <div>
            <div className="font-bold text-white text-sm tracking-tight font-sans">
              SAMADHAN<span className="text-emerald-400">SETU</span>
            </div>
            <div className="text-[10px] text-slate-400 font-medium">
              झारखण्ड जन-समाधान सेतु
            </div>
          </div>
        </Link>

        {/* Role context badge */}
        <div className="mt-3.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
            {isAuthenticated ? 'Active Desk:' : 'Portal Access:'}
          </span>
          <Link
            to="/login"
            onClick={onCloseMobile}
            className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 uppercase tracking-wider flex items-center gap-1"
            title="Click to switch portal"
          >
            <span>{isAuthenticated ? role : 'Choose Role'}</span>
            <span className="text-[10px] text-slate-400 font-normal lowercase">(switch)</span>
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 text-xs">
        {/* If Logged In: Show Role-specific Workspace Tools */}
        {isAuthenticated && currentUser ? (
          <>
            <div>
              <div className="px-3 mb-2 text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center justify-between">
                <span>{role} Workspace</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
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
                          ? 'bg-slate-800 text-emerald-400 font-semibold border-l-2 border-emerald-400 pl-2.5 shadow-xs'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
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
              <div className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
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
                          ? 'bg-slate-800 text-emerald-400 font-semibold border-l-2 border-emerald-400 pl-2.5 shadow-xs'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
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
              <div className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
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
                          ? 'bg-slate-800 text-emerald-400 font-semibold border-l-2 border-emerald-400 pl-2.5 shadow-xs'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
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
              <div className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Stakeholder Portals</span>
                <span className="text-[9px] text-emerald-400 font-normal">Sign In</span>
              </div>
              <nav className="space-y-1">
                <Link
                  to="/login"
                  onClick={onCloseMobile}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 font-medium transition"
                >
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span>Government Center</span>
                </Link>
                <Link
                  to="/login"
                  onClick={onCloseMobile}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 font-medium transition"
                >
                  <Home className="w-4 h-4 text-amber-400" />
                  <span>Citizen Portal</span>
                </Link>
                <Link
                  to="/login"
                  onClick={onCloseMobile}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 font-medium transition"
                >
                  <GraduationCap className="w-4 h-4 text-indigo-400" />
                  <span>University & Students</span>
                </Link>
                <Link
                  to="/login"
                  onClick={onCloseMobile}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 font-medium transition"
                >
                  <Briefcase className="w-4 h-4 text-emerald-400" />
                  <span>Industry / CSR Grants</span>
                </Link>
                <Link
                  to="/login"
                  onClick={onCloseMobile}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 font-medium transition"
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
              <div className="w-8 h-8 rounded-full bg-brand-sidebarActive border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400 shrink-0">
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
                className="text-emerald-400 hover:text-emerald-300 hover:underline font-semibold"
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
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300 hover:underline"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
};

