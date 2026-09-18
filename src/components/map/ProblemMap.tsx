import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Challenge, PriorityLevel } from '../../types';
import { MapPopupContent } from './MapPopupContent';
import { Layers, Filter, RefreshCw, ZoomIn, ZoomOut, CheckCircle2 } from 'lucide-react';

interface ProblemMapProps {
  challenges: Challenge[];
  selectedChallengeId?: string;
  height?: string;
  showFilters?: boolean;
}

// Custom Leaflet DivIcon generator
const createCustomMarkerIcon = (challenge: Challenge, activeLayer: string) => {
  let color = '#4DAA78'; // Low (green)
  let ringColor = 'rgba(77, 170, 120, 0.4)';
  let label = challenge.priorityScore.toString();

  if (challenge.status === 'resolved') {
    color = '#0D9488'; // Teal
    ringColor = 'rgba(13, 148, 136, 0.4)';
    label = '✓';
  } else if (challenge.status === 'adopted' || challenge.status === 'in_progress') {
    color = '#4F46E5'; // Indigo
    ringColor = 'rgba(79, 70, 229, 0.4)';
  } else if (challenge.priorityLevel === 'CRITICAL') {
    color = '#DC4444'; // Red
    ringColor = 'rgba(220, 68, 68, 0.4)';
  } else if (challenge.priorityLevel === 'HIGH') {
    color = '#F08A3C'; // Orange
    ringColor = 'rgba(240, 138, 60, 0.4)';
  } else if (challenge.priorityLevel === 'MEDIUM') {
    color = '#E4B84A'; // Amber
    ringColor = 'rgba(228, 184, 74, 0.4)';
  }

  const isCritical = challenge.priorityLevel === 'CRITICAL' && challenge.status !== 'resolved';

  const html = `
    <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 36px; height: 36px;">
      ${isCritical ? `<div style="position: absolute; width: 36px; height: 36px; border-radius: 50%; background: ${ringColor}; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>` : ''}
      <div style="position: relative; width: 28px; height: 28px; border-radius: 50%; background: ${color}; border: 2.5px solid #ffffff; box-shadow: 0 4px 8px rgba(0,0,0,0.25); display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 11px; font-family: 'Plus Jakarta Sans', sans-serif;">
        ${label}
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-gis-pin',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
  });
};

// Map controller component to pan to selected challenge
const MapController: React.FC<{ targetLocation?: [number, number] }> = ({ targetLocation }) => {
  const map = useMap();
  React.useEffect(() => {
    if (targetLocation) {
      map.flyTo(targetLocation, 12, { duration: 1.2 });
    }
  }, [targetLocation, map]);
  return null;
};

