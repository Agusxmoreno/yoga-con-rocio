function openMenu() {
  document.getElementById('mobileMenu').classList.add('open');
  document.querySelector('.hamburger').style.display = 'none';
}

function closeMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.querySelector('.hamburger').style.display = 'flex';
}

// ── TYPEWRITER HERO ──
const phrase = "DONDE EL CUERPO SE MUEVE Y LA MENTE DESCANSA.";
const el = document.getElementById('typewriter');
const cursor = document.getElementById('cursor');
let i = 0;

function typeWriter() {
  if (i < phrase.length) {
    el.textContent += phrase.charAt(i);
    i++;
    setTimeout(typeWriter, 55);
  } else {
    setTimeout(() => {
      el.textContent = '';
      i = 0;
      cursor.style.display = 'inline-block';
      setTimeout(typeWriter, 400);
    }, 2000);
  }
}

setTimeout(typeWriter, 2800);

// ── FLOAT AWAY ON SCROLL ──
const stickers = document.querySelectorAll('.sticker');
const heroEl   = document.querySelector('.hero');

function onScroll() {
  const heroH    = heroEl.offsetHeight;
  const scrollY  = window.scrollY;
  const progress = Math.min(Math.max((scrollY - 80) / (heroH * 0.55), 0), 1);
  const eased    = progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

  stickers.forEach(el => {
    const s  = getComputedStyle(el);
    const dx = parseFloat(s.getPropertyValue('--dx')) || 0;
    const dy = parseFloat(s.getPropertyValue('--dy')) || 0;
    el.style.translate = dx * eased + 'px ' + dy * eased + 'px';
    el.style.opacity   = Math.max(1 - eased * 1.5, 0);
  });
}

window.addEventListener('scroll', onScroll, { passive: true });

// ── TOGGLE BIO ──
function toggleBio(btn) {
  const extra = document.querySelector('.about-bio-extra');
  extra.classList.toggle('open');
  btn.textContent = extra.classList.contains('open') ? 'Leer menos' : 'Leer más';
}

// ── FADE IN AL SCROLL — ambas direcciones ──
const fadeEls = document.querySelectorAll('.about-text, .about-gif');
const aboutObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    } else {
      e.target.classList.remove('visible');
    }
  });
}, { threshold: 0.2 });
fadeEls.forEach(el => aboutObserver.observe(el));

// ── MODALS ──
function openModal(id) {
  document.getElementById('modal-' + id).classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById('modal-' + id).classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalOutside(event, id) {
  if (event.target === event.currentTarget) closeModal(id);
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});

// ── FADE IN CARDS CLASES — ambas direcciones ──
const cards = document.querySelectorAll('.clase-card');
const cardsObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    } else {
      e.target.classList.remove('visible');
    }
  });
}, { threshold: 0.15 });
cards.forEach(c => cardsObserver.observe(c));

// ── EVENTOS — typewriter + fade in ──
const eventosEl     = document.getElementById('eventos-typewriter');
const eventosCursor = document.querySelector('.eventos-cursor');
const eventosPhrase = 'STAY TUNED';
let eventosI       = 0;
let eventosStarted = false;

const eventosObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && !eventosStarted) {
      eventosStarted = true;
      document.querySelector('.eventos-polaroid-wrap')?.classList.add('visible');
      document.querySelector('.eventos-text')?.classList.add('visible');
      setTimeout(typeEventos, 400);
    }
  });
}, { threshold: 0.3 });

const eventosSection = document.getElementById('eventos');
if (eventosSection) eventosObserver.observe(eventosSection);

function typeEventos() {
  if (eventosI < eventosPhrase.length) {
    eventosEl.textContent += eventosPhrase.charAt(eventosI);
    eventosI++;
    setTimeout(typeEventos, 80);
  } else {
    setTimeout(eraseEventos, 2000);
  }
}

function eraseEventos() {
  if (eventosEl.textContent.length > 0) {
    eventosEl.textContent = eventosEl.textContent.slice(0, -1);
    setTimeout(eraseEventos, 35);
  } else {
    eventosI = 0;
    if (eventosCursor) eventosCursor.style.display = 'inline-block';
    setTimeout(typeEventos, 500);
  }
}

