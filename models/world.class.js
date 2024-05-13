class World {
  character = new Character();
  statusBar = new StatusBar();
  throwableObjectsCharacter = [];
  throwableObjectsPufferFish = [];
  throwableObjectsJellyDangerousFish = [];
  level = level1;
  canvas;
  ctx;
  keyboard;
  isSwimmingLeft;
  camera_x = 0;
  // interactionDistancePufferFish = 500;
  // interactionDistanceDangerousJellyFish = 800;
  lastHitTime = 0;

  collisionDamageWithEndboss = 20;
  collisionDamageWithPufferFish = 5;
  collisionDamageWithDangerousJellyFish = 10;
  collisionDamageWithRegularJellyFish = 5;

  bubbleDamageFromPufferFish = 5;
  lightningDamageFromDangerousJelly = 5;

  bubbleDamageToPufferFish = 100;
  bubbleDamageToDangerousJellyFish = 100;
  bubbleDamageToRegularJellyFish = 100;

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
        this.character.playAnimationOnce(this.character.IMAGES_BUBBLE, 50);
        setTimeout(() => {
          const xOffset = this.isSwimmingLeft ? 10 : 140;
          const bubble = new SharkieAttack(
            this.character.x + xOffset,
            this.character.y + 90,
            this.isSwimmingLeft
          );
          this.throwableObjectsCharacter.push(bubble);
        }, 400);
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
    const checkCollisions = (enemies, damage) => {
      enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy) && !enemy.isDead()) {
          let currentTime = new Date().getTime();
          let timeSinceLastHit = currentTime - this.lastHitTime;
          if (timeSinceLastHit >= 1000) {
            this.lastHitTime = currentTime;
            this.character.hit(damage);
            this.statusBar.setPercentage(this.character.energy);
            if (enemy instanceof jellyDangerousFishAttack) {
              this.character.hitFromDangerousJellyFish = true;
            } else {
              this.character.hitFromDangerousJellyFish = false;
            }
          }
        }
      });
    };
    checkCollisions(this.level.pufferFishes, this.collisionDamageWithPufferFish);
    checkCollisions(this.level.dangerousJellyFishes, this.collisionDamageWithDangerousJellyFish);
    checkCollisions(this.level.regularJellyFishes, this.collisionDamageWithRegularJellyFish);
  }

  checkCharacterThrowableObjectCollision() {
    const checkCollisions = (enemies, damage) => {
      enemies.forEach((enemyShot, idx) => {
        if (this.character.isColliding(enemyShot)) {
          let currentTime = new Date().getTime();
          let timeSinceLastHit = currentTime - this.lastHitTime;
          if (timeSinceLastHit >= 1000) {
            this.lastHitTime = currentTime;
            this.character.hit(damage);
            if (enemyShot instanceof jellyDangerousFishAttack) {
              this.character.hitFromDangerousJellyFish = true;
            } else {
              this.character.hitFromDangerousJellyFish = false;
            }

            this.statusBar.setPercentage(this.character.energy);
            enemies.splice(idx, 1);
          }
        }
        if (enemyShot.x < this.character.x - 100) enemies.splice(idx, 1);
      });
    };
    checkCollisions(this.throwableObjectsPufferFish, this.bubbleDamageFromPufferFish);
    checkCollisions(
      this.throwableObjectsJellyDangerousFish,
      this.lightningDamageFromDangerousJelly
    );
  }

  checkBubbleBubbleCollision() {
    this.throwableObjectsPufferFish.forEach((enemyBubble, idx) => {
      this.throwableObjectsCharacter.forEach((bubble, index) => {
        if (enemyBubble.isColliding(bubble)) {
          this.throwableObjectsPufferFish.splice(idx, 1);
          this.throwableObjectsCharacter.splice(index, 1);
        }
      });
    });
    this.throwableObjectsJellyDangerousFish.forEach((enemyBubble) => {
      this.throwableObjectsCharacter.forEach((bubble, index) => {
        if (enemyBubble.isColliding(bubble)) this.throwableObjectsCharacter.splice(index, 1);
      });
    });
  }

  checkCollisionWithBubble() {
    const bubblesToRemove = [];

    this.throwableObjectsCharacter.forEach((bubble, bubbleIdx) => {
      const checkCollisions = (enemies, damage) => {
        enemies.forEach((enemy) => {
          if (bubble.isColliding(enemy) && !enemy.isDead()) {
            bubblesToRemove.push(bubbleIdx);
            enemy.hit(damage);
          }
        });
      };

      checkCollisions(this.level.pufferFishes, this.bubbleDamageToPufferFish);
      checkCollisions(this.level.dangerousJellyFishes, this.bubbleDamageToDangerousJellyFish);
      checkCollisions(this.level.regularJellyFishes, this.bubbleDamageToRegularJellyFish);

      if (bubble.x > this.character.x + 800 || bubble.x < this.character.x - 100) {
        bubblesToRemove.push(bubbleIdx);
      }

      if (
        bubble.isColliding(this.level.endboss) &&
        !this.level.endboss.isDead() &&
        this.level.endboss.spawnAnimation
      ) {
        let currentTime = new Date().getTime();
        let timeSinceLastHit = currentTime - this.lastHitTime;

        if (timeSinceLastHit >= 1000) {
          this.lastHitTime = currentTime;
          this.level.endboss.hit(this.collisionDamageWithEndboss);
          this.throwableObjectsCharacter.splice(bubbleIdx, 1);
        }
      }
    });

    bubblesToRemove.sort((a, b) => b - a);
    bubblesToRemove.forEach((idx) => {
      this.throwableObjectsCharacter.splice(idx, 1);
    });
  }

  areEnemiesWithinSight() {
    setInterval(() => {
      this.enemyAttack(this.getAliveEnemies(this.level.pufferFishes), "pufferFish");

      this.enemyAttack(this.getAliveEnemies(this.level.dangerousJellyFishes), "jellyDangerous");
    }, 1500);
  }

  getAliveEnemies(enemies) {
    return enemies.filter((enemy) => !enemy.isDead());
  }

  enemyAttack(aliveEnemies, fishType) {
    const addEnemyAttack = () => {
      if (aliveEnemies.length === 0) return;
      const randomEnemy = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
      this.setRightAnimation(randomEnemy);
      setTimeout(() => {
        this.addEnemyAttackObject(randomEnemy, fishType);
      }, 700);
      setTimeout(addEnemyAttack, this.getRandomInterval());
    };
    addEnemyAttack();
  }

  getRandomInterval() {
    return (Math.random() * 1000) / this.enemyShootingInterval;
  }

  addEnemyAttackObject(enemy, fishType) {
    let newEnemy;
    if (fishType === "jellyDangerous") {
      newEnemy = new jellyDangerousFishAttack(enemy.x, enemy.y, true);
      this.throwableObjectsJellyDangerousFish.push(newEnemy);
    } else if (fishType === "pufferFish") {
      newEnemy = new pufferFishAttack(enemy.x, enemy.y, true);
      this.throwableObjectsPufferFish.push(newEnemy);
    }
  }

  setRightAnimation(fish) {
    if (fish.fishType === "ORANGE") fish.playAnimationOnce(fish.ENEMY_ORANGE_TRANSITION, 120);
    if (fish.fishType === "RED") fish.playAnimationOnce(fish.ENEMY_RED_TRANSITION, 120);
    if (fish.fishType === "GREEN") fish.playAnimationOnce(fish.ENEMY_GREEN_TRANSITION, 120);
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

    if (this.level.endboss.spawnAnimation) this.addToMap(this.level.endboss);

    this.addObjectsToMap(this.level.regularJellyFishes);
    this.addObjectsToMap(this.level.dangerousJellyFishes);
    this.addObjectsToMap(this.level.pufferFishes);
    this.addObjectsToMap(this.throwableObjectsCharacter);

    this.addObjectsToMap(this.throwableObjectsPufferFish);
    this.addObjectsToMap(this.throwableObjectsJellyDangerousFish);
    this.addToMap(this.level.leftBorder);
    this.addToMap(this.level.rightBorder);
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
