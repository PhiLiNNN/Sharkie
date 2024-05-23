class PufferFish extends MovableObject {
  height = 40;
  width = 40;
  offsetHeight = 8;
  speed;
  world;
  damage = 100;
  energy = 1;
  fishType;
  hurtSoundPlayed = false;
  deadImgCounter = 0;

  constructor(fishType, fishIndex, x, y, speed) {
    super().loadImage(
      `./img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/${fishIndex}.swim1.png`
    );
    this.loadImages(this.getFishImages(fishType.toUpperCase()));
    this.loadImages(PUFFER_ORANGE_DEAD);
    this.loadImages(PUFFER_GREEN_DEAD);
    this.loadImages(PUFFER_RED_DEAD);
    this.loadImages(PUFFER_RED_DEAD);
    this.loadImages(this.getFishTransitionImages(fishType.toUpperCase()));
    this.fishType = fishType;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.moveLeft();
    this.initializeIntervals(fishType);
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

  initializeIntervals() {
    let updateHurtSoundPuffer = setInterval(() => {
      this.playDeadSound(puffer_dead);
    }, 100);
    intervalIds.push(updateHurtSoundPuffer);

    let updatePuffer = setInterval(() => {
      this.updatePufferAnimation(this.fishType);
    }, 100);
    intervalIds.push(updatePuffer);
  }

  updatePufferAnimation(fishType) {
    if (this.isDead()) this.handlerPufferDead(fishType);
    else this.playAnimation(this.getFishImages(fishType));
  }

  handlerPufferDead(fishType) {
    if (this.deadImgCounter < this.getFishDeadImages(fishType).length) {
      let path = this.getFishDeadImages(fishType)[this.deadImgCounter];
      this.img = this.imageCache[path];
      this.deadImgCounter++;
    } else {
      this.disappearIntervalId = setInterval(() => {
        this.disappearPuffer();
      }, 10);
    }
  }

  disappearPuffer() {
    this.y -= 0.1;
    if (this.y < 80) {
      clearInterval(this.disappearIntervalId);
    }
  }
}
//   animate(fishType) {
//     this.moveLeft();
//     const animateFunction = () => {
//       if (this.isDead()) {this.handlerDeadAnimation();

//         this.disappearPuffer();
//         setTimeout(animateFunction, 10);
//       } else {
//         this.playAnimation(this.getFishImages(fishType));
//         setTimeout(animateFunction, 200);
//       }
//     };
//     animateFunction();
//   }
// }
