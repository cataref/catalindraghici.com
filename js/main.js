/* ============================================================
   CATALIN DRAGHICI — Site JavaScript
   Nav scroll, scroll animations, mobile menu
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Nav scroll effect ---
  const nav = document.querySelector('.nav');
  if (nav) {
    const handleScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // --- Mobile menu toggle ---
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  // --- Scroll fade-in animations ---
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(el => observer.observe(el));
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Active nav link highlighting ---
  const sections = document.querySelectorAll('section[id]');
  if (sections.length > 0) {
    const navLinks = document.querySelectorAll('.nav-links a');
    const highlightNav = () => {
      let current = '';
      sections.forEach(section => {
        const top = section.offsetTop - 120;
        if (window.scrollY >= top) current = section.getAttribute('id');
      });
      navLinks.forEach(link => {
        link.style.opacity = link.getAttribute('href') === `#${current}` ? '1' : '';
      });
    };
    window.addEventListener('scroll', highlightNav, { passive: true });
  }

});
