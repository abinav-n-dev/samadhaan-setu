import React from 'react';
import { Link } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';
import { MetricCard } from '../../components/common/MetricCard';
import { 
  HeartHandshake, 
  MapPin, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  UploadCloud,
  GraduationCap
} from 'lucide-react';

export const NgoDashboard: React.FC = () => {
  const { challenges } = useAppState();

  const assignedCases = challenges.filter(c => c.fieldEvidence || c.id === 'c-wtr-1042');

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-purple-100 text-purple-800 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded tracking-wider">
              Field Implementation Operations
            </span>
            <span className="text-xs text-brand-textMuted font-semibold">
              Pratham Gramin Vikas Trust • Dumka Regional Coordination Unit
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text">
            NGO Field Operations & Deployment
          </h1>
          <p className="text-xs sm:text-sm text-brand-textMuted mt-1 max-w-xl">
            Coordinate grassroots pilot deployments with student innovators, conduct Gram Sabha audits, and upload telemetry and water/soil test evidence for government impact certification.
          </p>
        </div>

        <Link
          to="/ngo/evidence"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-dark text-brand-mint text-xs font-bold rounded-xl hover:bg-brand-darkSecondary transition shadow-subtle flex-shrink-0"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload Field Evidence</span>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Assigned Pilots"
          value="3"
          subtitle="Community implementations"
          icon={<HeartHandshake className="w-5 h-5 text-purple-600" />}
        />
        <MetricCard
          title="Field Audits Done"
          value="12"
          subtitle="Panchayat sign-offs"
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
        />
        <MetricCard
          title="Beneficiaries Verified"
          value="2,615"
          subtitle="Residents in Hansdiha cluster"
          icon={<Users className="w-5 h-5 text-brand-mint" />}
          highlight
        />
        <MetricCard
          title="Active Village Teams"
          value="8"
          subtitle="Local operators trained"
          icon={<Clock className="w-5 h-5 text-blue-600" />}
        />
      </div>

      {/* Assigned Cases List */}
      <div className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 shadow-subtle space-y-6">
        <div className="flex items-center justify-between border-b border-brand-border pb-4">
          <div>
            <h2 className="text-xl font-extrabold text-brand-text">
              Assigned Field Implementations
            </h2>
            <p className="text-xs text-brand-textMuted mt-0.5">
              Civic technology pilots assigned for grassroots deployment and beneficiary audit
            </p>
          </div>

          <Link
            to="/ngo/evidence"
            className="text-xs font-bold text-brand-dark hover:underline flex items-center gap-1"
          >
            <span>Submit Evidence</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-4">
          {assignedCases.map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-2xl border border-brand-border bg-gray-50/70 hover:bg-white transition flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-brand-dark bg-white px-2 py-0.5 rounded border">
                    #{c.code}
                  </span>
                  <span className="font-semibold text-purple-800 bg-purple-50 px-2 py-0.5 rounded text-[10px]">
                    Status: {c.status === 'resolved' ? 'Impact Verified' : 'Ready for Field Pilot'}
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
                    {c.adoption?.university || 'BIT Mesra Team'}
                  </span>
                </div>
                {c.fieldEvidence && (
                  <p className="text-brand-textMuted text-[11px] pt-1">
                    <strong>Report:</strong> {c.fieldEvidence.installationReport}
                  </p>
                )}
              </div>

              <div className="flex flex-col md:items-end gap-2 self-start md:self-center">
                <span className="font-mono font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-lg">
                  {c.fieldEvidence ? `${c.fieldEvidence.beneficiariesCount} Beneficiaries` : 'Pending Evidence'}
                </span>
                <Link
                  to="/ngo/evidence"
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-dark hover:underline"
                >
                  <span>Upload Telemetry & Proof</span>
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

