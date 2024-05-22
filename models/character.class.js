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
  stopPushingBack = true;
  currentTime = new Date().getTime();
  swimming_sound = new Audio("audio/swim.mp3");
  // IMAGES_IDLE = [
  //   "img/1.Sharkie/1.IDLE/1.png",
  //   "img/1.Sharkie/1.IDLE/2.png",
  //   "img/1.Sharkie/1.IDLE/3.png",
  //   "img/1.Sharkie/1.IDLE/4.png",
  //   "img/1.Sharkie/1.IDLE/5.png",
  //   "img/1.Sharkie/1.IDLE/6.png",
  //   "img/1.Sharkie/1.IDLE/7.png",
  //   "img/1.Sharkie/1.IDLE/8.png",
  //   "img/1.Sharkie/1.IDLE/9.png",
  //   "img/1.Sharkie/1.IDLE/10.png",
  //   "img/1.Sharkie/1.IDLE/11.png",
  //   "img/1.Sharkie/1.IDLE/12.png",
  //   "img/1.Sharkie/1.IDLE/13.png",
  //   "img/1.Sharkie/1.IDLE/14.png",
  //   "img/1.Sharkie/1.IDLE/15.png",
  //   "img/1.Sharkie/1.IDLE/16.png",
  //   "img/1.Sharkie/1.IDLE/17.png",
  //   "img/1.Sharkie/1.IDLE/18.png",
  // ];
  IMAGES_SWIMMING = [
    "img/1.Sharkie/3.Swim/1.png",
    "img/1.Sharkie/3.Swim/2.png",
    "img/1.Sharkie/3.Swim/3.png",
    "img/1.Sharkie/3.Swim/4.png",
    "img/1.Sharkie/3.Swim/5.png",
    "img/1.Sharkie/3.Swim/6.png",
  ];
  IMAGES_DEAD = [
    "img/1.Sharkie/6.dead/1.Poisoned/1.png",
    "img/1.Sharkie/6.dead/1.Poisoned/2.png",
    "img/1.Sharkie/6.dead/1.Poisoned/3.png",
    "img/1.Sharkie/6.dead/1.Poisoned/4.png",
    "img/1.Sharkie/6.dead/1.Poisoned/5.png",
    "img/1.Sharkie/6.dead/1.Poisoned/6.png",
    "img/1.Sharkie/6.dead/1.Poisoned/7.png",
    "img/1.Sharkie/6.dead/1.Poisoned/8.png",
    "img/1.Sharkie/6.dead/1.Poisoned/9.png",
    "img/1.Sharkie/6.dead/1.Poisoned/10.png",
    "img/1.Sharkie/6.dead/1.Poisoned/11.png",
    "img/1.Sharkie/6.dead/1.Poisoned/12.png",
  ];
  IMAGES_HURT_BUBBLE = [
    "img/1.Sharkie/5.Hurt/1.Poisoned/1.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/2.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/3.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/4.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/5.png",
  ];
  IMAGES_HURT_ELECTRO = [
    "img/1.Sharkie/5.Hurt/2.Electric shock/1.png",
    "img/1.Sharkie/5.Hurt/2.Electric shock/2.png",
    "img/1.Sharkie/5.Hurt/2.Electric shock/3.png",
  ];
  IMAGES_BUBBLE = [
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png",
  ];
  IMAGES_BUBBLE_POISON = [
    "img/1.Sharkie/4.Attack/Bubble trap/For Whale/1.png",
    "img/1.Sharkie/4.Attack/Bubble trap/For Whale/2.png",
    "img/1.Sharkie/4.Attack/Bubble trap/For Whale/3.png",
    "img/1.Sharkie/4.Attack/Bubble trap/For Whale/4.png",
    "img/1.Sharkie/4.Attack/Bubble trap/For Whale/5.png",
    "img/1.Sharkie/4.Attack/Bubble trap/For Whale/6.png",
    "img/1.Sharkie/4.Attack/Bubble trap/For Whale/7.png",
    "img/1.Sharkie/4.Attack/Bubble trap/For Whale/8.png",
  ];
  IMAGES_SLEEPING = [
    "img/1.Sharkie/2.Long_IDLE/I1.png",
    "img/1.Sharkie/2.Long_IDLE/I2.png",
    "img/1.Sharkie/2.Long_IDLE/I3.png",
    "img/1.Sharkie/2.Long_IDLE/I4.png",
    "img/1.Sharkie/2.Long_IDLE/I5.png",
    "img/1.Sharkie/2.Long_IDLE/I6.png",
    "img/1.Sharkie/2.Long_IDLE/I7.png",
    "img/1.Sharkie/2.Long_IDLE/I8.png",
    "img/1.Sharkie/2.Long_IDLE/I9.png",
    "img/1.Sharkie/2.Long_IDLE/I10.png",
    "img/1.Sharkie/2.Long_IDLE/I11.png",
    "img/1.Sharkie/2.Long_IDLE/I12.png",
    "img/1.Sharkie/2.Long_IDLE/I13.png",
    "img/1.Sharkie/2.Long_IDLE/I14.png",
  ];
  IMAGES_SLEEPING_CONTINUOUSLY = [
    "img/1.Sharkie/2.Long_IDLE/I11.png",
    "img/1.Sharkie/2.Long_IDLE/I12.png",
    "img/1.Sharkie/2.Long_IDLE/I13.png",
    "img/1.Sharkie/2.Long_IDLE/I14.png",
  ];

  constructor() {
    super().loadImage("img/1.Sharkie/1.IDLE/1.png");
    this.loadImages(IMAGES_IDLE);
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT_BUBBLE);
    this.loadImages(this.IMAGES_HURT_ELECTRO);
    this.loadImages(this.IMAGES_BUBBLE);
    this.loadImages(this.IMAGES_BUBBLE_POISON);
    this.loadImages(this.IMAGES_SLEEPING);
    this.loadImages(this.IMAGES_SLEEPING_CONTINUOUSLY);
    this.initializeIntervals();
    this.isBlowBubble = false;
  }

  initializeIntervals() {
    let updateBtns = setInterval(this.handleMovement.bind(this), 10);
    intervalIds.push(updateBtns);
    let updateCharacter = setInterval(this.updateCharacterAnimation.bind(this), 200);
    intervalIds.push(updateCharacter);
    let updateEndbossAppearance = setInterval(this.isCharNearbyEndboss.bind(this), 200);
    intervalIds.push(updateEndbossAppearance);
  }

  handleMovement() {
    this.isSwimming = false;
    if (!pauseGame) {
      // this.swimming_sound.pause();
      let targetCameraX = this.world.camera_x;
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_rightEnd && !this.isDead()) {
        this.x += this.speed;
        this.otherDirection = false;
        targetCameraX = -this.x;
        this.isSwimming = true;
        this.currentTime = new Date().getTime();
        // this.swimming_sound.play();
      }
      if (this.world.keyboard.LEFT && this.x > this.world.level.level_leftEnd && !this.isDead()) {
        this.x -= this.speed;
        this.otherDirection = true;
        targetCameraX = -this.x + 700;
        this.isSwimming = true;
        this.currentTime = new Date().getTime();
      }

      if (this.world.keyboard.UP && this.y > this.world.level.level_topEnd && !this.isDead()) {
        this.y -= this.speed;
        this.isSwimming = true;
        this.currentTime = new Date().getTime();
        // this.swimming_sound.play();
      }
      if (this.world.keyboard.DOWN && this.y < this.world.level.level_bottomEnd && !this.isDead()) {
        this.y += this.speed;
        this.isSwimming = true;
        this.currentTime = new Date().getTime();
        // this.swimming_sound.play();
      }
      this.world.camera_x += (targetCameraX - this.world.camera_x) * 0.01;
    }
  }
  updateCharacterAnimation() {
    if (this.isDead()) this.handleDeadAnimation();
    else if (this.isHurt()) this.handleHurtAnimation();
    else if (this.isCharacterIdle()) this.handleSleepAnimation();
    else if (this.isSwimming) this.playAnimation(this.IMAGES_SWIMMING);
    else this.playAnimation(IMAGES_IDLE);
  }

  isCharNearbyEndboss() {
    if (this.checkEntityDistance(this.world.level.endboss, this.interactionDistanceEndboss))
      this.world.level.endboss.spawnAnimation = true;
  }

  handleDeadAnimation() {
    let idx = this.currentImage % this.IMAGES_DEAD.length;
    if (idx === this.IMAGES_DEAD.length - 1) this.deadAnimation = true;
    if (!this.deadAnimation) {
      this.playAnimation(this.IMAGES_DEAD);
      pauseGame = true;
    }
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
    if (this.sleepImgCounter < this.IMAGES_SLEEPING.length) {
      let path = this.IMAGES_SLEEPING[this.sleepImgCounter];
      this.img = this.imageCache[path];
      this.sleepImgCounter++;
    } else this.playAnimation(this.IMAGES_SLEEPING_CONTINUOUSLY);
  }

  handleHurtAnimation() {
    this.hitFromDangerousJelly
      ? this.playAnimation(this.IMAGES_HURT_ELECTRO)
      : this.playAnimation(this.IMAGES_HURT_BUBBLE);
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
