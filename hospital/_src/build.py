#!/usr/bin/env python3
"""
AURELIA CARE — STATIC SITE BUILD SCRIPT
Reads _src/body.html, splits sections by <!-- NAME --> markers,
concatenates CSS/JS, and generates 10 production-ready HTML pages.
"""

import os
import re

# Determine paths accurately whether run from workspace root or hospital/_src/
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
HOSPITAL_DIR = os.path.abspath(os.path.join(SCRIPT_DIR, ".."))
SRC_DIR = SCRIPT_DIR
ASSETS_DIR = os.path.join(HOSPITAL_DIR, "assets")

os.makedirs(ASSETS_DIR, exist_ok=True)

PAGES_CONFIG = [
    {
        "marker": "INDEX",
        "filename": "index.html",
        "title": "Aurelia CARE — Hospital & Research | Bengaluru, India",
        "desc": "Quaternary medical center in Bengaluru, India. 25 surgical specialties, 48 advanced operating suites, and compassionate patient-centered healthcare.",
        "active": "index",
    },
    {
        "marker": "SPECIALITIES",
        "filename": "specialities.html",
        "title": "Centres of Excellence & Specialities | Aurelia CARE",
        "desc": "Explore 8 quaternary Centres of Excellence, including Cardiac Sciences, Neurosciences, Robotic Orthopaedics, and Organ Transplants.",
        "active": "specialities",
    },
    {
        "marker": "DOCTORS",
        "filename": "doctors.html",
        "title": "Specialist Physicians & Surgeons | Aurelia CARE",
        "desc": "Browse 16 world-class super-specialists across 13 clinical departments. Verified credentials, consultation hours, and instant slot booking.",
        "active": "doctors",
    },
    {
        "marker": "SYMPTOMS",
        "filename": "symptoms.html",
        "title": "Interactive Body Symptom Guide | Aurelia CARE",
        "desc": "Pinpoint discomfort on our 3D interactive anatomy map for clinical department triage and immediate specialist matching.",
        "active": "symptoms",
    },
    {
        "marker": "BOOK",
        "filename": "book.html",
        "title": "Book Outpatient Consultation | Aurelia CARE",
        "desc": "Fast-track 5-step outpatient booking. Choose your specialist, select 15-minute slots, and download your digital boarding pass.",
        "active": "book",
    },
    {
        "marker": "VISIT",
        "filename": "visit.html",
        "title": "Your Outpatient Visit, Step by Step | Aurelia CARE",
        "desc": "Experience a calibrated 47-minute hospital visit from valet arrival and express kiosk check-in to digital consultation and pharmacy.",
        "active": "visit",
    },
    {
        "marker": "DIET",
        "filename": "diet.html",
        "title": "Clinical Nutrition & Metabolic Diet Planner | Aurelia CARE",
        "desc": "Mifflin-St Jeor biometric calorie calculator, Asian BMI gauge, and condition-specific 6-meal Indian clinical diet plans.",
        "active": "diet",
    },
    {
        "marker": "CHECKUPS",
        "filename": "checkups.html",
        "title": "Preventive Health Check Packages | Aurelia CARE",
        "desc": "Comprehensive preventative health screening packages for individuals and couples. NABL-accredited diagnostic precision.",
        "active": "checkups",
    },
    {
        "marker": "PATIENTS",
        "filename": "patients.html",
        "title": "Patient Services & Clinical Library | Aurelia CARE",
        "desc": "Inpatient admissions, cashless TPA insurance desks, home pharmacy express delivery, and evidence-based physician articles.",
        "active": "patients",
    },
    {
        "marker": "CONTACT",
        "filename": "contact.html",
        "title": "Campus Location & 24×7 Emergency Desk | Aurelia CARE",
        "desc": "Find our Bengaluru campus on Sarjapur-Outer Ring Road. 24×7 emergency trauma hotline 1800-000-0000 and instant callback request.",
        "active": "contact",
    },
]

NAV_ITEMS = [
    {"id": "specialities", "href": "specialities.html", "label": "Specialities"},
    {"id": "doctors", "href": "doctors.html", "label": "Doctors"},
    {"id": "symptoms", "href": "symptoms.html", "label": "Symptoms"},
    {"id": "diet", "href": "diet.html", "label": "Diet planner"},
    {"id": "checkups", "href": "checkups.html", "label": "Checkups"},
    {"id": "visit", "href": "visit.html", "label": "Your visit"},
    {"id": "patients", "href": "patients.html", "label": "Patients"},
    {"id": "contact", "href": "contact.html", "label": "Contact"},
]

