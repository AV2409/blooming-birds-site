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

// ===== FORM SUBMIT =====
async function submitForm(e) {
  e.preventDefault();
  const form = e.target;

  const data = {
    childFirstName: form.querySelectorAll("input")[0].value,
    childLastName: form.querySelectorAll("input")[1].value,
    dob: form.querySelectorAll("input")[2].value,
    program: form.querySelector("select").value,
    parentName: form.querySelectorAll("input")[3].value,
    phone: form.querySelectorAll("input")[4].value,
    email: form.querySelectorAll("input")[5].value,
    startDate: form.querySelectorAll("input")[6].value,
    tourDate: form.querySelectorAll("input")[7].value,
    notes: form.querySelector("textarea").value,
    createdAt: fb.serverTimestamp(),
  };

  try {
    await fb.addDoc(fb.collection(db, "enrollments"), data);

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

  const data = {
    name: form.querySelectorAll("input")[0].value,
    email: form.querySelectorAll("input")[1].value,
    subject: form.querySelector("select").value,
    message: form.querySelector("textarea").value,
    createdAt: fb.serverTimestamp(),
  };

  try {
    await fb.addDoc(fb.collection(db, "messages"), data);

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
