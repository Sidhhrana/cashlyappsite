const APP_URL = "https://sidhhrana.github.io/Cashly/";

/* ── Typewriter ──────────────────────────────────────────────────────── */
function typewriter(el, text, speed, delay, onDone) {
  let i = 0;
  setTimeout(() => {
    const iv = setInterval(() => {
      i++;
      el.textContent = text.slice(0, i);
      if (i >= text.length) { clearInterval(iv); if (onDone) onDone(); }
    }, speed);
  }, delay);
}

function initTypewriter() {
  const heading = document.getElementById("hero-heading");
  if (!heading) return;

  const line1El = heading.querySelector(".line1");
  const line2El = heading.querySelector(".line2");
  const cursor1 = heading.querySelector(".cursor1");
  const cursor2 = heading.querySelector(".cursor2");
  const underline = heading.querySelector(".underline");

  const line1 = "Your wealth,";
  const line2 = "simplified.";
  const speed1 = 55, speed2 = 65;
  const delay1 = 400;
  const delay2 = delay1 + line1.length * speed1 + 200;

  typewriter(line1El, line1, speed1, delay1, () => {
    cursor1.style.display = "none";
  });

  setTimeout(() => {
    cursor2.style.display = "inline-block";
    typewriter(line2El, line2, speed2, 0, () => {
      cursor2.style.display = "none";
      if (underline) { underline.style.opacity = "1"; }
    });
  }, delay2);
}

/* ── Animated Number Counters ───────────────────────────────────────── */
function animateNumber(el, target, duration) {
  const start = performance.now();
  const update = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(ease * target);
    if (p < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

/* ── IntersectionObserver Animations ───────────────────────────────── */
function initScrollAnimations() {
  const fadeEls = document.querySelectorAll(".fade-up, .fade-left, .fade-right");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  fadeEls.forEach(el => io.observe(el));

  // Animated numbers
  const numEls = document.querySelectorAll("[data-count]");
  const numIo = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateNumber(e.target, +e.target.dataset.count, 1500);
        numIo.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  numEls.forEach(el => numIo.observe(el));
}

/* ── Phone Parade ───────────────────────────────────────────────────── */
function initParade() {
  const section = document.getElementById("parade");
  if (!section) return;
  const left = section.querySelector(".parade-left");
  const right = section.querySelector(".parade-right");
  const center = section.querySelector(".parade-center");
  const phonesWrap = section.querySelector(".parade-phones");

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        phonesWrap.classList.add("visible");
        setTimeout(() => { if (left) left.classList.add("in"); if (right) right.classList.add("in"); center.classList.add("in"); }, 100);
        io.unobserve(section);
      }
    });
  }, { threshold: 0.25 });
  io.observe(section);
}

/* ── Install Guide & Interactive Tutorial ───────────────────────────── */
const steps = {
  ios: [
    { title: "Open Safari", desc: "Launch Safari on your iPhone or iPad. Chrome won't show the install option." },
    { title: "Go to the Cashly URL", desc: 'Type or tap: sidhhrana.github.io/Cashly' },
    { title: 'Tap the Share button', desc: 'Tap the square-with-arrow icon at the bottom of Safari.' },
    { title: 'Tap "Add to Home Screen"', desc: 'Scroll down the share sheet and tap "Add to Home Screen".' },
    { title: 'Tap "Add" and launch', desc: 'Confirm by tapping "Add" in the top right corner. Done!' },
  ],
  android: [
    { title: "Open Chrome", desc: "Launch Google Chrome on your Android phone." },
    { title: "Go to the Cashly URL", desc: 'Type or tap: sidhhrana.github.io/Cashly' },
    { title: "Tap the menu (⋮)", desc: 'Tap the three-dot menu in the top-right corner of Chrome.' },
    { title: 'Tap "Add to Home screen"', desc: 'Select "Add to Home screen" or "Install app" from the menu.' },
    { title: 'Tap "Add" and launch', desc: 'Confirm the prompt. Cashly appears on your home screen instantly.' },
  ]
};

let currentPlatform = "ios";
let currentStep = 0;

function renderSteps() {
  const list = document.getElementById("steps-list");
  if (!list) return;
  
  const s = steps[currentPlatform];
  list.innerHTML = s.map((step, i) => `
    <div class="step-item${i === currentStep ? " active" : ""}" data-step="${i}">
      <div class="step-num">${i + 1}</div>
      <div class="step-content-text">
        <strong>${step.title}</strong>
        <span>${step.desc}</span>
      </div>
    </div>
  `).join("");

  list.querySelectorAll(".step-item").forEach(item => {
    item.addEventListener("click", () => {
      currentStep = +item.dataset.step;
      renderSteps();
    });
  });

  const backBtn = document.getElementById("back-btn");
  const nextBtn = document.getElementById("next-btn");
  const totalEl = document.getElementById("step-total");
  const currentEl = document.getElementById("step-current");

  if (backBtn) backBtn.disabled = currentStep === 0;
  if (nextBtn) nextBtn.disabled = currentStep === s.length - 1;
  if (totalEl) totalEl.textContent = s.length;
  if (currentEl) currentEl.textContent = currentStep + 1;
  
  // Update Visual Tutorial Animation CSS classes
  const mockBrowser = document.getElementById("mock-browser");
  if (mockBrowser) {
    mockBrowser.className = `mock-browser platform-${currentPlatform} step-${currentStep}`;
  }
}

function initInstallGuide() {
  const tabs = document.querySelectorAll(".tab-btn");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentPlatform = tab.dataset.platform;
      currentStep = 0;
      renderSteps();
    });
  });

  const backBtn = document.getElementById("back-btn");
  const nextBtn = document.getElementById("next-btn");
  
  if (backBtn) {
    backBtn.addEventListener("click", () => { 
      if (currentStep > 0) { currentStep--; renderSteps(); } 
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener("click", () => { 
      if (currentStep < steps[currentPlatform].length - 1) { currentStep++; renderSteps(); } 
    });
  }

  renderSteps();
}

/* ── Boot ───────────────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  initTypewriter();
  initScrollAnimations();
  initParade();
  initInstallGuide();

  // Wire up all CTA buttons to APP_URL
  document.querySelectorAll("[data-app-link]").forEach(el => {
    el.href = APP_URL;
  });
});