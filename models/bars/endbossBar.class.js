/**
 * @class EndbossBar
 * @extends DrawableObject
 * Represents the status bar indicating health or energy level.
 */
class EndbossBar extends DrawableObject {
  x = 700;
  y = 40;
  width = 190;
  height = 60;
  percentage = 100;
  IMAGES = [
    "./img/4. Marcadores/orange/0_copia.png",
    "./img/4. Marcadores/orange/20_copia.png",
    "./img/4. Marcadores/orange/40_copia.png",
    "./img/4. Marcadores/orange/60_copia.png",
    "./img/4. Marcadores/orange/80_copia.png",
    "./img/4. Marcadores/orange/100_copia.png",
  ];

  /**
   * Creates an instance of StatusBar.
   */
  constructor() {
    super().loadImages(this.IMAGES);
    this.setPercentage(this.percentage);
  }

  /**
   * Sets the percentage of the status bar and updates the image accordingly.
   * @param {number} percentage - The new percentage of the status bar.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index of the image in the IMAGES array based on the current percentage.
   * @returns {number} - The index of the image.
   */
  resolveImageIndex() {
    if (this.percentage === 100) return 5;
    else if (this.percentage >= 80) return 4;
    else if (this.percentage >= 60) return 3;
    else if (this.percentage >= 40) return 2;
    else if (this.percentage >= 20) return 1;
    else return 0;
  }
}
