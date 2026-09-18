import React from 'react';
import { useAppState } from '../../context/StateContext';
import { ProblemMap } from '../../components/map/ProblemMap';
import { Map, Layers, ShieldCheck } from 'lucide-react';

export const GovernmentMapPage: React.FC = () => {
  const { challenges } = useAppState();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-textMuted">
            Geospatial Intelligence Engine
          </span>
          <h1 className="text-2xl font-extrabold text-brand-text mt-0.5">
            Live GIS Problem Map
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono bg-white px-3 py-1.5 rounded-xl border border-brand-border">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Real-time Telemetry Synced</span>
        </div>
      </div>

      <ProblemMap
        challenges={challenges}
        height="700px"
        showFilters={true}
      />
    </div>
  );
};

