import React from 'react';
import { Link } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';
import { 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  MapPin, 
  Users, 
  ArrowRight,
  ExternalLink,
  Award,
  Building
} from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const { challenges } = useAppState();

  const adoptedProjects = challenges.filter(c => c.adoption);

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-brand-textMuted">
          Capstone Registry & Tracking
        </span>
        <h1 className="text-2xl font-extrabold text-brand-text mt-0.5">
          Active Student Projects & Milestones
        </h1>
        <p className="text-xs text-brand-textMuted mt-1">
          Monitor development milestones, faculty mentor reviews, and CSR sponsor engagements across your adopted challenges.
        </p>
      </div>

      <div className="space-y-6">
        {adoptedProjects.map((challenge) => {
          const adoption = challenge.adoption!;
          return (
            <div
              key={challenge.id}
              className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 shadow-subtle space-y-6"
            >
              {/* Project Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-brand-border pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-brand-dark bg-brand-bg px-2.5 py-0.5 rounded border">
                      #{challenge.code}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200">
                      Team: {adoption.teamName}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-brand-text mt-1">{challenge.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-brand-textMuted">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      {challenge.district}, Jharkhand
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                      {adoption.university}
                    </span>
                  </div>
                </div>

                <div className="text-right flex flex-col items-end gap-1">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Mentor Approval:
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    adoption.mentorStatus === 'approved'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                    {adoption.mentorStatus === 'approved' ? 'Approved by Mentor ✓' : 'Under Mentor Review'}
                  </span>
                </div>
              </div>

              {/* Approach & Team details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-brand-bg border border-brand-border space-y-1">
                  <span className="font-bold text-brand-text block">Technical Architecture:</span>
                  <p className="text-brand-textMuted leading-relaxed">{adoption.proposalSummary}</p>
                  <div className="pt-2 flex flex-wrap gap-1">
                    {adoption.proposedTech.map((t) => (
                      <span key={t} className="bg-white border border-brand-border px-2 py-0.5 rounded text-[11px] font-semibold text-brand-dark">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-brand-bg border border-brand-border space-y-1">
                  <span className="font-bold text-brand-text block">Student Team & Faculty:</span>
                  <div className="text-brand-text font-semibold">Lead: {adoption.leadStudent}</div>
                  <div className="text-brand-textMuted text-[11px]">Roster: {adoption.teamMembers.join(', ')}</div>
                  <div className="text-indigo-800 font-semibold pt-1">
                    Faculty Advisor: {adoption.facultyMentor}
                  </div>
                  {challenge.industrySupport && (
                    <div className="text-emerald-800 font-semibold text-[11px] pt-1">
                      CSR Sponsor: {challenge.industrySupport.partnerName}
                    </div>
                  )}
                </div>
              </div>

              {/* Milestones list */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-brand-text">
                  <span>Development & Implementation Milestones</span>
                  <span className="text-brand-textMuted">
                    {adoption.milestones.filter(m => m.completed).length} of {adoption.milestones.length} completed
                  </span>
                </div>

                <div className="space-y-2">
                  {adoption.milestones.map((m) => (
                    <div
                      key={m.id}
                      className="p-3 rounded-xl border border-gray-200 bg-gray-50/70 flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5 ${
                          m.completed ? 'bg-emerald-600 text-white' : 'bg-gray-300 text-gray-600'
                        }`}>
                          {m.completed ? '✓' : '○'}
                        </div>
                        <div>
                          <div className="font-bold text-brand-text">{m.title}</div>
                          <p className="text-brand-textMuted text-[11px]">{m.description}</p>
                        </div>
                      </div>

                      <span className="font-mono text-[11px] text-gray-400 whitespace-nowrap">
                        Due: {m.dueDate}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Links */}
              <div className="pt-2 border-t border-brand-border flex items-center justify-between text-xs">
                <Link
                  to={`/challenges/${challenge.id}`}
                  className="font-bold text-brand-dark hover:underline flex items-center gap-1"
                >
                  <span>View Master Challenge</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>

                {challenge.status === 'resolved' && (
                  <Link
                    to="/verify/SS-2026-1042"
                    className="inline-flex items-center gap-1.5 font-bold text-emerald-800 bg-brand-mintSoft px-3 py-1.5 rounded-lg border border-brand-mint"
                  >
                    <Award className="w-4 h-4 text-emerald-700" />
                    <span>View Minted Impact Credential</span>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

