/**
 * @class PufferFishAttack
 * @extends ThrowableObject
 * Represents an attack made by a pufferfish.
 */
class PufferFishAttack extends ThrowableObject {
  width = 20;
  height = 20;
  offsetX = -65;
  shotSpeed = pufferShotSpeed;

  /**
   * Creates an instance of PufferFishAttack.
   * @param {number} x - The x-coordinate where the attack starts.
   * @param {number} y - The y-coordinate where the attack starts.
   * @param {boolean} isSwimmingLeft - Determines the direction of the attack.
   */
  constructor(x, y, isSwimmingLeft) {
    super().loadImage("img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
    this.x = x;
    this.y = y;
    this.blow(isSwimmingLeft, this.offsetX, this.shotSpeed);
  }
}
