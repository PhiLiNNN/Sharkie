/**
 * @class JellyDangerous
 * @extends MovableObject
 * Represents a dangerous jellyfish enemy in the game.
 */
class JellyDangerous extends MovableObject {
  height = 50;
  width = 50;
  offsetHeight = 8;
  damage = 100;
  speed;
  isMovingY;
  isMovingX;

  /**
   * Creates an instance of JellyDangerous.
   * @param {string} fishType - The type of the jellyfish (e.g., "GREEN" or "PINK").
   * @param {number} fishIndex - The index of the jellyfish image.
   * @param {number} x - The initial x-coordinate of the jellyfish.
   * @param {number} y - The initial y-coordinate of the jellyfish.
   * @param {number} speed - The speed of the jellyfish.
   * @param {boolean} isMovingY - Indicates if the jellyfish is moving along the Y-axis.
   * @param {boolean} isMovingX - Indicates if the jellyfish is moving along the X-axis.
   */
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

  /**
   * Initializes intervals for the jellyfish.
   */
  initializeIntervals() {
    let updateHurtSoundJellyDangerous = setInterval(() => {
      this.playDeadSound(jelly_dead);
    }, 100);
    intervalIds.push(updateHurtSoundJellyDangerous);
  }

  /**
   * Retrieves the images for the jellyfish based on its type.
   * @param {string} fishType - The type of the jellyfish.
   * @returns {Array} - An array of image paths.
   */
  getFishImages(fishType) {
    if (fishType === "GREEN") return JELLY_GREEN;
    else if (fishType === "PINK") return JELLY_PINK;
  }

  /**
   * Retrieves the dead images for the jellyfish based on its type.
   * @param {string} fishType - The type of the jellyfish.
   * @returns {Array} - An array of image paths.
   */
  getFishDeadImages(fishType) {
    if (fishType === "GREEN") return JELLY_GREEN_DEAD;
    else if (fishType === "PINK") return JELLY_PINK_DEAD;
  }

  /**
   * Animates the jellyfish.
   * @param {string} fishType - The type of the jellyfish.
   */
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
