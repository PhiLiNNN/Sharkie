class Character extends MovableObject {
  height = 190;
  width = 190;
  x = 40;
  y = 130;
  offsetX = 35;
  offsetY = 100;
  offsetHeight = 150;
  offsetWidth = 70;
  deadAnimation = false;
  speed = 3;
  world;
  energy = 1000;
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
  IMAGES_HURT = [
    "img/1.Sharkie/5.Hurt/1.Poisoned/1.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/2.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/3.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/4.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/5.png",
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

  constructor() {
    super().loadImage("img/1.Sharkie/1.IDLE/1.png");
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_BUBBLE);
    this.animate();
    this.isBlowBubble = false;
  }

  animate() {
    setInterval(() => {
      this.swimming_sound.pause();
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_rightEnd && !this.isDead()) {
        this.x += this.speed;
        this.otherDirection = false;
        // this.swimming_sound.play();
      }
      if (this.world.keyboard.LEFT && this.x > this.world.level.level_leftEnd && !this.isDead()) {
        this.x -= this.speed;
        this.otherDirection = true;
        // this.swimming_sound.play();
      }
      this.world.camera_x = -this.x + 100;
      if (this.world.keyboard.UP && this.y > this.world.level.level_topEnd && !this.isDead()) {
        this.y -= this.speed;
        // this.swimming_sound.play();
      }
      if (this.world.keyboard.DOWN && this.y < this.world.level.level_bottomEnd && !this.isDead()) {
        this.y += this.speed;
        // this.swimming_sound.play();
      }
    }, 25);

    setInterval(() => {
      if (this.isDead()) {
        let idx = this.currentImage % this.IMAGES_DEAD.length;
        if (idx === this.IMAGES_DEAD.length - 1) {
          this.deadAnimation = true;
        }
        if (!this.deadAnimation) {
          this.playAnimation(this.IMAGES_DEAD);
        }
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.checkEntityDistance(this.world.level.endboss)) {
        this.world.level.endboss.spawnAnimation = true;
      } else {
        this.playAnimation(this.IMAGES_SWIMMING);
      }
    }, 200);
  }
}
