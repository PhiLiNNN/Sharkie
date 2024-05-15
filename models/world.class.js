class World {
  character = new Character();
  statusBar = new StatusBar();
  poisonBar = new PoisonBar();
  throwableObjsCharacter = [];
  throwablePoisonObjsCharacter = [];
  throwableObjsPuffer = [];
  throwableObjsJellyDangerous = [];
  level = level1;
  canvas;
  ctx;
  keyboard;
  isSwimmingLeft;
  camera_x = 0;
  // interactionDistancePufferFish = 500;
  // interactionDistanceDangerousJellyFish = 800;
  lastHitTime = 0;

  collisionDmgWithEndboss = 20;
  collisionDmgWithPuffer = 5;
  collisionDmgWithDangerousJelly = 10;
  collisionDmgWithRegularJelly = 5;

  bubbleDmgFromPuffer = 5;
  lightningDmgFromDangerousJelly = 5;

  bubbleDmgToPuffer = 100;
  bubbleDmgToDangerousJelly = 100;
  bubbleDmgToRegularJelly = 100;

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
    document.addEventListener("mousedown", (event) => {
      const currentTime = new Date().getTime();
      document.getElementById("canvas-id").oncontextmenu = () => false;
      if (event.button === 0 && currentTime - lastClickTime >= 500) {
        this.character.playAnimationOnce(this.character.IMAGES_BUBBLE, 50);
        setTimeout(() => {
          const xOffset = this.isSwimmingLeft ? 10 : 140;
          const bubble = new SharkieAttack(
            this.character.x + xOffset,
            this.character.y + 90,
            this.isSwimmingLeft,
            false
          );
          this.throwableObjsCharacter.push(bubble);
        }, 400);
        lastClickTime = currentTime;
      } else if (
        event.button === 2 &&
        currentTime - lastClickTime >= 500 &&
        this.character.poison_energy !== 0
      ) {
        this.character.reducePoisonEnergy();
        this.poisonBar.setPercentage(this.character.poison_energy);
        this.character.playAnimationOnce(this.character.IMAGES_BUBBLE_POISON, 50);
        setTimeout(() => {
          const xOffset = this.isSwimmingLeft ? 10 : 140;
          const bubble = new SharkieAttack(
            this.character.x + xOffset,
            this.character.y + 90,
            this.isSwimmingLeft,
            true
          );
          this.throwablePoisonObjsCharacter.push(bubble);
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
    this.checkCharacterItemCollision();
  }

  checkCharacterItemCollision() {
    const checkCollisions = (items) => {
      items.forEach((item, idx) => {
        if (this.character.isColliding(item) && this.character.poison_energy !== 100) {
          this.character.collect();
          this.poisonBar.setPercentage(this.character.poison_energy);
          items.splice(idx, 1);
        }
      });
    };
    checkCollisions(this.level.poisonItems);
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
            if (enemy instanceof JellyDangerous) this.character.hitFromDangerousJelly = true;
            else this.character.hitFromDangerousJelly = false;
          }
        }
      });
    };
    checkCollisions(this.level.pufferFishes, this.collisionDmgWithPuffer);
    checkCollisions(this.level.dangerousJellyFishes, this.collisionDmgWithDangerousJelly);
    checkCollisions(this.level.regularJellyFishes, this.collisionDmgWithRegularJelly);
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
            if (enemyShot instanceof JellyDangerousFishAttack)
              this.character.hitFromDangerousJelly = true;
            else this.character.hitFromDangerousJelly = false;
            this.statusBar.setPercentage(this.character.energy);
            enemies.splice(idx, 1);
          }
        }
        if (enemyShot.x < this.character.x - 100) enemies.splice(idx, 1);
      });
    };
    checkCollisions(this.throwableObjsPuffer, this.bubbleDmgFromPuffer);
    checkCollisions(this.throwableObjsJellyDangerous, this.lightningDmgFromDangerousJelly);
  }

  checkBubbleBubbleCollision() {
    const checkAndRemoveCollision = (enemyBubbles, characterBubbles) => {
      enemyBubbles.forEach((enemyBubble, enemyIndex) => {
        characterBubbles.forEach((bubble, bubbleIndex) => {
          if (enemyBubble.isColliding(bubble)) {
            if (!(enemyBubble instanceof JellyDangerousFishAttack))
              enemyBubbles.splice(enemyIndex, 1);
            characterBubbles.splice(bubbleIndex, 1);
          }
        });
      });
    };
    checkAndRemoveCollision(this.throwableObjsPuffer, this.throwableObjsCharacter);
    checkAndRemoveCollision(this.throwableObjsPuffer, this.throwablePoisonObjsCharacter);
    checkAndRemoveCollision(this.throwableObjsJellyDangerous, this.throwableObjsCharacter);
    checkAndRemoveCollision(this.throwableObjsJellyDangerous, this.throwablePoisonObjsCharacter);
  }

  checkCollisionWithBubble() {
    const bubblesToRemove = [];
    this.throwableObjsCharacter.forEach((bubble, bubbleIdx) => {
      const checkCollisions = (enemies, damage) => {
        enemies.forEach((enemy) => {
          if (bubble.isColliding(enemy) && !enemy.isDead()) {
            bubblesToRemove.push(bubbleIdx);
            enemy.hit(damage);
          }
        });
      };
      checkCollisions(this.level.pufferFishes, this.bubbleDmgToPuffer);
      checkCollisions(this.level.dangerousJellyFishes, this.bubbleDmgToDangerousJelly);
      checkCollisions(this.level.regularJellyFishes, this.bubbleDmgToRegularJelly);
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
          this.level.endboss.hit(this.collisionDmgWithEndboss);
          this.throwableObjsCharacter.splice(bubbleIdx, 1);
        }
      }
    });

    bubblesToRemove.sort((a, b) => b - a);
    bubblesToRemove.forEach((idx) => {
      this.throwableObjsCharacter.splice(idx, 1);
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
      newEnemy = new JellyDangerousFishAttack(enemy.x, enemy.y, true);
      this.throwableObjsJellyDangerous.push(newEnemy);
    } else if (fishType === "pufferFish") {
      newEnemy = new PufferFishAttack(enemy.x, enemy.y, true);
      this.throwableObjsPuffer.push(newEnemy);
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

    this.addToMap(this.level.leftBorder);
    this.addToMap(this.level.rightBorder);

    this.addObjectsToMap(this.level.poisonItems);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.poisonBar);
    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);

    if (this.level.endboss.spawnAnimation) this.addToMap(this.level.endboss);

    this.addObjectsToMap(this.level.regularJellyFishes);
    this.addObjectsToMap(this.level.dangerousJellyFishes);
    this.addObjectsToMap(this.level.pufferFishes);

    this.addObjectsToMap(this.throwableObjsCharacter);
    this.addObjectsToMap(this.throwablePoisonObjsCharacter);
    this.addObjectsToMap(this.throwableObjsPuffer);
    this.addObjectsToMap(this.throwableObjsJellyDangerous);

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
