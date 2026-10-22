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

// ===== LIVE CHAT =====
function toggleChat() {
  const bubble = document.getElementById("chatBubble");
  const btn = document.getElementById("chatBtn");
  bubble.classList.toggle("open");
  btn.textContent = bubble.classList.contains("open") ? "✕" : "💬";
}

// Chat bubble no longer auto-opens — user must click the button to avoid intrusive UX

// ===== SMOOTH INIT =====
document.addEventListener("DOMContentLoaded", () => {
  // Init scroll bird
  document.getElementById("scrollBird").style.top = "20vh";

  // Set dynamic footer year
  const footerYear = document.getElementById("footerYear");
  if (footerYear) footerYear.textContent = "© " + new Date().getFullYear();

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

// ===== GALLERY LIGHTBOX =====
const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));

document.querySelectorAll(".gallery-img img").forEach((image) => {
  const markLoaded = () => image.classList.add("is-loaded");

  if (image.complete && image.naturalWidth > 0) markLoaded();
  else image.addEventListener("load", markLoaded, { once: true });
});

if (galleryItems.length) {
  const galleryLightbox = document.createElement("div");
  galleryLightbox.className = "gallery-lightbox";
  galleryLightbox.hidden = true;
  galleryLightbox.innerHTML = `
    <div class="gallery-lightbox-backdrop"></div>
    <div class="gallery-lightbox-dialog" role="dialog" aria-modal="true" aria-labelledby="gallery-lightbox-caption" tabindex="-1">
      <button type="button" class="gallery-lightbox-close" aria-label="Close gallery photo">&times;</button>
      <button type="button" class="gallery-lightbox-nav gallery-lightbox-prev" aria-label="Previous gallery photo">&#8592;</button>
      <figure class="gallery-lightbox-figure">
        <img class="gallery-lightbox-image" alt="">
        <div class="gallery-lightbox-fallback" hidden> This gallery photo is currently unavailable. </div>
        <figcaption class="gallery-lightbox-caption" id="gallery-lightbox-caption"></figcaption>
      </figure>
      <button type="button" class="gallery-lightbox-nav gallery-lightbox-next" aria-label="Next gallery photo">&#8594;</button>
    </div>
  `;
  document.body.append(galleryLightbox);

  const lightboxImage = galleryLightbox.querySelector(".gallery-lightbox-image");
  const fallback = galleryLightbox.querySelector(".gallery-lightbox-fallback");
  const lightboxCaption = galleryLightbox.querySelector(".gallery-lightbox-caption");
  const closeButton = galleryLightbox.querySelector(".gallery-lightbox-close");
  const previousButton = galleryLightbox.querySelector(".gallery-lightbox-prev");
  const nextButton = galleryLightbox.querySelector(".gallery-lightbox-next");
  let activeIndex = 0;
  let lastFocusedItem = null;
  let previousBodyOverflow = "";

  function updateGalleryLightbox() {
    const item = galleryItems[activeIndex];
    const image = item.querySelector("img");
    const caption = item.querySelector(".gallery-caption");

    lightboxImage.hidden = false;
    fallback.hidden = true;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = caption.textContent.trim();
    lightboxImage.onerror = () => {
      lightboxImage.hidden = true;
      fallback.hidden = false;
      fallback.textContent = `${lightboxCaption.textContent} is currently unavailable.`;
    };
    lightboxImage.src = image.currentSrc || image.src;
  }

  function openGalleryLightbox(index) {
    activeIndex = index;
    lastFocusedItem = galleryItems[index];
    updateGalleryLightbox();
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    galleryLightbox.hidden = false;
    closeButton.focus();
  }

  function closeGalleryLightbox() {
    galleryLightbox.hidden = true;
    document.body.style.overflow = previousBodyOverflow;
    lightboxImage.removeAttribute("src");
    lastFocusedItem?.focus();
  }

  function moveGalleryLightbox(direction) {
    activeIndex = (activeIndex + direction + galleryItems.length) % galleryItems.length;
    updateGalleryLightbox();
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => openGalleryLightbox(index));
  });
  closeButton.addEventListener("click", closeGalleryLightbox);
  previousButton.addEventListener("click", () => moveGalleryLightbox(-1));
  nextButton.addEventListener("click", () => moveGalleryLightbox(1));
  galleryLightbox.querySelector(".gallery-lightbox-backdrop").addEventListener("click", closeGalleryLightbox);

  document.addEventListener("keydown", (event) => {
    if (galleryLightbox.hidden) return;

    if (event.key === "Escape") {
      closeGalleryLightbox();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveGalleryLightbox(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      moveGalleryLightbox(1);
    } else if (event.key === "Tab") {
      const focusable = [closeButton, previousButton, nextButton];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
}
