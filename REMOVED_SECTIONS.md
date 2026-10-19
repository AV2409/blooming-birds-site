# Removed Sections Archive

This file preserves the Blog and Reviews sections removed from the active pages. The archived markup was shared by `index.html` and `blooming-birds-daycare.html`.

## Gallery

The following gallery cards were removed from both active pages because approved photos are not currently available. The retained gallery uses the five supplied images in `assets/gallery/`.

| Planned item | Planned filename | Removal reason |
|---|---|---|
| Garden Discovery Time | `03-garden-discovery.webp` | No approved garden or nature photo available |
| Healthy, Colorful Lunches | `05-healthy-lunch.webp` | No approved meal or snack photo available |
| Exploring Nature Together | `07-nature-exploration.webp` | No approved outdoor nature photo available |
| STEM Discovery Lab | `08-stem-discovery.webp` | No approved STEM activity photo available |
| Active Outdoor Play | `10-outdoor-play.webp` | No approved outdoor play photo available |
| Sensory Bin Fun | `11-sensory-bin.webp` | No approved sensory-play photo available |
| Yoga & Mindfulness | `12-yoga-mindfulness.webp` | No approved yoga or quiet-activity photo available |

## Blog

Restore the following markup before the `CTA STRIP` comment:

```html
<!-- ===== BLOG ===== -->
<section class="section blog" id="blog">
  <div class="container">
    <div class="badge"
      style="background:var(--sky-light);color:var(--sky-dark);display:block;text-align:center;width:fit-content;margin:0 auto 16px;">
      📰 Blog & Tips</div>
    <h2 class="section-title">Resources for Curious Parents</h2>
    <p class="section-sub">Our educators share insights, activity ideas, and child development tips to support your
      family at home.</p>
    <div class="blog-grid">
      <div class="blog-card reveal">
        <div class="blog-card-img" style="background:linear-gradient(135deg,var(--sky-light),var(--mint-light));">
          <div>🧪</div>
        </div>
        <div class="blog-card-body">
          <div class="blog-tag">🔬 Learning</div>
          <div class="blog-card-title">The Magical Benefits of Sensory Play for Toddlers</div>
          <p class="blog-card-excerpt">Sensory bins, kinetic sand, and water tables aren't just fun — they're building
            neural pathways and teaching science. Here's why we dedicate 30 minutes daily to sensory exploration.</p>
          <div class="blog-meta">
            <span>👩‍🏫 Ms. Sophie</span>
            <span>·</span>
            <span>5 min read</span>
            <a href="#" class="blog-read-more" style="margin-left:auto;">Read → </a>
          </div>
        </div>
      </div>
      <div class="blog-card reveal reveal-delay-1">
        <div class="blog-card-img" style="background:linear-gradient(135deg,var(--yellow-light),var(--peach-light));">
          <div>🌿</div>
        </div>
        <div class="blog-card-body">
          <div class="blog-tag">🌳 Nature</div>
          <div class="blog-card-title">5 Simple Outdoor Activities to Try This Weekend</div>
          <p class="blog-card-excerpt">Nature is the best classroom. From bug hunting to mud kitchen cooking, these
            easy outdoor activities foster curiosity, independence, and physical development in children aged 2-5.</p>
          <div class="blog-meta">
            <span>👨‍🏫 Coach David</span>
            <span>·</span>
            <span>4 min read</span>
            <a href="#" class="blog-read-more" style="margin-left:auto;">Read → </a>
          </div>
        </div>
      </div>
      <div class="blog-card reveal reveal-delay-2">
        <div class="blog-card-img" style="background:linear-gradient(135deg,var(--peach-light),var(--pink)+'55');">
          <div>💤</div>
        </div>
        <div class="blog-card-body">
          <div class="blog-tag">💛 Wellbeing</div>
          <div class="blog-card-title">Navigating Sleep Transitions: 12-24 Month Guide</div>
          <p class="blog-card-excerpt">Dropping naps, night wakings, and schedule shifts — we break down the science
            of toddler sleep and share the gentle strategies we use in our infant room every day.</p>
          <div class="blog-meta">
            <span>👩‍⚕️ Ms. Amara</span>
            <span>·</span>
            <span>6 min read</span>
            <a href="#" class="blog-read-more" style="margin-left:auto;">Read → </a>
          </div>
        </div>
      </div>
    </div>
    <div style="text-align:center;margin-top:40px;">
      <a href="#" class="btn btn-secondary">View All Posts →</a>
    </div>
  </div>
</section>
```

