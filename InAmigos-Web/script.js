/* ─────────────────────────────────────────
   InAmigos Foundation — script.js
   ───────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Scroll Reveal ── */
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => revealObserver.observe(el));


  /* ── 2. Animated Counters ── */
  const counters = document.querySelectorAll('.achievement-num[data-target]');



  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.dataset.target;
        const noPlus = el.dataset.noPlus === 'true';
        let current = 0;
        const step = Math.ceil(target / 60);

        const formatNum = (n) => {
          if (n >= 1000) return (n / 1000).toFixed(0) + 'K+';
          return noPlus ? n : n + '+';
        };

        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = formatNum(current);
          if (current >= target) clearInterval(timer);
        }, 30);

        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));


  /* ── 3. Active Nav Link Highlight on Scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));


  /* ── 4. Smooth Nav Background Opacity on Scroll ── */
  const nav = document.querySelector('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.style.background = 'rgba(22,30,39,0.98)';
    } else {
      nav.style.background = 'rgba(44,62,80,0.97)';
    }
  });



  /* ── 5. Hero Photo Slideshow ── */
  const slides   = document.querySelectorAll('#heroSlideshow .slide');
  const dots     = document.querySelectorAll('#heroSlideshow .dot');
  const prevBtn  = document.getElementById('slidePrev');
  const nextBtn  = document.getElementById('slideNext');
  let   current  = 0;
  let   timer;

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function startAuto() {
    timer = setInterval(() => goTo(current + 1), 4000);
  }

  function resetAuto() {
    clearInterval(timer);
    startAuto();
  }

  if (slides.length) {
    if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });
    dots.forEach(dot => {
      dot.addEventListener('click', () => { goTo(+dot.dataset.idx); resetAuto(); });
    });
    startAuto();
  }

});
