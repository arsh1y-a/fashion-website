// ----------------- Interactive script (flip, fade, lightbox, parallax) -----------------
document.addEventListener('DOMContentLoaded', function () {
  
  /* ---------- SMOOTH SCROLL ---------- */
  const exploreBtn = document.getElementById('exploreBtn');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
      document.getElementById('struggles').scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ---------- FLIP + FADE + REDIRECT ---------- */
  const flipCards = document.querySelectorAll('.flip-card');
  const FLIP_DURATION = 650; // milliseconds (matches CSS 0.65s)
  
  flipCards.forEach(card => {
    // click handler
    card.addEventListener('click', function (e) {
      // prevent double-activation
      if (card.classList.contains('flipped')) return;
      
      // flip visually
      card.classList.add('flipped');
      
      // small delay to allow flip to be visible, then fade out body and redirect
      const target = card.dataset.target || card.getAttribute('data-target');
      setTimeout(() => {
        // add fade to body for page transition
        document.body.classList.add('fade-out');
        
        // wait for fade then navigate
        setTimeout(() => {
          if (target) window.location.href = target;
        }, 500);
      }, FLIP_DURATION);
    });
    
    // keyboard activation (Enter or Space)
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  /* ---------- LIGHTBOX (click image to enlarge) ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  
  // open any image inside .character-page
  document.querySelectorAll('.character-page img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = img.src;
      lightbox.style.display = 'flex';
      lightbox.setAttribute('aria-hidden', 'false');
    });
  });
  
  // click to close lightbox
  if (lightbox) {
    lightbox.addEventListener('click', () => {
      lightbox.style.display = 'none';
      lightbox.setAttribute('aria-hidden', 'true');
      lightboxImg.src = '';
    });
  }

  /* ---------- PARALLAX BACKGROUND MOVEMENT ---------- */
  document.addEventListener('mousemove', (event) => {
    // slight movement; small numbers = subtle
    const x = (event.clientX / window.innerWidth - 0.5) * 10; // px
    const y = (event.clientY / window.innerHeight - 0.5) * 10;
    
    // apply to body background position (works better with gradients)
    document.body.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
  });
});