import React, { useState } from 'react';
import { useAppState } from '../../context/StateContext';
import { CitizenReport } from '../../types';
import { 
  FileText, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  AlertTriangle, 
  X,
  ExternalLink,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const CitizenReportsPage: React.FC = () => {
  const { reports, challenges } = useAppState();
  const [selectedReport, setSelectedReport] = useState<CitizenReport | null>(reports[0] || null);

  const trackingStages = [
    { label: 'Report Submitted', done: true, desc: 'Logged with photo and GPS location' },
    { label: 'Duplicate Analysis', done: true, desc: 'Clustered with nearby community reports' },
    { label: 'Government Review', done: true, desc: 'District Officer reviewed veracity' },
    { label: 'Administrative Verification', done: selectedReport?.status !== 'Under Review', desc: 'Published to academic innovation catalog' },
    { label: 'University Adoption', done: selectedReport?.challengeId === 'c-wtr-1042', desc: 'Student engineering team assigned' },
    { label: 'Field Implementation', done: selectedReport?.challengeId === 'c-wtr-1042', desc: 'NGO prototype installation completed' },
    { label: 'Government Impact Sign-off', done: selectedReport?.challengeId === 'c-wtr-1042', desc: 'Certified population benefit audited' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-brand-textMuted">
          Citizen Tracking Center
        </span>
        <h1 className="text-2xl font-extrabold text-brand-text mt-0.5">
          My Submissions & Status Tracking
        </h1>
        <p className="text-xs text-brand-textMuted mt-1">
          Follow your community reports through the administrative verification and university engineering pipeline.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Reports List */}
        <div className="lg:col-span-6 space-y-3">
          {reports.map((rep) => {
            const isSelected = selectedReport?.id === rep.id;
            return (
              <div
                key={rep.id}
                onClick={() => setSelectedReport(rep)}
                className={`p-4 rounded-2xl border cursor-pointer transition text-xs space-y-2 ${
                  isSelected
                    ? 'bg-white border-brand-mint ring-1 ring-brand-mint shadow-subtle'
                    : 'bg-white border-brand-border hover:border-gray-300 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-brand-dark text-xs bg-brand-bg px-2 py-0.5 rounded border border-brand-border">
                    {rep.trackingId}
                  </span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {rep.status}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-brand-text leading-snug">{rep.title}</h4>

                <div className="flex items-center justify-between text-brand-textMuted text-[11px] pt-1 border-t border-gray-100">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    {rep.locality}, {rep.district}
                  </span>
                  <span className="font-mono">{new Date(rep.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Report Detail & Lifecycle Tracking */}
        <div className="lg:col-span-6">
          {selectedReport ? (
            <div className="bg-white rounded-3xl border border-brand-border p-6 shadow-subtle space-y-6 sticky top-24">
              <div className="flex items-center justify-between border-b border-brand-border pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-brand-dark bg-brand-bg px-2 py-0.5 rounded border border-brand-border">
                      #{selectedReport.trackingId}
                    </span>
                    <span className="text-xs text-brand-textMuted">{selectedReport.category}</span>
                  </div>
                  <h3 className="font-bold text-base text-brand-text mt-1">{selectedReport.title}</h3>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">Description:</span>
                <p className="text-brand-textMuted leading-relaxed">{selectedReport.description}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-brand-bg border border-brand-border text-xs grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase block">Locality</span>
                  <span className="font-semibold text-brand-text">{selectedReport.locality}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase block">District</span>
                  <span className="font-semibold text-brand-text">{selectedReport.district}</span>
                </div>
              </div>

              {/* Problem-to-Impact Lifecycle Timeline */}
              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-brand-text">
                  Lifecycle Progress Timeline
                </h4>

                <div className="space-y-3">
                  {trackingStages.map((stg, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs">
                      <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                        stg.done ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-500'
                      }`}>
                        {stg.done ? '✓' : i + 1}
                      </div>
                      <div>
                        <div className="font-bold text-brand-text">{stg.label}</div>
                        <p className="text-[11px] text-brand-textMuted">{stg.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedReport.challengeId && (
                <div className="pt-2 border-t border-brand-border">
                  <Link
                    to={`/challenges/${selectedReport.challengeId}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-brand-dark text-brand-mint text-xs font-bold py-2.5 rounded-xl hover:bg-brand-darkSecondary transition"
                  >
                    <span>View Master Challenge Page</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-brand-textMuted bg-white rounded-3xl border border-dashed border-brand-border">
              Select a report from the left to view detailed lifecycle tracking.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

