/**
 * @class PoisonItem
 * @extends DrawableObject
 * Represents a poison item that can appear in the game as a collectible object.
 */
class PoisonItem extends DrawableObject {
  width = 55;
  height = 55;
  POISON_ITEM_SWIMMING = [
    "img/4. Marcadores/Posión/Animada/1.png",
    "img/4. Marcadores/Posión/Animada/2.png",
    "img/4. Marcadores/Posión/Animada/3.png",
    "img/4. Marcadores/Posión/Animada/4.png",
    "img/4. Marcadores/Posión/Animada/5.png",
    "img/4. Marcadores/Posión/Animada/6.png",
    "img/4. Marcadores/Posión/Animada/7.png",
    "img/4. Marcadores/Posión/Animada/8.png",
  ];
  POISON_ITEM_GROUND = [
    "img/4. Marcadores/Posión/ground_animated/1.png",
    "img/4. Marcadores/Posión/ground_animated/2.png",
    "img/4. Marcadores/Posión/ground_animated/3.png",
    "img/4. Marcadores/Posión/ground_animated/4.png",
    "img/4. Marcadores/Posión/ground_animated/5.png",
    "img/4. Marcadores/Posión/ground_animated/6.png",
    "img/4. Marcadores/Posión/ground_animated/7.png",
    "img/4. Marcadores/Posión/ground_animated/8.png",
  ];

  /**
   * Creates an instance of PoisonItem.
   * @param {string} type - The type of poison item, either "swimming" or "ground".
   * @param {number} x - The x-coordinate of the poison item.
   * @param {number} y - The y-coordinate of the poison item.
   */
  constructor(type, x, y) {
    super().loadImage(this[`POISON_ITEM_${type.toUpperCase()}`][0]);
    this.loadImages(this[`POISON_ITEM_${type.toUpperCase()}`]);
    this.x = x;
    this.y = y;
    this.animate(type.toUpperCase());
  }

  /**
   * Animates the poison item by cycling through its images.
   * @param {string} type - The type of poison item, either "SWIMMING" or "GROUND".
   */
  animate(type) {
    let updatePoisonItem = setInterval(() => {
      this.playAnimation(this[`POISON_ITEM_${type}`]);
    }, Math.random() * (300 - 200) + 200);
    intervalIds.push(updatePoisonItem);
  }
}
