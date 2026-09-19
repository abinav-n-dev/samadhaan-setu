import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';
import { LoginModal } from './LoginModal';
import { SamadhanLogo } from '../common/SamadhanLogo';
import { 
  Menu, 
  Search, 
  Bell, 
  Plus, 
  Languages, 
  User,
  LogOut,
  ChevronDown,
  ShieldCheck,
  BadgeCheck,
  GraduationCap,
  Building,
  HeartHandshake,
  Sun,
  Moon,
  MapPin
} from 'lucide-react';

interface NavbarProps {
  onToggleMobileSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleMobileSidebar }) => {
  const { 
    notifications, 
    role, 
    isAuthenticated, 
    currentUser, 
    logout, 
    theme, 
    toggleTheme, 
    language, 
    setLanguage, 
    t,
    addToast
  } = useAppState();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getRoleDashboardPath = (roleKey: string) => {
    switch (roleKey) {
      case 'government': return '/government';
      case 'citizen': return '/citizen';
      case 'student': return '/university';
      case 'mentor': return '/university/mentors';
      case 'industry': return '/industry';
      case 'ngo': return '/ngo';
      default: return '/';
    }
  };

  return (
    <>
      <header className="bg-white border-b border-brand-border sticky top-0 z-30 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onToggleMobileSidebar}
            aria-label="Toggle mobile menu navigation"
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Compact Mobile Brand Logo */}
          <Link to="/" className="lg:hidden flex items-center">
            <SamadhanLogo size={26} showText textColor="dark" />
          </Link>

          {/* Global Search */}
          <form onSubmit={handleSearchSubmit} className="relative hidden sm:block w-56 md:w-72 lg:w-80">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={t('nav.search_placeholder', 'Search challenges, districts, categories...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-8 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white transition"
            />
            <kbd className="hidden lg:inline-flex items-center absolute right-2.5 top-2 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-200/60 rounded border border-slate-200">
              /
            </kbd>
          </form>

          {/* Live GIS Map Link */}
          <Link
            to="/map"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-emerald-200 bg-emerald-50/80 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 transition shadow-xs"
            title="Open Live GIS Problem Map"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span className="hidden sm:inline">Live GIS Map</span>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Light / Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t('nav.light_mode', 'Light Mode') : t('nav.dark_mode', 'Dark Mode')}
            title={theme === 'dark' ? t('nav.light_mode', 'Light Mode') : t('nav.dark_mode', 'Dark Mode')}
            className="flex items-center justify-center p-2 rounded-xl border border-brand-border hover:bg-brand-bg transition text-brand-text shadow-xs"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 dark:text-slate-200" />
            )}
          </button>

          {/* Refined Bilingual Language Selector: English | हिन्दी */}
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold shadow-xs">
            <Languages className="w-3.5 h-3.5 text-slate-700 shrink-0" />
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setLanguage('EN')}
                aria-label="Switch to English"
                className={`px-2 py-0.5 rounded-md text-xs transition ${
                  language === 'EN'
                    ? 'bg-slate-900 text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                English
              </button>
              <span className="text-slate-300 select-none text-[11px]">|</span>
              <button
                type="button"
                onClick={() => setLanguage('HI')}
                aria-label="हिन्दी में बदलें"
                className={`px-2 py-0.5 rounded-md text-xs transition ${
                  language === 'HI'
                    ? 'bg-slate-900 text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                हिन्दी
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications(prev => !prev)}
              aria-label="View system notifications"
              className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 relative"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-modal border border-brand-border p-3 space-y-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <span className="font-bold text-brand-text">Platform Alerts</span>
                  <span className="text-[10px] bg-brand-bg px-2 py-0.5 rounded font-semibold text-brand-textMuted">
                    {unreadCount} new
                  </span>
                </div>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {notifications.slice(0, 4).map(n => (
                    <div key={n.id} className="p-2.5 rounded-xl hover:bg-gray-50 border border-gray-100">
                      <div className="flex items-center justify-between text-[10px] font-semibold text-gray-400">
                        <span>{n.title}</span>
                        <span>{n.timestamp}</span>
                      </div>
                      <p className="text-xs text-brand-text mt-1">{n.message}</p>
                      {n.link && (
                        <Link
                          to={n.link}
                          onClick={() => setShowNotifications(false)}
                          className="text-[11px] text-brand-dark font-semibold hover:underline mt-1 inline-block"
                        >
                          View details →
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Authentication / Stakeholder Portal Selector */}
          {isAuthenticated && currentUser ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowLoginModal(true)}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-brand-dark font-semibold px-2.5 py-1.5 rounded-xl border border-brand-border hover:bg-brand-bg transition"
                title="Switch Stakeholder Portal"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Portals</span>
              </button>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowUserDropdown(prev => !prev)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition text-xs"
                >
                  <div className="w-6 h-6 rounded-full bg-slate-900 text-emerald-400 flex items-center justify-center font-bold text-[11px]">
                    {currentUser.name[0]}
                  </div>
                  <div className="hidden md:block text-left">
                    <div className="font-bold text-brand-text leading-tight max-w-[140px] truncate flex items-center gap-1">
                      <span>{currentUser.name}</span>
                      {currentUser.isGovtVerified && (
                        <span title="NIC Verified Government Officer">
                          <BadgeCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-brand-textMuted capitalize flex items-center gap-1">
                      <span>{currentUser.role} Portal</span>
                      {currentUser.authProvider === 'google' && (
                        <span className="text-[9px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950 px-1 py-0.2 rounded">Google</span>
                      )}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-modal border border-brand-border p-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
                    <div className="p-2.5 border-b border-gray-100 mb-1">
                      <div className="flex items-center gap-1">
                        <p className="font-bold text-brand-text truncate">{currentUser.name}</p>
                        {currentUser.isGovtVerified && (
                          <BadgeCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-brand-textMuted truncate">{currentUser.title}</p>
                      {currentUser.governmentId && (
                        <p className="text-[10px] font-mono text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded mt-1 inline-block">
                          ID: {currentUser.governmentId}
                        </p>
                      )}
                      <div>
                        <span className="inline-block mt-1 text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-brand-mintSoft text-emerald-800">
                          {currentUser.role}
                        </span>
                      </div>
                    </div>

                    <Link
                      to={getRoleDashboardPath(currentUser.role)}
                      onClick={() => setShowUserDropdown(false)}
                      className="flex items-center gap-2 p-2 rounded-xl text-brand-text hover:bg-gray-50 font-medium"
                    >
                      <User className="w-4 h-4 text-brand-dark" />
                      <span>My Role Dashboard</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setShowUserDropdown(false);
                        setShowLoginModal(true);
                      }}
                      className="w-full flex items-center gap-2 p-2 rounded-xl text-brand-text hover:bg-gray-50 font-medium text-left"
                    >
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                      <span>Switch Stakeholder Portal</span>
                    </button>

                    <div className="border-t border-gray-100 my-1" />

                    <button
                      type="button"
                      onClick={() => {
                        setShowUserDropdown(false);
                        logout();
                        navigate('/');
                      }}
                      className="w-full flex items-center gap-2 p-2 rounded-xl text-red-600 hover:bg-red-50 font-medium text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </Link>
          )}

          {/* Primary CTA */}
          <button
            type="button"
            onClick={() => {
              if (isAuthenticated) {
                navigate('/citizen/report');
              } else {
                addToast('Authentication Required', 'Please log in with verified citizen credentials to report a problem.', 'info');
                navigate('/login?tab=citizen');
              }
            }}
            className="inline-flex items-center gap-1.5 bg-emerald-700 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg hover:bg-emerald-800 shadow-xs transition active:scale-[0.98] cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Report a Problem</span>
            <span className="sm:hidden">Report</span>
          </button>
        </div>
      </header>

      {/* Login / Role Selection Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};
