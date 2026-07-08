/* Mucky Maids - Main JS */
(function(){
  'use strict';

  // Detect touch
  const isTouch = window.matchMedia('(pointer: coarse)').matches;

  // ===== LENIS SMOOTH SCROLL =====
  let lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({ duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 3), smooth: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // ===== HEADER SCROLL =====
  const header = document.getElementById('header');
  let scrolled = false;
  function onScroll() {
    const s = window.pageYOffset > 50;
    if (s !== scrolled) { header.classList.toggle('scrolled', s); scrolled = s; }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // ===== MOBILE MENU =====
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  menuBtn.addEventListener('click', () => {
    const open = menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active', open);
    menuBtn.setAttribute('aria-expanded', open);
    mobileMenu.setAttribute('aria-hidden', !open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
      menuBtn.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });

  // ===== SMOOTH ANCHOR SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) { e.preventDefault(); lenis ? lenis.scrollTo(target) : target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // ===== CUSTOM CURSOR =====
  if (!isTouch) {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      if (cursor) { cursor.style.left = mouseX + 'px'; cursor.style.top = mouseY + 'px'; }
    });
    function animateFollower() {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      if (follower) { follower.style.left = followerX + 'px'; follower.style.top = followerY + 'px'; }
      requestAnimationFrame(animateFollower);
    }
    animateFollower();
    document.querySelectorAll('a, button, .magnetic-btn').forEach(el => {
      el.addEventListener('mouseenter', () => { if (cursor) cursor.classList.add('hover'); });
      el.addEventListener('mouseleave', () => { if (cursor) cursor.classList.remove('hover'); });
    });
  }

  // ===== MAGNETIC BUTTONS =====
  if (!isTouch) {
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        gsap.to(btn, { x: (e.clientX - rect.left - rect.width / 2) * 0.3, y: (e.clientY - rect.top - rect.height / 2) * 0.3, duration: 0.3, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
      });
    });
  }

  // ===== GSAP SCROLL ANIMATIONS =====
  gsap.registerPlugin(ScrollTrigger);

  // Hero title reveal
  gsap.from('.hero-title .line', { y: 80, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.3 });
  gsap.from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.7 });
  gsap.from('.hero-cta', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out', delay: 0.9 });
  gsap.from('.hero-badges', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out', delay: 1.1 });
  gsap.from('.hero-review-card', { y: 40, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 1.3 });

  // Stats counter
  document.querySelectorAll('.stat-number[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    gsap.from(el, {
      textContent: 0, duration: 2, ease: 'power2.out', snap: { textContent: 1 },
      scrollTrigger: { trigger: el, start: 'top 85%' },
      onUpdate: function () { el.textContent = Math.round(gsap.getProperty(el, 'textContent')); }
    });
  });

  // Steps
  gsap.from('.step', { y: 40, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: '.steps', start: 'top 80%' } });
  gsap.from('.step-arrow', { opacity: 0, duration: 0.4, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: '.steps', start: 'top 80%' } });

  // Service cards
  gsap.from('.service-card', { y: 50, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: '.services-grid', start: 'top 80%' } });

  // About
  gsap.from('.about-content', { x: -50, opacity: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: '.about', start: 'top 70%' } });
  gsap.from('.about-img', { x: 50, opacity: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: '.about', start: 'top 70%' } });
  gsap.from('.about-float-card', { y: 30, opacity: 0, duration: 0.6, delay: 0.3, ease: 'power2.out', scrollTrigger: { trigger: '.about', start: 'top 70%' } });

  // Reviews
  gsap.from('.review-card', { y: 40, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out', scrollTrigger: { trigger: '.review-grid', start: 'top 80%' } });

  // Contact
  gsap.from('.contact-info', { x: -30, opacity: 0, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: '.contact', start: 'top 75%' } });
  gsap.from('.contact-form-wrap', { x: 30, opacity: 0, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: '.contact', start: 'top 75%' } });

  // ===== FORM =====
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      if (!name || !phone) { formStatus.textContent = 'Please fill in your name and phone number.'; formStatus.className = 'form-status error'; return; }
      formStatus.textContent = 'Sending...'; formStatus.className = 'form-status';
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(r => { if (r.ok) { formStatus.textContent = "Thank you! We'll be in touch soon."; formStatus.className = 'form-status success'; form.reset(); } else throw new Error(); })
        .catch(() => { formStatus.textContent = 'Something went wrong. Please call us directly.'; formStatus.className = 'form-status error'; });
    });
  }

  // ===== MOBILE CALL BAR =====
  const callBar = document.getElementById('callBar');
  if (callBar) {
    let callBarVisible = false;
    window.addEventListener('scroll', () => {
      const heroH = document.querySelector('.hero').offsetHeight;
      const show = window.pageYOffset > heroH * 0.8;
      if (show !== callBarVisible) { callBar.style.transform = show ? 'translateY(0)' : 'translateY(100%)'; callBarVisible = show; }
    }, { passive: true });
  }

})();
