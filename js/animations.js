/* =============================================
   ANIMATIONS.JS
   Handles all scroll-triggered reveal animations
   using the IntersectionObserver API.
   No animation libraries used — pure vanilla JS.
   ============================================= */

/*
  Wait for the DOM to be fully loaded before
  running any JavaScript. This prevents errors
  from trying to select elements that do not
  exist yet on the page.
*/
document.addEventListener('DOMContentLoaded', () => {


  /* -------------------------------------------
     SCROLL REVEAL OBSERVER
     Watches all elements with class .reveal
     and adds class .revealed when they enter
     the visible area of the screen.
     Once revealed, the element is unobserved
     so it only animates once (not every time
     you scroll past it).
  ------------------------------------------- */

  /*
    IntersectionObserver options:
    threshold 0.15 means the animation triggers
    when 15% of the element is visible.
    rootMargin bottom -50px means it triggers
    slightly before the element fully enters
    the viewport for a smoother feel.
  */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {

        /*
          If the element is intersecting
          (visible in the viewport), add the
          revealed class which triggers the
          CSS transition defined in animations.css
        */
        if (entry.isIntersecting) {

          entry.target.classList.add('revealed');

          /*
            Stop watching this element after
            it has been revealed. This ensures
            the animation only plays once.
          */
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  /*
    Select all elements with the reveal class
    and start observing each one individually.
    The observer will watch them and trigger
    the animation when they become visible.
  */
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });


  /* -------------------------------------------
     STAGGERED CHILDREN REVEAL
     For groups of elements inside a
     .reveal-group container, each child
     gets an increasing animation delay so
     they appear one after another instead
     of all at once. This creates a more
     polished sequential entrance effect.
  ------------------------------------------- */

  /*
    Select all reveal-group containers
    and assign dynamic transition delays
    to each .reveal child inside them.
    Delay increases by 0.1s per child.
  */
  const revealGroups = document.querySelectorAll('.reveal-group');

  revealGroups.forEach((group) => {

    /*
      Get all direct .reveal children
      inside this group container
    */
    const children = group.querySelectorAll('.reveal');

    children.forEach((child, index) => {

      /*
        Set a CSS transition delay on each child
        based on its position in the group.
        First child: 0s delay
        Second child: 0.1s delay
        Third child: 0.2s delay and so on.
        This creates the staggered cascade effect.
      */
      child.style.transitionDelay = `${index * 0.1}s`;
    });
  });


  /* -------------------------------------------
     HIGHLIGHT ITEMS STAGGER
     The professional highlights timeline items
     get a slightly longer stagger delay of 0.15s
     between each item for a more dramatic
     sequential entrance effect.
  ------------------------------------------- */

  const highlightItems = document.querySelectorAll('.highlight__item');

  highlightItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.15}s`;
  });


  /* -------------------------------------------
     PROJECT BLOCKS STAGGER
     Each project block gets a small delay
     relative to its position so they do not
     all animate in at exactly the same time.
  ------------------------------------------- */

  const projectBlocks = document.querySelectorAll('.project__block');

  projectBlocks.forEach((block, index) => {
    block.style.transitionDelay = `${index * 0.1}s`;
  });


  /* -------------------------------------------
     POST CARDS STAGGER
     The three perspective post cards get
     a sequential stagger so they appear
     one after another left to right.
  ------------------------------------------- */

  const postCards = document.querySelectorAll('.post__card');

  postCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.12}s`;
  });


  /* -------------------------------------------
     GALLERY ITEMS STAGGER
     Gallery grid items get a very short stagger
     so the grid fills in progressively rather
     than all appearing at once.
  ------------------------------------------- */

  const galleryItems = document.querySelectorAll('.gallery__item');

  galleryItems.forEach((item, index) => {

    /*
      Keep the delay short (0.05s) because
      there are 10 items and a long stagger
      would make the last items feel too slow.
    */
    item.style.transitionDelay = `${index * 0.05}s`;
  });


  /* -------------------------------------------
     NAVBAR PARALLAX HINT
     Adds a very subtle parallax movement to
     the hero accent ring as the user scrolls.
     This adds depth to the hero section without
     using heavy animation libraries.
  ------------------------------------------- */

  const accentRing = document.querySelector('.hero__accent-ring');

  /*
    Only run if the accent ring exists
    (it is hidden on mobile so may not exist)
  */
  if (accentRing) {

    window.addEventListener('scroll', () => {

      /*
        Move the ring upward slightly as the
        user scrolls. Dividing scrollY by 6
        keeps the movement very subtle.
        requestAnimationFrame ensures the
        animation runs smoothly without
        causing layout thrashing.
      */
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        accentRing.style.transform =
          `translate(-50%, calc(-50% + ${scrolled / 6}px))`;
      });
    });
  }


  /* -------------------------------------------
     SECTION BACKGROUND PARALLAX
     Moves the decorative ::before radial
     gradient glows slightly as the user scrolls
     to give the page a subtle sense of depth.
     Applied only to the hero section glow.
  ------------------------------------------- */

  const hero = document.querySelector('#hero');

  if (hero) {

    window.addEventListener('scroll', () => {
      requestAnimationFrame(() => {

        /*
          Calculate how far the hero is from
          the top of the viewport
        */
        const rect = hero.getBoundingClientRect();

        /*
          Only animate while the hero is visible
          to avoid unnecessary calculations
        */
        if (rect.bottom > 0) {
          const progress = Math.abs(rect.top) / hero.offsetHeight;
          hero.style.setProperty(
            '--parallax-offset',
            `${progress * 40}px`
          );
        }
      });
    });
  }

});
/* End DOMContentLoaded */
