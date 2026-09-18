import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';
import { PriorityBadge } from '../../components/common/PriorityBadge';
import { 
  Building, 
  MapPin, 
  Users, 
  GraduationCap, 
  ArrowRight, 
  Filter, 
  Search, 
  CheckCircle2, 
  DollarSign 
} from 'lucide-react';

export const ProjectDiscoveryPage: React.FC = () => {
  const { challenges, commitIndustrySupport, addToast } = useAppState();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');

  // Filter challenges that are adopted by universities or seeking CSR backing
  const projects = challenges.filter(c => {
    if (selectedCategory !== 'All' && c.category !== selectedCategory) return false;
    if (selectedDistrict !== 'All' && c.district !== selectedDistrict) return false;
    return true;
  });

  const handleSupport = (c: any) => {
    commitIndustrySupport(c.id, {
      partnerName: 'Tata Steel Foundation & CleanTech CSR',
      organization: 'Tata Steel Ltd, Jamshedpur',
      supportType: 'CSR Grant',
      commitmentDetails: 'Grant of ₹3,80,000 and continuous cartridge sponsorship.',
      assignedMentor: 'Er. Rajesh Sharma (Lead Water Treatment Specialist)',
    });
    addToast('CSR Commitment Logged', `Sponsorship committed to ${c.code}.`, 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-brand-textMuted">
          Corporate Social Responsibility Matching
        </span>
        <h1 className="text-2xl font-extrabold text-brand-text mt-0.5">
          Discover University Projects Seeking CSR Sponsorship
        </h1>
        <p className="text-xs text-brand-textMuted mt-1">
          Back high-impact civic engineering prototypes designed by accredited state universities with transparent Section 135 auditability.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-brand-border p-4 shadow-subtle flex flex-wrap items-center gap-3 text-xs">
        <div className="flex items-center gap-1.5 font-bold text-brand-text mr-2">
          <Filter className="w-3.5 h-3.5 text-brand-dark" />
          <span>Filters:</span>
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-brand-bg border border-brand-border rounded-lg px-2.5 py-1.5 font-medium text-brand-text focus:outline-none"
        >
          <option value="All">Category: All</option>
          <option value="Water & Sanitation">Water & Sanitation</option>
          <option value="Roads & Infrastructure">Roads & Infrastructure</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Education">Education</option>
        </select>

        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          className="bg-brand-bg border border-brand-border rounded-lg px-2.5 py-1.5 font-medium text-brand-text focus:outline-none"
        >
          <option value="All">District: All</option>
          <option value="Dumka">Dumka</option>
          <option value="Ranchi">Ranchi</option>
          <option value="Khunti">Khunti</option>
          <option value="Deoghar">Deoghar</option>
        </select>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((c) => {
          const isSupported = !!c.industrySupport;
          return (
            <div
              key={c.id}
              className="bg-white rounded-2xl border border-brand-border p-5 shadow-subtle flex flex-col justify-between space-y-4 hover:border-brand-mint transition"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-brand-dark text-xs bg-brand-bg px-2 py-0.5 rounded border">
                    #{c.code}
                  </span>
                  <PriorityBadge
                    level={c.governmentOverride ? c.governmentOverride.overrideLevel : c.priorityLevel}
                    score={c.governmentOverride ? c.governmentOverride.overrideScore : c.priorityScore}
                    size="sm"
                    showScore
                  />
                </div>

                <Link
                  to={`/challenges/${c.id}`}
                  className="font-bold text-base text-brand-text hover:text-brand-dark block line-clamp-2"
                >
                  {c.title}
                </Link>

                <div className="text-xs text-brand-textMuted space-y-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>{c.locality}, {c.district}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{c.adoption?.university || 'BIT Mesra Innovation Team'}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-brand-bg border border-brand-border text-xs grid grid-cols-2 gap-2 font-mono">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-sans block">People Affected</span>
                    <span className="font-bold text-brand-text">~{c.affectedPopulation.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-sans block">Funding Goal</span>
                    <span className="font-bold text-emerald-700">₹3.8 Lakh</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-brand-border flex items-center justify-between">
                {isSupported ? (
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    Sponsorship Committed
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSupport(c)}
                    className="px-3.5 py-1.5 bg-brand-dark text-brand-mint rounded-lg font-bold text-xs hover:bg-brand-darkSecondary transition"
                  >
                    Commit CSR Support
                  </button>
                )}

                <Link
                  to={`/challenges/${c.id}`}
                  className="text-xs font-bold text-brand-dark hover:underline flex items-center gap-1"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