def build_css():
    css_files = ["style.css", "features.css", "pages.css", "mint.css"]
    combined = []
    for f in css_files:
        path = os.path.join(SRC_DIR, f)
        if os.path.exists(path):
            with open(path, "r", encoding="utf-8") as fp:
                combined.append(f"/* --- {f} --- */\n" + fp.read())
        else:
            print(f"Warning: CSS file {path} not found.")

    out_css = os.path.join(ASSETS_DIR, "site.css")
    with open(out_css, "w", encoding="utf-8") as fp:
        fp.write("\n\n".join(combined))
    print(f"Generated CSS: {out_css} ({len(combined)} modules)")

def build_js():
    js_files = ["app.js", "features.js"]
    combined = []
    for f in js_files:
        path = os.path.join(SRC_DIR, f)
        if os.path.exists(path):
            with open(path, "r", encoding="utf-8") as fp:
                combined.append(f"/* --- {f} --- */\n" + fp.read())
        else:
            print(f"Warning: JS file {path} not found.")

    out_js = os.path.join(ASSETS_DIR, "site.js")
    with open(out_js, "w", encoding="utf-8") as fp:
        fp.write("\n\n".join(combined))
    print(f"Generated JS: {out_js} ({len(combined)} modules)")

def get_shared_header(active_id):
    nav_links_html = "".join([
        f'<li class="nav-item {"active" if item["id"] == active_id else ""}"><a href="{item["href"]}">{item["label"]}</a></li>'
        for item in NAV_ITEMS
    ])

    mobile_links_html = "".join([
        f'<li class="{"active" if item["id"] == active_id else ""}"><a href="{item["href"]}">{item["label"]}</a></li>'
        for item in NAV_ITEMS
    ])

    return f"""
    <!-- Top Bar -->
    <div class="top-bar">
      <div class="container">
        <div class="top-bar-left">
          <a href="tel:18000000000" class="emergency-link">
            <span class="emergency-dot"></span>
            <span>24×7 Emergency: 1800-000-0000</span>
          </a>
          <button class="top-link-btn" data-action="open-sos">Ambulance: Request now</button>
        </div>
        <div class="top-bar-right">
          <span>OPD: Mon–Sat, 8 AM – 8 PM</span>
          <span id="istClock" class="ist-clock">12:00:00 PM IST</span>
        </div>
      </div>
    </div>

    <!-- Sticky Main Navigation -->
    <header class="site-header">
      <nav class="main-nav">
        <div class="container">
          <!-- Logo -->
          <a href="index.html" class="brand-logo" aria-label="Aurelia CARE Homepage">
            <div class="logo-icon">
              <svg viewBox="0 0 24 24"><path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z"/></svg>
            </div>
            <div class="brand-text">
              <span class="brand-name">Aurelia CARE</span>
              <span class="brand-tagline">HOSPITAL & RESEARCH</span>
            </div>
          </a>

          <!-- Desktop Navigation -->
          <ul class="nav-links">
            {nav_links_html}
          </ul>

          <!-- Nav Actions -->
          <div class="nav-actions">
            <!-- Theme Toggle -->
            <button class="theme-toggle-btn" aria-label="Toggle dark mode" title="Toggle theme">
              <svg viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-3.03 0-5.5-2.47-5.5-5.5 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/></svg>
            </button>

            <!-- Book Pill Button -->
            <a href="book.html" class="btn btn-primary btn-sm">Book appointment</a>

            <!-- Mobile Hamburger -->
            <button id="burgerBtn" class="burger-btn" aria-label="Open mobile navigation menu">
              <svg viewBox="0 0 24 24" fill="none"><line x1="3" y1="6" x2="21" y2="6" stroke-width="2" stroke-linecap="round"/><line x1="3" y1="12" x2="21" y2="12" stroke-width="2" stroke-linecap="round"/><line x1="3" y1="18" x2="21" y2="18" stroke-width="2" stroke-linecap="round"/></svg>
            </button>
          </div>
        </div>
      </nav>
    </header>

    <!-- Mobile Navigation Overlay -->
    <div id="mobileNavOverlay" class="mobile-nav-overlay" aria-hidden="true">
      <div class="mobile-nav-panel">
        <div class="mobile-nav-header">
          <div class="brand-logo">
            <div class="logo-icon" style="width:36px;height:36px;">
              <svg viewBox="0 0 24 24" style="width:20px;height:20px;"><path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z"/></svg>
            </div>
            <div class="brand-text">
              <span class="brand-name" style="font-size:17px;">Aurelia CARE</span>
              <span class="brand-tagline">HOSPITAL</span>
            </div>
          </div>
          <button id="closeMobileNavBtn" class="modal-close-btn" aria-label="Close menu">&times;</button>
        </div>

        <ul class="mobile-nav-links">
          {mobile_links_html}
        </ul>

        <div style="margin-top:auto;padding-top:20px;border-top:1px solid var(--border);display:flex;flex-direction:column;gap:12px;">
          <a href="book.html" class="btn btn-primary" style="width:100%;">Book appointment</a>
          <button class="btn btn-danger btn-sm" data-action="open-sos" style="width:100%;">Request Ambulance (24×7)</button>
        </div>
      </div>
    </div>
    """

