let canvas;
let ctx;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas-id");
  world = new World(canvas, keyboard);
}

function handleKeyPress(e, isPressed) {
  if (e.key === "w" || e.key === "W") keyboard.UP = isPressed;
  if (e.key === "a" || e.key === "A") keyboard.LEFT = isPressed;
  if (e.key === "s" || e.key === "S") keyboard.DOWN = isPressed;
  if (e.key === "d" || e.key === "D") keyboard.RIGHT = isPressed;
}

document.addEventListener("keypress", (e) => {
  handleKeyPress(e, true);
});

document.addEventListener("keyup", (e) => {
  handleKeyPress(e, false);
});
