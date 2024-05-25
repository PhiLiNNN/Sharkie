/**
 * @class World
 * Represents the game world with its assets and interactions.
 * @extends WorldAssets
 */
class World extends WorldAssets {
  character = new Character();
  statusBar = new StatusBar();
  poisonBar = new PoisonBar();
  endBossBar = new EndbossBar();
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
  collisionDmgWithEndboss = 0;
  collisionDmgWithPuffer = 0;
  collisionDmgWithDangerousJelly = 0;
  collisionDmgWithRegularJelly = 0;
  bubbleDmgFromPuffer = 0;
  lightningDmgFromDangerousJelly = 0;
  bubbleDmgToPuffer = 100;
  bubbleDmgToDangerousJelly = 100;
  bubbleDmgToRegularJelly = 100;
  drawFrame = false;

  /**
   * Creates an instance of World.
   * @param {HTMLCanvasElement} canvas - The canvas element for the game.
   */
  constructor(canvas) {
    super();
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
    this.setWorld();
    this.checkSwimDirection();
    this.checkBlowBubble();
    this.checkAllPossibleCollisions();
    this.areEnemiesWithinSight();
  }

  /**
   * Checks if the main character can blow bubbles.
   */
  checkBlowBubble() {
    let lastClickTime = 0;
    this.handlerDesktopBubbles(lastClickTime);
    this.handlerMobileBubbles(lastClickTime);
  }

  /**
   * Sets the world property of the character object to this instance.
   */
  setWorld() {
    this.character.world = this;
    this.level.endboss.world = this;
  }

  /**
   * Checks all possible collisions in the game world.
   */
  checkAllPossibleCollisions() {
    let updateCollisionInt = setInterval(() => {
      this.checkCharacterCollisions();
      this.checkCollisionWithBubble();
      this.checkCollisionWithPoisonBubble();
      this.checkBubbleBubbleCollision();
    }, 25);
    intervalIds.push(updateCollisionInt);
  }

  /**
   * Checks collisions involving the main character.
   */
  checkCharacterCollisions() {
    this.checkCharacterEnemyCollision();
    this.checkCharacterEnemyAttackCollision();
    this.checkCharacterItemCollision();
  }

  /**
   * Checks collisions between the main character and items.
   */
  checkCharacterItemCollision() {
    this.handlerItemCollisions(
      this.level.poisonItems,
      "poison",
      poison_collect,
      0.6,
      this.poisonBar,
      "poison_energy"
    );
    this.handlerItemCollisions(
      this.level.heartItems,
      "heart",
      heart_collect,
      0.2,
      this.statusBar,
      "energy"
    );
  }

  /**
   * Handles collisions between the main character and items.
   * @param {Array} items - The array of items to check for collisions.
   * @param {string} itemType - The type of item to check collisions with.
   * @param {Audio} sound - The sound to play when an item is collected.
   * @param {number} volume - The volume of the sound to play.
   * @param {StatusBar} statusBar - The status bar to update after collecting the item.
   * @param {string} energyType - The type of energy to update in the status bar.
   */
  handlerItemCollisions(items, itemType, sound, volume, statusBar, energyType) {
    items.forEach((item, idx) => {
      if (this.isCollectionItem(item, itemType)) {
        playSound(sound, volume);
        this.character.collectItem(itemType);
        statusBar.setPercentage(this.character[energyType]);
        items.splice(idx, 1);
      }
    });
  }

  /**
   * Checks collisions between the main character and enemies.
   */
  checkCharacterEnemyCollision() {
    const checkCollisions = (enemies, damage) => {
      enemies.forEach((enemy, idx) => {
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
        if (enemy.y < 0) enemies.splice(idx, 1);
      });
    };
    checkCollisions(this.level.pufferFishes, this.collisionDmgWithPuffer);
    checkCollisions(this.level.dangerousJellies, this.collisionDmgWithDangerousJelly);
    checkCollisions(this.level.regularJellies, this.collisionDmgWithRegularJelly);
  }

  /**
   * Checks collisions between the main character and enemy attack from enemies.
   */
  checkCharacterEnemyAttackCollision() {
    this.checkCharEnemyShotCollision(this.throwableObjsPuffer, this.bubbleDmgFromPuffer);
    this.checkCharEnemyShotCollision(
      this.throwableObjsJellyDangerous,
      this.lightningDmgFromDangerousJelly
    );
  }

  /**
   * Checks collisions between the main character and enemy shots.
   * @param {Array} enemies - The array of enemy shots to check collisions with.
   * @param {number} damage - The damage to inflict on the character upon collision.
   */
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

  /**
   * Checks collisions between bubbles thrown by the character and bubbles thrown by enemies.
   */
  checkBubbleBubbleCollision() {
    const checkCollisions = (enemyBubbles, characterBubbles) => {
      enemyBubbles.forEach((enemyBubble, enemyIndex) => {
        characterBubbles.forEach((bubble, bubbleIndex) => {
          if (enemyBubble.isColliding(bubble)) {
            if (!(enemyBubble instanceof JellyDangerousFishAttack))
              enemyBubbles.splice(enemyIndex, 1);
            characterBubbles.splice(bubbleIndex, 1);
            playSound(bubble_pop, 0.2);
          }
        });
      });
    };
    checkCollisions(this.throwableObjsPuffer, this.throwableObjsCharacter);
    checkCollisions(this.throwableObjsPuffer, this.throwablePoisonObjsCharacter);
    checkCollisions(this.throwableObjsJellyDangerous, this.throwableObjsCharacter);
    checkCollisions(this.throwableObjsJellyDangerous, this.throwablePoisonObjsCharacter);
  }

