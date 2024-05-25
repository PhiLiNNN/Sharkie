/**
 * @class HeartItem
 * @extends DrawableObject
 * Represents a heart item that can be collected by the character.
 */
class HeartItem extends DrawableObject {
  width = 55;
  height = 55;

  /**
   * Creates an instance of HeartItem.
   * @param {number} x - The x-coordinate of the heart item.
   * @param {number} y - The y-coordinate of the heart item.
   */
  constructor(x, y) {
    super().loadImage("img/4. Marcadores/green/100_copia 3.png");
    this.x = x;
    this.y = y;
  }
}
