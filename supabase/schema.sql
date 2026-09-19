-- ==============================================================================
-- SamadhanSetu - Supabase PostgreSQL Schema & Initial Data
-- Smart India Hackathon 2026
-- ==============================================================================

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. CHALLENGES TABLE
CREATE TABLE IF NOT EXISTS challenges (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  district TEXT NOT NULL,
  block TEXT NOT NULL,
  locality TEXT NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  status TEXT NOT NULL DEFAULT 'unverified',
  priority_score INTEGER NOT NULL DEFAULT 50,
  priority_level TEXT NOT NULL DEFAULT 'MEDIUM',
  breakdown JSONB NOT NULL DEFAULT '{}'::jsonb,
  government_override JSONB,
  report_count INTEGER NOT NULL DEFAULT 1,
  affected_population INTEGER NOT NULL DEFAULT 100,
  affected_villages TEXT[] NOT NULL DEFAULT '{}',
  department TEXT NOT NULL,
  required_skills TEXT[] NOT NULL DEFAULT '{}',
  suggested_departments TEXT[] NOT NULL DEFAULT '{}',
  verification_status TEXT NOT NULL DEFAULT 'unverified',
  verified_at TIMESTAMPTZ,
  verified_by TEXT,
  photos TEXT[] NOT NULL DEFAULT '{}',
  cluster JSONB,
  adoption JSONB,
  industry_support JSONB,
  field_evidence JSONB,
  impact_verification JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. CITIZEN REPORTS TABLE
CREATE TABLE IF NOT EXISTS citizen_reports (
  id TEXT PRIMARY KEY,
  tracking_id TEXT UNIQUE NOT NULL,
  challenge_id TEXT REFERENCES challenges(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  district TEXT NOT NULL,
  block TEXT NOT NULL,
  locality TEXT NOT NULL,
  landmark TEXT,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  affected_count_estimate INTEGER NOT NULL DEFAULT 50,
  urgency_level TEXT NOT NULL DEFAULT 'Medium',
  evidence_photos TEXT[] NOT NULL DEFAULT '{}',
  evidence_doc TEXT,
  status TEXT NOT NULL DEFAULT 'Submitted',
  submitted_by TEXT NOT NULL,
  contact_number TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. CREDENTIALS TABLE
CREATE TABLE IF NOT EXISTS credentials (
  id TEXT PRIMARY KEY,
  challenge_code TEXT NOT NULL,
  title TEXT NOT NULL,
  district TEXT NOT NULL,
  state TEXT NOT NULL DEFAULT 'Jharkhand',
  university TEXT NOT NULL,
  team_name TEXT NOT NULL,
  team_members TEXT[] NOT NULL DEFAULT '{}',
  faculty_mentor TEXT NOT NULL,
  industry_partner TEXT NOT NULL,
  field_partner TEXT NOT NULL,
  impact_population INTEGER NOT NULL DEFAULT 0,
  verification_hash TEXT NOT NULL,
  issued_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  government_department TEXT NOT NULL,
  verified_by_officer TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'VERIFIED'
);

-- 4. AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS audit_logs (
  id TEXT PRIMARY KEY,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  actor_role TEXT NOT NULL,
  actor_name TEXT NOT NULL,
  action TEXT NOT NULL,
  details TEXT NOT NULL,
  challenge_code TEXT
);

-- Indexes for high performance
CREATE INDEX IF NOT EXISTS idx_challenges_code ON challenges(code);
CREATE INDEX IF NOT EXISTS idx_challenges_status ON challenges(status);
CREATE INDEX IF NOT EXISTS idx_challenges_priority ON challenges(priority_score DESC);
CREATE INDEX IF NOT EXISTS idx_citizen_reports_tracking ON citizen_reports(tracking_id);
CREATE INDEX IF NOT EXISTS idx_citizen_reports_challenge ON citizen_reports(challenge_id);
CREATE INDEX IF NOT EXISTS idx_credentials_hash ON credentials(verification_hash);
CREATE INDEX IF NOT EXISTS idx_audit_logs_timestamp ON audit_logs(timestamp DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE citizen_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Allow public read & write for prototype)
DROP POLICY IF EXISTS "Public read challenges" ON challenges;
CREATE POLICY "Public read challenges" ON challenges FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public write challenges" ON challenges;
CREATE POLICY "Public write challenges" ON challenges FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public read citizen_reports" ON citizen_reports;
CREATE POLICY "Public read citizen_reports" ON citizen_reports FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public write citizen_reports" ON citizen_reports;
CREATE POLICY "Public write citizen_reports" ON citizen_reports FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public read credentials" ON credentials;
CREATE POLICY "Public read credentials" ON credentials FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public write credentials" ON credentials;
CREATE POLICY "Public write credentials" ON credentials FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public read audit_logs" ON audit_logs;
CREATE POLICY "Public read audit_logs" ON audit_logs FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public write audit_logs" ON audit_logs;
CREATE POLICY "Public write audit_logs" ON audit_logs FOR ALL USING (true) WITH CHECK (true);

-- ==============================================================================
-- SEED DATA (Inserts demo challenges, reports, credentials if not already present)
-- ==============================================================================

INSERT INTO challenges (
  id, code, title, description, category, district, block, locality, lat, lng,
  status, priority_score, priority_level, breakdown, report_count, affected_population,
  affected_villages, department, required_skills, suggested_departments,
  verification_status, verified_at, verified_by, photos, cluster, created_at, updated_at
) VALUES (
  'ch-jh-1042',
  'JH-WTR-1042',
  'Severe Groundwater Contamination & High Fluoride in Hansdiha Aquifer',
  'Continuous chemical testing indicates fluoride concentration of 4.8 mg/L (normal limit < 1.0 mg/L) across 4 panchayat borewells. Severe dental and skeletal fluorosis reported in over 180 primary school children. Water turns yellowish-brown upon 2 hours standing.',
  'Drinking Water & Sanitation',
  'Dumka',
  'Hansdiha',
  'Hansdiha Central & Kurmahat Ward 4',
  24.5823,
  87.0532,
  'unverified',
  94,
  'CRITICAL',
  '{"severity": 29, "populationImpact": 24, "geographicSpread": 14, "urgency": 15, "duplicateSignal": 8, "feasibility": 4, "overallScore": 94, "level": "CRITICAL"}'::jsonb,
  12,
  2615,
  ARRAY['Hansdiha', 'Kurmahat', 'Bhaturia', 'Baski'],
  'Drinking Water & Sanitation Department',
  ARRAY['Environmental Engineering', 'Membrane Filtration', 'Chemical Assay', 'Embedded IoT Sensors'],
  ARRAY['Civil Engineering', 'Chemical Engineering', 'Biotechnology'],
  'unverified',
  NULL,
  NULL,
  ARRAY['/images/arsenic-filter.svg', '/images/water-turbid.svg'],
  '{"clusterId": "CLU-JH-DUM-04", "masterChallengeId": "ch-jh-1042", "similarityScore": 91, "villageCount": 4, "affectedVillages": ["Hansdiha", "Kurmahat", "Bhaturia", "Baski"], "reportIds": ["RPT-JH-101", "RPT-JH-102", "RPT-JH-103"], "detectionDate": "2026-09-14T08:30:00Z", "aiRationale": "High semantic similarity across 12 distinct citizen complaints describing fluoride symptoms, yellowish standing water, and school absenteeism in Hansdiha block."}'::jsonb,
  '2026-09-14T08:30:00Z',
  '2026-09-18T12:00:00Z'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO challenges (
  id, code, title, description, category, district, block, locality, lat, lng,
  status, priority_score, priority_level, breakdown, report_count, affected_population,
  affected_villages, department, required_skills, suggested_departments,
  verification_status, verified_at, verified_by, photos, created_at, updated_at
) VALUES (
  'ch-jh-1043',
  'JH-AGR-1043',
  'Post-Harvest Tomato Spoilage due to Lack of Decentralized Micro Cold Storage',
  'Over 40 tons of seasonal tomato harvest rotting weekly due to inability to transport produce during monsoon bridge submergence. Farmers forced into distress sales at Rs 2/kg.',
  'Agriculture & Rural Economy',
  'Ranchi',
  'Ormanjhi',
  'Chutupalu Ghati Farming Belt',
  23.4832,
  85.4921,
  'published',
  78,
  'HIGH',
  '{"severity": 22, "populationImpact": 21, "geographicSpread": 11, "urgency": 12, "duplicateSignal": 8, "feasibility": 4, "overallScore": 78, "level": "HIGH"}'::jsonb,
  8,
  1450,
  ARRAY['Ormanjhi', 'Chutupalu', 'Daru'],
  'Agriculture, Animal Husbandry & Cooperative Department',
  ARRAY['Thermal Engineering', 'Phase Change Materials (PCM)', 'Solar PV Sizing'],
  ARRAY['Mechanical Engineering', 'Electrical Engineering'],
  'verified',
  '2026-09-15T10:00:00Z',
  'Rameshwar Oraon, Director Agri-Tech',
  ARRAY['/images/cold-storage.svg'],
  '2026-09-12T10:00:00Z',
  '2026-09-16T14:30:00Z'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO challenges (
  id, code, title, description, category, district, block, locality, lat, lng,
  status, priority_score, priority_level, breakdown, report_count, affected_population,
  affected_villages, department, required_skills, suggested_departments,
  verification_status, verified_at, verified_by, photos, created_at, updated_at
) VALUES (
  'ch-jh-1044',
  'JH-ENG-1044',
  'Off-Grid Secondary School Power Failure & Digital Classroom Inoperability',
  'Upgraded High School solar inverter battery bank exploded during lightning storm. 340 tribal students unable to attend smart classroom sessions and vocational IT labs.',
  'Education & Energy',
  'Khunti',
  'Torpa',
  'Torpa Block HQ',
  22.9567,
  85.1234,
  'published',
  64,
  'MEDIUM',
  '{"severity": 18, "populationImpact": 16, "geographicSpread": 9, "urgency": 11, "duplicateSignal": 6, "feasibility": 4, "overallScore": 64, "level": "MEDIUM"}'::jsonb,
  5,
  820,
  ARRAY['Torpa', 'Dormi'],
  'School Education & Literacy Department',
  ARRAY['Renewable Energy', 'Battery Management Systems (BMS)', 'Lightning Surge Protection'],
  ARRAY['Electrical Engineering', 'Renewable Energy Tech'],
  'verified',
  '2026-09-16T11:00:00Z',
  'Sunil Kumar, District Education Officer',
  ARRAY['/images/school-solar.svg'],
  '2026-09-10T09:00:00Z',
  '2026-09-15T16:00:00Z'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO citizen_reports (
  id, tracking_id, challenge_id, title, description, category, district, block, locality,
  landmark, lat, lng, affected_count_estimate, urgency_level, evidence_photos,
  status, submitted_by, contact_number, created_at, updated_at
) VALUES (
  'RPT-JH-101',
  'SS-RPT-20512',
  'ch-jh-1042',
  'Yellowish foul-tasting water from primary school tube well',
  'Children in Middle School Hansdiha experiencing stomach cramps and stained teeth. Handpump water has visible sediment.',
  'Drinking Water & Sanitation',
  'Dumka',
  'Hansdiha',
  'Hansdiha Central',
  'Near Hansdiha Middle School Playground',
  24.5823,
  87.0532,
  350,
  'High',
  ARRAY['/images/water-turbid.svg'],
  'Clustered',
  'Sunita Soren (Gram Panchayat Member)',
  '+91 94311 28941',
  '2026-09-14T07:15:00Z',
  '2026-09-14T08:30:00Z'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO credentials (
  id, challenge_code, title, district, state, university, team_name, team_members,
  faculty_mentor, industry_partner, field_partner, impact_population,
  verification_hash, issued_at, government_department, verified_by_officer, status
) VALUES (
  'SS-2026-0912',
  'JH-WTR-0912',
  'Decentralized Arsenic & Iron Removal Unit for Kanke Reservoir Catchment',
  'Ranchi',
  'Jharkhand',
  'BIT Mesra Ranchi',
  'JalShakti Innovations',
  ARRAY['Pooja Kumari', 'Vikramaditya Roy', 'Md. Salman Khan'],
  'Prof. Sudhir Kumar (Chemical Engg)',
  'Tata Steel CSR Foundation',
  'Jharkhand Water Aid NGO',
  4200,
  'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  '2026-08-28T14:30:00Z',
  'Drinking Water & Sanitation Department, Govt. of Jharkhand',
  'Manish Ranjan, IAS (Secretary DWSD)',
  'VERIFIED'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO audit_logs (
  id, timestamp, actor_role, actor_name, action, details, challenge_code
) VALUES (
  'AUD-INIT-01',
  '2026-09-14T08:30:00Z',
  'system',
  'SamadhanSetu AI Clustering Engine',
  'Multi-Report Problem Clustered',
  'Clustered 12 independent citizen complaints into regional challenge JH-WTR-1042 with 91% semantic confidence.',
  'JH-WTR-1042'
) ON CONFLICT (id) DO NOTHING;
