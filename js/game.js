let canvas;
let ctx;
let world;
let intervalIds = [];
let keyboard = new Keyboard();
let pauseGame = false;

function init() {
  canvas = document.getElementById("canvas-id");
}

function handleKeyPress(e, isPressed) {
  if (e.key === "w" || e.key === "W") keyboard.UP = isPressed;
  if (e.key === "a" || e.key === "A") keyboard.LEFT = isPressed;
  if (e.key === "s" || e.key === "S") keyboard.DOWN = isPressed;
  if (e.key === "d" || e.key === "D") keyboard.RIGHT = isPressed;
  if (e.key === "Escape") openPopup();
}

function openPopup() {
  pauseGame = true;
  console.log("test :>> ");
}
function pause() {
  pauseGame = false;
  // intervalIds.forEach(clearInterval);
}
function startGame() {
  initLevel();
  world = new World(canvas, keyboard);
}

function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}

document.addEventListener("keypress", (e) => {
  handleKeyPress(e, true);
});

document.addEventListener("keyup", (e) => {
  handleKeyPress(e, false);
});
