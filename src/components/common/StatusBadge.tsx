import React from 'react';
import { ChallengeStatus } from '../../types';

interface StatusBadgeProps {
  status: ChallengeStatus | string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getFormat = () => {
    switch (status) {
      case 'unverified':
        return { label: 'Under Review', bg: 'bg-slate-100 text-slate-700 border-slate-200' };
      case 'verified':
        return { label: 'Government Verified', bg: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'published':
        return { label: 'Available for Adoption', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'adopted':
        return { label: 'University Adopted', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
      case 'in_progress':
        return { label: 'In Development', bg: 'bg-cyan-50 text-cyan-700 border-cyan-200' };
      case 'implementation':
        return { label: 'Field Implementation', bg: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'impact_verification':
        return { label: 'Impact Verification', bg: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'resolved':
        return { label: 'Impact Verified & Credentialed', bg: 'bg-brand-mintSoft text-brand-dark border-brand-mint' };
      default:
        return { label: status, bg: 'bg-gray-100 text-gray-700 border-gray-200' };
    }
  };

  const { label, bg } = getFormat();

  return (
    <span
      className={`inline-flex items-center rounded-md border font-medium ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'
      } ${bg}`}
    >
      {label}
    </span>
  );
};

