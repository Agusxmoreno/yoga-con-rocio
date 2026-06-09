// ── MENU MOBILE ──
function openMenu()  { document.getElementById('mobileMenu').classList.add('open'); }
function closeMenu() { document.getElementById('mobileMenu').classList.remove('open'); }

// ── HERO — animaciones al cargar ──
window.addEventListener('load', () => {
  document.querySelector('.post-categoria')?.classList.add('visible');
  setTimeout(() => document.querySelector('.post-titulo')?.classList.add('visible'), 150);
  setTimeout(() => document.querySelector('.post-fecha')?.classList.add('visible'), 250);
  setTimeout(() => document.querySelector('.post-cover')?.classList.add('visible'), 350);
});

// ── CITA — typewriter al entrar en pantalla ──
const quoteEl = document.querySelector('.post-quote p');

if (quoteEl) {
  const quoteText = quoteEl.textContent.trim();
  quoteEl.textContent = '';
  let quoteStarted = false;

  const quoteObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !quoteStarted) {
        quoteStarted = true;
        e.target.closest('.post-quote').classList.add('visible');
        let i = 0;
        function typeQuote() {
          if (i < quoteText.length) {
            quoteEl.textContent += quoteText.charAt(i);
            i++;
            setTimeout(typeQuote, 45);
          }
        }
        setTimeout(typeQuote, 400);
        quoteObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  quoteObserver.observe(quoteEl);
}

// ── SCROLL ANIMATIONS — párrafos, títulos, conceptos, separadores ──
const animEls = document.querySelectorAll(
  '.post-content p, .post-content h2, .post-content h3, .post-concepto, .post-ilu-break, .post-footer'
);

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

animEls.forEach(el => observer.observe(el));


// ── MEDIA — fade in fotos y videos ──
const mediaEls = document.querySelectorAll(
  '.post-media-full, .post-media-grid, .post-media-caption'
);

const mediaObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      mediaObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

mediaEls.forEach(el => mediaObserver.observe(el));