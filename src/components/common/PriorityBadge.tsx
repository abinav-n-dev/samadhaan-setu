import React from 'react';
import { PriorityLevel } from '../../types';
import { useAppState } from '../../context/StateContext';

interface PriorityBadgeProps {
  level: PriorityLevel;
  score?: number;
  size?: 'sm' | 'md' | 'lg';
  showScore?: boolean;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({
  level,
  score,
  size = 'md',
  showScore = false,
}) => {
  const { t } = useAppState();

  const getColors = () => {
    switch (level) {
      case 'CRITICAL':
        return 'bg-red-50 text-red-700 border-red-200 ring-red-500/10';
      case 'HIGH':
        return 'bg-orange-50 text-orange-700 border-orange-200 ring-orange-500/10';
      case 'MEDIUM':
        return 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/10';
      case 'LOW':
      default:
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/10';
    }
  };

  const getDotColor = () => {
    switch (level) {
      case 'CRITICAL': return 'bg-red-600';
      case 'HIGH': return 'bg-orange-500';
      case 'MEDIUM': return 'bg-amber-500';
      case 'LOW': default: return 'bg-emerald-500';
    }
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1.5',
    md: 'text-xs font-semibold px-2.5 py-1 gap-1.5',
    lg: 'text-sm font-bold px-3.5 py-1.5 gap-2',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border ring-1 ring-inset ${getColors()} ${sizeClasses[size]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${getDotColor()} animate-pulse`} />
      <span>{t(`priority.${level.toLowerCase()}`, level)}</span>
      {showScore && score !== undefined && (
        <span className="opacity-75 font-mono text-[11px] border-l border-current pl-1.5">
          {score}/100
        </span>
      )}
    </span>
  );
};

