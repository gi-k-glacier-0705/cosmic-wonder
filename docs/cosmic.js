/* =========================================================
   COSMIC WONDER
   Observatory Foundation
   ========================================================= */

"use strict";


/* =========================================================
   COSMIC OBSERVATIONS
   ========================================================= */

const COSMIC_OBSERVATIONS = [
  {
    category: "GRAVITY",
    title: "Gravity Has Been Working Overtime",
    text:
      "Gravity has been holding everything together for billions of years. Nobody has given it a performance review."
  },

  {
    category: "TIME",
    title: "Time Keeps Moving",
    text:
      "Every moment becomes history immediately. Time is apparently the least sentimental archivist imaginable."
  },

  {
    category: "NEUROSCIENCE",
    title: "Your Brain Is Doing Its Best",
    text:
      "Your nervous system evolved in environments where 'something moved in the bushes' was a perfectly reasonable emergency."
  },

  {
    category: "HUMANITY",
    title: "We Invented Paperwork",
    text:
      "Humans became technologically sophisticated enough to leave Earth and somehow decided we still needed seventeen forms."
  },

  {
    category: "QUANTUM",
    title: "The Universe Declined To Be Intuitive",
    text:
      "At very small scales, nature behaves in ways that make ordinary human intuition look like a charming historical artifact."
  },

  {
    category: "EVOLUTION",
    title: "Natural Selection Has No HR Department",
    text:
      "Evolution does not optimize for elegance, fairness, or good user experience. It mostly keeps whatever works long enough to reproduce."
  },

  {
    category: "COSMOS",
    title: "We Are Made of Ancient Stars",
    text:
      "Many of the elements that make up your body were forged in stars. You are, among other things, recycled astrophysics."
  },

  {
    category: "PHILOSOPHY",
    title: "The Universe Does Not Owe Us Simplicity",
    text:
      "Reality is under no obligation to fit neatly inside the categories human beings invented for discussing it."
  },

  {
    category: "ZEN",
    title: "The River Has Excellent Project Management",
    text:
      "The river does not hold a meeting about whether it should flow downhill. It simply encounters the terrain and keeps going."
  },

  {
    category: "WU WEI",
    title: "Effort Is Not Always Progress",
    text:
      "Sometimes the most efficient response to a complicated situation is to stop adding complicated responses."
  },

  {
    category: "BUREAUCRACY",
    title: "Please Remain Calm",
    text:
      "The form is currently unavailable because the system requires the form that requests access to the form."
  },

  {
    category: "PERSPECTIVE",
    title: "Scale Is A Strange Thing",
    text:
      "A human lifetime can feel enormous from inside it and remarkably brief on geological or cosmological timescales. Both perspectives are real."
  },

  {
    category: "UNCERTAINTY",
    title: "Not Knowing Is Information",
    text:
      "Sometimes the most scientifically honest answer is 'we don't know yet.' The universe has survived this admission remarkably well."
  },

  {
    category: "CONSCIOUSNESS",
    title: "The Brain Is Studying Itself",
    text:
      "Human brains are attempting to understand consciousness using the very machinery whose consciousness they are attempting to understand."
  },

  {
    category: "COSMIC ABSURDITY",
    title: "We Are Extremely Small",
    text:
      "The observable universe is enormous. We are tiny. We have nevertheless developed strong opinions about parking."
  }
];


/* =========================================================
   APPLICATION STATE
   ========================================================= */

const CosmicState = {
  observationIndex: -1,
  touchStartX: 0,
  touchStartY: 0,
  reducedMotion: false
};


/* =========================================================
   DOM HELPERS
   ========================================================= */

function getElement(selector) {
  return document.querySelector(selector);
}

function getElements(selector) {
  return Array.from(document.querySelectorAll(selector));
}


/* =========================================================
   REDUCED MOTION
   ========================================================= */

function detectReducedMotion() {
  if (!window.matchMedia) {
    return false;
  }

  return window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
}


/* =========================================================
   COSMIC OBSERVATION ENGINE
   ========================================================= */

function getNextObservation() {
  const total = COSMIC_OBSERVATIONS.length;

  if (total === 0) {
    return null;
  }

  let nextIndex;

  /*
   * Avoid immediately repeating the same observation.
   */

  do {
    nextIndex = Math.floor(Math.random() * total);
  } while (
    total > 1 &&
    nextIndex === CosmicState.observationIndex
  );

  CosmicState.observationIndex = nextIndex;

  return COSMIC_OBSERVATIONS[nextIndex];
}


