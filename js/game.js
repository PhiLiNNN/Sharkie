let canvas;
let ctx;
let world;
let intervalIds = [];
let pauseGame = false;
let sound = true;
let heartItems = true;
let gameDifficulty = 100;
let dangerousShotSpeed = 1.0;
let pufferShotSpeed = 1.0;

function init() {
  canvas = document.getElementById("canvas-id");
  const easyEl = document.getElementById("easy-id");
  const hardEl = document.getElementById("hard-id");
  easyEl.addEventListener("mousedown", () =>
    changeImage(easyEl, "./img/6.Botones/GameMode/easy2_accept.png")
  );
  hardEl.addEventListener("mousedown", () =>
    changeImage(hardEl, "./img/6.Botones/GameMode/hard2_accept.png")
  );
  document.addEventListener("mouseup", resetImages);
  easyEl.addEventListener("dragstart", () =>
    changeImage(easyEl, "./img/6.Botones/GameMode/easy2_accept.png")
  );
  easyEl.addEventListener("dragend", resetImages);
  hardEl.addEventListener("dragstart", () =>
    changeImage(hardEl, "./img/6.Botones/GameMode/hard2_accept.png")
  );
  hardEl.addEventListener("dragend", resetImages);
  function changeImage(element, src) {
    element.src = src;
  }
  function resetImages() {
    easyEl.src = "./img/6.Botones/GameMode/easy2.png";
    hardEl.src = "./img/6.Botones/GameMode/hard2.png";
  }
}

function openMenu() {
  muteAllSounds();
  toggleVisibility("start-btn-id", true);
  toggleVisibility("difficulty-btn-id", true);
  toggleVisibility("continue-btn-id", false);
  toggleVisibility("exit-game-btn-id", false);
  toggleVisibility("menu-id", false);
  toggleVisibility("touch-checkbox-id", true);
  pauseGame = true;
}

function continueGame() {
  pauseGame = false;
  handlerSound(sound);
  toggleVisibility("menu-id", true);
}
function openStartMenu() {
  toggleVisibility("start-btn-id", false);
  toggleVisibility("difficulty-btn-id", false);
  toggleVisibility("continue-btn-id", true);
  toggleVisibility("exit-game-btn-id", true);
  toggleVisibility("menu-id", false);
  toggleVisibility("game-over-id", true);
  toggleVisibility("touch-checkbox-id", false);
  toggleVisibility("you-win-id", true);
  toggleVisibility("you-win-id", false, "visible");
}

function startGame() {
  handlerSound(sound);
  playSound(underwater, 0.4, true);
  stopSound(endboss_fight);
  toggleVisibility("pause-menu-icon-id", false);
  toggleVisibility("game-over-id", true);
  intervalIds.forEach(clearInterval);
  pauseGame = false;
  initLevel();
  world = new World(canvas);
  closeMenu();
}

function difficulty() {
  toggleVisibility("setting-popup-id", false);
}
function instructions() {
  toggleVisibility("instructions-popup-id", false);
}

function stopPropagation(event) {
  event.stopPropagation();
}

function closeDifficultySettings() {
  toggleVisibility("setting-popup-id", true);
}
function closeInstructions() {
  toggleVisibility("instructions-popup-id", true);
}

function difficultySettings(difficultyLevel) {
  if (difficultyLevel === "hard") {
    gameDifficulty = 1;
    dangerousShotSpeed = 1.6;
    pufferShotSpeed = 2.0;
    heartItems = false;
  } else if (difficultyLevel === "easy") {
    gameDifficulty = 100;
    dangerousShotSpeed = 1.0;
    pufferShotSpeed = 1.0;
    heartItems = true;
  }
  closeDifficultySettings();
}

function turnOnMobilePanel() {
  const checkbox = document.getElementById("mobile-checkbox");
  checkbox.checked ? showMobileButtons() : hideMobileButtons();
}

function showMobileButtons() {
  toggleVisibility("control-panel-id", false);
}

function hideMobileButtons() {
  toggleVisibility("control-panel-id", true);
}

function toggleVisibility(id, show, classList = "d-none") {
  let element = document.getElementById(id);
  show ? element.classList.add(classList) : element.classList.remove(classList);
}

function closeMenu() {
  toggleVisibility("menu-id", true);
}

function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}

function togglePauseGame() {
  pauseGame = !pauseGame;
  const pauseEl = document.getElementById("pause-menu-icon-id");
  if (pauseGame === true) pauseEl.src = "./img/6.Botones/OpenMenu/play2.png";
  else pauseEl.src = "./img/6.Botones/OpenMenu/pause2.png";
}

function enterFullscreen() {
  let fullscreenElement = document.getElementById("fullscreen-id");
  toggleVisibility("fullscreen-icon-id", true);
  toggleVisibility("exit-fullscreen-icon-id", false);
  if (fullscreenElement.requestFullscreen) fullscreenElement.requestFullscreen();
  else if (fullscreenElement.msRequestFullscreen) fullscreenElement.msRequestFullscreen();
  else if (fullscreenElement.webkitRequestFullscreen) fullscreenElement.webkitRequestFullscreen();
}

function exitFullScreen() {
  toggleVisibility("fullscreen-icon-id", false);
  toggleVisibility("exit-fullscreen-icon-id", true);
  if (document.exitFullscreen) document.exitFullscreen();
  else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
  else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  else if (document.msExitFullscreen) document.msExitFullscreen();
}
