/**
 * @fileoverview This file initializes the game's level, including enemies, background objects, and items.
 */

const backgroundObject = [];

/**
 * The width of the game world.
 */
const width = 720;

/**
 * Layers for the background.
 */
const layers = ["5. Water", "4. Fondo 2", "3. Fondo 1", "1. Light", "2. Floor"];

/**
 * Number of times the background should repeat.
 */
const repeaterAmount = 8;

const topBorder = 90;
const bottomBorder = 420;
let level1;

/**
 * Generates a random Y-coordinate between topBorder and bottomBorder.
 * @returns {number} A random Y-coordinate between topBorder and bottomBorder.
 */
function randomY() {
  return Math.random() * (bottomBorder - topBorder + 1) + topBorder;
}

/**
 * Generates a random X-coordinate between 1000 and 1500.
 * @returns {number} A random Y-coordinate between topBorder and bottomBorder.
 */
function randomX() {
  return 1000 + Math.random() * 600;
}

/**
 * Generates a random speed Values between 0.1 and 1.
 * @returns {number} A random Y-coordinate between topBorder and bottomBorder.
 */
function randomSpeed() {
  return 0.1 + Math.random() * 0.9;
}

/**
 * Returns an array of HeartItem objects if heartItems is true.
 * @returns {HeartItem[]} - Array of HeartItem objects or an empty array.
 */
function showHeartItems() {
  if (heartItems)
    return [new HeartItem(1200, 290), new HeartItem(2200, 200), new HeartItem(4000, 300)];
  return [];
}

function initLevel() {
  level1 = new Level(
    [
      new PufferFish("GREEN", 1, randomX(), randomY(), randomSpeed()),
      new PufferFish("RED", 3, randomX(), randomY(), randomSpeed()),
      new PufferFish("GREEN", 1, randomX(), randomY(), randomSpeed()),
      new PufferFish("RED", 3, randomX(), randomY(), randomSpeed()),
      new PufferFish("ORANGE", 2, randomX(), randomY(), randomSpeed()),
      new PufferFish("ORANGE", 2, randomX(), randomY(), randomSpeed()),
      new PufferFish("RED", 3, randomX(), randomY(), randomSpeed()),
      new PufferFish("GREEN", 1, randomX(), randomY(), randomSpeed()),
      new PufferFish("ORANGE", 1, randomX(), randomY(), randomSpeed()),
      new PufferFish("ORANGE", 1, randomX(), randomY(), randomSpeed()),
      new PufferFish("GREEN", 1, randomX(), randomY(), randomSpeed()),
      new PufferFish("RED", 1, randomX(), randomY(), randomSpeed()),
      new PufferFish("RED", 1, randomX(), randomY(), randomSpeed()),
      new PufferFish("GREEN", 1, randomX(), randomY(), randomSpeed()),
      new PufferFish("RED", 1, randomX(), randomY(), randomSpeed()),
      new PufferFish("GREEN", 1, randomX(), randomY(), randomSpeed()),
      new PufferFish("ORANGE", 1, randomX(), randomY(), randomSpeed()),

      new PufferFish("ORANGE", 3, 3500, 90, 0.2),
      new PufferFish("GREEN", 1, 3520, 127, 0.2),
      new PufferFish("RED", 3, 3540, 163, 0.2),
      new PufferFish("GREEN", 1, 3560, 200, 0.2),
      new PufferFish("RED", 3, 3580, 238, 0.2),
      new PufferFish("GREEN", 1, 3600, 275, 0.2),
      new PufferFish("RED", 3, 3620, 312, 0.2),
      new PufferFish("ORANGE", 3, 3640, 348, 0.2),
      new PufferFish("RED", 3, 3660, 385, 0.2),
      new PufferFish("GREEN", 1, 3680, 420, 0.2),

      new PufferFish("RED", 3, 3860, 90, 0.2),
      new PufferFish("GREEN", 1, 3840, 127, 0.2),
      new PufferFish("ORANGE", 3, 3820, 163, 0.2),
      new PufferFish("GREEN", 1, 3800, 200, 0.2),
      new PufferFish("RED", 3, 3780, 238, 0.2),
      new PufferFish("GREEN", 1, 3760, 275, 0.2),
      new PufferFish("ORANGE", 3, 3740, 312, 0.2),
      new PufferFish("RED", 3, 3720, 348, 0.2),
      new PufferFish("ORANGE", 1, 3700, 385, 0.2),

      new PufferFish("GREEN", 1, 4280, 90, 0.2),
      new PufferFish("RED", 3, 4260, 127, 0.2),
      new PufferFish("ORANGE", 1, 4240, 163, 0.2),
      new PufferFish("RED", 3, 4220, 200, 0.2),
      new PufferFish("ORANGE", 1, 4200, 238, 0.2),
      new PufferFish("GREEN", 3, 4180, 275, 0.2),
      new PufferFish("GREEN", 3, 4160, 312, 0.2),
      new PufferFish("RED", 3, 4140, 348, 0.2),
      new PufferFish("ORANGE", 1, 4120, 385, 0.2),

      new PufferFish("GREEN", 1, 4460, 420, 0.2),
      new PufferFish("RED", 3, 4440, 385, 0.2),
      new PufferFish("ORANGE", 1, 4420, 348, 0.2),
      new PufferFish("RED", 3, 4400, 312, 0.2),
      new PufferFish("GREEN", 1, 4380, 275, 0.2),
      new PufferFish("ORANGE", 3, 4360, 238, 0.2),
      new PufferFish("RED", 3, 4340, 200, 0.2),
      new PufferFish("ORANGE", 3, 4320, 163, 0.2),
      new PufferFish("ORANGE", 3, 4300, 127, 0.2),
    ],

    [
      new JellyRegular("YELLOW", 1, 2000, 240, 45, 160),
      new JellyRegular("YELLOW", 1, 2000, 240, 90, 160),
      new JellyRegular("YELLOW", 1, 2000, 240, 135, 160),
      new JellyRegular("YELLOW", 1, 2000, 240, 180, 160),
      new JellyRegular("YELLOW", 1, 2000, 240, 225, 160),
      new JellyRegular("YELLOW", 1, 2000, 240, 270, 160),
      new JellyRegular("YELLOW", 1, 2000, 240, 315, 160),
      new JellyRegular("YELLOW", 1, 2000, 240, 360, 160),
      new JellyRegular("LILA", 1, 2000, 240, 45, 100),
      new JellyRegular("LILA", 1, 2000, 240, 90, 100),
      new JellyRegular("LILA", 1, 2000, 240, 135, 100),
      new JellyRegular("LILA", 1, 2000, 240, 180, 100),
      new JellyRegular("LILA", 1, 2000, 240, 225, 100),
      new JellyRegular("LILA", 1, 2000, 240, 270, 100),
      new JellyRegular("LILA", 1, 2000, 240, 315, 100),
      new JellyRegular("LILA", 1, 2000, 240, 360, 100),
    ],
    [
      new JellyDangerous("GREEN", 1, 2300, 90, 0, false, false),
      new JellyDangerous("PINK", 1, 2300, 168, 0.2, true, false),
      new JellyDangerous("GREEN", 1, 2300, 252, 0.2, true, false),
      new JellyDangerous("GREEN", 1, 2300, 336, 0.2, true, false),
      new JellyDangerous("PINK", 1, 2300, 420, 0, false, false),

      new JellyDangerous("PINK", 1, 3680, 100, 0.2, true, true),
      new JellyDangerous("PINK", 1, 3680, 200, 0.2, true, true),
      new JellyDangerous("PINK", 1, 3680, 300, 0.2, true, true),

      new JellyDangerous("PINK", 1, 4040, 90, 0.2, false, true),
      new JellyDangerous("PINK", 1, 3990, 90, 0.2, false, true),
      new JellyDangerous("PINK", 1, 3990, 190, 0.2, false, true),
      new JellyDangerous("PINK", 1, 3990, 300, 0.2, false, true),
      new JellyDangerous("PINK", 1, 3990, 400, 0.2, false, true),
      new JellyDangerous("PINK", 1, 4040, 400, 0.2, false, true),

      new JellyDangerous("PINK", 1, 4280, 200, 0.2, true, true),
      new JellyDangerous("PINK", 1, 4280, 300, 0.2, true, true),
      new JellyDangerous("PINK", 1, 4280, 400, 0.2, true, true),
    ],
    new Endboss(5000),
    backgroundObject,
    new Border(-280),
    new Border(5500),
    [
      new PoisonItem("swimming", 1200, 90),
      new PoisonItem("swimming", 1995, 230),
      new PoisonItem("swimming", 4500, 180),
      new PoisonItem("swimming", 3800, 224),
      new PoisonItem("ground", 200, 410),
      new PoisonItem("ground", 500, 400),
      new PoisonItem("ground", 2800, 360),
      new PoisonItem("ground", 1000, 360),
      new PoisonItem("ground", 4000, 380),
      new PoisonItem("ground", 4200, 360),
      new PoisonItem("ground", 4600, 390),
    ],
    showHeartItems()
  );
}

