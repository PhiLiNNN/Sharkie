class JellyFish extends MovableObject {
  y = Math.random() * 430;
  height = 40;
  width = 40;
  offsetX = 0;
  offsetY = 0;
  offsetHeight = 8;
  offsetWidth = 0;
  JELLY_GREEN = [
    "img/2.Enemy/2 Jelly fish/Super dangerous/Green1.png",
    "img/2.Enemy/2 Jelly fish/Super dangerous/Green2.png",
    "img/2.Enemy/2 Jelly fish/Super dangerous/Green3.png",
  ];
  JELLY_PINK = [
    "img/2.Enemy/2 Jelly fish/Super dangerous/PINK1.png",
    "img/2.Enemy/2 Jelly fish/Super dangerous/PINK2.png",
    "img/2.Enemy/2 Jelly fish/Super dangerous/PINK3.png",
  ];
  JELLY_GREEN_DEAD = [
    "img/2.Enemy/2 Jelly fish/Dead/green/g1.png",
    "img/2.Enemy/2 Jelly fish/Dead/green/g2.png",
    "img/2.Enemy/2 Jelly fish/Dead/green/g3.png",
    "img/2.Enemy/2 Jelly fish/Dead/green/g4.png",
  ];
  JELLY_PINK_DEAD = [
    "img/2.Enemy/2 Jelly fish/Dead/Pink/P1.png",
    "img/2.Enemy/2 Jelly fish/Dead/Pink/P2.png",
    "img/2.Enemy/2 Jelly fish/Dead/Pink/P3.png",
    "img/2.Enemy/2 Jelly fish/Dead/Pink/P4.png",
  ];

  constructor(fishType, fishIndex) {
    super().loadImage(`img/2.Enemy/2 Jelly fish/Super dangerous/${fishType}${fishIndex}.png`);
    this.loadImages(this[`JELLY_${fishType.toUpperCase()}`]);

    this.loadImages(this.JELLY_GREEN_DEAD);
    this.loadImages(this.JELLY_PINK_DEAD);

    this.x = 1800 + Math.random() * 250;
    this.speed = 0.15 + Math.random() * 0.25;
    this.damage = 100;

    this.animate(fishType.toUpperCase());
  }
  animate(fishType) {
    this.moveLeft();

    const animateFunction = () => {
      if (this.isDead()) {
        this.img = this.imageCache[this[`JELLY_${fishType.toUpperCase()}_DEAD`][0]];
        this.y -= 2;
        setTimeout(animateFunction, 20);
      } else {
        this.playAnimation(this[`JELLY_${fishType}`]);
        setTimeout(animateFunction, 200);
      }
    };
    animateFunction();
  }
}
