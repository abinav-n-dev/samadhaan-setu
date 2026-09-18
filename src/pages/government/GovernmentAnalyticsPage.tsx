import React from 'react';
import { useAppState } from '../../context/StateContext';
import { MetricCard } from '../../components/common/MetricCard';
import { BarChart3, PieChart, TrendingUp, Users, MapPin, Award } from 'lucide-react';

export const GovernmentAnalyticsPage: React.FC = () => {
  const { challenges } = useAppState();

  const districtData = [
    { name: 'Dumka', count: 142, resolved: 38, color: 'bg-emerald-500' },
    { name: 'Ranchi', count: 187, resolved: 52, color: 'bg-blue-500' },
    { name: 'Khunti', count: 96, resolved: 24, color: 'bg-amber-500' },
    { name: 'Dhanbad', count: 115, resolved: 31, color: 'bg-purple-500' },
    { name: 'Deoghar', count: 74, resolved: 19, color: 'bg-rose-500' },
    { name: 'Bokaro', count: 68, resolved: 14, color: 'bg-indigo-500' },
  ];

  const categoryData = [
    { name: 'Water & Sanitation', count: 342, pct: '32%' },
    { name: 'Roads & Infrastructure', count: 284, pct: '26%' },
    { name: 'Healthcare', count: 195, pct: '18%' },
    { name: 'Education', count: 130, pct: '12%' },
    { name: 'Waste Management', count: 76, pct: '7%' },
    { name: 'Agriculture', count: 57, pct: '5%' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-brand-textMuted">
          Executive Data Intelligence
        </span>
        <h1 className="text-2xl font-extrabold text-brand-text mt-0.5">
          Civic Analytics & District Heatmaps
        </h1>
        <p className="text-xs text-brand-textMuted mt-1">
          Geographic concentration of reported citizen incidents, university adoption rates, and resolution velocity across Jharkhand.
        </p>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Resolution Velocity"
          value="18.4 Days"
          subtitle="Average problem to field sign-off"
          icon={<TrendingUp className="w-5 h-5 text-emerald-600" />}
          trend={{ value: '-3.2 days', isPositive: true }}
        />
        <MetricCard
          title="University Adoption"
          value="64.8%"
          subtitle="Of verified critical challenges"
          icon={<Users className="w-5 h-5 text-indigo-600" />}
          trend={{ value: '+12%', isPositive: true }}
        />
        <MetricCard
          title="CSR Capital Leveraged"
          value="₹42.8 Lakh"
          subtitle="Committed by industry partners"
          icon={<Award className="w-5 h-5 text-brand-mint" />}
          highlight
        />
        <MetricCard
          title="Verified Beneficiaries"
          value="18,450"
          subtitle="Confirmed through field audit"
          icon={<BarChart3 className="w-5 h-5 text-blue-600" />}
        />
      </div>

      {/* District & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* District Distribution Bar Chart representation */}
        <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-subtle space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-brand-border pb-3">
            <h3 className="font-bold text-sm text-brand-text flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-brand-dark" />
              <span>Problems by District</span>
            </h3>
            <span className="text-[10px] text-gray-400 font-mono">Jharkhand State Data</span>
          </div>

          <div className="space-y-3">
            {districtData.map((d) => (
              <div key={d.name}>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-brand-text">{d.name}</span>
                  <span className="font-mono text-brand-textMuted">
                    <strong>{d.count}</strong> reports ({d.resolved} resolved)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden flex">
                  <div
                    className={`h-full ${d.color} rounded-l-full`}
                    style={{ width: `${(d.count / 200) * 100}%` }}
                  />
                  <div
                    className="h-full bg-emerald-300"
                    style={{ width: `${(d.resolved / 200) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-subtle space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-brand-border pb-3">
            <h3 className="font-bold text-sm text-brand-text flex items-center gap-1.5">
              <PieChart className="w-4 h-4 text-brand-dark" />
              <span>Incidents by Functional Category</span>
            </h3>
            <span className="text-[10px] text-gray-400 font-mono">1,284 Reports</span>
          </div>

          <div className="space-y-3">
            {categoryData.map((c) => (
              <div key={c.name} className="flex items-center justify-between p-2.5 rounded-xl bg-brand-bg border border-brand-border">
                <span className="font-bold text-brand-text">{c.name}</span>
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-brand-textMuted">{c.count}</span>
                  <span className="font-bold text-brand-dark bg-white px-2 py-0.5 rounded border border-brand-border">
                    {c.pct}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