repeatBackground();

/**
 * Initializes the repeating background objects.
 */
function repeatBackground() {
  const factorList = generateList(repeaterAmount);
  layers.forEach((layer) => {
    const basePath = `img/3. Background/Layers/${layer}/`;
    factorList.factor.forEach((factor, idx) => {
      pushBackgroundLayers(basePath, factor, factorList.img[idx]);
    });
  });
}

/**
 * Adds a background object to the backgroundObject array.
 * @param {string} basePath - The base path to the image.
 * @param {number} factor - The factor by which the object is shifted.
 * @param {number} imgNumber - The number of the image.
 */
function pushBackgroundLayers(basePath, factor, imgNumber) {
  const obj = new BackgroundObject(basePath + `D${imgNumber}.png`, (width - 1) * factor);
  backgroundObject.push(obj);
}

/**
 * Generates a list of numbers from -1 up to the specified maximum value.
 * This list contains the factors to evaluate the position on the x-axis at which the image should be repeated.
 * @param {number} maxValue - The maximum value for the list.
 * @returns {Array} - A list of numbers from -1 up to the maximum value.
 */
function generateList(repeaterAmount) {
  const list = {
    factor: [],
    img: [],
  };
  for (let i = -1; i < repeaterAmount + 1; i++) {
    list.factor.push(i);
    if (isOdd(i)) list.img.push(2);
    else list.img.push(1);
  }
  return list;
}

/**
 * Checks whether a number is odd.
 * This function is used to determine which image number to choose for repetition.
 * @param {number} number - The number to check.
 * @returns {boolean} - true if the number is odd, false otherwise.
 */
function isOdd(number) {
  if (number === 0) return false;
  return number % 2 !== 0;
}
