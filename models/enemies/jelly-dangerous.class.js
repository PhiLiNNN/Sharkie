class JellyDangerous extends MovableObject {
  y;
  height = 50;
  width = 50;
  offsetX = 0;
  offsetY = 0;
  offsetHeight = 8;
  offsetWidth = 0;
  JELLY_GREEN = [
    "img/2.Enemy/2 Jelly fish/Super dangerous/GREEN1.png",
    "img/2.Enemy/2 Jelly fish/Super dangerous/GREEN2.png",
    "img/2.Enemy/2 Jelly fish/Super dangerous/GREEN3.png",
    "img/2.Enemy/2 Jelly fish/Super dangerous/GREEN4.png",
  ];
  JELLY_PINK = [
    "img/2.Enemy/2 Jelly fish/Super dangerous/PINK1.png",
    "img/2.Enemy/2 Jelly fish/Super dangerous/PINK2.png",
    "img/2.Enemy/2 Jelly fish/Super dangerous/PINK3.png",
    "img/2.Enemy/2 Jelly fish/Super dangerous/PINK4.png",
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

  constructor(fishType, fishIndex, y) {
    super().loadImage(`img/2.Enemy/2 Jelly fish/Super dangerous/${fishType}${fishIndex}.png`);
    this.loadImages(this[`JELLY_${fishType.toUpperCase()}`]);
    this.loadImages(this.JELLY_GREEN_DEAD);
    this.loadImages(this.JELLY_PINK_DEAD);
    this.y = y;
    this.x = 1800;
    this.speed = 0.15 + Math.random() * 0.25;
    this.damage = 100;

    this.animate(fishType.toUpperCase());
  }
  animate(fishType) {
    const animateFunction = () => {
      if (this.isDead()) {
        this.playAnimation(this[`JELLY_${fishType}_DEAD`]);
        this.y -= 10;
        setTimeout(animateFunction, 40);
      } else {
        this.playAnimation(this[`JELLY_${fishType}`]);
        setTimeout(animateFunction, 200);
      }
    };
    animateFunction();
  }
}
