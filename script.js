// ===== NAV SCROLL =====
const nav = document.getElementById("mainNav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 60) nav.classList.add("scrolled");
  else nav.classList.remove("scrolled");

  // Scroll bird position
  const scrollBird = document.getElementById("scrollBird");
  const scrollPct =
    window.scrollY / (document.body.scrollHeight - window.innerHeight);
  scrollBird.style.top = scrollPct * 90 + "vh";
  scrollBird.style.right = scrollPct > 0.05 ? "18px" : "-60px";
});

// ===== MOBILE MENU =====
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
  const opened = mobileMenu.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", opened);
  if (opened) {
    const first = mobileMenu.querySelector(
      "a, button, [tabindex]:not([tabindex='-1'])",
    );
    first?.focus();
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
    hamburger.focus();
  }
});

function closeMobileMenu() {
  mobileMenu.classList.remove("open");
  hamburger.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
  hamburger.focus();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileMenu.classList.contains("open")) {
    closeMobileMenu();
  }
});

// ===== PROGRAMS TABS =====
function showProgram(id, btn) {
  document
    .querySelectorAll(".prog-panel")
    .forEach((p) => p.classList.remove("active"));
  document
    .querySelectorAll(".prog-tab")
    .forEach((t) => t.classList.remove("active"));
  document.getElementById("prog-" + id).classList.add("active");
  btn.classList.add("active");
}

// ===== TESTIMONIALS CAROUSEL =====
let currentSlide = 0;
const slides = document.querySelectorAll(".testimonial-slide");
const dots = document.querySelectorAll(".carousel-dot");

function goSlide(n) {
  slides[currentSlide].classList.remove("active");
  dots[currentSlide].classList.remove("active");
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}
function nextSlide() {
  goSlide(currentSlide + 1);
}
function prevSlide() {
  goSlide(currentSlide - 1);
}

let carouselInterval = null;
function startCarousel() {
  carouselInterval = setInterval(nextSlide, 5000);
}
function stopCarousel() {
  clearInterval(carouselInterval);
}

const testimonialsSection = document.querySelector(".testimonials");
if (testimonialsSection) {
  testimonialsSection.addEventListener("mouseenter", stopCarousel);
  testimonialsSection.addEventListener("mouseleave", startCarousel);
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) stopCarousel();
  else startCarousel();
});

startCarousel();

// ===== FAQ =====
function toggleFaq(idx) {
  const item = document.getElementById("faq-" + idx);
  item.classList.toggle("open");
}

