import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { NotificationToastContainer } from '../common/NotificationToast';
import { SamadhanLogo } from '../common/SamadhanLogo';
import { SetuAiChatbot } from '../chat/SetuAiChatbot';
import { Phone, ShieldCheck, CheckCircle2, Globe, Heart } from 'lucide-react';

export const AppShell: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col font-sans text-brand-text selection:bg-emerald-100 selection:text-emerald-900">
      {/* Main Layout Container */}
      <div className="flex-1 flex min-h-0 relative">
        {/* Fixed Desktop / Offcanvas Mobile Sidebar */}
        <Sidebar
          isOpenMobile={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        {/* Backdrop for mobile */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-20 lg:hidden transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* Content Area */}
        <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
          {/* Official Government & SIH 2026 Masthead Strip */}
          <div className="bg-slate-900 text-slate-300 text-[11px] border-b border-slate-800 py-1.5 px-4 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              {/* Left: Official State & Initiative Accreditation */}
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="font-semibold text-white tracking-wide">झारखण्ड सरकार</span>
                  <span className="text-slate-500">|</span>
                  <span className="hidden sm:inline text-slate-300">Government of Jharkhand</span>
                </div>
                <span className="text-slate-600 hidden md:inline">•</span>
                <span className="text-slate-400 hidden md:inline text-[10px]">
                  Dept. of Higher, Technical Education & Skill Development
                </span>
              </div>

              {/* Right: National Helpline & SIH Badge */}
              <div className="flex items-center gap-3 font-mono text-[10px]">
                <span className="hidden xl:inline bg-slate-800 text-emerald-400 px-2 py-0.5 rounded border border-slate-700">
                  SIH 2026 PS #SIH1642
                </span>
                <div className="flex items-center gap-1 text-slate-300 font-sans">
                  <Phone className="w-3 h-3 text-emerald-400" />
                  <span className="hidden sm:inline">Citizen Helpline:</span>
                  <span className="font-mono font-bold text-white">1800-345-6570</span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Navbar */}
          <Navbar onToggleMobileSidebar={() => setMobileSidebarOpen(true)} />

          {/* Dynamic Page Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>

          {/* Institutional Civic & Governance Footer */}
          <footer className="border-t border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                    <SamadhanLogo size={22} />
                    <span>समाधान सेतु • SamadhanSetu</span>
                    <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-semibold px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                      National Civic Innovation Infrastructure
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 max-w-xl">
                    A collaborative initiative transforming ground grievances verified by District Administrations into accredited University Capstones, sponsored by Section 135 CSR grants and audited with grassroots NGOs.
                  </p>
                </div>

                <div className="flex items-center gap-3 text-xs font-medium">
                  <Link to="/how-it-works" className="text-slate-600 hover:text-emerald-700 hover:underline">
                    Ecosystem Framework
                  </Link>
                  <span className="text-slate-300">•</span>
                  <Link to="/map" className="text-slate-600 hover:text-emerald-700 hover:underline">
                    Live GIS Map
                  </Link>
                  <span className="text-slate-300">•</span>
                  <Link to="/verify/SS-2026-1042" className="text-slate-600 hover:text-emerald-700 hover:underline">
                    Verifiable Credentials
                  </Link>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Designed for Smart India Hackathon 2026 • Government of Jharkhand Pilot</span>
                </div>
                <div>
                  <span>Compliant with Right to Service Act • NIC DigiGov Verified Framework</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Setu AI Sahayak Floating Chatbot (Gemini 3.1 Flash) */}
      <SetuAiChatbot />

      {/* Floating System Toasts */}
      <NotificationToastContainer />
    </div>
  );
};

