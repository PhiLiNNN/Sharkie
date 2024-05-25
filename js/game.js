/**
 * @fileoverview This file handles the main game logic, including the game menu, audio, and game settings.
 */

/**
 * The main canvas element where the game is rendered.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * The 2D rendering context for the canvas.
 * @type {CanvasRenderingContext2D}
 */
let ctx;

/**
 * The main game world object.
 * @type {Object}
 */
let world;

/**
 * Array to store interval IDs for clearing intervals.
 * @type {number[]}
 */
let intervalIds = [];

/**
 * Boolean to track the pause state of the game.
 * @type {boolean}
 */
let pauseGame = false;

/**
 * Boolean to track the sound state of the game.
 * @type {boolean}
 */
let sound = true;

/**
 * Boolean to track the availability of heart items in the game.
 * @type {boolean}
 */
let heartItems = true;

/**
 * The difficulty level of the game.
 * @type {number}
 */
let characterEnergy = 100;

/**
 * The speed of dangerous shots in the game.
 * @type {number}
 */
let dangerousShotSpeed = 1.0;

/**
 * The speed of puffer shots in the game.
 * @type {number}
 */
let pufferShotSpeed = 1.0;

/**
 * Array of button objects used in the game menu.
 * @type {Object[]}
 * @property {string} id - The ID of the button element.
 * @property {string} img - The image source for the button when active.
 * @property {string} resetImg - The image source for the button when inactive.
 */
const buttons = [
  {
    id: "easy-id",
    img: "./img/6.Botones/GameMode/easy2_accept.png",
    resetImg: "./img/6.Botones/GameMode/easy2.png",
  },
  {
    id: "hard-id",
    img: "./img/6.Botones/GameMode/hard2_accept.png",
    resetImg: "./img/6.Botones/GameMode/hard2.png",
  },
  {
    id: "start-btn-id",
    img: "./img/6.Botones/Start/2_highlight.png",
    resetImg: "./img/6.Botones/Start/2.png",
  },
  {
    id: "difficulty-btn-id",
    img: "./img/6.Botones/Difficulty/2_highlight.png",
    resetImg: "./img/6.Botones/Difficulty/2.png",
  },
  {
    id: "instructions-id",
    img: "./img/6.Botones/Instructions/2_highlight.png",
    resetImg: "./img/6.Botones/Instructions/2.png",
  },
  {
    id: "close-btn-id",
    img: "./img/6.Botones/Close/2_highlight.png",
    resetImg: "./img/6.Botones/Close/2.png",
  },
  {
    id: "close-btn2-id",
    img: "./img/6.Botones/Close/2_highlight.png",
    resetImg: "./img/6.Botones/Close/2.png",
  },
  {
    id: "exit-game-btn-id",
    img: "img/6.Botones/ExitGame/2_highlight.png",
    resetImg: "img/6.Botones/ExitGame/2.png",
  },
  {
    id: "exit-gameAfterDead-btn-id",
    img: "img/6.Botones/ExitGame/2_highlight.png",
    resetImg: "img/6.Botones/ExitGame/2.png",
  },
  {
    id: "continue-btn-id",
    img: "./img/6.Botones/Continue/2_highlight.png",
    resetImg: "./img/6.Botones/Continue/2.png",
  },
  {
    id: "restart-id",
    img: "./img/6.Botones/Try again/Recurso 17_highlight.png",
    resetImg: "./img/6.Botones/Try again/Recurso 17.png",
  },
  {
    id: "back-to-menu-id",
    img: "./img/6.Botones/Back/2_highlight.png",
    resetImg: "./img/6.Botones/Back/2.png",
  },
  {
    id: "impressum-btn-id",
    img: "./img/6.Botones/Close/2_highlight.png",
    resetImg: "./img/6.Botones/Close/2.png",
  },
];

/**
 * Sets event listeners for buttons to handle interactions.
 */
function setBtsEventListener() {
  buttons.forEach((button) => {
    const element = document.getElementById(button.id);
    element.addEventListener("mousedown", () => (element.src = button.img));
    element.addEventListener("dragend", resetImages);
  });
  document.addEventListener("mouseup", resetImages);
  function resetImages() {
    buttons.forEach((button) => (document.getElementById(button.id).src = button.resetImg));
  }
}

/**
 * Opens the game menu and pauses the game.
 */
function openMenu() {
  muteAllSounds();
  stopSound(snore);
  toggleVisibility("start-btn-id", true);
  toggleVisibility("difficulty-btn-id", true);
  toggleVisibility("continue-btn-id", false);
  toggleVisibility("exit-game-btn-id", false);
  toggleVisibility("menu-id", false);
  toggleVisibility("touch-checkbox-id", true);
  pauseGame = true;
}

/**
 * Resumes the game from a paused state.
 */
function continueGame() {
  pauseGame = false;
  const pauseEl = document.getElementById("pause-menu-icon-id");
  pauseEl.src = "./img/6.Botones/OpenMenu/pause2.png";
  handlerSound(sound);
  toggleVisibility("menu-id", true);
}

