/* Dr. Vin Menon Website — Navbar Interactions */

document.addEventListener('DOMContentLoaded', () => {

  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.navbar__toggle');
  const navLinks = document.querySelector('.navbar__links');
  const allNavLinks = document.querySelectorAll('.navbar__link');

  // SCROLL BEHAVIOR
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  });

  // HAMBURGER TOGGLE
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('navbar__links--open');
    toggle.classList.toggle('navbar__toggle--open');

    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isExpanded));

    if (!isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  // CLOSE MENU ON LINK CLICK
  allNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('navbar__links--open');
      toggle.classList.remove('navbar__toggle--open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // CLOSE MENU ON OUTSIDE CLICK
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('navbar__links--open');
      toggle.classList.remove('navbar__toggle--open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // ACTIVE LINK ON SCROLL
  const sectionIDs = ['hero', 'about', 'highlights', 'projects', 'book', 'perspectives', 'gallery', 'site-footer'];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        allNavLinks.forEach((link) => link.classList.remove('active'));

        const activeLink = [...allNavLinks].find((link) =>
          link.getAttribute('href').includes(entry.target.id)
        );

        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sectionIDs.forEach((id) => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });

});
