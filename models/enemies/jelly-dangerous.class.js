class JellyDangerous extends MovableObject {
  height = 50;
  width = 50;
  offsetHeight = 8;
  damage = 100;
  speed;
  isMovingY;
  isMovingX;
  constructor(fishType, fishIndex, x, y, speed, isMovingY, isMovingX) {
    super().loadImage(`./img/2.Enemy/2 Jelly fish/Super dangerous/${fishType}${fishIndex}.png`);
    this.loadImages(this.getFishImages(fishType.toUpperCase()));
    this.loadImages(JELLY_GREEN_DEAD);
    this.loadImages(JELLY_PINK_DEAD);
    this.y = y;
    this.x = x;
    this.currentY = y;
    this.speed = speed;
    this.isMoving = isMovingY;
    this.isMovingX = isMovingX;
    this.animate(fishType.toUpperCase());
    this.initializeIntervals();
    if (this.isMoving) this.moveUpAndDown();
  }

  initializeIntervals() {
    let updateHurtSoundJellyDangerous = setInterval(() => {
      this.playDeadSound(jelly_dead);
    }, 100);
    intervalIds.push(updateHurtSoundJellyDangerous);
  }

  getFishImages(fishType) {
    if (fishType === "GREEN") return JELLY_GREEN;
    else if (fishType === "PINK") return JELLY_PINK;
  }

  getFishDeadImages(fishType) {
    if (fishType === "GREEN") return JELLY_GREEN_DEAD;
    else if (fishType === "PINK") return JELLY_PINK_DEAD;
  }

  animate(fishType) {
    if (this.isMovingX) this.moveLeft();
    const animateFunction = () => {
      if (this.isDead()) {
        this.playAnimation(this.getFishDeadImages(fishType));
        this.y -= 10;
        setTimeout(animateFunction, 40);
      } else {
        this.playAnimation(this.getFishImages(fishType));
        setTimeout(animateFunction, 200);
      }
    };
    animateFunction();
  }
}
