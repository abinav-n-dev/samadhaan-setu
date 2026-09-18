import React from 'react';
import { Challenge } from '../../types';
import { PriorityBadge } from '../common/PriorityBadge';
import { MapPin, Users, FileText, ArrowRight, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MapPopupContentProps {
  challenge: Challenge;
}

export const MapPopupContent: React.FC<MapPopupContentProps> = ({ challenge }) => {
  return (
    <div className="p-4 min-w-[260px] max-w-[300px] text-brand-text font-sans space-y-3">
      <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-2">
        <span className="font-mono text-xs font-bold text-brand-textMuted">
          #{challenge.code}
        </span>
        <PriorityBadge level={challenge.priorityLevel} score={challenge.priorityScore} size="sm" showScore />
      </div>

      <div>
        <h4 className="font-bold text-sm text-brand-text leading-snug hover:text-brand-dark">
          {challenge.title}
        </h4>
        <p className="text-xs text-brand-textMuted flex items-center gap-1 mt-1">
          <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <span>{challenge.locality}, {challenge.district}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 py-2 px-2.5 bg-gray-50 rounded-lg text-xs">
        <div>
          <span className="text-[10px] uppercase font-semibold text-brand-textMuted block">Reports</span>
          <span className="font-mono font-bold text-brand-text flex items-center gap-1 mt-0.5">
            <FileText className="w-3 h-3 text-brand-dark" />
            {challenge.reportCount} linked
          </span>
        </div>
        <div>
          <span className="text-[10px] uppercase font-semibold text-brand-textMuted block">Affected</span>
          <span className="font-mono font-bold text-brand-text flex items-center gap-1 mt-0.5">
            <Users className="w-3 h-3 text-brand-dark" />
            ~{challenge.affectedPopulation.toLocaleString()}
          </span>
        </div>
      </div>

      {challenge.adoption && (
        <div className="text-[11px] bg-indigo-50 text-indigo-900 px-2.5 py-1.5 rounded flex items-center gap-1.5 font-medium">
          <GraduationCap className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
          <span className="truncate">{challenge.adoption.university}</span>
        </div>
      )}

      <div className="pt-1">
        <Link
          to={`/challenges/${challenge.id}`}
          className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2 px-3 rounded-lg bg-brand-dark text-brand-mint hover:bg-brand-darkSecondary transition shadow-xs"
        >
          <span>View Challenge</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