// ── SEPARADORA — scroll horizontal sin pin ──
(function () {
  function loadScript(src, cb) {
    const s = document.createElement('script');
    s.src = src;
    s.onload = cb;
    document.head.appendChild(s);
  }

  document.addEventListener('DOMContentLoaded', function () {
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js', function () {
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js', function () {
        gsap.registerPlugin(ScrollTrigger);

        setTimeout(() => {
          ScrollTrigger.refresh();

          const wrapper = document.getElementById('separadora');
          const text    = document.getElementById('sep-text');

          if (!wrapper || !text) return;

          text.innerHTML = text.innerHTML.split('').map(char => {
            if (char === ' ') return ' ';
            return `<span class="sep-char">${char}</span>`;
          }).join('');

          gsap.to(text, {
            xPercent: -50,
            ease: 'none',
            scrollTrigger: {
              trigger: wrapper,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            }
          });

          document.querySelectorAll('.sep-char').forEach(char => {
            gsap.from(char, {
              yPercent: (Math.random() * 300) - 150,
              rotation: (Math.random() * 40) - 20,
              opacity: 0,
              ease: 'back.out(1.2)',
              scrollTrigger: {
                trigger: wrapper,
                start: 'top 80%',
                end: 'top 20%',
                scrub: 1,
              }
            });
          });

        }, 300);
      });
    });
  });
})();

// ── GALERÍA — ambas direcciones ──
const galeriaItems  = document.querySelectorAll('.galeria-item');
const galeriaTitulo = document.querySelector('.galeria-titulo');

const galeriaObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      e.target.classList.add('in-view');
    } else {
      e.target.classList.remove('in-view');
    }
  });
}, { threshold: 0.5 });

galeriaItems.forEach((item, i) => {
  item.style.transitionDelay = `${i * 0.08}s`;
  galeriaObserver.observe(item);
});

const tituloObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      galeriaTitulo.classList.add('visible');
      tituloObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

if (galeriaTitulo) tituloObserver.observe(galeriaTitulo);

// ── BLOG CARDS — ambas direcciones ──
const blogCards = document.querySelectorAll('.blog-card');
const blogObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    } else {
      e.target.classList.remove('visible');
    }
  });
}, { threshold: 0.15 });
blogCards.forEach(card => blogObserver.observe(card));

// ── CONTACTO — fade in una sola vez ──
const contactoCard = document.querySelector('.contacto-card');
const contactoIlu  = document.querySelector('.contacto-ilu');

const contactoObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      contactoCard?.classList.add('visible');
      contactoIlu?.classList.add('visible');
      contactoObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });

const contactoSec = document.getElementById('contacto');
if (contactoSec) contactoObserver.observe(contactoSec);

// ── CONTACTO — typewriter título una sola vez ──
const contactoTitulo = document.querySelector('.contacto-titulo');
const textoOriginal  = 'Tu práctica\nte espera.';
let contactoI        = 0;

function typeContacto() {
  if (contactoI < textoOriginal.length) {
    const char = textoOriginal.charAt(contactoI);
    contactoTitulo.innerHTML += char === '\n' ? '<br>' : char;
    contactoI++;
    setTimeout(typeContacto, 60);
  } else {
    setTimeout(eraseContacto, 2500);
  }
}



const contactoTitleObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      contactoTitulo.innerHTML = '';
      typeContacto();
      contactoTitleObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

if (contactoSec) contactoTitleObserver.observe(contactoSec);

// ── CLASES ONLINE — fade in una sola vez ──
const onlineText  = document.querySelector('.online-text');
const onlineVideo = document.querySelector('.online-video');

const onlineObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      onlineText?.classList.add('visible');
      onlineVideo?.classList.add('visible');
      onlineObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });

const onlineSection = document.getElementById('clases-online');
if (onlineSection) onlineObserver.observe(onlineSection);


document.querySelectorAll('a[href="#inicio"], a[href="index.html#inicio"]').forEach(link => {
  link.addEventListener('click', () => {

    // resetear eventos typewriter
    eventosStarted = false;
    eventosI = 0;
    if (eventosEl) eventosEl.textContent = '';

    // resetear contacto typewriter
    contactoI = 0;
    if (contactoTitulo) contactoTitulo.innerHTML = '';

    // quitar visible
    contactoCard?.classList.remove('visible');
    contactoIlu?.classList.remove('visible');
    onlineText?.classList.remove('visible');
    onlineVideo?.classList.remove('visible');

    document.querySelectorAll('.about-text, .about-gif, .clase-card, .blog-card').forEach(el => {
      el.classList.remove('visible');
    });

    // re-observar los que tienen unobserve
    if (contactoSec) {
      contactoObserver.observe(contactoSec);
      contactoTitleObserver.observe(contactoSec);
    }
    if (onlineSection) onlineObserver.observe(onlineSection);

  });
});


window.addEventListener('load', () => {
  if (window.location.hash) {
    setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  }
});