class Character extends MovableObject {
  world;
  energy = gameDifficulty;
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
  longIdleTime = 5000;
  sleepImgCounter = 0;
  isSwimming = false;
  deadAnimation = false;
  hitFromDangerousJelly = false;
  isEndbossSoundPlaying = false;
  isWinLosePlaying = false;
  stopPushingBack = true;
  currentTime = new Date().getTime();
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
    this.isBlowBubble = false;
  }

  initializeIntervals() {
    let updateBtns = setInterval(this.handleMovement.bind(this), 10);
    intervalIds.push(updateBtns);
    let updateCharacter = setInterval(this.updateCharacterAnimation.bind(this), 200);
    intervalIds.push(updateCharacter);
    let updateSwimSound = setInterval(this.playSwimSound.bind(this), 600);
    intervalIds.push(updateSwimSound);
  }

  playSwimSound() {
    if (this.isSwimming) playSound(swimming_sound, 0.08);
  }

  playLoseSound() {
    if (!this.isWinLosePlaying) {
      stopSound(endboss_fight);
      playSound(lose, 0.4);
      this.isWinLosePlaying = true;
    }
  }

  playEndbossSound() {
    if (this.world.level.endboss.spawnAnimation && !this.isEndbossSoundPlaying) {
      stopSound(underwater);
      playSound(endboss_fight, 0.4, true);
      this.isEndbossSoundPlaying = true;
    }
  }
  playHurtSound() {
    if (this.isHurt() && !this.hitFromDangerousJelly) {
      character_bubble_hurt.volume = 0.2;
      character_bubble_hurt.play();
    } else if (this.isHurt() && this.hitFromDangerousJelly) {
      character_electro_hurt.volume = 0.2;
      character_electro_hurt.play();
    }
  }

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

  moveCharacterRight() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_rightEnd) {
      this.x += this.speed;
      this.otherDirection = false;
      this.isSwimming = true;
      this.currentTime = new Date().getTime();
    }
  }

  moveCharacterLeft() {
    if (this.world.keyboard.LEFT && this.x > this.world.level.level_leftEnd) {
      this.x -= this.speed;
      this.otherDirection = true;
      this.isSwimming = true;
      this.currentTime = new Date().getTime();
    }
  }

  moveCharacterUp() {
    if (this.world.keyboard.UP && this.y > this.world.level.level_topEnd) {
      this.y -= this.speed;
      this.isSwimming = true;
      this.currentTime = new Date().getTime();
    }
  }

  moveCharacterDown() {
    if (this.world.keyboard.DOWN && this.y < this.world.level.level_bottomEnd) {
      this.y += this.speed;
      this.isSwimming = true;
      this.currentTime = new Date().getTime();
    }
  }
  updateCamera() {
    let targetCameraX = this.otherDirection ? -this.x + 700 : -this.x;
    this.world.camera_x += (targetCameraX - this.world.camera_x) * 0.01;
  }

  updateCharacterAnimation() {
    if (this.isDead()) this.handleDeadAnimation();
    else if (this.isHurt()) this.handleHurtAnimation();
    else if (this.isCharacterIdle()) this.handleSleepAnimation();
    else if (this.isSwimming) this.playAnimation(CHARACTER_SWIMMING);
    else this.playAnimation(CHARACTER_IDLE);
    if (this.checkEntityDistance(this.world.level.endboss, this.interactionDistanceEndboss))
      this.world.level.endboss.spawnAnimation = true;
    this.playEndbossSound();
  }

  handleDeadAnimation() {
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

  isCharacterIdle() {
    if (!pauseGame) {
      let isSleeping = new Date().getTime() - this.currentTime > this.longIdleTime;
      if (isSleeping) return true;
      else this.sleepImgCounter = 0;
    }
  }

  handleSleepAnimation() {
    if (this.sleepImgCounter < CHARACTER_SLEEPING.length) {
      let path = CHARACTER_SLEEPING[this.sleepImgCounter];
      this.img = this.imageCache[path];
      this.sleepImgCounter++;
    } else this.playAnimation(CHARACTER_SLEEPING_CONTINUOUSLY);
  }

  handleHurtAnimation() {
    this.hitFromDangerousJelly
      ? this.playAnimation(CHARACTER_ELECTRO_HURT)
      : this.playAnimation(CHARACTER_BUBBLE_HURT);
  }

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

  pushCharacter(dir, endPos, intervalId) {
    this.x += dir * 3.0;
    this.world.camera_x -= dir * 3.0;
    if (this.isBeyondRightBoundary(dir, endPos) || this.isBeyondLeftBoundary(dir, endPos)) {
      this.stopPushingBack = false;
      clearInterval(intervalId);
      if (this.isDead || this.world.level.endboss.isDead()) clearInterval(intervalId);
    }
  }

  isBeyondRightBoundary(dir, endPos) {
    return dir > 0 && (this.x >= endPos || this.x > this.world.level.level_rightEnd);
  }

  isBeyondLeftBoundary(dir, endPos) {
    return dir < 0 && (this.x <= endPos || this.x < this.world.level.level_leftEnd);
  }
}
