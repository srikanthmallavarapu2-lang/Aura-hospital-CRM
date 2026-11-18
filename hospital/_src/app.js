/* =====================================================================
   AURELIA CARE — CORE APP JS (app.js)
   Shared Header, Live Clock, Nav, Modals, Aria Chat, Portal, Toast & Global Helpers
   ===================================================================== */

(function () {
  "use strict";

  // Global namespace
  window.AUR = window.AUR || {};

  // Safe DOM selector helpers
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

  window.AUR.$ = $;
  window.AUR.$$ = $$;

  /* -------------------------------------------------------------------
     1. TOAST NOTIFICATION SYSTEM
     ------------------------------------------------------------------- */
  function showToast(message, type = "info") {
    let container = $("#toastContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "toastContainer";
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div style="flex:1;">${message}</div>
      <button style="background:none;border:none;cursor:pointer;color:var(--muted);font-size:16px;" aria-label="Close">&times;</button>
    `;

    toast.querySelector("button").addEventListener("click", () => {
      toast.remove();
    });

    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) {
        toast.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        toast.style.opacity = "0";
        toast.style.transform = "translateX(-20px)";
        setTimeout(() => toast.remove(), 300);
      }
    }, 4500);
  }
  window.AUR.toast = showToast;

  /* -------------------------------------------------------------------
     2. LIVE IST CLOCK (Indian Standard Time)
     ------------------------------------------------------------------- */
  function initLiveClock() {
    const clockEl = $("#istClock");
    if (!clockEl) return;

    function update() {
      try {
        const now = new Date();
        const timeStr = now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });
        clockEl.textContent = `${timeStr} IST`;
      } catch (e) {
        const d = new Date();
        clockEl.textContent = d.toLocaleTimeString() + " IST";
      }
    }
    update();
    setInterval(update, 1000);
  }

  /* -------------------------------------------------------------------
     3. DARK MODE TOGGLE (prefers-color-scheme & localStorage)
     ------------------------------------------------------------------- */
  function initTheme() {
    let currentTheme = "light";
    try {
      const stored = localStorage.getItem("aur_theme");
      if (stored) {
        currentTheme = stored;
      } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        currentTheme = "dark";
      }
    } catch (e) {
      // localStorage disabled or sandbox
    }

    document.documentElement.setAttribute("data-theme", currentTheme);

    const toggleBtns = $$(".theme-toggle-btn");
    toggleBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        currentTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", currentTheme);
        try {
          localStorage.setItem("aur_theme", currentTheme);
        } catch (e) {}
        showToast(`Switched to ${currentTheme} mode`);
      });
    });
  }

  /* -------------------------------------------------------------------
     4. MOBILE MENU
     ------------------------------------------------------------------- */
  function initMobileMenu() {
    const burgerBtn = $("#burgerBtn");
    const mobileOverlay = $("#mobileNavOverlay");
    const closeBtn = $("#closeMobileNavBtn");

    if (!burgerBtn || !mobileOverlay) return;

    function openMenu() {
      mobileOverlay.classList.add("open");
      document.body.style.overflow = "hidden";
    }

    function closeMenu() {
      mobileOverlay.classList.remove("open");
      document.body.style.overflow = "";
    }

    burgerBtn.addEventListener("click", openMenu);
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
    mobileOverlay.addEventListener("click", (e) => {
      if (e.target === mobileOverlay) closeMenu();
    });

    $$(".mobile-nav-links a", mobileOverlay).forEach((a) => {
      a.addEventListener("click", closeMenu);
    });
  }

  /* -------------------------------------------------------------------
     5. MODALS (Patient Portal & Ambulance SOS)
     ------------------------------------------------------------------- */
  function initModals() {
    // Open modal helper
    window.AUR.openModal = function (modalId) {
      const modal = $(modalId);
      if (modal) {
        modal.classList.add("open");
        document.body.style.overflow = "hidden";
      }
    };

    // Close modal helper
    window.AUR.closeModal = function (modalId) {
      const modal = $(modalId);
      if (modal) {
        modal.classList.remove("open");
        document.body.style.overflow = "";
      }
    };

    $$(".modal-backdrop").forEach((backdrop) => {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) {
          backdrop.classList.remove("open");
          document.body.style.overflow = "";
        }
      });
      const closeBtn = backdrop.querySelector(".modal-close-btn");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          backdrop.classList.remove("open");
          document.body.style.overflow = "";
        });
      }
    });

    // SOS triggers
    $$("[data-action='open-sos']").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        window.AUR.openModal("#ambulanceModal");
      });
    });

    // Portal triggers
    $$("[data-action='open-portal']").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        window.AUR.openModal("#portalModal");
      });
    });

    // Ambulance form submission & live tracking
    const ambForm = $("#ambulanceForm");
    const ambTrackingView = $("#ambulanceTrackingView");
    if (ambForm && ambTrackingView) {
      ambForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const address = $("#ambAddress") ? $("#ambAddress").value : "Bengaluru";
        const emergencyType = $("#ambType") ? $("#ambType").value : "Medical Emergency";

        ambForm.style.display = "none";
        ambTrackingView.style.display = "block";

        let etaMinutes = 8;
        let etaSeconds = 45;
        const etaDisplay = $("#ambEtaDisplay");
        const ambFill = $("#ambLiveFill");

        const interval = setInterval(() => {
          if (etaSeconds > 0) {
            etaSeconds -= 5;
          } else {
            etaMinutes--;
            etaSeconds = 55;
          }
          if (etaMinutes <= 0 && etaSeconds <= 0) {
            clearInterval(interval);
            if (etaDisplay) etaDisplay.textContent = "Arrived at location";
            if (ambFill) ambFill.style.width = "100%";
          } else {
            if (etaDisplay) etaDisplay.textContent = `${etaMinutes}m ${etaSeconds}s`;
            if (ambFill) {
              const pct = Math.min(95, Math.round(((540 - (etaMinutes * 60 + etaSeconds)) / 540) * 100));
              ambFill.style.width = `${pct}%`;
            }
          }
        }, 1500);

        showToast("Ambulance dispatched! Unit KA-01-EA-9911 is en route.");
      });
    }

    // Patient Portal Login simulation
    const portalForm = $("#portalLoginForm");
    const portalReportsView = $("#portalReportsView");
    if (portalForm && portalReportsView) {
      portalForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const otp = $("#portalOtp") ? $("#portalOtp").value : "";
        if (otp === "1234" || otp.length === 4 || otp === "") {
          portalForm.style.display = "none";
          portalReportsView.style.display = "block";
          showToast("UHID Verified: Welcome back, Dorothy Patel.");
        } else {
          showToast("Please enter demo OTP: 1234", "danger");
        }
      });
    }
  }

  /* -------------------------------------------------------------------
     6. ARIA SCRIPTED CHAT ASSISTANT
     ------------------------------------------------------------------- */
  function initAriaChat() {
    const chatBtn = $("#chatBubbleBtn");
    const chatDrawer = $("#ariaChatDrawer");
    const closeBtn = $("#closeAriaChatBtn");
    const chatInput = $("#ariaChatInput");
    const sendBtn = $("#ariaChatSendBtn");
    const messagesBody = $("#ariaChatMessages");

    if (!chatBtn || !chatDrawer) return;

    chatBtn.addEventListener("click", () => {
      chatDrawer.classList.toggle("open");
      if (chatDrawer.classList.contains("open") && chatInput) {
        chatInput.focus();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        chatDrawer.classList.remove("open");
      });
    }

    function appendMessage(sender, text, isHtml = false) {
      const msg = document.createElement("div");
      msg.className = `aria-msg aria-msg-${sender}`;
      if (isHtml) {
        msg.innerHTML = text;
      } else {
        msg.textContent = text;
      }
      messagesBody.appendChild(msg);
      messagesBody.scrollTop = messagesBody.scrollHeight;
    }

    function showTypingIndicator() {
      const typing = document.createElement("div");
      typing.id = "ariaTypingDots";
      typing.className = "aria-msg aria-msg-bot aria-typing";
      typing.innerHTML = `<span></span><span></span><span></span>`;
      messagesBody.appendChild(typing);
      messagesBody.scrollTop = messagesBody.scrollHeight;
      return typing;
    }

    function respondToQuery(query) {
      const q = query.toLowerCase();
      const typingEl = showTypingIndicator();

      setTimeout(() => {
        if (typingEl.parentNode) typingEl.remove();

        if (q.includes("book") || q.includes("doctor") || q.includes("appointment") || q.includes("slot")) {
          appendMessage(
            "bot",
            `I can help you book an outpatient consultation with our specialists right away.<br><br><a href="book.html" class="btn btn-primary btn-sm" style="color:#fff;margin-top:4px;">Go to Book Appointment →</a>`,
            true
          );
        } else if (q.includes("diet") || q.includes("food") || q.includes("nutrition") || q.includes("weight") || q.includes("diabetes")) {
          appendMessage(
            "bot",
            `Our clinical diet planner calculates your personalized calorie, water, macro and meal targets based on clinical guidelines.<br><br><a href="diet.html" class="btn btn-secondary btn-sm" style="margin-top:4px;">Open Diet Planner →</a>`,
            true
          );
        } else if (q.includes("symptom") || q.includes("pain") || q.includes("chest") || q.includes("headache") || q.includes("hurt")) {
          appendMessage(
            "bot",
            `Explore our interactive body map symptom guide to find the right department and doctor for your symptoms.<br><br><a href="symptoms.html" class="btn btn-secondary btn-sm" style="margin-top:4px;">Launch Symptom Guide →</a>`,
            true
          );
        } else if (q.includes("emergency") || q.includes("ambulance") || q.includes("urgent") || q.includes("sos")) {
          appendMessage(
            "bot",
            `🚨 For acute medical emergencies, call our 24×7 hotline immediately at <strong>1800-000-0000</strong> or request an immediate GPS-tracked ambulance.<br><br><button onclick="window.AUR.openModal('#ambulanceModal')" class="btn btn-danger btn-sm" style="margin-top:4px;">Request Ambulance Now</button>`,
            true
          );
        } else if (q.includes("report") || q.includes("test") || q.includes("portal") || q.includes("result")) {
          appendMessage(
            "bot",
            `Access your lab tests, imaging studies, and e-prescriptions through our instant patient portal.<br><br><button onclick="window.AUR.openModal('#portalModal')" class="btn btn-secondary btn-sm" style="margin-top:4px;">Open Patient Portal</button>`,
            true
          );
        } else if (q.includes("visit") || q.includes("time") || q.includes("opd") || q.includes("hours")) {
          appendMessage(
            "bot",
            `Our Outpatient Department operates Monday to Saturday from 8:00 AM to 8:00 PM. A typical OP visit averages 47 minutes from valet arrival to e-prescription.<br><br><a href="visit.html" class="btn btn-secondary btn-sm" style="margin-top:4px;">Explore Visit Road →</a>`,
            true
          );
        } else {
          appendMessage(
            "bot",
            `Thank you for reaching out. Aurelia CARE is located at 42 Silicon Vista, Sarjapur-Outer Ring Road, Bengaluru. You can book an appointment, check symptoms, or call our 24×7 desk at 1800-000-0000.`
          );
        }
      }, 700);
    }

    if (sendBtn && chatInput) {
      sendBtn.addEventListener("click", () => {
        const val = chatInput.value.trim();
        if (val) {
          appendMessage("user", val);
          chatInput.value = "";
          respondToQuery(val);
        }
      });

      chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          sendBtn.click();
        }
      });
    }

    // Quick chips
    $$(".aria-quick-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        const text = chip.textContent.trim();
        appendMessage("user", text);
        respondToQuery(text);
      });
    });
  }

  /* -------------------------------------------------------------------
     7. FLOATING BACK TO TOP
     ------------------------------------------------------------------- */
  function initBackToTop() {
    const topBtn = $("#backToTop");
    if (!topBtn) return;

    window.addEventListener(
      "scroll",
      () => {
        if (window.scrollY > 400) {
          topBtn.classList.add("visible");
        } else {
          topBtn.classList.remove("visible");
        }
      },
      { passive: true }
    );

    topBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* -------------------------------------------------------------------
     8. COUNT-UP NUMBER HELPER
     ------------------------------------------------------------------- */
  function countUp(element, target, duration = 1500, prefix = "", suffix = "") {
    if (!element) return;
    const isFloat = target.toString().includes(".");
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const factor = 1 - Math.pow(1 - progress, 3);
      const current = progress === 1 ? target : factor * target;

      element.textContent = `${prefix}${isFloat ? current.toFixed(1) : Math.round(current)}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }
  window.AUR.countUp = countUp;

  /* -------------------------------------------------------------------
     9. SCROLL REVEAL OBSERVER
     ------------------------------------------------------------------- */
  function initScrollReveal() {
    const reveals = $$(".reveal-on-scroll");
    if (!reveals.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            // If target has count-up stats
            const statNumbers = $$("[data-count-target]", entry.target);
            statNumbers.forEach((el) => {
              const target = parseFloat(el.getAttribute("data-count-target"));
              const prefix = el.getAttribute("data-count-prefix") || "";
              const suffix = el.getAttribute("data-count-suffix") || "";
              countUp(el, target, 1800, prefix, suffix);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    reveals.forEach((el) => observer.observe(el));
  }

  /* -------------------------------------------------------------------
     10. NEWSLETTER & CONTACT FORM VALIDATIONS
     ------------------------------------------------------------------- */
  function initForms() {
    const nlForm = $("#newsletterForm");
    if (nlForm) {
      nlForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const emailInput = nlForm.querySelector("input[type='email']");
        if (emailInput && emailInput.value.includes("@")) {
          showToast("Thank you for subscribing to Aurelia Health Digest!");
          emailInput.value = "";
        } else {
          showToast("Please enter a valid email address.", "danger");
        }
      });
    }

    const callbackForm = $("#callbackForm");
    if (callbackForm) {
      callbackForm.addEventListener("submit", (e) => {
        e.preventDefault();
        showToast("Callback requested! Our care desk will reach you within 15 minutes.");
        callbackForm.reset();
      });
    }
  }

  /* -------------------------------------------------------------------
     INITIALIZE ON DOM READY
     ------------------------------------------------------------------- */
  function init() {
    initTheme();
    initLiveClock();
    initMobileMenu();
    initModals();
    initAriaChat();
    initBackToTop();
    initScrollReveal();
    initForms();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
