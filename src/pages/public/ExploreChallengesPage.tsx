import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';
import { PriorityBadge } from '../../components/common/PriorityBadge';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ProblemMap } from '../../components/map/ProblemMap';
import { 
  Search, 
  Filter, 
  MapPin, 
  Users, 
  FileText, 
  GraduationCap, 
  ArrowRight,
  SlidersHorizontal,
  X,
  LayoutGrid,
  Map,
  Sparkles,
  Check
} from 'lucide-react';

export const ExploreChallengesPage: React.FC = () => {
  const { challenges, currentUser } = useAppState();
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParam = searchParams.get('q') || '';
  const initialSortBy = (searchParams.get('sortBy') as any) || 'priority';
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedDept, setSelectedDept] = useState('All');
  const [sortBy, setSortBy] = useState<'priority' | 'skillMatch' | 'reports' | 'affected' | 'newest'>(
    ['priority', 'skillMatch', 'reports', 'affected', 'newest'].includes(initialSortBy) ? initialSortBy : 'priority'
  );
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  const userSkills = useMemo(() => {
    return (currentUser?.skills || []).map(s => s.toLowerCase().trim());
  }, [currentUser?.skills]);

  const isSkillMatched = (reqSkill: string, skillsList: string[]) => {
    if (!skillsList || skillsList.length === 0) return false;
    const r = reqSkill.toLowerCase().trim();
    return skillsList.some(u => u.includes(r) || r.includes(u));
  };

  const getChallengeSkillMatch = (reqSkills: string[], skillsList: string[]) => {
    if (!skillsList || skillsList.length === 0 || !reqSkills || reqSkills.length === 0) {
      return { count: 0, percentage: 0 };
    }
    const matched = reqSkills.filter(s => isSkillMatched(s, skillsList));
    const percentage = Math.round((matched.length / reqSkills.length) * 100);
    return { count: matched.length, percentage };
  };

  const districts = useMemo(() => ['All', ...Array.from(new Set(challenges.map(c => c.district)))], [challenges]);
  const categories = useMemo(() => ['All', ...Array.from(new Set(challenges.map(c => c.category)))], [challenges]);
  const departments = useMemo(() => {
    const set = new Set<string>();
    challenges.forEach(c => c.suggestedDepartments.forEach(d => set.add(d)));
    return ['All', ...Array.from(set)];
  }, [challenges]);

  const filtered = useMemo(() => {
    return challenges.filter((c) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match = 
          c.title.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.district.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.requiredSkills.some(s => s.toLowerCase().includes(q));
        if (!match) return false;
      }

      // District
      if (selectedDistrict !== 'All' && c.district !== selectedDistrict) return false;

      // Category
      if (selectedCategory !== 'All' && c.category !== selectedCategory) return false;

      // Priority
      if (selectedPriority !== 'All' && c.priorityLevel !== selectedPriority) return false;

      // Status
      if (selectedStatus !== 'All' && c.status !== selectedStatus) return false;

      // Department
      if (selectedDept !== 'All' && !c.suggestedDepartments.includes(selectedDept)) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'skillMatch') {
        const matchB = getChallengeSkillMatch(b.requiredSkills, userSkills).percentage;
        const matchA = getChallengeSkillMatch(a.requiredSkills, userSkills).percentage;
        if (matchB !== matchA) return matchB - matchA;
        return b.priorityScore - a.priorityScore;
      }
      if (sortBy === 'priority') return b.priorityScore - a.priorityScore;
      if (sortBy === 'reports') return b.reportCount - a.reportCount;
      if (sortBy === 'affected') return b.affectedPopulation - a.affectedPopulation;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return 0;
    });
  }, [challenges, searchQuery, selectedDistrict, selectedCategory, selectedPriority, selectedStatus, selectedDept, sortBy, userSkills]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDistrict('All');
    setSelectedCategory('All');
    setSelectedPriority('All');
    setSelectedStatus('All');
    setSelectedDept('All');
    setSearchParams({});
  };

  const hasActiveFilters = 
    searchQuery.trim() !== '' ||
    selectedDistrict !== 'All' ||
    selectedCategory !== 'All' ||
    selectedPriority !== 'All' ||
    selectedStatus !== 'All' ||
    selectedDept !== 'All';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Academic Discovery & Adoption
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Explore Verified Challenges
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Real-world civic and infrastructure challenges verified by district administrations, ready for university innovation, research, and CSR sponsorship.
          </p>
        </div>

        <Link
          to="/map"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition shrink-0 shadow-xs"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <Map className="w-3.5 h-3.5 text-emerald-600" />
          <span>Full GIS Map View →</span>
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by keywords, challenge code (#JH-WTR-1042), skills, or district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white transition"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-between md:justify-end">
            {/* Solvable with My Skills Toggle Button */}
            <button
              type="button"
              onClick={() => {
                const nextSort = sortBy === 'skillMatch' ? 'priority' : 'skillMatch';
                setSortBy(nextSort);
                if (nextSort === 'skillMatch') {
                  searchParams.set('sortBy', 'skillMatch');
                  setSearchParams(searchParams);
                } else {
                  searchParams.delete('sortBy');
                  setSearchParams(searchParams);
                }
              }}
              title="Rank challenges by compatibility with your profile skills"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
                sortBy === 'skillMatch'
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${sortBy === 'skillMatch' ? 'text-amber-300' : 'text-emerald-600'}`} />
              <span>🎯 Solvable with My Skills</span>
              {userSkills.length > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  sortBy === 'skillMatch' ? 'bg-emerald-800 text-emerald-100' : 'bg-emerald-200 text-emerald-900'
                }`}>
                  {userSkills.length}
                </span>
              )}
            </button>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                  viewMode === 'grid'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Cards</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                  viewMode === 'map'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Map className="w-3.5 h-3.5 text-emerald-600" />
                <span>Live Map</span>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-600 font-semibold pl-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-700" />
              <span>Sort:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => {
                const val = e.target.value as any;
                setSortBy(val);
                if (val === 'skillMatch') {
                  searchParams.set('sortBy', 'skillMatch');
                  setSearchParams(searchParams);
                } else {
                  searchParams.delete('sortBy');
                  setSearchParams(searchParams);
                }
              }}
              aria-label="Sort challenges"
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="priority">Priority Score</option>
              <option value="skillMatch">🎯 Solvable with My Skills</option>
              <option value="reports">Most Reports</option>
              <option value="affected">Most Population</option>
              <option value="newest">Recently Added</option>
            </select>
          </div>
        </div>

        {/* Filter dropdowns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-2 border-t border-gray-100 text-xs">
          {/* District */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">District</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white transition"
            >
              {districts.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white transition"
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Priority</label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white transition"
            >
              <option value="All">All Priorities</option>
              <option value="CRITICAL">Critical (&gt;85)</option>
              <option value="HIGH">High (70-84)</option>
              <option value="MEDIUM">Medium (50-69)</option>
              <option value="LOW">Low (&lt;50)</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white transition"
            >
              <option value="All">All Statuses</option>
              <option value="unverified">Under Review</option>
              <option value="verified">Verified</option>
              <option value="published">Available for Adoption</option>
              <option value="adopted">Adopted by University</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Impact Verified & Resolved</option>
            </select>
          </div>

          {/* Department */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Department</label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white transition"
            >
              {departments.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Skill match active banner */}
        {sortBy === 'skillMatch' && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Ranked by compatibility with your profile skills: <strong>{currentUser?.skills?.join(', ') || 'No skills set in profile'}</strong>
              </span>
            </div>
            <Link
              to="/profile"
              className="text-emerald-700 hover:text-emerald-950 font-bold underline shrink-0 inline-flex items-center gap-1"
            >
              <span>Edit Skills in Profile</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        )}

        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 text-xs border-t border-slate-100">
            <span className="text-slate-500">
              Found <strong className="text-slate-800">{filtered.length}</strong> matching challenges
            </span>
            <button
              onClick={clearFilters}
              className="text-emerald-700 hover:text-emerald-800 hover:underline font-semibold flex items-center gap-1 transition"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset all filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Content: Map or Cards Grid */}
      {viewMode === 'map' ? (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl text-xs text-emerald-950 font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span>Plotted <strong>{filtered.length}</strong> matching challenges across Jharkhand. Click any marker to view summary.</span>
            </div>
            <Link 
              to="/map" 
              className="font-bold text-emerald-800 hover:text-emerald-950 underline inline-flex items-center gap-1 shrink-0"
            >
              <span>Open Full-Screen GIS Map with Telemetry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <ProblemMap challenges={filtered} height="640px" showFilters={false} />
        </div>
      ) : (
        /* Challenge Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((challenge) => {
            const skillMatch = getChallengeSkillMatch(challenge.requiredSkills, userSkills);
            return (
              <div
                key={challenge.id}
                className="bg-white rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-md transition duration-200 flex flex-col justify-between overflow-hidden"
              >
                <div className="p-5 space-y-4">
                  {/* Card Top: Code, Priority & Skill Match Badge */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        #{challenge.code}
                      </span>
                      {skillMatch.percentage > 0 && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-2xs">
                          <Sparkles className="w-3 h-3 text-emerald-600" />
                          <span>{skillMatch.percentage}% Match</span>
                        </span>
                      )}
                    </div>
                    <PriorityBadge
                      level={challenge.priorityLevel}
                      score={challenge.priorityScore}
                      showScore
                    />
                  </div>

                  {/* Title & Location */}
                  <div>
                    <Link
                      to={`/challenges/${challenge.id}`}
                      className="font-bold text-base text-slate-900 hover:text-emerald-700 line-clamp-2 leading-snug transition-colors"
                    >
                      {challenge.title}
                    </Link>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span className="truncate">{challenge.locality}, {challenge.district}</span>
                    </div>
                  </div>

                  {/* Description snippet */}
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {challenge.description}
                  </p>

                  {/* Key Indicators */}
                  <div className="grid grid-cols-2 gap-2 py-2 px-3 bg-slate-50 border border-slate-100 rounded-lg text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Citizen Signal</span>
                      <span className="font-mono font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                        <FileText className="w-3.5 h-3.5 text-slate-500" />
                        {challenge.reportCount} reports
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Affected Pop.</span>
                      <span className="font-mono font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                        <Users className="w-3.5 h-3.5 text-slate-500" />
                        ~{challenge.affectedPopulation.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Required Skills with Matched Highlights */}
                  {challenge.requiredSkills && challenge.requiredSkills.length > 0 && (
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                        Required Skills:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {challenge.requiredSkills.map((skill) => {
                          const matched = isSkillMatched(skill, userSkills);
                          return (
                            <span
                              key={skill}
                              className={`text-[10px] px-2 py-0.5 rounded font-medium border flex items-center gap-1 transition ${
                                matched
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold'
                                  : 'bg-slate-100 text-slate-600 border-slate-200'
                              }`}
                            >
                              {matched && <Check className="w-2.5 h-2.5 text-emerald-600 stroke-[3]" />}
                              <span>{skill}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Suggested Departments */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Suggested Academic Disciplines:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {challenge.suggestedDepartments.slice(0, 2).map((dept) => (
                        <span
                          key={dept}
                          className="text-[11px] bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded font-medium truncate max-w-[200px]"
                        >
                          {dept}
                        </span>
                      ))}
                      {challenge.suggestedDepartments.length > 2 && (
                        <span className="text-[10px] text-slate-400 self-center">
                          +{challenge.suggestedDepartments.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-3.5 bg-slate-50/80 border-t border-slate-200 flex items-center justify-between gap-2">
                  <StatusBadge status={challenge.status} size="sm" />

                  <Link
                    to={`/challenges/${challenge.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

