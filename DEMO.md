# SamadhanSetu — 5-Minute Presentation Demo Script
> **Smart India Hackathon 2026 Live Demonstration Click-Path**  
> Master Challenge: **JH-WTR-1042** (*High Turbidity & Fluoride Contamination in Hansdiha Well, Dumka, Jharkhand*)

---

## Presentation Overview
This script walks judges through the complete 8-phase lifecycle of a civic problem turning into an accredited, funded, and verified university solution in under 5 minutes.

---

### Step 1: Citizen Reports Turbid Drinking Water in Dumka
- **Role**: `Citizen`
- **Page**: `/citizen/report` (or `/report`)
- **Action**: In Quick Mode, tap **"Drinking Water"** category, pick the top popular template (*"Severe turbidity & foul smell in village drinking water pump"*), click **"Detect GPS Location"**, and click **"Submit Community Report"**.
- **Voiceover**: *"In less than 60 seconds, a rural citizen in Dumka uploads geotagged photo evidence of contaminated drinking water from her mobile phone."*
- **Proof on Screen**: Green confirmation card appears displaying reference `#SS-RPT-XXXX`, showing auto-optimized photo evidence and Phase 02 status.

---

### Step 2: System Flags Spatial Duplicate & Clusters with JH-WTR-1042
- **Role**: `Citizen` (or switch to `Government`)
- **Page**: `/citizen/reports`
- **Action**: Click on the newly submitted report from the list on the left to display its detailed lifecycle panel.
- **Voiceover**: *"Instead of creating redundant grievance tickets, our spatial engine detects that this report is within 500 meters of existing incidents and clusters it with master challenge JH-WTR-1042."*
- **Proof on Screen**: Report status displays as **"Clustered"** and links directly to Master Challenge `JH-WTR-1042` with 6 stages highlighted.

---

### Step 3: District Officer Reviews Priority Score Breakdown & Verifies
- **Role**: `Government`
- **Page**: `/government/verification`
- **Action**: Select challenge `JH-WTR-1042`. Hover over the priority score breakdown (Severity: 96, Population: 91, Spread: 76, Urgency: 95, Duplicates: 88, Feasibility: 82; Overall: 90 CRITICAL). Click **"Verify & Publish Challenge"**.
- **Voiceover**: *"The District Magistrate reviews an objective, 6-factor algorithmic score and officially verifies the challenge, publishing it to accredited engineering colleges."*
- **Proof on Screen**: Challenge status transitions to **"Government Verified"** with green verification checkmark and officer signature stamp.

---

### Step 4: University Student Team Adopts the Challenge
- **Role**: `Student`
- **Page**: `/university/challenges`
- **Action**: Locate `JH-WTR-1042` with 92% curriculum match. Click **"Adopt Problem"**, review proposal summary by *AquaShield Innovators (BIT Mesra)* proposing a solar membrane ultrafiltration kiosk, and click **"Submit Adoption Proposal"**.
- **Voiceover**: *"A multidisciplinary engineering team from BIT Mesra adopts this verified challenge as their accredited final-year capstone project."*
- **Proof on Screen**: Status updates to **"University Adopted"** and proposal transitions to faculty review queue.

---

### Step 5: Faculty Academic Mentor Approves the Proposal
- **Role**: `Mentor`
- **Page**: `/university/mentors`
- **Action**: Open team *AquaShield Innovators* proposal for `JH-WTR-1042`. Review the technical feasibility (solar ultrafiltration + IoT sensing) and click **"Approve for Capstone Credit"**.
- **Voiceover**: *"The academic mentor evaluates the technical rigor, confirms institutional lab access, and approves capstone academic credits."*
- **Proof on Screen**: Milestone roadmap unlocks with status **"In Development"** and capstone credit eligibility marked as approved.

---

### Step 6: Corporate CSR Pledges Equipment & Capital
- **Role**: `Industry`
- **Page**: `/industry/projects`
- **Action**: Locate `JH-WTR-1042` under University Projects. Click **"Pledge CSR Support"**, select *Tata Steel Foundation*, commit ₹3,80,000 grant for membrane filter units, and submit.
- **Voiceover**: *"Under Companies Act Section 135, corporate CSR provides milestone-locked funding and technical mentors directly to the student team."*
- **Proof on Screen**: CSR grant badge appears on the challenge with ₹3.8L committed and project moves to **"Field Implementation"**.

