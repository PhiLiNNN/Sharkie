backgroundObject = [];
width = 720;
layers = ["5. Water", "4. Fondo 2", "3. Fondo 1", "1. Light", "2. Floor"];
repeaterAmount = 7; // change this number to set the length of the world
const level1 = new Level(
  [
    new PufferFish("GREEN", 1, 1000 + Math.random() * 250, 90 + Math.random() * 320),
    new PufferFish("RED", 3, 1000 + Math.random() * 250, 90 + Math.random() * 320),
    new PufferFish("GREEN", 1, 1000 + Math.random() * 250, 90 + Math.random() * 320),
    new PufferFish("RED", 3, 1000 + Math.random() * 250, 90 + Math.random() * 320),
    new PufferFish("ORANGE", 2, 1000 + Math.random() * 250, 90 + Math.random() * 320),
    new PufferFish("ORANGE", 2, 1000 + Math.random() * 250, 90 + Math.random() * 320),
    new PufferFish("RED", 3, 1000 + Math.random() * 250, 90 + Math.random() * 320),
    new PufferFish("GREEN", 1, 1000 + Math.random() * 250, 90 + Math.random() * 320),
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
    new JellyDangerous("GREEN", 1, 2300, 84),
    new JellyDangerous("PINK", 1, 2300, 168),
    new JellyDangerous("GREEN", 1, 2300, 252),
    new JellyDangerous("GREEN", 1, 2300, 336),
    new JellyDangerous("PINK", 1, 2300, 420),
  ],
  new Endboss(3600),
  backgroundObject,
  new Border(-280),
  new Border(4000),
  [
    new PoisonItem("swimming", 1995, 230),
    new PoisonItem("swimming", 1200, 90),
    new PoisonItem("swimming", 2500, 360),
    new PoisonItem("ground", 500, 400),
    new PoisonItem("ground", 1000, 360),
    new PoisonItem("ground", 200, 410),
    new PoisonItem("ground", 260, 380),
    new PoisonItem("ground", 320, 360),
    new PoisonItem("ground", 400, 390),
    new PoisonItem("ground", 280, 360),
  ],
  [new HeartItem(1200, 290), new HeartItem(2000, 100), new HeartItem(3000, 400)]
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
