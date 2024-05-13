class Endboss extends MovableObject {
  y = -10;
  height = 400;
  width = 400;
  offsetX = 25;
  offsetY = 140;
  offsetHeight = 100;
  offsetWidth = 70;
  energy = 100;
  world;
  ENDBOSS_APPEARS = [
    "img/2.Enemy/3 Final Enemy/1.Introduce/1.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/2.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/3.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/4.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/5.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/6.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/7.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/8.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/9.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/10.png",
  ];
  ENDBOSS_SWIMMING = [
    "img/2.Enemy/3 Final Enemy/2.floating/1.png",
    "img/2.Enemy/3 Final Enemy/2.floating/2.png",
    "img/2.Enemy/3 Final Enemy/2.floating/3.png",
    "img/2.Enemy/3 Final Enemy/2.floating/4.png",
    "img/2.Enemy/3 Final Enemy/2.floating/5.png",
    "img/2.Enemy/3 Final Enemy/2.floating/6.png",
    "img/2.Enemy/3 Final Enemy/2.floating/7.png",
    "img/2.Enemy/3 Final Enemy/2.floating/8.png",
    "img/2.Enemy/3 Final Enemy/2.floating/9.png",
    "img/2.Enemy/3 Final Enemy/2.floating/10.png",
    "img/2.Enemy/3 Final Enemy/2.floating/11.png",
    "img/2.Enemy/3 Final Enemy/2.floating/12.png",
    "img/2.Enemy/3 Final Enemy/2.floating/13.png",
  ];
  ENDBOSS_HURT = [
    "img/2.Enemy/3 Final Enemy/Hurt/1.png",
    "img/2.Enemy/3 Final Enemy/Hurt/2.png",
    "img/2.Enemy/3 Final Enemy/Hurt/3.png",
    "img/2.Enemy/3 Final Enemy/Hurt/4.png",
  ];
  ENDBOSS_DEAD = [
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png",
  ];

  constructor() {
    super().loadImage(this.ENDBOSS_APPEARS[0]);
    this.loadImages(this.ENDBOSS_SWIMMING);
    this.loadImages(this.ENDBOSS_APPEARS);
    this.loadImages(this.ENDBOSS_HURT);
    this.loadImages(this.ENDBOSS_DEAD);
    this.spawnAnimationPlayed = false;

    this.x = 2100;

    // this.speed = 0.15 + Math.random() * 0.25;
    this.spawnEndboss();
  }

  spawnEndboss() {
    setInterval(() => {
      if (this.spawnAnimation && !this.spawnAnimationPlayed) {
        this.playAnimation(this.ENDBOSS_APPEARS);
        setTimeout(() => {
          this.spawnAnimationPlayed = true;
        }, 786);
      }
    }, 85);
    setInterval(() => {
      if (this.spawnAnimationPlayed) this.animate();
    }, 200);
  }

  animate() {
    if (this.isDead()) {
      let idx = this.currentImage % this.ENDBOSS_DEAD.length;
      if (idx === this.ENDBOSS_DEAD.length - 1) this.deadAnimation = true;
      if (!this.deadAnimation) this.playAnimation(this.ENDBOSS_DEAD);
    } else if (this.isHurt()) this.playAnimation(this.ENDBOSS_HURT);
    else this.playAnimation(this.ENDBOSS_SWIMMING);
  }
}
