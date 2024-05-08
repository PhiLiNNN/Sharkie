class EndbossAppear extends MovableObject {
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

  constructor() {
    super().loadImage(this.ENDBOSS_APPEARS[0]);
    this.loadImages(this.ENDBOSS_SWIMMING);
    this.x = 500;
    this.animate();
  }
  animate() {
    setInterval(() => {
      if (this.level.endboss.spawnAnimation) {
        this.playAnimation(this.ENDBOSS_SWIMMING);
      }
    }, 600);
  }
}
