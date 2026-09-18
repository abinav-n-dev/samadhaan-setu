import React from 'react';
import { Link } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';
import { MetricCard } from '../../components/common/MetricCard';
import { 
  Building, 
  Award, 
  Users, 
  DollarSign, 
  ArrowRight, 
  MapPin, 
  GraduationCap, 
  CheckCircle2, 
  ChevronRight 
} from 'lucide-react';

export const IndustryDashboard: React.FC = () => {
  const { challenges } = useAppState();

  const supportedProjects = challenges.filter(c => c.industrySupport);

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded tracking-wider">
              Corporate Social Responsibility
            </span>
            <span className="text-xs text-brand-textMuted font-semibold">
              Tata Steel Foundation & CleanTech CSR Allocation Desk
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text">
            CSR Portfolio & Innovation Impact
          </h1>
          <p className="text-xs sm:text-sm text-brand-textMuted mt-1 max-w-xl">
            Sponsor vetted university capstone engineering solutions, provide technical mentorship, and verify real community impact for Section 135 compliance.
          </p>
        </div>

        <Link
          to="/industry/projects"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-dark text-brand-mint text-xs font-bold rounded-xl hover:bg-brand-darkSecondary transition shadow-subtle flex-shrink-0"
        >
          <Building className="w-4 h-4" />
          <span>Discover University Projects</span>
        </Link>
      </div>

      {/* KPI Cards: Supported Projects 8, Capital Committed ₹18.4L, Active Mentorships 5, People Impacted 6,450 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Supported Projects"
          value="8"
          subtitle="Engineering prototypes backed"
          icon={<Building className="w-5 h-5 text-emerald-600" />}
        />
        <MetricCard
          title="Capital Committed"
          value="₹18.4 Lakh"
          subtitle="Grants and equipment labs"
          icon={<Award className="w-5 h-5 text-brand-mint" />}
          highlight
        />
        <MetricCard
          title="Active Mentorships"
          value="5"
          subtitle="Senior industry engineers"
          icon={<Users className="w-5 h-5 text-indigo-600" />}
        />
        <MetricCard
          title="Citizens Impacted"
          value="6,450"
          subtitle="Verified by district admin"
          icon={<CheckCircle2 className="w-5 h-5 text-blue-600" />}
        />
      </div>

      {/* CSR Portfolio Projects */}
      <div className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 shadow-subtle space-y-6">
        <div className="flex items-center justify-between border-b border-brand-border pb-4">
          <div>
            <h2 className="text-xl font-extrabold text-brand-text">
              Active Sponsored Civic Projects
            </h2>
            <p className="text-xs text-brand-textMuted mt-0.5">
              University teams currently receiving corporate grants and specialized hardware support
            </p>
          </div>

          <Link
            to="/industry/projects"
            className="text-xs font-bold text-brand-dark hover:underline flex items-center gap-1"
          >
            <span>Explore All Projects</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-4">
          {supportedProjects.map((c) => {
            const ind = c.industrySupport!;
            return (
              <div
                key={c.id}
                className="p-5 rounded-2xl border border-brand-border bg-gray-50/60 hover:bg-white transition flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-brand-dark bg-white px-2 py-0.5 rounded border">
                      #{c.code}
                    </span>
                    <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-[10px]">
                      {ind.supportType}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-brand-text">{c.title}</h3>
                  <div className="text-brand-textMuted flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      {c.locality}, {c.district}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                      {c.adoption?.university || 'BIT Mesra'}
                    </span>
                  </div>
                  <p className="text-brand-textMuted text-[11px] pt-1 leading-relaxed">
                    <strong>Pledge:</strong> {ind.commitmentDetails}
                  </p>
                </div>

                <div className="flex flex-col md:items-end gap-2 self-start md:self-center">
                  <div className="font-mono text-emerald-800 font-bold bg-emerald-100 px-3 py-1 rounded-lg">
                    {c.fieldEvidence ? `~${c.fieldEvidence.beneficiariesCount} Impacted` : 'In Deployment'}
                  </div>
                  <Link
                    to={`/challenges/${c.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-dark hover:underline"
                  >
                    <span>View Project Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

