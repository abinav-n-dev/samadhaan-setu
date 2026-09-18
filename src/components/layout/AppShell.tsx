import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { NotificationToastContainer } from '../common/NotificationToast';

export const AppShell: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col font-sans text-brand-text selection:bg-brand-mint selection:text-brand-dark">
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
            className="fixed inset-0 bg-black/40 z-20 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* Content Area */}
        <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
          {/* Top Navbar */}
          <Navbar onToggleMobileSidebar={() => setMobileSidebarOpen(true)} />

          {/* Dynamic Page Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>

          {/* Institutional Civic Footer */}
          <footer className="border-t border-brand-border bg-white px-6 py-4 text-xs text-brand-textMuted flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-brand-dark">SamadhanSetu</span>
              <span>— Smart India Hackathon 2026 Innovation Ecosystem</span>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span>Government-Academic-Community Nexus</span>
              <span>•</span>
              <span className="text-emerald-700 font-semibold">Simulated Live Prototype</span>
            </div>
          </footer>
        </div>
      </div>

      {/* Floating System Toasts */}
      <NotificationToastContainer />
    </div>
  );
};

