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
  keyboard = new Keyboard();
  isSwimmingLeft;
  camera_x = 0;
  lastHitTime = 0;

  collisionDmgWithEndboss = 20;
  collisionDmgWithPuffer = 10;
  collisionDmgWithDangerousJelly = 15;
  collisionDmgWithRegularJelly = 10;

  bubbleDmgFromPuffer = 8;
  lightningDmgFromDangerousJelly = 12;

  bubbleDmgToPuffer = 100;
  bubbleDmgToDangerousJelly = 100;
  bubbleDmgToRegularJelly = 100;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
    this.setWorld();
    this.checkSwimDirection(9);
    this.checkBlowBubble();
    this.checkAllPossibleCollisions();
    this.areEnemiesWithinSight();
  }

  executeAttack(arr, bool) {
    setTimeout(() => {
      const xOffset = this.isSwimmingLeft ? 10 : 140;
      const bubble = new SharkieAttack(
        this.character.x + xOffset,
        this.character.y + 90,
        this.isSwimmingLeft,
        bool
      );
      arr.push(bubble);
    }, 400);
  }

  checkBlowBubble() {
    let lastClickTime = 0;
    this.handlerDesktopBubbles(lastClickTime);
    this.handlerMobileBubbles(lastClickTime);
  }

  handlerMobileBubbles(lastClickTime) {
    setInterval(() => {
      const currentTime = new Date().getTime();
      if (this.isMobilePrimaryAttackActionReady(currentTime, lastClickTime)) {
        this.executePrimaryAttack();
        lastClickTime = currentTime;
        this.keyboard.PRIMARY = false;
      } else if (this.isMobileSecondaryAttackActionReady(currentTime, lastClickTime)) {
        this.executeSecondaryAttack();
        lastClickTime = currentTime;
        this.keyboard.SECONDARY = false;
      }
    }, 25);
  }

  handlerDesktopBubbles(lastClickTime) {
    this.canvas.addEventListener("mousedown", (event) => {
      const currentTime = new Date().getTime();
      this.character.currentTime = currentTime;
      document.getElementById("canvas-id").oncontextmenu = () => false;
      if (this.isDesktopPrimaryAttackActionReady(event, currentTime, lastClickTime)) {
        this.executePrimaryAttack();
        lastClickTime = currentTime;
      } else if (this.isDesktopSecondaryAttackActionReady(event, currentTime, lastClickTime)) {
        this.executeSecondaryAttack();
        lastClickTime = currentTime;
      }
    });
  }

  executePrimaryAttack() {
    this.character.playAnimationOnce(this.character.IMAGES_BUBBLE, 50);
    this.executeAttack(this.throwableObjsCharacter, false);
  }

  executeSecondaryAttack() {
    this.character.reducePoisonEnergy();
    this.poisonBar.setPercentage(this.character.poison_energy);
    this.character.playAnimationOnce(this.character.IMAGES_BUBBLE_POISON, 50);
    this.executeAttack(this.throwablePoisonObjsCharacter, true);
  }

  isDesktopSecondaryAttackActionReady(event, currentTime, lastClickTime) {
    return (
      event.button === 2 &&
      currentTime - lastClickTime >= 500 &&
      this.character.poison_energy !== 0 &&
      !pauseGame
    );
  }

  isDesktopPrimaryAttackActionReady(event, currentTime, lastClickTime) {
    return event.button === 0 && currentTime - lastClickTime >= 500 && !pauseGame;
  }

  isMobileSecondaryAttackActionReady(currentTime, lastClickTime) {
    return (
      this.keyboard.SECONDARY &&
      currentTime - lastClickTime >= 500 &&
      this.character.poison_energy !== 0 &&
      !pauseGame
    );
  }

  isMobilePrimaryAttackActionReady(currentTime, lastClickTime) {
    return this.keyboard.PRIMARY && currentTime - lastClickTime >= 500 && !pauseGame;
  }

  /**
   * Sets the world property of the character object to this instance.
   */
  setWorld() {
    this.character.world = this;
    this.level.endboss.world = this;
  }

  checkAllPossibleCollisions() {
    let updateCollisionInt = setInterval(() => {
      this.checkCharacterCollisions();
      this.checkCollisionWithBubble();
      this.handlerCollisionWithPoisonBubble();
      this.checkBubbleBubbleCollision();
    }, 25);
    intervalIds.push(updateCollisionInt);
  }

  checkCharacterCollisions() {
    this.checkCharacterEnemyCollision();
    this.checkCharacterThrowableObjectCollision();
    this.checkCharacterItemCollision();
  }

  checkCharacterItemCollision() {
    const checkCollisions = (items, itemType) => {
      items.forEach((item, idx) => {
        if (
          this.character.isColliding(item) &&
          itemType === "poison" &&
          this.character.poison_energy !== 100 &&
          !pauseGame
        ) {
          this.character.collectItem(itemType);
          this.poisonBar.setPercentage(this.character.poison_energy);
          items.splice(idx, 1);
        } else if (
          this.character.isColliding(item) &&
          itemType === "heart" &&
          this.character.energy !== 100 &&
          !pauseGame
        ) {
          this.character.collectItem(itemType);
          this.statusBar.setPercentage(this.character.energy);
          items.splice(idx, 1);
        }
      });
    };
    checkCollisions(this.level.poisonItems, "poison");
    checkCollisions(this.level.heartItems, "heart");
  }

  checkCharacterEnemyCollision() {
    const checkCollisions = (enemies, damage) => {
      enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy) && !enemy.isDead() && !pauseGame) {
          let currentTime = new Date().getTime();
          let timeSinceLastHit = currentTime - this.lastHitTime;
          this.character.currentTime = currentTime;
          if (timeSinceLastHit >= 1000) {
            this.lastHitTime = currentTime;
            this.character.hit(damage);
            this.statusBar.setPercentage(this.character.energy);
            this.isCharColWithJellyDangerousFish(enemy);
          }
        }
      });
    };
    checkCollisions(this.level.pufferFishes, this.collisionDmgWithPuffer);
    checkCollisions(this.level.dangerousJellies, this.collisionDmgWithDangerousJelly);
    checkCollisions(this.level.regularJellies, this.collisionDmgWithRegularJelly);
  }

  isCharColWithJellyDangerousFish(enemy) {
    if (enemy instanceof JellyDangerous) this.character.hitFromDangerousJelly = true;
    else this.character.hitFromDangerousJelly = false;
  }

  checkCharacterThrowableObjectCollision() {
    this.checkCharEnemyShotCollision(this.throwableObjsPuffer, this.bubbleDmgFromPuffer);
    this.checkCharEnemyShotCollision(
      this.throwableObjsJellyDangerous,
      this.lightningDmgFromDangerousJelly
    );
  }

  checkCharEnemyShotCollision(enemies, damage) {
    enemies.forEach((enemyShot, idx) => {
      if (this.character.isColliding(enemyShot) && !pauseGame) {
        let currentTime = new Date().getTime();
        let timeSinceLastHit = currentTime - this.lastHitTime;
        this.character.currentTime = currentTime;
        if (timeSinceLastHit >= 1000) {
          this.lastHitTime = currentTime;
          this.character.hit(damage);
          this.isCharHitByJellyDangerousFish(enemyShot);
          this.statusBar.setPercentage(this.character.energy);
          enemies.splice(idx, 1);
        }
      }
      if (this.isOutsideCharacterRange(enemyShot)) enemies.splice(idx, 1);
    });
  }

  isCharHitByJellyDangerousFish(enemyShot) {
    if (enemyShot instanceof JellyDangerousFishAttack) this.character.hitFromDangerousJelly = true;
    else this.character.hitFromDangerousJelly = false;
  }

  checkBubbleBubbleCollision() {
    const checkCollisions = (enemyBubbles, characterBubbles) => {
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
    checkCollisions(this.throwableObjsPuffer, this.throwableObjsCharacter);
    checkCollisions(this.throwableObjsPuffer, this.throwablePoisonObjsCharacter);
    checkCollisions(this.throwableObjsJellyDangerous, this.throwableObjsCharacter);
    checkCollisions(this.throwableObjsJellyDangerous, this.throwablePoisonObjsCharacter);
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
      checkCollisions(this.level.dangerousJellies, this.bubbleDmgToDangerousJelly);
      checkCollisions(this.level.regularJellies, this.bubbleDmgToRegularJelly);
      if (this.isOutsideCharacterRange(bubble) || this.isCollidingWithEndBoss(bubble))
        bubblesToRemove.push(bubbleIdx);
    });
    this.removeBubbles(bubblesToRemove, this.throwableObjsCharacter);
  }

  handlerCollisionWithPoisonBubble() {
    const bubblesToRemove = [];
    this.throwablePoisonObjsCharacter.forEach((bubble, idx) => {
      const enemiesToCheck = [
        {enemie: this.level.pufferFishes, damage: this.bubbleDmgToPuffer},
        {enemie: this.level.dangerousJellies, damage: this.bubbleDmgToDangerousJelly},
        {enemie: this.level.regularJellies, damage: this.bubbleDmgToRegularJelly},
      ];
      enemiesToCheck.forEach(({enemie, damage}) => {
        this.checkPoisonBubbleCollision(enemie, damage, bubble, idx, bubblesToRemove);
      });
      if (this.isOutsideCharacterRange(bubble) || this.isCollidingWithEndBoss(bubble)) {
        bubblesToRemove.push(idx);
        this.checkEndBossCollisionAndHit(bubble);
      }
    });
    this.removeBubbles(bubblesToRemove, this.throwablePoisonObjsCharacter);
  }

  checkPoisonBubbleCollision(enemyArr, damage, bubble, bubbleIdx, bubblesToRemove) {
    enemyArr.forEach((enemy) => {
      if (bubble.isColliding(enemy) && !enemy.isDead()) {
        bubblesToRemove.push(bubbleIdx);
        enemy.hit(damage);
      }
    });
  }

  checkEndBossCollisionAndHit(bubble) {
    if (bubble.isColliding(this.level.endboss)) {
      let currentTime = new Date().getTime();
      let timeSinceLastHit = currentTime - this.lastHitTime;
      if (timeSinceLastHit >= 1000) {
        this.lastHitTime = currentTime;
        this.level.endboss.hit(this.collisionDmgWithEndboss);
      }
    }
  }

  isOutsideCharacterRange(shot) {
    const rightScreenBorder = 880 - Math.abs(this.character.x + this.camera_x);
    const leftScreenBorder = Math.abs(this.character.x + this.camera_x);
    const rightLimit = shot instanceof JellyDangerousFishAttack ? 1300 : rightScreenBorder;
    return (
      shot.x > this.character.x + rightLimit ||
      shot.x < this.character.x - leftScreenBorder ||
      shot.x < this.level.leftBorder.x + this.level.leftBorder.width ||
      shot.x > this.level.rightBorder.x
    );
  }

  isCollidingWithEndBoss(bubble) {
    return (
      bubble.isColliding(this.level.endboss) &&
      !this.level.endboss.isDead() &&
      this.level.endboss.spawnAnimation
    );
  }

  removeBubbles(arr, allBubbles) {
    arr.sort((a, b) => b - a);
    arr.forEach((idx) => {
      allBubbles.splice(idx, 1);
    });
  }

  areEnemiesWithinSight() {
    let updateEnemyVisibility = setInterval(() => {
      if (this.character.x > 40 && !pauseGame && !this.level.endboss.isDead())
        this.enemyAttack(this.getAliveEnemies(this.level.pufferFishes), "pufferFish");
      if (this.character.x > 1000 && !pauseGame && !this.level.endboss.isDead())
        this.enemyAttack(this.getAliveEnemies(this.level.dangerousJellies), "jellyDangerous");
    }, 400);
    intervalIds.push(updateEnemyVisibility);
  }

  getAliveEnemies(enemies) {
    return enemies.filter((enemy) => !enemy.isDead());
  }

  enemyAttack(aliveEnemies, fishType) {
    const addEnemyAttack = () => {
      if (aliveEnemies.length === 0) return;
      const randomEnemy = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
      this.setRightAnimation(randomEnemy);
      setTimeout(() => this.addEnemyAttackObject(randomEnemy, fishType), 700);
      addEnemyAttack;
    };
    addEnemyAttack();
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
    this.addObjectsToMap(this.level.heartItems);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.poisonBar);
    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);

    if (this.level.endboss.spawnAnimation) this.addToMap(this.level.endboss);

    this.addObjectsToMap(this.level.regularJellies);
    this.addObjectsToMap(this.level.dangerousJellies);
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
    let updateSwimDir = setInterval(() => {
      if (this.keyboard.RIGHT) this.isSwimmingLeft = false;
      if (this.keyboard.LEFT) this.isSwimmingLeft = true;
    }, 25);
    intervalIds.push(updateSwimDir);
  }
}