def get_shared_footer():
    return """
    <!-- Shared Site Footer -->
    <footer class="site-footer">
      <div class="container">
        <!-- Big Hero Line -->
        <div class="footer-hero-quote">
          “Healing is a team sport. You’re the captain.”
        </div>

        <!-- Newsletter Subscription Box -->
        <div class="footer-newsletter-wrap">
          <div class="footer-newsletter-text">
            <h4>Aurelia Health Digest</h4>
            <p>Evidence-based longevity protocols, preventative cardiology tips, and clinic updates directly to your inbox.</p>
          </div>
          <form id="newsletterForm" class="newsletter-form">
            <input type="email" placeholder="Enter your email address" required aria-label="Email for health digest">
            <button type="submit" class="btn btn-primary btn-sm">Subscribe</button>
          </form>
        </div>

        <!-- 3 Columns Links Grid -->
        <div class="footer-grid">
          <div>
            <div class="brand-logo" style="margin-bottom:14px;">
              <div class="logo-icon">
                <svg viewBox="0 0 24 24"><path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z"/></svg>
              </div>
              <div class="brand-text">
                <span class="brand-name" style="color:#ffffff;">Aurelia CARE</span>
                <span class="brand-tagline" style="color:var(--teal2);">HOSPITAL & RESEARCH</span>
              </div>
            </div>
            <p class="footer-brand-bio">
              Quaternary medical institute located in Bengaluru, India. Dedicated to clinical rigor, advanced translational research, and authentic patient compassion.
            </p>
          </div>

          <div class="footer-col">
            <h5>Clinical Institutes</h5>
            <ul>
              <li><a href="specialities.html">Cardiac Sciences</a></li>
              <li><a href="specialities.html">Neurosciences & Stroke</a></li>
              <li><a href="specialities.html">Robotic Orthopaedics</a></li>
              <li><a href="specialities.html">Comprehensive Oncology</a></li>
              <li><a href="specialities.html">Neonatal & Paediatrics</a></li>
              <li><a href="specialities.html">Nephrology & Transplant</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h5>Patients & Visitors</h5>
            <ul>
              <li><a href="book.html">Book Outpatient Visit</a></li>
              <li><a href="doctors.html">Find a Specialist</a></li>
              <li><a href="symptoms.html">Body Symptom Guide</a></li>
              <li><a href="diet.html">Metabolic Diet Planner</a></li>
              <li><a href="checkups.html">Health Check Packages</a></li>
              <li><a href="visit.html">The 47-Minute OP Road</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h5>Hospital Campus</h5>
            <ul>
              <li><a href="contact.html">Campus Map & Parking</a></li>
              <li><a href="tel:18000000000">24×7 Trauma Line</a></li>
              <li><a href="patients.html#pharmacy">Home Pharmacy Delivery</a></li>
              <li><a href="patients.html">Cashless TPA Desk</a></li>
              <li><a href="contact.html">Request Call-Back</a></li>
              <li><a href="#" data-action="open-portal">Patient Portal Login</a></li>
            </ul>
          </div>
        </div>

        <!-- Footer Bottom Bar -->
        <div class="footer-bottom">
          <div>
            © 2026 Aurelia CARE — Hospital & Research. All rights reserved. Bengaluru, India.
          </div>
          <div class="footer-disclaimer-note">
            Educational Demo Notice: Aurelia CARE is a fictional hospital created for educational use. All medical indicators, doctor profiles, and clinical calculations are illustrative.
          </div>
          <div>
            Free Unsplash images curated locally in <code>assets/img/</code>.
          </div>
        </div>
      </div>
    </footer>
    """

