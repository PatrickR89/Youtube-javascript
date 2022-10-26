const birdElem = document.querySelector("[data-bird]");
const birdSpeed = 0.5;
const jumpDuration = 125;
var timeSinceLastJump = Number.POSITIVE_INFINITY;

export function setupBird() {
  setTop(window.innerHeight / 2);
  document.removeEventListener("keydown", handleJump);
  document.addEventListener("keydown", handleJump);
}

export function updateBird(delta) {
  if (timeSinceLastJump < jumpDuration) {
    setTop(getTop() - birdSpeed * delta);
  } else {
    setTop(getTop() + birdSpeed * delta);
  }

  timeSinceLastJump += delta;
}

function setTop(top) {
  birdElem.style.setProperty("--bird-top", top);
}

function getTop() {
  return parseFloat(getComputedStyle(birdElem).getPropertyValue("--bird-top"));
}

function handleJump(e) {
  if (e.code !== "Space") return;

  timeSinceLastJump = 0;
}