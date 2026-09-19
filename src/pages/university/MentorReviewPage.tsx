import React, { useState } from 'react';
import { useAppState } from '../../context/StateContext';
import { 
  UserCheck, 
  Check, 
  X, 
  AlertCircle, 
  GraduationCap, 
  BookOpen, 
  MapPin, 
  ChevronRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const MentorReviewPage: React.FC = () => {
  const { challenges, approveMentorProposal, addToast } = useAppState();

  // Find adopted projects awaiting mentor signoff or approved
  const reviewProjects = challenges.filter(c => c.adoption);
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>(reviewProjects[0]?.id || challenges[0]?.id || '');
  const selectedChallenge = challenges.find(c => c.id === selectedChallengeId) || reviewProjects[0] || challenges[0];
  const [mentorFeedback, setMentorFeedback] = useState(
    'Sound scientific approach. The modular ultrafiltration column and activated alumina cartridges fulfill the requirements for capstone academic credits.'
  );

  const handleApprove = () => {
    approveMentorProposal(selectedChallenge.id, mentorFeedback);
    addToast('Mentor Approval Confirmed', `Academic capstone approved for ${selectedChallenge.code}.`, 'success');
  };

  const handleRequestRevisions = () => {
    addToast('Revisions Requested', `Sent technical notes back to ${selectedChallenge.adoption?.teamName}.`, 'warning');
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-brand-textMuted">
          Faculty Guidance & Academic Governance
        </span>
        <h1 className="text-2xl font-extrabold text-brand-text mt-0.5">
          Mentor Proposal Review Desk
        </h1>
        <p className="text-xs text-brand-textMuted mt-1">
          Review student project proposals, validate engineering methodology against curriculum requirements, and authorize university capstone credits.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Project List */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-bold text-brand-text block px-1">
            Supervised Student Proposals ({reviewProjects.length})
          </span>

          <div className="space-y-2.5">
            {reviewProjects.map((c) => {
              const isSelected = selectedChallenge.id === c.id;
              const isApproved = c.adoption?.mentorStatus === 'approved';
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedChallengeId(c.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition text-xs space-y-2 ${
                    isSelected
                      ? 'bg-white border-brand-mint ring-1 ring-brand-mint shadow-subtle'
                      : 'bg-white border-brand-border hover:border-gray-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-brand-dark">#{c.code}</span>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded ${
                      isApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {isApproved && <Check className="w-3 h-3" />}
                      <span>{isApproved ? 'Approved' : 'Pending Review'}</span>
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-brand-text line-clamp-1">{c.title}</h4>
                  <div className="text-brand-textMuted text-[11px]">
                    Team: <strong>{c.adoption?.teamName}</strong> • {c.adoption?.leadStudent}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Proposal Review */}
        <div className="lg:col-span-7">
          {selectedChallenge.adoption ? (
            <div className="bg-white rounded-xl border border-brand-border p-6 sm:p-8 shadow-subtle space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand-border pb-4">
                <div>
                  <span className="font-mono text-xs font-bold text-brand-dark bg-brand-bg px-2.5 py-0.5 rounded border">
                    #{selectedChallenge.code}
                  </span>
                  <h3 className="text-lg font-extrabold text-brand-text mt-1">{selectedChallenge.title}</h3>
                  <p className="text-xs text-brand-textMuted">
                    Team: <strong>{selectedChallenge.adoption.teamName}</strong> ({selectedChallenge.adoption.university})
                  </p>
                </div>

                <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200 self-start">
                  Capstone Proposal
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                    Proposed Technical Solution:
                  </span>
                  <p className="text-brand-text leading-relaxed bg-brand-bg p-3 rounded-xl border border-brand-border">
                    {selectedChallenge.adoption.proposalSummary}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                    Selected Technologies & Sensors:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {selectedChallenge.adoption.proposedTech.map((t) => (
                      <span key={t} className="bg-gray-100 text-brand-dark px-2 py-0.5 rounded font-semibold text-[11px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Milestones Evaluation */}
              <div className="space-y-2 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                  Proposed Milestone Delivery Schedule:
                </span>
                <div className="space-y-1.5">
                  {selectedChallenge.adoption.milestones.map((m) => (
                    <div key={m.id} className="p-2.5 rounded-lg bg-gray-50 border border-gray-100 flex justify-between">
                      <span className="font-semibold text-brand-text">{m.title}</span>
                      <span className="text-gray-400 font-mono">Due: {m.dueDate}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mentor Feedback Input */}
              <div className="space-y-2 text-xs">
                <label className="block font-bold text-brand-text">
                  Faculty Evaluation Notes & Recommendations:
                </label>
                <textarea
                  rows={3}
                  value={mentorFeedback}
                  onChange={(e) => setMentorFeedback(e.target.value)}
                  className="w-full p-2.5 bg-brand-bg border border-brand-border rounded-xl text-brand-text focus:outline-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-brand-border flex items-center justify-between gap-3 text-xs">
                <button
                  type="button"
                  onClick={handleRequestRevisions}
                  className="px-4 py-2 rounded-xl border border-brand-border text-brand-text font-bold hover:bg-gray-50 transition"
                >
                  Request Changes
                </button>

                <button
                  type="button"
                  onClick={handleApprove}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-brand-dark text-brand-mint rounded-xl font-bold hover:bg-brand-darkSecondary transition shadow-subtle"
                >
                  <Check className="w-4 h-4" />
                  <span>Authorize & Approve Capstone Credit</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-brand-textMuted bg-white rounded-xl border border-dashed border-brand-border">
              Select a project to review.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