def get_shared_modals_and_floating():
    return """
    <!-- FLOATING ACTION BUTTONS -->
    <div class="floating-actions">
      <!-- Back to Top Button -->
      <button id="backToTop" class="float-btn float-top-btn" aria-label="Back to top" title="Back to top">
        <svg viewBox="0 0 24 24" fill="none"><path d="M18 15l-6-6-6 6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>

      <!-- Aria Chat Assistant -->
      <button id="chatBubbleBtn" class="float-btn float-chat-btn" aria-label="Open Aria Chat Assistant" title="Chat with Aria">
        <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>
        <span class="chat-badge-ping"></span>
      </button>

      <!-- Ambulance SOS Floating Button -->
      <button id="sosFloatBtn" class="float-btn float-sos-btn" data-action="open-sos" aria-label="Request Emergency Ambulance" title="24×7 Ambulance SOS">
        <svg viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg>
      </button>
    </div>

    <!-- ARIA CHAT DRAWER -->
    <div id="ariaChatDrawer" style="position:fixed;bottom:90px;right:24px;width:360px;height:520px;background:var(--paper);border-radius:var(--radius-lg);box-shadow:var(--shadow-lg);border:1px solid var(--border-light);z-index:2500;display:flex;flex-direction:column;overflow:hidden;opacity:0;visibility:hidden;transform:translateY(20px) scale(0.95);transition:all 0.3s cubic-bezier(0.16, 1, 0.3, 1);">
      <!-- Header -->
      <div style="background:linear-gradient(135deg, #155358, #0e373a);color:#fff;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;">
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:36px;height:36px;border-radius:50%;background:#2a9b95;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:16px;">A</div>
          <div>
            <div style="font-weight:700;font-size:15px;line-height:1.2;">Aria Care Assistant</div>
            <div style="font-size:11.5px;color:#8fe3d9;">● Online · Aurelia CARE</div>
          </div>
        </div>
        <button id="closeAriaChatBtn" style="background:none;border:none;color:#fff;cursor:pointer;font-size:20px;">&times;</button>
      </div>

      <!-- Messages Body -->
      <div id="ariaChatMessages" style="flex:1;padding:18px;overflow-y:auto;display:flex;flex-direction:column;gap:12px;background:var(--paper2);">
        <div class="aria-msg aria-msg-bot" style="background:#ffffff;padding:12px 16px;border-radius:14px;box-shadow:var(--shadow-sm);font-size:14px;color:var(--ink);max-width:85%;">
          Hello! I'm Aria, your Aurelia CARE navigator. How can I assist you with appointments, diet planning, or emergency guidance today?
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:6px;">
          <button class="aria-quick-chip" style="background:#ffffff;border:1px solid var(--teal);color:var(--teal);padding:4px 10px;border-radius:12px;font-size:12px;cursor:pointer;">Book an appointment</button>
          <button class="aria-quick-chip" style="background:#ffffff;border:1px solid var(--teal);color:var(--teal);padding:4px 10px;border-radius:12px;font-size:12px;cursor:pointer;">Condition diet plan</button>
          <button class="aria-quick-chip" style="background:#ffffff;border:1px solid var(--teal);color:var(--teal);padding:4px 10px;border-radius:12px;font-size:12px;cursor:pointer;">Symptom check</button>
          <button class="aria-quick-chip" style="background:#ffffff;border:1px solid var(--teal);color:var(--teal);padding:4px 10px;border-radius:12px;font-size:12px;cursor:pointer;">Emergency ambulance</button>
        </div>
      </div>

      <!-- Input Footer -->
      <div style="padding:12px 16px;background:var(--paper);border-top:1px solid var(--border);display:flex;gap:8px;">
        <input type="text" id="ariaChatInput" placeholder="Ask a question..." style="flex:1;padding:10px 14px;border-radius:20px;border:1.5px solid var(--border);background:var(--paper2);font-size:14px;color:var(--ink);outline:none;">
        <button id="ariaChatSendBtn" class="btn btn-primary btn-sm" style="padding:0 16px;">Send</button>
      </div>
    </div>

    <style>
      #ariaChatDrawer.open {
        opacity: 1 !important;
        visibility: visible !important;
        transform: translateY(0) scale(1) !important;
      }
      .aria-msg-user {
        background: var(--teal) !important;
        color: #ffffff !important;
        align-self: flex-end;
        border-radius: 14px;
        padding: 10px 14px;
        font-size: 14px;
        max-width: 85%;
      }
      .aria-typing span {
        display: inline-block;
        width: 6px;
        height: 6px;
        background: var(--muted);
        border-radius: 50%;
        margin-right: 4px;
        animation: typing 1.4s infinite both;
      }
      .aria-typing span:nth-child(2) { animation-delay: 0.2s; }
      .aria-typing span:nth-child(3) { animation-delay: 0.4s; }
      @keyframes typing {
        0%, 80%, 100% { transform: scale(0); }
        40% { transform: scale(1); }
      }
    </style>

    <!-- PATIENT PORTAL MODAL -->
    <div id="portalModal" class="modal-backdrop" aria-hidden="true">
      <div class="modal-window">
        <div class="modal-header">
          <h3 class="modal-title">Aurelia Patient Digital Portal</h3>
          <button class="modal-close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <form id="portalLoginForm">
            <p style="font-size:14px;color:var(--muted);margin-bottom:18px;">
              Access your electronic medical records, laboratory values, radiology imaging, and e-prescriptions.
            </p>
            <div class="form-group">
              <label class="form-label" for="portalUhid">Hospital UHID / Registered Mobile</label>
              <input type="text" id="portalUhid" class="form-control" value="AUR-904128" placeholder="e.g. AUR-904128 or 9845012345" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="portalOtp">Enter Demo OTP (Use: <strong>1234</strong>)</label>
              <input type="password" id="portalOtp" class="form-control" value="1234" maxlength="4" placeholder="1234" required>
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%;">Verify & View Records</button>
          </form>

          <div id="portalReportsView" style="display:none;">
            <div style="background:var(--paper2);padding:14px 18px;border-radius:var(--radius-md);margin-bottom:20px;">
              <div style="font-weight:700;font-size:15px;color:var(--navy);">Dorothy Patel · Female · 71 yrs</div>
              <div style="font-size:12px;color:var(--muted);">UHID: AUR-904128 · Primary Consultant: Dr. Elena Marquez</div>
            </div>

            <h4 style="font-size:16px;margin-bottom:12px;">Recent Laboratory & Diagnostic Reports</h4>
            <div style="display:flex;flex-direction:column;gap:10px;">
              <div style="display:flex;align-items:center;justify-content:space-between;padding:12px;background:#ffffff;border:1px solid var(--border);border-radius:8px;">
                <div>
                  <div style="font-weight:600;font-size:14px;">Complete Blood Count (CBC) with ESR</div>
                  <div style="font-size:12px;color:var(--teal);">Verified Normal · Reported 16 Nov 2026</div>
                </div>
                <button class="btn btn-secondary btn-sm" onclick="window.AUR.toast('Downloading PDF: CBC_AUR904128.pdf')">PDF</button>
              </div>

              <div style="display:flex;align-items:center;justify-content:space-between;padding:12px;background:#ffffff;border:1px solid var(--border);border-radius:8px;">
                <div>
                  <div style="font-weight:600;font-size:14px;">Comprehensive Lipid Panel</div>
                  <div style="font-size:12px;color:#f59e0b;">Borderline (Total: 204 mg/dL) · Reported 16 Nov 2026</div>
                </div>
                <button class="btn btn-secondary btn-sm" onclick="window.AUR.toast('Downloading PDF: Lipid_AUR904128.pdf')">PDF</button>
              </div>

              <div style="display:flex;align-items:center;justify-content:space-between;padding:12px;background:#ffffff;border:1px solid var(--border);border-radius:8px;">
                <div>
                  <div style="font-weight:600;font-size:14px;">2D Colour Doppler Echocardiogram</div>
                  <div style="font-size:12px;color:var(--teal);">LVEF 62% Normal LV Systolic · Reported 15 Nov 2026</div>
                </div>
                <button class="btn btn-secondary btn-sm" onclick="window.AUR.toast('Downloading PDF: Echo_AUR904128.pdf')">PDF</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- AMBULANCE SOS MODAL -->
    <div id="ambulanceModal" class="modal-backdrop" aria-hidden="true">
      <div class="modal-window">
        <div class="modal-header" style="background:#fee2e2;border-bottom:2px solid #ef4444;">
          <h3 class="modal-title" style="color:#991b1b;display:flex;align-items:center;gap:8px;">
            <span>🚨</span> 24×7 GPS Ambulance Dispatch
          </h3>
          <button class="modal-close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <form id="ambulanceForm">
            <p style="font-size:14px;color:var(--ink2);margin-bottom:18px;">
              Immediate telemetry ambulance with trained paramedics dispatched from nearest hub in Bengaluru.
            </p>
            <div class="form-group">
              <label class="form-label" for="ambAddress">Current Pickup Location in Bengaluru *</label>
              <input type="text" id="ambAddress" class="form-control" placeholder="e.g. 14th Cross, HSR Layout Sector 2, Bengaluru" required>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
              <div class="form-group">
                <label class="form-label" for="ambType">Emergency Category</label>
                <select id="ambType" class="form-control">
                  <option value="cardiac">Cardiac / Chest Pain</option>
                  <option value="stroke">Suspected Stroke (FAST)</option>
                  <option value="trauma">Trauma / Accident</option>
                  <option value="respiratory">Severe Breathing Difficulty</option>
                  <option value="other">Other Medical Acute Emergency</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="ambPhone">Contact Phone *</label>
                <input type="tel" id="ambPhone" class="form-control" placeholder="9845012345" maxlength="10" required>
              </div>
            </div>
            <button type="submit" class="btn btn-danger btn-lg" style="width:100%;">Dispatch Emergency Ambulance Now</button>
          </form>

          <div id="ambulanceTrackingView" style="display:none;text-align:center;">
            <div style="font-size:48px;margin-bottom:8px;">🚑</div>
            <h3 style="color:#991b1b;font-size:22px;margin-bottom:4px;">Ambulance Dispatched!</h3>
            <div style="font-size:14px;color:var(--muted);margin-bottom:16px;">Unit KA-01-EA-9911 is en route with mobile ACLS defibrillator and telemetry.</div>
            
            <div style="background:var(--paper2);padding:18px;border-radius:var(--radius-md);margin-bottom:20px;">
              <div style="font-size:12px;color:var(--muted);">ESTIMATED TIME OF ARRIVAL</div>
              <div id="ambEtaDisplay" style="font-size:36px;font-weight:700;color:#dc2626;margin:4px 0 10px;">8m 45s</div>
              <div class="live-progress-bar-bg" style="height:10px;">
                <div id="ambLiveFill" class="live-progress-bar-fill" style="background:#dc2626;width:25%;"></div>
              </div>
            </div>

            <div style="font-size:13.5px;text-align:left;background:#ffffff;border:1px solid var(--border);padding:14px;border-radius:8px;">
              <div><strong>Driver:</strong> Suresh (+91 98450 12345)</div>
              <div><strong>Lead Paramedic:</strong> Rajesh Kumar, EMT-P</div>
              <div><strong>Hospital Hotline:</strong> 1800-000-0000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    """

