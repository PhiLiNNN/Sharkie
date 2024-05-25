/**
 * @class Character
 * @extends MovableObject
 * Represents the main character in the game.
 */
class Character extends MovableObject {
  world;
  energy = characterEnergy;
  height = 190;
  width = 190;
  x = 40;
  y = 130;
  offsetX = 60;
  offsetY = 105;
  offsetHeight = 160;
  offsetWidth = 130;
  speed = 1.6;
  bubbleSpeed = 10;
  poison_energy = 0;
  interactionDistanceEndboss = 500;
  longIdleTime = 10000;
  sleepImgCounter = 0;
  isSwimming = false;
  deadAnimation = false;
  hitFromDangerousJelly = false;
  isEndbossSoundPlaying = false;
  isSleepingPlaying = false;
  isWinLosePlaying = false;
  stopPushingBack = true;
  currentTime = new Date().getTime();

  /**
   * Creates an instance of Character.
   */
  constructor() {
    super().loadImage("img/1.Sharkie/1.IDLE/1.png");
    this.loadImages(CHARACTER_IDLE);
    this.loadImages(CHARACTER_SWIMMING);
    this.loadImages(CHARACTER_DEAD);
    this.loadImages(CHARACTER_BUBBLE_HURT);
    this.loadImages(CHARACTER_ELECTRO_HURT);
    this.loadImages(CHARACTER_BUBBLE_SHOT);
    this.loadImages(CHARACTER_POISON_SHOT);
    this.loadImages(CHARACTER_SLEEPING);
    this.loadImages(CHARACTER_SLEEPING_CONTINUOUSLY);
    this.initializeIntervals();
  }

  /**
   * Initializes the intervals for character movement and animation.
   */
  initializeIntervals() {
    let updateBtns = setInterval(this.handleMovement.bind(this), 10);
    intervalIds.push(updateBtns);
    let updateCharacter = setInterval(this.updateCharacterAnimation.bind(this), 200);
    intervalIds.push(updateCharacter);
    let updateSwimSound = setInterval(this.playSwimSound.bind(this), 600);
    intervalIds.push(updateSwimSound);
  }

  /**
   * Plays the swimming sound if the character is swimming.
   */
  playSwimSound() {
    if (this.isSwimming) playSound(swimming_sound, 0.08);
  }

  /**
   * Plays the lose sound if the character is defeated.
   */
  playLoseSound() {
    if (!this.isWinLosePlaying) {
      stopSound(endboss_fight);
      playSound(lose, 0.4);
      this.isWinLosePlaying = true;
    }
  }

  /**
   * Plays the end boss sound when the end boss is spawned.
   */
  playEndbossSound() {
    if (this.world.level.endboss.spawnAnimation && !this.isEndbossSoundPlaying) {
      stopSound(underwater);
      playSound(endboss_fight, 0.4, true);
      this.isEndbossSoundPlaying = true;
    }
  }

  /**
   * Plays the hurt sound based on the character's condition.
   */
  playHurtSound() {
    if (this.isHurt() && !this.hitFromDangerousJelly) {
      character_bubble_hurt.volume = 0.2;
      character_bubble_hurt.play();
    } else if (this.isHurt() && this.hitFromDangerousJelly) {
      character_electro_hurt.volume = 0.2;
      character_electro_hurt.play();
    }
  }

  /**
   * Handles character movement based on keyboard input.
   */
  handleMovement() {
    this.isSwimming = false;
    if (!pauseGame && !this.isDead()) {
      this.moveCharacterRight();
      this.moveCharacterLeft();
      this.moveCharacterUp();
      this.moveCharacterDown();
      this.updateCamera();
    }
    this.playHurtSound();
  }

