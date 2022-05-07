console.log("script started");

let activeCard = null;

Array.from(document.querySelectorAll(".glass-card-container")).forEach((c) => {
  console.debug("card");

  function handleHover(e) {
    c.querySelector(
      ".card-glow"
    ).style = `background-image: radial-gradient(circle at ${e.offsetX}px ${e.offsetY}px, rgba(255, 255, 255, 0.333), rgba(0, 0, 0, 0.06));`;

    if (c.classList.contains("card-center")) {
      return false;
    }
    const THRESHOLD = 15;
    const { clientX, clientY, currentTarget } = e;
    const { clientWidth, clientHeight, offsetLeft, offsetTop } = currentTarget;

    const horizontal = (clientX - offsetLeft) / clientWidth;
    const vertical = (clientY - offsetTop) / clientHeight;
    const rotateX = (THRESHOLD / 2 - horizontal * THRESHOLD).toFixed(2);
    const rotateY = (vertical * THRESHOLD - THRESHOLD / 2).toFixed(2);

    c.style.transitionDuration = "80ms";
    c.style.transform = `perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale3d(1.05, 1.05, 1.05)`;
  }

  c.addEventListener("mousemove", handleHover);
  c.addEventListener("mouseleave", (e) => {
    c.querySelector(
      ".card-glow"
    ).style = `background-image: radial-gradient(circle at -100% -100%, rgba(255, 255, 255, 0.333), rgba(0, 0, 0, 0.06));`;
    c.style.transform = "";
    c.style.transitionDuration = "150ms";
  });
  c.addEventListener("click", (e) => {
    activeCard = c;
    c.style.transitionDuration = "500ms";
    document.querySelector(".black-canvas").style.display = "block";
    c.classList.add("card-center");
    // c.style.animation = 'to-center 2.5s ease forwards'
  });
});

document.querySelector(".black-canvas").addEventListener("click", (e) => {
  activeCard.classList.remove("card-center");
  activeCard.style.transitionDuration = "";
  activeCard = null;
  document.querySelector(".black-canvas").style.display = "none";
});
