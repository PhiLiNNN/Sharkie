let canvas;
let ctx;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas-id");
  world = new World(canvas, keyboard);
}

function handleKeyPress(e, isPressed) {
  if (e.key === "w") keyboard.UP = isPressed;
  if (e.key === "a") keyboard.LEFT = isPressed;
  if (e.key === "s") keyboard.DOWN = isPressed;
  if (e.key === "d") keyboard.RIGHT = isPressed;
}

document.addEventListener("keypress", (e) => {
  handleKeyPress(e, true);
});

document.addEventListener("keyup", (e) => {
  handleKeyPress(e, false);
});
