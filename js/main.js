/* ═══════════════════════════════════════════════
   SURYA PRAKASH S — Portfolio JS
   Roller Coaster Interactions
═══════════════════════════════════════════════ */

// ── LOADER ──────────────────────────────────────
const loader = document.getElementById('loader');
const loaderFill = document.getElementById('loaderFill');
let progress = 0;

const fillInterval = setInterval(() => {
  progress += Math.random() * 12 + 4;
  if (progress >= 100) {
    progress = 100;
    clearInterval(fillInterval);
    setTimeout(() => {
      loader.classList.add('done');
      document.body.style.overflow = 'visible';
      initParticles();
    }, 400);
  }
  loaderFill.style.width = progress + '%';
}, 80);

document.body.style.overflow = 'hidden';

// ── CUSTOM CURSOR ────────────────────────────────
const cursor = document.getElementById('cursor');
const trail  = document.getElementById('cursor-trail');
let mx = 0, my = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
  setTimeout(() => {
    trail.style.left = mx + 'px';
    trail.style.top  = my + 'px';
  }, 80);
});

document.querySelectorAll('a, button, .skill-card, .tl-card, .award-card, .contact-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '36px';
    cursor.style.height = '36px';
    trail.style.width   = '60px';
    trail.style.height  = '60px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '16px';
    cursor.style.height = '16px';
    trail.style.width   = '40px';
    trail.style.height  = '40px';
  });
});

// ── SCROLL PROGRESS + SPEED ──────────────────────
const speedFill = document.getElementById('speedFill');
const cartDot   = document.getElementById('cartDot');

function updateScroll() {
  const max    = document.documentElement.scrollHeight - window.innerHeight;
  const pct    = max > 0 ? (window.scrollY / max) * 100 : 0;
  speedFill.style.width = Math.min(pct * 2, 100) + '%';

  // Cart position on side track
  const cy = pct; // 0..100 maps to viewBox 0..100
  cartDot.setAttribute('cy', cy);
}

window.addEventListener('scroll', updateScroll, { passive: true });

// ── REVEAL ON SCROLL ─────────────────────────────
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el    = entry.target;
      const delay = parseInt(el.dataset.delay || 0);
      setTimeout(() => {
        el.classList.add('revealed');
        // skill bars
        const bar = el.querySelector('.skill-bar');
        if (bar) bar.style.width = bar.dataset.pct + '%';
        // counters
        el.querySelectorAll('.stat-num').forEach(n => countUp(n));
      }, delay);
      observer.unobserve(el);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// Trigger skill bars that are in already-visible skill cards
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target.querySelector('.skill-bar');
      if (bar && bar.style.width === '') {
        setTimeout(() => bar.style.width = bar.dataset.pct + '%', 300);
      }
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.skill-card').forEach(c => skillObs.observe(c));

// ── COUNT UP ANIMATION ───────────────────────────
function countUp(el) {
  const target = parseInt(el.dataset.target);
  let current  = 0;
  const step   = target / 30;
  const timer  = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.round(current);
  }, 40);
}

// ── PARALLAX HERO ────────────────────────────────
const heroBg   = document.querySelector('.hero-bg-img');
const heroCart = document.getElementById('heroCart');
const skyline  = document.querySelector('.skyline-img');

window.addEventListener('scroll', () => {
  const sy = window.scrollY;
  if (heroBg)   heroBg.style.transform   = `translateY(${sy * 0.35}px)`;
  if (skyline)  skyline.style.transform  = `translateY(${sy * 0.18}px)`;
  if (heroCart) {
    const sway = Math.sin(sy * 0.02) * 20;
    heroCart.style.transform = `translateX(${sway}px) rotate(${sway * 0.3}deg)`;
  }
}, { passive: true });

// ── NAVBAR SCROLL ────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.style.background = 'rgba(4,6,26,0.97)';
  } else {
    navbar.style.background = 'rgba(4,6,26,0.85)';
  }
}, { passive: true });

