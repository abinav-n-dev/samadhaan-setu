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
  const { reports } = useAppState();

  const userReports = reports.slice(0, 5); // Show latest reports
  const submittedCount = 8;
  const underReviewCount = 2;
  const verifiedCount = 4;
  const resolvedCount = 2;

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-textMuted">
            Citizen Voice & Community Action
          </span>
          <h1 className="text-2xl font-extrabold text-brand-text mt-0.5">
            Citizen Problem Dashboard
          </h1>
          <p className="text-xs text-brand-textMuted mt-1">
            Track your reported community issues and observe how government and universities turn them into verified impact.
          </p>
        </div>

        <Link
          to="/citizen/report"
          className="inline-flex items-center justify-center gap-2 bg-brand-dark text-brand-mint px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-brand-darkSecondary shadow-subtle transition flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Report a Community Problem</span>
        </Link>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Submitted Reports"
          value={submittedCount}
          subtitle="Total logged by community"
          icon={<FileText className="w-5 h-5" />}
        />
        <MetricCard
          title="Under Review"
          value={underReviewCount}
          subtitle="In AI duplicate analysis"
          icon={<Clock className="w-5 h-5 text-amber-600" />}
        />
        <MetricCard
          title="Verified Challenges"
          value={verifiedCount}
          subtitle="Accepted for universities"
          icon={<CheckCircle2 className="w-5 h-5 text-blue-600" />}
        />
        <MetricCard
          title="Impact Resolved"
          value={resolvedCount}
          subtitle="Physically resolved & verified"
          icon={<Award className="w-5 h-5 text-emerald-600" />}
          highlight
        />
      </div>

      {/* Recent Submissions List */}
      <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-subtle space-y-4">
        <div className="flex items-center justify-between border-b border-brand-border pb-3">
          <div>
            <h3 className="font-bold text-sm text-brand-text">My Recent Submissions</h3>
            <p className="text-xs text-brand-textMuted">Live status tracking for filed incidents</p>
          </div>
          <Link
            to="/citizen/reports"
            className="text-xs font-bold text-brand-dark hover:underline flex items-center gap-1"
          >
            <span>View All Submissions</span>
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
                  <span className="text-brand-textMuted">{report.category}</span>
                </div>
                <h4 className="font-bold text-brand-text text-sm">{report.title}</h4>
                <div className="flex items-center gap-2 text-brand-textMuted text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span>{report.locality}, {report.district}</span>
                  <span>•</span>
                  <span>Est. {report.affectedCountEstimate} citizens affected</span>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-md">
                  {report.status}
                </span>

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

