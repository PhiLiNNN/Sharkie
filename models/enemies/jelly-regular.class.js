class JellyRegular extends MovableObject {
  height = 40;
  width = 40;
  offsetHeight = 8;
  angle;
  speed = 0.01;
  radius;
  damage = 100;
  constructor(fishType, fishIndex, x, y, angle, radius) {
    super().loadImage(`./img/2.Enemy/2 Jelly fish/Regular damage/${fishType}${fishIndex}.png`);
    this.loadImages(this.getFishImages(fishType.toUpperCase()));
    this.loadImages(JELLY_LILA_DEAD);
    this.loadImages(JELLY_YELLOW_DEAD);
    this.x = x;
    this.y = y;
    this.angle = (angle / 360) * 2 * Math.PI;
    this.radius = radius;
    this.circle();
    this.initializeIntervals();
    this.animate(fishType.toUpperCase());
  }

  initializeIntervals() {
    let updateHurtSoundJellyRegular = setInterval(() => {
      this.playDeadSound(jelly_dead);
    }, 100);
    intervalIds.push(updateHurtSoundJellyRegular);
  }

  getFishImages(fishType) {
    if (fishType === "LILA") return JELLY_LILA;
    else if (fishType === "YELLOW") return JELLY_YELLOW;
  }

  getFishDeadImages(fishType) {
    if (fishType === "LILA") return JELLY_LILA_DEAD;
    else if (fishType === "YELLOW") return JELLY_YELLOW_DEAD;
  }
  animate(fishType) {
    const animateFunction = () => {
      if (this.isDead()) {
        this.height = 50;
        this.width = 50;
        this.playAnimation(this.getFishDeadImages(fishType.toUpperCase()));
        this.y -= 10;
        setTimeout(animateFunction, 80);
      } else {
        this.playAnimation(this.getFishImages(fishType.toUpperCase()));
        setTimeout(animateFunction, 200);
      }
    };
    animateFunction();
  }
}
