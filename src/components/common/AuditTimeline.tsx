import React from 'react';
import { AuditEntry } from '../../types';
import { ShieldCheck, User, Building, GraduationCap, Users, Cpu } from 'lucide-react';

interface AuditTimelineProps {
  logs: AuditEntry[];
  limit?: number;
}

export const AuditTimeline: React.FC<AuditTimelineProps> = ({ logs, limit }) => {
  const displayLogs = limit ? logs.slice(0, limit) : logs;

  const getActorIcon = (role: string) => {
    switch (role) {
      case 'government':
        return <ShieldCheck className="w-4 h-4 text-blue-600" />;
      case 'student':
        return <GraduationCap className="w-4 h-4 text-indigo-600" />;
      case 'industry':
        return <Building className="w-4 h-4 text-emerald-600" />;
      case 'ngo':
        return <Users className="w-4 h-4 text-purple-600" />;
      case 'citizen':
        return <User className="w-4 h-4 text-amber-600" />;
      case 'system':
      default:
        return <Cpu className="w-4 h-4 text-brand-dark" />;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'government':
        return 'bg-blue-100 text-blue-800';
      case 'student':
        return 'bg-indigo-100 text-indigo-800';
      case 'industry':
        return 'bg-emerald-100 text-emerald-800';
      case 'ngo':
        return 'bg-purple-100 text-purple-800';
      case 'citizen':
        return 'bg-amber-100 text-amber-800';
      case 'system':
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {displayLogs.map((entry, idx) => {
          const isLast = idx === displayLogs.length - 1;
          const formattedTime = new Date(entry.timestamp).toLocaleString('en-IN', {
            dateStyle: 'medium',
            timeStyle: 'short',
          });

          return (
            <li key={entry.id}>
              <div className="relative pb-8">
                {!isLast && (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex items-start space-x-3">
                  <div className="relative">
                    <div className="h-8 w-8 rounded-full bg-white border border-brand-border flex items-center justify-center shadow-xs">
                      {getActorIcon(entry.actorRole)}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <div className="flex justify-between items-center text-xs">
                      <div className="font-semibold text-brand-text flex items-center gap-2">
                        <span>{entry.action}</span>
                        {entry.challengeCode && (
                          <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-[11px] text-brand-textMuted">
                            #{entry.challengeCode}
                          </span>
                        )}
                      </div>
                      <span className="text-gray-400 text-[11px] font-mono">{formattedTime}</span>
                    </div>
                    <p className="mt-1 text-xs text-brand-textMuted leading-relaxed">
                      {entry.details}
                    </p>
                    <div className="mt-1.5 flex items-center gap-2 text-[11px]">
                      <span className={`px-2 py-0.5 rounded-full font-medium ${getRoleBadge(entry.actorRole)}`}>
                        {entry.actorRole.toUpperCase()}
                      </span>
                      <span className="text-gray-500">• {entry.actorName}</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