The Blog section also used the `.blog`, `.blog-grid`, `.blog-card`, `.blog-card-img`, `.blog-card-body`, `.blog-tag`, `.blog-card-title`, `.blog-card-excerpt`, `.blog-meta`, and `.blog-read-more` rules in `style.css`.

## Reviews

The Reviews section was implemented as the Testimonials carousel. Restore the following markup before the `ENROLLMENT` section:

```html
<!-- ===== TESTIMONIALS ===== -->
<section class="section testimonials" id="testimonials">
  <div class="container">
    <div class="badge"
      style="background:rgba(255,255,255,0.7);color:var(--sky-dark);display:block;text-align:center;width:fit-content;margin:0 auto 16px;">
      💬 Parent Stories</div>
    <h2 class="section-title">Our Families ❤️ Blooming Birds</h2>
    <p class="section-sub">Don't take our word for it — hear from the parents who trust us with their most precious
      little ones every day.</p>
    <div class="testimonials-carousel">
      <div class="testimonial-track">
        <div class="testimonial-slide active">
          <div class="testimonial-card">
            <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
            <p class="testimonial-quote">Blooming Birds feels like family. From day one, Ms. Amara knew exactly what
              our daughter needed. She went from a shy, anxious baby to a confident, laughing toddler. I cry happy
              tears at pickup every day.</p>
            <div class="testimonial-author">
              <div class="testimonial-avatar" style="background:var(--peach-light);">👩🏻</div>
              <div>
                <div class="testimonial-name">Sarah M.</div>
                <div class="testimonial-child">Mom of Lily, 18 months</div>
              </div>
            </div>
          </div>
        </div>
        <div class="testimonial-slide">
          <div class="testimonial-card">
            <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
            <p class="testimonial-quote">The preschool program here is phenomenal. My son came home knowing the
              alphabet, counting to 30, and writing his name — all because they made it feel like play. Kindergarten
              here we come!</p>
            <div class="testimonial-author">
              <div class="testimonial-avatar" style="background:var(--sky-light);">👨🏽</div>
              <div>
                <div class="testimonial-name">Marcus J.</div>
                <div class="testimonial-child">Dad of Elijah, 4 years</div>
              </div>
            </div>
          </div>
        </div>
        <div class="testimonial-slide">
          <div class="testimonial-card">
            <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
            <p class="testimonial-quote">As working parents, we needed somewhere truly safe and loving. The daily
              photo updates, the detailed reports, the open-door policy — Blooming Birds makes us feel involved every
              single day. Worth every penny.</p>
            <div class="testimonial-author">
              <div class="testimonial-avatar" style="background:var(--mint-light);">👩🏾</div>
              <div>
                <div class="testimonial-name">Amelia & Raj K.</div>
                <div class="testimonial-child">Parents of twins, 2 years</div>
              </div>
            </div>
          </div>
        </div>
        <div class="testimonial-slide">
          <div class="testimonial-card">
            <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
            <p class="testimonial-quote">Coach David is an absolute gem. My son had speech delays and the team worked
              with our therapist to create a supportive daily routine. His language just exploded this year. I'm so
              grateful.</p>
            <div class="testimonial-author">
              <div class="testimonial-avatar" style="background:var(--yellow-light);">👩🏼</div>
              <div>
                <div class="testimonial-name">Jennifer T.</div>
                <div class="testimonial-child">Mom of Noah, 3 years</div>
              </div>
            </div>
          </div>
        </div>
        <div class="testimonial-slide">
          <div class="testimonial-card">
            <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
            <p class="testimonial-quote">We visited six daycares before Blooming Birds and nothing compared. The
              facilities are spotless, the staff actually know every child's name, and the food is genuinely healthy.
              It's a magical place.</p>
            <div class="testimonial-author">
              <div class="testimonial-avatar" style="background:var(--lavender);">👨🏻</div>
              <div>
                <div class="testimonial-name">Daniel & Anna P.</div>
                <div class="testimonial-child">Parents of Sofia, 2.5 years</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="carousel-nav">
        <button class="carousel-btn" onclick="prevSlide()" aria-label="Previous">←</button>
        <div class="carousel-dots">
          <button class="carousel-dot active" onclick="goSlide(0)"></button>
          <button class="carousel-dot" onclick="goSlide(1)"></button>
          <button class="carousel-dot" onclick="goSlide(2)"></button>
          <button class="carousel-dot" onclick="goSlide(3)"></button>
          <button class="carousel-dot" onclick="goSlide(4)"></button>
        </div>
        <button class="carousel-btn" onclick="nextSlide()" aria-label="Next">→</button>
      </div>
    </div>
    <div style="text-align:center;margin-top:44px;">
      <div
        style="background:white;border-radius:var(--radius-lg);display:inline-flex;align-items:center;gap:20px;padding:20px 36px;box-shadow:var(--shadow-card);">
        <div style="font-size:2.4rem;">🌟</div>
        <div>
          <div style="font-family:var(--font-display);font-size:1.8rem;font-weight:800;">4.9 / 5</div>
          <div style="font-size:0.88rem;color:var(--text-mid);">Based on 180+ Google Reviews</div>
        </div>
        <a href="#" class="btn btn-sm" style="background:var(--yellow-light);color:var(--text-dark);">Read Reviews
          →</a>
      </div>
    </div>
  </div>
</section>
```