  /**
   * Moves the character to the right if the RIGHT key is pressed.
   */
  moveCharacterRight() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_rightEnd) {
      this.x += this.speed;
      this.otherDirection = false;
      this.isSwimming = true;
      this.currentTime = new Date().getTime();
    }
  }

  /**
   * Moves the character to the left if the LEFT key is pressed.
   */
  moveCharacterLeft() {
    if (this.world.keyboard.LEFT && this.x > this.world.level.level_leftEnd) {
      this.x -= this.speed;
      this.otherDirection = true;
      this.isSwimming = true;
      this.currentTime = new Date().getTime();
    }
  }

  /**
   * Moves the character up if the UP key is pressed.
   */
  moveCharacterUp() {
    if (this.world.keyboard.UP && this.y > this.world.level.level_topEnd) {
      this.y -= this.speed;
      this.isSwimming = true;
      this.currentTime = new Date().getTime();
    }
  }

  /**
   * Moves the character down if the DOWN key is pressed.
   */
  moveCharacterDown() {
    if (this.world.keyboard.DOWN && this.y < this.world.level.level_bottomEnd) {
      this.y += this.speed;
      this.isSwimming = true;
      this.currentTime = new Date().getTime();
    }
  }

  /**
   * Updates the camera position based on the character's movement.
   */
  updateCamera() {
    let targetCameraX = this.otherDirection ? -this.x + 700 : -this.x;
    this.world.camera_x += (targetCameraX - this.world.camera_x) * 0.01;
  }

  /**
   * Updates the character's animation based on its state.
   */
  updateCharacterAnimation() {
    if (this.isDead()) this.handleDeadAnimation();
    else if (this.isHurt()) this.handleHurtAnimation();
    else if (this.isCharacterIdle()) this.handleSleepAnimation();
    else if (this.isSwimming) this.handleSwimAnimation();
    else this.playAnimation(CHARACTER_IDLE);
    if (this.checkEntityDistance(this.world.level.endboss, this.interactionDistanceEndboss))
      this.world.level.endboss.spawnAnimation = true;
    this.playEndbossSound();
  }

  /**
   * Handles the swim animation of the character.
   */
  handleSwimAnimation() {
    stopSound(snore);
    this.isSleepingPlaying = false;
    this.playAnimation(CHARACTER_SWIMMING);
  }

  /**
   * Handles the dead animation of the character.
   */
  handleDeadAnimation() {
    stopSound(snore);
    this.isSleepingPlaying = false;
    let idx = this.currentImage % CHARACTER_DEAD.length;
    if (idx === CHARACTER_DEAD.length - 1) this.deadAnimation = true;
    if (!this.deadAnimation) {
      this.playAnimation(CHARACTER_DEAD);
      pauseGame = true;
    }
    stopSound(underwater);
    stopSound(endboss_fight);
    this.playLoseSound();
    toggleVisibility("pause-menu-icon-id", true);
    toggleVisibility("game-over-id", false);
    toggleVisibility("exit-gameAfterDead-btn-id", false);
  }

  /**
   * Checks if the character is idle.
   * @returns {boolean} True if the character is idle, otherwise false.
   */
  isCharacterIdle() {
    if (!pauseGame) {
      let isSleeping = new Date().getTime() - this.currentTime > this.longIdleTime;
      if (isSleeping) return true;
      else this.sleepImgCounter = 0;
    }
  }

  /**
   * Plays the sleeping sound of the character.
   */
  playSleepSound() {
    if (!this.isSleepingPlaying) {
      playSound(snore, 0.8, true);
      this.isSleepingPlaying = true;
    }
  }

  /**
   * Handles the sleep animation of the character.
   */
  handleSleepAnimation() {
    this.playSleepSound();
    if (this.sleepImgCounter < CHARACTER_SLEEPING.length) {
      let path = CHARACTER_SLEEPING[this.sleepImgCounter];
      this.img = this.imageCache[path];
      this.sleepImgCounter++;
    } else this.playAnimation(CHARACTER_SLEEPING_CONTINUOUSLY);
  }

  /**
   * Handles the hurt animation of the character.
   */
  handleHurtAnimation() {
    stopSound(snore);
    this.isSleepingPlaying = false;
    this.hitFromDangerousJelly
      ? this.playAnimation(CHARACTER_ELECTRO_HURT)
      : this.playAnimation(CHARACTER_BUBBLE_HURT);
  }

  /**
   * Pushes the character back.
   */
  pushCharacterBack() {
    let startPos = this.x;
    let endPosLeft = startPos - 200;
    let endPosRight = startPos + 200;
    this.stopPushingBack = true;
    const pushCharInt = setInterval(() => {
      if (this.stopPushingBack && !pauseGame) {
        const dir = this.world.level.endboss.otherDirection ? 1 : -1;
        const endPos = this.world.level.endboss.otherDirection ? endPosRight : endPosLeft;
        this.pushCharacter(dir, endPos, pushCharInt);
      }
    }, 10);
  }

  /**
   * Pushes the character in a specified direction until a boundary is reached.
   * @param {number} dir - The direction of movement (1 for right, -1 for left).
   * @param {number} endPos - The end position to stop pushing.
   * @param {number} intervalId - The interval ID for clearing.
   */
  pushCharacter(dir, endPos, intervalId) {
    this.x += dir * 3.0;
    this.world.camera_x -= dir * 3.0;
    if (this.isBeyondRightBoundary(dir, endPos) || this.isBeyondLeftBoundary(dir, endPos)) {
      this.stopPushingBack = false;
      clearInterval(intervalId);
      if (this.isDead || this.world.level.endboss.isDead()) clearInterval(intervalId);
    }
  }

  /**
   * Checks if the character has moved beyond the right boundary.
   * @param {number} dir - The direction of movement (1 for right, -1 for left).
   * @param {number} endPos - The end position to check against.
   * @returns {boolean} True if the character has moved beyond the right boundary, otherwise false.
   */
  isBeyondRightBoundary(dir, endPos) {
    return dir > 0 && (this.x >= endPos || this.x > this.world.level.level_rightEnd);
  }

  /**
   * Checks if the character has moved beyond the left boundary.
   * @param {number} dir - The direction of movement (1 for right, -1 for left).
   * @param {number} endPos - The end position to check against.
   * @returns {boolean} True if the character has moved beyond the left boundary, otherwise false.
   */
  isBeyondLeftBoundary(dir, endPos) {
    return dir < 0 && (this.x <= endPos || this.x < this.world.level.level_leftEnd);
  }
}
