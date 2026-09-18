import React from 'react';
import { PriorityBreakdown as PriorityBreakdownType, GovernmentOverride } from '../../types';
import { ShieldAlert, Info, UserCheck } from 'lucide-react';

interface PriorityBreakdownProps {
  breakdown: PriorityBreakdownType;
  override?: GovernmentOverride;
  onOpenOverrideModal?: () => void;
  canOverride?: boolean;
}

export const PriorityBreakdown: React.FC<PriorityBreakdownProps> = ({
  breakdown,
  override,
  onOpenOverrideModal,
  canOverride = false,
}) => {
  const factors = [
    { label: 'Severity', weight: '30%', score: breakdown.severity, color: 'bg-red-500' },
    { label: 'Population Impact', weight: '25%', score: breakdown.populationImpact, color: 'bg-orange-500' },
    { label: 'Geographic Spread', weight: '15%', score: breakdown.geographicSpread, color: 'bg-amber-500' },
    { label: 'Urgency', weight: '15%', score: breakdown.urgency, color: 'bg-rose-500' },
    { label: 'Duplicate / Community Signal', weight: '10%', score: breakdown.duplicateSignal, color: 'bg-emerald-500' },
    { label: 'Feasibility', weight: '5%', score: breakdown.feasibility, color: 'bg-blue-500' },
  ];

  return (
    <div className="bg-white rounded-xl border border-brand-border p-5 shadow-subtle space-y-5">
      <div className="flex items-center justify-between border-b border-brand-border pb-3">
        <div>
          <h3 className="font-bold text-base text-brand-text flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-brand-dark" />
            AI-Assisted Priority Assessment
          </h3>
          <p className="text-xs text-brand-textMuted mt-0.5">
            Algorithmic multi-factor decision support model
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black font-mono text-brand-dark">
            {override ? override.overrideScore : breakdown.overallScore} <span className="text-xs text-brand-textMuted font-sans">/ 100</span>
          </div>
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
            (override ? override.overrideLevel : breakdown.level) === 'CRITICAL'
              ? 'bg-red-100 text-red-800'
              : (override ? override.overrideLevel : breakdown.level) === 'HIGH'
              ? 'bg-orange-100 text-orange-800'
              : 'bg-amber-100 text-amber-800'
          }`}>
            {override ? override.overrideLevel : breakdown.level}
          </span>
        </div>
      </div>

      {/* Factor Bars */}
      <div className="space-y-3">
        {factors.map((factor) => (
          <div key={factor.label} className="text-xs">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium text-brand-text flex items-center gap-1.5">
                {factor.label}
                <span className="text-[10px] text-brand-textMuted bg-gray-100 px-1.5 py-0.2 rounded">
                  weight {factor.weight}
                </span>
              </span>
              <span className="font-mono font-semibold text-brand-text">{factor.score}</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${factor.color}`}
                style={{ width: `${factor.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Government Override Banner */}
      {override && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-semibold text-amber-900">
            <UserCheck className="w-4 h-4 text-amber-700" />
            Government Priority Override Active
          </div>
          <p className="text-amber-800">
            <strong className="font-medium">Reason:</strong> {override.reason}
          </p>
          <div className="flex justify-between text-[11px] text-amber-700 pt-1 border-t border-amber-200/60">
            <span>Officer: {override.officerName}</span>
            <span>{new Date(override.timestamp).toLocaleDateString()}</span>
          </div>
        </div>
      )}

      {/* Mandatory Disclaimer & Override Button */}
      <div className="pt-2 border-t border-brand-border flex items-center justify-between text-[11px] text-brand-textMuted">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-brand-textMuted flex-shrink-0" />
          <span>Decision support only. Government verification required.</span>
        </div>

        {canOverride && onOpenOverrideModal && (
          <button
            type="button"
            onClick={onOpenOverrideModal}
            className="text-brand-dark hover:underline font-semibold text-xs ml-2 flex-shrink-0"
          >
            {override ? 'Edit Override' : 'Override Priority'}
          </button>
        )}
      </div>
    </div>
  );
};

