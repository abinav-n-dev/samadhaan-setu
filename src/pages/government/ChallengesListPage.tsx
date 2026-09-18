import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';
import { PriorityBadge } from '../../components/common/PriorityBadge';
import { StatusBadge } from '../../components/common/StatusBadge';
import { 
  FileText, 
  MapPin, 
  Users, 
  ArrowRight, 
  Filter, 
  Search, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const ChallengesListPage: React.FC = () => {
  const { challenges, verifyChallenge } = useAppState();
  const [filterText, setFilterText] = useState('');

  const filtered = challenges.filter(c => 
    c.title.toLowerCase().includes(filterText.toLowerCase()) ||
    c.code.toLowerCase().includes(filterText.toLowerCase()) ||
    c.district.toLowerCase().includes(filterText.toLowerCase()) ||
    c.category.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-textMuted">
            State Master Registry
          </span>
          <h1 className="text-2xl font-extrabold text-brand-text mt-0.5">
            Registered Challenges
          </h1>
          <p className="text-xs text-brand-textMuted mt-1">
            Complete administrative catalog of active, verified, and resolved community problems in Jharkhand.
          </p>
        </div>

        <div className="relative w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Filter by title, code, district..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-white border border-brand-border rounded-xl text-xs text-brand-text placeholder-gray-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-brand-border shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-brand-bg text-brand-text border-b border-brand-border font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3.5">Challenge</th>
                <th className="p-3.5">District / Locality</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Priority</th>
                <th className="p-3.5">Reports</th>
                <th className="p-3.5">Affected</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/60 transition">
                  <td className="p-3.5 font-medium">
                    <div className="font-mono font-bold text-brand-dark">#{c.code}</div>
                    <div className="font-semibold text-brand-text line-clamp-1 max-w-xs">{c.title}</div>
                  </td>
                  <td className="p-3.5 text-brand-textMuted">
                    <div>{c.district}</div>
                    <div className="text-[11px] text-gray-400">{c.locality}</div>
                  </td>
                  <td className="p-3.5 text-brand-text font-medium">{c.category}</td>
                  <td className="p-3.5">
                    <PriorityBadge
                      level={c.governmentOverride ? c.governmentOverride.overrideLevel : c.priorityLevel}
                      score={c.governmentOverride ? c.governmentOverride.overrideScore : c.priorityScore}
                      size="sm"
                      showScore
                    />
                  </td>
                  <td className="p-3.5 font-mono font-bold text-brand-text">{c.reportCount}</td>
                  <td className="p-3.5 font-mono text-brand-textMuted">~{c.affectedPopulation.toLocaleString()}</td>
                  <td className="p-3.5">
                    <StatusBadge status={c.status} size="sm" />
                  </td>
                  <td className="p-3.5 text-right">
                    <Link
                      to={`/challenges/${c.id}`}
                      className="inline-flex items-center gap-1 font-bold text-brand-dark hover:underline"
                    >
                      <span>Manage</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

