# Removed Sections Archive

This file preserves the Blog and Reviews sections removed from the active pages. The archived markup was shared by `index.html` and `blooming-birds-daycare.html`.

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
