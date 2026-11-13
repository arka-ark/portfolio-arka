// =============================================
// NAVBAR SCROLL EFFECT
// =============================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// =============================================
// HAMBURGER MENU
// =============================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// =============================================
// ACTIVE NAV LINK ON SCROLL
// =============================================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

function setActiveNav() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < bottom) {
      navItems.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = 'var(--primary-light)';
        }
      });
    }
  });
}

window.addEventListener('scroll', setActiveNav);

// =============================================
// FADE UP ANIMATION
// =============================================
const fadeElements = document.querySelectorAll(
  '.about-card, .exp-card, .skill-item, .contact-card, .contact-form, .bio-left, .bio-right, .section-header, .tools-grid, .hero-stats'
);

fadeElements.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(el => observer.observe(el));

// =============================================
// SKILL BAR ANIMATION
// =============================================
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      fill.style.width = fill.getAttribute('data-width') + '%';
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

// =============================================
// CONTACT FORM
// =============================================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';

  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim Pesan';
    formSuccess.classList.add('show');
    contactForm.reset();

    setTimeout(() => {
      formSuccess.classList.remove('show');
    }, 5000);
  }, 1500);
});

// =============================================
// TYPED SUBTITLE EFFECT
// =============================================
const roles = ['Teknisi CCTV', 'Teknisi Komputer', 'Pelajar SMK Islam 1 Blitar', 'PKL di Djakarta Komputer'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.querySelector('.hero-sub');
const staticText = 'Teknisi IT · ';

function typeRole() {
  const currentRole = roles[roleIndex];
  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typedEl.textContent = staticText + currentRole.substring(0, charIndex);

  let delay = isDeleting ? 60 : 90;

  if (!isDeleting && charIndex === currentRole.length) {
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 400;
  }

  setTimeout(typeRole, delay);
}

setTimeout(typeRole, 1000);

// =============================================
// CURSOR GLOW
// =============================================
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%, -50%);
  transition: left 0.1s, top 0.1s;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});