def split_body_sections():
    body_path = os.path.join(SRC_DIR, "body.html")
    if not os.path.exists(body_path):
        raise FileNotFoundError(f"Source file {body_path} not found.")

    with open(body_path, "r", encoding="utf-8") as fp:
        content = fp.read()

    sections = {}
    valid_markers = {"INDEX", "SPECIALITIES", "DOCTORS", "SYMPTOMS", "BOOK", "VISIT", "DIET", "CHECKUPS", "PATIENTS", "CONTACT"}
    
    # Match only comments where the text is exactly one of the valid section markers
    pattern = r"<!--\s*(" + "|".join(valid_markers) + r")\s*-->"
    matches = list(re.finditer(pattern, content))

    for i in range(len(matches)):
        name = matches[i].group(1)
        start = matches[i].end()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(content)
        sections[name] = content[start:end].strip()

    print(f"Parsed {len(sections)} sections from body.html: {list(sections.keys())}")
    return sections

def build_pages(sections):
    for cfg in PAGES_CONFIG:
        marker = cfg["marker"]
        filename = cfg["filename"]
        title = cfg["title"]
        desc = cfg["desc"]
        active = cfg["active"]

        body_content = sections.get(marker, f"<p>Content for {marker} not found.</p>")

        header_html = get_shared_header(active)
        footer_html = get_shared_footer()
        modals_html = get_shared_modals_and_floating()

        page_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <meta name="description" content="{desc}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/site.css">
</head>
<body>
  {header_html}

  <main>
    {body_content}
  </main>

  {footer_html}
  {modals_html}

  <script src="assets/site.js"></script>
</body>
</html>
"""

        out_path = os.path.join(HOSPITAL_DIR, filename)
        with open(out_path, "w", encoding="utf-8") as fp:
            fp.write(page_html)
        print(f"Generated page: {filename}")

def main():
    print("Building Aurelia CARE Static Site...")
    build_css()
    build_js()
    sections = split_body_sections()
    build_pages(sections)
    print("Build completed successfully!")

if __name__ == "__main__":
    main()