function renderObservation(observation, animate = true) {
  if (!observation) {
    return;
  }

  const category = getElement("[data-observation-category]");
  const title = getElement("[data-observation-title]");
  const text = getElement("[data-observation-text]");

  if (!category || !title || !text) {
    return;
  }

  /*
   * Respect reduced-motion preferences.
   */

  const shouldAnimate =
    animate &&
    !CosmicState.reducedMotion;

  if (shouldAnimate) {
    category.classList.add("observation-changing");
    title.classList.add("observation-changing");
    text.classList.add("observation-changing");
  }

  category.textContent = observation.category;
  title.textContent = observation.title;
  text.textContent = observation.text;

  if (shouldAnimate) {
    window.setTimeout(() => {
      category.classList.remove("observation-changing");
      title.classList.remove("observation-changing");
      text.classList.remove("observation-changing");
    }, 300);
  }
}


function showNextObservation() {
  const observation = getNextObservation();

  renderObservation(observation);
}


/* =========================================================
   OBSERVATION BUTTON
   ========================================================= */

function initializeObservationEngine() {
  const button = getElement("[data-new-observation]");

  if (!button) {
    return;
  }

  button.addEventListener("click", () => {
    showNextObservation();
  });

  /*
   * Initial observation.
   */

  showNextObservation();
}


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

function initializeNavigation() {
  const navigationLinks = getElements(
    "[data-cosmic-nav]"
  );

  if (navigationLinks.length === 0) {
    return;
  }

  const currentPath =
    window.location.pathname
      .replace(/\/+$/, "")
      .split("/")
      .pop() || "index.html";

  navigationLinks.forEach((link) => {
    const href = link.getAttribute("href");

    if (!href) {
      return;
    }

    const linkPath =
      href
        .split("#")[0]
        .replace(/\/+$/, "")
        .split("/")
        .pop() || "index.html";

    if (
      linkPath === currentPath ||
      (
        currentPath === "index.html" &&
        linkPath === ""
      )
    ) {
      link.setAttribute(
        "aria-current",
        "page"
      );
    }
  });
}


/* =========================================================
   SMOOTH INTERNAL NAVIGATION
   ========================================================= */

function initializeSmoothNavigation() {
  const links = getElements(
    'a[href^="#"]'
  );

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId =
        link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior:
          CosmicState.reducedMotion
            ? "auto"
            : "smooth",
        block: "start"
      });

      /*
       * Update URL without forcing a page reload.
       */

      if (
        window.history &&
        window.history.pushState
      ) {
        window.history.pushState(
          null,
          "",
          targetId
        );
      }
    });
  });
}


/* =========================================================
   ORBITAL POINTER RESPONSE
   ========================================================= */

function initializeOrbitalInteraction() {
  const orbit =
    getElement("[data-cosmic-orbit]");

  if (!orbit || CosmicState.reducedMotion) {
    return;
  }

  /*
   * Only activate pointer-based movement on
   * devices that actually have a fine pointer.
   */

  const finePointer =
    window.matchMedia &&
    window.matchMedia(
      "(pointer: fine)"
    ).matches;

  if (!finePointer) {
    return;
  }

  let framePending = false;

  document.addEventListener(
    "pointermove",
    (event) => {
      if (framePending) {
        return;
      }

      framePending = true;

      window.requestAnimationFrame(() => {
        const x =
          (event.clientX / window.innerWidth) -
          0.5;

        const y =
          (event.clientY / window.innerHeight) -
          0.5;

        orbit.style.transform =
          `translate3d(
            ${x * 18}px,
            ${y * 18}px,
            0
          )`;

        framePending = false;
      });
    }
  );
}


/* =========================================================
   STAR FIELD
   ========================================================= */

