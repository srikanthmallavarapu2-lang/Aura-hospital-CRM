<<<<<<< HEAD
# Aura-hospital-CRM
Build a premium, multi-page hospital website for a FICTIONAL hospital, for educational use. Hospital: "[Aurelia] CARE — Hospital &amp; Research", [Bengaluru, India]. Currency ₹ (en-IN formatting). Emergency line [1800-000-0000], help desk [+91 00000 00000], email [care@aurelia.example].
=======
# Aurelia CARE — Hospital & Research
**Bengaluru, Karnataka, India**  
*Quaternary Care & Clinical Excellence · Est. 1998*

> **Educational Demo Notice:** Aurelia CARE is a fictional hospital created for educational and design demonstration purposes. All doctor biographies, phone numbers, emergency statistics, and medical indicators are illustrative.

---

## 🏥 Hospital Overview
- **Hospital Name:** Aurelia CARE — Hospital & Research
- **Location:** 42 Silicon Vista, Sarjapur-Outer Ring Road, Bengaluru 560103, Karnataka, India
- **Currency:** Indian Rupee ₹ (`en-IN` formatting, e.g. ₹2,499, ₹6,999)
- **24×7 Emergency Line:** `1800-000-0000` (Toll-free, non-wrapping)
- **Central Help Desk:** `+91 00000 00000`
- **Email Inquiries:** `care@aurelia.example`
- **Outpatient Hours:** Monday–Saturday, 8:00 AM – 8:00 PM (General Medicine all 7 days)

---

## 🏗️ Architecture & Source Structure
The project strictly follows a static site architecture without external runtime frameworks:

```
Premium Hospital website/
├── hospital/                   # Production-ready static site (no build needed to view)
│   ├── index.html              # Home: 3D hero, service tiles, status ticker, journey story, collage, stories
│   ├── specialities.html       # 8 centre cards (photo reveal), capability marquee, dark tech band, CTA
│   ├── doctors.html            # 16 doctor profiles, search, department chips, slot pills
│   ├── symptoms.html           # Front/back interactive body map triage with red-flag detection
│   ├── book.html               # 5-step OP booking flow, dynamic fee rules, boarding pass ticket (.ics)
│   ├── visit.html              # 47-minute interactive SVG roadmap with 7 stops & live dark-teal widgets
│   ├── diet.html               # 8 condition cards, Mifflin-St Jeor engine, Asian BMI, 6-meal Indian plan
│   ├── checkups.html           # 4 health packages, individual/couple toggle (×1.8), test comparison
│   ├── patients.html           # 6 patient services, 3-article clinical library, 7-question FAQ accordion
│   ├── contact.html            # Campus map card, emergency hotlines, instant call-back form
│   ├── assets/
│   │   ├── site.css            # Unified production stylesheet compiled from _src/*.css
│   │   ├── site.js             # Unified production script compiled from _src/*.js
│   │   └── img/                # 40+ curated, locally downloaded Unsplash photos
│   └── _src/                   # Source architecture
│       ├── body.html           # Full sections for all 10 pages separated by <!-- NAME --> markers
│       ├── style.css           # Base styles, typography, reset, header, footer, modals, floating buttons
│       ├── features.css        # Hero 3D animation, journey body stage, booking steps, diet calculator
│       ├── pages.css           # Layouts for Specialities, Doctors, Checkups, Patients, Contact
│       ├── mint.css            # Mint/aqua theme loaded last, frosted glass, full dark mode, a11y
│       ├── app.js              # Shared app runtime: header, IST clock, modals, Aria chat, toasts
│       ├── features.js         # Interactive engines: 3D scroll, body camera, booking, diet, roadmap
│       └── build.py            # Python compiler script generating hospital/*.html & assets/site.*
├── download_images.py          # Local photo downloader & aspect ratio cropper (Pillow)
├── test_site.py                # Comprehensive Playwright headless test suite (1440x900 & 390x844)
└── README.md                   # Complete architectural, design and license documentation
```

### Build & Compilation
To recompile the pages or assets from source:
```bash
python hospital/_src/build.py
```
This script reads `_src/body.html`, parses sections between `<!-- SECTION -->` markers, concatenates modular CSS and JS into `assets/site.css` and `assets/site.js`, and regenerates all 10 HTML pages with the shared header, top bar, IST clock, mobile menu, footer, Aria chat, and modals.

---

