/* ═══════════════════════════════════════════
   Portfolio — Interactive Script
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Cursor Glow ── */
  const glow = document.getElementById('cursorGlow');
  if (glow && window.matchMedia('(pointer:fine)').matches) {
    document.addEventListener('mousemove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  } else if (glow) {
    glow.style.display = 'none';
  }

  /* ── Navbar Scroll ── */
  const nav = document.getElementById('nav');
  const sections = document.querySelectorAll('.section, .hero');
  const navLinks = document.querySelectorAll('.nav__link');

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);

    // Active link highlight
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Mobile Menu ── */
  const toggle = document.getElementById('navToggle');
  const linksWrap = document.getElementById('navLinks');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const open = linksWrap.classList.toggle('open');
      toggle.innerHTML = open
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });
    linksWrap.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        linksWrap.classList.remove('open');
        toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  /* ── Scroll Reveal ── */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );
  reveals.forEach(el => revealObserver.observe(el));

  /* ── Counter Animation ── */
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '+';
      let current = 0;
      const step = Math.max(1, Math.floor(target / 40));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current + suffix;
      }, 30);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));

  /* ── Contact Form ── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.btn--primary');
      const origHTML = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
      btn.style.pointerEvents = 'none';
      setTimeout(() => {
        btn.innerHTML = origHTML;
        btn.style.pointerEvents = '';
        form.reset();
      }, 2500);
    });
  }

  /* ── Smooth Anchor Scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ── Typing Effect for Hero Role ── */
  const roleEl = document.querySelector('.hero__role');
  if (roleEl) {
    const roles = ['BSIT Student · Web Developer', 'Full-Stack Developer in Training', 'PHP & JavaScript Enthusiast', 'Building the Future with Code'];
    let roleIdx = 0, charIdx = 0, deleting = false;
    const type = () => {
      const current = roles[roleIdx];
      roleEl.textContent = current.substring(0, charIdx);
      if (!deleting) {
        charIdx++;
        if (charIdx > current.length) { deleting = true; setTimeout(type, 1800); return; }
      } else {
        charIdx--;
        if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; }
      }
      setTimeout(type, deleting ? 35 : 70);
    };
    setTimeout(type, 1200);
  }

  /* ── Certificate Filtering ── */
  const filterBtns = document.querySelectorAll('.cert-filter-btn');
  const certCards = document.querySelectorAll('.cert-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      certCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => { card.classList.add('hidden'); }, 250);
        }
      });
    });
  });

  /* ── Certificate Data & Lightbox Modal ── */
  const certificates = [
    {
      title: "Introduction to AI Literacy and Responsible Use",
      issuer: "Mapúa University × CHED (Handog ng Pangulo Caravan)",
      date: "15 September 2026",
      id: "LM5JOJRNJ0PB0",
      badge: "Micro-Credential",
      badgeClass: "cert-badge--ai",
      img: "assets/images/certificate/ai-literacy.png",
      reflection: "This training broadened my perspective on integrating AI into development ethically—emphasizing algorithmic responsibility, data integrity, and respecting user privacy in modern intelligent systems."
    },
    {
      title: "Introduction to Cybersecurity",
      issuer: "Cisco Networking Academy & DICT-ITU DTC Initiative",
      date: "14 September 2026",
      id: "a6ecea28-58ee-40d0-963e-7292305ddf54",
      badge: "Cisco Verified",
      badgeClass: "cert-badge--cisco",
      img: "assets/images/certificate/cybersecurity.png",
      reflection: "Gained crucial foundations in cyber defense, threat analysis, and secure coding practices—reinforcing that security is a non-negotiable requirement across every layer of web application design."
    },
    {
      title: "Digital Awareness",
      issuer: "Cisco Networking Academy & DICT-ITU DTC Initiative",
      date: "14 September 2026",
      id: "63715151-3800-4ad8-b1ec-d9297bee953f",
      badge: "Cisco Verified",
      badgeClass: "cert-badge--cisco",
      img: "assets/images/certificate/digital-awareness.png",
      reflection: "Enhanced my digital literacy and workplace collaboration skills, deepening my appreciation for cyber hygiene, internet safety standards, and responsible communication as an IT professional."
    },
    {
      title: "Computer Hardware Basics",
      issuer: "Cisco Networking Academy & DICT-ITU DTC Initiative",
      date: "13 September 2026",
      id: "4f02aaf2-307e-4c5c-a670-554d27d69809",
      badge: "Cisco Verified",
      badgeClass: "cert-badge--cisco",
      img: "assets/images/certificate/hardware-basics.png",
      reflection: "Solidified my core understanding of computer architecture and diagnostics, giving me a strong physical-layer foundation to better troubleshoot and optimize software-hardware interactions."
    }
  ];

  let currentCertIdx = 0;
  const modal = document.getElementById('certModal');
  const modalBackdrop = document.getElementById('certModalBackdrop');
  const modalClose = document.getElementById('certModalClose');
  const modalImg = document.getElementById('certModalImg');
  const modalTitle = document.getElementById('certModalTitle');
  const modalMeta = document.getElementById('certModalMeta');
  const modalBadge = document.getElementById('certModalBadge');
  const modalId = document.getElementById('certModalId');
  const modalLink = document.getElementById('certModalLink');
  const modalReflectionText = document.getElementById('certModalReflectionText');
  const prevBtn = document.getElementById('certPrevBtn');
  const nextBtn = document.getElementById('certNextBtn');

  function renderCertModal(index) {
    currentCertIdx = (index + certificates.length) % certificates.length;
    const cert = certificates[currentCertIdx];
    if (!cert) return;

    modalImg.src = cert.img;
    modalImg.alt = cert.title;
    modalTitle.textContent = cert.title;
    modalMeta.textContent = `${cert.issuer} · ${cert.date}`;
    modalBadge.textContent = cert.badge;
    modalId.querySelector('span').textContent = cert.id;
    modalLink.href = cert.img;
    if (modalReflectionText) {
      modalReflectionText.textContent = `"${cert.reflection}"`;
    }
  }

  function openModal(index) {
    renderCertModal(index);
    if (modal) {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  window.openCertModal = openModal;
  window.closeCertModal = closeModal;

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
  if (prevBtn) prevBtn.addEventListener('click', () => renderCertModal(currentCertIdx - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => renderCertModal(currentCertIdx + 1));

  // Keyboard navigation for modal
  document.addEventListener('keydown', (e) => {
    if (!modal || !modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') renderCertModal(currentCertIdx - 1);
    if (e.key === 'ArrowRight') renderCertModal(currentCertIdx + 1);
  });

  /* ── Copy Credential ID ── */
  const toast = document.getElementById('copyToast');
  let toastTimer = null;

  window.copyCertId = function (text, btn) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text);
    } else {
      const tempInput = document.createElement('input');
      tempInput.value = text;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
    }

    if (btn) {
      const origHTML = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check" style="color:var(--accent-2)"></i>';
      setTimeout(() => { btn.innerHTML = origHTML; }, 2000);
    }

    if (toast) {
      toast.classList.add('show');
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }
  };
});
