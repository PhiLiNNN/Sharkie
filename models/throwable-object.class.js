class ThrowableObject extends MovableObject {
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
