(() => {
  "use strict";

  const levels = [
    {
      eyebrow: "Level 01 / The immediate universe",
      title: "The astonishing fact of you",
      text: "Your body is a living observatory: sensing, repairing, adapting, remembering. Start here. Something probably needs a snack.",
      frame: "Human scale", distance: "01 — Local", objects: [["person", 1]],
      thought: "You do not need to understand the entire universe before making tea."
    },
    {
      eyebrow: "Level 02 / Our pale blue dot",
      title: "A world full of worlds",
      text: "Every person you have loved, every species we have yet to meet, every ordinary Tuesday you will never know about: all of it happens on this one improbable world.",
      frame: "Planetary scale", distance: "02 — 12,742 km", objects: [["earth", 170]],
      thought: "The ground beneath you is moving through space at a speed your senses politely leave out."
    },
    {
      eyebrow: "Level 03 / One star among many",
      title: "The neighborhood of a star",
      text: "Our Sun is one star among hundreds of billions in the Milky Way. Earth is a small world in its orbit, and yet it is where every human story we know has unfolded.",
      frame: "Stellar scale", distance: "03 — Solar system", objects: [["sun", 120], ["earth", 18]],
      thought: "A photon can cross the Sun-to-Earth distance in about eight minutes. Your inbox can wait."
    },
    {
      eyebrow: "Level 04 / The galactic address",
      title: "Not the center of the story",
      text: "The Milky Way is a vast, rotating city of stars. Our solar system lives far from its center, in one small neighborhood among an immense number of others.",
      frame: "Galactic scale", distance: "04 — Milky Way", objects: [["galaxy", 440], ["sun", 12]],
      thought: "Main-character energy: emotionally understandable. Astronomically, we are an ensemble cast."
    },
    {
      eyebrow: "Level 05 / The observable horizon",
      title: "The edge of what we can see",
      text: "The observable universe is the region whose light has had time to reach us. It is not necessarily all that exists. Our horizon is a limit on observation, not proof that reality ends there.",
      frame: "Cosmic scale", distance: "05 — Observable universe", objects: [["universe", 470], ["galaxy", 88], ["earth", 4]],
      thought: "The unknown is not a failure of knowledge. It is where curiosity gets room to breathe."
    }
  ];

  const scene = document.getElementById("scene");
  const buttons = Array.from(document.querySelectorAll(".step"));
  const eyebrow = document.getElementById("eyebrow");
  const title = document.getElementById("title");
  const text = document.getElementById("text");
  const zoomOut = document.getElementById("zoomOut");
  const randomThought = document.getElementById("randomThought");
  const frameLabel = document.getElementById("frameLabel");
  const distanceLabel = document.getElementById("distanceLabel");
  if (!scene || !eyebrow || !title || !text || !zoomOut || !randomThought || !buttons.length) return;

  let current = 0;

  function render() {
    const level = levels[current];
    eyebrow.textContent = level.eyebrow;
    title.textContent = level.title;
    text.textContent = level.text;
    frameLabel.textContent = level.frame;
    distanceLabel.textContent = level.distance;
    scene.dataset.level = String(current);

    scene.querySelectorAll(".orb, .art").forEach((node) => node.remove());
    level.objects.forEach(([kind, size]) => {
      const node = document.createElement("div");
      node.classList.add("orb", kind);
      node.style.setProperty("--size", size + "px");
      scene.appendChild(node);
    });

    buttons.forEach((button, index) => {
      const active = index === current;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      current = index;
      render();
    });
  });

  zoomOut.addEventListener("click", () => {
    current = (current + 1) % levels.length;
    render();
  });

  randomThought.addEventListener("click", () => {
    const thought = levels[Math.floor(Math.random() * levels.length)].thought;
    text.textContent = thought;
  });

  render();
})();