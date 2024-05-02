class Endboss extends MovableObject {
  y = -10;
  height = 400;
  width = 400;
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

  constructor() {
    super().loadImage(this.ENDBOSS_APPEARS[0]);
    this.loadImages(this.ENDBOSS_APPEARS);
    this.loadImages(this.ENDBOSS_SWIMMING);

    this.x = 1000;
    // this.speed = 0.15 + Math.random() * 0.25;

    this.animate();
  }
  animate() {
    setInterval(() => {
      let idx = this.currentImage % this.ENDBOSS_APPEARS.length;
      if (idx === 9) {
        this.spawnAnimation = false;
      }
      if (this.spawnAnimation) {
        this.playAnimation(this.ENDBOSS_APPEARS);
      } else this.playAnimation(this.ENDBOSS_SWIMMING);
    }, 200);
  }
}
