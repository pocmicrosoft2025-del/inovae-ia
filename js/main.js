/**
 * inovae.ia — Main JavaScript
 * Animations, Interactions, AOS, Particles, Chat Demo
 */

'use strict';

/* ============================================================
   CURSOR CUSTOMIZADO
   ============================================================ */
(function initCursor() {
  const dot     = document.querySelector('.cursor-dot');
  const outline = document.querySelector('.cursor-outline');
  if (!dot || !outline) return;

  let mouseX = 0, mouseY = 0;
  let outX = 0, outY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  function animateOutline() {
    outX += (mouseX - outX) * 0.12;
    outY += (mouseY - outY) * 0.12;
    outline.style.left = outX + 'px';
    outline.style.top  = outY + 'px';
    requestAnimationFrame(animateOutline);
  }
  animateOutline();

  const hoverTargets = 'a, button, .service-card, .stat-card, .dif-card, .benefit-item, .tech-logo, .orbit-icon';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('hover');
      outline.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('hover');
      outline.classList.remove('hover');
    });
  });
})();


/* ============================================================
   PARTICLES CANVAS
   ============================================================ */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W = window.innerWidth;
  let H = window.innerHeight;
  canvas.width  = W;
  canvas.height = H;

  window.addEventListener('resize', () => {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;
  });

  const PARTICLE_COUNT = Math.min(80, Math.floor((W * H) / 18000));
  const particles = [];

  const colors = [
    'rgba(124, 58, 237, VAL)',
    'rgba(192, 132, 252, VAL)',
    'rgba(139,  92, 246, VAL)',
    'rgba(232, 121, 249, VAL)',
  ];

  class Particle {
    constructor() { this.reset(true); }
    reset(initial = false) {
      this.x = Math.random() * W;
      this.y = initial ? Math.random() * H : H + 10;
      this.size   = Math.random() * 1.8 + 0.4;
      this.speedY = -(Math.random() * 0.4 + 0.1);
      this.speedX = (Math.random() - 0.5) * 0.15;
      this.alpha  = Math.random() * 0.5 + 0.1;
      this.color  = colors[Math.floor(Math.random() * colors.length)];
      this.twinkle = Math.random() * Math.PI * 2;
      this.twinkleSpeed = Math.random() * 0.02 + 0.005;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.twinkle += this.twinkleSpeed;
      this.currentAlpha = this.alpha * (0.6 + 0.4 * Math.sin(this.twinkle));
      if (this.y < -10) this.reset();
    }
    draw() {
      const col = this.color.replace('VAL', this.currentAlpha);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = col;
      ctx.fill();
      // glow
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2);
      const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2.5);
      grd.addColorStop(0, this.color.replace('VAL', this.currentAlpha * 0.3));
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

  // Mouse parallax
  let mx = W / 2, my = H / 2;
  document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });

  function drawConnections() {
    const nearby = particles.slice(0, 30);
    for (let i = 0; i < nearby.length; i++) {
      for (let j = i + 1; j < nearby.length; j++) {
        const dx = nearby[i].x - nearby[j].x;
        const dy = nearby[i].y - nearby[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          const alpha = (1 - dist / 130) * 0.08;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(nearby[i].x, nearby[i].y);
          ctx.lineTo(nearby[j].x, nearby[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animate);
  }
  animate();
})();


/* ============================================================
   NAVBAR SCROLL EFFECT
   ============================================================ */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const topBar    = document.getElementById('top-bar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
      if (topBar) topBar.classList.add('hidden');
    } else {
      navbar.classList.remove('scrolled');
      if (topBar) topBar.classList.remove('hidden');
    }
  });

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');
  const onScroll = () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(sec => {
      const top    = sec.offsetTop;
      const height = sec.offsetHeight;
      const id     = sec.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${id}"]`);
        if (active) active.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
})();


/* ============================================================
   AOS — ANIMATE ON SCROLL (custom, no external lib)
   ============================================================ */
