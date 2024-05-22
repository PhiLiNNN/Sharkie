class PufferFish extends MovableObject {
  height = 40;
  width = 40;
  offsetHeight = 8;
  speed;
  damage = 100;
  energy = 1;
  fishType;
  hurtSoundPlayed = false;

  constructor(fishType, fishIndex, x, y, speed) {
    super().loadImage(
      `./img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/${fishIndex}.swim1.png`
    );
    this.loadImages(this.getFishImages(fishType.toUpperCase()));
    this.loadImages(PUFFER_ORANGE_DEAD);
    this.loadImages(PUFFER_GREEN_DEAD);
    this.loadImages(PUFFER_RED_DEAD);
    this.loadImages(this.getFishTransitionImages(fishType.toUpperCase()));
    this.fishType = fishType;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.initializeIntervals();
    this.animate(fishType.toUpperCase());
  }

  initializeIntervals() {
    let updateHurtSoundPuffer = setInterval(() => {
      this.playDeadSound(puffer_dead);
    }, 100);
    intervalIds.push(updateHurtSoundPuffer);
  }

  getFishImages(fishType) {
    if (fishType === "ORANGE") return PUFFER_ORANGE;
    else if (fishType === "GREEN") return PUFFER_GREEN;
    else if (fishType === "RED") return PUFFER_RED;
  }
  getFishTransitionImages(fishType) {
    if (fishType === "ORANGE") return PUFFER_ORANGE_TRANSITION;
    else if (fishType === "GREEN") return PUFFER_GREEN_TRANSITION;
    else if (fishType === "RED") return PUFFER_RED_TRANSITION;
  }

  getFishDeadImages(fishType) {
    if (fishType === "ORANGE") return PUFFER_ORANGE_DEAD;
    else if (fishType === "GREEN") return PUFFER_GREEN_DEAD;
    else if (fishType === "RED") return PUFFER_RED_DEAD;
  }

  animate(fishType) {
    this.moveLeft();
    const animateFunction = () => {
      if (this.isDead()) {
        this.img = this.imageCache[this.getFishDeadImages(fishType)[0]];
        this.y -= 2;
        setTimeout(animateFunction, 20);
      } else {
        this.playAnimation(this.getFishImages(fishType));
        setTimeout(animateFunction, 200);
      }
    };
    animateFunction();
  }
}
