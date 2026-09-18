import React from 'react';
import { useAppState } from '../../context/StateContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const NotificationToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useAppState();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-modal bg-white border border-brand-border animate-in slide-in-from-bottom-5 fade-in duration-200"
          >
            <div className="flex-shrink-0 mt-0.5">
              {toast.type === 'success' && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              )}
              {toast.type === 'warning' && (
                <AlertCircle className="w-5 h-5 text-amber-600" />
              )}
              {toast.type === 'info' && (
                <Info className="w-5 h-5 text-brand-dark" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-brand-text leading-tight">{toast.title}</h4>
              <p className="text-xs text-brand-textMuted mt-1 leading-normal">{toast.description}</p>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-gray-400 hover:text-gray-600 p-1 -mr-1 -mt-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