(function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');
  const delays   = { '100': 100, '150': 150, '200': 200, '250': 250, '300': 300, '350': 350, '400': 400, '500': 500 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el    = entry.target;
        const delay = delays[el.dataset.aosDelay] || 0;
        setTimeout(() => el.classList.add('aos-animate'), delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  elements.forEach(el => observer.observe(el));
})();


/* ============================================================
   COUNTERS — ESTATÍSTICAS
   ============================================================ */
(function initCounters() {
  const counters  = document.querySelectorAll('.counter');
  const barFills  = document.querySelectorAll('.stat-bar-fill');
  let triggered   = false;

  const statsSection = document.getElementById('problem');
  if (!statsSection) return;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !triggered) {
      triggered = true;
      counters.forEach(counter => {
        const target   = parseInt(counter.dataset.target);
        const duration = 1800;
        const step     = 16;
        const increment = target / (duration / step);
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            counter.textContent = target;
            clearInterval(timer);
          } else {
            counter.textContent = Math.floor(current);
          }
        }, step);
      });
      // Animate bars
      setTimeout(() => {
        barFills.forEach(bar => bar.classList.add('animate'));
      }, 300);
    }
  }, { threshold: 0.4 });

  observer.observe(statsSection);
})();


/* ============================================================
   CHAT DEMO — PHONE MOCKUP
   ============================================================ */
(function initChatDemo() {
  const typingEl = document.getElementById('typing-indicator');
  const msg1     = document.getElementById('msg-response-1');
  const msg2     = document.getElementById('msg-response-2');
  const msg3     = document.getElementById('msg-response-3');
  if (!typingEl) return;

  function runChatSequence() {
    setTimeout(() => {
      if (typingEl) typingEl.classList.remove('hidden');
    }, 1500);
    setTimeout(() => {
      if (typingEl) typingEl.classList.add('hidden');
      if (msg1) { msg1.classList.remove('hidden'); }
    }, 3200);
    setTimeout(() => {
      if (msg2) { msg2.classList.remove('hidden'); }
    }, 4800);
    setTimeout(() => {
      if (typingEl) typingEl.classList.remove('hidden');
    }, 5800);
    setTimeout(() => {
      if (typingEl) typingEl.classList.add('hidden');
      if (msg3) { msg3.classList.remove('hidden'); }
    }, 7400);
    setTimeout(() => {
      // Reset
      if (msg1) msg1.classList.add('hidden');
      if (msg2) msg2.classList.add('hidden');
      if (msg3) msg3.classList.add('hidden');
      if (typingEl) typingEl.classList.remove('hidden');
      setTimeout(() => {
        if (typingEl) typingEl.classList.add('hidden');
        runChatSequence();
      }, 800);
    }, 12000);
  }

  // Start after page loads
  setTimeout(runChatSequence, 1000);
})();


/* ============================================================
   NOTIFICATIONS — PHONE MOCKUP
   ============================================================ */
(function initNotifications() {
  const notifs = [
    { id: 'notif-1', delay: 1000 },
    { id: 'notif-2', delay: 2500 },
    { id: 'notif-3', delay: 1500 },
    { id: 'notif-4', delay: 3500 },
  ];

  function showNotifs() {
    notifs.forEach(({ id, delay }) => {
      const el = document.getElementById(id);
      if (!el) return;
      setTimeout(() => {
        el.classList.add('show');
        setTimeout(() => {
          el.classList.remove('show');
          setTimeout(() => el.classList.add('show'), 3000);
        }, 4000);
      }, delay);
    });
  }

  const heroSection = document.getElementById('hero');
  if (!heroSection) return;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      showNotifs();
      observer.disconnect();
    }
  }, { threshold: 0.3 });
  observer.observe(heroSection);
})();


/* ============================================================
   PARALLAX ON SCROLL
   ============================================================ */
(function initParallax() {
  const orbs = document.querySelectorAll('.hero-orb');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    orbs.forEach((orb, i) => {
      const speed = (i + 1) * 0.08;
      orb.style.transform = `translate(0, ${scrollY * speed}px)`;
    });
  }, { passive: true });
})();


