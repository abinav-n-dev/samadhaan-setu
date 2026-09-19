import React from 'react';
import { Link } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';
import { MetricCard } from '../../components/common/MetricCard';
import { PriorityBadge } from '../../components/common/PriorityBadge';
import { StatusBadge } from '../../components/common/StatusBadge';
import { getUniversityRecommendation } from '../../services/recommendationService';
import { 
  GraduationCap, 
  ShieldCheck, 
  Building, 
  Award, 
  Sparkles, 
  MapPin, 
  Users, 
  ArrowRight, 
  FileText,
  CheckCircle2
} from 'lucide-react';

export const UniversityDashboard: React.FC = () => {
  const { challenges } = useAppState();

  const studentProfile = {
    university: 'Birla Institute of Technology (BIT) Mesra',
    department: 'Civil & Environmental Engineering',
    skills: ['IoT Sensor Telemetry', 'Environmental Engineering', 'GIS Mapping', 'Water Treatment', 'Embedded Systems'],
  };

  const adoptedCount = 4;
  const govApprovedCount = 3;
  const industrySupportedCount = 2;
  const impactCount = 2;

  // Calculate recommendation matches for all verified challenges
  const recommended = challenges.map(c => ({
    challenge: c,
    match: getUniversityRecommendation(c, studentProfile)
  })).sort((a, b) => b.match.matchScore - a.match.matchScore);

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-brand-border p-6 sm:p-8 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-indigo-100 text-indigo-800 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded tracking-wider">
              Academic Innovation Hub
            </span>
            <span className="text-xs text-brand-textMuted font-semibold">
              BIT Mesra • Department of Civil & Environmental Engineering
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text">
            University Innovation Portal
          </h1>
          <p className="text-xs sm:text-sm text-brand-textMuted mt-1 max-w-xl">
            Turn verified district problems into credit-bearing engineering capstones with corporate CSR backing and permanent verifiable credentials.
          </p>
        </div>

        <Link
          to="/university/challenges"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-dark text-brand-mint text-xs font-bold rounded-xl hover:bg-brand-darkSecondary transition shadow-subtle flex-shrink-0"
        >
          <GraduationCap className="w-4 h-4" />
          <span>Browse Capstone Registry</span>
        </Link>
      </div>

      {/* KPI Cards: Active Projects, Government Approved, Industry Supported, Impact Projects */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Active Projects"
          value={adoptedCount}
          subtitle="Engineering capstones"
          icon={<GraduationCap className="w-5 h-5 text-indigo-600" />}
        />
        <MetricCard
          title="Government Approved"
          value={govApprovedCount}
          subtitle="Validated problem baselines"
          icon={<ShieldCheck className="w-5 h-5 text-blue-600" />}
        />
        <MetricCard
          title="Industry Supported"
          value={industrySupportedCount}
          subtitle="CSR grant & hardware backed"
          icon={<Building className="w-5 h-5 text-emerald-600" />}
        />
        <MetricCard
          title="Impact Completed"
          value={impactCount}
          subtitle="Certified community reach"
          icon={<Award className="w-5 h-5 text-brand-mint" />}
          highlight
        />
      </div>

      {/* Recommended Challenges Section with Match % */}
      <div className="bg-white rounded-xl border border-brand-border p-6 sm:p-8 shadow-subtle space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-brand-border pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-extrabold text-brand-text">
                AI-Recommended Challenges for Your Department
              </h2>
            </div>
            <p className="text-xs text-brand-textMuted mt-1">
              Curated based on curriculum syllabus match, faculty expertise, and department equipment inventory.
            </p>
          </div>

          <div className="text-xs font-semibold text-brand-textMuted bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
            Profile: <strong className="text-brand-dark">{studentProfile.department}</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {recommended.slice(0, 4).map(({ challenge, match }) => (
            <div
              key={challenge.id}
              className="p-5 rounded-2xl border border-brand-border bg-white hover:border-brand-mint hover:shadow-elevated transition duration-200 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-extrabold text-xs text-brand-dark bg-brand-bg px-2.5 py-1 rounded border">
                    #{challenge.code}
                  </span>
                  <div className="flex items-center gap-1.5 font-bold text-xs bg-indigo-50 text-indigo-800 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{match.matchScore}% Match</span>
                  </div>
                </div>

                <Link
                  to={`/challenges/${challenge.id}`}
                  className="font-bold text-base text-brand-text hover:text-brand-dark block line-clamp-1"
                >
                  {challenge.title}
                </Link>

                <div className="flex items-center gap-2 text-xs text-brand-textMuted">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span>{challenge.locality}, {challenge.district}</span>
                  <span>•</span>
                  <span>~{challenge.affectedPopulation.toLocaleString()} citizens affected</span>
                </div>

                {/* Match Reasons */}
                <div className="p-3 rounded-xl bg-gray-50/70 border border-gray-100 text-xs space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    AI Match Rationale:
                  </span>
                  {match.reasons.map((r, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-brand-text text-[11px]">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-brand-border flex items-center justify-between">
                <PriorityBadge
                  level={challenge.governmentOverride ? challenge.governmentOverride.overrideLevel : challenge.priorityLevel}
                  score={challenge.governmentOverride ? challenge.governmentOverride.overrideScore : challenge.priorityScore}
                  size="sm"
                  showScore
                />

                <Link
                  to={`/challenges/${challenge.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-dark hover:underline"
                >
                  <span>{challenge.adoption ? 'View Adopted Project' : 'Adopt Challenge'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

