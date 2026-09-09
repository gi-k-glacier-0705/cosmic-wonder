(() => {
  "use strict";

  const levels = [
    { eyebrow:"Level 1 of 5", title:"The Immediate Universe", text:"Start here. Your nervous system is receiving signals, your body is doing an astonishing amount of maintenance without asking permission, and something probably needs a snack.", objects:[["earth",110]], thought:"You do not need to understand the entire universe before making tea." },
    { eyebrow:"Level 2 of 5", title:"A Small Blue Planet", text:"Earth is large enough to contain every person you have ever loved, every argument you have ever regretted, and approximately 8 billion simultaneous attempts at figuring things out.", objects:[["earth",110]], thought:"The planet has survived worse meetings than this one." },
    { eyebrow:"Level 3 of 5", title:"One Neighborhood Around One Star", text:"Our Sun is one ordinary star among hundreds of billions in the Milky Way. Yet here you are, having a very specific Tuesday.", objects:[["sun",220],["earth",24]], thought:"Somewhere, a photon has been traveling for millions of years and will arrive without needing to answer an email." },
    { eyebrow:"Level 4 of 5", title:"The Milky Way Is Not Center Stage", text:"Our galaxy contains hundreds of billions of stars and is itself one galaxy among an enormous cosmic population. Main-character energy: statistically unsupported, emotionally understandable.", objects:[["galaxy",520],["sun",32]], thought:"Perspective: the universe is huge. Also: your cat still expects dinner on time." },
    { eyebrow:"Level 5 of 5", title:"The Part We Can See", text:"The observable universe is limited by the speed of light and the age of the cosmos—not necessarily by the universe itself. Reality may be stranger than our field of view.", objects:[["universe",760],["galaxy",100],["earth",10]], thought:"The unknown is not a failure of knowledge. It is the frontier where curiosity gets to breathe." }
  ];

  let current = 0;
  const scene = document.getElementById("scene");
  const buttons = Array.from(document.querySelectorAll(".step"));
  const eyebrow = document.getElementById("eyebrow");
  const title = document.getElementById("title");
  const text = document.getElementById("text");
  const zoomOut = document.getElementById("zoomOut");
  const randomThought = document.getElementById("randomThought");

  if (!scene || !eyebrow || !title || !text || !zoomOut || !randomThought || !buttons.length) return;

  function render() {
    const d = levels[current];
    eyebrow.textContent = d.eyebrow;
    title.textContent = d.title;
    text.textContent = d.text;

    scene.replaceChildren();

    d.objects.forEach(([klass, size], i) => {
      const el = document.createElement("div");
      el.classList.add("orb", klass);
      el.style.setProperty("--size", size + "px");
      if (i > 0) {
        el.style.transform = "translate(" + (i * 38) + "px," + (i * 22) + "px)";
      }
      scene.appendChild(el);
    });

    buttons.forEach((button, i) => {
      button.classList.toggle("active", i === current);
    });
  }

  buttons.forEach((button, i) => {
    button.addEventListener("click", () => {
      current = i;
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