/* ============================================================
   TILT EFFECT ON CARDS
   ============================================================ */
(function initTilt() {
  const cards = document.querySelectorAll('.service-card, .stat-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left - rect.width  / 2;
      const y      = e.clientY - rect.top  - rect.height / 2;
      const tiltX  = (y / (rect.height / 2)) * 4;
      const tiltY  = -(x / (rect.width  / 2)) * 4;
      card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


/* ============================================================
   MOUSE-REACTIVE GLOW ON SERVICE CARDS
   ============================================================ */
(function initCardGlow() {
  const cards = document.querySelectorAll('.service-card, .dif-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect  = card.getBoundingClientRect();
      const x     = e.clientX - rect.left;
      const y     = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
})();


/* ============================================================
   SMOOTH SCROLL FOR NAV LINKS
   ============================================================ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top    = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
})();


/* ============================================================
   CHAT WIDGET — Floating agent button
   ============================================================ */
(function initChatWidget() {
  const widgetBtn   = document.getElementById('chat-widget-btn');
  const widgetPanel = document.getElementById('chat-widget-panel');
  const minimizeBtn = document.getElementById('cwp-minimize');
  const tooltip     = document.querySelector('.chat-widget-tooltip');
  const tooltipClose = document.getElementById('cwt-close');
  const iconChat    = document.querySelector('.cwb-icon--chat');
  const iconClose   = document.querySelector('.cwb-icon--close');
  const openChatBtn = document.getElementById('btn-open-chat');

  if (!widgetBtn || !widgetPanel) return;

  let isOpen = false;

  function openPanel() {
    isOpen = true;
    widgetPanel.classList.add('open');
    iconChat.classList.add('hidden');
    iconClose.classList.remove('hidden');
    // Hide tooltip when panel is open
    if (tooltip) tooltip.style.display = 'none';
  }

  function closePanel() {
    isOpen = false;
    widgetPanel.classList.remove('open');
    iconChat.classList.remove('hidden');
    iconClose.classList.add('hidden');
  }

  widgetBtn.addEventListener('click', () => {
    isOpen ? closePanel() : openPanel();
  });

  if (minimizeBtn) {
    minimizeBtn.addEventListener('click', closePanel);
  }

  // Close tooltip button
  if (tooltipClose && tooltip) {
    tooltipClose.addEventListener('click', () => {
      tooltip.style.display = 'none';
    });
  }

  // Scroll the CTA section into view when "Falar com o Agente" button is clicked
  if (openChatBtn) {
    openChatBtn.addEventListener('click', () => {
      const ctaSection = document.getElementById('cta-final');
      if (ctaSection) {
        ctaSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Auto-hide tooltip after 9 seconds
  if (tooltip) {
    setTimeout(() => {
      if (tooltip.style.display !== 'none') {
        tooltip.style.opacity = '0';
        tooltip.style.transition = 'opacity 0.5s';
        setTimeout(() => { tooltip.style.display = 'none'; }, 500);
      }
    }, 9000);
  }

  // Close panel on outside click (desktop)
  document.addEventListener('click', (e) => {
    if (isOpen && !e.target.closest('.chat-widget')) {
      closePanel();
    }
  });

  // Keyboard: Escape closes panel
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) closePanel();
  });
})();


/* ============================================================
   TYPEWRITER EFFECT — Hero Title
   ============================================================ */
(function initTypewriter() {
  const badge = document.querySelector('.hero-badge span:last-child');
  if (!badge) return;
  const phrases = [
    'Automação com IA · Nova Geração',
    'Agentes que nunca dormem',
    'Mais leads · Mais vendas · Menos trabalho',
  ];
  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  let isPausing   = false;

  function type() {
    if (isPausing) return;
    const current = phrases[phraseIndex];

    if (!isDeleting) {
      badge.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isPausing = true;
        setTimeout(() => { isPausing = false; isDeleting = true; type(); }, 2600);
        return;
      }
    } else {
      badge.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting    = false;
        phraseIndex   = (phraseIndex + 1) % phrases.length;
        isPausing     = true;
        setTimeout(() => { isPausing = false; type(); }, 400);
        return;
      }
    }
    setTimeout(type, isDeleting ? 40 : 70);
  }
  setTimeout(type, 2000);
})();


/* ============================================================
   BENEFITS ORBIT — Pause on hover
   ============================================================ */
(function initOrbitPause() {
  const visual = document.querySelector('.benefits-visual');
  if (!visual) return;
  visual.addEventListener('mouseenter', () => {
    visual.querySelectorAll('.bv-ring, .orbit-item').forEach(el => {
      el.style.animationPlayState = 'paused';
    });
  });
  visual.addEventListener('mouseleave', () => {
    visual.querySelectorAll('.bv-ring, .orbit-item').forEach(el => {
      el.style.animationPlayState = 'running';
    });
  });
})();


/* ============================================================
   SCROLL PROGRESS BAR
   ============================================================ */
(function initScrollProgress() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 3px; width: 0%;
    background: linear-gradient(90deg, #7c3aed, #c084fc, #e879f9);
    z-index: 10000; transition: width 0.1s;
    box-shadow: 0 0 10px rgba(192,132,252,0.6);
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const total    = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / total) * 100;
    bar.style.width = progress + '%';
  }, { passive: true });
})();