async function submitForm(e) {
  e.preventDefault();

  const form = e.target;

  // Validate enrollment form fields FIRST before rate limit stamp
  clearEnrollErrors();
  let hasError = false;
  const nameRegexEnroll = /^[a-zA-Z]+([' \-][a-zA-Z]+)*$/;

  if (
    !form.childFirstName.value.trim() ||
    !nameRegexEnroll.test(form.childFirstName.value.trim())
  ) {
    showFieldError(
      "childFirstName",
      "Please enter a valid first name (letters only).",
    );
    hasError = true;
  }
  if (
    !form.childLastName.value.trim() ||
    !nameRegexEnroll.test(form.childLastName.value.trim())
  ) {
    showFieldError(
      "childLastName",
      "Please enter a valid last name (letters only).",
    );
    hasError = true;
  }
  if (!form.dob.value) {
    showFieldError("dobInput", "Date of birth is required.");
    hasError = true;
  } else {
    // Parse as local date to avoid timezone off-by-one
    const [y, m, d] = form.dob.value.split("-").map(Number);
    const dob = new Date(y, m - 1, d);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Child cannot be born in the future
    if (dob >= today) {
      showFieldError(
        "dobInput",
        "Date of birth cannot be today or in the future.",
      );
      hasError = true;
    } else {
      const ageMonths =
        (today.getFullYear() - dob.getFullYear()) * 12 +
        (today.getMonth() - dob.getMonth()) -
        (today.getDate() < dob.getDate() ? 1 : 0);
      if (ageMonths < 6) {
        showFieldError("dobInput", "Child must be at least 6 months old.");
        hasError = true;
      } else if (ageMonths > 72) {
        showFieldError("dobInput", "Child must be 6 years old or younger.");
        hasError = true;
      }
    }
  }
  if (!form.program.value) {
    showFieldError("program", "Please select a program.");
    hasError = true;
  }
  const nameRegex = /^[a-zA-Z]+([ '\-][a-zA-Z]+)*$/;
  if (
    !form.parentName.value.trim() ||
    !nameRegex.test(form.parentName.value.trim())
  ) {
    showFieldError("parentName", "Please enter a valid name (letters only).");
    hasError = true;
  }
  if (
    !form.phone.value.trim() ||
    !/^[\d\s()\-+]{7,}$/.test(form.phone.value.trim())
  ) {
    showFieldError("phone", "Please enter a valid phone number.");
    hasError = true;
  }
  if (
    !form.email.value.trim() ||
    !/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9\-]{3,}(\.[a-zA-Z0-9\-]+)*\.[a-zA-Z]{2,}$/.test(
      form.email.value.trim(),
    )
  ) {
    showFieldError("email", "Please enter a valid email address.");
    hasError = true;
  }
  // Start date must be today or future (optional field but if filled must be valid)
  if (form.startDate.value) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [sy, sm, sd] = form.startDate.value.split("-").map(Number);
    const startDate = new Date(sy, sm - 1, sd);
    if (startDate < today) {
      showFieldError("startDate", "Start date cannot be in the past.");
      hasError = true;
    }
  }
  // Tour date must be today or future (optional field but if filled must be valid)
  if (form.tourDate.value) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [ty, tm, td] = form.tourDate.value.split("-").map(Number);
    const tourDate = new Date(ty, tm - 1, td);
    if (tourDate < today) {
      showFieldError("tourDate", "Tour date cannot be in the past.");
      hasError = true;
    }
  }
  // Terms & conditions must be checked
  const termsBox = document.getElementById("termsCheckbox");
  if (!termsBox || !termsBox.checked) {
    showFieldError(
      "termsCheckbox",
      "You must agree to the Terms & Privacy Policy.",
    );
    hasError = true;
  }

  if (hasError) {
    // Scroll to first error
    const firstError = document.querySelector(
      ".input-error, .form-error:not(:empty)",
    );
    if (firstError)
      firstError.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  // Anti-spam rate limit — only applied after validation passes
  if (window.lastSubmit && Date.now() - window.lastSubmit < 5000) {
    alert("Please wait a few seconds before submitting again.");
    return;
  }
  window.lastSubmit = Date.now();

  const data = {
    formType: "enrollment",
    childFirstName: form.childFirstName.value.trim(),
    childLastName: form.childLastName.value.trim(),
    dob: form.dob.value,
    program: form.program.value,
    parentName: form.parentName.value.trim(),
    phone: form.phone.value.trim(),
    email: form.email.value.trim(),
    startDate: form.startDate.value,
    tourDate: form.tourDate.value,
    notes: form.notes.value.trim(),
    createdAt: new Date().toISOString(),
  };

  try {
    // Save to Firebase only if it has initialised
    if (window.fb && window.db) {
      await window.fb.addDoc(
        window.fb.collection(window.db, "enrollments"),
        data,
      );
    }

    // Always send to Google Sheets regardless
    fetch(
      "https://script.google.com/macros/s/AKfycbyhJHsNEVAOghfSxfRCQko7_V0fa0dvMyTwfaE5M0HNvfz3SSv-_YyyVaSynM8-iwtc/exec",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );

    const notif = document.getElementById("notification");
    notif.textContent = "🎉 Application submitted successfully!";
    notif.classList.add("show");
    setTimeout(() => notif.classList.remove("show"), 4000);

    form.reset();
  } catch (err) {
    console.error(err);
    alert("Error submitting form");
  }
}

async function submitContact(e) {
  e.preventDefault();

  const form = e.target;

  // Validate fields FIRST before rate limit stamp
  let hasError = false;
  const nameVal = form.contactName.value.trim();
  const emailVal = form.contactEmail.value.trim();
  const msgVal = form.contactMessage.value.trim();

  clearContactErrors();

  // Name: at least 2 chars, must not be all the same character repeated
  const nameRegex = /^[a-zA-Z]+([ '\-][a-zA-Z]+)*$/;
  if (!nameVal || nameVal.length < 2 || !nameRegex.test(nameVal)) {
    showFieldError(
      "contactName",
      "Please enter a valid full name (letters only).",
    );
    hasError = true;
  }
  // Strict email: domain must be at least 3 chars, TLD at least 2 chars
  const emailRegex =
    /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9\-]{3,}(\.[a-zA-Z0-9\-]+)*\.[a-zA-Z]{2,}$/;
  if (!emailVal || !emailRegex.test(emailVal)) {
    showFieldError("contactEmail", "Please enter a valid email address.");
    hasError = true;
  }
  if (!msgVal || msgVal.length < 10) {
    showFieldError(
      "contactMessage",
      "Please enter a message (at least 10 characters).",
    );
    hasError = true;
  }
  if (hasError) return;

  // Anti-spam rate limit (5 seconds) — only applied after validation passes
  if (window.lastSubmit && Date.now() - window.lastSubmit < 5000) {
    alert("Please wait a few seconds before submitting again.");
    return;
  }
  window.lastSubmit = Date.now();

  const data = {
    formType: "message",
    name: nameVal,
    email: emailVal,
    subject: form.contactSubject.value,
    message: msgVal,
    createdAt: new Date().toISOString(),
  };

  try {
    // Save to Firebase only if it has initialised
    if (window.fb && window.db) {
      await window.fb.addDoc(window.fb.collection(window.db, "messages"), data);
    }

    // Always send to Google Sheets regardless
    fetch(
      "https://script.google.com/macros/s/AKfycbyhJHsNEVAOghfSxfRCQko7_V0fa0dvMyTwfaE5M0HNvfz3SSv-_YyyVaSynM8-iwtc/exec",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );

    const notif = document.getElementById("notification");
    notif.textContent = "✅ Message sent successfully!";
    notif.classList.add("show");
    setTimeout(() => notif.classList.remove("show"), 4000);

    form.reset();
  } catch (err) {
    console.error(err);
    alert("Error sending message");
  }
}

// ===== LIVE CHAT =====
function toggleChat() {
  const bubble = document.getElementById("chatBubble");
  const btn = document.getElementById("chatBtn");
  bubble.classList.toggle("open");
  btn.textContent = bubble.classList.contains("open") ? "✕" : "💬";
}

// Chat bubble no longer auto-opens — user must click the button to avoid intrusive UX

// ===== FORM VALIDATION HELPERS =====
function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorEl = document.getElementById(fieldId + "-error");
  if (field) field.classList.add("input-error");
  if (errorEl) errorEl.textContent = message;
}

function clearFieldError(fieldId) {
  const field = document.getElementById(fieldId);
  const errorEl = document.getElementById(fieldId + "-error");
  if (field) field.classList.remove("input-error");
  if (errorEl) errorEl.textContent = "";
}

function clearContactErrors() {
  ["contactName", "contactEmail", "contactMessage"].forEach(clearFieldError);
}

function clearEnrollErrors() {
  [
    "childFirstName",
    "childLastName",
    "dobInput",
    "program",
    "parentName",
    "phone",
    "email",
    "startDate",
    "tourDate",
    "termsCheckbox",
  ].forEach(clearFieldError);
}

// Clear error on input
document.addEventListener("input", (e) => {
  if (
    e.target.classList.contains("form-input") ||
    e.target.classList.contains("form-select") ||
    e.target.classList.contains("form-textarea")
  ) {
    clearFieldError(e.target.id || e.target.name);
  }
});

// ===== ENROLLMENT FORM VALIDATION =====
const _origSubmitForm = window.submitForm;
// Enhanced submitForm with inline validation is defined below and overrides the above

// ===== SMOOTH INIT =====
document.addEventListener("DOMContentLoaded", () => {
  // Init scroll bird
  document.getElementById("scrollBird").style.top = "20vh";

  // Set dynamic footer year
  const footerYear = document.getElementById("footerYear");
  if (footerYear) footerYear.textContent = "© " + new Date().getFullYear();

  // Set DOB min/max (child must be 6 months to 5 years old)
  const dobInput = document.getElementById("dobInput");
  if (dobInput) {
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setMonth(maxDate.getMonth() - 6); // at least 6 months old
    const minDate = new Date(today);
    minDate.setFullYear(minDate.getFullYear() - 6); // no older than 6 years
    dobInput.max = maxDate.toISOString().split("T")[0];
    dobInput.min = minDate.toISOString().split("T")[0];
  }

  // Set start date and tour date minimums to today
  document
    .querySelectorAll("input[name='startDate'], input[name='tourDate']")
    .forEach((input) => {
      input.min = new Date().toISOString().split("T")[0];
    });

  // Reveal elements with IntersectionObserver
  const reveals = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  reveals.forEach((el) => io.observe(el));
});

// ===== GALLERY LIGHTBOX HINT =====
document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    const caption = item.querySelector(".gallery-caption");
    const notif = document.getElementById("notification");
    if (caption) {
      notif.textContent = "🖼️ " + caption.textContent;
      notif.classList.add("show");
      setTimeout(() => notif.classList.remove("show"), 2500);
    }
  });
});
