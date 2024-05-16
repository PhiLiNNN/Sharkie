class MovableObject extends DrawableObject {
  speed;
  otherDirection = false;
  spawnAnimation = false;
  endAnimation = false;
  energy = 100;
  lastHit = 0;
  recovery = 0.8;
  deadAnimation = false;
  wordLefEnd = 0;

  moveLeft() {
    setInterval(() => {
      if (!this.isDead()) this.x -= this.speed;
    }, 1000 / 60);
  }

  circle() {
    const centerX = this.x;
    const centerY = this.y;
    setInterval(() => {
      if (!this.isDead()) {
        this.angle += this.speed;
        this.x = centerX + Math.cos(this.angle) * this.radius;
        this.y = centerY + Math.sin(this.angle) * this.radius;
      }
    }, 1000 / 60);
  }

  isColliding(obj) {
    return (
      this.x + this.offsetX + this.width - this.offsetWidth >= obj.x &&
      this.x + this.offsetX <= obj.x + obj.width &&
      this.y + this.offsetY + this.height - this.offsetHeight >= obj.y &&
      this.y + this.offsetY <= obj.y + obj.height - obj.offsetHeight
    );
  }

  hit(damage) {
    this.energy -= damage;
    if (this.energy <= 0) this.energy = 0;
    else this.lastHit = new Date().getTime();
  }

  collectItem(item) {
    if (item === "poison") {
      this.poison_energy += 20;
      if (this.poison_energy === 100) this.poison_energy = 100;
    } else if (item === "heart") {
      this.energy += 20;
      if (this.energy >= 100) this.energy = 100;
    }
  }

  reducePoisonEnergy() {
    this.poison_energy -= 20;
    if (this.poison_energy === 0) this.poison_energy = 0;
  }

  isDead() {
    return this.energy === 0;
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < this.recovery;
  }

  checkEntityDistance(obj, interactionDistance) {
    return Math.abs(this.x - obj.x) <= interactionDistance;
  }
}
