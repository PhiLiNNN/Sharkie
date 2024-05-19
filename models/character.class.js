class Character extends MovableObject {
  height = 190;
  width = 190;
  x = 40;
  y = 130;

  offsetX = 60;
  offsetY = 105;
  offsetHeight = 160;
  offsetWidth = 130;
  deadAnimation = false;
  speed = 4;
  world;
  bubbleSpeed = 10;
  energy = 100;
  poison_energy = 0;
  hitFromDangerousJelly = false;
  stopPushingBack = true;
  interactionDistanceEndboss = 500;
  swimming_sound = new Audio("audio/swim.mp3");
  IMAGES_SWIMMING = [
    "img/1.Sharkie/1.IDLE/1.png",
    "img/1.Sharkie/1.IDLE/2.png",
    "img/1.Sharkie/1.IDLE/3.png",
    "img/1.Sharkie/1.IDLE/4.png",
    "img/1.Sharkie/1.IDLE/5.png",
    "img/1.Sharkie/1.IDLE/6.png",
    "img/1.Sharkie/1.IDLE/7.png",
    "img/1.Sharkie/1.IDLE/8.png",
    "img/1.Sharkie/1.IDLE/9.png",
    "img/1.Sharkie/1.IDLE/10.png",
    "img/1.Sharkie/1.IDLE/11.png",
    "img/1.Sharkie/1.IDLE/12.png",
    "img/1.Sharkie/1.IDLE/13.png",
    "img/1.Sharkie/1.IDLE/14.png",
    "img/1.Sharkie/1.IDLE/15.png",
    "img/1.Sharkie/1.IDLE/16.png",
    "img/1.Sharkie/1.IDLE/17.png",
    "img/1.Sharkie/1.IDLE/18.png",
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

  constructor() {
    super().loadImage("img/1.Sharkie/1.IDLE/1.png");
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT_BUBBLE);
    this.loadImages(this.IMAGES_HURT_ELECTRO);
    this.loadImages(this.IMAGES_BUBBLE);
    this.loadImages(this.IMAGES_BUBBLE_POISON);
    this.animate();
    this.isBlowBubble = false;
  }

  animate() {
    let updateBtns = setInterval(() => {
      if (!pauseGame) {
        this.swimming_sound.pause();
        let targetCameraX = this.world.camera_x;
        if (
          this.world.keyboard.RIGHT &&
          this.x < this.world.level.level_rightEnd &&
          !this.isDead()
        ) {
          this.x += this.speed;
          this.otherDirection = false;
          targetCameraX = -this.x;

          // this.swimming_sound.play();
        }
        if (this.world.keyboard.LEFT && this.x > this.world.level.level_leftEnd && !this.isDead()) {
          this.x -= this.speed;
          this.otherDirection = true;
          targetCameraX = -this.x + 800;
        }

        if (this.world.keyboard.UP && this.y > this.world.level.level_topEnd && !this.isDead()) {
          this.y -= this.speed;
          // this.swimming_sound.play();
        }
        if (
          this.world.keyboard.DOWN &&
          this.y < this.world.level.level_bottomEnd &&
          !this.isDead()
        ) {
          this.y += this.speed;
          // this.swimming_sound.play();
        }
        this.world.camera_x += (targetCameraX - this.world.camera_x) * 0.02;
      }
    }, 25);
    intervalIds.push(updateBtns);

    let updateCharacter = setInterval(() => {
      if (this.isDead() && !pauseGame) {
        let idx = this.currentImage % this.IMAGES_DEAD.length;
        if (idx === this.IMAGES_DEAD.length - 1) {
          this.deadAnimation = true;
        }
        if (!this.deadAnimation) {
          this.playAnimation(this.IMAGES_DEAD);
        }
      } else if (this.isHurt()) {
        if (this.hitFromDangerousJelly) {
          this.playAnimation(this.IMAGES_HURT_ELECTRO);
        } else {
          this.playAnimation(this.IMAGES_HURT_BUBBLE);
        }
      } else if (
        this.checkEntityDistance(this.world.level.endboss, this.interactionDistanceEndboss)
      ) {
        this.world.level.endboss.spawnAnimation = true;
        this.playAnimation(this.IMAGES_SWIMMING);
      } else {
        this.playAnimation(this.IMAGES_SWIMMING);
      }
    }, 200);
    intervalIds.push(updateCharacter);
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