export const ProblemMap: React.FC<ProblemMapProps> = ({
  challenges,
  selectedChallengeId,
  height = '540px',
  showFilters = true,
}) => {
  const [districtFilter, setDistrictFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [activeLayer, setActiveLayer] = useState<'All' | 'Critical' | 'Adopted' | 'Resolved'>('All');

  // Jharkhand centroid coordinates
  const defaultCenter: [number, number] = [23.8, 85.8];
  const defaultZoom = 8;

  // Unique filter choices
  const districts = useMemo(() => ['All', ...Array.from(new Set(challenges.map(c => c.district)))], [challenges]);
  const categories = useMemo(() => ['All', ...Array.from(new Set(challenges.map(c => c.category)))], [challenges]);

  // Filtered challenges
  const filteredChallenges = useMemo(() => {
    return challenges.filter((c) => {
      if (districtFilter !== 'All' && c.district !== districtFilter) return false;
      if (categoryFilter !== 'All' && c.category !== categoryFilter) return false;
      if (priorityFilter !== 'All' && c.priorityLevel !== priorityFilter) return false;
      if (statusFilter !== 'All' && c.status !== statusFilter) return false;

      if (activeLayer === 'Critical' && c.priorityLevel !== 'CRITICAL') return false;
      if (activeLayer === 'Adopted' && !['adopted', 'in_progress'].includes(c.status)) return false;
      if (activeLayer === 'Resolved' && c.status !== 'resolved') return false;

      return true;
    });
  }, [challenges, districtFilter, categoryFilter, priorityFilter, statusFilter, activeLayer]);

  const selectedTarget = useMemo(() => {
    if (!selectedChallengeId) return undefined;
    const found = challenges.find(c => c.id === selectedChallengeId);
    return found ? [found.coordinates.lat, found.coordinates.lng] as [number, number] : undefined;
  }, [challenges, selectedChallengeId]);

  return (
    <div className="bg-white rounded-xl border border-brand-border shadow-subtle overflow-hidden flex flex-col">
      {/* Top Filter Bar */}
      {showFilters && (
        <div className="p-3.5 bg-brand-bg border-b border-brand-border flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-brand-text font-bold mr-1">
              <Filter className="w-3.5 h-3.5 text-brand-dark" />
              <span>GIS Layer Filters:</span>
            </div>

            {/* District */}
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              aria-label="Filter challenges by district"
              className="bg-white border border-brand-border rounded-lg px-2.5 py-1.5 font-medium text-brand-text focus:outline-none focus:ring-1 focus:ring-brand-mint"
            >
              {districts.map(d => (
                <option key={d} value={d}>District: {d}</option>
              ))}
            </select>

            {/* Category */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              aria-label="Filter challenges by category"
              className="bg-white border border-brand-border rounded-lg px-2.5 py-1.5 font-medium text-brand-text focus:outline-none focus:ring-1 focus:ring-brand-mint"
            >
              {categories.map(c => (
                <option key={c} value={c}>Category: {c}</option>
              ))}
            </select>

            {/* Priority */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              aria-label="Filter challenges by priority level"
              className="bg-white border border-brand-border rounded-lg px-2.5 py-1.5 font-medium text-brand-text focus:outline-none focus:ring-1 focus:ring-brand-mint"
            >
              <option value="All">Priority: All</option>
              <option value="CRITICAL">Critical (85+)</option>
              <option value="HIGH">High (70-84)</option>
              <option value="MEDIUM">Medium (50-69)</option>
              <option value="LOW">Low (&lt;50)</option>
            </select>
          </div>

          {/* Layer toggles */}
          <div className="flex items-center gap-1 bg-white border border-brand-border p-1 rounded-lg">
            {(['All', 'Critical', 'Adopted', 'Resolved'] as const).map((layer) => (
              <button
                key={layer}
                onClick={() => setActiveLayer(layer)}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold transition ${
                  activeLayer === layer
                    ? 'bg-brand-dark text-brand-mint shadow-xs'
                    : 'text-brand-textMuted hover:text-brand-text'
                }`}
              >
                {layer}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Map Container */}
      <div className="relative w-full" style={{ height }}>
        <MapContainer
          center={selectedTarget || defaultCenter}
          zoom={selectedTarget ? 11 : defaultZoom}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapController targetLocation={selectedTarget} />

          {filteredChallenges.map((challenge) => (
            <Marker
              key={challenge.id}
              position={[challenge.coordinates.lat, challenge.coordinates.lng]}
              icon={createCustomMarkerIcon(challenge, activeLayer)}
            >
              <Popup>
                <MapPopupContent challenge={challenge} />
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Live sync badge on map */}
        <div className="absolute top-3 right-3 z-[1000] bg-white/95 backdrop-blur border border-brand-border rounded-lg px-3 py-1.5 shadow-subtle flex items-center gap-2 text-xs">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-brand-dark">GIS Live Feed</span>
          <span className="text-[11px] text-brand-textMuted font-mono border-l pl-2">
            {filteredChallenges.length} pins plotted
          </span>
        </div>

        {/* Floating Map Legend */}
        <div className="absolute bottom-4 left-4 z-[1000] bg-white/95 backdrop-blur border border-brand-border rounded-xl p-3 shadow-subtle text-[11px] space-y-1.5 max-w-[210px]">
          <div className="font-bold text-xs text-brand-text uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Map Layers</span>
            <span className="text-[10px] text-gray-400 font-mono">Jharkhand</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 flex-shrink-0" />
            <span className="text-gray-700">Critical Priority (&gt;85)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 flex-shrink-0" />
            <span className="text-gray-700">High Priority (70–84)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 flex-shrink-0" />
            <span className="text-gray-700">Medium Priority (50–69)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 flex-shrink-0" />
            <span className="text-gray-700">University Adopted</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-600 flex-shrink-0" />
            <span className="text-gray-700">Impact Verified (✓)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

