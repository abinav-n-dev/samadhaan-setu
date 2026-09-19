# SamadhanSetu (समाधान सेतु) — From Community Problems to Verified Impact

> **Smart India Hackathon 2026 Civic-Tech Innovation Platform**  
> Prototype Deployment: [https://samadhansetu-xi.vercel.app](https://samadhansetu-xi.vercel.app)

---

## 1. Problem Statement & Mission

Traditional public grievance portals in India often fail because they operate as one-way complaint repositories. Millions of citizen complaints are filed, but municipal and district authorities lack the engineering resources, specialized budget, or ground-level execution bandwidth to resolve them. Meanwhile, accredited engineering colleges across India graduate thousands of students who complete capstone projects disconnected from real-world civic challenges.

**SamadhanSetu** bridges this institutional gap:
1. **Intake & Clustering**: Citizens report local infrastructure issues with photo evidence and GPS coordinates. The system clusters duplicates within 500m using spatial distance and rule-based keyword matching, computing an objective 6-factor priority score.
2. **Administrative Verification**: District Administration verifies authentic community challenges and publishes them to an academic innovation registry.
3. **Academic Capstones**: University engineering student teams adopt verified challenges as accredited, credit-bearing capstone projects under experienced faculty mentors.
4. **CSR Co-Financing & NGO Deployment**: Corporate CSR grants fund prototype materials and equipment (under Companies Act Section 135), while grassroots NGOs install and operate the solution on the ground.
5. **Social Audit & Cryptographic Credential**: District Administration conducts a social audit with the Gram Sabha and issues a tamper-proof digital credential with real SHA-256 integrity hashing.

```
CITIZEN REPORT → SPATIAL DEDUPLICATION → GOVT VERIFICATION → ACADEMIC ADOPTION → MENTOR APPROVAL → CSR FINANCING → NGO FIELD PILOT → SOCIAL AUDIT → SHA-256 CREDENTIAL
```

---

## 2. Technology Stack (Frontend-Only Prototype)

SamadhanSetu is built as a deterministic, client-side prototype designed for robust hackathon demonstration without external server dependencies:

- **Frontend Core**: React 18, TypeScript, Vite
- **Styling & UI**: Tailwind CSS, Plus Jakarta Sans typography, Lucide React icons
- **GIS & Mapping**: Leaflet, React Leaflet (with offline topology grid fallback)
- **Cryptographic Security**: Web Crypto API (`crypto.subtle`) for canonical SHA-256 credential hashing
- **State & Persistence**: LocalStorage-backed reactive state engine with automated JSON corruption safety fallbacks
- **Testing**: Vitest (35 unit and integration tests covering workflow, deduplication, priority scoring, cryptographic verification, and bilingual i18n parity)

> **Architectural Note**: This prototype does **not** use a backend database (e.g. MongoDB/PostgreSQL) or server runtime (e.g. Express/NestJS). All state lives in the browser's `localStorage` with mock demonstration data.

---

## 3. Architecture & Key Features

### 3.1 Real In-Browser SHA-256 Credential Hashing
- Every verified impact credential (e.g. `SS-2026-1042`) computes a real SHA-256 cryptographic digest across 9 canonical fields: `id`, `challengeCode`, `teamName`, `university`, `teamMembers`, `impactPopulation`, `issuedAt`, `verifiedByOfficer`, and `governmentDepartment`.
- The verification portal (`/verify/:id`) recalculates the SHA-256 hash client-side using the Web Crypto API (`crypto.subtle.digest`) and validates it against the recorded hash.
- Tampering with even a single field (such as changing the beneficiary population or university name) produces an immediate hash mismatch and displays a prominent tampering warning.

### 3.2 Rule-Based Spatial & Keyword Similarity Matching (Not Machine Learning)
- Citizen reports are analyzed using an honest, rule-based algorithmic engine (not black-box machine learning):
  - **Spatial Proximity**: Haversine distance formula flags reports within a 500-meter radius.
  - **Keyword Overlap**: Weighted lexical matching across 30 domain keywords and Hindi transliterations (`paani`, `sadak`, `bijli`, `nal`, `handpump`, `aspatal`).
  - **Cluster Scoring**: Categorizes similarity as Exact (≥80%), High (65-79%), Moderate (50-64%), or Unique (<50%). Duplicate submissions automatically reinforce the master challenge's priority score.

### 3.3 Fully Offline-Capable Demo
- **Zero Remote Image Dependencies**: All 9 mock asset images (turbid water samples, remediated water, field evidence, culvert bridge damage, PHC hospitals, solar installations) are stored locally as SVG vector graphics in `public/images/`.
- **Map Tile Fallback**: Leaflet map tiles include an offline CSS vector topology grid and offline error handling, ensuring the GIS map renders cleanly even in network-restricted demo environments.

### 3.4 Multi-Stakeholder Role Switcher & Golden Tour
- A sticky demo bar allows presenters to instantaneously switch between all 6 institutional personas without login walls:
  1. **Citizen & Community** (`/citizen`)
  2. **District & State Government** (`/government`)
  3. **University Student Team** (`/university`)
  4. **Faculty Academic Mentor** (`/university/mentors`)
  5. **Industry Corporate CSR** (`/industry`)
  6. **NGO Field Partner** (`/ngo`)
- Includes an automated 12-step **Golden Tour** guiding the presenter through the complete problem-to-impact lifecycle for challenge **JH-WTR-1042** (*Dumka, Jharkhand*).

### 3.5 Full English & Hindi Bilingual Support (Citizen Flow)
- Complete language parity across the entire citizen reporting and tracking journey:
  - Quick mode and 5-step wizard form labels and placeholders.
  - Civic problem categories (Drinking Water, Road Infrastructure, Power & Solar, Healthcare, Waste Management, Agriculture).
  - Lifecycle tracking stages and status badges.
- Bidirectional parity is strictly enforced by unit tests in `test/i18n.test.ts`.

---

## 4. Local Setup & Execution

### Prerequisites
- Node.js 18+ and npm installed.

### Steps
```bash
# 1. Clone repository & install dependencies
git clone https://github.com/Abinav-S-P/SamdanSetu.git
cd SamdanSetu
npm install

# 2. Run TypeScript check
npx tsc --noEmit

# 3. Run all unit & integration tests
npm test

# 4. Build production bundle
npm run build

# 5. Start local development server
npm run dev
```

The application runs locally at `http://localhost:5173/`.

To package a clean, evaluatable submission zip (excluding `node_modules`, `.git`, `.env*`, and `dist`):
```bash
npm run package
```

---

## 5. Supabase Cloud Database Setup (Optional / Resilient)

SamadhanSetu features a **Dual-Mode Persistence Layer**:
- **Offline / Local Mode**: Operates seamlessly out of the box using browser `localStorage` and mock data (no configuration required, zero network dependencies).
- **Cloud Database Mode**: When connected to Supabase, it syncs challenges, citizen reports, cryptographic credentials, and audit logs to PostgreSQL in real time.

### How to Connect Supabase:
1. **Create Project**: Sign in to [Supabase](https://supabase.com) and create a new project.
2. **Execute Schema Migration**:
   - Open your project dashboard and navigate to the **SQL Editor**.
   - Copy the contents of `supabase/schema.sql` and run it. This creates the `challenges`, `citizen_reports`, `credentials`, and `audit_logs` tables, sets Row Level Security (RLS) policies, and seeds initial demo records.
3. **Configure Environment Variables**:
   - In Supabase, go to **Project Settings → API**.
   - Copy your **Project URL** and **Anon / Public Key**.
   - Create a `.env.local` file in your project root:
     ```env
     VITE_SUPABASE_URL=https://your-project-id.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key-here
     ```
   - For Vercel, add these same two environment variables in **Project Settings → Environment Variables**.
4. **Restart Vite**:
   ```bash
   npm run dev
   ```
   The UI will display a green **"Supabase Cloud"** status badge in the navbar indicating real-time PostgreSQL synchronization.

---

## 6. Known Limitations & Future Scope

As a hackathon prototype, SamadhanSetu demonstrates end-to-end functionality within browser memory. Production deployment requires:

1. **Production Backend & Database**: Transition from `localStorage` to an authenticated PostgreSQL database with PostGIS for native spatial index querying (`ST_DWithin`).
2. **REST / GraphQL API**: Replace browser state context with secure JWT/OAuth2-authenticated endpoints with Role-Based Access Control (RBAC).
3. **Formal Blockchain Anchoring**: Anchor the SHA-256 credential digests onto an EVM-compatible public or consortium ledger (e.g. Polygon / Hyperledger Fabric) for decentralized public auditability.
4. **SMS / IVRS Integration**: Support non-smartphone rural citizens through toll-free IVRS reporting and automated SMS status notifications in regional dialects.
5. **Multi-District GIS Analytics**: Scale the GIS pipeline to support statewide and nationwide heatmaps with real-time IoT water quality sensor feeds.