  /**
   * Handles collisions between the character bubbles and enemies.
   */
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

  /**
   * Handles collisions between poison bubbles thrown by the character and enemies.
   */
  checkCollisionWithPoisonBubble() {
    const bubblesToRemove = [];
    this.throwablePoisonObjsCharacter.forEach((bubble, idx) => {
      const enemiesToCheck = [
        {enemie: this.level.pufferFishes, damage: this.bubbleDmgToPuffer},
        {enemie: this.level.dangerousJellies, damage: this.bubbleDmgToDangerousJelly},
        {enemie: this.level.regularJellies, damage: this.bubbleDmgToRegularJelly},
      ];
      enemiesToCheck.forEach(({enemie, damage}) => {
        this.handlerEnemyHit(enemie, damage, bubble, idx, bubblesToRemove);
      });
      if (this.isOutsideCharacterRange(bubble) || this.isCollidingWithEndBoss(bubble)) {
        bubblesToRemove.push(idx);
        this.handlerEndbossHit(bubble);
      }
    });
    this.removeBubbles(bubblesToRemove, this.throwablePoisonObjsCharacter);
  }

  /**
   * Checks collisions between poison bubbles thrown by the character and enemies.
   * @param {Array} enemyArr - The array of enemies to check collisions with.
   * @param {number} damage - The damage to inflict on enemies upon collision.
   * @param {object} bubble - The poison bubble object.
   * @param {number} bubbleIdx - The index of the poison bubble in the array.
   * @param {Array} bubblesToRemove - The array to store indices of bubbles to remove.
   */
  handlerEnemyHit(enemyArr, damage, bubble, bubbleIdx, bubblesToRemove) {
    enemyArr.forEach((enemy) => {
      if (bubble.isColliding(enemy) && !enemy.isDead()) {
        bubblesToRemove.push(bubbleIdx);
        enemy.hit(damage);
      }
    });
  }

  /**
   * Handles the collision between a bubble  from  Character and the endboss, causing damage to the end boss.
   * @param {object} bubble - The bubble object.
   */
  handlerEndbossHit(bubble) {
    if (bubble.isColliding(this.level.endboss)) {
      let currentTime = new Date().getTime();
      let timeSinceLastHit = currentTime - this.lastHitTime;
      if (timeSinceLastHit >= 1000) {
        this.lastHitTime = currentTime;
        this.level.endboss.hit(this.collisionDmgWithEndboss);
        this.endBossBar.setPercentage(this.level.endboss.energy);
      }
    }
  }

  /**
   * Checks if enemies are within sight range and triggers their attacks.
   */
  areEnemiesWithinSight() {
    let updateEnemyVisibility = setInterval(() => {
      if (this.character.x > 40 && !pauseGame && !this.level.endboss.isDead())
        this.enemyAttack(this.getAliveEnemies(this.level.pufferFishes), "pufferFish");
      if (this.character.x > 1000 && !pauseGame && !this.level.endboss.isDead())
        this.enemyAttack(this.getAliveEnemies(this.level.dangerousJellies), "jellyDangerous");
    }, 300);
    intervalIds.push(updateEnemyVisibility);
  }

  /**
   * Retrieves the list of alive enemies.
   * @param {Array} enemies - The array of enemies.
   * @returns {Array} - Returns the array of alive enemies.
   */
  getAliveEnemies(enemies) {
    return enemies.filter((enemy) => !enemy.isDead());
  }

  /**
   * Initiates enemy attacks if enemies are within sight range.
   * @param {Array} aliveEnemies - The array of alive enemies.
   * @param {string} fishType - The type of enemy fish.
   */
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

  /**
   * Adds enemy attack objects based on the enemy type.
   * @param {object} enemy - The enemy object.
   * @param {string} fishType - The type of enemy fish.
   */
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

  /**
   * Sets the animation for the enemy fish based on its type.
   * @param {object} fish - The enemy fish object.
   */
  setRightAnimation(fish) {
    if (fish.fishType === "ORANGE") fish.playAnimationOnce(PUFFER_ORANGE_TRANSITION, 120);
    if (fish.fishType === "RED") fish.playAnimationOnce(PUFFER_RED_TRANSITION, 120);
    if (fish.fishType === "GREEN") fish.playAnimationOnce(PUFFER_GREEN_TRANSITION, 120);
  }

  /**
   * Clears the canvas and draws the game elements including background, character, and enemies.
   * Continuously calls itself using requestAnimationFrame for smooth animation.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.drawWorldObjs();
    this.drawItems();
    this.ctx.translate(-this.camera_x, 0);
    this.drawBars();
    this.ctx.translate(this.camera_x, 0);
    this.drawCharacter();
    this.drawEnemies();
    this.drawAttackObjs();
    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }
}
