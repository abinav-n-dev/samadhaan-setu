import React, { ReactNode } from 'react';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="rounded-xl border border-dashed border-brand-border bg-white p-12 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-bg text-brand-textMuted mb-4">
        {icon || <Inbox className="h-6 w-6" />}
      </div>
      <h3 className="text-sm font-bold text-brand-text">{title}</h3>
      <p className="mt-1 text-xs text-brand-textMuted max-w-sm mx-auto">{description}</p>
      {actionLabel && onAction && (
        <div className="mt-5">
          <button
            type="button"
            onClick={onAction}
            className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 shadow-sm transition"
          >
            {actionLabel}
          </button>
        </div>
      )}
    </div>
  );
};

