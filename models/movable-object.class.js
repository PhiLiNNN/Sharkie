/**
 * @class MovableObject
 * Represents a movable object with various movement behaviors and interactions.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
  speed;
  otherDirection = false;
  spawnAnimation = false;
  endAnimation = false;
  currentY;
  energy = 100;
  bubbleSpeed = 1;
  lastHit = 0;
  recovery = 0.8;
  deadAnimation = false;
  wordLefEnd = 0;
  moveUp = true;
  moveDown = false;

  /**
   * Moves the object to the left continuously.
   */
  moveLeft() {
    let updateMovLeft = setInterval(() => {
      if (!pauseGame && !this.isDead()) this.x -= this.speed;
    }, 1000 / 60);
    intervalIds.push(updateMovLeft);
  }

  /**
   * Moves the object up and down periodically.
   */
  moveUpAndDown() {
    let updateMoveUpAndDown = setInterval(() => {
      if (!this.isDead() && !pauseGame) {
        const direction = this.moveUp ? -1 : 1;
        this.y += direction * this.speed;
        if (Math.abs(this.y - this.currentY) >= 30) this.moveUp = !this.moveUp;
      }
    }, 1000 / 60);
    intervalIds.push(updateMoveUpAndDown);
  }

  /**
   * Moves the object in a circular motion.
   */
  circle() {
    const centerX = this.x;
    const centerY = this.y;
    let updateMovCircle = setInterval(() => {
      if (!this.isDead() && !pauseGame) {
        this.angle += this.speed;
        this.x = centerX + Math.cos(this.angle) * this.radius;
        this.y = centerY + Math.sin(this.angle) * this.radius;
      }
    }, 1000 / 60);
    intervalIds.push(updateMovCircle);
  }

  /**
   * Checks if the object is colliding with another object.
   * @param {DrawableObject} obj - The other object to check collision with.
   * @returns {boolean} - True if colliding, false otherwise.
   */
  isColliding(obj) {
    return (
      this.x + this.offsetX + this.width - this.offsetWidth >= obj.x &&
      this.x + this.offsetX <= obj.x + obj.width - obj.offsetWidth &&
      this.y + this.offsetY + this.height - this.offsetHeight >= obj.y + obj.offsetHeight &&
      this.y + this.offsetY <= obj.y + obj.height - obj.offsetHeight + obj.offsetY
    );
  }

  /**
   * Inflicts damage to the object.
   * @param {number} damage - The amount of damage to inflict.
   */
  hit(damage) {
    this.energy -= damage;
    if (this.energy <= 0) this.energy = 0;
    else this.lastHit = new Date().getTime();
  }

  /**
   * Collects an item and updates the object's properties accordingly.
   * @param {string} item - The type of item collected.
   */
  collectItem(item) {
    if (item === "poison") {
      this.poison_energy += 20;
      if (this.poison_energy === 100) this.poison_energy = 100;
    } else if (item === "heart") {
      this.energy += 20;
      if (this.energy >= 100) this.energy = 100;
    }
  }

  /**
   * Reduces poison energy of the object.
   */
  reducePoisonEnergy() {
    this.poison_energy -= 20;
    if (this.poison_energy === 0) this.poison_energy = 0;
  }

  /**
   * Checks if the object is dead.
   * @returns {boolean} - True if dead, false otherwise.
   */
  isDead() {
    return this.energy === 0;
  }

  /**
   * Checks if the object is currently hurt (recently hit).
   * @returns {boolean} - True if hurt, false otherwise.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < this.recovery;
  }

  /**
   * Checks the distance between this object and another object.
   * @param {DrawableObject} obj - The other object to check distance with.
   * @param {number} interactionDistance - The maximum distance for interaction.
   * @returns {boolean} - True if within the interaction distance, false otherwise.
   */
  checkEntityDistance(obj, interactionDistance) {
    return Math.abs(this.x - obj.x) <= interactionDistance;
  }
}
