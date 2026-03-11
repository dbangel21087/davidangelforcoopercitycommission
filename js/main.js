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

  // Form submission handler (Google Sheets)
  const FORM_URL = 'https://script.google.com/macros/s/AKfycby0Iw519bi1rv8oNB9e4o2ab45Ff6NrZAxU5aw1Uaei6FvXZcpuAenX6h9A3GmUNNe6QQ/exec';

  const joinForm = document.getElementById('join-form');
  if (joinForm) {
    joinForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const btn = joinForm.querySelector('.btn-submit');
      btn.textContent = 'Submitting…';
      btn.disabled = true;

      const fd = new FormData(joinForm);
      const data = {
        first_name:   fd.get('first_name')  || '',
        last_name:    fd.get('last_name')   || '',
        email:        fd.get('email')       || '',
        phone:        fd.get('phone')       || '',
        zip:          fd.get('zip')         || '',
        'interest[]': fd.getAll('interest[]')
      };

      try {
        await fetch(FORM_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        var card = joinForm.closest('.signup-card') || joinForm;
        card.innerHTML =
          '<div style="text-align:center;padding:48px 0;">' +
          '<p style="font-family:\'Playfair Display\',serif;font-size:1.6rem;color:#2D4A25;margin:0;">Thank you for signing up!</p>' +
          '</div>';
      } catch (err) {
        btn.textContent = 'Try Again';
        btn.disabled = false;
        alert('There was a problem submitting. Please try again or email us directly.');
      }
    });
  }
})();