// ── FLOATING PARTICLES ───────────────────────────
function initParticles() {
  const container = document.getElementById('floatParticles');
  const colors    = ['#FFD23F', '#00B4FF', '#A050FF', '#00DC82', '#FF3C78'];

  for (let i = 0; i < 25; i++) {
    const p   = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 5 + 2;
    const col  = colors[Math.floor(Math.random() * colors.length)];
    Object.assign(p.style, {
      width:           size + 'px',
      height:          size + 'px',
      background:      col,
      left:            Math.random() * 100 + 'vw',
      bottom:          '-20px',
      animationDelay:  Math.random() * 20 + 's',
      animationDuration: (Math.random() * 15 + 10) + 's',
      opacity:         Math.random() * 0.5 + 0.2,
      boxShadow:       `0 0 ${size * 3}px ${col}`,
    });
    container.appendChild(p);
  }
}

// ── SMOOTH SECTION NAVIGATION ────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── SKILL CARD HOVER GLOW ────────────────────────
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x    = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
    const y    = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
    card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 60%, transparent 100%)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});

// ── AWARD CARD TILT ──────────────────────────────
document.querySelectorAll('.award-card, .contact-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect  = card.getBoundingClientRect();
    const cx    = rect.left + rect.width  / 2;
    const cy    = rect.top  + rect.height / 2;
    const dx    = (e.clientX - cx) / (rect.width  / 2);
    const dy    = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `translateY(-8px) rotateX(${-dy * 6}deg) rotateY(${dx * 6}deg)`;
    card.style.transition = 'none';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = '';
  });
});

// ── TIMELINE HOVER ANIMATION ─────────────────────
document.querySelectorAll('.tl-dot').forEach(dot => {
  dot.closest('.tl-item').addEventListener('mouseenter', () => {
    dot.style.borderColor = 'var(--gold)';
    dot.style.background  = 'rgba(255,210,63,0.3)';
    dot.style.boxShadow   = '0 0 16px rgba(255,210,63,0.4)';
    dot.style.transform   = 'scale(1.4)';
    dot.style.transition  = 'all 0.3s';
  });
  dot.closest('.tl-item').addEventListener('mouseleave', () => {
    if (!dot.classList.contains('active')) {
      dot.style.borderColor = '';
      dot.style.background  = '';
      dot.style.boxShadow   = '';
    }
    dot.style.transform = '';
  });
});

// ── TYPING EFFECT FOR HERO TAGLINE ──────────────
(function() {
  const words    = ['Engineer', 'Author', 'Problem Solver', 'Innovator'];
  let   wordIdx  = 0, charIdx = 0, deleting = false;
  const tagWords = document.querySelector('.tag-word:last-child');
  if (!tagWords) return;

  function type() {
    const word     = words[wordIdx];
    tagWords.textContent = deleting ? word.substring(0, charIdx--) : word.substring(0, charIdx++);
    let speed = deleting ? 60 : 100;
    if (!deleting && charIdx > word.length) {
      deleting = true; speed = 1200;
    } else if (deleting && charIdx < 0) {
      deleting = false; charIdx = 0;
      wordIdx  = (wordIdx + 1) % words.length;
      speed    = 400;
    }
    setTimeout(type, speed);
  }
  setTimeout(type, 2000);
})();

// ── GLITCH EFFECT ON HERO NAME ──────────────────
const heroFirst = document.querySelector('.hero-first');
if (heroFirst) {
  setInterval(() => {
    heroFirst.style.textShadow = `
      ${Math.random()*10-5}px 0 rgba(255,0,100,0.6),
      ${Math.random()*10-5}px 0 rgba(0,200,255,0.6)
    `;
    setTimeout(() => {
      heroFirst.style.textShadow = '';
    }, 120);
  }, 4000);
}

console.log('%c🎢 SURYA PRAKASH S — Portfolio Loaded!', 
  'font-size:18px;color:#FFD23F;font-weight:bold;font-family:monospace');
console.log('%cTechnical Support Engineer @ Blue Yonder', 
  'font-size:12px;color:#00B4FF');
