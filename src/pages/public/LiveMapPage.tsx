import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';
import { ProblemMap } from '../../components/map/ProblemMap';
import { PriorityBadge } from '../../components/common/PriorityBadge';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Challenge } from '../../types';
import { 
  MapPin, 
  Users, 
  FileText, 
  ArrowRight, 
  GraduationCap, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Flame, 
  Sparkles,
  Search, 
  Filter, 
  ChevronRight, 
  X,
  Compass,
  Building2,
  ExternalLink
} from 'lucide-react';

export const LiveMapPage: React.FC = () => {
  const { challenges } = useAppState();
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get('id');

  // Selected challenge state (defaults to URL param or the highest priority critical challenge)
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(() => {
    if (initialId) {
      const found = challenges.find(c => c.id === initialId);
      if (found) return found;
    }
    // Default to the highest priority challenge
    return [...challenges].sort((a, b) => b.priorityScore - a.priorityScore)[0] || null;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [activeDistrict, setActiveDistrict] = useState<string>('All');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Quick district list for instant jumping
  const topDistricts = ['All', 'Dumka', 'Dhanbad', 'Ranchi', 'East Singhbhum', 'Hazaribagh', 'Bokaro'];

  // Categories list
  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(challenges.map(c => c.category)))];
  }, [challenges]);

  // Telemetry aggregates
  const stats = useMemo(() => {
    const total = challenges.length;
    const critical = challenges.filter(c => c.priorityLevel === 'CRITICAL' && c.status !== 'resolved').length;
    const adopted = challenges.filter(c => ['adopted', 'in_progress'].includes(c.status)).length;
    const resolved = challenges.filter(c => c.status === 'resolved').length;
    const totalAffected = challenges.reduce((acc, c) => acc + (c.affectedPopulation || 0), 0);
    return { total, critical, adopted, resolved, totalAffected };
  }, [challenges]);

  // Filtered challenges for the map and list
  const displayedChallenges = useMemo(() => {
    return challenges.filter(c => {
      if (activeDistrict !== 'All' && c.district !== activeDistrict) return false;
      if (activeCategory !== 'All' && c.category !== activeCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          c.title.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q) ||
          c.district.toLowerCase().includes(q) ||
          c.locality.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [challenges, activeDistrict, activeCategory, searchQuery]);

  return (
    <div className="space-y-5 pb-8">
      {/* Header & Live GIS Telemetry Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Telemetry Active
              </span>
              <span className="text-xs text-slate-500 font-mono">Jharkhand State Spatial GIS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1.5 tracking-tight">
              Live GIS Problem Map
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Real-time geospatial distribution of verified civic challenges. Click any pin to inspect verified severity, population impact, and university adoption status.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/citizen/report"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-xs"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Report Local Problem</span>
            </Link>
            <Link
              to="/explore"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100 transition"
            >
              <span>Explore List View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Telemetry Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div className="text-slate-500 text-[11px] font-medium uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-700" />
              <span>Plotted Problems</span>
            </div>
            <div className="text-xl font-extrabold text-slate-900 font-mono mt-1">
              {stats.total}
            </div>
          </div>

          <div className="p-3 bg-rose-50/70 rounded-lg border border-rose-200">
            <div className="text-rose-700 text-[11px] font-medium uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-rose-600" />
              <span>Critical Hotspots</span>
            </div>
            <div className="text-xl font-extrabold text-rose-700 font-mono mt-1">
              {stats.critical}
            </div>
          </div>

          <div className="p-3 bg-indigo-50/70 rounded-lg border border-indigo-200">
            <div className="text-indigo-700 text-[11px] font-medium uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
              <span>Univ. Adopted</span>
            </div>
            <div className="text-xl font-extrabold text-indigo-700 font-mono mt-1">
              {stats.adopted}
            </div>
          </div>

          <div className="p-3 bg-emerald-50/70 rounded-lg border border-emerald-200">
            <div className="text-emerald-800 text-[11px] font-medium uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Impact Verified</span>
            </div>
            <div className="text-xl font-extrabold text-emerald-800 font-mono mt-1">
              {stats.resolved}
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div className="text-slate-500 text-[11px] font-medium uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-slate-700" />
              <span>Citizens Impacted</span>
            </div>
            <div className="text-xl font-extrabold text-slate-900 font-mono mt-1">
              ~{stats.totalAffected.toLocaleString()}
            </div>
          </div>
        </div>

        {/* District Quick Bar & Search */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pt-2">
          {/* Quick District Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase shrink-0 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              District:
            </span>
            {topDistricts.map(dist => (
              <button
                key={dist}
                type="button"
                onClick={() => setActiveDistrict(dist)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition ${
                  activeDistrict === dist
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
                }`}
              >
                {dist}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full lg:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Filter by title, block, #JH-..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-7 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Interactive Map + Details Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Leaflet GIS Map */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-3">
          <ProblemMap
            challenges={displayedChallenges}
            selectedChallengeId={selectedChallenge?.id}
            onSelectChallenge={(challenge) => setSelectedChallenge(challenge)}
            height="620px"
            showFilters={true}
          />

          {/* Map Helper Guide */}
          <div className="bg-white rounded-xl border border-slate-200 p-3 flex items-center justify-between text-xs text-slate-600 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Tip: Click any marker on the map to inspect full problem analytics in the side panel.</span>
            </div>
            <span className="font-mono text-[11px] font-semibold text-slate-700">{displayedChallenges.length} challenges displayed</span>
          </div>
        </div>

        {/* Right Column: Problem Details Panel */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-4">
          {selectedChallenge ? (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4 animate-in fade-in duration-200">
              {/* Header: Code & Priority */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                    #{selectedChallenge.code}
                  </span>
                  <StatusBadge status={selectedChallenge.status} size="sm" />
                </div>
                <PriorityBadge 
                  level={selectedChallenge.priorityLevel} 
                  score={selectedChallenge.priorityScore} 
                  size="sm" 
                  showScore 
                />
              </div>

              {/* Title & Location */}
              <div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {selectedChallenge.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span className="font-medium text-slate-700">{selectedChallenge.locality}, {selectedChallenge.district}</span>
                  <span className="text-slate-300">•</span>
                  <span className="font-mono text-[11px] text-slate-400">
                    {selectedChallenge.coordinates.lat.toFixed(3)}°N, {selectedChallenge.coordinates.lng.toFixed(3)}°E
                  </span>
                </div>
              </div>

              {/* Category & Department */}
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                <span className="px-2 py-0.5 rounded-md font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                  {selectedChallenge.category}
                </span>
                {selectedChallenge.suggestedDepartments.map(dept => (
                  <span key={dept} className="px-2 py-0.5 rounded-md font-medium bg-slate-50 text-slate-600 border border-slate-200">
                    {dept}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
                {selectedChallenge.description}
              </p>

              {/* Impact & Citizen Signal Metrics */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Affected Population</span>
                  <span className="font-mono text-sm font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
                    <Users className="w-3.5 h-3.5 text-slate-600" />
                    ~{selectedChallenge.affectedPopulation.toLocaleString()}
                  </span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Citizen Reports</span>
                  <span className="font-mono text-sm font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
                    <FileText className="w-3.5 h-3.5 text-slate-600" />
                    {selectedChallenge.reportCount} Verified
                  </span>
                </div>
              </div>

              {/* AI Priority Breakdown Scores */}
              {selectedChallenge.breakdown && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <span>AI Priority Engine Breakdown</span>
                    <span className="font-mono text-slate-900 font-bold">{selectedChallenge.priorityScore}/100</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
                    <div className="bg-slate-50 p-1.5 rounded-md border border-slate-200">
                      <div className="text-slate-400 font-semibold">Severity</div>
                      <div className="font-mono font-bold text-slate-800 mt-0.5">
                        {selectedChallenge.breakdown.severity}/30
                      </div>
                    </div>
                    <div className="bg-slate-50 p-1.5 rounded-md border border-slate-200">
                      <div className="text-slate-400 font-semibold">Impact</div>
                      <div className="font-mono font-bold text-slate-800 mt-0.5">
                        {selectedChallenge.breakdown.populationImpact}/25
                      </div>
                    </div>
                    <div className="bg-slate-50 p-1.5 rounded-md border border-slate-200">
                      <div className="text-slate-400 font-semibold">Urgency</div>
                      <div className="font-mono font-bold text-slate-800 mt-0.5">
                        {selectedChallenge.breakdown.urgency}/15
                      </div>
                    </div>
                    <div className="bg-slate-50 p-1.5 rounded-md border border-slate-200">
                      <div className="text-slate-400 font-semibold">Spread</div>
                      <div className="font-mono font-bold text-slate-800 mt-0.5">
                        {selectedChallenge.breakdown.geographicSpread}/15
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* University Adoption Status */}
              {selectedChallenge.adoption ? (
                <div className="p-3 bg-indigo-50/80 border border-indigo-200 rounded-lg space-y-1 text-xs text-indigo-900">
                  <div className="flex items-center gap-1.5 font-bold text-indigo-950">
                    <GraduationCap className="w-4 h-4 text-indigo-600" />
                    <span>Adopted by {selectedChallenge.adoption.university}</span>
                  </div>
                  <p className="text-[11px] text-indigo-700">
                    Team: <strong>{selectedChallenge.adoption.teamName}</strong> • Mentor: {selectedChallenge.adoption.facultyMentor}
                  </p>
                </div>
              ) : (
                <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-lg flex items-center justify-between text-xs text-amber-900">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Open for University Innovation & CSR Adoption</span>
                  </div>
                </div>
              )}

              {/* Required Skills */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Required Student Innovation Skills:
                </span>
                <div className="flex flex-wrap gap-1">
                  {selectedChallenge.requiredSkills.map(skill => (
                    <span key={skill} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium border border-slate-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Primary Call to Action */}
              <div className="pt-2 flex flex-col gap-2">
                <Link
                  to={`/challenges/${selectedChallenge.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold py-2.5 px-4 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-xs"
                >
                  <span>Open Full Challenge Dossier</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>

                <Link
                  to={`/citizen/report?district=${encodeURIComponent(selectedChallenge.district)}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2 px-3 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100 transition border border-slate-200"
                >
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>Report Related Issue in {selectedChallenge.district}</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center space-y-3 shadow-xs">
              <Compass className="w-10 h-10 text-slate-300 mx-auto" />
              <h4 className="font-bold text-sm text-slate-900">Select a Pin on the Map</h4>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                Click any colored pin across Jharkhand to view real-time problem analytics, citizen signals, and adoption details.
              </p>
            </div>
          )}

          {/* Quick List of Other Hotspots */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2.5 shadow-xs text-xs">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <span className="font-bold text-slate-900">Nearby Hotspots ({displayedChallenges.length})</span>
              <span className="text-[10px] text-slate-500 uppercase font-mono">Top Priority</span>
            </div>

            <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
              {displayedChallenges.slice(0, 6).map(c => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedChallenge(c)}
                  className={`w-full text-left p-2 rounded-lg transition flex items-center justify-between gap-2 border ${
                    selectedChallenge?.id === c.id
                      ? 'bg-emerald-50/70 border-emerald-500 text-slate-900 font-semibold shadow-xs'
                      : 'hover:bg-slate-50 border-slate-100 text-slate-700'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-xs truncate">{c.title}</div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{c.locality}, {c.district}</span>
                    </div>
                  </div>
                  <PriorityBadge level={c.priorityLevel} score={c.priorityScore} size="sm" showScore />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