The Reviews section also used the testimonial and carousel rules in `style.css` and the testimonial carousel functions in `script.js` (`goSlide`, `nextSlide`, `prevSlide`, `startCarousel`, and `stopCarousel`). Restore the `Families` navigation links and `Parent Reviews` footer link when restoring the section.

## Program Pricing and Schedules

The following program markup was removed from both active pages. The program content is shared by `index.html` and `blooming-birds-daycare.html`; restore these blocks inside each matching program panel if pricing or schedules are needed again.

### Pricing Blocks

Restore each block after the program description and before `.prog-features`:

```html
<div class="prog-price">
  <div class="prog-price-label">Starting from</div>
  <div><span class="prog-price-amount">$380</span><span class="prog-price-period">/week</span></div>
</div>

<div class="prog-price">
  <div class="prog-price-label">Starting from</div>
  <div><span class="prog-price-amount">$320</span><span class="prog-price-period">/week</span></div>
</div>

<div class="prog-price">
  <div class="prog-price-label">Starting from</div>
  <div><span class="prog-price-amount">$280</span><span class="prog-price-period">/week</span></div>
</div>

<div class="prog-price">
  <div class="prog-price-label">Starting from</div>
  <div><span class="prog-price-amount">$180</span><span class="prog-price-period">/week</span></div>
</div>
```

The pricing blocks used the `.prog-price`, `.prog-price-label`, `.prog-price-amount`, and `.prog-price-period` rules in `style.css`.

### Schedule Columns

Restore the matching schedule column after each program's `.prog-visual` block:

```html
<div class="prog-schedule">
  <h3>Sample Daily Schedule</h3>
  <div class="schedule-item">
    <div class="schedule-icon">🌅</div>
    <div class="schedule-time">7:00 – 8:00</div>
    <div class="schedule-act">Arrival, gentle morning greeting & settling</div>
  </div>
  <div class="schedule-item">
    <div class="schedule-icon">🍼</div>
    <div class="schedule-time">8:00 – 9:30</div>
    <div class="schedule-act">Morning feeding & individual routines</div>
  </div>
  <div class="schedule-item">
    <div class="schedule-icon">🌈</div>
    <div class="schedule-time">9:30 – 10:30</div>
    <div class="schedule-act">Sensory play, tummy time & exploration</div>
  </div>
  <div class="schedule-item">
    <div class="schedule-icon">😴</div>
    <div class="schedule-time">10:30 – 12:00</div>
    <div class="schedule-act">Morning nap (individualized)</div>
  </div>
  <div class="schedule-item">
    <div class="schedule-icon">🥣</div>
    <div class="schedule-time">12:00 – 1:00</div>
    <div class="schedule-act">Lunch & bottle feeding</div>
  </div>
  <div class="schedule-item">
    <div class="schedule-icon">🎵</div>
    <div class="schedule-time">1:00 – 2:30</div>
    <div class="schedule-act">Music, story time & lap reading</div>
  </div>
  <div class="schedule-item">
    <div class="schedule-icon">😴</div>
    <div class="schedule-time">2:30 – 4:00</div>
    <div class="schedule-act">Afternoon nap</div>
  </div>
  <div class="schedule-item">
    <div class="schedule-icon">🌻</div>
    <div class="schedule-time">4:00 – 5:00</div>
    <div class="schedule-act">Outdoor stroller walk & fresh air</div>
  </div>
  <div class="schedule-item">
    <div class="schedule-icon">🏠</div>
    <div class="schedule-time">5:00 – 6:00</div>
    <div class="schedule-act">Family pickup, end-of-day report</div>
  </div>
</div>
```

The Toddler Adventures schedule used the same structure with these entries:

```html
<h3>Sample Daily Schedule</h3>
<div class="schedule-item"><div class="schedule-icon">🌅</div><div class="schedule-time">7:00 – 8:30</div><div class="schedule-act">Morning arrival & free play</div></div>
<div class="schedule-item"><div class="schedule-icon">🍌</div><div class="schedule-time">8:30 – 9:00</div><div class="schedule-act">Breakfast & morning snack</div></div>
<div class="schedule-item"><div class="schedule-icon">🎵</div><div class="schedule-time">9:00 – 9:45</div><div class="schedule-act">Circle time, songs & storytime</div></div>
<div class="schedule-item"><div class="schedule-icon">🌳</div><div class="schedule-time">9:45 – 11:00</div><div class="schedule-act">Outdoor play & nature exploration</div></div>
<div class="schedule-item"><div class="schedule-icon">🎨</div><div class="schedule-time">11:00 – 11:45</div><div class="schedule-act">Arts & crafts / sensory activity</div></div>
<div class="schedule-item"><div class="schedule-icon">🥗</div><div class="schedule-time">11:45 – 12:30</div><div class="schedule-act">Lunch & table manners practice</div></div>
<div class="schedule-item"><div class="schedule-icon">😴</div><div class="schedule-time">12:30 – 2:30</div><div class="schedule-act">Rest time / quiet activities</div></div>
<div class="schedule-item"><div class="schedule-icon">🏗️</div><div class="schedule-time">2:30 – 4:00</div><div class="schedule-act">STEM & building block centers</div></div>
<div class="schedule-item"><div class="schedule-icon">🏠</div><div class="schedule-time">4:00 – 6:00</div><div class="schedule-act">Afternoon play & family pickup</div></div>
```

The Preschool Prep schedule used these entries:

```html
<h3>Sample Daily Schedule</h3>
<div class="schedule-item"><div class="schedule-icon">🌅</div><div class="schedule-time">7:00 – 8:30</div><div class="schedule-act">Morning welcome & journaling</div></div>
<div class="schedule-item"><div class="schedule-icon">🍎</div><div class="schedule-time">8:30 – 9:00</div><div class="schedule-act">Healthy breakfast</div></div>
<div class="schedule-item"><div class="schedule-icon">📚</div><div class="schedule-time">9:00 – 10:00</div><div class="schedule-act">Literacy circle & phonics</div></div>
<div class="schedule-item"><div class="schedule-icon">🔬</div><div class="schedule-time">10:00 – 10:45</div><div class="schedule-act">STEAM exploration stations</div></div>
<div class="schedule-item"><div class="schedule-icon">🌳</div><div class="schedule-time">10:45 – 11:45</div><div class="schedule-act">Outdoor play & garden time</div></div>
<div class="schedule-item"><div class="schedule-icon">🥗</div><div class="schedule-time">11:45 – 12:30</div><div class="schedule-act">Lunch & social skills</div></div>
<div class="schedule-item"><div class="schedule-icon">😴</div><div class="schedule-time">12:30 – 2:00</div><div class="schedule-act">Rest & quiet reading</div></div>
<div class="schedule-item"><div class="schedule-icon">🎨</div><div class="schedule-time">2:00 – 3:30</div><div class="schedule-act">Arts, music & creative projects</div></div>
<div class="schedule-item"><div class="schedule-icon">🏠</div><div class="schedule-time">3:30 – 6:00</div><div class="schedule-act">Extended care & family pickup</div></div>
```

The After-School Club schedule used these entries:

```html
<h3>After-School Schedule</h3>
<div class="schedule-item"><div class="schedule-icon">🚌</div><div class="schedule-time">2:30 – 3:30</div><div class="schedule-act">Bus pickup & afternoon snack</div></div>
<div class="schedule-item"><div class="schedule-icon">📖</div><div class="schedule-time">3:30 – 4:30</div><div class="schedule-act">Homework & reading time</div></div>
<div class="schedule-item"><div class="schedule-icon">🎮</div><div class="schedule-time">4:30 – 5:15</div><div class="schedule-act">Enrichment club of choice</div></div>
<div class="schedule-item"><div class="schedule-icon">🌳</div><div class="schedule-time">5:15 – 5:50</div><div class="schedule-act">Outdoor free play</div></div>
<div class="schedule-item"><div class="schedule-icon">🏠</div><div class="schedule-time">5:50 – 6:00</div><div class="schedule-act">Family pickup — latest 6:00 PM</div></div>
```

The schedule columns used the `.prog-schedule`, `.schedule-item`, `.schedule-icon`, `.schedule-time`, and `.schedule-act` rules in `style.css`. Restore `.prog-inner` to a two-column grid when restoring the schedule columns.

### Removed Program Features

The following feature items were removed from the Preschool Prep and After-School Club cards:

```html
<li>Weekly STEAM projects</li>
<li>School bus pickup available</li>
<li>Enrichment clubs (coding, art, cooking)</li>
<li>Healthy snacks included</li>
```