## 🎨 Visual Design Tokens
- **Theme:** Light mint / aqua healthcare UI with frosted-glass cards (`backdrop-filter: blur(14px)`) and soft 3D objects.
- **Typography:** Google Fonts **Poppins** (300 to 700). Headings `font-weight: 600`, letter-spacing `-0.025em`; accent words in teal (never italic). Body font size `15.5px`, minimum text size `12.5px`.
- **Color Palette:**
  - `--bg`: `#eaf6f5` (Body gradient `#eef9f8` → `--bg`)
  - `--paper`: `#ffffff`
  - `--paper2`: `#f3fbfa`
  - `--ink`: `#163a42`
  - `--ink2`: `#3f5f68`
  - `--muted`: `#678891`
  - `--navy`: `#155358`
  - `--navy2`: `#1e6d71`
  - `--teal`: `#2a9b95`
  - `--teal2`: `#45b7af`
  - `--mint`: `#d6f1ee`
  - `--accent-light`: `#8fe3d9`
- **Shadows:** Soft teal-tinted (`0 12px 32px -14px rgba(22,90,95,.25)`) and large (`0 30px 70px -30px rgba(22,90,95,.38)`).
- **Dark Mode:** Complete dark theme support using `[data-theme="dark"]`, syncing with system `prefers-color-scheme` and manual toggle button persisted in `localStorage`.
- **View Transitions:** Cross-document transitions enabled via `@view-transition { navigation: auto; }`.
- **Responsive Layout:** 1440px desktop, tablet, and 390px mobile viewports; zero horizontal overflow (`html, body { overflow-x: clip; }`).

---

## 🚀 Key Feature Highlights

### 1. Home Hero — 3D Scene with Scroll Animation
- **Hero Objects:** Hand-built vector SVG models with glossy multi-stop gradients:
  1. Hero Heart Shield (teal shield with white 3D heart)
  2. Stethoscope
  3. 3D Cross (Red emergency)
  4. Pink-topped Calendar
  5. DNA Double Helix
  6. Teal & White Capsule
  7. Question Telehealth Bubble
- **Scroll States:**
  - **Resting:** Only the heart shield floats above the pedestal tray.
  - **First Scroll (0%–35%):** Shield swells by 16% and bursts with a teal glow flash; the six objects spring out one-by-one.
  - **Further Scroll (35%–90%):** The 6 service cards below tilt up from 3D perspective to flat, and each object glides down into its target tile as its icon, popping on a teal ✓ or red ! badge.
  - **Scroll Reversal:** Scrolling back up reverses the animation seamlessly.

### 2. "A Journey Through You" — Illustrated Body Scroll Story
- 8 chapters (Heart, Full Body, Brain, Lungs, Gut, Kidneys, Knees, Outpatient Triage) across a sticky full-screen stage.
- SVG anatomical human figure with camera zoom and pan (lerped smoothly) focusing on specific glowing organs (Mauve lungs, deep-red beating heart, kidneys, brain sparks, serpentine gut).
- Clickable 8-segment progress rail allowing instant jumping between anatomical chapters.

### 3. Outpatient Booking Engine (`book.html`)
- **5-Step Flow:** 13 Departments → 16 Doctors → 14-Day Calendar & Slot Selector → Patient Details (Validation) → Review & Payment.
- **Dynamic Fee Rules:** Video consultation (−20%), Follow-up within 7 days (Free ₹0), Online prepay (−5%). Summary fee animates with count-up.
- **Boarding Pass Ticket:** Generates token number (e.g. `AUR-8421`), UHID, room location, `.ics` calendar file download with 2-hour reminder, print slip, and saves to `localStorage`.
- **Query String Hand-Offs:** Supports `book.html?doc=d5` (preselects doctor & opens directly at Date step) and `book.html?dept=card`.

### 4. Clinical Diet Planner (`diet.html`)
- **8 Chronic Conditions:** Type 2 Diabetes, Hypertension (DASH), Heart Disease, Kidney Disease (CKD 3–4), PCOS, Fatty Liver (NAFLD), Hypothyroidism, Obesity/Weight Loss.
- **Real-Time Calculations:** Mifflin-St Jeor BMR equation adjusted for clinical conditions (with 1200 F / 1500 M floors), Asian BMI gauge with springy needle, water glasses hydration indicator (with CKD fluid caps), macro gram targets, and 6-meal Indian daily menu.
- **Direct Link:** Routes to Chief Clinical Dietitian Ms. Sarah Mitchell (`book.html?doc=d16`).

### 5. Interactive Body Symptom Guide (`symptoms.html`)
- Front and back human body map with 14 glowing hotspots (Head, Throat, Chest, Abdomen, Back, Knees, Flanks, etc.).
- "Whole-body symptoms" button and "Patient is a child" toggle (routing to Paediatrics).
- Red-flag symptom alert shaking banner with one-click ambulance dispatch for acute cardiac/stroke emergencies.

