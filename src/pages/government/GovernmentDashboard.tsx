import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';
import { MetricCard } from '../../components/common/MetricCard';
import { PriorityBadge } from '../../components/common/PriorityBadge';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ProblemMap } from '../../components/map/ProblemMap';
import { AuditTimeline } from '../../components/common/AuditTimeline';
import { 
  ShieldCheck, 
  FileText, 
  AlertOctagon, 
  GraduationCap, 
  Award, 
  Map, 
  Layers, 
  ArrowRight, 
  Filter, 
  Search, 
  ChevronRight,
  TrendingUp,
  Activity,
  CheckCircle2
} from 'lucide-react';

export const GovernmentDashboard: React.FC = () => {
  const { challenges, auditLogs, role } = useAppState();
  const navigate = useNavigate();

  const [selectedMapChallengeId, setSelectedMapChallengeId] = useState<string>('c-wtr-1042');

  // Sorted by Priority ↓
  const priorityQueue = [...challenges].sort((a, b) => b.priorityScore - a.priorityScore);

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-brand-border p-6 sm:p-8 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-100 text-blue-800 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded tracking-wider">
              Executive Administration
            </span>
            <span className="text-xs font-mono text-brand-textMuted font-semibold">
              Govt of Jharkhand • State Civic Command
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text">
            Government Command Center
          </h1>
          <p className="text-xs sm:text-sm text-brand-textMuted mt-1 max-w-2xl">
            Real-time GIS problem distribution, algorithmic duplicate clustering, and impact verification governance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/government/verification"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-dark text-brand-mint text-xs font-bold rounded-xl hover:bg-brand-darkSecondary transition shadow-subtle"
          >
            <Layers className="w-4 h-4" />
            <span>Verification Queue</span>
          </Link>
          <Link
            to="/government/impact"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-700 text-white text-xs font-bold rounded-xl hover:bg-emerald-800 transition shadow-subtle"
          >
            <Award className="w-4 h-4" />
            <span>Verify Field Impact</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards: 1,284 Reports, 316 Verified/Active, 84 Critical, 42 University Teams, 127 Resolved */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <MetricCard
          title="Total Reports"
          value="1,284"
          subtitle="Citizen submissions"
          icon={<FileText className="w-5 h-5" />}
          trend={{ value: '+14%', isPositive: true }}
        />
        <MetricCard
          title="Verified / Active"
          value="316"
          subtitle="Published challenges"
          icon={<ShieldCheck className="w-5 h-5 text-blue-600" />}
          trend={{ value: '+8%', isPositive: true }}
        />
        <MetricCard
          title="Critical Priority"
          value="84"
          subtitle="Score > 85 threshold"
          icon={<AlertOctagon className="w-5 h-5 text-red-600" />}
          trend={{ value: '-5%', isPositive: true }}
        />
        <MetricCard
          title="University Teams"
          value="42"
          subtitle="Active capstone projects"
          icon={<GraduationCap className="w-5 h-5 text-indigo-600" />}
          trend={{ value: '+22%', isPositive: true }}
        />
        <MetricCard
          title="Impact Resolved"
          value="127"
          subtitle="Verified by DM/DC"
          icon={<Award className="w-5 h-5 text-brand-mint" />}
          highlight
        />
      </div>

      {/* Flagship Split Layout: LIVE GIS MAP beside PRIORITY QUEUE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Large GIS Map */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Map className="w-4 h-4 text-brand-dark" />
              <h2 className="font-bold text-sm text-brand-text">Live Problem GIS Map</h2>
            </div>
            <Link
              to="/government/map"
              className="text-xs font-bold text-brand-dark hover:underline flex items-center gap-1"
            >
              <span>Fullscreen Map</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <ProblemMap
            challenges={challenges}
            selectedChallengeId={selectedMapChallengeId}
            height="520px"
          />
        </div>

        {/* Priority Queue Column */}
        <div className="lg:col-span-5 xl:col-span-4 bg-white rounded-2xl border border-brand-border p-5 shadow-subtle flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-brand-border pb-3 mb-3">
              <div>
                <h3 className="font-bold text-sm text-brand-text">Priority Queue</h3>
                <p className="text-[11px] text-brand-textMuted">Sorted by Priority Score (↓)</p>
              </div>
              <span className="text-[10px] font-bold text-brand-mint bg-brand-dark px-2 py-0.5 rounded font-mono">
                {priorityQueue.length} Challenges
              </span>
            </div>

            <div className="space-y-2.5 max-h-[440px] overflow-y-auto pr-1">
              {priorityQueue.map((item) => {
                const isSelected = selectedMapChallengeId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedMapChallengeId(item.id)}
                    className={`p-3 rounded-xl border transition cursor-pointer text-xs space-y-1.5 ${
                      isSelected
                        ? 'border-brand-mint bg-brand-mintSoft/40 ring-1 ring-brand-mint'
                        : 'border-brand-border bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-brand-dark text-xs">
                        #{item.code}
                      </span>
                      <PriorityBadge
                        level={item.governmentOverride ? item.governmentOverride.overrideLevel : item.priorityLevel}
                        score={item.governmentOverride ? item.governmentOverride.overrideScore : item.priorityScore}
                        size="sm"
                        showScore
                      />
                    </div>

                    <h4 className="font-bold text-brand-text line-clamp-1">{item.title}</h4>

                    <div className="flex items-center justify-between text-[11px] text-brand-textMuted pt-1 border-t border-gray-100">
                      <span>{item.district}</span>
                      <span>{item.reportCount} reports • ~{item.affectedPopulation.toLocaleString()} pop</span>
                    </div>

                    <div className="pt-1 flex items-center justify-between">
                      <StatusBadge status={item.status} size="sm" />
                      <Link
                        to={`/challenges/${item.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-[11px] font-bold text-brand-dark hover:underline flex items-center gap-1"
                      >
                        <span>Inspect</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Link
            to="/government/challenges"
            className="w-full text-center py-2 bg-brand-bg hover:bg-gray-100 text-brand-text font-bold text-xs rounded-xl border border-brand-border transition"
          >
            View All Registered Challenges →
          </Link>
        </div>
      </div>

      {/* Bottom Section: Recent Transparent Audit Trail & Live Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white rounded-2xl border border-brand-border p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between border-b border-brand-border pb-3">
            <div>
              <h3 className="font-bold text-sm text-brand-text">Recent Administrative Audit Trail</h3>
              <p className="text-xs text-brand-textMuted">Immutable transparency log for all verifications and priority overrides</p>
            </div>
            <Link
              to="/government/audit"
              className="text-xs font-bold text-brand-dark hover:underline flex items-center gap-1"
            >
              <span>Full Audit Log</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <AuditTimeline logs={auditLogs} limit={5} />
        </div>

        {/* Quick Actions & District Highlights */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-brand-border p-6 shadow-subtle space-y-4 text-xs">
          <h3 className="font-bold text-sm text-brand-text">District Hotspots</h3>
          <p className="text-brand-textMuted">Highest concentration of reported incidents in Jharkhand</p>

          <div className="space-y-2">
            {[
              { district: 'Ranchi', reports: 187, critical: 16 },
              { district: 'Dumka', reports: 142, critical: 12 },
              { district: 'Dhanbad', reports: 115, critical: 9 },
              { district: 'Khunti', reports: 96, critical: 8 },
              { district: 'Deoghar', reports: 74, critical: 5 },
            ].map((d) => (
              <div key={d.district} className="flex items-center justify-between p-2.5 rounded-lg bg-brand-bg border border-brand-border">
                <span className="font-bold text-brand-text">{d.district}</span>
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-brand-textMuted">{d.reports} reports</span>
                  <span className="bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded text-[10px]">
                    {d.critical} crit
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/government/analytics"
            className="w-full inline-flex items-center justify-center gap-1.5 py-2 mt-2 bg-brand-dark text-brand-mint rounded-xl font-bold hover:bg-brand-darkSecondary transition"
          >
            <span>District Analytics & Heatmaps</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

