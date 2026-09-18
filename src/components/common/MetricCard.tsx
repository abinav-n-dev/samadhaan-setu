import React, { ReactNode } from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  highlight?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  highlight = false,
}) => {
  return (
    <div
      className={`rounded-xl border p-5 transition-all relative overflow-hidden ${
        highlight
          ? 'bg-brand-dark text-white border-brand-dark shadow-elevated'
          : 'bg-white text-brand-text border-brand-border shadow-subtle hover:border-brand-mint'
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p
            className={`text-xs font-semibold uppercase tracking-wider ${
              highlight ? 'text-brand-mint' : 'text-brand-textMuted'
            }`}
          >
            {title}
          </p>
          <div className="mt-2 text-2xl sm:text-3xl font-black font-mono tracking-tight">
            {value}
          </div>
          {subtitle && (
            <p
              className={`mt-1 text-xs ${
                highlight ? 'text-gray-300' : 'text-brand-textMuted'
              }`}
            >
              {subtitle}
            </p>
          )}
          {trend && (
            <div className="mt-2 flex items-center gap-1.5 text-xs font-medium">
              <span
                className={
                  trend.isPositive
                    ? highlight
                      ? 'text-brand-mintBright'
                      : 'text-emerald-600'
                    : 'text-red-500'
                }
              >
                {trend.value}
              </span>
              <span
                className={`text-[10px] ${
                  highlight ? 'text-gray-400' : 'text-gray-400'
                }`}
              >
                vs previous cycle
              </span>
            </div>
          )}
        </div>
        <div
          className={`p-3 rounded-lg flex-shrink-0 ${
            highlight ? 'bg-brand-sidebarActive text-brand-mint' : 'bg-brand-bg text-brand-dark'
          }`}
        >
          {icon}
        </div>
      </div>

      {/* Demo watermark */}
      <div className="mt-3 pt-2 border-t border-dashed border-gray-200/50 flex justify-between items-center text-[10px] text-gray-400 font-mono">
        <span>PROTOTYPE DATA</span>
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      </div>
    </div>
  );
};