### 6. The 47-Minute Outpatient Visit Roadmap (`visit.html`)
- Continuous winding SVG road through 7 calibrated stops: Arrive & Park (3m), Check in at Kiosk (1m), Vitals & Triage (5m), Lounge Wait (11m), Consultation (15m), Tests & Pharmacy (10m), Head Home (2m).
- Auto-play timeline (6s per step), glowing traveller dot, and interactive live widgets (valet parking bay counter, QR scanner line, vitals telemetry, token lounge board).

---

## 📸 Local Unsplash Photo Credits
All images are downloaded and stored locally in `hospital/assets/img/` under the Unsplash free license:

| File | Subject / Description | Unsplash ID / Source |
|---|---|---|
| `doc-d1.jpg` | Dr. Elena Marquez (Cardiology) | `photo-1559839734-2b71ea197ec2` |
| `doc-d2.jpg` | Dr. Omar Haddad (Cardiac Surgery) | `photo-1622253692010-333f2da6031d` |
| `doc-d3.jpg` | Dr. Meera Iyer (Neurology) | `photo-1559839734-2b71ea197ec2` |
| `doc-d4.jpg` | Dr. Arjun Shetty (Spine Surgery) | `photo-1537368910025-700350fe46c7` |
| `doc-d5.jpg` | Dr. Rahul Kapoor (Joint Replacement) | `photo-1612349317150-e413f6a5b16d` |
| `doc-d6.jpg` | Dr. Sofia Rossi (Sports Medicine) | `photo-1591604021695-0c69b7c05981` |
| `doc-d7.jpg` | Dr. Daniel Tan (Medical Oncology) | `photo-1622902046580-2b47f47f5471` |
| `doc-d8.jpg` | Dr. Amara Okafor (Paediatrics) | `photo-1551836022-d5d88e9218df` |
| `doc-d9.jpg` | Dr. Farhan Qureshi (Nephrology) | `photo-1582750433449-648ed127bb54` |
| `doc-d10.jpg` | Dr. Grace Mensah (Gastroenterology) | `photo-1651008376811-b90baee60c1f` |
| `doc-d11.jpg` | Dr. Margaret Hughes (Obstetrics) | `photo-1584467735815-f778f274e296` |
| `doc-d12.jpg` | Dr. Kwame Asante (Endocrinology) | `photo-1612349317150-e413f6a5b16d` |
| `doc-d13.jpg` | Dr. Lukas Weber (Pulmonology) | `photo-1537368910025-700350fe46c7` |
| `doc-d14.jpg` | Dr. Nia Williams (Dermatology) | `photo-1559839734-2b71ea197ec2` |
| `doc-d15.jpg` | Dr. Richard Collins (General Medicine) | `photo-1622253692010-333f2da6031d` |
| `doc-d16.jpg` | Ms. Sarah Mitchell (Chief Dietitian) | `photo-1573496359142-b8d87734a5a2` |
| `care-vaccine.jpg` | Elderly patient gentle vaccination | `photo-1631815588090-d4bfec5b1ccb` |
| `care-bedside.jpg` | Bedside compassionate discussion | `photo-1516549655169-df83a0774514` |
| `care-hands.jpg` | Holding hands reassurance | `photo-1584515979956-d9f6e5d09982` |
| `surgery.jpg` | Modular laminar airflow operating theatre | `photo-1579684385127-1ef15d508118` |
| `ambulance.jpg` | Emergency ACLS response unit | `photo-1587745416684-47953f16f02f` |
| `patient-maria.jpg` | Maria L. (Cardiac family story) | `photo-1544005313-94ddf0286df2` |
| `patient-robert.jpg`| Robert T. (Joint replacement patient) | `photo-1507003211169-0a1dd7228f2d` |
| `baby-feet.jpg` | Newborn feet (Aisha & Karan twins) | `photo-1519689680058-324335c77eba` |
| `patient-marco.jpg` | Marco D. (Metabolic health graduate) | `photo-1500648767791-00dcc994a43e` |

---

## 🧪 Headless Verification & Test Results
Tested headlessly using Playwright across **1440×900 (Desktop)** and **390×844 (Mobile)**:
- **Console Errors:** `0` across all 10 pages.
- **Broken Images:** `0` (100% of images verified with valid natural dimensions).
- **Horizontal Overflow:** `0` (`scrollWidth <= innerWidth` strictly verified).
- **Interactive Flows:** End-to-end booking pass generation, diet calculations, and symptom triage verified.
- **Visual Artifacts:** 29 high-resolution test screenshots generated in `test_screenshots/`.
