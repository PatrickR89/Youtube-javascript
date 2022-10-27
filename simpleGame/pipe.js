const holeHeigth = 200;
const pipeInterval = 1500;
const pipeSpeed = 0.75;
let pipes = [];
const pipeWidth = 100;
let timeSinceLastPipe = 0;
let passedPipesCount = 0;

export function updatePipes(delta) {
  timeSinceLastPipe += delta;

  if (timeSinceLastPipe > pipeInterval) {
    timeSinceLastPipe -= pipeInterval;
    createPipe();
  }

  pipes.forEach((pipe) => {
    if (pipe.left + pipeWidth < 0) {
      passedPipesCount++;
      return pipe.remove();
    }
    pipe.left = pipe.left - delta * pipeSpeed;
  });
}
export function getPassedPipesCount() {
  return passedPipesCount;
}

export function setupPipes() {
  document.documentElement.style.setProperty("--pipe-width", pipeWidth);
  document.documentElement.style.setProperty("--hole-height", holeHeigth);
  timeSinceLastPipe = pipeInterval;

  pipes.forEach((pipe) => {
    pipe.remove();
  });
}

export function getPipeRects() {
  return pipes.flatMap((pipe) => pipe.rects());
}

function createPipe() {
  const pipeElem = document.createElement("div");
  const topElem = createPipeSegment("top");
  const bottomElem = createPipeSegment("bottom");
  pipeElem.append(topElem);
  pipeElem.append(bottomElem);
  pipeElem.classList.add("pipe");
  pipeElem.style.setProperty(
    "--hole-top",
    randomNumberBetween(holeHeigth * 1.5, window.innerHeight - holeHeigth * 0.5)
  );
  const pipe = {
    get left() {
      return parseFloat(
        getComputedStyle(pipeElem).getPropertyValue("--pipe-left")
      );
    },
    set left(value) {
      pipeElem.style.setProperty("--pipe-left", value);
    },

    remove() {
      pipes = pipes.filter((p) => p !== pipe);
      pipeElem.remove();
    },
    rects() {
      return [
        topElem.getBoundingClientRect(),
        bottomElem.getBoundingClientRect()
      ];
    }
  };

  pipe.left = window.innerWidth;
  document.body.append(pipeElem);
  pipes.push(pipe);
}

function createPipeSegment(position) {
  const segment = document.createElement("div");
  segment.classList.add("segment", position);
  return segment;
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
