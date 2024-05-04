class World {
  character = new Character();
  statusBar = new StatusBar();
  throwableObjects = [];
  level = level1;
  canvas;
  ctx;
  keyboard;
  isSwimmingLeft;
  isBlowBubbleInProgress = false;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.swim();
  }

  /**
   * Sets the world property of the character object to this instance.
   */
  setWorld() {
    this.character.world = this;
  }

  swim() {
    setInterval(() => {
      this.checkSwimDirection();
      this.checkCollisions();
      this.checkBlowBubble();
    }, 200);
  }
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  checkBlowBubble() {
    document.addEventListener("click", (event) => {
      if (event.button === 0 && !this.isBlowBubbleInProgress) {
        const xOffset = this.isSwimmingLeft ? 60 : 140;
        const bubble = new ThrowableObject(
          this.character.x + xOffset,
          this.character.y + 90,
          this.isSwimmingLeft
        );
        this.throwableObjects.push(bubble);
        this.isBlowBubbleInProgress = true;
        setTimeout(() => {
          this.isBlowBubbleInProgress = false;
        }, 200);
      }
    });
  }

  /**
   * Clears the canvas and draws the game elements including background, character, and enemies.
   * Continuously calls itself using requestAnimationFrame for smooth animation.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObject);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);

    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
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
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
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

  checkSwimDirection() {
    if (this.keyboard.RIGHT) this.isSwimmingLeft = false;
    if (this.keyboard.LEFT) this.isSwimmingLeft = true;
  }
}
