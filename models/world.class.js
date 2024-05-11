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
  camera_x = 0;
  lastHitTime = 0;
  enemyShootingInterval = 0.01;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkSwimDirection(9);
    this.checkBlowBubble();
    this.checkAllPossibleCollisions();
    this.areEnemiesWithinSight();
  }

  checkBlowBubble() {
    let lastClickTime = 0;
    document.addEventListener("click", (event) => {
      const currentTime = new Date().getTime();
      if (event.button === 0 && currentTime - lastClickTime >= 500) {
        this.character.playAnimationOnce(this.character.IMAGES_BUBBLE);
        setTimeout(() => {
          const xOffset = this.isSwimmingLeft ? 60 : 140;
          const bubble = new SharkieAttack(
            this.character.x + xOffset,
            this.character.y + 90,
            this.isSwimmingLeft
          );
          this.throwableObjects.push(bubble);
        }, 180);
        lastClickTime = currentTime;
      }
    });
  }

  /**
   * Sets the world property of the character object to this instance.
   */
  setWorld() {
    this.character.world = this;
    this.level.endboss.world = this;
    this.level.pufferFishes.forEach((pufferFish) => {
      pufferFish.world = true;
    });
  }

  checkAllPossibleCollisions() {
    setInterval(() => {
      this.checkCharacterCollisions();
      this.checkCollisionWithBubble();
      this.checkBubbleBubbleCollision();
    }, 25);
  }

  checkCharacterCollisions() {
    this.checkCharacterEnemyCollision();
    this.checkCharacterThrowableObjectCollision();
  }

  checkCharacterEnemyCollision() {
    const checkCollisions = (enemies) => {
      enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy) && !enemy.isDead()) {
          let currentTime = new Date().getTime();
          let timeSinceLastHit = currentTime - this.lastHitTime;
          if (timeSinceLastHit >= 1000) {
            this.lastHitTime = currentTime;
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
          }
        }
      });
    };
    checkCollisions(this.level.pufferFishes);
    checkCollisions(this.level.dangerousJellyFishes);
    checkCollisions(this.level.regularJellyFishes);
  }

  checkCharacterThrowableObjectCollision() {
    this.throwableObjectsEnemy.forEach((enemyBubble, idx) => {
      if (this.character.isColliding(enemyBubble)) {
        let currentTime = new Date().getTime();
        let timeSinceLastHit = currentTime - this.lastHitTime;
        if (timeSinceLastHit >= 1000) {
          this.lastHitTime = currentTime;
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
          this.throwableObjectsEnemy.splice(idx, 1);
        }
      }
      if (enemyBubble.x < this.character.x - 100) this.throwableObjectsEnemy.splice(idx, 1);
    });
  }

  checkBubbleBubbleCollision() {
    this.throwableObjectsEnemy.forEach((enemyBubble, idx) => {
      this.throwableObjects.forEach((bubble, index) => {
        if (enemyBubble.isColliding(bubble)) {
          this.throwableObjectsEnemy.splice(idx, 1);
          this.throwableObjects.splice(index, 1);
        }
      });
    });
  }

  checkCollisionWithBubble() {
    this.throwableObjects.forEach((bubble, bubbleIdx) => {
      const checkCollisions = (enemies) => {
        enemies.forEach((enemy) => {
          if (bubble.isColliding(enemy) && !enemy.isDead()) {
            this.throwableObjects.splice(bubbleIdx, 1);
            enemy.hit();
          } else if (bubble.x > this.character.x + 800 || bubble.x < this.character.x - 100)
            this.throwableObjects.splice(bubbleIdx, 1);
        });
      };
      checkCollisions(this.level.pufferFishes);
      checkCollisions(this.level.dangerousJellyFishes);
      checkCollisions(this.level.regularJellyFishes);
      if (
        bubble.isColliding(this.level.endboss) &&
        !this.level.endboss.isDead() &&
        this.level.endboss.spawnAnimation
      ) {
        let currentTime = new Date().getTime();
        let timeSinceLastHit = currentTime - this.lastHitTime;
        this.throwableObjects.splice(bubbleIdx, 1);
        if (timeSinceLastHit >= 1000) {
          this.lastHitTime = currentTime;
          this.level.endboss.hit();
        }
      }
    });
  }

  areEnemiesWithinSight() {
    setInterval(() => {
      this.level.pufferFishes.forEach((pufferFish) => {
        if (this.character.checkEntityDistance(pufferFish)) this.enemyAttack();
      });
    }, 1500);
  }

  enemyAttack() {
    const enemyCount = this.level.pufferFishes.length;
    const randomInterval = () => (Math.random() * 1000) / this.enemyShootingInterval;
    const addEnemyAttack = () => {
      const randomEnemyIndex = Math.floor(Math.random() * enemyCount);
      const bubbleEnemy = new EnemyAttack(
        this.level.pufferFishes[randomEnemyIndex].x,
        this.level.pufferFishes[randomEnemyIndex].y,
        true
      );
      let isEnemyAlive = !this.level.pufferFishes[randomEnemyIndex].isDead();
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
    this.addObjectsToMap(this.level.border);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);

    if (this.level.endboss.spawnAnimation) this.addToMap(this.level.endboss);

    this.addObjectsToMap(this.level.regularJellyFishes);
    this.addObjectsToMap(this.level.dangerousJellyFishes);
    this.addObjectsToMap(this.level.pufferFishes);

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
