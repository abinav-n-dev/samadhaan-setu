import React, { useState } from 'react';
import { useAppState } from '../../context/StateContext';
import { AuditTimeline } from '../../components/common/AuditTimeline';
import { Clock, Search, Filter } from 'lucide-react';

export const AuditLogPage: React.FC = () => {
  const { auditLogs } = useAppState();
  const [filterRole, setFilterRole] = useState('All');

  const filtered = auditLogs.filter(log => {
    if (filterRole !== 'All' && log.actorRole !== filterRole) return false;
    return true;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-textMuted">
            State Governance & Compliance
          </span>
          <h1 className="text-2xl font-extrabold text-brand-text mt-0.5">
            Administrative Audit Trail
          </h1>
          <p className="text-xs text-brand-textMuted mt-1">
            Tamper-evident record of all citizen submissions, AI duplicate clustering events, government priority overrides, and impact certifications.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <label className="font-semibold text-brand-text">Filter by Actor:</label>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="bg-white border border-brand-border rounded-xl px-3 py-1.5 font-medium text-brand-text focus:outline-none"
          >
            <option value="All">All Roles</option>
            <option value="government">Government</option>
            <option value="student">Student / University</option>
            <option value="mentor">Faculty Mentor</option>
            <option value="industry">Industry / CSR</option>
            <option value="ngo">NGO Field Partner</option>
            <option value="system">AI System Engine</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-brand-border p-6 sm:p-8 shadow-subtle">
        <AuditTimeline logs={filtered} />
      </div>
    </div>
  );
};

