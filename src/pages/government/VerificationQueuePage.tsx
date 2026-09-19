import React, { useState } from 'react';
import { useAppState } from '../../context/StateContext';
import { Challenge, PriorityLevel } from '../../types';
import { PriorityBadge } from '../../components/common/PriorityBadge';
import { PriorityBreakdown } from '../../components/common/PriorityBreakdown';
import { 
  ShieldCheck, 
  Layers, 
  Check, 
  X, 
  AlertCircle, 
  Users, 
  FileText, 
  ChevronRight, 
  Merge, 
  Split,
  MessageSquare,
  Sparkles,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const VerificationQueuePage: React.FC = () => {
  const { challenges, verifyChallenge, overridePriority, addToast } = useAppState();

  // Pick unverified or active challenges for queue
  const queueChallenges = challenges.filter(c => c.status === 'unverified' || c.status === 'verified' || c.id === 'c-wtr-1042');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge>(queueChallenges[0] || challenges[0]);

  // Priority override modal inside verification
  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [overrideScore, setOverrideScore] = useState<number>(selectedChallenge.priorityScore);
  const [overrideLevel, setOverrideLevel] = useState<PriorityLevel>(selectedChallenge.priorityLevel);
  const [overrideReason, setOverrideReason] = useState<string>('Administrative confirmation by field inspection team.');

  const handleVerify = (c: Challenge) => {
    verifyChallenge(c.id);
    addToast('Challenge Verified', `${c.code} verified and released to university discovery.`, 'success');
  };

  const handleMerge = () => {
    addToast('Cluster Merged', `Merged satellite reports into master challenge ${selectedChallenge.code}.`, 'info');
  };

  const handleSeparate = () => {
    addToast('Cluster Split', `Separated fringe submissions from cluster ${selectedChallenge.code}.`, 'warning');
  };

  const handleRequestEvidence = () => {
    addToast('Evidence Requested', `Dispatched notification to field BDO for ${selectedChallenge.code}.`, 'info');
  };

  const handleReject = () => {
    addToast('Report Flagged', `Marked ${selectedChallenge.code} for administrative closure.`, 'warning');
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-brand-textMuted">
          Administrative Intake & Clustering
        </span>
        <h1 className="text-2xl font-extrabold text-brand-text mt-0.5">
          Incoming Reports & Duplicate Cluster Queue
        </h1>
        <p className="text-xs text-brand-textMuted mt-1">
          Review incoming citizen reports, synthesize AI-detected duplicate clusters, confirm administrative priorities, and approve challenges for university research.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Queue Listing */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-brand-text px-1">
            <span>Pending & Clustered Cases ({queueChallenges.length})</span>
            <span className="text-brand-textMuted">Sorted by Priority ↓</span>
          </div>

          <div className="space-y-2.5">
            {queueChallenges.map((c) => {
              const isSelected = selectedChallenge.id === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => {
                    setSelectedChallenge(c);
                    setOverrideScore(c.priorityScore);
                    setOverrideLevel(c.priorityLevel);
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition text-xs space-y-2 ${
                    isSelected
                      ? 'bg-white border-brand-mint ring-1 ring-brand-mint shadow-subtle'
                      : 'bg-white border-brand-border hover:border-gray-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-brand-dark text-xs">
                      #{c.code}
                    </span>
                    <PriorityBadge
                      level={c.governmentOverride ? c.governmentOverride.overrideLevel : c.priorityLevel}
                      score={c.governmentOverride ? c.governmentOverride.overrideScore : c.priorityScore}
                      size="sm"
                      showScore
                    />
                  </div>

                  <h4 className="font-bold text-sm text-brand-text line-clamp-1">{c.title}</h4>

                  <div className="flex items-center justify-between text-[11px] text-brand-textMuted pt-1 border-t border-gray-100">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      {c.locality}, {c.district}
                    </span>
                    <span className="font-mono font-semibold">{c.reportCount} reports clustered</span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      c.verificationStatus === 'verified'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {c.verificationStatus === 'verified' ? 'Verified' : 'Pending Verification'}
                    </span>
                    <span className="text-[11px] font-bold text-brand-dark flex items-center gap-0.5">
                      Review <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Inspection & Actions */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-xl border border-brand-border p-6 shadow-subtle space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand-border pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-extrabold text-xs text-brand-dark bg-brand-bg px-2 py-0.5 rounded border">
                    #{selectedChallenge.code}
                  </span>
                  <span className="text-xs font-semibold text-brand-textMuted bg-gray-100 px-2 py-0.5 rounded">
                    {selectedChallenge.category}
                  </span>
                </div>
                <h3 className="font-extrabold text-lg text-brand-text mt-1">{selectedChallenge.title}</h3>
              </div>

              <PriorityBadge
                level={selectedChallenge.governmentOverride ? selectedChallenge.governmentOverride.overrideLevel : selectedChallenge.priorityLevel}
                score={selectedChallenge.governmentOverride ? selectedChallenge.governmentOverride.overrideScore : selectedChallenge.priorityScore}
                showScore
                size="md"
              />
            </div>

            {/* AI Duplicate Cluster Intelligence Callout */}
            <div className="p-4 rounded-2xl bg-brand-mintSoft/40 border border-brand-mint/60 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-brand-dark">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <span>AI Semantic Duplicate Cluster</span>
                </div>
                <span className="font-mono font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-brand-mint">
                  {selectedChallenge.cluster?.similarityScore || 91}% Similarity Match
                </span>
              </div>

              <p className="text-brand-textMuted leading-relaxed">
                {selectedChallenge.cluster?.aiRationale || 'Synthesized multiple reports within 6.2 km citing identical groundwater chemical anomalies.'}
              </p>

              <div className="grid grid-cols-3 gap-2 pt-1 font-mono">
                <div className="bg-white p-2 rounded-lg border border-brand-border text-center">
                  <span className="text-[10px] text-gray-400 uppercase block font-sans">Reports</span>
                  <span className="font-bold text-brand-text text-sm">{selectedChallenge.reportCount}</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-brand-border text-center">
                  <span className="text-[10px] text-gray-400 uppercase block font-sans">Villages</span>
                  <span className="font-bold text-brand-text text-sm">{selectedChallenge.affectedVillages.length}</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-brand-border text-center">
                  <span className="text-[10px] text-gray-400 uppercase block font-sans">Est. Population</span>
                  <span className="font-bold text-brand-text text-sm">~{selectedChallenge.affectedPopulation}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleMerge}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-brand-border rounded-lg text-brand-dark font-bold text-xs hover:bg-gray-50 transition"
                >
                  <Merge className="w-3.5 h-3.5 text-blue-600" />
                  <span>Merge Cluster</span>
                </button>
                <button
                  type="button"
                  onClick={handleSeparate}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-brand-border rounded-lg text-brand-dark font-bold text-xs hover:bg-gray-50 transition"
                >
                  <Split className="w-3.5 h-3.5 text-amber-600" />
                  <span>Separate Cluster</span>
                </button>
              </div>
            </div>

            {/* Transparent Priority Assessment */}
            <PriorityBreakdown
              breakdown={selectedChallenge.breakdown}
              override={selectedChallenge.governmentOverride}
              canOverride={true}
              onOpenOverrideModal={() => setShowOverrideModal(true)}
            />

            {/* Administrative Verification Action Buttons */}
            <div className="pt-4 border-t border-brand-border flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleRequestEvidence}
                  className="px-3.5 py-2 rounded-xl border border-brand-border text-brand-text font-bold hover:bg-gray-50 transition"
                >
                  Request More Evidence
                </button>
                <button
                  type="button"
                  onClick={handleReject}
                  className="px-3.5 py-2 rounded-xl border border-red-200 text-red-600 font-bold hover:bg-red-50 transition"
                >
                  Reject
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleVerify(selectedChallenge)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-dark text-brand-mint rounded-xl font-extrabold hover:bg-brand-darkSecondary transition shadow-subtle"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verify & Publish Challenge</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Priority Override Modal */}
      {showOverrideModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-brand-border shadow-modal max-w-md w-full p-6 space-y-4 text-xs">
            <h3 className="font-bold text-sm text-brand-text flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-dark" />
              Administrative Priority Override
            </h3>

            <div>
              <label className="block font-semibold text-brand-text mb-1">Government Priority Level:</label>
              <select
                value={overrideLevel}
                onChange={(e) => setOverrideLevel(e.target.value as PriorityLevel)}
                className="w-full bg-brand-bg border border-brand-border rounded-lg p-2 font-bold"
              >
                <option value="CRITICAL">CRITICAL</option>
                <option value="HIGH">HIGH</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="LOW">LOW</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-brand-text mb-1">Score Override (0-100):</label>
              <input
                type="number"
                value={overrideScore}
                onChange={(e) => setOverrideScore(Number(e.target.value))}
                className="w-full bg-brand-bg border border-brand-border rounded-lg p-2 font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-brand-text mb-1">Override Reason for Audit Trail:</label>
              <textarea
                rows={3}
                value={overrideReason}
                onChange={(e) => setOverrideReason(e.target.value)}
                className="w-full bg-brand-bg border border-brand-border rounded-lg p-2"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowOverrideModal(false)}
                className="px-4 py-2 border rounded-lg text-brand-textMuted font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  overridePriority(selectedChallenge.id, overrideScore, overrideLevel, overrideReason);
                  setShowOverrideModal(false);
                }}
                className="px-4 py-2 bg-brand-dark text-brand-mint font-bold rounded-lg"
              >
                Confirm Override
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

