import React from 'react';
import { Link } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';
import { MetricCard } from '../../components/common/MetricCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  Award, 
  Plus, 
  ArrowRight, 
  MapPin, 
  ChevronRight 
} from 'lucide-react';

export const CitizenDashboard: React.FC = () => {
  const { reports, t } = useAppState();

  const userReports = reports.slice(0, 5); // Show latest reports
  const submittedCount = 8;
  const underReviewCount = 2;
  const verifiedCount = 4;
  const resolvedCount = 2;

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

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-textMuted">
            {t('citizen.dashboard_tag', 'Citizen Voice & Community Action')}
          </span>
          <h1 className="text-2xl font-extrabold text-brand-text mt-0.5">
            {t('citizen.dashboard_title', 'Citizen Problem Dashboard')}
          </h1>
          <p className="text-xs text-brand-textMuted mt-1">
            {t('citizen.dashboard_desc', 'Track your reported community issues and observe how government and universities turn them into verified impact.')}
          </p>
        </div>

        <Link
          to="/citizen/report"
          className="inline-flex items-center justify-center gap-2 bg-brand-dark text-brand-mint px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-brand-darkSecondary shadow-subtle transition flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{t('citizen.report_problem_btn', 'Report a Community Problem')}</span>
        </Link>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title={t('citizen.stat_submitted', 'Submitted Reports')}
          value={submittedCount}
          subtitle={t('citizen.stat_submitted_sub', 'Total logged by community')}
          icon={<FileText className="w-5 h-5" />}
        />
        <MetricCard
          title={t('citizen.stat_review', 'Under Review')}
          value={underReviewCount}
          subtitle={t('citizen.stat_review_sub', 'In AI duplicate analysis')}
          icon={<Clock className="w-5 h-5 text-amber-600" />}
        />
        <MetricCard
          title={t('citizen.stat_verified', 'Verified Challenges')}
          value={verifiedCount}
          subtitle={t('citizen.stat_verified_sub', 'Accepted for universities')}
          icon={<CheckCircle2 className="w-5 h-5 text-blue-600" />}
        />
        <MetricCard
          title={t('citizen.stat_resolved', 'Impact Resolved')}
          value={resolvedCount}
          subtitle={t('citizen.stat_resolved_sub', 'Physically resolved & verified')}
          icon={<Award className="w-5 h-5 text-emerald-600" />}
          highlight
        />
      </div>

      {/* Recent Submissions List */}
      <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-subtle space-y-4">
        <div className="flex items-center justify-between border-b border-brand-border pb-3">
          <div>
            <h3 className="font-bold text-sm text-brand-text">{t('citizen.recent_submissions', 'My Recent Submissions')}</h3>
            <p className="text-xs text-brand-textMuted">{t('citizen.recent_submissions_sub', 'Live status tracking for filed incidents')}</p>
          </div>
          <Link
            to="/citizen/reports"
            className="text-xs font-bold text-brand-dark hover:underline flex items-center gap-1"
          >
            <span>{t('citizen.view_all', 'View All Submissions')}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-3">
          {userReports.map((report) => (
            <div
              key={report.id}
              className="p-4 rounded-xl border border-brand-border bg-gray-50/60 hover:bg-white hover:border-brand-mint transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-brand-dark text-xs bg-white px-2 py-0.5 rounded border border-gray-200">
                    {report.trackingId}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-brand-textMuted">{getCategoryLabel(report.category)}</span>
                </div>
                <h4 className="font-bold text-brand-text text-sm">{report.title}</h4>
                <div className="flex items-center gap-2 text-brand-textMuted text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span>{report.locality}, {report.district}</span>
                  <span>•</span>
                  <span>Est. {report.affectedCountEstimate} {t('citizen.affected_citizens', 'citizens affected')}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <StatusBadge status={report.status} size="sm" />

                <Link
                  to="/citizen/reports"
                  className="p-1.5 rounded-lg text-gray-400 hover:text-brand-dark hover:bg-gray-100"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

