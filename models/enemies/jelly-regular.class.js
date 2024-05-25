/**
 * @class JellyRegular
 * @extends MovableObject
 * Represents a regular jellyfish enemy in the game.
 */
class JellyRegular extends MovableObject {
  height = 40;
  width = 40;
  offsetHeight = 8;
  speed = 0.01;
  radius;
  damage = 100;

  /**
   * Creates an instance of JellyRegular.
   * @param {string} fishType - The type of the jellyfish.
   * @param {number} fishIndex - The index of the jellyfish.
   * @param {number} x - The initial x-coordinate of the jellyfish.
   * @param {number} y - The initial y-coordinate of the jellyfish.
   * @param {number} angle - The angle of the jellyfish-circle.
   * @param {number} radius - The radius of the jellyfish-circle.
   */
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

  /**
   * Initializes intervals for the jellyfish.
   */
  initializeIntervals() {
    let updateHurtSoundJellyRegular = setInterval(() => {
      this.playDeadSound(jelly_dead);
    }, 100);
    intervalIds.push(updateHurtSoundJellyRegular);
  }

  /**
   * Retrieves the images for the jellyfish based on its type.
   * @param {string} fishType - The type of the jellyfish.
   * @returns {Array} - An array of image paths for the jellyfish.
   */
  getFishImages(fishType) {
    if (fishType === "LILA") return JELLY_LILA;
    else if (fishType === "YELLOW") return JELLY_YELLOW;
  }

  /**
   * Retrieves the dead images for the jellyfish based on its type.
   * @param {string} fishType - The type of the jellyfish.
   * @returns {Array} - An array of image paths for the dead jellyfish.
   */
  getFishDeadImages(fishType) {
    if (fishType === "LILA") return JELLY_LILA_DEAD;
    else if (fishType === "YELLOW") return JELLY_YELLOW_DEAD;
  }

  /**
   * Animates the jellyfish based on its type.
   * @param {string} fishType - The type of the jellyfish.
   */
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
