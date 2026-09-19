import React from 'react';

interface SamadhanLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  textColor?: 'dark' | 'light';
}

export const SamadhanLogo: React.FC<SamadhanLogoProps> = ({
  size = 32,
  className = '',
  showText = false,
  textColor = 'dark',
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-200 hover:scale-105"
        aria-label="SamadhanSetu Logo"
      >
        <defs>
          <linearGradient id="ssBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="60%" stopColor="#065f46" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="ssBridgeGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="50%" stopColor="#6ee7b7" />
            <stop offset="100%" stopColor="#a7f3d0" />
          </linearGradient>
          <linearGradient id="ssGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>

        {/* Outer Squircle Container with Subtle Emerald Glow Border */}
        <rect
          x="1.5"
          y="1.5"
          width="45"
          height="45"
          rx="12"
          fill="url(#ssBgGrad)"
          stroke="#34d399"
          strokeOpacity="0.4"
          strokeWidth="1.2"
        />

        {/* Ambient Top Glow Arc */}
        <path
          d="M 8 13 C 16 7, 32 7, 40 13"
          stroke="#6ee7b7"
          strokeWidth="0.8"
          strokeOpacity="0.3"
          strokeDasharray="2 3"
        />

        {/* Foundation Deck (The Ground & Bridge Road) */}
        <path
          d="M 6 35 L 42 35"
          stroke="#ffffff"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        {/* Support Pier Pillars */}
        <rect x="8" y="35" width="2.6" height="4.5" rx="1" fill="#34d399" />
        <rect x="37.4" y="35" width="2.6" height="4.5" rx="1" fill="#34d399" />

        {/* Primary Setu Parabolic Suspension Arch */}
        <path
          d="M 8 35 C 15 19, 33 19, 40 35"
          stroke="url(#ssBridgeGrad)"
          strokeWidth="2.6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Secondary Inner Arch */}
        <path
          d="M 12 35 C 17 24, 31 24, 36 35"
          stroke="#6ee7b7"
          strokeWidth="1.2"
          strokeOpacity="0.65"
          strokeLinecap="round"
          fill="none"
        />

        {/* Vertical Suspension Tension Cables */}
        <line x1="16" y1="26" x2="16" y2="35" stroke="#a7f3d0" strokeWidth="1.2" strokeOpacity="0.85" strokeLinecap="round" />
        <line x1="20" y1="22.5" x2="20" y2="35" stroke="#a7f3d0" strokeWidth="1.2" strokeOpacity="0.85" strokeLinecap="round" />
        <line x1="24" y1="21" x2="24" y2="35" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.95" strokeLinecap="round" />
        <line x1="28" y1="22.5" x2="28" y2="35" stroke="#a7f3d0" strokeWidth="1.2" strokeOpacity="0.85" strokeLinecap="round" />
        <line x1="32" y1="26" x2="32" y2="35" stroke="#a7f3d0" strokeWidth="1.2" strokeOpacity="0.85" strokeLinecap="round" />

        {/* Samadhan Solution Star / Apex Radiant Beacon */}
        <g transform="translate(24, 12)">
          {/* Subtle Beacon Halo */}
          <circle cx="0" cy="0" r="5.5" fill="#fef08a" fillOpacity="0.25" />
          {/* 4-Point Radiant Spark */}
          <path
            d="M 0 -6.5 Q 0 0, -6.5 0 Q 0 0, 0 6.5 Q 0 0, 6.5 0 Q 0 0, 0 -6.5 Z"
            fill="url(#ssGoldGrad)"
          />
          {/* Central Bright Diamond Core */}
          <circle cx="0" cy="0" r="2.2" fill="#ffffff" />
        </g>
      </svg>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-bold tracking-tight text-sm font-sans ${
            textColor === 'light' ? 'text-white' : 'text-slate-900'
          }`}>
            SAMADHAN<span className="text-emerald-500 font-extrabold">SETU</span>
          </span>
          <span className={`text-[10px] font-medium tracking-wide mt-0.5 ${
            textColor === 'light' ? 'text-slate-400' : 'text-slate-500'
          }`}>
            झारखण्ड जन-समाधान सेतु
          </span>
        </div>
      )}
    </div>
  );
};

