/**
 * @class PoisonBar
 * @extends DrawableObject
 * Represents the poison energy bar.
 */
class PoisonBar extends DrawableObject {
  percentage = 0;
  x = 10;
  y = 40;
  width = 190;
  height = 60;
  POISON_BAR = [
    "./img/4. Marcadores/green/poisoned bubbles/0_copia.png",
    "./img/4. Marcadores/green/poisoned bubbles/20_copia.png",
    "./img/4. Marcadores/green/poisoned bubbles/40_copia.png",
    "./img/4. Marcadores/green/poisoned bubbles/60_copia.png",
    "./img/4. Marcadores/green/poisoned bubbles/80_copia.png",
    "./img/4. Marcadores/green/poisoned bubbles/100_copia.png",
  ];

  /**
   * The paths to the images representing different poison energy levels.
   * @type {string[]}
   */
  constructor() {
    super().loadImage(this.POISON_BAR[0]);
    this.loadImages(this.POISON_BAR);
    this.setPercentage(this.percentage);
  }

  /**
   * Sets the percentage of poison energy and updates the image accordingly.
   * @param {number} percentage - The new percentage of poison energy.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.POISON_BAR[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index of the image in the POISON_BAR array based on the current percentage.
   * @returns {number} - The index of the image.
   */
  resolveImageIndex() {
    if (this.percentage === 0) return 0;
    else if (this.percentage === 20) return 1;
    else if (this.percentage === 40) return 2;
    else if (this.percentage === 60) return 3;
    else if (this.percentage === 80) return 4;
    else return 5;
  }
}
