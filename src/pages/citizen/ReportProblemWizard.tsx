import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';
import { 
  CheckCircle2, 
  MapPin, 
  Upload, 
  Camera, 
  AlertCircle, 
  FileText, 
  Users, 
  ArrowRight, 
  ArrowLeft, 
  Navigation, 
  Sparkles, 
  Layers, 
  Check, 
  X, 
  Trash2, 
  Share2, 
  Zap, 
  Sliders, 
  PhoneCall, 
  RefreshCw,
  ImageIcon,
  Droplets,
  Construction,
  HeartPulse,
  Sprout,
  Info,
  Send
} from 'lucide-react';
import { analyzeReportSimilarity } from '../../services/duplicateService';

interface CompressedPhoto {
  dataUrl: string;
  originalSize: number;
  compressedSize: number;
  ratio: number;
  name: string;
}

// Preset Quick Categories with 1-Click Auto-Fill Templates
const QUICK_TEMPLATES = [
  {
    category: 'Water & Sanitation',
    labelEn: 'Drinking Water',
    labelHi: 'पेय जल समस्या',
    templates: [
      {
        title: 'Severe turbidity & foul smell in village drinking water pump',
        description: 'Water has turned yellow-brown with high TDS and pungent smell. Over 180 residents and school children are facing acute stomach distress. Immediate laboratory testing and water filtration kiosk required.',
        affected: 180,
        urgency: 'Emergency' as const,
      },
      {
        title: 'Borewell handpump broken & non-functional for 3 weeks',
        description: 'Community handpump cylinder has collapsed. Women and elderly residents have to walk over 2.5 km daily to fetch non-potable water from open pond.',
        affected: 120,
        urgency: 'High' as const,
      },
      {
        title: 'Suspected high fluoride & iron contamination in supply well',
        description: 'Locals displaying symptoms of dental fluorosis and joint pain. Water residue leaves white-yellow crusts on utensils. Water quality testing and defluoridation unit urgently needed.',
        affected: 250,
        urgency: 'High' as const,
      }
    ]
  },
  {
    category: 'Roads & Infrastructure',
    labelEn: 'Roads & Potholes',
    labelHi: 'सड़क व पुलिया',
    templates: [
      {
        title: 'Massive waterlogged potholes blocking school & ambulance access',
        description: 'Heavy rains have cratered the main connecting road. Two auto-rickshaws overturned this week. Emergency vehicles cannot reach the local primary health center.',
        affected: 300,
        urgency: 'High' as const,
      },
      {
        title: 'Culvert bridge partially washed away after heavy rain',
        description: 'Drainage culvert embankment collapsed. Motorbike and cart traffic completely halted between villages.',
        affected: 450,
        urgency: 'Emergency' as const,
      }
    ]
  },
  {
    category: 'Electricity & Solar',
    labelEn: 'Solar & Power',
    labelHi: 'सौर ऊर्जा व बत्ती',
    templates: [
      {
        title: 'Solar streetlights batteries dead, village junction pitch dark',
        description: 'All 8 solar streetlights installed at the main village square stopped working 2 months ago due to battery and inverter failure, causing safety concerns for women at night.',
        affected: 200,
        urgency: 'Medium' as const,
      },
      {
        title: 'Agriculture transformer burnout causing irrigation failure',
        description: 'Panchayat irrigation transformer sparked and tripped. Standing paddy crops drying up due to lack of borewell power.',
        affected: 150,
        urgency: 'High' as const,
      }
    ]
  },
  {
    category: 'Drainage & Waste',
    labelEn: 'Drainage & Sanitation',
    labelHi: 'नाली व स्वच्छता',
    templates: [
      {
        title: 'Open drain overflow causing stagnant sewage and dengue risk',
        description: 'Community drain clogged with plastic silt. Stagnant foul water overflowing onto village pathway. Multiple fever and mosquito-borne cases reported.',
        affected: 160,
        urgency: 'High' as const,
      }
    ]
  },
  {
    category: 'Healthcare',
    labelEn: 'Health Sub-Center',
    labelHi: 'स्वास्थ्य उपकेंद्र',
    templates: [
      {
        title: 'Sub-health center roof leak and lack of emergency cold storage',
        description: 'Rainwater seepage damaging vaccine store room and maternity beds. Basic medicine stock depleted for 45 days.',
        affected: 500,
        urgency: 'Emergency' as const,
      }
    ]
  },
  {
    category: 'Agriculture',
    labelEn: 'Farming & Canal',
    labelHi: 'सिंचाई व नहर',
    templates: [
      {
        title: 'Irrigation canal breached, flooding crops and wasting river flow',
        description: 'Earthen embankment cracked near kilometer 4. Water is flooding neighboring lowlands while tail-end farmers receive zero irrigation.',
        affected: 220,
        urgency: 'High' as const,
      }
    ]
  }
];

