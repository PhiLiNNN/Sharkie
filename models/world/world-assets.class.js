/**
 * @class WorldAssets
 * Represents the assets of the class world.
 */
class WorldAssets {
  /**
   * Handles the primary and secondary attack actions on mobile devices.
   * @param {number} lastClickTime The timestamp of the last click action.
   */
  handlerMobileBubbles(lastClickTime) {
    setInterval(() => {
      const currentTime = new Date().getTime();
      if (this.isMobilePrimaryAttackActionReady(currentTime, lastClickTime)) {
        this.executePrimaryAttack();
        lastClickTime = currentTime;
        this.keyboard.PRIMARY = false;
        this.character.currentTime = currentTime;
      } else if (this.isMobileSecondaryAttackActionReady(currentTime, lastClickTime)) {
        this.executeSecondaryAttack();
        lastClickTime = currentTime;
        this.keyboard.SECONDARY = false;
        this.character.currentTime = currentTime;
      }
    }, 25);
  }

  /**
   * Handles the primary and secondary attack actions on desktop devices.
   * @param {number} lastClickTime The timestamp of the last click action.
   */
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

  /**
   * Executes the attack action and creates a new throwable object.
   * @param {Array} arr The array to which the new throwable object will be added.
   * @param {boolean} bool A boolean indicating the type of attack (primary or secondary).
   */
  executeAttack(arr, bool) {
    setTimeout(() => {
      stopSound(snore);
      this.character.isSleepingPlaying = false;
      playSound(character_shot, 0.2);
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

  /**
   * Executes the primary attack action.
   */
  executePrimaryAttack() {
    this.character.playAnimationOnce(CHARACTER_BUBBLE_SHOT, 50);
    this.executeAttack(this.throwableObjsCharacter, false);
  }

  /**
   * Executes the secondary attack action.
   */
  executeSecondaryAttack() {
    this.character.reducePoisonEnergy();
    this.poisonBar.setPercentage(this.character.poison_energy);
    this.character.playAnimationOnce(CHARACTER_POISON_SHOT, 50);
    this.executeAttack(this.throwablePoisonObjsCharacter, true);
  }

  /**
   * Checks if the secondary attack action is ready on desktop devices.
   * @param {object} event The event object representing the mouse event.
   * @param {number} currentTime The current timestamp.
   * @param {number} lastClickTime The timestamp of the last click action.
   * @returns {boolean} Indicates whether the secondary attack action is ready.
   */
  isDesktopSecondaryAttackActionReady(event, currentTime, lastClickTime) {
    return (
      event.button === 2 &&
      currentTime - lastClickTime >= 500 &&
      this.character.poison_energy !== 0 &&
      !pauseGame &&
      !this.character.isHurt()
    );
  }

  /**
   * Checks if the primary attack action is ready on desktop devices.
   * @param {object} event The event object representing the mouse event.
   * @param {number} currentTime The current timestamp.
   * @param {number} lastClickTime The timestamp of the last click action.
   * @returns {boolean} Indicates whether the primary attack action is ready.
   */
  isDesktopPrimaryAttackActionReady(event, currentTime, lastClickTime) {
    return (
      event.button === 0 &&
      currentTime - lastClickTime >= 500 &&
      !pauseGame &&
      !this.character.isHurt()
    );
  }

  /**
   * Checks if the secondary attack action is ready on mobile devices.
   * @param {number} currentTime The current timestamp.
   * @param {number} lastClickTime The timestamp of the last click action.
   * @returns {boolean} Indicates whether the secondary attack action is ready.
   */
  isMobileSecondaryAttackActionReady(currentTime, lastClickTime) {
    return (
      this.keyboard.SECONDARY &&
      currentTime - lastClickTime >= 500 &&
      this.character.poison_energy !== 0 &&
      !pauseGame &&
      !this.character.isHurt()
    );
  }

  /**
   * Checks if the primary attack action is ready on mobile devices.
   * @param {number} currentTime The current timestamp.
   * @param {number} lastClickTime The timestamp of the last click action.
   * @returns {boolean} Indicates whether the primary attack action is ready.
   */
  isMobilePrimaryAttackActionReady(currentTime, lastClickTime) {
    return (
      this.keyboard.PRIMARY &&
      currentTime - lastClickTime >= 500 &&
      !pauseGame &&
      !this.character.isHurt()
    );
  }

  /**
   * Checks if the character is colliding with a collectible item.
   * @param {object} item The collectible item object.
   * @param {string} itemType The type of the collectible item.
   * @returns {boolean} Indicates whether the character is colliding with the item.
   */
  isCollectionItem(item, itemType) {
    return this.character.isColliding(item) && this.isItemValid(itemType) && !pauseGame;
  }

  /**
   * Checks if the item is valid for collection.
   * @param {string} itemType The type of the collectible item.
   * @returns {boolean} Indicates whether the item is valid for collection.
   */
  isItemValid(itemType) {
    return (
      (itemType === "poison" && this.character.poison_energy !== 100) ||
      (itemType === "heart" && this.character.energy !== 100)
    );
  }

  /**
   * Sets the character's status when colliding with a dangerous jellyfish.
   * @param {object} enemy The enemy object the character is colliding with.
   */
  isCharColWithJellyDangerousFish(enemy) {
    if (enemy instanceof JellyDangerous) this.character.hitFromDangerousJelly = true;
    else this.character.hitFromDangerousJelly = false;
  }

  /**
   * Sets the character's status when hit by a dangerous jellyfish's attack.
   * @param {object} enemyShot The enemy's attack object.
   */
  isCharHitByJellyDangerousFish(enemyShot) {
    if (enemyShot instanceof JellyDangerousFishAttack) this.character.hitFromDangerousJelly = true;
    else this.character.hitFromDangerousJelly = false;
  }

  /**
   * Checks if the bubble is colliding with the end boss.
   * @param {object} bubble The bubble object.
   * @returns {boolean} Indicates whether the bubble is colliding with the end boss.
   */
  isCollidingWithEndBoss(bubble) {
    return (
      bubble.isColliding(this.level.endboss) &&
      !this.level.endboss.isDead() &&
      this.level.endboss.spawnAnimation
    );
  }

  /**
   * Removes bubbles from the array of throwable objects.
   * @param {Array} arr The array containing the indices of bubbles to remove.
   * @param {Array} allBubbles The array of all throwable bubble objects.
   */
  removeBubbles(arr, allBubbles) {
    arr.sort((a, b) => b - a);
    arr.forEach((idx) => {
      allBubbles.splice(idx, 1);
    });
  }

  /**
   * Checks if a shot is outside the character's range or within the game screen.
   * @param {object} shot - The shot object.
   * @returns {boolean} - Returns true if the shot is outside the character's range or within the game screen.
   */
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

  /**
   * Checks the keyboard input to determine the swim direction of the character.
   */
  checkSwimDirection() {
    let updateSwimDir = setInterval(() => {
      if (this.keyboard.RIGHT) this.isSwimmingLeft = false;
      if (this.keyboard.LEFT) this.isSwimmingLeft = true;
    }, 25);
    intervalIds.push(updateSwimDir);
  }

  /**
   * Draws the background and border objects of the game world.
   */
  drawWorldObjs() {
    this.addObjectsToMap(this.level.backgroundObject);
    this.addToMap(this.level.leftBorder);
    this.addToMap(this.level.rightBorder);
  }

  /**
   * Draws the items (poison and heart) in the game world.
   */
  drawItems() {
    this.addObjectsToMap(this.level.poisonItems);
    this.addObjectsToMap(this.level.heartItems);
  }

  /**
   * Draws the status bar and poison bar.
   */
  drawBars() {
    if (this.level.endboss.spawnAnimation) this.addToMap(this.endBossBar);
    this.addToMap(this.statusBar);
    this.addToMap(this.poisonBar);
  }

  /**
   * Draws the character in the game world.
   */
  drawCharacter() {
    this.addToMap(this.character);
  }

  /**
   * Draws the enemies (regular jellies, dangerous jellies, and puffer fishes) in the game world.
   */
  drawEnemies() {
    if (this.level.endboss.spawnAnimation) this.addToMap(this.level.endboss);
    this.addObjectsToMap(this.level.regularJellies);
    this.addObjectsToMap(this.level.dangerousJellies);
    this.addObjectsToMap(this.level.pufferFishes);
  }

  /**
   * Draws the attack objects (thrown by character or enemies) in the game world.
   */
  drawAttackObjs() {
    this.addObjectsToMap(this.throwableObjsCharacter);
    this.addObjectsToMap(this.throwablePoisonObjsCharacter);
    this.addObjectsToMap(this.throwableObjsPuffer);
    this.addObjectsToMap(this.throwableObjsJellyDangerous);
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
    if (this.drawFrame) mo.drawFrame(this.ctx);
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
