import React from 'react';
import { Link } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';
import { 
  CheckCircle2, 
  MapPin, 
  Users, 
  GraduationCap, 
  Building, 
  ArrowRight, 
  FileCheck2,
  TrendingDown,
  Sparkles
} from 'lucide-react';

export const SolutionsPage: React.FC = () => {
  const { credentials } = useAppState();

  const solutions = [
    {
      credentialId: 'SS-2026-1042',
      challengeCode: 'JH-WTR-1042',
      title: 'Solar Water Micro-Filtration & Fluoride Remediation Kiosk',
      district: 'Dumka, Jharkhand',
      university: 'Birla Institute of Technology (BIT) Mesra',
      partner: 'Tata Steel Foundation CSR',
      ngo: 'Pratham Gramin Vikas Trust',
      beneficiaries: 2615,
      beforeMetric: 'TDS: 890 ppm | Fluoride: 3.8 mg/L',
      afterMetric: 'TDS: 142 ppm | Fluoride: 0.45 mg/L',
      beforeImpact: 'Frequent pediatric acute fluorosis & gastrointestinal cramps',
      afterImpact: 'Clean WHO-grade drinking water for 3 entire tribal villages',
      image: '/images/water-remediated.svg',
    },
    {
      credentialId: 'SS-2025-0814',
      challengeCode: 'JH-AGR-0814',
      title: 'Phase-Change Material Solar Cold Room for Smallholders',
      district: 'Ranchi, Jharkhand',
      university: 'Birsa Agricultural University (BAU) Ranchi',
      partner: 'Jindal Steel & Power CSR',
      ngo: 'Jharkhand State Livelihood Promotion Society (JSLPS)',
      beneficiaries: 1420,
      beforeMetric: 'Post-harvest spoilage: 38% loss in 48 hours',
      afterMetric: 'Spoilage reduced to < 4% with 14-day shelf life',
      beforeImpact: 'Distress sales forcing farmers to sell at ₹4/kg during glut',
      afterImpact: 'Collective cold holding enables orderly auction at ₹18/kg',
      image: '/images/cold-storage.svg',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-brand-textMuted">
          Verified Field Impact Portfolio
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text mt-1">
          Proven Solutions & Implemented Pilots
        </h1>
        <p className="text-xs sm:text-sm text-brand-textMuted mt-1">
          Explore civic-tech interventions that completed the full lifecycle: from citizen complaint clustering to university engineering, corporate sponsorship, and official government impact certification.
        </p>
      </div>

      <div className="space-y-6">
        {solutions.map((sol) => (
          <div
            key={sol.credentialId}
            className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 shadow-elevated grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
          >
            <div className="lg:col-span-4 rounded-2xl overflow-hidden border border-brand-border bg-gray-100 h-64 lg:h-full">
              <img
                src={sol.image}
                alt={sol.title}
                onError={(e) => {
                  const target = e.currentTarget;
                  target.onerror = null;
                  target.src = "/images/field-evidence.svg";
                }}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-extrabold text-brand-dark bg-brand-bg px-2.5 py-1 rounded border border-brand-border">
                    #{sol.challengeCode}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-brand-mintSoft px-2.5 py-0.5 rounded-full border border-brand-mint">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Government Impact Certified
                  </span>
                </div>

                <span className="text-xs text-brand-textMuted flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <strong>{sol.district}</strong>
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-brand-text">
                {sol.title}
              </h3>

              {/* Stakeholders pill grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-[10px] text-gray-400 font-bold uppercase block">University R&D</span>
                  <span className="font-semibold text-brand-text truncate block mt-0.5">{sol.university}</span>
                </div>
                <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-[10px] text-gray-400 font-bold uppercase block">Industry Sponsor</span>
                  <span className="font-semibold text-brand-text truncate block mt-0.5">{sol.partner}</span>
                </div>
                <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-[10px] text-gray-400 font-bold uppercase block">Field Deployer</span>
                  <span className="font-semibold text-brand-text truncate block mt-0.5">{sol.ngo}</span>
                </div>
              </div>

              {/* Before vs After comparative metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-red-50/60 border border-red-200 rounded-xl text-xs space-y-1">
                  <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider block">
                    Before Implementation
                  </span>
                  <p className="font-mono font-bold text-brand-text">{sol.beforeMetric}</p>
                  <p className="text-red-700 text-[11px]">{sol.beforeImpact}</p>
                </div>

                <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl text-xs space-y-1">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                    Verified Measured Impact
                  </span>
                  <p className="font-mono font-bold text-brand-text">{sol.afterMetric}</p>
                  <p className="text-emerald-700 text-[11px]">{sol.afterImpact}</p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-brand-text font-bold">
                  <Users className="w-4 h-4 text-brand-dark" />
                  <span>{sol.beneficiaries.toLocaleString()} Citizens Impacted</span>
                </div>

                <Link
                  to={`/verify/${sol.credentialId}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-dark bg-brand-bg hover:bg-brand-mint hover:text-brand-dark px-4 py-2 rounded-xl border border-brand-border transition"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>Verify Credential #{sol.credentialId}</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