/* ============================================================
   SECTION REVEAL — stagger children
   ============================================================ */
(function initStaggerReveal() {
  const grids = document.querySelectorAll('.services-grid, .stats-grid, .diferencial-grid');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const children = entry.target.querySelectorAll(':scope > *');
        children.forEach((child, i) => {
          setTimeout(() => {
            child.style.opacity   = '1';
            child.style.transform = 'translateY(0)';
          }, i * 120);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  grids.forEach(grid => {
    const children = grid.querySelectorAll(':scope > *');
    children.forEach(child => {
      child.style.opacity    = '0';
      child.style.transform  = 'translateY(30px)';
      child.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.4,0,0.2,1)';
    });
    observer.observe(grid);
  });
})();


/* ============================================================
   NEON GLOW LINES (decorative SVG)
   ============================================================ */
(function injectNeonLines() {
  const style = document.createElement('style');
  style.textContent = `
    .service-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(192,132,252,0.5), transparent);
      opacity: 0;
      transition: opacity 0.35s;
    }
    .service-card:hover::before { opacity: 1; }

    .dif-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(192,132,252,0.4), transparent);
      opacity: 0;
      transition: opacity 0.35s;
    }
    .dif-card:hover::before { opacity: 1; }

    .nav-link.active {
      color: var(--violet-light) !important;
    }
    .nav-link.active::after {
      width: 60% !important;
    }
  `;
  document.head.appendChild(style);
})();


/* ============================================================
   LAZY LOAD SECTIONS (performance)
   ============================================================ */
(function lazyLoadSections() {
  document.querySelectorAll('section').forEach(sec => {
    sec.style.willChange = 'transform';
    window.addEventListener('scroll', function handler() {
      const rect = sec.getBoundingClientRect();
      if (rect.top < window.innerHeight + 200) {
        sec.style.willChange = 'auto';
        window.removeEventListener('scroll', handler);
      }
    }, { passive: true });
  });
})();


/* ============================================================
   VIDEO COMPARISON — Tabs, Play/Pause, UX
   ============================================================ */
(function initVideoComparison() {

  /* ── Elements ── */
  const tabBad   = document.getElementById('tab-bad');
  const tabGood  = document.getElementById('tab-good');
  const cardBad  = document.getElementById('video-card-bad');
  const cardGood = document.getElementById('video-card-good');
  const videoBad  = document.getElementById('video-bad');
  const videoGood = document.getElementById('video-good');
  const overlayBad  = document.getElementById('overlay-bad');
  const overlayGood = document.getElementById('overlay-good');
  const playBadBtn  = document.getElementById('play-bad');
  const playGoodBtn = document.getElementById('play-good');

  if (!tabBad || !tabGood || !videoBad || !videoGood) return;

  /* ── Mobile tab switching ── */
  function switchTab(show) {
    // Update tabs
    tabBad.classList.toggle('active',  show === 'bad');
    tabGood.classList.toggle('active', show === 'good');
    tabBad.setAttribute('aria-pressed',  show === 'bad');
    tabGood.setAttribute('aria-pressed', show === 'good');

    // Pause the hidden video
    if (show === 'bad') {
      cardBad.classList.add('active');
      cardGood.classList.remove('active');
      if (!videoGood.paused) { videoGood.pause(); showOverlay(overlayGood); }
    } else {
      cardGood.classList.add('active');
      cardBad.classList.remove('active');
      if (!videoBad.paused) { videoBad.pause(); showOverlay(overlayBad); }
    }
  }

  tabBad.addEventListener('click',  () => switchTab('bad'));
  tabGood.addEventListener('click', () => switchTab('good'));

  /* ── Play / Pause helpers ── */
  function hideOverlay(overlay) {
    overlay.classList.add('hidden');
  }
  function showOverlay(overlay) {
    overlay.classList.remove('hidden');
  }

  function setupVideoPlay(video, overlay, playBtn) {
    // Play button click
    playBtn.addEventListener('click', () => {
      hideOverlay(overlay);
      video.play().catch(() => { showOverlay(overlay); });
    });

    // Clicking on the video itself pauses/resumes
    video.addEventListener('click', () => {
      if (video.paused) {
        video.play().catch(() => {});
        hideOverlay(overlay);
      } else {
        video.pause();
        showOverlay(overlay);
      }
    });

    // When video ends — show overlay again gently
    video.addEventListener('ended', () => {
      setTimeout(() => showOverlay(overlay), 400);
      video.currentTime = 0;
    });

    // Pause event — show overlay (unless ended already handled)
    video.addEventListener('pause', () => {
      if (!video.ended) {
        // Small delay so click-to-pause feels snappy
        setTimeout(() => {
          if (video.paused && !video.ended) showOverlay(overlay);
        }, 150);
      }
    });

    // Play event — hide overlay immediately
    video.addEventListener('play', () => {
      hideOverlay(overlay);
    });
  }

  setupVideoPlay(videoBad,  overlayBad,  playBadBtn);
  setupVideoPlay(videoGood, overlayGood, playGoodBtn);

  /* ── Auto-pause when section leaves viewport ── */
  const vcSection = document.getElementById('comparativo');
  if (vcSection) {
    const sectionObserver = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) {
        if (!videoBad.paused)  { videoBad.pause();  }
        if (!videoGood.paused) { videoGood.pause(); }
      }
    }, { threshold: 0.05 });
    sectionObserver.observe(vcSection);
  }

  /* ── Keyboard accessibility for videos ── */
  [videoBad, videoGood].forEach((vid, i) => {
    vid.setAttribute('tabindex', '0');
    vid.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        vid.paused ? vid.play() : vid.pause();
      }
      if (e.key === 'ArrowRight') vid.currentTime = Math.min(vid.duration, vid.currentTime + 5);
      if (e.key === 'ArrowLeft')  vid.currentTime = Math.max(0, vid.currentTime - 5);
    });
  });

  /* ── Hover micro-animation on play button ── */
  [playBadBtn, playGoodBtn].forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.querySelector('.vc-play-icon').style.transform = 'scale(1.12)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.querySelector('.vc-play-icon').style.transform = '';
    });
  });

  /* ── Shimmer effect on video thumbnails before play ── */
  [videoBad, videoGood].forEach(vid => {
    vid.addEventListener('waiting', () => {
      vid.closest('.vc-video-wrapper').classList.add('vc-loading');
    });
    vid.addEventListener('canplay', () => {
      vid.closest('.vc-video-wrapper').classList.remove('vc-loading');
    });
  });

})();

