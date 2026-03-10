// Mobile navigation toggle
(function () {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.site-nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close nav when a link is clicked
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close nav when clicking outside
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Mark active nav link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Smooth-scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Phone number auto-formatting: (954) 555-1234
  document.querySelectorAll('input[type="tel"]').forEach(function (input) {
    input.addEventListener('input', function () {
      var digits = this.value.replace(/\D/g, '').substring(0, 10);
      var formatted = '';
      if (digits.length > 0) formatted = '(' + digits.substring(0, 3);
      if (digits.length >= 3) formatted += ') ';
      if (digits.length > 3) formatted += digits.substring(3, 6);
      if (digits.length >= 6) formatted += '-' + digits.substring(6, 10);
      this.value = formatted;
    });
  });

  // Form submission handler (Formspree)
  const joinForm = document.getElementById('join-form');
  if (joinForm) {
    joinForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const btn = joinForm.querySelector('.btn-submit');
      btn.textContent = 'Submitting…';
      btn.disabled = true;

      try {
        const response = await fetch(joinForm.action, {
          method: 'POST',
          body: new FormData(joinForm),
          headers: { Accept: 'application/json' },
        });

        if (response.ok) {
          joinForm.innerHTML =
            '<div style="text-align:center;padding:32px 0;">' +
            '<p style="font-family:\'Playfair Display\',serif;font-size:1.4rem;color:#2D4A25;margin-bottom:10px;">Thank you for signing up!</p>' +
            '<p style="color:#4a4a4a;font-size:0.95rem;">We\'ll be in touch soon. Together, we\'ll Keep Cooper City Special.</p>' +
            '</div>';
        } else {
          btn.textContent = 'Try Again';
          btn.disabled = false;
          alert('There was a problem submitting. Please try again or email us directly.');
        }
      } catch (err) {
        btn.textContent = 'Try Again';
        btn.disabled = false;
        alert('There was a problem submitting. Please try again or email us directly.');
      }
    });
  }
})();
