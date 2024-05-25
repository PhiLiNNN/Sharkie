/**
 * @class SharkieAttack
 * @extends ThrowableObject
 * Represents an attack made by the main character, Sharkie.
 */
class SharkieAttack extends ThrowableObject {
  width = 35;
  height = 35;
  offsetX = 0;
  shotSpeed = 1.5;
  primaryAttackBubble = "img/1.Sharkie/4.Attack/Bubble trap/Bubble.png";
  specialAttackBubble = "img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble.png";

  /**
   * Creates an instance of SharkieAttack.
   * @param {number} x - The x-coordinate where the attack starts.
   * @param {number} y - The y-coordinate where the attack starts.
   * @param {boolean} isSwimmingLeft - Determines the direction of the attack.
   * @param {boolean} specialAttack - Determines if the attack is a special attack.
   */
  constructor(x, y, isSwimmingLeft, specialAttack) {
    super();
    specialAttack
      ? this.loadImage(this.specialAttackBubble)
      : this.loadImage(this.primaryAttackBubble);
    this.x = x;
    this.y = y;
    this.blow(isSwimmingLeft, this.offsetX, this.shotSpeed);
  }
}
