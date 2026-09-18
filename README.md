# SamadhanSetu — From Community Problems to Verified Impact
> **Smart India Hackathon 2026 Civic-Tech Innovation Platform**  
> 🌐 **Live Vercel Link**: [https://samadhansetu-abinav5.vercel.app](https://samadhansetu-abinav5.vercel.app)

SamadhanSetu connects citizens, district administration, universities, industry CSR, and NGOs to transform genuine community problems into verified, credit-bearing engineering projects and measurable public impact.

```
REPORT → AI INTELLIGENCE → VERIFY → PRIORITIZE → ADOPT → BUILD → SUPPORT → IMPLEMENT → VERIFY IMPACT → CREDENTIAL
```

---

## 🚀 Quick Deployment Guide

### Option 1: Deploy on Vercel (Recommended)
1. Push this repository to GitHub or install Vercel CLI (`npm i -g vercel`).
2. Run in project directory:
   ```bash
   vercel
   ```
3. Default settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - The included `vercel.json` automatically handles single-page app (SPA) routing.

---

### Option 2: Deploy on Netlify
1. Push to GitHub and connect repository to Netlify.
2. Build Settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - The included `public/_redirects` ensures all React Router paths resolve correctly.

---

### Option 3: Local Development
Ensure Node.js (v18+) and npm are installed:

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build production bundle
npm run build

# 4. Preview production build locally
npm run preview
```

The app will be live at `http://localhost:5173/`.

---

### Option 4: Docker Container
Run as a lightweight Nginx container:

```dockerfile
# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/public/_redirects /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 🏛️ Ecosystem Features

- **6 Functional Stakeholder Experiences**:
  1. **Citizen Portal** (`/citizen`): 5-step problem wizard with GPS geotagging, photo upload, and live AI cluster detection.
  2. **Government Command Center** (`/government`): Live GIS Problem Map (Leaflet), Priority Queue, Duplicate Cluster management, and Impact Verification.
  3. **University / Student Portal** (`/university`): Engineering curriculum match (92%), project adoption flow, and student impact portfolio.
  4. **Faculty Mentor Desk** (`/university/mentors`): Feasibility review, milestone evaluation, and capstone credit approval.
  5. **Industry / CSR Portal** (`/industry`): Section 135 CSR capital commitments, equipment grants, and engineering mentorship.
  6. **NGO Field Partner** (`/ngo`): Ground pilot deployment, water quality spectrometry logging, and Gram Sabha beneficiary audits.

- **Universal Demo Bar & Guided Golden Tour**:
  - Sticky top bar for instant role switching without logins.
  - Interactive 12-step **Golden Tour** following master challenge **#JH-WTR-1042** (*Contaminated Drinking Water, Dumka*).

- **Public Trust Layer** (`/verify/:id`):
  - Cryptographic verification certificate authenticated by District Magistrate with permanent SHA hash proof.

---

## 🛠️ Tech Stack

- **Framework**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Plus Jakarta Sans typography
- **Map & GIS**: Leaflet, React Leaflet (OpenStreetMap / Carto tiles)
- **Routing**: React Router DOM v6
- **Icons**: Lucide React
- **State Management**: Reactive LocalStorage-backed state engine with real-time event logging

