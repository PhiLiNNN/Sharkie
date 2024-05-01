class World {
  character = new Character();
  enemies = [
    new Fish("GREEN", 1),
    new Fish("RED", 3),
    new Fish("GREEN", 1),
    new Fish("RED", 3),
    new Fish("ORANGE", 2),
    new Fish("ORANGE", 2),
    new Fish("RED", 3),
    new Fish("GREEN", 1),
  ];
  width = 720;
  backgroundObject = [];
  layers = ["5. Water", "4. Fondo 2", "3. Fondo 1", "1. Light", "2. Floor"];
  repeaterAmount = 1; // change this number to set the  length of the world
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.repeatBackground();
    this.draw();
    this.setWorld();
  }

  /**
   * Initializes the repeating background objects.
   */
  repeatBackground() {
    const factorList = this.generateList(this.repeaterAmount);
    this.layers.forEach((layer) => {
      const basePath = `img/3. Background/Layers/${layer}/`;
      factorList.factor.forEach((factor, idx) => {
        this.pushBackgroundLayers(basePath, factor, factorList.img[idx]);
      });
    });
  }

  /**
   * Adds a background object to the backgroundObject array.
   * @param {string} basePath - The base path to the image.
   * @param {number} factor - The factor by which the object is shifted.
   * @param {number} imgNumber - The number of the image.
   */
  pushBackgroundLayers(basePath, factor, imgNumber) {
    const obj = new BackgroundObject(basePath + `D${imgNumber}.png`, (this.width - 1) * factor);
    this.backgroundObject.push(obj);
  }

  /**
   * Generates a list of numbers from -1 up to the specified maximum value.
   * This list contains the factors to evaluate the position on the x-axis at which the image should be repeated.
   * @param {number} maxValue - The maximum value for the list.
   * @returns {Array} - A list of numbers from -1 up to the maximum value.
   */
  generateList(repeaterAmount) {
    const list = {
      factor: [],
      img: [],
    };
    for (let i = -1; i < repeaterAmount + 1; i++) {
      list.factor.push(i);
      if (this.isOdd(i)) list.img.push(2);
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
  isOdd(number) {
    if (number === 0) return false;
    return number % 2 !== 0;
  }

  /**
   * Sets the world property of the character object to this instance.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Clears the canvas and draws the game elements including background, character, and enemies.
   * Continuously calls itself using requestAnimationFrame for smooth animation.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.backgroundObject);
    this.addToMap(this.character);
    this.addObjectsToMap(this.enemies);
    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Draws a list of objects onto the canvas.
   * @param {Array} objects - The list of objects to draw.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Draws a single object onto the canvas.
   * @param {Object} mo - The object to draw.
   */
  addToMap(mo) {
    if (mo.otherDirection) this.flipImage(mo);
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    if (mo.otherDirection) this.flipImageBack(mo);
  }

  /**
   * Flips the image horizontally before drawing.
   * @param {Object} mo - The object whose image is to be flipped.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the canvas state after flipping the image.
   * @param {Object} mo - The object whose image was flipped.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