const renderCategoryIcon = (category: string, isSelected: boolean) => {
  const cls = `w-4 h-4 shrink-0 ${isSelected ? 'text-brand-mint' : 'text-brand-dark'}`;
  switch (category) {
    case 'Water & Sanitation': return <Droplets className={cls} />;
    case 'Roads & Infrastructure': return <Construction className={cls} />;
    case 'Electricity & Solar': return <Zap className={cls} />;
    case 'Drainage & Waste': return <Trash2 className={cls} />;
    case 'Healthcare': return <HeartPulse className={cls} />;
    case 'Agriculture': return <Sprout className={cls} />;
    default: return <FileText className={cls} />;
  }
};

export const ReportProblemWizard: React.FC = () => {
  const { submitCitizenReport, reports, t, language } = useAppState();
  const navigate = useNavigate();

  // Mode: 'quick' (simple 1-page mobile flow) vs 'detailed' (5-step wizard)
  const [reportMode, setReportMode] = useState<'quick' | 'detailed'>('quick');

  // Step state for detailed mode
  const [currentStep, setCurrentStep] = useState(1);
  const [geoStatus, setGeoStatus] = useState<'idle' | 'locating' | 'success' | 'denied'>('idle');

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Water & Sanitation');
  const [selectedQuickCategoryIdx, setSelectedQuickCategoryIdx] = useState(0);

  // Location states
  const [district, setDistrict] = useState('Dumka');
  const [block, setBlock] = useState('Hansdiha Block');
  const [locality, setLocality] = useState('Hansdiha Village');
  const [landmark, setLandmark] = useState('Near Govt Middle School');
  const [lat, setLat] = useState(24.2690);
  const [lng, setLng] = useState(87.2480);

  // Evidence photos (with compression info)
  const [compressedPhotos, setCompressedPhotos] = useState<CompressedPhoto[]>([
    {
      dataUrl: '/images/water-turbid.svg',
      originalSize: 3420000,
      compressedSize: 138000,
      ratio: 96,
      name: 'Turbid_water_well_sample.svg'
    }
  ]);
  const [isCompressing, setIsCompressing] = useState(false);

  // Impact states
  const [affectedEstimate, setAffectedEstimate] = useState(120);
  const [urgency, setUrgency] = useState<'Low' | 'Medium' | 'High' | 'Emergency'>('High');
  const [submittedByName, setSubmittedByName] = useState('Sunita Soren');
  const [contactPhone, setContactPhone] = useState('+91 98351 20481');

  // Submission result
  const [submittedReportId, setSubmittedReportId] = useState<string | null>(null);

  // Hidden file inputs for Camera and Gallery
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);

  // Client-Side Image Compression Function using HTML5 Canvas
  const compressImageFile = (file: File, maxWidth = 1200, quality = 0.72): Promise<CompressedPhoto> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxWidth) {
              width = Math.round((width * maxWidth) / height);
              height = maxWidth;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve({
              dataUrl: img.src,
              originalSize: file.size,
              compressedSize: file.size,
              ratio: 0,
              name: file.name
            });
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          const base64Str = dataUrl.split(',')[1] || '';
          const compressedSize = Math.round((base64Str.length * 3) / 4);
          const ratio = Math.max(0, Math.round(((file.size - compressedSize) / file.size) * 100));
          resolve({
            dataUrl,
            originalSize: file.size,
            compressedSize,
            ratio,
            name: file.name
          });
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  // Handle Photo Upload / Camera Capture
  const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsCompressing(true);
    try {
      const newItems: CompressedPhoto[] = [];
      for (let i = 0; i < files.length; i++) {
        const compressed = await compressImageFile(files[i]);
        newItems.push(compressed);
      }
      setCompressedPhotos((prev) => [...prev, ...newItems].slice(0, 3));
    } catch (err) {
      console.error('Failed to compress image:', err);
    } finally {
      setIsCompressing(false);
      // Reset input value so same photo can be chosen again if needed
      e.target.value = '';
    }
  };

  const removePhoto = (index: number) => {
    setCompressedPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  // 1-Tap Geolocation Handler
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setGeoStatus('denied');
      return;
    }
    setGeoStatus('locating');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(Number(position.coords.latitude.toFixed(5)));
        setLng(Number(position.coords.longitude.toFixed(5)));
        setGeoStatus('success');
      },
      (error) => {
        console.warn('Geolocation unavailable, using default:', error.message);
        setGeoStatus('denied');
      },
      { timeout: 8000 }
    );
  };

  // 1-Click Auto-Fill from Template
  const applyTemplate = (tmpl: { title: string; description: string; affected: number; urgency: 'Low' | 'Medium' | 'High' | 'Emergency' }) => {
    setTitle(tmpl.title);
    setDescription(tmpl.description);
    setAffectedEstimate(tmpl.affected);
    setUrgency(tmpl.urgency);
  };

  // Live duplicate similarity preview
  const liveSimilarity = analyzeReportSimilarity(
    {
      title,
      description,
      category,
      coordinates: { lat, lng },
    },
    reports
  );

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setTitle('Water and sanitation issue reported at ' + locality);
    }

    const created = submitCitizenReport({
      title: title.trim() || `${category} issue at ${locality}`,
      description: description.trim() || 'Civic infrastructure problem reported by resident for administrative inspection.',
      category,
      district,
      block,
      locality,
      landmark,
      coordinates: { lat, lng },
      affectedCountEstimate: Number(affectedEstimate),
      urgencyLevel: urgency,
      evidencePhotos: compressedPhotos.map((p) => p.dataUrl),
      submittedBy: submittedByName,
      contactNumber: contactPhone,
    });
    setSubmittedReportId(created.trackingId);
  };

  const steps = [
    { num: 1, label: t('wizard.step_problem', 'Problem') },
    { num: 2, label: t('wizard.step_location', 'Location') },
    { num: 3, label: t('wizard.step_photo', 'Photo') },
    { num: 4, label: t('wizard.step_impact', 'Impact') },
    { num: 5, label: t('wizard.step_review', 'Review') },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-16 px-1 sm:px-0">
      {/* Top Header */}
      <div className="bg-white rounded-3xl border border-brand-border p-5 sm:p-6 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200">
            <span>{t('report.badge', 'नागरिक सेवा • Citizen Action')}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-brand-text mt-1.5">
            {t('report.title', 'Report a Ground Problem')}
          </h1>
          <p className="text-xs text-brand-textMuted mt-0.5">
            {t('report.subtitle', 'Take a photo, select the issue, and submit to District Administration in 1 minute.')}
          </p>
        </div>

        {/* Mode Selector Toggle */}
        <div className="bg-brand-bg p-1 rounded-2xl border border-brand-border flex items-center shrink-0 self-start sm:self-center">
          <button
            type="button"
            onClick={() => setReportMode('quick')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              reportMode === 'quick'
                ? 'bg-brand-dark text-brand-mint shadow-xs'
                : 'text-brand-text hover:text-brand-dark'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-brand-mint" />
            <span>{t('report.mode_quick', 'Quick Mode (1-Min)')}</span>
          </button>
          <button
            type="button"
            onClick={() => setReportMode('detailed')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              reportMode === 'detailed'
                ? 'bg-brand-dark text-brand-mint shadow-xs'
                : 'text-brand-text hover:text-brand-dark'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{t('report.mode_detailed', '5-Step Wizard')}</span>
          </button>
        </div>
      </div>

      {/* Hidden File Inputs for Camera and Gallery */}
      <input
        type="file"
        ref={cameraInputRef}
        accept="image/*"
        capture="environment"
        onChange={handlePhotoSelect}
        className="hidden"
      />
      <input
        type="file"
        ref={galleryInputRef}
        accept="image/*"
        multiple
        onChange={handlePhotoSelect}
        className="hidden"
      />

      {/* Submitted Success Confirmation Screen */}
      {submittedReportId ? (
        <div className="bg-white rounded-3xl border border-brand-border p-6 sm:p-10 shadow-elevated text-center space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-subtle">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3.5 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {t('report.success_badge', 'Report Registered & Geotagged')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-text">
              {t('report.success_ref', 'Reference')} #{submittedReportId}
            </h2>
            <p className="text-xs sm:text-sm text-brand-textMuted max-w-md mx-auto leading-relaxed">
              {t('report.success_desc', 'Your community report has been securely saved and submitted to the District Administration. AI duplicate clustering and university adoption matching have been triggered.')}
            </p>
          </div>

          {/* Report Summary Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-brand-bg border border-brand-border text-xs max-w-md mx-auto text-left space-y-2.5 font-sans">
            <div className="flex justify-between items-center border-b border-gray-200/60 pb-2">
              <span className="text-gray-400 font-semibold">{t('report.tracking_number', 'Tracking Number:')}</span>
              <span className="font-mono font-bold text-brand-dark bg-white px-2 py-0.5 rounded border border-brand-border">
                {submittedReportId}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200/60 pb-2">
              <span className="text-gray-400 font-semibold">{t('report.current_phase', 'Current Phase:')}</span>
              <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                {t('report.phase2_name', 'Phase 02: AI Deduplication & Review')}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200/60 pb-2">
              <span className="text-gray-400 font-semibold">{t('report.location_label', 'Location:')}</span>
              <span className="font-medium text-brand-text truncate max-w-[200px]">
                {locality}, {block}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 font-semibold">{t('report.evidence_uploaded', 'Evidence Uploaded:')}</span>
              <span className="font-bold text-emerald-700">
                {compressedPhotos.length} {t('report.photos_attached', 'photo(s) compressed & attached')}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <Link
              to="/citizen/reports"
              className="px-6 py-3 bg-brand-dark text-brand-mint rounded-xl font-bold text-xs hover:bg-brand-darkSecondary transition shadow-xs flex items-center justify-center gap-2"
            >
              <span>{t('report.track_live', 'Track Resolution Live')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                `I just reported a civic problem on SamadhanSetu: "${title}". Reference ID: ${submittedReportId}. Track it here: https://samadhansetu-xi.vercel.app`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-emerald-600 text-white rounded-xl font-bold text-xs hover:bg-emerald-700 transition flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              <span>{t('report.share_whatsapp', 'Share on WhatsApp')}</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setSubmittedReportId(null);
                setCurrentStep(1);
                setTitle('');
                setDescription('');
              }}
              className="px-5 py-3 bg-white border border-brand-border text-brand-text rounded-xl font-semibold text-xs hover:bg-gray-50 transition"
            >
              {t('report.file_another', 'File Another Report')}
            </button>
          </div>
        </div>
      ) : reportMode === 'quick' ? (
        /* ============================================================ */
        /* QUICK 1-MINUTE CITIZEN REPORT (SUPER SIMPLE FOR PHONE USERS)  */
        /* ============================================================ */
        <form onSubmit={handleFinalSubmit} className="space-y-6">
          <div className="bg-white rounded-3xl border border-brand-border p-5 sm:p-7 shadow-subtle space-y-6 text-xs">
            {/* STEP 1: PHOTO CAPTURE & COMPRESSION */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-extrabold text-brand-text flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-dark text-brand-mint flex items-center justify-center text-xs font-bold">1</span>
                  <span>{t('report.step1_photo', 'Take or Upload Photo')}</span>
                </label>
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold border border-emerald-200">
                  <Check className="w-3 h-3" /> {t('report.auto_optimized', 'Auto-Optimized')}
                </span>
              </div>

              {/* Two Big Friendly Mobile Camera / Upload Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 border-dashed border-brand-mint hover:bg-brand-mintSoft/30 bg-emerald-50/40 text-brand-dark transition active:scale-95"
                >
                  <div className="w-10 h-10 rounded-2xl bg-brand-dark text-brand-mint flex items-center justify-center shadow-xs">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div className="text-center">
                    <span className="font-extrabold text-xs block text-brand-dark">{t('report.take_photo', 'Take Photo')}</span>
                    <span className="text-[10px] text-brand-textMuted block">{t('report.take_photo_sub', 'Open phone camera')}</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => galleryInputRef.current?.click()}
                  className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 border-dashed border-gray-200 hover:bg-gray-50 bg-gray-50/50 text-brand-text transition active:scale-95"
                >
                  <div className="w-10 h-10 rounded-2xl bg-gray-200 text-gray-700 flex items-center justify-center">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div className="text-center">
                    <span className="font-extrabold text-xs block text-brand-text">{t('report.choose_gallery', 'Choose from Gallery')}</span>
                    <span className="text-[10px] text-brand-textMuted block">{t('report.choose_gallery_sub', 'Select from gallery')}</span>
                  </div>
                </button>
              </div>

              {/* Compression Processing Indicator */}
              {isCompressing && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-2 text-blue-800 text-xs font-semibold animate-pulse">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{t('report.compressing', 'Compressing photo to save your mobile data...')}</span>
                </div>
              )}

              {/* Photo Previews with Compression Ratio Badges */}
              {compressedPhotos.length > 0 && (
                <div className="space-y-2 pt-1">
                  <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    {t('report.attached_photos', 'Attached Photos')} ({compressedPhotos.length})
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {compressedPhotos.map((photo, idx) => (
                      <div key={idx} className="relative rounded-xl overflow-hidden border border-brand-border bg-gray-100 group shadow-xs">
                        <img
                          src={photo.dataUrl}
                          alt={`Uploaded problem evidence ${idx + 1}`}
                          className="w-full h-28 object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-black/75 backdrop-blur-xs text-white p-1.5 text-[10px]">
                          <div className="flex justify-between items-center">
                            <span className="text-emerald-400 font-bold">
                              {(photo.compressedSize / 1024).toFixed(0)} KB
                            </span>
                            <span className="text-[9px] text-gray-300">
                              -{photo.ratio}%
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removePhoto(idx)}
                          className="absolute top-1.5 right-1.5 p-1 bg-red-600 text-white rounded-lg opacity-90 hover:opacity-100 shadow-sm"
                          title="Remove photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* STEP 2: TAP PROBLEM CATEGORY & QUICK 1-CLICK TEMPLATES */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <label className="text-sm font-extrabold text-brand-text flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-dark text-brand-mint flex items-center justify-center text-xs font-bold">2</span>
                  <span>{t('report.step2_category', 'Pick Category & Details')}</span>
                </label>
                <span className="text-[11px] text-brand-textMuted">{t('report.tap_to_autofill', 'Tap to auto-fill')}</span>
              </div>

              {/* Category Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {QUICK_TEMPLATES.map((item, idx) => {
                  const isSelected = category === item.category;
                  return (
                    <button
                      key={item.category}
                      type="button"
                      onClick={() => {
                        setCategory(item.category);
                        setSelectedQuickCategoryIdx(idx);
                        // Auto-apply the first template of this category
                        applyTemplate(item.templates[0]);
                      }}
                      className={`p-2.5 rounded-xl border text-left transition flex items-center gap-2 ${
                        isSelected
                          ? 'border-brand-dark bg-brand-dark text-white shadow-xs'
                          : 'border-brand-border bg-brand-bg hover:bg-gray-100 text-brand-text'
                      }`}
                    >
                      {renderCategoryIcon(item.category, isSelected)}
                      <div className="min-w-0">
                        <span className="font-bold text-xs truncate block">{language === 'HI' ? item.labelHi : item.labelEn}</span>
                        <span className={`text-[10px] truncate block ${isSelected ? 'text-brand-mint' : 'text-brand-textMuted'}`}>
                          {language === 'HI' ? item.labelEn : item.labelHi}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Preset 1-Click Problem Issues for Selected Category */}
              <div className="p-3 bg-brand-bg rounded-2xl border border-brand-border space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>{t('report.popular_issues', 'Popular Issues (Click to auto-generate):')}</span>
                  </span>
                </div>

                <div className="space-y-1.5">
                  {QUICK_TEMPLATES[selectedQuickCategoryIdx]?.templates.map((tmpl, tIdx) => {
                    const isMatches = title === tmpl.title;
                    return (
                      <button
                        key={tIdx}
                        type="button"
                        onClick={() => applyTemplate(tmpl)}
                        className={`w-full text-left p-2 rounded-xl text-xs transition border flex items-center justify-between gap-2 ${
                          isMatches
                            ? 'bg-white border-brand-mint text-brand-dark font-bold shadow-xs'
                            : 'bg-white/80 hover:bg-white border-gray-200/80 text-brand-text'
                        }`}
                      >
                        <span className="truncate">{tmpl.title}</span>
                        <span className="shrink-0 text-[10px] bg-brand-bg px-2 py-0.5 rounded font-mono font-semibold">
                          {tmpl.urgency}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Editable Issue Title & Description */}
              <div className="space-y-3 pt-1">
                <div>
                  <label className="block font-bold text-brand-text mb-1">
                    {t('report.problem_title', 'Problem Title:')}
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={t('report.problem_title_placeholder', 'e.g. Severe drinking water contamination in village...')}
                    className="w-full p-2.5 bg-brand-bg border border-brand-border rounded-xl text-brand-text font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-mint"
                  />
                </div>

                <div>
                  <label className="block font-bold text-brand-text mb-1">
                    {t('report.detailed_desc', 'Detailed Description:')}
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={t('report.detailed_desc_placeholder', 'Describe what happened, who is affected...')}
                    className="w-full p-2.5 bg-brand-bg border border-brand-border rounded-xl text-brand-text focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-mint"
                  />
                </div>
              </div>
            </div>

            {/* STEP 3: 1-TAP GPS LOCATION */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <label className="text-sm font-extrabold text-brand-text flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-dark text-brand-mint flex items-center justify-center text-xs font-bold">3</span>
                  <span>{t('report.step3_location', 'Location')}</span>
                </label>
                <button
                  type="button"
                  onClick={handleUseMyLocation}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition shadow-xs"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{t('report.detect_gps', 'Detect GPS Location')}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-500 text-[11px] mb-1">{t('report.district', 'District:')}</label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full p-2 bg-brand-bg border border-brand-border rounded-xl text-brand-text font-medium"
                  >
                    <option value="Dumka">Dumka</option>
                    <option value="Ranchi">Ranchi</option>
                    <option value="Khunti">Khunti</option>
                    <option value="Deoghar">Deoghar</option>
                    <option value="Dhanbad">Dhanbad</option>
                    <option value="Hazaribagh">Hazaribagh</option>
                    <option value="Bokaro">Bokaro</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-500 text-[11px] mb-1">{t('report.village', 'Village / Locality:')}</label>
                  <input
                    type="text"
                    required
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className="w-full p-2 bg-brand-bg border border-brand-border rounded-xl text-brand-text font-medium"
                  />
                </div>
              </div>

              {/* Coordinates Badge */}
              <div className="p-2.5 bg-brand-bg border border-brand-border rounded-xl flex items-center justify-between font-mono text-[11px]">
                <div className="flex items-center gap-1.5 text-gray-600">
                  <MapPin className="w-3.5 h-3.5 text-brand-dark" />
                  <span>GPS: {lat.toFixed(4)}° N, {lng.toFixed(4)}° E</span>
                </div>
                {geoStatus === 'success' && (
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded text-[10px]">
                    <CheckCircle2 className="w-3 h-3" /> {t('report.gps_fixed', 'Live GPS Fixed')}
                  </span>
                )}
                {geoStatus === 'locating' && (
                  <span className="text-blue-700 font-bold animate-pulse text-[10px]">
                    {t('report.acquiring_gps', 'Acquiring GPS satellite...')}
                  </span>
                )}
              </div>
            </div>

            {/* Live Duplicate Alert Notice */}
            {liveSimilarity.similarityScore >= 50 && (
              <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>{t('report.similar_nearby', 'Similar Problem Already Reported Nearby')} ({liveSimilarity.similarityScore}% match)</span>
                </div>
                <p className="text-amber-800 text-[11px] leading-relaxed">
                  {liveSimilarity.reasons.length > 0
                    ? liveSimilarity.reasons.join('. ')
                    : 'A matching challenge cluster has been detected within the same administrative ward.'}
                </p>
                <div className="inline-flex items-center gap-1.5 text-[11px] text-amber-900 font-semibold bg-white/70 p-2 rounded-lg w-full">
                  <Info className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>{t('report.reinforce_notice', 'Your submission will corroborate and reinforce the priority score for this cluster.')}</span>
                </div>
              </div>
            )}

            {/* Reporter Details (Pre-filled, editable) */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
              <div>
                <label className="block font-semibold text-gray-500 text-[11px] mb-1">{t('report.your_name', 'Your Name:')}</label>
                <input
                  type="text"
                  required
                  value={submittedByName}
                  onChange={(e) => setSubmittedByName(e.target.value)}
                  className="w-full p-2 bg-brand-bg border border-brand-border rounded-xl text-brand-text font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-500 text-[11px] mb-1">{t('report.mobile_number', 'Mobile Number:')}</label>
                <input
                  type="tel"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full p-2 bg-brand-bg border border-brand-border rounded-xl text-brand-text font-medium"
                />
              </div>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full py-4 bg-brand-dark text-brand-mint rounded-2xl font-extrabold text-sm hover:bg-brand-darkSecondary transition shadow-elevated flex items-center justify-center gap-2 active:scale-98"
          >
            <Zap className="w-4 h-4 text-brand-mint" />
            <span>{t('report.submit_btn', 'Submit Community Report')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      ) : (
        /* ============================================================ */
        /* DETAILED 5-STEP WIZARD (FOR ADVANCED USERS)                  */
        /* ============================================================ */
        <div className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 shadow-subtle space-y-6">
          {/* Stepper Navigation */}
          <div className="border-b border-brand-border pb-4">
            <div className="flex items-center justify-between">
              {steps.map((s, idx) => (
                <div key={s.num} className="flex items-center">
                  <div
                    onClick={() => setCurrentStep(s.num)}
                    className={`flex items-center gap-1.5 cursor-pointer text-xs font-bold transition ${
                      currentStep === s.num
                        ? 'text-brand-dark font-extrabold'
                        : currentStep > s.num
                        ? 'text-emerald-600'
                        : 'text-gray-400'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        currentStep === s.num
                          ? 'bg-brand-dark text-brand-mint'
                          : currentStep > s.num
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {currentStep > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
                    </div>
                    <span className="hidden sm:inline">{s.label}</span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div
                      className={`h-0.5 w-4 sm:w-10 mx-1 sm:mx-2 transition ${
                        currentStep > s.num ? 'bg-emerald-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Step 1 */}
          {currentStep === 1 && (
            <div className="space-y-4 text-xs">
              <h3 className="text-base font-bold text-brand-text">{t('wizard.step1_heading', 'Step 1: Problem Description')}</h3>
              <div>
                <label className="block font-semibold text-brand-text mb-1">{t('wizard.issue_headline', 'Issue Headline *')}</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t('report.problem_title_placeholder', 'e.g. Severe fluoride contamination and yellow water...')}
                  className="w-full p-2.5 bg-brand-bg border border-brand-border rounded-xl text-brand-text"
                />
              </div>

              <div>
                <label className="block font-semibold text-brand-text mb-1">{t('wizard.category_label', 'Category *')}</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 bg-brand-bg border border-brand-border rounded-xl text-brand-text font-medium"
                >
                  <option value="Water & Sanitation">{t('category.water', 'Water & Sanitation')}</option>
                  <option value="Roads & Infrastructure">{t('category.roads', 'Roads & Infrastructure')}</option>
                  <option value="Healthcare">{t('category.health', 'Healthcare')}</option>
                  <option value="Electricity & Solar">{t('category.power', 'Electricity & Solar')}</option>
                  <option value="Waste Management">{t('category.waste', 'Waste Management')}</option>
                  <option value="Agriculture">{t('category.agriculture', 'Agriculture')}</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-brand-text mb-1">{t('wizard.detailed_desc_label', 'Detailed Description *')}</label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t('report.detailed_desc_placeholder', 'Explain the background, severity, duration, and community impact...')}
                  className="w-full p-2.5 bg-brand-bg border border-brand-border rounded-xl text-brand-text"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-5 py-2.5 bg-brand-dark text-brand-mint rounded-xl font-bold text-xs hover:bg-brand-darkSecondary transition"
                >
                  {t('wizard.next_location', 'Next: Location & GPS →')}
                </button>
              </div>
            </div>
          )}

          {/* Detailed Step 2 */}
          {currentStep === 2 && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-brand-text">{t('wizard.step2_heading', 'Step 2: Location & GPS Coordinates')}</h3>
                <button
                  type="button"
                  onClick={handleUseMyLocation}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{t('report.detect_gps', 'Detect GPS Location')}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-brand-text mb-1">{t('report.district', 'District *')}</label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full p-2 bg-brand-bg border border-brand-border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-brand-text mb-1">{t('report.block', 'Block *')}</label>
                  <input
                    type="text"
                    value={block}
                    onChange={(e) => setBlock(e.target.value)}
                    className="w-full p-2 bg-brand-bg border border-brand-border rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-brand-text mb-1">{t('report.village', 'Village / Locality *')}</label>
                  <input
                    type="text"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className="w-full p-2 bg-brand-bg border border-brand-border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-brand-text mb-1">{t('report.landmark', 'Landmark')}</label>
                  <input
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    className="w-full p-2 bg-brand-bg border border-brand-border rounded-xl"
                  />
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 border border-brand-border rounded-xl font-semibold"
                >
                  {t('wizard.back', 'Back')}
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-5 py-2.5 bg-brand-dark text-brand-mint rounded-xl font-bold"
                >
                  {t('wizard.next_photo', 'Next: Photo Evidence →')}
                </button>
              </div>
            </div>
          )}

          {/* Detailed Step 3 */}
          {currentStep === 3 && (
            <div className="space-y-4 text-xs">
              <h3 className="text-base font-bold text-brand-text">{t('wizard.step3_heading', 'Step 3: Photo Capture & Compression')}</h3>
              <p className="text-brand-textMuted">
                {t('wizard.step3_desc', 'Photos are automatically compressed client-side to save mobile bandwidth.')}
              </p>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="p-4 border-2 border-dashed border-brand-mint rounded-2xl bg-emerald-50/40 text-center font-bold text-brand-dark flex flex-col items-center gap-1.5"
                >
                  <Camera className="w-5 h-5" />
                  <span>{t('wizard.snap_camera', 'Snap with Camera')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => galleryInputRef.current?.click()}
                  className="p-4 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 text-center font-bold text-brand-text flex flex-col items-center gap-1.5"
                >
                  <Upload className="w-5 h-5" />
                  <span>{t('wizard.upload_files', 'Upload from Files')}</span>
                </button>
              </div>

              {compressedPhotos.length > 0 && (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {compressedPhotos.map((photo, idx) => (
                    <div key={idx} className="relative rounded-xl overflow-hidden border border-brand-border">
                      <img src={photo.dataUrl} alt="Evidence preview" className="w-full h-28 object-cover" />
                      <button
                        type="button"
                        onClick={() => removePhoto(idx)}
                        className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-lg"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 border border-brand-border rounded-xl font-semibold"
                >
                  {t('wizard.back', 'Back')}
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="px-5 py-2.5 bg-brand-dark text-brand-mint rounded-xl font-bold"
                >
                  {t('wizard.next_impact', 'Next: Community Impact →')}
                </button>
              </div>
            </div>
          )}

          {/* Detailed Step 4 */}
          {currentStep === 4 && (
            <div className="space-y-4 text-xs">
              <h3 className="text-base font-bold text-brand-text">{t('wizard.step4_heading', 'Step 4: Community Impact & Urgency')}</h3>

              <div>
                <label className="block font-semibold text-brand-text mb-1">
                  {t('wizard.estimated_affected', 'Estimated People Affected:')} {affectedEstimate} citizens
                </label>
                <input
                  type="range"
                  min={10}
                  max={2000}
                  step={10}
                  value={affectedEstimate}
                  onChange={(e) => setAffectedEstimate(Number(e.target.value))}
                  className="w-full accent-brand-dark"
                />
              </div>

              <div>
                <label className="block font-semibold text-brand-text mb-1">{t('wizard.urgency_level', 'Urgency Level')}</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['Low', 'Medium', 'High', 'Emergency'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setUrgency(lvl)}
                      className={`p-2 rounded-xl text-center font-bold border transition ${
                        urgency === lvl
                          ? lvl === 'Emergency'
                            ? 'bg-red-600 text-white border-red-600'
                            : 'bg-brand-dark text-brand-mint border-brand-dark'
                          : 'bg-brand-bg text-brand-text border-brand-border'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-2 border border-brand-border rounded-xl font-semibold"
                >
                  {t('wizard.back', 'Back')}
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(5)}
                  className="px-5 py-2.5 bg-brand-dark text-brand-mint rounded-xl font-bold"
                >
                  {t('wizard.next_review', 'Next: Final Review →')}
                </button>
              </div>
            </div>
          )}

          {/* Detailed Step 5 */}
          {currentStep === 5 && (
            <div className="space-y-4 text-xs">
              <h3 className="text-base font-bold text-brand-text">{t('wizard.step5_heading', 'Step 5: Review & Submit')}</h3>

              <div className="p-4 bg-brand-bg rounded-2xl border border-brand-border space-y-2">
                <div><strong>Headline:</strong> {title || 'Untitled Report'}</div>
                <div><strong>Category:</strong> {category}</div>
                <div><strong>Location:</strong> {locality}, {block}, {district}</div>
                <div><strong>Urgency:</strong> {urgency} ({affectedEstimate} affected)</div>
                <div><strong>Photos:</strong> {compressedPhotos.length} compressed images</div>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="px-4 py-2 border border-brand-border rounded-xl font-semibold"
                >
                  {t('wizard.back', 'Back')}
                </button>
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-dark text-brand-mint rounded-xl font-extrabold hover:bg-brand-darkSecondary transition shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>{t('wizard.submit_official', 'Submit Official Citizen Report')}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
