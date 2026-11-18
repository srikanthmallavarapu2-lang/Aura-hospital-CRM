/* =====================================================================
   AURELIA CARE — INTERACTIVE FEATURES JS (features.js)
   Hero 3D Scroll Animation, Journey Body Story, OP Booking Flow,
   Diet Planner, Symptom Guide, Visit Road, Doctors Directory & Packages
   ===================================================================== */

(function () {
  "use strict";

  const $ = window.AUR.$ || ((s, c = document) => c.querySelector(s));
  const $$ = window.AUR.$$ || ((s, c = document) => Array.from(c.querySelectorAll(s)));

  /* -------------------------------------------------------------------
     DOCTORS DATA (16 DOCTORS MATCHING EXACT ETHNICITIES & SPECIALTIES)
     ------------------------------------------------------------------- */
  const DOCTORS = [
    {
      id: "d1",
      name: "Dr. Elena Marquez",
      dept: "card",
      deptName: "Cardiology",
      title: "Senior Consultant Interventional Cardiologist",
      degrees: "MD, FACC, FSCAI",
      exp: 18,
      rating: 4.9,
      fee: 1200,
      photo: "assets/img/doc-d1.jpg",
      languages: ["English", "Spanish", "Hindi"],
      workingDays: [1, 2, 3, 4, 5], // Mon-Fri
      hours: "9:00 AM – 2:00 PM",
      nextSlot: "Today 11:30 AM",
      conditions: ["hypertension", "angina", "heart attack", "cholesterol", "palpitations"],
    },
    {
      id: "d2",
      name: "Dr. Omar Haddad",
      dept: "card",
      deptName: "Cardiac Surgery",
      title: "Chief of Cardiothoracic & Vascular Surgery",
      degrees: "MS, MCh (CTVS), FACS",
      exp: 22,
      rating: 4.9,
      fee: 1500,
      photo: "assets/img/doc-d2.jpg",
      languages: ["English", "Arabic", "Hindi"],
      workingDays: [2, 3, 4, 5, 6], // Tue-Sat
      hours: "10:00 AM – 4:00 PM",
      nextSlot: "Tomorrow 10:00 AM",
      conditions: ["bypass surgery", "valve replacement", "aortic aneurysm", "cabg"],
    },
    {
      id: "d3",
      name: "Dr. Meera Iyer",
      dept: "neuro",
      deptName: "Neurology",
      title: "Director of Stroke & Comprehensive Neurocare",
      degrees: "MD, DM (Neurology)",
      exp: 16,
      rating: 4.95,
      fee: 1300,
      photo: "assets/img/doc-d3.jpg",
      languages: ["English", "Kannada", "Hindi", "Tamil"],
      workingDays: [1, 2, 3, 4, 5, 6], // Mon-Sat
      hours: "9:00 AM – 1:00 PM",
      nextSlot: "Today 12:15 PM",
      conditions: ["stroke", "epilepsy", "migraine", "neuropathy", "headache", "parkinsons"],
    },
    {
      id: "d4",
      name: "Dr. Arjun Shetty",
      dept: "ortho",
      deptName: "Spine Surgery",
      title: "Lead Consultant Minimally Invasive Spine Surgery",
      degrees: "MS (Ortho), FNB (Spine)",
      exp: 15,
      rating: 4.85,
      fee: 1200,
      photo: "assets/img/doc-d4.jpg",
      languages: ["English", "Kannada", "Hindi", "Telugu"],
      workingDays: [1, 2, 3, 4, 5], // Mon-Fri
      hours: "10:00 AM – 3:00 PM",
      nextSlot: "Today 2:30 PM",
      conditions: ["sciatica", "slipped disc", "cervical spondylosis", "back pain", "scoliosis"],
    },
    {
      id: "d5",
      name: "Dr. Rahul Kapoor",
      dept: "ortho",
      deptName: "Joint Replacement",
      title: "Chief of Robotic Joint Reconstruction",
      degrees: "MS, MCh (Ortho), Fellow (Arthroplasty)",
      exp: 19,
      rating: 4.9,
      fee: 1200,
      photo: "assets/img/doc-d5.jpg",
      languages: ["English", "Hindi", "Punjabi"],
      workingDays: [2, 3, 4, 5, 6], // Tue-Sat
      hours: "9:00 AM – 2:00 PM",
      nextSlot: "Today 1:00 PM",
      conditions: ["knee replacement", "hip arthritis", "joint pain", "osteoarthritis"],
    },
    {
      id: "d6",
      name: "Dr. Sofia Rossi",
      dept: "ortho",
      deptName: "Sports Medicine",
      title: "Consultant Arthroscopy & Athletic Injury",
      degrees: "MD, Dip. Sports Med (IOC)",
      exp: 12,
      rating: 4.8,
      fee: 1000,
      photo: "assets/img/doc-d6.jpg",
      languages: ["English", "Italian", "Hindi"],
      workingDays: [1, 2, 3, 4], // Mon-Thu
      hours: "11:00 AM – 5:00 PM",
      nextSlot: "Today 3:45 PM",
      conditions: ["acl tear", "meniscus injury", "shoulder dislocation", "ligament sprain", "sports injury"],
    },
    {
      id: "d7",
      name: "Dr. Daniel Tan",
      dept: "onco",
      deptName: "Medical Oncology",
      title: "Senior Consultant Precision Oncology & Immunotherapy",
      degrees: "MBBS, MRCP (UK), FRCR",
      exp: 21,
      rating: 4.95,
      fee: 1500,
      photo: "assets/img/doc-d7.jpg",
      languages: ["English", "Mandarin", "Malay"],
      workingDays: [1, 2, 3, 4, 5], // Mon-Fri
      hours: "8:30 AM – 2:30 PM",
      nextSlot: "Tomorrow 9:00 AM",
      conditions: ["cancer screening", "chemotherapy", "immunotherapy", "lymphoma", "solid tumors"],
    },
    {
      id: "d8",
      name: "Dr. Amara Okafor",
      dept: "paed",
      deptName: "Paediatrics",
      title: "Head of Paediatric & Adolescent Medicine",
      degrees: "MBBS, FAAP, DCH",
      exp: 14,
      rating: 4.9,
      fee: 900,
      photo: "assets/img/doc-d8.jpg",
      languages: ["English", "Yoruba", "Hindi"],
      workingDays: [1, 2, 3, 4, 5, 6], // Mon-Sat
      hours: "10:00 AM – 4:00 PM",
      nextSlot: "Today 11:00 AM",
      conditions: ["child fever", "growth assessment", "paediatric asthma", "infant vaccination", "colic"],
    },
    {
      id: "d9",
      name: "Dr. Farhan Qureshi",
      dept: "nephro",
      deptName: "Nephrology",
      title: "Chief Nephrologist & Transplant Physician",
      degrees: "MD, DM (Nephrology), FISN",
      exp: 17,
      rating: 4.85,
      fee: 1300,
      photo: "assets/img/doc-d9.jpg",
      languages: ["English", "Urdu", "Hindi", "Kannada"],
      workingDays: [1, 2, 3, 4, 5], // Mon-Fri
      hours: "9:00 AM – 3:00 PM",
      nextSlot: "Today 2:00 PM",
      conditions: ["kidney failure", "dialysis", "creatinine", "proteinuria", "kidney transplant"],
    },
    {
      id: "d10",
      name: "Dr. Grace Mensah",
      dept: "gastro",
      deptName: "Gastroenterology",
      title: "Consultant Gastroenterologist & Therapeutic Endoscopist",
      degrees: "MBChB, FRCP (Gastro), FACG",
      exp: 15,
      rating: 4.85,
      fee: 1100,
      photo: "assets/img/doc-d10.jpg",
      languages: ["English", "Twi", "Hindi"],
      workingDays: [2, 3, 4, 5, 6], // Tue-Sat
      hours: "10:00 AM – 3:30 PM",
      nextSlot: "Tomorrow 10:30 AM",
      conditions: ["acid reflux", "ibs", "fatty liver", "ulcer", "colonoscopy", "crohns"],
    },
    {
      id: "d11",
      name: "Dr. Margaret Hughes",
      dept: "women",
      deptName: "Women’s Health",
      title: "Senior Consultant Obstetrics & Advanced Gynaecology",
      degrees: "MBBS, FRCOG, FICOG",
      exp: 24,
      rating: 4.9,
      fee: 1200,
      photo: "assets/img/doc-d11.jpg",
      languages: ["English", "French"],
      workingDays: [1, 2, 3, 4, 5], // Mon-Fri
      hours: "9:00 AM – 1:00 PM",
      nextSlot: "Today 11:45 AM",
      conditions: ["pregnancy", "pcos", "fibroids", "menopause", "prenatal care", "endometriosis"],
    },
    {
      id: "d12",
      name: "Dr. Kwame Asante",
      dept: "endo",
      deptName: "Endocrinology",
      title: "Lead Consultant Diabetologist & Metabolic Disorders",
      degrees: "MD, FACE, FACP",
      exp: 16,
      rating: 4.8,
      fee: 1100,
      photo: "assets/img/doc-d12.jpg",
      languages: ["English", "Akan", "Hindi"],
      workingDays: [1, 2, 3, 4, 5], // Mon-Fri
      hours: "11:00 AM – 4:00 PM",
      nextSlot: "Today 1:15 PM",
      conditions: ["type 2 diabetes", "thyroid nodules", "obesity", "hypothyroidism", "hormonal imbalance"],
    },
    {
      id: "d13",
      name: "Dr. Lukas Weber",
      dept: "pulm",
      deptName: "Pulmonology",
      title: "Senior Consultant Interventional Pulmonology & Sleep",
      degrees: "MD, FCCP, EDARM",
      exp: 13,
      rating: 4.85,
      fee: 1000,
      photo: "assets/img/doc-d13.jpg",
      languages: ["English", "German", "Hindi"],
      workingDays: [1, 2, 3, 4, 5, 6], // Mon-Sat
      hours: "9:00 AM – 2:00 PM",
      nextSlot: "Today 12:00 PM",
      conditions: ["asthma", "copd", "sleep apnea", "chronic cough", "bronchitis", "pneumonia"],
    },
    {
      id: "d14",
      name: "Dr. Nia Williams",
      dept: "derm",
      deptName: "Dermatology",
      title: "Consultant Dermatologist & Cutaneous Surgeon",
      degrees: "MD, FAAD",
      exp: 11,
      rating: 4.9,
      fee: 900,
      photo: "assets/img/doc-d14.jpg",
      languages: ["English", "Welsh", "Hindi"],
      workingDays: [2, 3, 4, 5, 6], // Tue-Sat
      hours: "12:00 PM – 6:00 PM",
      nextSlot: "Today 2:45 PM",
      conditions: ["eczema", "psoriasis", "acne", "hair loss", "skin allergies"],
    },
    {
      id: "d15",
      name: "Dr. Richard Collins",
      dept: "gen",
      deptName: "General Medicine",
      title: "Chief of Internal Medicine & Preventive Health",
      degrees: "MBBS, MD (Internal Medicine), FACP",
      exp: 26,
      rating: 4.9,
      fee: 800,
      photo: "assets/img/doc-d15.jpg",
      languages: ["English", "Hindi"],
      workingDays: [0, 1, 2, 3, 4, 5, 6], // ALL 7 DAYS
      hours: "8:00 AM – 2:00 PM",
      nextSlot: "Today 9:30 AM",
      conditions: ["fever", "hypertension check", "fatigue", "viral infections", "annual checkup", "general illness"],
    },
    {
      id: "d16",
      name: "Ms. Sarah Mitchell",
      dept: "nutr",
      deptName: "Clinical Nutrition",
      title: "Chief Clinical Dietitian & Metabolic Health Specialist",
      degrees: "MSc (Clinical Nutrition), RD, CDE",
      exp: 14,
      rating: 4.95,
      fee: 700,
      photo: "assets/img/doc-d16.jpg",
      languages: ["English", "Hindi"],
      workingDays: [1, 2, 3, 4, 5], // Mon-Fri
      hours: "9:00 AM – 5:00 PM",
      nextSlot: "Today 10:45 AM",
      conditions: ["diabetes diet", "ckd meal plan", "weight management", "cardiac nutrition", "pcos diet"],
    },
  ];

  window.AUR.DOCTORS = DOCTORS;

  /* -------------------------------------------------------------------
     DEPARTMENTS LIST (13 SPECIALTIES)
     ------------------------------------------------------------------- */
  const DEPARTMENTS = [
    { id: "card", name: "Cardiology", icon: "🫀", desc: "Door-to-balloon < 58 mins. 24x7 Cath Labs." },
    { id: "neuro", name: "Neurosciences", icon: "🧠", desc: "Comprehensive Stroke Center & Neurosurgery." },
    { id: "ortho", name: "Orthopaedics", icon: "🦴", desc: "Robotic Joint Replacement & Spine Care." },
    { id: "onco", name: "Oncology", icon: "🎗️", desc: "Precision Immunotherapy & Tumor Board." },
    { id: "paed", name: "Paediatrics", icon: "🧸", desc: "Neonatal ICU & Adolescent Medicine." },
    { id: "nephro", name: "Nephrology", icon: "🫘", desc: "Advanced Dialysis & Renal Transplants." },
    { id: "gastro", name: "Gastroenterology", icon: "🍏", desc: "Digestive Health & Interventional Endoscopy." },
    { id: "women", name: "Women’s Health", icon: "🌸", desc: "High-risk Obstetrics & Gynaecology." },
    { id: "endo", name: "Endocrinology", icon: "🦋", desc: "Diabetes Reversal & Thyroid Clinics." },
    { id: "pulm", name: "Pulmonology", icon: "🫁", desc: "Asthma, Sleep Medicine & Bronchoscopy." },
    { id: "derm", name: "Dermatology", icon: "✨", desc: "Clinical Dermatology & Laser Care." },
    { id: "gen", name: "General Medicine", icon: "🩺", desc: "7-day OPD Internal Medicine Care." },
    { id: "nutr", name: "Clinical Nutrition", icon: "🥗", desc: "Condition-specific Clinical Diets." },
  ];

  window.AUR.DEPARTMENTS = DEPARTMENTS;

  /* -------------------------------------------------------------------
     1. HOME HERO 3D SCENE SCROLL ANIMATION
     ------------------------------------------------------------------- */
  function initHero3D() {
    const heroSection = $("#heroSection");
    const heroStage = $("#hero3DStage");
    const heroShield = $("#heroShield");
    const glowFlash = $("#shieldGlowBurst");
    const flyingObjs = $$(".flying-obj");
    const serviceTiles = $$(".service-tile-card");

    if (!heroSection || !heroStage || !heroShield || !flyingObjs.length) return;

    // Mapping:
    // 0: calendar -> tile 0 (Book Appointment)
    // 1: phone bubble -> tile 1 (Online Consultation)
    // 2: DNA -> tile 2 (Lab Reports)
    // 3: capsule -> tile 3 (Pharmacy Delivery)
    // 4: stethoscope -> tile 4 (Symptom Guide)
    // 5: cross -> tile 5 (24x7 Emergency)

    const initialOffsets = [
      { x: -110, y: -70 }, // calendar
      { x: 100, y: -75 },  // phone bubble
      { x: -130, y: 30 },  // DNA
      { x: 120, y: 25 },   // capsule
      { x: -60, y: -110 }, // stethoscope
      { x: 60, y: -110 },  // cross
    ];

    let cachedTileRects = [];
    let cachedStageCenter = { x: 0, y: 0 };

    function measureLayout() {
      const stageRect = heroStage.getBoundingClientRect();
      cachedStageCenter = {
        x: stageRect.left + stageRect.width / 2,
        y: stageRect.top + stageRect.height / 2 + window.scrollY,
      };

      cachedTileRects = serviceTiles.map((tile) => {
        const slot = tile.querySelector(".service-tile-icon-slot") || tile;
        const rect = slot.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2 + window.scrollY,
        };
      });
    }

    measureLayout();
    window.addEventListener("resize", measureLayout, { passive: true });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measureLayout);
    }

    let ticking = false;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateHeroAnimation();
          ticking = false;
        });
        ticking = true;
      }
    }

    function updateHeroAnimation() {
      const scrollY = window.scrollY;
      const heroHeight = heroSection.offsetHeight;
      // Normalised scroll progress between 0 and 1
      const progress = Math.min(Math.max(scrollY / (heroHeight * 0.75), 0), 1);

      if (progress <= 0.02) {
        // State a: Resting on tray, gently floating
        heroShield.style.transform = `translate3d(0, 0, 0) scale(1)`;
        heroShield.style.opacity = "1";
        if (glowFlash) glowFlash.style.opacity = "0";

        flyingObjs.forEach((obj) => {
          obj.style.opacity = "0";
          obj.style.transform = `scale(0.1) translate3d(0, 0, 0)`;
        });

        serviceTiles.forEach((tile) => {
          tile.style.transform = "none";
          const badge = tile.querySelector(".tile-badge-status");
          if (badge) badge.classList.remove("active");
        });
        return;
      }

      if (progress > 0.02 && progress <= 0.35) {
        // State b: Shield swells, bursts glow, 6 objects shoot OUT
        const subP = (progress - 0.02) / 0.33; // 0 to 1
        const shieldScale = 1 + subP * 0.16; // up to 1.16
        heroShield.style.transform = `translate3d(0, 0, 0) scale(${shieldScale})`;
        heroShield.style.opacity = `${1 - subP * 0.4}`;

        if (glowFlash) {
          glowFlash.style.opacity = `${Math.sin(subP * Math.PI) * 0.85}`;
          glowFlash.style.transform = `scale(${0.6 + subP * 0.8})`;
        }

        flyingObjs.forEach((obj, idx) => {
          const off = initialOffsets[idx];
          // staggered overshoot
          const objProgress = Math.min(Math.max((subP - idx * 0.06) / 0.6, 0), 1);
          const easeOutOvershoot = Math.sin((objProgress * Math.PI) / 2);

          const curX = off.x * easeOutOvershoot;
          const curY = off.y * easeOutOvershoot;
          const curScale = 0.2 + 0.8 * easeOutOvershoot;

          obj.style.opacity = `${objProgress}`;
          obj.style.transform = `translate3d(${curX}px, ${curY}px, 0) scale(${curScale})`;
        });

        serviceTiles.forEach((tile) => {
          const tilt = (1 - subP) * 12;
          tile.style.transform = `perspective(800px) rotateX(${tilt}deg)`;
          const badge = tile.querySelector(".tile-badge-status");
          if (badge) badge.classList.remove("active");
        });
        return;
      }

      if (progress > 0.35) {
        // State c: Objects fly down into the 6 service tiles
        const subP = (progress - 0.35) / 0.65; // 0 to 1
        heroShield.style.opacity = `${Math.max(0, 0.6 - subP * 1.5)}`;

        if (glowFlash) glowFlash.style.opacity = "0";

        flyingObjs.forEach((obj, idx) => {
          const startX = initialOffsets[idx].x;
          const startY = initialOffsets[idx].y;

          const target = cachedTileRects[idx];
          if (!target) return;

          // Target relative to stage center
          const targetDeltaX = target.x - cachedStageCenter.x;
          const targetDeltaY = target.y - cachedStageCenter.y;

          // easeInOutCubic
          const t = subP < 0.5 ? 4 * subP * subP * subP : 1 - Math.pow(-2 * subP + 2, 3) / 2;

          const curX = startX + (targetDeltaX - startX) * t;
          const curY = startY + (targetDeltaY - startY) * t;
          const curScale = 1 - t * 0.45; // shrink as it approaches icon size

          obj.style.opacity = `${Math.max(0, 1 - (t > 0.95 ? (t - 0.95) * 20 : 0))}`;
          obj.style.transform = `translate3d(${curX}px, ${curY}px, 0) scale(${curScale})`;
        });

        serviceTiles.forEach((tile, idx) => {
          tile.style.transform = "none";
          const badge = tile.querySelector(".tile-badge-status");
          if (badge) {
            if (subP > 0.85) {
              badge.classList.add("active");
            } else {
              badge.classList.remove("active");
            }
          }
        });
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    updateHeroAnimation();

    // Mouse-move 3D card tilt on hover
    serviceTiles.forEach((tile) => {
      tile.addEventListener("mousemove", (e) => {
        const rect = tile.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotX = -(y / rect.height) * 12;
        const rotY = (x / rect.width) * 12;
        tile.style.transform = `perspective(600px) rotateX(${rotX.toFixed(1)}deg) rotateY(${rotY.toFixed(1)}deg) translateY(-8px) scale(1.02)`;
      });
      tile.addEventListener("mouseleave", () => {
        tile.style.transform = "none";
      });
    });
  }

  /* -------------------------------------------------------------------
     2. LIVE STATUS STRIP TICKER (Ticking every 3 seconds)
     ------------------------------------------------------------------- */
  function initLiveStatusTicker() {
    const strip = $("#liveStatusStrip");
    if (!strip) return;

    let erWait = 11;
    let genBeds = 42;
    let icuBeds = 7;
    let docsDuty = 38;
    let bloodO = 18;

    const elWait = $("#statusErWait");
    const elGen = $("#statusGenBeds");
    const elIcu = $("#statusIcuBeds");
    const elDocs = $("#statusDocsDuty");
    const elBlood = $("#statusBloodO");

    const barWait = $("#barErWait");
    const barGen = $("#barGenBeds");
    const barIcu = $("#barIcuBeds");

    setInterval(() => {
      // Small realistic fluctuations
      erWait = Math.min(18, Math.max(7, erWait + (Math.random() > 0.5 ? 1 : -1)));
      genBeds = Math.min(50, Math.max(34, genBeds + (Math.random() > 0.5 ? 1 : -1)));
      icuBeds = Math.min(9, Math.max(4, icuBeds + (Math.random() > 0.6 ? 1 : -1)));
      docsDuty = Math.min(42, Math.max(35, docsDuty + (Math.random() > 0.5 ? 1 : -1)));
      bloodO = Math.min(22, Math.max(14, bloodO + (Math.random() > 0.7 ? 1 : -1)));

      if (elWait) elWait.textContent = `${erWait} mins`;
      if (elGen) elGen.textContent = `${genBeds} / 120`;
      if (elIcu) elIcu.textContent = `${icuBeds} / 24`;
      if (elDocs) elDocs.textContent = `${docsDuty} Active`;
      if (elBlood) elBlood.textContent = `${bloodO} Units`;

      if (barWait) barWait.style.width = `${Math.round((erWait / 30) * 100)}%`;
      if (barGen) barGen.style.width = `${Math.round((genBeds / 120) * 100)}%`;
      if (barIcu) barIcu.style.width = `${Math.round((icuBeds / 24) * 100)}%`;
    }, 3000);
  }

  /* -------------------------------------------------------------------
     3. "A JOURNEY THROUGH YOU" — ILLUSTRATED BODY SCROLL STORY
     ------------------------------------------------------------------- */
  function initJourneyStory() {
    const journeySection = $("#journeySection");
    const figureContainer = $("#journeyFigureContainer");
    const progressSegments = $$(".progress-segment");

    if (!journeySection || !figureContainer) return;

    const CHAPTERS = [
      {
        num: "01",
        eyebrow: "01 / 08 · CARDIOLOGY",
        title: "It starts with a heartbeat.",
        desc: "From door to balloon in under 58 minutes. Our digital catheterisation suites operate around the clock with zero transfer delay.",
        statNum: "58 min",
        statText: "Door-to-balloon time\n(Global standard < 90m)",
        linkText: "Meet the Cardiology team →",
        linkUrl: "doctors.html?dept=card",
        cam: { x: 0, y: -40, scale: 1.85, organ: "heart" },
      },
      {
        num: "02",
        eyebrow: "02 / 08 · COMPREHENSIVE CARE",
        title: "The whole of you, in one place.",
        desc: "Medicine should never be fractured. 600 specialists across 25 surgical departments share a single unified patient record.",
        statNum: "600+",
        statText: "Super-specialists on\na single electronic record",
        linkText: "Explore all specialities →",
        linkUrl: "specialities.html",
        cam: { x: 0, y: 0, scale: 1.0, organ: "full" },
      },
      {
        num: "03",
        eyebrow: "03 / 08 · NEUROSCIENCES",
        title: "When minutes mean neurons.",
        desc: "Rapid stroke code response team mobilises in under 10 minutes. Biplane neuro-interventions with 3D brain navigation.",
        statNum: "< 10 min",
        statText: "Code Stroke activation\ntime to scan initiation",
        linkText: "Meet the Neuro team →",
        linkUrl: "doctors.html?dept=neuro",
        cam: { x: 0, y: 160, scale: 2.1, organ: "brain" },
      },
      {
        num: "04",
        eyebrow: "04 / 08 · PULMONOLOGY",
        title: "Every breath, supported.",
        desc: "You take 22,000 breaths a day. Our advanced lung health unit provides robotic bronchoscopy and high-precision asthma care.",
        statNum: "22,000",
        statText: "Breaths taken daily\nsupported by our care",
        linkText: "Meet Pulmonology team →",
        linkUrl: "doctors.html?dept=pulm",
        cam: { x: 0, y: -20, scale: 1.75, organ: "lungs" },
      },
      {
        num: "05",
        eyebrow: "05 / 08 · GASTROENTEROLOGY",
        title: "Gut feeling, backed by science.",
        desc: "9 metres of digestive complexity handled with high-definition endoscopic ultrasound and motility labs.",
        statNum: "9 m",
        statText: "Digestive tract navigated\nwith micro-endoscopy",
        linkText: "Meet Gastro team →",
        linkUrl: "doctors.html?dept=gastro",
        cam: { x: 0, y: -80, scale: 1.75, organ: "gut" },
      },
      {
        num: "06",
        eyebrow: "06 / 08 · NEPHROLOGY",
        title: "Quiet organs, serious care.",
        desc: "Your kidneys filter 180 litres of blood daily. Our transplant institute achieves 98.4% 1-year graft survival.",
        statNum: "180 L",
        statText: "Fluid filtered daily by\nhealthy kidneys",
        linkText: "Meet Nephrology team →",
        linkUrl: "doctors.html?dept=nephro",
        cam: { x: 0, y: -90, scale: 1.8, organ: "kidneys" },
      },
      {
        num: "07",
        eyebrow: "07 / 08 · ORTHOPAEDICS",
        title: "Back on your feet, faster.",
        desc: "Robotic sub-millimetre joint alignment means patients take their first supported steps within 24 hours of surgery.",
        statNum: "24 h",
        statText: "To first steps post\nrobotic joint surgery",
        linkText: "Meet Ortho team →",
        linkUrl: "doctors.html?dept=ortho",
        cam: { x: 0, y: -230, scale: 1.65, organ: "knees" },
      },
      {
        num: "08",
        eyebrow: "08 / 08 · OUTPATIENT CARE",
        title: "Ready when you are.",
        desc: "Average outpatient wait time is 11 minutes. Digital check-in, on-site diagnostics, and medicine delivery at your fingertips.",
        statNum: "11 min",
        statText: "Average OP wait time\nacross all departments",
        linkText: "Book an OP visit →",
        linkUrl: "book.html",
        cam: { x: 0, y: 0, scale: 1.0, organ: "full" },
      },
    ];

    let currentChapter = -1;

    const elNum = $("#journeyChapterNumeral");
    const elEyebrow = $("#journeyChapterEyebrow");
    const elTitle = $("#journeyChapterTitle");
    const elDesc = $("#journeyChapterDesc");
    const elStatNum = $("#journeyChapterStatNum");
    const elStatText = $("#journeyChapterStatText");
    const elLink = $("#journeyChapterLink");

    function setChapter(index) {
      if (index === currentChapter || index < 0 || index >= CHAPTERS.length) return;
      currentChapter = index;
      const c = CHAPTERS[index];

      if (elNum) elNum.textContent = c.num;
      if (elEyebrow) elEyebrow.textContent = c.eyebrow;
      if (elTitle) elTitle.innerHTML = c.title;
      if (elDesc) elDesc.textContent = c.desc;
      if (elStatNum) elStatNum.textContent = c.statNum;
      if (elStatText) elStatText.innerHTML = c.statText.replace("\n", "<br>");
      if (elLink) {
        elLink.textContent = c.linkText;
        elLink.href = c.linkUrl;
      }

      // Camera transform on the figure
      figureContainer.style.transform = `translate3d(${c.cam.x}px, ${c.cam.y}px, 0) scale(${c.cam.scale})`;

      // Organ highlight
      $$(".organ-group", figureContainer).forEach((grp) => {
        if (c.cam.organ === "full") {
          grp.style.opacity = "1";
          grp.style.filter = "none";
        } else if (grp.getAttribute("data-organ") === c.cam.organ) {
          grp.style.opacity = "1";
          grp.style.filter = "drop-shadow(0 0 12px #2a9b95)";
        } else {
          grp.style.opacity = "0.35";
          grp.style.filter = "none";
        }
      });

      // Update rail
      progressSegments.forEach((seg, i) => {
        if (i === index) {
          seg.classList.add("active");
        } else {
          seg.classList.remove("active");
        }
      });
    }

    setChapter(0);

    // Click rail segments to scroll to that chapter
    progressSegments.forEach((seg, i) => {
      seg.addEventListener("click", () => {
        const spacers = $$(".journey-scroll-spacer", journeySection);
        if (spacers[i]) {
          spacers[i].scrollIntoView({ behavior: "smooth" });
        }
      });
    });

    // Scroll listener to activate chapters
    const spacers = $$(".journey-scroll-spacer", journeySection);
    function onJourneyScroll() {
      const topOffset = window.scrollY + window.innerHeight * 0.4;
      spacers.forEach((sp, idx) => {
        const top = sp.offsetTop;
        const h = sp.offsetHeight;
        if (topOffset >= top && topOffset < top + h) {
          setChapter(idx);
        }
      });
    }

    window.addEventListener("scroll", onJourneyScroll, { passive: true });
  }

  /* -------------------------------------------------------------------
     4. TESTIMONIALS CAROUSEL (Home)
     ------------------------------------------------------------------- */
  function initStoriesCarousel() {
    const wrap = $("#storiesCarousel");
    if (!wrap) return;

    const slides = $$(".story-card-slide", wrap);
    const prevBtn = $("#storyPrevBtn");
    const nextBtn = $("#storyNextBtn");
    let current = 0;

    function showSlide(index) {
      slides.forEach((s, i) => {
        s.style.display = i === index ? "grid" : "none";
      });
      current = index;
    }

    showSlide(0);

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        const next = (current - 1 + slides.length) % slides.length;
        showSlide(next);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        const next = (current + 1) % slides.length;
        showSlide(next);
      });
    }

    // Auto advance every 7 seconds
    setInterval(() => {
      const next = (current + 1) % slides.length;
      showSlide(next);
    }, 7000);
  }

  /* -------------------------------------------------------------------
     5. OP BOOKING FLOW (book.html)
     ------------------------------------------------------------------- */
  function initBookingFlow() {
    const bookingApp = $("#bookingApp");
    if (!bookingApp) return;

    let currentStep = 1;
    let selectedDept = null;
    let selectedDoc = null;
    let selectedDate = null;
    let selectedSlot = null;
    let isVideo = false;
    let isFollowUp = false;
    let payMethod = "hospital"; // hospital, online, insurance

    const params = new URLSearchParams(window.location.search);
    const queryDocId = params.get("doc");
    const queryDeptId = params.get("dept");

    // UI elements
    const stepBar = $("#bookingStepBar");
    const trackFill = $("#bookingTrackFill");
    const stepContainers = $$(".booking-step-content", bookingApp);
    const summaryPanel = $("#bookingSummaryPanel");

    function renderSummary() {
      if (!summaryPanel) return;

      const docEl = $("#summaryDoctorName");
      const deptEl = $("#summaryDeptName");
      const dateEl = $("#summaryDateTime");
      const typeEl = $("#summaryVisitType");
      const feeValEl = $("#summaryFeeValue");
      const feeRuleEl = $("#summaryFeeRule");

      if (selectedDoc) {
        if (docEl) docEl.textContent = selectedDoc.name;
        if (deptEl) deptEl.textContent = selectedDoc.deptName;
      } else {
        if (docEl) docEl.textContent = "Select a specialist";
        if (deptEl) deptEl.textContent = selectedDept ? selectedDept.name : "Select department";
      }

      if (selectedDate && selectedSlot) {
        if (dateEl) dateEl.textContent = `${selectedDate}, ${selectedSlot}`;
      } else {
        if (dateEl) dateEl.textContent = "Select date & time";
      }

      if (typeEl) {
        typeEl.textContent = isVideo ? "Video Consultation" : "In-Person OP Visit";
      }

      // Compute fee
      let baseFee = selectedDoc ? selectedDoc.fee : 1000;
      let finalFee = baseFee;
      let ruleText = "Standard Outpatient Fee";

      if (isFollowUp) {
        finalFee = 0;
        ruleText = "Follow-up within 7 days: Complimentary";
      } else {
        if (isVideo) {
          finalFee = Math.round(finalFee * 0.8);
          ruleText = "Video consult (-20%) applied";
        }
        if (payMethod === "online") {
          finalFee = Math.round(finalFee * 0.95);
          ruleText += " • Online payment (-5%)";
        }
      }

      if (feeValEl) {
        feeValEl.textContent = `₹${finalFee.toLocaleString("en-IN")}`;
      }
      if (feeRuleEl) {
        feeRuleEl.textContent = ruleText;
      }
    }

    function goToStep(step) {
      currentStep = step;
      stepContainers.forEach((c) => {
        const s = parseInt(c.getAttribute("data-step"), 10);
        c.style.display = s === step ? "block" : "none";
      });

      // Update step bubble classes
      $$(".step-bubble", stepBar).forEach((b) => {
        const s = parseInt(b.getAttribute("data-step"), 10);
        b.classList.remove("active", "completed");
        if (s === step) {
          b.classList.add("active");
        } else if (s < step) {
          b.classList.add("completed");
        }
      });

      if (trackFill) {
        trackFill.style.width = `${((step - 1) / 4) * 100}%`;
      }

      renderSummary();
      window.scrollTo({ top: bookingApp.offsetTop - 80, behavior: "smooth" });
    }

    // Step 1: Populate departments
    const deptGrid = $("#deptGrid");
    if (deptGrid) {
      deptGrid.innerHTML = "";
      DEPARTMENTS.forEach((d) => {
        const card = document.createElement("div");
        card.className = `dept-card ${selectedDept && selectedDept.id === d.id ? "selected" : ""}`;
        card.innerHTML = `
          <div style="font-size:32px;margin-bottom:8px;">${d.icon}</div>
          <div style="font-weight:700;font-size:15px;margin-bottom:4px;">${d.name}</div>
          <div style="font-size:12px;color:var(--muted);">${d.desc}</div>
        `;
        card.addEventListener("click", () => {
          selectedDept = d;
          $$(".dept-card", deptGrid).forEach((c) => c.classList.remove("selected"));
          card.classList.add("selected");
          populateDoctors(d.id);
          goToStep(2);
        });
        deptGrid.appendChild(card);
      });
    }

    // Step 2: Populate doctors
    const docGrid = $("#bookingDocGrid");
    function populateDoctors(deptId) {
      if (!docGrid) return;
      docGrid.innerHTML = "";
      const filtered = deptId ? DOCTORS.filter((d) => d.dept === deptId) : DOCTORS;

      if (!filtered.length) {
        docGrid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:30px;">All specialists in this department are available for walk-in. Please select General Medicine.</div>`;
        return;
      }

      filtered.forEach((doc) => {
        const card = document.createElement("div");
        card.className = `booking-doc-card ${selectedDoc && selectedDoc.id === doc.id ? "selected" : ""}`;
        card.innerHTML = `
          <div style="display:flex;gap:14px;align-items:center;">
            <img src="${doc.photo}" alt="${doc.name}" style="width:64px;height:64px;border-radius:50%;object-fit:cover;border:2px solid var(--teal);">
            <div>
              <div style="font-weight:700;font-size:16px;">${doc.name}</div>
              <div style="font-size:12px;color:var(--teal);font-weight:600;">${doc.deptName}</div>
              <div style="font-size:12px;color:var(--muted);">${doc.degrees} · ${doc.exp}y exp</div>
            </div>
          </div>
          <div style="font-size:12px;color:var(--ink2);">Languages: ${doc.languages.join(", ")}</div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:auto;padding-top:10px;border-top:1px solid var(--border);">
            <span style="font-weight:700;color:var(--navy);">₹${doc.fee.toLocaleString("en-IN")}</span>
            <span class="badge badge-mint">${doc.nextSlot}</span>
          </div>
        `;
        card.addEventListener("click", () => {
          selectedDoc = doc;
          $$(".booking-doc-card", docGrid).forEach((c) => c.classList.remove("selected"));
          card.classList.add("selected");
          populateDatesAndSlots(doc);
          goToStep(3);
        });
        docGrid.appendChild(card);
      });
    }

    // Step 3: Populate 14 Days & Slots
    function populateDatesAndSlots(doc) {
      const ribbon = $("#dateSelectorRibbon");
      const morningGrid = $("#morningSlotsGrid");
      const afternoonGrid = $("#afternoonSlotsGrid");
      const eveningGrid = $("#eveningSlotsGrid");

      if (!ribbon) return;
      ribbon.innerHTML = "";

      const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      const today = new Date();
      let availableDates = [];

      for (let i = 0; i < 14; i++) {
        const d = new Date();
        d.setDate(today.getDate() + i);
        const dayOfWeek = d.getDay();

        // Check if doctor works on this day
        if (doc.workingDays.includes(dayOfWeek)) {
          availableDates.push(d);
        }
      }

      availableDates.forEach((d, idx) => {
        const pill = document.createElement("div");
        pill.className = `date-pill ${idx === 0 ? "selected" : ""}`;
        const dayName = daysOfWeek[d.getDay()];
        const dayNum = d.getDate();
        const mon = months[d.getMonth()];

        pill.innerHTML = `
          <span style="font-size:11px;font-weight:600;opacity:0.8;">${dayName}</span>
          <span style="font-size:18px;font-weight:700;margin:2px 0;">${dayNum}</span>
          <span style="font-size:11px;opacity:0.8;">${mon}</span>
        `;

        if (idx === 0) {
          selectedDate = `${dayName}, ${dayNum} ${mon}`;
        }

        pill.addEventListener("click", () => {
          $$(".date-pill", ribbon).forEach((p) => p.classList.remove("selected"));
          pill.classList.add("selected");
          selectedDate = `${dayName}, ${dayNum} ${mon}`;
          generateSlots(doc, d);
          renderSummary();
        });
        ribbon.appendChild(pill);
      });

      if (availableDates.length > 0) {
        generateSlots(doc, availableDates[0]);
      }
    }

    function generateSlots(doc, dateObj) {
      const morningGrid = $("#morningSlotsGrid");
      const afternoonGrid = $("#afternoonSlotsGrid");
      const eveningGrid = $("#eveningSlotsGrid");

      if (!morningGrid || !afternoonGrid || !eveningGrid) return;

      morningGrid.innerHTML = "";
      afternoonGrid.innerHTML = "";
      eveningGrid.innerHTML = "";

      const seed = doc.id.charCodeAt(1) + dateObj.getDate() + dateObj.getMonth();

      function isBooked(index) {
        // ~38% pseudo-randomly booked
        return ((seed * 17 + index * 31) % 100) < 38;
      }

      const morningTimes = ["09:00 AM", "09:15 AM", "09:30 AM", "09:45 AM", "10:15 AM", "10:30 AM", "11:00 AM", "11:30 AM"];
      const afternoonTimes = ["12:00 PM", "12:15 PM", "12:45 PM", "01:15 PM", "02:00 PM", "02:30 PM", "03:15 PM", "03:45 PM"];
      const eveningTimes = ["04:15 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:45 PM", "07:15 PM", "07:45 PM"];

      function createSlotButtons(times, targetGrid, offset) {
        times.forEach((t, i) => {
          const booked = isBooked(offset + i);
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = `slot-btn ${selectedSlot === t ? "selected" : ""}`;
          btn.textContent = t;
          if (booked) {
            btn.disabled = true;
          } else {
            btn.addEventListener("click", () => {
              $$(".slot-btn", bookingApp).forEach((b) => b.classList.remove("selected"));
              btn.classList.add("selected");
              selectedSlot = t;
              renderSummary();
            });
          }
          targetGrid.appendChild(btn);
        });
      }

      createSlotButtons(morningTimes, morningGrid, 0);
      createSlotButtons(afternoonTimes, afternoonGrid, 10);
      createSlotButtons(eveningTimes, eveningGrid, 20);
    }

    // Step 4: Details & Validation
    const segmentedButtons = $$(".segment-btn", bookingApp);
    segmentedButtons.forEach((b) => {
      b.addEventListener("click", () => {
        segmentedButtons.forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        isVideo = b.getAttribute("data-type") === "video";
        renderSummary();
      });
    });

    const visitTypeSelect = $("#patientVisitType");
    if (visitTypeSelect) {
      visitTypeSelect.addEventListener("change", (e) => {
        isFollowUp = e.target.value === "followup";
        renderSummary();
      });
    }

    // Step navigation buttons
    $("#btnStep1Next") && $("#btnStep1Next").addEventListener("click", () => goToStep(2));
    $("#btnStep2Back") && $("#btnStep2Back").addEventListener("click", () => goToStep(1));
    $("#btnStep2Next") &&
      $("#btnStep2Next").addEventListener("click", () => {
        if (!selectedDoc) {
          window.AUR.toast("Please select a doctor to continue", "danger");
          return;
        }
        goToStep(3);
      });
    $("#btnStep3Back") && $("#btnStep3Back").addEventListener("click", () => goToStep(2));
    $("#btnStep3Next") &&
      $("#btnStep3Next").addEventListener("click", () => {
        if (!selectedSlot) {
          window.AUR.toast("Please select an appointment time slot", "danger");
          return;
        }
        goToStep(4);
      });
    $("#btnStep4Back") && $("#btnStep4Back").addEventListener("click", () => goToStep(3));
    $("#btnStep4Next") &&
      $("#btnStep4Next").addEventListener("click", () => {
        const name = $("#patientName") ? $("#patientName").value.trim() : "";
        const phone = $("#patientPhone") ? $("#patientPhone").value.trim() : "";
        const age = $("#patientAge") ? $("#patientAge").value.trim() : "";

        if (!name || name.length < 2) {
          window.AUR.toast("Please enter the patient's full name", "danger");
          return;
        }
        if (!phone || !/^\d{10}$/.test(phone.replace(/\D/g, ""))) {
          window.AUR.toast("Please enter a valid 10-digit Indian mobile number", "danger");
          return;
        }
        if (!age || parseInt(age, 10) < 1) {
          window.AUR.toast("Please enter patient age", "danger");
          return;
        }
        goToStep(5);
      });
    $("#btnStep5Back") && $("#btnStep5Back").addEventListener("click", () => goToStep(4));

    // Payment methods
    $$("input[name='payOption']").forEach((radio) => {
      radio.addEventListener("change", (e) => {
        payMethod = e.target.value;
        renderSummary();
      });
    });

    // Step 5 Submit Confirmation
    const bookingForm = $("#bookingFinalForm");
    if (bookingForm) {
      bookingForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const consent = $("#patientConsent");
        if (consent && !consent.checked) {
          window.AUR.toast("Please agree to the medical consultation consent", "danger");
          return;
        }

        const patientName = $("#patientName").value.trim();
        const patientPhone = $("#patientPhone").value.trim();
        const tokenNum = `AUR-${Math.floor(1000 + Math.random() * 9000)}`;
        const uhidNum = `AUR-${Math.floor(800000 + Math.random() * 100000)}`;
        const opdRoom = `Block B, Floor 2, OPD ${Math.floor(10 + Math.random() * 15)}`;

        const bookingData = {
          token: tokenNum,
          uhid: uhidNum,
          doctor: selectedDoc.name,
          dept: selectedDoc.deptName,
          date: selectedDate,
          time: selectedSlot,
          room: opdRoom,
          patient: patientName,
          phone: patientPhone,
          mode: isVideo ? "Video Consultation" : "In-Person OP Visit",
          created: new Date().toISOString(),
        };

        try {
          const list = JSON.parse(localStorage.getItem("aur_my_appointments") || "[]");
          list.unshift(bookingData);
          localStorage.setItem("aur_my_appointments", JSON.stringify(list));
        } catch (err) {}

        // Render confirmation boarding pass
        const confirmationView = $("#bookingConfirmationView");
        const stepsContainer = $("#bookingStepsWrapper");

        if (stepsContainer) stepsContainer.style.display = "none";
        if (summaryPanel) summaryPanel.style.display = "none";

        if (confirmationView) {
          confirmationView.style.display = "block";
          $("#confToken") && ($("#confToken").textContent = tokenNum);
          $("#confUhid") && ($("#confUhid").textContent = uhidNum);
          $("#confDoctor") && ($("#confDoctor").textContent = selectedDoc.name);
          $("#confDept") && ($("#confDept").textContent = selectedDoc.deptName);
          $("#confDate") && ($("#confDate").textContent = selectedDate);
          $("#confTime") && ($("#confTime").textContent = selectedSlot);
          $("#confRoom") && ($("#confRoom").textContent = opdRoom);
          $("#confPatient") && ($("#confPatient").textContent = patientName);
        }

        window.AUR.toast("Appointment confirmed! Boarding pass generated.");
      });
    }

    // Calendar (.ics) download
    const calBtn = $("#btnDownloadIcs");
    if (calBtn) {
      calBtn.addEventListener("click", () => {
        const icsData = [
          "BEGIN:VCALENDAR",
          "VERSION:2.0",
          "PRODID:-//Aurelia CARE//Hospital Appointment//EN",
          "BEGIN:VEVENT",
          `SUMMARY:OP Consultation with ${selectedDoc ? selectedDoc.name : "Aurelia Doctor"}`,
          `DESCRIPTION:Outpatient visit at Aurelia CARE Bengaluru. Room: Block B, Floor 2. Please arrive 15 minutes before time.`,
          `LOCATION:Aurelia CARE - Hospital & Research, 42 Silicon Vista, Sarjapur-Outer Ring Road, Bengaluru`,
          "STATUS:CONFIRMED",
          "BEGIN:VALARM",
          "TRIGGER:-PT2H",
          "ACTION:DISPLAY",
          "DESCRIPTION:Reminder: Aurelia CARE consultation in 2 hours",
          "END:VALARM",
          "END:VEVENT",
          "END:VCALENDAR",
        ].join("\r\n");

        const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `aurelia-appointment-${Date.now()}.ics`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.AUR.toast("Calendar invite (.ics) downloaded!");
      });
    }

    // Print slip
    const printBtn = $("#btnPrintSlip");
    if (printBtn) {
      printBtn.addEventListener("click", () => {
        window.print();
      });
    }

    // Handle query strings on page load
    if (queryDocId) {
      const match = DOCTORS.find((d) => d.id === queryDocId);
      if (match) {
        selectedDoc = match;
        selectedDept = DEPARTMENTS.find((dept) => dept.id === match.dept);
        populateDoctors(match.dept);
        populateDatesAndSlots(match);
        goToStep(3); // Directly open at Date step!
        return;
      }
    }

    if (queryDeptId) {
      const matchDept = DEPARTMENTS.find((d) => d.id === queryDeptId);
      if (matchDept) {
        selectedDept = matchDept;
        populateDoctors(matchDept.id);
        goToStep(2);
        return;
      }
    }

    populateDoctors();
    goToStep(1);
  }

  /* -------------------------------------------------------------------
     6. DIET PLANNER (diet.html)
     ------------------------------------------------------------------- */
  function initDietPlanner() {
    const dietSection = $("#dietPlanner");
    if (!dietSection) return;

    let sex = "F"; // F or M
    let age = 38;
    let height = 165; // cm
    let weight = 68; // kg
    let activity = 1.375; // 1.2, 1.375, 1.55, 1.725
    let isVeg = true;
    let condition = "diabetes"; // diabetes, dash, heart, ckd, pcos, nafld, thyroid, weightloss

    const CONDITIONS_INFO = {
      diabetes: {
        name: "Type 2 Diabetes",
        calorieAdj: -300,
        limits: { sodium: 2000, sugar: 15, satFat: 12 },
        eatMore: ["Methi seeds", "Karela / bitter gourd", "Millets / ragi", "Moong dal", "Jamun / berries"],
        avoid: ["Refined maida", "White sugar & syrups", "Deep fried samosas", "Fruit juices", "Full-fat dairy"],
        guideline: "Focus on complex low-GI carbs, high soluble fibre, and timed regular meals to stabilize insulin spikes.",
      },
      dash: {
        name: "Hypertension (DASH)",
        calorieAdj: -200,
        limits: { sodium: 1500, sugar: 20, satFat: 10 },
        eatMore: ["Potassium-rich greens", "Tender coconut", "Flaxseeds", "Garlic & ginger", "Pomegranate"],
        avoid: ["Pickles & papads", "Processed namkeen", "Soy sauce & MSG", "Canned broths", "Excess caffeine"],
        guideline: "Strict sodium restriction (<1,500mg) paired with potassium, magnesium and calcium rich whole foods.",
      },
      heart: {
        name: "Heart Disease (Lipid Management)",
        calorieAdj: -250,
        limits: { sodium: 1800, sugar: 15, satFat: 8 },
        eatMore: ["Walnuts & almonds", "Oats beta-glucan", "Extra virgin olive oil", "Steamed fish / soy", "Avocado"],
        avoid: ["Vanaspati / trans fats", "Red meat & organ meats", "Commercial pastries", "Palm oil", "Ghee in excess"],
        guideline: "Target LDL reduction via high soluble fibre, phytosterols, and replacing saturated fat with PUFA/MUFA.",
      },
      ckd: {
        name: "Kidney Disease (CKD Stage 3–4)",
        calorieAdj: 0,
        proteinCap: 0.7, // g/kg
        waterCap: 1500, // ml
        limits: { sodium: 1800, potassium: 2000, phosphorus: 800 },
        eatMore: ["Leached vegetables", "Egg white / paneer in moderation", "Apple / guava", "White rice (boiled)", "Cucumber"],
        avoid: ["Tender coconut water", "High-potassium bananas", "Colas & dark sodas", "Organ meats", "Dry fruits"],
        guideline: "Protein restricted to 0.7g/kg/day to minimize uremic toxins; monitor potassium and phosphorus strictly.",
      },
      pcos: {
        name: "PCOS (Metabolic Balance)",
        calorieAdj: -350,
        limits: { sodium: 2000, sugar: 15, satFat: 12 },
        eatMore: ["Spearmint tea", "Cinnamon & turmeric", "Pumpkin seeds (zinc)", "Sprouted legumes", "Cruciferous greens"],
        avoid: ["High glycemic sweets", "Dairy excess", "Processed refined grains", "Alcohol", "Sugary beverages"],
        guideline: "Address insulin resistance and androgen excess through low-GI meals, anti-inflammatory spices and zinc.",
      },
      nafld: {
        name: "Fatty Liver (NAFLD)",
        calorieAdj: -400,
        limits: { sodium: 2000, sugar: 10, satFat: 10 },
        eatMore: ["Black coffee (unfiltered)", "Green leafy vegetables", "Tofu / soya", "Artichoke / crucifers", "Omega-3 oils"],
        avoid: ["High-fructose corn syrup", "Alcohol (absolute stop)", "Refined bakery items", "Deep-fried snacks"],
        guideline: "Gradual 7-10% weight loss reverses hepatic steatosis; eliminate all added sugars and fructose.",
      },
      thyroid: {
        name: "Hypothyroidism",
        calorieAdj: -250,
        limits: { sodium: 2000, sugar: 20, satFat: 12 },
        eatMore: ["Brazil nuts (selenium)", "Iodised salt", "Steamed eggs", "Chia seeds", "Cooked vegetables"],
        avoid: ["Raw goitrogens (raw cabbage/kale)", "Gluten excess", "Soy within 4h of levothyroxine", "Processed meats"],
        guideline: "Support thyroid hormone synthesis with selenium, iodine, and zinc; cook goitrogenic vegetables thoroughly.",
      },
      weightloss: {
        name: "Obesity / Weight Loss",
        calorieAdj: -500,
        proteinCap: 1.3, // g/kg
        limits: { sodium: 2000, sugar: 15, satFat: 10 },
        eatMore: ["High satiety vegetables", "Sprouted chana & rajma", "Low fat paneer / grilled chicken", "Clear soups", "Salads"],
        avoid: ["Liquid calories & sodas", "Buffet overeating", "Late night carbs", "Commercial snacks", "Sugary desserts"],
        guideline: "Sustainable caloric deficit with elevated protein (1.2–1.4g/kg) to preserve lean muscle mass.",
      },
    };

    function recalculate() {
      // Mifflin-St Jeor Formula
      let bmr = 0;
      if (sex === "M") {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
      } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
      }

      const maintenance = Math.round(bmr * activity);
      const condData = CONDITIONS_INFO[condition] || CONDITIONS_INFO.diabetes;

      let targetCalories = maintenance + condData.calorieAdj;
      // Clinical floors
      const minFloor = sex === "M" ? 1500 : 1200;
      if (targetCalories < minFloor) targetCalories = minFloor;

      // BMI (Asian cut-offs: <18.5 Underweight, 18.5-22.9 Normal, 23-27.4 Overweight, >=27.5 Obese)
      const heightM = height / 100;
      const bmi = (weight / (heightM * heightM)).toFixed(1);

      // Water target: ~35ml / kg
      let waterMl = Math.round(weight * 35);
      if (condData.waterCap) {
        waterMl = condData.waterCap;
      }
      const waterGlasses = Math.min(12, Math.max(4, Math.round(waterMl / 250)));

      // Macros
      let proteinG = 0;
      if (condData.proteinCap) {
        proteinG = Math.round(weight * condData.proteinCap);
      } else {
        proteinG = Math.round(weight * 1.0);
      }
      const proteinKcal = proteinG * 4;
      const fatKcal = Math.round(targetCalories * 0.28);
      const fatG = Math.round(fatKcal / 9);
      const carbKcal = Math.max(0, targetCalories - proteinKcal - fatKcal);
      const carbG = Math.round(carbKcal / 4);
      const fibreG = Math.round((targetCalories / 1000) * 14);

      // Update UI elements
      $("#calTargetVal") && ($("#calTargetVal").textContent = targetCalories.toLocaleString("en-IN"));
      $("#calBmrVal") && ($("#calBmrVal").textContent = `${Math.round(bmr)} kcal`);
      $("#calMaintVal") && ($("#calMaintVal").textContent = `${maintenance} kcal`);
      $("#calAdjVal") && ($("#calAdjVal").textContent = `${condData.calorieAdj > 0 ? "+" : ""}${condData.calorieAdj} kcal`);

      // BMI Needle rotation
      // Gauge scale: 15 to 35 -> 180 degrees
      const bmiNeedle = $("#bmiNeedle");
      const bmiValEl = $("#bmiValueText");
      const bmiLabelEl = $("#bmiCategoryLabel");

      if (bmiNeedle) {
        const clampedBmi = Math.min(35, Math.max(15, parseFloat(bmi)));
        const deg = ((clampedBmi - 15) / 20) * 180 - 90;
        bmiNeedle.style.transform = `rotate(${deg}deg)`;
      }

      if (bmiValEl) bmiValEl.textContent = bmi;
      if (bmiLabelEl) {
        let cat = "Normal Weight";
        let color = "#10b981";
        if (bmi < 18.5) {
          cat = "Underweight (<18.5)";
          color = "#3b82f6";
        } else if (bmi <= 22.9) {
          cat = "Optimal Asian BMI (18.5–22.9)";
          color = "#10b981";
        } else if (bmi <= 27.4) {
          cat = "Overweight (23.0–27.4)";
          color = "#f59e0b";
        } else {
          cat = "Obese (≥27.5)";
          color = "#ef4444";
        }
        bmiLabelEl.textContent = cat;
        bmiLabelEl.style.color = color;
      }

      // Water glasses
      const glassesWrap = $("#waterGlassesRow");
      const waterText = $("#waterTargetText");
      if (glassesWrap) {
        glassesWrap.innerHTML = "";
        for (let i = 0; i < 10; i++) {
          const g = document.createElement("div");
          g.className = "water-glass";
          const fill = document.createElement("div");
          fill.className = "water-glass-fill";
          fill.style.height = i < waterGlasses ? "100%" : "0%";
          g.appendChild(fill);
          glassesWrap.appendChild(g);
        }
      }
      if (waterText) {
        waterText.textContent = condData.waterCap
          ? `${waterMl} ml / day (Restricted fluid limit for CKD)`
          : `${waterMl} ml (~${waterGlasses} glasses of 250ml)`;
      }

      // Macros display
      $("#macroProteinG") && ($("#macroProteinG").textContent = `${proteinG}g`);
      $("#macroCarbG") && ($("#macroCarbG").textContent = `${carbG}g`);
      $("#macroFatG") && ($("#macroFatG").textContent = `${fatG}g`);
      $("#macroFibreG") && ($("#macroFibreG").textContent = `${fibreG}g`);

      // Clinical guidance & chips
      $("#dietGuidelineText") && ($("#dietGuidelineText").textContent = condData.guideline);

      const eatMoreWrap = $("#dietEatMoreChips");
      if (eatMoreWrap) {
        eatMoreWrap.innerHTML = condData.eatMore.map((item) => `<span class="badge badge-mint" style="margin:3px;">+ ${item}</span>`).join("");
      }

      const avoidWrap = $("#dietAvoidChips");
      if (avoidWrap) {
        avoidWrap.innerHTML = condData.avoid.map((item) => `<span class="badge badge-danger" style="margin:3px;">- ${item}</span>`).join("");
      }

      // 6-Meal Indian Timeline
      render6MealPlan(targetCalories, isVeg, condition);
    }

    function render6MealPlan(totalCal, veg, cond) {
      const timeline = $("#sampleDayTimeline");
      if (!timeline) return;

      const m1Cal = Math.round(totalCal * 0.05);
      const m2Cal = Math.round(totalCal * 0.25);
      const m3Cal = Math.round(totalCal * 0.1);
      const m4Cal = Math.round(totalCal * 0.32);
      const m5Cal = Math.round(totalCal * 0.08);
      const m6Cal = Math.round(totalCal * 0.2);

      const meals = [
        {
          name: "Early Morning (6:30 AM)",
          cal: m1Cal,
          desc: cond === "diabetes" ? "Warm water + soaked methi & cinnamon" : "Warm lemon water + 4 soaked almonds & 1 walnut",
        },
        {
          name: "Breakfast (8:30 AM)",
          cal: m2Cal,
          desc: veg
            ? "Sprouted moong dal chilla with mint chutney + 1 cup tender vegetable sambar"
            : "2 boiled egg whites + 1 whole egg omelette with spinach & 1 multigrain toast",
        },
        {
          name: "Mid-Morning (11:00 AM)",
          cal: m3Cal,
          desc: cond === "ckd" ? "1 small sweet apple / guava slices" : "Tender coconut water or cucumber & chaat masala + roasted chana",
        },
        {
          name: "Lunch (1:30 PM)",
          cal: m4Cal,
          desc: veg
            ? "1.5 Multigrain phulkas + 1 bowl yellow dal tadka + Palak subzi + Fresh cucumber salad + Curd"
            : "Steamed brown rice / 2 rotis + Grilled fresh fish or herb chicken breast + Sauteed beans + Salad",
        },
        {
          name: "Evening Snack (5:00 PM)",
          cal: m5Cal,
          desc: "Roasted foxnuts (makhana) with rock salt + Steaming green tea or buttermilk",
        },
        {
          name: "Dinner (8:00 PM)",
          cal: m6Cal,
          desc: veg
            ? "Lauki / pumpkin vegetable soup + 1 Ragi phulka + Methi paneer or stirred tofu"
            : "Clear chicken vegetable broth + 1 Multigrain roti + Stir-fried egg whites & broccoli",
        },
      ];

      timeline.innerHTML = meals
        .map(
          (m) => `
        <div class="meal-row">
          <div>
            <div style="font-weight:700;font-size:14px;color:var(--ink);">${m.name}</div>
            <div style="font-size:13px;color:var(--ink2);margin-top:2px;">${m.desc}</div>
          </div>
          <div style="font-weight:700;font-size:14px;color:var(--teal);white-space:nowrap;margin-left:14px;">${m.cal} kcal</div>
        </div>
      `
        )
        .join("");
    }

    // Condition Chips click handlers
    $$(".condition-chip", dietSection).forEach((chip) => {
      chip.addEventListener("click", () => {
        $$(".condition-chip", dietSection).forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        condition = chip.getAttribute("data-condition");
        recalculate();
      });
    });

    // Sex toggle
    const sexBtns = $$(".sex-toggle-btn", dietSection);
    sexBtns.forEach((b) => {
      b.addEventListener("click", () => {
        sexBtns.forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        sex = b.getAttribute("data-sex");
        recalculate();
      });
    });

    // Veg / Non-Veg toggle
    const vegBtns = $$(".diet-type-btn", dietSection);
    vegBtns.forEach((b) => {
      b.addEventListener("click", () => {
        vegBtns.forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        isVeg = b.getAttribute("data-type") === "veg";
        recalculate();
      });
    });

    // Activity selector
    const actSelect = $("#dietActivitySelect");
    if (actSelect) {
      actSelect.addEventListener("change", (e) => {
        activity = parseFloat(e.target.value);
        recalculate();
      });
    }

    // Sliders
    const ageSlider = $("#sliderAge");
    const heightSlider = $("#sliderHeight");
    const weightSlider = $("#sliderWeight");

    if (ageSlider) {
      ageSlider.addEventListener("input", (e) => {
        age = parseInt(e.target.value, 10);
        $("#valAge") && ($("#valAge").textContent = `${age} yrs`);
        recalculate();
      });
    }
    if (heightSlider) {
      heightSlider.addEventListener("input", (e) => {
        height = parseInt(e.target.value, 10);
        $("#valHeight") && ($("#valHeight").textContent = `${height} cm`);
        recalculate();
      });
    }
    if (weightSlider) {
      weightSlider.addEventListener("input", (e) => {
        weight = parseInt(e.target.value, 10);
        $("#valWeight") && ($("#valWeight").textContent = `${weight} kg`);
        recalculate();
      });
    }

    recalculate();
  }

  /* -------------------------------------------------------------------
     7. SYMPTOM GUIDE (symptoms.html)
     ------------------------------------------------------------------- */
  function initSymptomGuide() {
    const symptomGuide = $("#symptomGuide");
    if (!symptomGuide) return;

    let isBackView = false;
    let isChild = false;
    let selectedSymptoms = new Set();

    const HOTSPOTS = {
      front: [
        { id: "head", label: "Head & Face", x: 50, y: 8, symptoms: ["Severe headache", "Dizziness / Vertigo", "Facial droop (FAST)", "Sinus pressure"] },
        { id: "throat", label: "Throat & Neck", x: 50, y: 15, symptoms: ["Sore throat", "Swallowing difficulty", "Neck lump", "Hoarseness"] },
        { id: "chest", label: "Chest & Heart", x: 50, y: 25, symptoms: ["Chest pain / pressure", "Shortness of breath", "Palpitations", "Persistent cough"] },
        { id: "shoulders", label: "Shoulders", x: 34, y: 22, symptoms: ["Shoulder stiffness", "Rotator cuff pain", "Inability to lift arm"] },
        { id: "upper-abdomen", label: "Upper Abdomen", x: 50, y: 36, symptoms: ["Burning acidity", "Upper abdominal fullness", "Nausea after meals", "Jaundice signs"] },
        { id: "lower-abdomen", label: "Lower Abdomen", x: 50, y: 46, symptoms: ["Cramping pain", "Bloating", "Irregular bowel", "Pelvic pressure"] },
        { id: "arms", label: "Arms & Elbows", x: 26, y: 38, symptoms: ["Numbness in fingers", "Tennis elbow pain", "Tremors"] },
        { id: "knees", label: "Knees & Joints", x: 44, y: 72, symptoms: ["Knee clicking / swelling", "Difficulty climbing stairs", "Morning joint stiffness"] },
        { id: "feet", label: "Feet & Ankles", x: 46, y: 92, symptoms: ["Ankle sprain", "Heel pain in morning", "Foot swelling / edema"] },
      ],
      back: [
        { id: "cervical", label: "Cervical Spine", x: 50, y: 14, symptoms: ["Neck stiffness", "Pain radiating to shoulder", "Tension headache"] },
        { id: "upper-back", label: "Upper Back", x: 50, y: 26, symptoms: ["Interscapular ache", "Postural muscle spasm", "Ribcage tightness"] },
        { id: "lumbar", label: "Lower Back", x: 50, y: 44, symptoms: ["Severe low back ache", "Sciatica pain shooting down leg", "Spinal stiffness"] },
        { id: "flanks", label: "Flanks / Kidneys", x: 38, y: 38, symptoms: ["Flank pain", "Painful urination", "Blood in urine", "Frothy urine"] },
        { id: "calves", label: "Calves & Achilles", x: 46, y: 80, symptoms: ["Calf muscle cramps", "Achilles tendon pain", "Varicose vein throbbing"] },
      ],
    };

    const RED_FLAGS = [
      "Chest pain / pressure",
      "Shortness of breath",
      "Facial droop (FAST)",
      "Severe headache",
      "Blood in urine",
    ];

    const mapStage = $("#bodyMapSvgWrap");
    const symptomChecklist = $("#symptomChecklist");
    const redFlagBanner = $("#redFlagBanner");
    const recommendationsPanel = $("#symptomRecommendations");

    function renderHotspots() {
      if (!mapStage) return;
      mapStage.innerHTML = "";

      const currentList = isBackView ? HOTSPOTS.back : HOTSPOTS.front;
      currentList.forEach((spot) => {
        const dot = document.createElement("div");
        dot.className = `body-hotspot ${spot.symptoms.some((s) => selectedSymptoms.has(s)) ? "active" : ""}`;
        dot.style.left = `${spot.x}%`;
        dot.style.top = `${spot.y}%`;
        dot.title = spot.label;

        dot.addEventListener("click", () => {
          showSymptomsForHotspot(spot);
        });
        mapStage.appendChild(dot);
      });
    }

    function showSymptomsForHotspot(spot) {
      if (!symptomChecklist) return;
      symptomChecklist.innerHTML = `
        <h4 style="font-size:16px;margin-bottom:12px;color:var(--navy);">${spot.label} — Choose symptoms:</h4>
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${spot.symptoms
            .map(
              (s) => `
            <label style="display:flex;align-items:center;gap:10px;font-size:14px;cursor:pointer;background:var(--paper2);padding:8px 12px;border-radius:8px;">
              <input type="checkbox" value="${s}" ${selectedSymptoms.has(s) ? "checked" : ""}>
              <span>${s}</span>
            </label>
          `
            )
            .join("")}
        </div>
      `;

      $$("input[type='checkbox']", symptomChecklist).forEach((cb) => {
        cb.addEventListener("change", (e) => {
          if (e.target.checked) {
            selectedSymptoms.add(e.target.value);
          } else {
            selectedSymptoms.delete(e.target.value);
          }
          renderHotspots();
          evaluateRecommendations();
        });
      });
    }

    function evaluateRecommendations() {
      // Check red flags
      let hasRedFlag = false;
      RED_FLAGS.forEach((rf) => {
        if (selectedSymptoms.has(rf)) hasRedFlag = true;
      });

      if (redFlagBanner) {
        redFlagBanner.style.display = hasRedFlag ? "flex" : "none";
      }

      if (!recommendationsPanel) return;

      if (selectedSymptoms.size === 0) {
        recommendationsPanel.innerHTML = `
          <div style="text-align:center;padding:40px 20px;color:var(--muted);">
            <div style="font-size:36px;margin-bottom:10px;">🩺</div>
            <div style="font-weight:600;">Select symptoms on the body map</div>
            <div style="font-size:13px;margin-top:4px;">We'll match you to the right department and doctors with next available slots.</div>
          </div>
        `;
        return;
      }

      // Department matching rules
      let deptId = "gen";
      let matchPct = 85;
      let rationale = "Recommended for initial clinical evaluation and diagnostic triage.";

      if (isChild) {
        deptId = "paed";
        matchPct = 98;
        rationale = "Paediatric assessment recommended for comprehensive child care.";
      } else {
        const symList = Array.from(selectedSymptoms);
        if (symList.some((s) => s.includes("Chest") || s.includes("Palpitation") || s.includes("breath"))) {
          deptId = "card";
          matchPct = 96;
          rationale = "Cardiopulmonary symptoms warrant urgent cardiac evaluation and ECG.";
        } else if (symList.some((s) => s.includes("Head") || s.includes("droop") || s.includes("Vertigo") || s.includes("Numbness"))) {
          deptId = "neuro";
          matchPct = 94;
          rationale = "Neurological symptoms indicate comprehensive brain & nerve review.";
        } else if (symList.some((s) => s.includes("Knee") || s.includes("Back") || s.includes("Shoulder") || s.includes("Spine"))) {
          deptId = "ortho";
          matchPct = 92;
          rationale = "Musculoskeletal signs suggest orthopaedic joint or spine evaluation.";
        } else if (symList.some((s) => s.includes("Abdomen") || s.includes("acidity") || s.includes("Nausea") || s.includes("Jaundice"))) {
          deptId = "gastro";
          matchPct = 91;
          rationale = "Gastrointestinal tract evaluation and ultrasound recommended.";
        } else if (symList.some((s) => s.includes("Flank") || s.includes("urine") || s.includes("Kidney"))) {
          deptId = "nephro";
          matchPct = 95;
          rationale = "Renal symptoms warrant urine routine, serum creatinine and nephrology review.";
        }
      }

      const dept = DEPARTMENTS.find((d) => d.id === deptId) || DEPARTMENTS[0];
      const matchedDocs = DOCTORS.filter((d) => d.dept === deptId).slice(0, 2);

      recommendationsPanel.innerHTML = `
        <div style="background:#ffffff;border-radius:var(--radius-lg);padding:30px;box-shadow:var(--shadow);border:1.5px solid var(--border);">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
            <div>
              <span class="badge badge-mint">${dept.name}</span>
              <h3 style="margin:8px 0 4px;font-size:20px;">Primary Speciality Match</h3>
            </div>
            <div style="width:54px;height:54px;border-radius:50%;background:rgba(42,155,149,0.12);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;color:var(--teal);">
              ${matchPct}%
            </div>
          </div>
          <p style="font-size:14px;color:var(--ink2);margin-bottom:20px;">${rationale}</p>
          <div style="font-weight:700;font-size:14.5px;margin-bottom:12px;color:var(--navy);">Recommended Specialists:</div>
          <div style="display:flex;flex-direction:column;gap:12px;">
            ${matchedDocs
              .map(
                (doc) => `
              <div style="display:flex;align-items:center;justify-content:space-between;background:var(--paper2);padding:14px 16px;border-radius:var(--radius-md);border:1px solid var(--border);">
                <div style="display:flex;align-items:center;gap:12px;">
                  <img src="${doc.photo}" alt="${doc.name}" style="width:48px;height:48px;border-radius:50%;object-fit:cover;">
                  <div>
                    <div style="font-weight:700;font-size:14.5px;">${doc.name}</div>
                    <div style="font-size:12px;color:var(--muted);">${doc.title}</div>
                    <div style="font-size:11.5px;color:var(--teal);font-weight:600;">${doc.nextSlot}</div>
                  </div>
                </div>
                <a href="book.html?doc=${doc.id}" class="btn btn-primary btn-sm">Book</a>
              </div>
            `
              )
              .join("")}
          </div>
          <div style="margin-top:20px;padding-top:14px;border-top:1px solid var(--border);font-size:12px;color:var(--muted);font-style:italic;">
            Note: This guide is for educational prioritization only, not a clinical diagnosis.
          </div>
        </div>
      `;
    }

    // Toggle Front / Back View
    const toggleBackBtn = $("#btnToggleFrontBack");
    if (toggleBackBtn) {
      toggleBackBtn.addEventListener("click", () => {
        isBackView = !isBackView;
        toggleBackBtn.textContent = isBackView ? "Switch to Front View" : "Switch to Back View";
        renderHotspots();
      });
    }

    // Patient is a child toggle
    const childToggle = $("#childSwitchToggle");
    if (childToggle) {
      childToggle.addEventListener("change", (e) => {
        isChild = e.target.checked;
        evaluateRecommendations();
      });
    }

    // Whole body symptoms button
    const wholeBodyBtn = $("#btnWholeBodySymptoms");
    if (wholeBodyBtn) {
      wholeBodyBtn.addEventListener("click", () => {
        showSymptomsForHotspot({
          label: "Whole-Body Symptoms",
          symptoms: ["Unexplained fever", "Severe fatigue", "Sudden weight loss", "Dizziness / Vertigo", "Night sweats"],
        });
      });
    }

    renderHotspots();
    evaluateRecommendations();
  }

  /* -------------------------------------------------------------------
     8. YOUR VISIT ANIMATED ROAD (visit.html)
     ------------------------------------------------------------------- */
  function initVisitRoad() {
    const visitRoadApp = $("#visitRoadApp");
    if (!visitRoadApp) return;

    let currentStop = 0;
    let isPlaying = true;
    let timer = null;

    const STOPS = [
      {
        id: 1,
        title: "Arrive & Park",
        duration: "3 mins",
        desc: "Complimentary valet at Gate 2. Digital sensor directs you to available underground parking bay.",
        tip: "Show your booking SMS at Gate 2 for immediate priority valet intake.",
        widgetType: "valet",
      },
      {
        id: 2,
        title: "Check-in at Kiosk",
        duration: "1 min",
        desc: "Scan your booking QR code at the entrance kiosk to receive your smart consultation token.",
        tip: "Prefer no touch? Self-check in seamlessly via the patient mobile app within 200m of campus.",
        widgetType: "kiosk",
      },
      {
        id: 3,
        title: "Vitals & Triage",
        duration: "5 mins",
        desc: "Nursing care station records your blood pressure, heart rate, SpO₂, height and weight.",
        tip: "All vitals are automatically logged to your physician's digital screen before you step in.",
        widgetType: "vitals",
      },
      {
        id: 4,
        title: "Relax in the Lounge",
        duration: "11 mins",
        desc: "Quiet, unhurried waiting lounge with organic herbal tea, Wi-Fi, and live queue display screens.",
        tip: "A digital chime alerts your phone 3 minutes before your doctor is ready.",
        widgetType: "lounge",
      },
      {
        id: 5,
        title: "Your Consultation",
        duration: "15 mins",
        desc: "Unhurried face-to-face consultation. Your specialist listens, examines, and discusses your care plan.",
        tip: "Feel free to ask questions or have family members join in-person or via secure video link.",
        widgetType: "consult",
      },
      {
        id: 6,
        title: "Tests & Pharmacy",
        duration: "10 mins",
        desc: "Immediate on-floor blood collection and fast-track digital prescription dispensing.",
        tip: "Prescriptions are also sent to your WhatsApp with home delivery options.",
        widgetType: "pharmacy",
      },
      {
        id: 7,
        title: "Head Home",
        duration: "2 mins",
        desc: "Your valet car is waiting at the exit porch. Summary and digital invoices sent to your portal.",
        tip: "Follow-up questions are answered directly via your secure patient chat portal.",
        widgetType: "exit",
      },
    ];

    const roadInfoTitle = $("#roadStepTitle");
    const roadInfoDesc = $("#roadStepDesc");
    const roadInfoTip = $("#roadStepTip");
    const roadInfoDuration = $("#roadStepDuration");
    const roadLiveWidget = $("#roadLiveWidget");
    const travellerDot = $("#roadTravellerDot");

    function renderWidget(type) {
      if (!roadLiveWidget) return;

      if (type === "valet") {
        roadLiveWidget.innerHTML = `
          <div>
            <div class="badge badge-mint" style="margin-bottom:12px;">Live Parking Sensor</div>
            <h4 style="color:#fff;font-size:22px;margin-bottom:8px;">Basement 1 Valet Hub</h4>
            <div style="font-size:36px;font-weight:700;color:#8fe3d9;margin-bottom:4px;">18 Bays Free</div>
            <div style="font-size:13px;color:#c4e9e5;">Gate 2 Valet Desk · Typical drop-off 90 seconds</div>
          </div>
          <div style="padding-top:16px;border-top:1px solid rgba(255,255,255,0.15);font-size:12.5px;color:#a4cecb;">
            ● Sensor refreshed 4 seconds ago
          </div>
        `;
      } else if (type === "kiosk") {
        roadLiveWidget.innerHTML = `
          <div>
            <div class="badge badge-mint" style="margin-bottom:12px;">Express Kiosk Scan</div>
            <h4 style="color:#fff;font-size:22px;margin-bottom:12px;">Digital Pass Scanner</h4>
            <div style="background:rgba(255,255,255,0.1);padding:20px;border-radius:12px;text-align:center;border:1px dashed #8fe3d9;position:relative;overflow:hidden;">
              <div style="font-size:42px;">📱</div>
              <div style="font-size:13px;color:#fff;margin-top:6px;">Place QR code here</div>
              <div style="position:absolute;top:0;left:0;right:0;height:3px;background:#8fe3d9;animation:scan-down 2s linear infinite;"></div>
            </div>
          </div>
          <div style="padding-top:16px;border-top:1px solid rgba(255,255,255,0.15);font-size:12.5px;color:#a4cecb;">
            Token instantly generated on mobile
          </div>
        `;
      } else if (type === "vitals") {
        roadLiveWidget.innerHTML = `
          <div>
            <div class="badge badge-mint" style="margin-bottom:12px;">Nursing Vitals Triage</div>
            <h4 style="color:#fff;font-size:22px;margin-bottom:14px;">Instant Telemetry Sync</h4>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
              <div style="background:rgba(255,255,255,0.08);padding:10px;border-radius:8px;">
                <div style="font-size:11px;color:#a4cecb;">HEART RATE</div>
                <div style="font-size:20px;font-weight:700;color:#fff;">72 bpm</div>
              </div>
              <div style="background:rgba(255,255,255,0.08);padding:10px;border-radius:8px;">
                <div style="font-size:11px;color:#a4cecb;">BLOOD PRESSURE</div>
                <div style="font-size:20px;font-weight:700;color:#fff;">118/76</div>
              </div>
              <div style="background:rgba(255,255,255,0.08);padding:10px;border-radius:8px;">
                <div style="font-size:11px;color:#a4cecb;">SpO₂ OXYGEN</div>
                <div style="font-size:20px;font-weight:700;color:#fff;">98%</div>
              </div>
              <div style="background:rgba(255,255,255,0.08);padding:10px;border-radius:8px;">
                <div style="font-size:11px;color:#a4cecb;">TEMPERATURE</div>
                <div style="font-size:20px;font-weight:700;color:#fff;">98.4°F</div>
              </div>
            </div>
          </div>
          <div style="padding-top:16px;border-top:1px solid rgba(255,255,255,0.15);font-size:12.5px;color:#a4cecb;">
            Synced to EHR record
          </div>
        `;
      } else if (type === "lounge") {
        roadLiveWidget.innerHTML = `
          <div>
            <div class="badge badge-mint" style="margin-bottom:12px;">Live Token Board</div>
            <h4 style="color:#fff;font-size:22px;margin-bottom:10px;">Lounge Display</h4>
            <div style="font-size:14px;color:#a4cecb;">Now serving at OPD 14:</div>
            <div style="font-size:32px;font-weight:700;color:#8fe3d9;margin:4px 0 8px;">AUR-8420</div>
            <div style="font-size:13px;color:#fff;">Your Token: <strong>AUR-8421</strong> (Next in line)</div>
          </div>
          <div style="padding-top:16px;border-top:1px solid rgba(255,255,255,0.15);font-size:12.5px;color:#a4cecb;">
            Chime alert active on your phone
          </div>
        `;
      } else if (type === "consult") {
        roadLiveWidget.innerHTML = `
          <div>
            <div class="badge badge-mint" style="margin-bottom:12px;">Active Consultation</div>
            <h4 style="color:#fff;font-size:22px;margin-bottom:10px;">Dr. Elena Marquez</h4>
            <div style="font-size:13px;color:#a4cecb;margin-bottom:12px;">Cardiology · OPD Suite 14</div>
            <div style="background:rgba(255,255,255,0.08);padding:12px;border-radius:8px;font-size:13px;color:#fff;">
              "Resting ECG normal. Let's discuss stress echoes and long-term lipid strategy."
            </div>
          </div>
          <div style="padding-top:16px;border-top:1px solid rgba(255,255,255,0.15);font-size:12.5px;color:#a4cecb;">
            Full 15-minute dedicated window
          </div>
        `;
      } else if (type === "pharmacy") {
        roadLiveWidget.innerHTML = `
          <div>
            <div class="badge badge-mint" style="margin-bottom:12px;">Diagnostic & Drug Desk</div>
            <h4 style="color:#fff;font-size:22px;margin-bottom:10px;">Fast-Track Dispatch</h4>
            <div style="display:flex;flex-direction:column;gap:8px;font-size:13px;">
              <div style="display:flex;justify-content:space-between;background:rgba(255,255,255,0.08);padding:8px 12px;border-radius:6px;">
                <span>Lipid Profile Blood Draw</span>
                <span style="color:#8fe3d9;">Station 3 Ready</span>
              </div>
              <div style="display:flex;justify-content:space-between;background:rgba(255,255,255,0.08);padding:8px 12px;border-radius:6px;">
                <span>E-Prescription Dispensing</span>
                <span style="color:#8fe3d9;">Bay B Packed</span>
              </div>
            </div>
          </div>
          <div style="padding-top:16px;border-top:1px solid rgba(255,255,255,0.15);font-size:12.5px;color:#a4cecb;">
            Typical wait 4 minutes
          </div>
        `;
      } else {
        roadLiveWidget.innerHTML = `
          <div>
            <div class="badge badge-mint" style="margin-bottom:12px;">Visit Completed</div>
            <h4 style="color:#fff;font-size:22px;margin-bottom:10px;">Safe Travels Home</h4>
            <div style="font-size:13.5px;color:#c4e9e5;margin-bottom:12px;">Valet vehicle brought to Porch B. Your consultation summary is saved to your patient portal.</div>
            <div style="background:rgba(255,255,255,0.08);padding:10px;border-radius:8px;font-size:12.5px;">
              Total visit duration: <strong>47 minutes</strong>
            </div>
          </div>
          <div style="padding-top:16px;border-top:1px solid rgba(255,255,255,0.15);font-size:12.5px;color:#a4cecb;">
            Aurelia CARE Bengaluru
          </div>
        `;
      }
    }

    function setStop(index) {
      currentStop = index;
      const s = STOPS[index];

      if (roadInfoTitle) roadInfoTitle.textContent = `${index + 1}. ${s.title}`;
      if (roadInfoDesc) roadInfoDesc.textContent = s.desc;
      if (roadInfoTip) roadInfoTip.textContent = `💡 Clinical Tip: ${s.tip}`;
      if (roadInfoDuration) roadInfoDuration.textContent = s.duration;

      renderWidget(s.widgetType);

      // Move traveller dot along SVG road
      if (travellerDot) {
        // Coords along SVG road
        const roadCoords = [
          { x: 50, y: 70 },
          { x: 180, y: 150 },
          { x: 310, y: 80 },
          { x: 440, y: 220 },
          { x: 570, y: 140 },
          { x: 700, y: 280 },
          { x: 820, y: 200 },
        ];
        const pt = roadCoords[index] || roadCoords[0];
        travellerDot.setAttribute("cx", pt.x);
        travellerDot.setAttribute("cy", pt.y);
      }

      $$(".road-stop-marker").forEach((m, idx) => {
        if (idx === index) {
          m.classList.add("active");
        } else {
          m.classList.remove("active");
        }
      });
    }

    setStop(0);

    function startAutoPlay() {
      if (timer) clearInterval(timer);
      timer = setInterval(() => {
        if (isPlaying) {
          const next = (currentStop + 1) % STOPS.length;
          setStop(next);
        }
      }, 6000);
    }

    startAutoPlay();

    const playPauseBtn = $("#btnRoadPlayPause");
    if (playPauseBtn) {
      playPauseBtn.addEventListener("click", () => {
        isPlaying = !isPlaying;
        playPauseBtn.textContent = isPlaying ? "⏸ Pause" : "▶ Play";
      });
    }

    const prevBtn = $("#btnRoadPrev");
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        const next = (currentStop - 1 + STOPS.length) % STOPS.length;
        setStop(next);
      });
    }

    const nextBtn = $("#btnRoadNext");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        const next = (currentStop + 1) % STOPS.length;
        setStop(next);
      });
    }

    $$(".road-stop-marker").forEach((m, idx) => {
      m.addEventListener("click", () => {
        setStop(idx);
      });
    });
  }

  /* -------------------------------------------------------------------
     9. DOCTORS DIRECTORY (doctors.html)
     ------------------------------------------------------------------- */
  function initDoctorsDirectory() {
    const docGrid = $("#docDirectoryGrid");
    if (!docGrid) return;

    let showAll = false;
    let currentDept = "all";
    let searchQuery = "";

    const params = new URLSearchParams(window.location.search);
    if (params.get("dept")) currentDept = params.get("dept");
    if (params.get("q")) searchQuery = params.get("q").toLowerCase();

    const searchInput = $("#doctorSearchInput");
    if (searchInput) {
      searchInput.value = searchQuery;
      searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderDoctors();
      });
    }

    const chips = $$(".dept-filter-chip");
    chips.forEach((chip) => {
      if (chip.getAttribute("data-dept") === currentDept) {
        chip.classList.add("active");
      } else {
        chip.classList.remove("active");
      }

      chip.addEventListener("click", () => {
        chips.forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        currentDept = chip.getAttribute("data-dept");
        renderDoctors();
      });
    });

    const toggleBtn = $("#btnToggleAllDoctors");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        showAll = !showAll;
        toggleBtn.textContent = showAll ? "Show Less" : "Show All 16 Specialists";
        renderDoctors();
      });
    }

    function renderDoctors() {
      let filtered = DOCTORS.filter((d) => {
        const matchesDept = currentDept === "all" || d.dept === currentDept;
        const matchesSearch =
          !searchQuery ||
          d.name.toLowerCase().includes(searchQuery) ||
          d.deptName.toLowerCase().includes(searchQuery) ||
          d.conditions.some((c) => c.toLowerCase().includes(searchQuery));
        return matchesDept && matchesSearch;
      });

      const displayList = showAll ? filtered : filtered.slice(0, 8);

      if (!displayList.length) {
        docGrid.innerHTML = `
          <div style="grid-column:1/-1;text-align:center;padding:50px 20px;">
            <h3>No doctors found matching "${searchQuery}"</h3>
            <p style="color:var(--muted);">Try another symptom or department, or view all doctors.</p>
          </div>
        `;
        return;
      }

      docGrid.innerHTML = displayList
        .map(
          (doc) => `
        <div class="doctor-card">
          <div class="doc-photo-wrap">
            <img src="${doc.photo}" alt="${doc.name}" loading="lazy">
            <div class="doc-slot-pill">
              <span class="status-dot-green"></span>
              <span>${doc.nextSlot}</span>
            </div>
          </div>
          <div class="doc-info-body">
            <div class="doc-speciality-label">${doc.deptName} · ${doc.rating} ★</div>
            <h3 class="doc-name">${doc.name}</h3>
            <div class="doc-degrees">${doc.degrees} · ${doc.exp} yrs exp</div>
            <div class="doc-meta-tags">
              <span>🗣 ${doc.languages.slice(0, 2).join(", ")}</span>
              <span>📅 ${doc.hours}</span>
            </div>
            <div class="doc-fee-bar">
              <div class="doc-fee-val">₹${doc.fee.toLocaleString("en-IN")}</div>
              <a href="book.html?doc=${doc.id}" class="btn btn-primary btn-sm">Book</a>
            </div>
          </div>
        </div>
      `
        )
        .join("");
    }

    renderDoctors();
  }

  /* -------------------------------------------------------------------
     10. CHECKUPS PACKAGES TOGGLE (checkups.html)
     ------------------------------------------------------------------- */
  function initPackagesToggle() {
    const pkgGrid = $("#packagesGrid");
    if (!pkgGrid) return;

    let isCouple = false;
    const coupleToggle = $("#coupleCheckupToggle");

    const PACKAGES = [
      {
        id: "p1",
        name: "Essential Health Check",
        singlePrice: 2499,
        mrp: 4999,
        testsCount: "42 Tests",
        featured: false,
        inclusions: [
          "Complete Blood Count (CBC) with ESR",
          "Fasting Blood Sugar & HbA1c",
          "Lipid Profile (Cholesterol & Triglycerides)",
          "Kidney Function Test (Creatinine, Urea)",
          "Liver Function Test (SGPT, SGOT, Bilirubin)",
          "General Physician Consultation",
        ],
      },
      {
        id: "p2",
        name: "Executive Comprehensive",
        singlePrice: 6999,
        mrp: 12999,
        testsCount: "78 Tests",
        featured: true,
        inclusions: [
          "All Essential Health Inclusions",
          "Cardiology: 2D Echocardiogram & TMT",
          "Thyroid Profile (T3, T4, TSH)",
          "High-Resolution Chest X-Ray PA View",
          "Whole Abdomen & Pelvis Ultrasound",
          "Senior Consultant Physician & Diet Review",
        ],
      },
      {
        id: "p3",
        name: "Heart Check Advanced",
        singlePrice: 8999,
        mrp: 16999,
        testsCount: "64 Tests",
        featured: false,
        inclusions: [
          "Digital Coronary Calcium Scoring Scan",
          "2D Colour Doppler Echocardiogram",
          "Treadmill Stress Test (TMT)",
          "Cardiac Enzymes (hs-CRP, Troponin-I)",
          "Apolipoprotein A1 & B Ratios",
          "Consultation with Chief Cardiologist",
        ],
      },
      {
        id: "p4",
        name: "Women’s Wellness Check",
        singlePrice: 4999,
        mrp: 9499,
        testsCount: "58 Tests",
        featured: false,
        inclusions: [
          "Pelvis & Uterus Ultrasound Screening",
          "Pap Smear & Cervical Cytology",
          "Thyroid & PCOS Hormone Panel",
          "Vitamin D3 & B12 Quantitative",
          "Bone Mineral Densitometry (DEXA)",
          "Consultation with Senior Gynaecologist",
        ],
      },
    ];

    function renderPackages() {
      pkgGrid.innerHTML = PACKAGES.map((pkg) => {
        const multiplier = isCouple ? 1.8 : 1.0;
        const currentPrice = Math.round((pkg.singlePrice * multiplier) / 10) * 10;
        const currentMrp = Math.round((pkg.mrp * multiplier) / 10) * 10;

        return `
          <div class="package-card ${pkg.featured ? "featured-dark" : ""}">
            ${pkg.featured ? '<div class="package-badge-popular">Most Popular</div>' : ""}
            <span class="badge ${pkg.featured ? "badge-mint" : "badge-teal"}" style="width:fit-content;margin-bottom:12px;">${pkg.testsCount}</span>
            <h3 style="font-size:22px;margin-bottom:4px;">${pkg.name}</h3>
            <div style="font-size:13px;opacity:0.85;">${isCouple ? "Comprehensive Couple / 2 Person Package" : "Individual Comprehensive Screening"}</div>
            
            <div class="package-pricing">
              <span class="package-price-val">₹${currentPrice.toLocaleString("en-IN")}</span>
              <span class="package-mrp">₹${currentMrp.toLocaleString("en-IN")}</span>
            </div>
            
            <ul class="package-inclusions">
              ${pkg.inclusions.map((inc) => `<li><span style="color:var(--teal2);">✓</span> <span>${inc}</span></li>`).join("")}
            </ul>

            <button class="btn ${pkg.featured ? "btn-primary" : "btn-secondary"}" style="margin-top:auto;" onclick="window.AUR.toast('Checkup ${pkg.name} added. Please choose preferred appointment date in Booking.');setTimeout(()=>window.location.href='book.html', 1200);">
              Book this check
            </button>
          </div>
        `;
      }).join("");
    }

    if (coupleToggle) {
      coupleToggle.addEventListener("change", (e) => {
        isCouple = e.target.checked;
        renderPackages();
      });
    }

    renderPackages();
  }

  /* -------------------------------------------------------------------
     11. FAQ ACCORDION (patients.html)
     ------------------------------------------------------------------- */
  function initFaqAccordion() {
    const faqItems = $$(".faq-item");
    faqItems.forEach((item) => {
      const btn = item.querySelector(".faq-question-btn");
      if (btn) {
        btn.addEventListener("click", () => {
          const isOpen = item.classList.contains("open");
          faqItems.forEach((i) => i.classList.remove("open"));
          if (!isOpen) item.classList.add("open");
        });
      }
    });
  }

  /* -------------------------------------------------------------------
     INITIALIZATION DISPATCHER
     ------------------------------------------------------------------- */
  function initFeatures() {
    initHero3D();
    initLiveStatusTicker();
    initJourneyStory();
    initStoriesCarousel();
    initBookingFlow();
    initDietPlanner();
    initSymptomGuide();
    initVisitRoad();
    initDoctorsDirectory();
    initPackagesToggle();
    initFaqAccordion();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFeatures);
  } else {
    initFeatures();
  }
})();
