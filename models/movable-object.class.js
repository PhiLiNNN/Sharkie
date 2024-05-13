class MovableObject extends DrawableObject {
  speed;
  otherDirection = false;
  spawnAnimation = false;
  endAnimation = false;
  offsetX;
  offsetY;
  offsetHeight;
  offsetWidth;
  energy = 100;
  damage = 5;
  lastHit = 0;
  recovery = 0.6;
  deadAnimation = false;
  wordLefEnd = 0;

  playAnimationOnce(arr, ms) {
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < arr.length) {
        let path = arr[idx];
        this.img = this.imageCache[path];
        idx++;
      } else {
        clearInterval(interval);
      }
    }, ms);
  }

  playAnimation(arr) {
    let idx = this.currentImage % arr.length;
    let path = arr[idx];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
  moveLeft() {
    setInterval(() => {
      if (!this.isDead()) this.x -= this.speed;
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

  hit() {
    this.energy -= this.damage;
    if (this.energy <= 0) this.energy = 0;
    else this.lastHit = new Date().getTime();
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