function initializeStarField() {
  const canvas =
    getElement("[data-star-field]");

  if (!canvas || CosmicState.reducedMotion) {
    return;
  }

  const context =
    canvas.getContext("2d");

  if (!context) {
    return;
  }

  const stars = [];

  let width = 0;
  let height = 0;
  let animationFrame = null;

  function resize() {
    const pixelRatio =
      Math.min(
        window.devicePixelRatio || 1,
        2
      );

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width =
      width * pixelRatio;

    canvas.height =
      height * pixelRatio;

    canvas.style.width =
      `${width}px`;

    canvas.style.height =
      `${height}px`;

    context.setTransform(
      pixelRatio,
      0,
      0,
      pixelRatio,
      0,
      0
    );

    createStars();
  }


  function createStars() {
    stars.length = 0;

    /*
     * Keep the density deliberately low.
     * This should feel like atmosphere,
     * not a screensaver.
     */

    const count =
      Math.min(
        110,
        Math.max(
          45,
          Math.floor(
            (width * height) /
            14000
          )
        )
      );

    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius:
          Math.random() * 1.1 + 0.25,
        opacity:
          Math.random() * 0.5 + 0.15,
        drift:
          Math.random() * 0.12 + 0.02,
        phase:
          Math.random() * Math.PI * 2
      });
    }
  }


  function draw(time) {
    context.clearRect(
      0,
      0,
      width,
      height
    );

    stars.forEach((star) => {
      const pulse =
        Math.sin(
          time * star.drift +
          star.phase
        );

      const opacity =
        Math.max(
          0.05,
          star.opacity +
          pulse * 0.08
        );

      context.beginPath();

      context.arc(
        star.x,
        star.y,
        star.radius,
        0,
        Math.PI * 2
      );

      context.fillStyle =
        `rgba(
          255,
          248,
          220,
          ${opacity}
        )`;

      context.fill();
    });

    animationFrame =
      window.requestAnimationFrame(draw);
  }


  window.addEventListener(
    "resize",
    resize,
    { passive: true }
  );

  resize();

  animationFrame =
    window.requestAnimationFrame(draw);


  /*
   * Stop animation if the page becomes hidden.
   * This matters on mobile.
   */

  document.addEventListener(
    "visibilitychange",
    () => {
      if (
        document.hidden &&
        animationFrame
      ) {
        window.cancelAnimationFrame(
          animationFrame
        );

        animationFrame = null;

        return;
      }

      if (
        !document.hidden &&
        !animationFrame
      ) {
        animationFrame =
          window.requestAnimationFrame(
            draw
          );
      }
    }
  );
}


/* =========================================================
   TOUCH / SWIPE FOUNDATION
   ========================================================= */

function initializeTouchGestures() {
  const swipeTargets =
    getElements(
      "[data-swipeable]"
    );

  if (swipeTargets.length === 0) {
    return;
  }

  swipeTargets.forEach((element) => {
    element.addEventListener(
      "touchstart",
      (event) => {
        const touch =
          event.changedTouches[0];

        CosmicState.touchStartX =
          touch.clientX;

        CosmicState.touchStartY =
          touch.clientY;
      },
      { passive: true }
    );


    element.addEventListener(
      "touchend",
      (event) => {
        const touch =
          event.changedTouches[0];

        const deltaX =
          touch.clientX -
          CosmicState.touchStartX;

        const deltaY =
          touch.clientY -
          CosmicState.touchStartY;

        /*
         * Ignore primarily vertical gestures.
         */

        if (
          Math.abs(deltaX) <
          Math.abs(deltaY)
        ) {
          return;
        }

        /*
         * Ignore tiny movements.
         */

        if (
          Math.abs(deltaX) < 50
        ) {
          return;
        }

        const direction =
          deltaX < 0
            ? "left"
            : "right";

        element.dispatchEvent(
          new CustomEvent(
            "cosmic-swipe",
            {
              bubbles: true,
              detail: {
                direction
              }
            }
          )
        );
      },
      { passive: true }
    );
  });
}


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

function initializeMobileNavigation() {
  const nav =
    getElement(
      ".cosmic-mobile-nav"
    );

  if (!nav) {
    return;
  }

  /*
   * Give the browser a hint that this fixed
   * navigation is intentionally interactive.
   */

  nav.setAttribute(
    "aria-label",
    "Cosmic Wonder navigation"
  );
}


/* =========================================================
   OBSERVATION TEXT ANIMATION
   ========================================================= */

function initializeObservationStyles() {
  const styleId =
    "cosmic-observation-motion";

  if (
    document.getElementById(styleId)
  ) {
    return;
  }

  const style =
    document.createElement("style");

  style.id = styleId;

  style.textContent = `
    .observation-changing {
      animation:
        cosmicObservationIn
        300ms
        cubic-bezier(0.22, 1, 0.36, 1);
    }

    @keyframes cosmicObservationIn {
      from {
        opacity: 0;
        transform: translateY(0.35rem);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .observation-changing {
        animation: none;
      }
    }
  `;

  document.head.appendChild(style);
}


/* =========================================================
   ERROR-SAFE INITIALIZATION
   ========================================================= */

function initializeCosmicWonder() {
  CosmicState.reducedMotion =
    detectReducedMotion();

  initializeObservationStyles();
  initializeObservationEngine();
  initializeNavigation();
  initializeSmoothNavigation();
  initializeOrbitalInteraction();
  initializeStarField();
  initializeTouchGestures();
  initializeMobileNavigation();
}


/* =========================================================
   START
   ========================================================= */

if (
  document.readyState ===
  "loading"
) {
  document.addEventListener(
    "DOMContentLoaded",
    initializeCosmicWonder,
    { once: true }
  );
} else {
  initializeCosmicWonder();
}
