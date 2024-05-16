class ThrowableObject extends MovableObject {
  BUBBLESPEED = 1;
  offsetX = 0;
  offsetY = 0;
  offsetHeight = 0;
  offsetWidth = 0;

  blow(isSwimmingLeft, offsetX) {
    let angle = 0;
    setInterval(() => {
      this.y += Math.sin(angle) * 1;
      if (isSwimmingLeft) {
        this.x -= this.BUBBLESPEED;
        this.offsetX = offsetX + 65;
      } else this.x += this.BUBBLESPEED;
      angle += 0.1;
    }, 1);
  }
  lightningShot(isSwimmingLeft, offsetX) {
    setInterval(() => {
      if (isSwimmingLeft) {
        this.x -= this.BUBBLESPEED;
        this.offsetX = offsetX + 65;
      } else this.x += this.BUBBLESPEED;
    }, 1);
  }
}
