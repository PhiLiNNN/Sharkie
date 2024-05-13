backgroundObject = [];
width = 720;
layers = ["5. Water", "4. Fondo 2", "3. Fondo 1", "1. Light", "2. Floor"];
repeaterAmount = 4; // change this number to set the length of the world
const level1 = new Level(
  [
    new PufferFish("GREEN", 1),
    new PufferFish("RED", 3),
    new PufferFish("GREEN", 1),
    new PufferFish("RED", 3),
    new PufferFish("ORANGE", 2),
    new PufferFish("ORANGE", 2),
    new PufferFish("RED", 3),
    new PufferFish("GREEN", 1),
  ],
  [
    new JellyRegular("YELLOW", 1),
    new JellyRegular("LILA", 1),
    new JellyRegular("LILA", 1),
    new JellyRegular("YELLOW", 1),
    new JellyRegular("YELLOW", 1),
    new JellyRegular("LILA", 1),
  ],
  [
    new JellyDangerous("GREEN", 1),
    new JellyDangerous("PINK", 1),
    new JellyDangerous("GREEN", 1),
    new JellyDangerous("GREEN", 1),
    new JellyDangerous("PINK", 1),
  ],
  new Endboss(),
  backgroundObject,
  new Border(-280),
  new Border(2500)
);
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
