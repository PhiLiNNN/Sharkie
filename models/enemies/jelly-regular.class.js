class JellyRegular extends MovableObject {
  height = 40;
  width = 40;
  offsetHeight = 8;
  angle;
  speed = 0.01;
  radius;
  damage = 100;
  JELLY_LILA = [
    "./img/2.Enemy/2 Jelly fish/Regular damage/LILA1.png",
    "./img/2.Enemy/2 Jelly fish/Regular damage/LILA2.png",
    "./img/2.Enemy/2 Jelly fish/Regular damage/LILA3.png",
    "./img/2.Enemy/2 Jelly fish/Regular damage/LILA4.png",
  ];
  JELLY_YELLOW = [
    "./img/2.Enemy/2 Jelly fish/Regular damage/YELLOW1.png",
    "./img/2.Enemy/2 Jelly fish/Regular damage/YELLOW2.png",
    "./img/2.Enemy/2 Jelly fish/Regular damage/YELLOW3.png",
    "./img/2.Enemy/2 Jelly fish/Regular damage/YELLOW4.png",
  ];
  JELLY_LILA_DEAD = [
    "./img/2.Enemy/2 Jelly fish/Dead/lila/L1.png",
    "./img/2.Enemy/2 Jelly fish/Dead/lila/L2.png",
    "./img/2.Enemy/2 Jelly fish/Dead/lila/L3.png",
    "./img/2.Enemy/2 Jelly fish/Dead/lila/L4.png",
  ];
  JELLY_YELLOW_DEAD = [
    "./img/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png",
    "./img/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png",
    "./img/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png",
    "./img/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png",
  ];

  constructor(fishType, fishIndex, x, y, angle, radius) {
    super().loadImage(`./img/2.Enemy/2 Jelly fish/Regular damage/${fishType}${fishIndex}.png`);
    this.loadImages(this[`JELLY_${fishType.toUpperCase()}`]);
    this.loadImages(this.JELLY_LILA_DEAD);
    this.loadImages(this.JELLY_YELLOW_DEAD);
    this.x = x;
    this.y = y;
    this.angle = (angle / 360) * 2 * Math.PI;
    this.radius = radius;
    this.circle();
    this.animate(fishType.toUpperCase());
  }

  animate(fishType) {
    const animateFunction = () => {
      if (this.isDead()) {
        this.height = 50;
        this.width = 50;
        this.playAnimation(this[`JELLY_${fishType}_DEAD`]);
        this.y -= 10;
        setTimeout(animateFunction, 80);
      } else {
        this.playAnimation(this[`JELLY_${fishType}`]);
        setTimeout(animateFunction, 200);
      }
    };
    animateFunction();
  }
}
