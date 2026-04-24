/* =============================================
   MAIN.JS
   Handles three main behaviors:
   1. Adds 'loaded' class to body after page
      loads to trigger hero animations
   2. Smooth scrolling for all internal links
   3. Scroll to top button visibility and click
   ============================================= */

/*
  Wait for the entire DOM to be fully loaded
  before running any JavaScript code.
  This prevents errors from trying to select
  elements that do not exist on the page yet.
*/
document.addEventListener('DOMContentLoaded', () => {


  /* -------------------------------------------
     PAGE LOAD CLASS
     Adds the 'loaded' class to the body element
     after the page has fully rendered.
     This class triggers the hero entry animations
     defined in css/animations.css.
     Using double requestAnimationFrame ensures
     the class is added after the first paint
     so animations are always visible and never
     skipped by the browser.
  ------------------------------------------- */

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {

      /*
        Adding 'loaded' to body triggers all the
        hero animation rules in animations.css
        that are scoped to body.loaded
      */
      document.body.classList.add('loaded');
    });
  });


  /* -------------------------------------------
     SMOOTH SCROLL FOR INTERNAL LINKS
     When a user clicks any link that starts
     with # (internal anchor link), instead of
     jumping instantly to that section, the page
     scrolls smoothly to it.
     We also account for the fixed navbar height
     so the section heading is not hidden behind
     the navbar after scrolling.
  ------------------------------------------- */

  /*
    Select all anchor links on the page that
    have an href starting with #
  */
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {

    link.addEventListener('click', (e) => {

      /*
        Get the href value of the clicked link
        for example "#about" or "#projects"
      */
      const href = link.getAttribute('href');

      /*
        Skip if the href is just "#" with nothing
        after it — these are placeholder links
        that should not scroll anywhere
      */
      if (href === '#') return;

      /*
        Try to find the target element on the page
        using the href as a CSS selector
      */
      const target = document.querySelector(href);

      /*
        Only proceed if the target element exists
      */
      if (target) {

        /*
          Prevent the default browser behavior
          of jumping instantly to the anchor
        */
        e.preventDefault();

        /*
          Get the height of the fixed navbar so
          we can offset the scroll position.
          This prevents the navbar from covering
          the top of the target section.
        */
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 80;

        /*
          Calculate the exact scroll position:
          Distance from top of page to the target
          element minus the navbar height minus
          a small extra gap of 20px for breathing room
        */
        const targetPosition =
          target.getBoundingClientRect().top +
          window.scrollY -
          navbarHeight -
          20;

        /*
          Scroll smoothly to the calculated position
        */
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });


  /* -------------------------------------------
     SCROLL TO TOP BUTTON
     A fixed button in the bottom right corner
     that appears after the user scrolls down
     more than 400px. Clicking it smoothly
     scrolls the page back to the very top.
  ------------------------------------------- */

  /*
    Select the scroll to top button by its ID
    set in index.html
  */
  const scrollTopBtn = document.getElementById('scroll-top');

  /*
    Only run this code if the button exists
    on the page
  */
  if (scrollTopBtn) {

    /* -------------------------------------------
       SHOW OR HIDE BUTTON ON SCROLL
       Listen for scroll events on the window.
       When the user has scrolled more than 400px
       from the top, add the 'visible' class to
       the button which makes it appear.
       When they scroll back up above 400px,
       remove the class to hide it again.
    ------------------------------------------- */

    window.addEventListener('scroll', () => {

      if (window.scrollY > 400) {

        /*
          Add visible class — CSS transitions
          the button into view with opacity
          and transform animation
        */
        scrollTopBtn.classList.add('visible');

      } else {

        /*
          Remove visible class — CSS transitions
          the button back out of view
        */
        scrollTopBtn.classList.remove('visible');
      }
    });


    /* -------------------------------------------
       SCROLL TO TOP ON BUTTON CLICK
       When the button is clicked, smoothly
       scroll the page back to the very top.
    ------------------------------------------- */

    scrollTopBtn.addEventListener('click', () => {

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }


  /* -------------------------------------------
     ACTIVE NAV LINK ON SCROLL
     Uses IntersectionObserver to watch all
     sections on the page. When a section
     enters the viewport, the matching navbar
     link gets the 'active' class added to it
     so users always know which section they
     are currently reading.
  ------------------------------------------- */

  /*
    Select all sections that have an ID
    These are the sections the navbar links
    point to
  */
  const sections = document.querySelectorAll('section[id]');

  /*
    Select all navbar links
  */
  const navLinks = document.querySelectorAll('.navbar__link');

  /*
    Create an observer that watches sections
    and fires when they enter or leave the
    visible area of the screen
  */
  const sectionObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          /*
            Get the ID of the section that just
            became visible in the viewport
          */
          const activeId = entry.target.getAttribute('id');

          /*
            Remove active class from all nav links
            before adding it to the correct one
          */
          navLinks.forEach((link) => {
            link.classList.remove('active');
          });

          /*
            Find the nav link whose href matches
            the currently visible section ID
            and add the active class to it
          */
          const activeLink = document.querySelector(
            `.navbar__link[href="#${activeId}"]`
          );

          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      });
    },
    {
      /*
        rootMargin pushes the trigger point so
        the active link updates slightly before
        the section fully enters the viewport.
        threshold 0.2 means 20% of the section
        must be visible before it is considered
        active.
      */
      rootMargin: '-80px 0px -60% 0px',
      threshold: 0.2,
    }
  );

  /*
    Start observing every section with an ID
  */
  sections.forEach((section) => {
    sectionObserver.observe(section);
  });


  /* -------------------------------------------
     CONTACT FORM BASIC VALIDATION
     Simple client side validation for the
     footer contact form. Shows a success
     message after submission for now.
     Django will handle actual form processing
     when the backend is connected later.
  ------------------------------------------- */

  const contactForm = document.getElementById('contact-form');

  if (contactForm) {

    contactForm.addEventListener('submit', (e) => {

      /*
        Prevent the default form submission
        which would reload the page.
        Django will handle real submission later.
      */
      e.preventDefault();

      /*
        Get the values from each form field
      */
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const message = document.getElementById('form-message').value.trim();

      /*
        Basic validation — check all fields
        have content before proceeding
      */
      if (!name || !email || !message) {

        /*
          If any field is empty, add a visible
          error style to the submit button
          temporarily to indicate the issue
        */
        const submitBtn = contactForm.querySelector('.footer__submit');
        submitBtn.textContent = 'Please fill all fields';
        submitBtn.style.background = '#c0392b';

        /*
          Reset the button text and color
          after 2.5 seconds
        */
        setTimeout(() => {
          submitBtn.textContent = 'Send Message';
          submitBtn.style.background = '';
        }, 2500);

        return;
      }

      /*
        If validation passes show a success
        message on the submit button
      */
      const submitBtn = contactForm.querySelector('.footer__submit');
      submitBtn.textContent = 'Message Sent ✓';
      submitBtn.style.background = '#2ecc71';
      submitBtn.disabled = true;

      /*
        Reset the form fields after success
      */
      contactForm.reset();

      /*
        Reset the button after 3 seconds
      */
      setTimeout(() => {
        submitBtn.textContent = 'Send Message';
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 3000);
    });
  }

});
/* End DOMContentLoaded */
