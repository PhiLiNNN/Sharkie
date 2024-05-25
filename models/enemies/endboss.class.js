/**
 * @class Endboss
 * @extends MovableObject
 * Represents the end boss in the game.
 */
class Endboss extends MovableObject {
  y = -10;
  height = 350;
  width = 350;
  offsetX = 25;
  offsetY = 60;
  offsetHeight = 110;
  offsetWidth = 40;
  energy = 100;
  speed = 8.0;
  deadImgCounter = 0;
  world;
  isWinSoundPlaying = false;

  /**
   * Creates an instance of Endboss.
   * @param {number} x - The initial x-coordinate of the end boss.
   */
  constructor(x) {
    super().loadImage(ENDBOSS_APPEARS[0]);
    this.loadImages(ENDBOSS_SWIMMING);
    this.loadImages(ENDBOSS_APPEARS);
    this.loadImages(ENDBOSS_HURT);
    this.loadImages(ENDBOSS_DEAD);
    this.loadImages(ENDBOSS_ATTACK);
    this.spawnAnimationPlayed = false;
    this.x = x;
    this.spawnEndboss();
    this.moveEndboss();
  }

  /**
   * Plays the spawn animation for the end boss.
   */
  spawnEndboss() {
    let updateSpawnAnimation = setInterval(() => {
      if (this.spawnAnimation && !this.spawnAnimationPlayed) {
        this.playAnimation(ENDBOSS_APPEARS);
        setTimeout(() => (this.spawnAnimationPlayed = true), 786);
      }
    }, 85);
    intervalIds.push(updateSpawnAnimation);
  }

  /**
   * Moves the end boss towards the character.
   */
  moveEndboss() {
    let updateMovToCha;
    let updateMoveEndboss = setInterval(() => {
      if (this.spawnAnimationPlayed && !pauseGame) {
        this.animate();
        if (!updateMovToCha) {
          updateMovToCha = setInterval(() => {
            if (!this.isDead() && !pauseGame) this.moveToCharacter();
          }, 100);
          intervalIds.push(updateMovToCha);
        }
      }
    }, 200);
    intervalIds.push(updateMoveEndboss);
  }

  /**
   * Animates the end boss.
   */
  animate() {
    if (this.isDead()) this.handlerEndbossDead();
    else if (this.isHurt()) this.handlerEndbossHurt();
    else this.playAnimation(ENDBOSS_SWIMMING);
  }

  /**
   * Handles the animation when the end boss is hurt.
   */
  handlerEndbossHurt() {
    this.playAnimation(ENDBOSS_HURT);
    punch.volume = 0.2;
    punch.play();
  }

  /**
   * Handles the animation when the end boss is dead.
   */
  handlerEndbossDead() {
    this.playDeadAnimation();
    this.showWinScreen();
    this.letEndbossSinkToGround();
    this.playWinSound();
    toggleVisibility("pause-menu-icon-id", true);
  }

  /**
   * Plays the dead animation for the end boss.
   */
  playDeadAnimation() {
    if (this.deadImgCounter < ENDBOSS_DEAD.length) {
      let path = ENDBOSS_DEAD[this.deadImgCounter];
      this.img = this.imageCache[path];
      this.deadImgCounter++;
    } else pauseGame = true;
  }

  /**
   * Plays the win sound when the end boss is dead.
   */
  playWinSound() {
    if (this.isDead() && !this.isWinSoundPlaying) {
      stopSound(endboss_fight);
      playSound(win, 0.6);
      this.isWinSoundPlaying = true;
      toggleVisibility("pause-menu-icon-id", true);
    }
  }

  /**
   * Shows the win screen when the end boss is dead.
   */
  showWinScreen() {
    toggleVisibility("you-win-id", false);
    setTimeout(() => toggleVisibility("you-win-id", true, "visible"), 200);
  }

  /**
   * Lets the end boss sink to the ground after dying.
   */
  letEndbossSinkToGround() {
    setInterval(() => {
      const updateSinkToGround = setInterval(() => {
        this.y += 0.05;
        if (this.y >= 220) {
          this.y = 220;
          clearInterval(updateSinkToGround);
        }
      }, 20);
    }, 300);
  }

  /**
   * Moves the end boss towards the character.
   */
  moveToCharacter() {
    if (this.world.character.isDead() || this.isDead()) return;
    let dx = this.world.character.x - this.x - 100;
    let dy = this.world.character.y - this.y - 100;
    let distance = Math.sqrt(dx * dx + dy * dy);
    this.otherDirection = dx >= 0;
    if (dx >= -270 && dx <= 230 && dy <= 100 && dy >= -110) this.handlerCharacterEndbossCollision();
    dx /= distance;
    dy /= distance;
    this.x += dx * this.speed;
    this.y += dy * this.speed;
  }

  /**
   * Handles collision between the character and the end boss.
   */
  handlerCharacterEndbossCollision() {
    let currentTime = new Date().getTime();
    let timeSinceLastHit = currentTime - this.world.lastHitTime;
    this.world.character.currentTime = currentTime;
    if (timeSinceLastHit >= 1000) {
      this.world.lastHitTime = currentTime;
      this.playAnimationOnce(ENDBOSS_ATTACK, 100);
      setTimeout(() => {
        playSound(bite, 0.4);
        this.world.character.pushCharacterBack();
        this.world.character.hit(this.world.collisionDmgWithEndboss);
        this.world.statusBar.setPercentage(this.world.character.energy);
      }, 400);
    }
  }
}
