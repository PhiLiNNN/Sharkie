class World {
  character = new Character();
  statusBar = new StatusBar();
  throwableObjects = [];
  throwableObjectsEnemy = [];
  level = level1;
  canvas;
  ctx;
  keyboard;
  isSwimmingLeft;
  isBlowBubbleInProgress = false;
  camera_x = 0;
  lastHitTime = 0;
  enemyShootinginterval = 0.01;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkSwimDirection(9);
    this.checkCollisions();
    this.areEnemiesWithinSight();
  }

  /**
   * Sets the world property of the character object to this instance.
   */
  setWorld() {
    this.character.world = this;
  }

  checkCollisions() {
    setInterval(() => {
      this.checkCharacterCollisions();
      this.checkBlowBubble();
      this.checkCollisionWithBubble();
    }, 25);
  }

  checkCharacterCollisions() {
    this.checkCharacterEnemyCollision();
    this.checkCharacterThrowableObjectCollision();
  }

  checkCharacterEnemyCollision() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy, this.isSwimmingLeft) && enemy.isAlive) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  checkCharacterThrowableObjectCollision() {
    this.throwableObjectsEnemy.forEach((enemyBubble, idx) => {
      if (this.character.isColliding(enemyBubble, true)) {
        let currentTime = new Date().getTime();
        let timeSinceLastHit = currentTime - this.lastHitTime;
        if (timeSinceLastHit >= 1000) {
          this.lastHitTime = currentTime;
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
          this.throwableObjectsEnemy.splice(idx, 1);
        }
      }
      if (enemyBubble.x < 0) this.throwableObjectsEnemy.splice(idx, 1);
    });
  }

  checkCollisionWithBubble() {
    this.throwableObjects.forEach((bubble, idx) => {
      this.level.enemies.forEach((enemy) => {
        if (bubble.isColliding(enemy, this.isSwimmingLeft)) {
          this.throwableObjects.splice(idx, 1);
          enemy.hit();
          enemy.isAlive = false;
        }
      });
    });
  }

  checkBlowBubble() {
    document.addEventListener("click", (event) => {
      if (event.button === 0 && !this.isBlowBubbleInProgress) {
        const xOffset = this.isSwimmingLeft ? 60 : 140;
        const bubble = new SharkieAttack(
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

  areEnemiesWithinSight() {
    setInterval(() => {
      if (this.character.x >= 319) this.enemyAttack();
    }, 500);
  }

  enemyAttack() {
    const enemyCount = this.level.enemies.length - 1;
    const randomInterval = () => (Math.random() * 1000) / this.enemyShootinginterval;
    const addEnemyAttack = () => {
      const randomEnemyIndex = Math.floor(Math.random() * enemyCount);
      const bubbleEnemy = new EnemyAttack(
        this.level.enemies[randomEnemyIndex].x,
        this.level.enemies[randomEnemyIndex].y,
        true
      );
      let isEnemyAlive = this.level.enemies[randomEnemyIndex].isAlive;
      if (isEnemyAlive) this.throwableObjectsEnemy.push(bubbleEnemy);
      setTimeout(addEnemyAttack, randomInterval());
    };
    addEnemyAttack();
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
    this.addObjectsToMap(this.throwableObjectsEnemy);
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
    // mo.drawFrame(this.ctx);
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
    setInterval(() => {
      if (this.keyboard.RIGHT) this.isSwimmingLeft = false;
      if (this.keyboard.LEFT) this.isSwimmingLeft = true;
    }, 25);
  }
}
