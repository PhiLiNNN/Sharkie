backgroundObject = [];
width = 720;
layers = ["5. Water", "4. Fondo 2", "3. Fondo 1", "1. Light", "2. Floor"];
repeaterAmount = 7; // change this number to set the length of the world
let y = 230;
let level1;

function showHeartItems() {
  if (heartItems)
    return [
      new HeartItem(1200, 290),
      new HeartItem(2200, 200),
      new HeartItem(3000, 400),
      new HeartItem(4000, 300),
    ];
  return [];
}

function initLevel() {
  level1 = new Level(
    [
      new PufferFish(
        "GREEN",
        1,
        1000 + Math.random() * 250,
        90 + Math.random() * 320,
        0.15 + Math.random() * 0.5
      ),
      new PufferFish(
        "RED",
        3,
        1000 + Math.random() * 250,
        90 + Math.random() * 320,
        0.15 + Math.random() * 0.5
      ),
      new PufferFish(
        "GREEN",
        1,
        1000 + Math.random() * 250,
        90 + Math.random() * 320,
        0.15 + Math.random() * 0.5
      ),
      new PufferFish(
        "RED",
        3,
        1000 + Math.random() * 250,
        90 + Math.random() * 320,
        0.15 + Math.random() * 0.5
      ),
      new PufferFish(
        "ORANGE",
        2,
        1000 + Math.random() * 250,
        90 + Math.random() * 320,
        0.15 + Math.random() * 0.5
      ),
      new PufferFish(
        "ORANGE",
        2,
        1000 + Math.random() * 250,
        90 + Math.random() * 320,
        0.15 + Math.random() * 0.5
      ),
      new PufferFish(
        "RED",
        3,
        1000 + Math.random() * 250,
        90 + Math.random() * 320,
        0.15 + Math.random() * 0.5
      ),
      new PufferFish(
        "GREEN",
        1,
        1000 + Math.random() * 250,
        90 + Math.random() * 320,
        0.15 + Math.random() * 0.5
      ),

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

      new PufferFish("RED", 3, 3880, 90, 0.2),
      new PufferFish("GREEN", 1, 3860, 127, 0.2),
      new PufferFish("ORANGE", 3, 3840, 163, 0.2),
      new PufferFish("GREEN", 1, 3820, 200, 0.2),
      new PufferFish("RED", 3, 3800, 238, 0.2),
      new PufferFish("GREEN", 1, 3780, 275, 0.2),
      new PufferFish("ORANGE", 3, 3760, 312, 0.2),
      new PufferFish("RED", 3, 3740, 348, 0.2),
      new PufferFish("ORANGE", 1, 3720, 385, 0.2),

      new PufferFish("GREEN", 1, 3920, 127, 0.2),
      new PufferFish("RED", 3, 3940, 163, 0.2),
      new PufferFish("ORANGE", 1, 3960, 200, 0.2),
      new PufferFish("RED", 3, 3980, 238, 0.2),
      new PufferFish("ORANGE", 1, 4000, 275, 0.2),
      new PufferFish("ORANGE", 3, 4020, 312, 0.2),
      new PufferFish("RED", 3, 4040, 348, 0.2),
      new PufferFish("RED", 3, 4060, 385, 0.2),
      new PufferFish("ORANGE", 1, 4080, 420, 0.2),

      new PufferFish("RED", 3, 4260, 90, 0.2),
      new PufferFish("GREEN", 1, 4240, 127, 0.2),
      new PufferFish("RED", 3, 4220, 163, 0.2),
      new PufferFish("ORANGE", 1, 4200, 200, 0.2),
      new PufferFish("RED", 3, 4180, 238, 0.2),
      new PufferFish("GREEN", 1, 4160, 275, 0.2),
      new PufferFish("ORANGE", 3, 4140, 312, 0.2),
      new PufferFish("RED", 3, 4120, 348, 0.2),
      new PufferFish("ORANGE", 3, 4100, 385, 0.2),
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
      new JellyDangerous("GREEN", 1, 2300, 90, 0, false),
      new JellyDangerous("PINK", 1, 2300, 168, 0, true),
      new JellyDangerous("GREEN", 1, 2300, 252, 0, true),
      new JellyDangerous("GREEN", 1, 2300, 336, 0, true),
      new JellyDangerous("PINK", 1, 2300, 420, 0, false),

      new JellyDangerous("PINK", 1, 3680, 100, 0.2, false),
      new JellyDangerous("PINK", 1, 3680, 200, 0.2, false),
      new JellyDangerous("PINK", 1, 3680, 300, 0.2, false),

      new JellyDangerous("PINK", 1, 3880, 200, 0.2, false),
      new JellyDangerous("PINK", 1, 3880, 300, 0.2, false),
      new JellyDangerous("PINK", 1, 3880, 400, 0.2, false),

      new JellyDangerous("PINK", 1, 4080, 100, 0.2, false),
      new JellyDangerous("PINK", 1, 4080, 200, 0.2, false),
      new JellyDangerous("PINK", 1, 4080, 300, 0.2, false),
    ],
    new Endboss(600),
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
