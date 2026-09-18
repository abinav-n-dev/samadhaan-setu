import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[SamadhanSetu ErrorBoundary caught error]:', error, errorInfo);
  }

  handleReset = () => {
    try {
      if (typeof window !== 'undefined') {
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('samadhansetu_')) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach(k => localStorage.removeItem(k));

        const sessionKeys: string[] = [];
        for (let i = 0; i < sessionStorage.length; i++) {
          const key = sessionStorage.key(i);
          if (key && key.startsWith('samadhansetu_')) {
            sessionKeys.push(key);
          }
        }
        sessionKeys.forEach(k => sessionStorage.removeItem(k));
      }
    } catch (e) {
      console.error('Failed to clear storage:', e);
    }
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl border border-red-200 dark:border-red-900/50 p-6 sm:p-8 text-center space-y-4 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-extrabold text-brand-text dark:text-white">
              Something went wrong
            </h2>
            <p className="text-xs text-brand-textMuted dark:text-slate-400 leading-relaxed">
              The application encountered an unexpected error. Resetting demo data will restore clean default records and resolve any local storage corruption.
            </p>
            {this.state.error?.message && (
              <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-xl font-mono text-[11px] text-red-600 dark:text-red-400 text-left overflow-x-auto border border-gray-200 dark:border-slate-700">
                {this.state.error.message}
              </div>
            )}
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
              <button
                type="button"
                onClick={this.handleReset}
                className="px-4 py-2.5 bg-brand-dark text-brand-mint text-xs font-bold rounded-xl hover:bg-brand-darkSecondary transition flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Demo Data
              </button>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-4 py-2.5 bg-white dark:bg-slate-800 border border-brand-border dark:border-slate-700 text-brand-text dark:text-white text-xs font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

