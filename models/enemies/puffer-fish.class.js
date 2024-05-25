/**
 * @class PufferFish
 * @extends MovableObject
 * Represents a puffer fish enemy in the game.
 */
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

  /**
   * Creates an instance of PufferFish.
   * @param {string} fishType - The type of the puffer fish.
   * @param {number} fishIndex - The index of the fish image.
   * @param {number} x - The initial x-coordinate of the puffer fish.
   * @param {number} y - The initial y-coordinate of the puffer fish.
   * @param {number} speed - The speed of the puffer fish.
   */
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

  /**
   * Initializes intervals for animations and sounds.
   * @param {string} fishType - The type of the puffer fish.
   */
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

  /**
   * Retrieves the images for the specified fish type.
   * @param {string} fishType - The type of the puffer fish.
   * @returns {string[]} - An array of image paths.
   */
  getFishImages(fishType) {
    if (fishType === "ORANGE") return PUFFER_ORANGE;
    else if (fishType === "GREEN") return PUFFER_GREEN;
    else if (fishType === "RED") return PUFFER_RED;
  }

  /**
   * Retrieves the transition images for the specified fish type.
   * @param {string} fishType - The type of the puffer fish.
   * @returns {string[]} - An array of image paths.
   */
  getFishTransitionImages(fishType) {
    if (fishType === "ORANGE") return PUFFER_ORANGE_TRANSITION;
    else if (fishType === "GREEN") return PUFFER_GREEN_TRANSITION;
    else if (fishType === "RED") return PUFFER_RED_TRANSITION;
  }

  /**
   * Retrieves the dead images for the specified fish type.
   * @param {string} fishType - The type of the puffer fish.
   * @returns {string[]} - An array of image paths.
   */
  getFishDeadImages(fishType) {
    if (fishType === "ORANGE") return PUFFER_ORANGE_DEAD;
    else if (fishType === "GREEN") return PUFFER_GREEN_DEAD;
    else if (fishType === "RED") return PUFFER_RED_DEAD;
  }

  /**
   * Updates the animation of the puffer fish.
   * @param {string} fishType - The type of the puffer fish.
   */
  updatePufferAnimation(fishType) {
    if (this.isDead()) this.handlerPufferDead(fishType);
    else this.playAnimation(this.getFishImages(fishType));
  }

  /**
   * Handles the animation of the puffer fish when dead.
   * @param {string} fishType - The type of the puffer fish.
   */
  handlerPufferDead(fishType) {
    if (this.deadImgCounter < this.getFishDeadImages(fishType).length) {
      let path = this.getFishDeadImages(fishType)[this.deadImgCounter];
      this.img = this.imageCache[path];
      this.deadImgCounter++;
    } else
      this.disappearIntervalId = setInterval(() => {
        this.disappearPuffer();
      }, 10);
  }

  /**
   * Makes the puffer fish disappear if no visible anymore.
   */
  disappearPuffer() {
    this.y -= 0.1;
    if (this.y < 80) clearInterval(this.disappearIntervalId);
  }
}
