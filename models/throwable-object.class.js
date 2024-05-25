/**
 * @class ThrowableObject
 * Represents a throwable object with specific movement behaviors.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
  /**
   * Initiates a blow animation for the throwable object.
   * @param {boolean} isSwimmingLeft - Indicates the direction of swimming.
   * @param {number} offsetX - The horizontal offset for positioning.
   * @param {number} shotSpeed - The speed of the shot.
   */
  blow(isSwimmingLeft, offsetX, shotSpeed) {
    let angle = 0;
    let updateBlowAnimation = setInterval(() => {
      this.y += Math.sin(angle) * 1;
      if (isSwimmingLeft) {
        this.x -= shotSpeed;
        this.offsetX = offsetX + 65;
      } else this.x += shotSpeed;
      angle += 0.1;
    }, 1);
    intervalIds.push(updateBlowAnimation);
  }

  /**
   * Initiates a lightning shot animation for the throwable object.
   * @param {boolean} isSwimmingLeft - Indicates the direction of swimming.
   * @param {number} offsetX - The horizontal offset for positioning.
   * @param {number} shotSpeed - The speed of the shot.
   */
  lightningShot(isSwimmingLeft, offsetX, shotSpeed) {
    let updateShotAnimation = setInterval(() => {
      if (isSwimmingLeft) {
        this.x -= shotSpeed;
        this.offsetX = offsetX + 65;
      } else this.x += shotSpeed;
    }, 1);
    intervalIds.push(updateShotAnimation);
  }
}