---

### Step 7: NGO Submits Field Evidence (Turbidity Dropped 890 -> 142)
- **Role**: `NGO`
- **Page**: `/ngo/evidence`
- **Action**: Open `JH-WTR-1042`, review installation report by *Pratham Gramin Vikas Trust*, observe water quality telemetry (measured TDS before: 890, after: 142), and click **"Submit Field Telemetry & Evidence"**.
- **Voiceover**: *"Grassroots NGO partners deploy the prototype on the ground, logging verified water quality improvements from 890 down to 142 TDS."*
- **Proof on Screen**: Field telemetry evidence status updates to **"Submitted for Administrative Audit"** with 2,615 confirmed beneficiaries.

---

### Step 8: District Officer Conducts Social Audit & Verifies Impact
- **Role**: `Government`
- **Page**: `/government/impact`
- **Action**: Select `JH-WTR-1042`. Review the Gram Sabha social audit notes and field evidence. Click **"Certify Social Audit & Mint Impact Credential"**.
- **Voiceover**: *"The District Administration inspects the physical installation, conducts a social audit with the Gram Sabha, and certifies the completed public benefit."*
- **Proof on Screen**: Challenge status updates to **"Resolved"** and digital credential `#SS-2026-1042` is minted.

---

### Step 9: System Mints Credential with Real SHA-256 Hash
- **Role**: `Government` or `Student`
- **Page**: `/challenges/c-wtr-1042`
- **Action**: Scroll to the minted Impact Credential section. Show the 64-character hexadecimal hash (`0x87a784822ab...`) and click **"View Public Verification Certificate"**.
- **Voiceover**: *"The platform automatically generates a cryptographic credential with a 256-bit hash anchoring the university, students, officer, and beneficiary count."*
- **Proof on Screen**: Credential displays tamper-proof seal and direct link to `/verify/SS-2026-1042`.

---

### Step 10: Presenter Opens /verify/SS-2026-1042 & Proves the Hash Verifies
- **Role**: Any (Public)
- **Page**: `/verify/SS-2026-1042`
- **Action**: Allow the page to run real client-side `crypto.subtle.digest` verification. Expand **"How this hash is computed"** to show all 9 canonical governance fields.
- **Voiceover**: *"Anyone in the public can independently verify this credential: the browser canonicalizes 9 governance fields and recomputes the SHA-256 digest in real time."*
- **Proof on Screen**: Large green **"AUTHENTIC CREDENTIAL • VERIFIED"** banner with matching recorded and computed hashes.

---

### Step 11: (Bonus Show-and-Tell) Tampering Detection Demonstration
- **Role**: Any (Public)
- **Page**: `/verify/SS-2026-1042`
- **Action**: Open browser DevTools Console and execute:
  ```javascript
  const c = JSON.parse(localStorage.getItem('samadhansetu_credentials'));
  c[0].impactPopulation = 50000;
  localStorage.setItem('samadhansetu_credentials', JSON.stringify(c));
  location.reload();
  ```
  *(Or explain the automated unit test in `test/workflow.test.ts`)*.
- **Voiceover**: *"If anyone tries to fraudulently inflate the beneficiary numbers from 2,615 to 50,000, the hash mismatch is immediately caught."*
- **Proof on Screen**: Verification fails with a prominent red alert: **"Tampered / Hash Mismatch Detected"**.

---

### Step 12: Presenter Shows Transparent Audit Log
- **Role**: `Government`
- **Page**: `/government/audit`
- **Action**: Show chronological audit log with filter set to `JH-WTR-1042`.
- **Voiceover**: *"Every single action—from citizen report to DM verification to student adoption and final impact sign-off—is preserved in an immutable, transparent governance log."*
- **Proof on Screen**: Timestamped table with actor roles (Citizen, DM Dumka, BIT Mesra, Tata Steel, Pratham Trust) and cryptographic event details.

