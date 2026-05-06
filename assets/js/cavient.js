/*
  Cavient Homepage Master JS
  Small, dependency-light interactions for all three templates.
*/

(function () {
  'use strict';

  // Fade-in animation for reusable page sections.
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  // Count-up stats. Keeps numbers editable through data-target attributes.
  const counters = document.querySelectorAll('[data-count]');
  let counted = false;

  function runCounter(counter) {
    const target = Number(counter.dataset.count || 0);
    const suffix = counter.dataset.suffix || '';
    const duration = 1100;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      counter.textContent = value.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  const statsCard = document.querySelector('.stats-card');
  if (statsCard && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !counted) {
          counters.forEach(runCounter);
          counted = true;
          counterObserver.disconnect();
        }
      });
    }, { threshold: 0.35 });
    counterObserver.observe(statsCard);
  } else {
    counters.forEach(runCounter);
  }

  // Close the mobile menu after selecting a link.
  const navLinks = document.querySelectorAll('.navbar-collapse .nav-link, .navbar-collapse .dropdown-item');
  const navCollapse = document.querySelector('.navbar-collapse');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navCollapse && navCollapse.classList.contains('show') && window.bootstrap) {
        const bsCollapse = window.bootstrap.Collapse.getOrCreateInstance(navCollapse);
        bsCollapse.hide();
      }
    });
  });
})();
