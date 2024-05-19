let canvas;
let ctx;
let world;
let intervalIds = [];
let keyboard = new Keyboard();
let pauseGame = false;
let onMobile = false;

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
}

function resumeGame() {
  pauseGame = false;
}

function clearIntervalIds() {
  intervalIds.forEach(clearInterval);
}

function startGame() {
  initLevel();
  world = new World(canvas, keyboard);
  canvas.addEventListener("touchstart", handleTouchStart);
  canvas.addEventListener("touchend", handleTouchEnd);
  setInterval(() => {
    window.innerHeight < 600 ? (onMobile = true) : (onMobile = false);
  }, 100);
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

function handleTouchStart(event) {
  event.preventDefault();
  const touch = event.touches[0];
  const touchX = touch.clientX - canvas.offsetLeft;
  const touchY = touch.clientY - canvas.offsetTop;
  checkButtonPress(touchX, touchY, true);
}

function handleTouchEnd(event) {
  event.preventDefault();
  keyboard.LEFT = false;
  keyboard.RIGHT = false;
  keyboard.UP = false;
  keyboard.DOWN = false;
  keyboard.PRIMARY = false;
  keyboard.SECONDARY = false;
}

function checkButtonPress(x, y, isPressed) {
  world.level.keys.forEach((button) => {
    if (isButtonTouched(button, x, y)) handleButtonAction(button, isPressed);
  });
}

function isButtonTouched(button, x, y) {
  return (
    x >= button.x && x <= button.x + button.width && y >= button.y && y <= button.y + button.height
  );
}

function handleButtonAction(button, isPressed) {
  if (onMobile) {
    switch (button) {
      case world.level.keys[0]:
        keyboard.LEFT = isPressed;
        break;
      case world.level.keys[1]:
        keyboard.RIGHT = isPressed;
        break;
      case world.level.keys[2]:
        keyboard.DOWN = isPressed;
        break;
      case world.level.keys[3]:
        keyboard.UP = isPressed;
        break;
      case world.level.keys[4]:
        keyboard.PRIMARY = isPressed;
        break;
      case world.level.keys[5]:
        keyboard.SECONDARY = isPressed;
        break;
    }
  }
}
