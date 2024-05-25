/**
 * @class JellyDangerousFishAttack
 * @extends ThrowableObject
 * Represents an attack made by a dangerous jellyfish.
 */
class JellyDangerousFishAttack extends ThrowableObject {
  width = 90;
  height = 30;
  offsetX = -60;
  offsetY = 0;
  offsetHeight = 5;
  offsetWidth = 0;
  shotSpeed = dangerousShotSpeed;

  /**
   * Creates an instance of JellyDangerousFishAttack.
   * @param {number} x - The x-coordinate where the attack starts.
   * @param {number} y - The y-coordinate where the attack starts.
   * @param {boolean} isSwimmingLeft - Determines the direction of the attack.
   */
  constructor(x, y, isSwimmingLeft) {
    super().loadImage("img/Explosion_2.png");
    this.x = x - 40;
    this.y = y;
    this.lightningShot(isSwimmingLeft, this.offsetX, this.shotSpeed);
  }
}
