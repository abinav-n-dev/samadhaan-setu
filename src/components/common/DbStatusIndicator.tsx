import React, { useState } from 'react';
import { Database, RefreshCw, CheckCircle2, AlertTriangle, ExternalLink, X, ShieldCheck } from 'lucide-react';
import { useAppState } from '../../context/StateContext';

export const DbStatusIndicator: React.FC = () => {
  const { dbMode, dbSyncStatus, refreshFromCloud } = useAppState();
  const [isOpen, setIsOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshFromCloud();
    setIsRefreshing(false);
  };

  const isConnected = dbMode === 'cloud' && dbSyncStatus === 'synced';
  const isSyncing = dbSyncStatus === 'syncing' || isRefreshing;
  const isError = dbSyncStatus === 'error';

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-xs font-semibold shadow-xs transition-all ${
          isConnected
            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100'
            : isSyncing
            ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300'
            : isError
            ? 'bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-800 text-red-800 dark:text-red-300'
            : 'bg-brand-bg border-brand-border text-brand-textMuted hover:text-brand-text'
        }`}
        title="Database status and configuration"
      >
        <Database className="w-3.5 h-3.5 shrink-0" />
        <span className="hidden md:inline">
          {isConnected
            ? 'Supabase Cloud'
            : isSyncing
            ? 'Syncing Cloud...'
            : isError
            ? 'Cloud Error'
            : 'Local Storage'}
        </span>
        <span
          className={`w-2 h-2 rounded-full ${
            isConnected
              ? 'bg-emerald-500 animate-pulse'
              : isSyncing
              ? 'bg-amber-500 animate-ping'
              : isError
              ? 'bg-red-500'
              : 'bg-slate-400'
          }`}
        />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 border border-brand-border rounded-2xl p-5 max-w-md w-full shadow-2xl relative">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-brand-dark dark:text-white">
                  Database & Cloud Sync
                </h3>
                <p className="text-xs text-brand-textMuted">
                  Smart India Hackathon 2026 Data Architecture
                </p>
              </div>
            </div>

            {isConnected ? (
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
                    <p className="font-semibold">Connected to Supabase PostgreSQL</p>
                    <p className="text-[11px] opacity-90">
                      All citizen complaints, challenge adoptions, and cryptographic credentials are sync-persisted to your cloud database.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-gray-50 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700 text-xs space-y-1.5 font-mono">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Engine:</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">Supabase (PostgreSQL 15)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <span className="text-emerald-600 font-semibold">Active & Healthy</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Offline Resilience:</span>
                    <span className="text-gray-700 dark:text-gray-300">Enabled (localStorage Fallback)</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className="flex-1 py-2 px-3 bg-brand-dark hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                    {isRefreshing ? 'Syncing...' : 'Sync Cloud Data Now'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="py-2 px-4 border border-brand-border rounded-xl text-xs font-semibold hover:bg-gray-50 dark:hover:bg-slate-800"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3.5">
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-blue-900 dark:text-blue-200 space-y-1">
                    <p className="font-semibold">Currently in Offline / Local Storage Mode</p>
                    <p className="text-[11px] opacity-90">
                      The prototype is fully interactive and persists to browser localStorage with full mock data and cryptographic verification.
                    </p>
                  </div>
                </div>

                <div className="border border-brand-border rounded-xl p-3 bg-brand-bg text-xs space-y-2">
                  <p className="font-bold text-brand-text">How to connect your Supabase database:</p>
                  <ol className="list-decimal list-inside space-y-1 text-brand-textMuted text-[11px]">
                    <li>Open your Supabase project dashboard.</li>
                    <li>Go to <strong>SQL Editor</strong> & execute the script from <code className="bg-white dark:bg-slate-800 px-1 py-0.5 rounded font-mono">supabase/schema.sql</code>.</li>
                    <li>Go to <strong>Project Settings → API</strong> and copy your Project URL & Anon Key.</li>
                    <li>Set them as <code className="bg-white dark:bg-slate-800 px-1 py-0.5 rounded font-mono">VITE_SUPABASE_URL</code> and <code className="bg-white dark:bg-slate-800 px-1 py-0.5 rounded font-mono">VITE_SUPABASE_ANON_KEY</code> in your environment variables (or Vercel dashboard).</li>
                  </ol>
                </div>

                <div className="flex gap-2 pt-1">
                  <a
                    href="https://supabase.com/dashboard"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                  >
                    <span>Supabase Dashboard</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="py-2 px-4 border border-brand-border rounded-xl text-xs font-semibold hover:bg-gray-50 dark:hover:bg-slate-800"
                  >
                    Got It
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
