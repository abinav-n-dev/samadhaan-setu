import React, { useState } from 'react';
import { useAppState } from '../../context/StateContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { 
  FileText, 
  MapPin, 
  CheckCircle2, 
  Check,
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
  const { reports, challenges, t } = useAppState();
  const [selectedReportId, setSelectedReportId] = useState<string>(reports[0]?.id || '');
  const selectedReport = reports.find(r => r.id === selectedReportId) || reports[0] || null;
  const linkedChallenge = challenges.find(c => c.id === selectedReport?.challengeId);

  const getCategoryLabel = (cat: string) => {
    if (cat.includes('Water')) return t('category.water', cat);
    if (cat.includes('Road')) return t('category.roads', cat);
    if (cat.includes('Electricity') || cat.includes('Solar')) return t('category.power', cat);
    if (cat.includes('Health')) return t('category.health', cat);
    if (cat.includes('Education')) return t('category.education', cat);
    if (cat.includes('Waste') || cat.includes('Drainage')) return t('category.waste', cat);
    if (cat.includes('Agri')) return t('category.agriculture', cat);
    return cat;
  };

  const trackingStages = [
    { label: t('tracking.stage_submitted', 'Report Submitted'), done: true, desc: t('tracking.stage_submitted_desc', 'Logged with photo and GPS location') },
    { label: t('tracking.stage_duplicate', 'Duplicate Analysis'), done: selectedReport?.status !== 'Submitted', desc: t('tracking.stage_duplicate_desc', 'Clustered with nearby community reports') },
    { label: t('tracking.stage_gov_review', 'Government Review'), done: selectedReport?.status !== 'Submitted' && selectedReport?.status !== 'Under Review', desc: t('tracking.stage_gov_review_desc', 'District Officer reviewed veracity') },
    { label: t('tracking.stage_verification', 'Administrative Verification'), done: linkedChallenge?.verificationStatus === 'verified' || selectedReport?.status === 'Verified' || selectedReport?.status === 'Clustered' || selectedReport?.status === 'Resolved', desc: t('tracking.stage_verification_desc', 'Published to academic innovation catalog') },
    { label: t('tracking.stage_adoption', 'University Adoption'), done: !!linkedChallenge?.adoption, desc: t('tracking.stage_adoption_desc', 'Student engineering team assigned') },
    { label: t('tracking.stage_implementation', 'Field Implementation'), done: !!linkedChallenge?.fieldEvidence || linkedChallenge?.status === 'implementation' || linkedChallenge?.status === 'impact_verification' || linkedChallenge?.status === 'resolved', desc: t('tracking.stage_implementation_desc', 'NGO prototype installation completed') },
    { label: t('tracking.stage_signoff', 'Government Impact Sign-off'), done: !!linkedChallenge?.impactVerification || linkedChallenge?.status === 'resolved', desc: t('tracking.stage_signoff_desc', 'Certified population benefit audited') },
  ];

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-brand-textMuted">
          {t('tracking.center_tag', 'Citizen Tracking Center')}
        </span>
        <h1 className="text-2xl font-extrabold text-brand-text mt-0.5">
          {t('tracking.title', 'My Submissions & Status Tracking')}
        </h1>
        <p className="text-xs text-brand-textMuted mt-1">
          {t('tracking.desc', 'Follow your community reports through the administrative verification and university engineering pipeline.')}
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
                onClick={() => setSelectedReportId(rep.id)}
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
                  <StatusBadge status={rep.status} size="sm" />
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
            <div className="bg-white rounded-xl border border-brand-border p-6 shadow-subtle space-y-6 sticky top-24">
              <div className="flex items-center justify-between border-b border-brand-border pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-brand-dark bg-brand-bg px-2 py-0.5 rounded border border-brand-border">
                      #{selectedReport.trackingId}
                    </span>
                    <span className="text-xs text-brand-textMuted">{getCategoryLabel(selectedReport.category)}</span>
                  </div>
                  <h3 className="font-bold text-base text-brand-text mt-1">{selectedReport.title}</h3>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">{t('tracking.description_label', 'Description:')}</span>
                <p className="text-brand-textMuted leading-relaxed">{selectedReport.description}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-brand-bg border border-brand-border text-xs grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase block">{t('tracking.locality_label', 'Locality')}</span>
                  <span className="font-semibold text-brand-text">{selectedReport.locality}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase block">{t('tracking.district_label', 'District')}</span>
                  <span className="font-semibold text-brand-text">{selectedReport.district}</span>
                </div>
              </div>

              {/* Problem-to-Impact Lifecycle Timeline */}
              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-brand-text">
                  {t('tracking.timeline_heading', 'Lifecycle Progress Timeline')}
                </h4>

                <div className="space-y-3">
                  {trackingStages.map((stg, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs">
                      <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                        stg.done ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-500'
                      }`}>
                        {stg.done ? <Check className="w-3 h-3" /> : i + 1}
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
                    className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 text-white text-xs font-semibold py-2.5 rounded-lg hover:bg-slate-800 transition shadow-sm"
                  >
                    <span>{t('tracking.view_challenge', 'View Master Challenge Page')}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-brand-textMuted bg-white rounded-xl border border-dashed border-brand-border">
              {t('tracking.select_prompt', 'Select a report from the left to view detailed lifecycle tracking.')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

