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

  // Reveal elements
  document.querySelectorAll(".reveal").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) el.classList.add("visible");
  });
});

// ===== MOBILE MENU =====
document.getElementById("hamburger").addEventListener("click", () => {
  document.getElementById("mobileMenu").classList.add("open");
});
function closeMobileMenu() {
  document.getElementById("mobileMenu").classList.remove("open");
}

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

// Auto-advance carousel
setInterval(nextSlide, 5000);

// ===== FAQ =====
function toggleFaq(idx) {
  const item = document.getElementById("faq-" + idx);
  item.classList.toggle("open");
}

async function submitForm(e) {
  e.preventDefault();

  // Anti-spam rate limit (5 seconds)
  if (window.lastSubmit && Date.now() - window.lastSubmit < 5000) {
    alert("Please wait a few seconds before submitting again.");
    return;
  }
  window.lastSubmit = Date.now();

  const form = e.target;

  const data = {
    formType: "enrollment", // 👈 ADD THIS LINE
    childFirstName: form.childFirstName.value,
    childLastName: form.childLastName.value,
    dob: form.dob.value,
    program: form.program.value,
    parentName: form.parentName.value,
    phone: form.phone.value,
    email: form.email.value,
    startDate: form.startDate.value,
    tourDate: form.tourDate.value,
    notes: form.notes.value,
    createdAt: new Date().toISOString(), // safer for Sheets
  };

  try {
    await fb.addDoc(fb.collection(db, "enrollments"), data);

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

  // Anti-spam rate limit (5 seconds)
  if (window.lastSubmit && Date.now() - window.lastSubmit < 5000) {
    alert("Please wait a few seconds before submitting again.");
    return;
  }
  window.lastSubmit = Date.now();
  const form = e.target;

  const data = {
    formType: "message",
    name: form.querySelectorAll("input")[0].value,
    email: form.querySelectorAll("input")[1].value,
    subject: form.querySelector("select").value,
    message: form.querySelector("textarea").value,
    createdAt: new Date().toISOString(),
  };

  try {
    // Save to Firebase (optional)
    await fb.addDoc(fb.collection(db, "messages"), data);

    // Send to Google Sheets
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

// Show chat bubble after 5s
setTimeout(() => {
  document.getElementById("chatBubble").classList.add("open");
}, 5000);

// ===== SMOOTH INIT =====
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".reveal").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) el.classList.add("visible");
  });
  // Init scroll bird
  document.getElementById("scrollBird").style.top = "20vh";
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
