/* =====================================================================
   Flashh ai — Landing page interactions
   Scroll reveals · counters · nav · FAQ · typing · microinteractions
   ===================================================================== */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- Sticky navbar shadow ---------- */
  const navbar = $("#navbar");
  const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const navToggle = $("#navToggle");
  const navLinks = $("#navLinks");
  const navActions = $(".nav-actions");
  const closeMenu = () => {
    navToggle.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("open");
    navActions.classList.remove("open");
  };
  navToggle.addEventListener("click", () => {
    const open = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!open));
    navLinks.classList.toggle("open", !open);
    navActions.classList.toggle("open", !open);
    navToggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
  });
  $$("#navLinks a").forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

  /* ---------- Scroll reveal + staggered entrances ---------- */
  const revealEls = $$(".reveal");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("in"));
  } else {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------- Animated stat counters ---------- */
  const counters = $$(".stat-num");
  const runCounter = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    if (prefersReduced) { el.textContent = target.toLocaleString(); return; }
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString();
    };
    requestAnimationFrame(tick);
  };
  if ("IntersectionObserver" in window) {
    const cio = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { runCounter(entry.target); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach((c) => cio.observe(c));
  } else {
    counters.forEach(runCounter);
  }

  /* ---------- FAQ accordion ---------- */
  $$(".acc-trigger").forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      const panel = $("#" + btn.getAttribute("aria-controls"));
      btn.setAttribute("aria-expanded", String(!expanded));
      panel.style.maxHeight = expanded ? "0px" : panel.scrollHeight + "px";
    });
  });

  /* ---------- Hero typing effect (gradient word) ---------- */
  const typeEl = $("[data-type]");
  if (typeEl && !prefersReduced) {
    const phrase = typeEl.dataset.type;
    let i = 0;
    const typeLoop = () => {
      typeEl.textContent = phrase.slice(0, i);
      i++;
      if (i <= phrase.length) {
        setTimeout(typeLoop, 70 + Math.random() * 50);
      } else {
        setTimeout(() => { i = 0; typeLoop(); }, 2600);
      }
    };
    setTimeout(typeLoop, 700);
  } else if (typeEl) {
    typeEl.textContent = typeEl.dataset.type;
  }

  /* ---------- Hero chat typing indicator loop ---------- */
  const typing = $("#typingIndicator");
  if (typing && !prefersReduced) {
    let visible = true;
    const toggle = () => {
      visible = !visible;
      typing.style.display = visible ? "flex" : "none";
      setTimeout(toggle, visible ? 2200 : 1600);
    };
    setTimeout(() => { typing.style.display = "none"; toggle(); }, 3600);
  } else if (typing) {
    typing.style.display = "none";
  }

  /* ---------- Smooth anchor scroll (respect reduced motion) ---------- */
  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
        }
      }
    });
  });

  /* ---------- CTA + newsletter form feedback ---------- */
  const handleForm = (formId, msgId, successText) => {
    const form = $("#" + formId);
    const msg = $("#" + msgId);
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input[type='email']");
      const valid = input && input.checkValidity() && input.value.trim() !== "";
      if (!valid) {
        if (msg) { msg.style.color = "#fca5a5"; msg.textContent = "Please enter a valid email address."; }
        input && input.focus();
        return;
      }
      if (msg) { msg.style.color = ""; msg.textContent = successText; }
      form.reset();
    });
  };
  handleForm("ctaForm", "ctaConfirm", "🎉 You're in! Check your inbox to start building.");
  handleForm("newsletterForm", "newsConfirm", "Subscribed — thanks!");

  /* ---------- Footer year ---------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Subtle parallax on hero orbs (pointer) ---------- */
  if (!prefersReduced && window.matchMedia("(pointer: fine)").matches) {
    const orbs = $$(".orb");
    window.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5);
      const y = (e.clientY / window.innerHeight - 0.5);
      orbs.forEach((orb, idx) => {
        const depth = (idx + 1) * 8;
        orb.style.translate = `${x * depth}px ${y * depth}px`;
      });
    }, { passive: true });
  }

  /* ---------- Magnetic hover on primary CTAs (desktop) ---------- */
  if (!prefersReduced && window.matchMedia("(pointer: fine)").matches) {
    $$(".btn-primary").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const mx = e.clientX - r.left - r.width / 2;
        const my = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${mx * 0.12}px, ${my * 0.18 - 2}px)`;
      });
      btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
    });
  }
})();