/**
 * Opens the start menu of the game.
 */
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

/**
 * Starts the game by initializing the level and world, and closing the menu.
 */
function startGame() {
  canvas = document.getElementById("canvas-id");
  setBtsEventListener();
  handlerSound(sound);
  playSound(underwater, 0.4, true);
  stopSound(endboss_fight);
  toggleVisibility("pause-menu-icon-id", false);
  toggleVisibility("game-over-id", true);
  const pauseEl = document.getElementById("pause-menu-icon-id");
  pauseEl.src = "./img/6.Botones/OpenMenu/pause2.png";
  intervalIds.forEach(clearInterval);
  pauseGame = false;
  initLevel();
  closeMenu();
  world = new World(canvas);
}

/**
 * Displays the difficulty settings menu.
 */
function difficulty() {
  toggleVisibility("setting-popup-id", false);
}

/**
 * Displays the instructions menu.
 */
function instructions() {
  toggleVisibility("instructions-popup-id", false);
}

/**
 * Stops the event propagation.
 * @param {Event} event - The event to stop propagation for.
 */
function stopPropagation(event) {
  event.stopPropagation();
}

/**
 * Closes the difficulty settings menu.
 */
function closeDifficultySettings() {
  toggleVisibility("setting-popup-id", true);
}

/**
 * Closes the instructions menu.
 */
function closeInstructions() {
  toggleVisibility("instructions-popup-id", true);
}

/**
 * Sets the game difficulty settings.
 * @param {string} difficultyLevel - The difficulty level to set ("hard" or "easy").
 */
function difficultySettings(difficultyLevel) {
  if (difficultyLevel === "hard") {
    characterEnergy = 1;
    dangerousShotSpeed = 1.6;
    pufferShotSpeed = 2.0;
    heartItems = false;
  } else if (difficultyLevel === "easy") {
    characterEnergy = 100;
    dangerousShotSpeed = 1.0;
    pufferShotSpeed = 1.0;
    heartItems = true;
  }
  closeDifficultySettings();
}

/**
 * Toggles the mobile control panel based on the checkbox state.
 */
function turnOnMobilePanel() {
  const checkbox = document.getElementById("mobile-checkbox");
  checkbox.checked ? showMobileButtons() : hideMobileButtons();
}

/**
 * Shows the mobile control buttons.
 */
function showMobileButtons() {
  toggleVisibility("control-panel-id", false);
}

/**
 * Hides the mobile control buttons.
 */
function hideMobileButtons() {
  toggleVisibility("control-panel-id", true);
}

/**
 * Toggles the visibility of an HTML element.
 * @param {string} id - The ID of the element to toggle.
 * @param {boolean} show - Whether to show or hide the element.
 * @param {string} [classList="d-none"] - The class to toggle.
 */
function toggleVisibility(id, show, classList = "d-none") {
  let element = document.getElementById(id);
  show ? element.classList.add(classList) : element.classList.remove(classList);
}

/**
 * Closes the game menu.
 */
function closeMenu() {
  toggleVisibility("menu-id", true);
}

/**
 * Sets a stoppable interval.
 * @param {Function} fn - The function to execute at each interval.
 * @param {number} time - The interval time in milliseconds.
 */
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}

/**
 * Toggles the pause state of the game and updates the pause icon.
 */
function togglePauseGame() {
  pauseGame = !pauseGame;
  const pauseEl = document.getElementById("pause-menu-icon-id");
  if (pauseGame === true) pauseEl.src = "./img/6.Botones/OpenMenu/play2.png";
  else pauseEl.src = "./img/6.Botones/OpenMenu/pause2.png";
}

/**
 * Enters fullscreen mode for the game.
 */
function enterFullscreen() {
  let fullscreenElement = document.getElementById("fullscreen-id");
  toggleVisibility("fullscreen-icon-id", true);
  toggleVisibility("exit-fullscreen-icon-id", false);
  if (fullscreenElement.requestFullscreen) fullscreenElement.requestFullscreen();
  else if (fullscreenElement.msRequestFullscreen) fullscreenElement.msRequestFullscreen();
  else if (fullscreenElement.webkitRequestFullscreen) fullscreenElement.webkitRequestFullscreen();
}

/**
 * Exits fullscreen mode for the game.
 */
function exitFullScreen() {
  toggleVisibility("fullscreen-icon-id", false);
  toggleVisibility("exit-fullscreen-icon-id", true);
  if (document.exitFullscreen) document.exitFullscreen();
  else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
  else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  else if (document.msExitFullscreen) document.msExitFullscreen();
}

/**
 * Opens the Impressum by toggling the visibility of the Impressum element.
 */
function openImpressum() {
  toggleVisibility("impressum-id", false);
}

/**
 * Closes the Impressum by toggling the visibility of the Impressum element.
 */
function closeImpressum() {
  toggleVisibility("impressum-id", true);
}
