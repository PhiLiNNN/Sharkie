class jellyDangerousFishAttack extends ThrowableObject {
  width = 60;
  height = 30;
  offsetX = 10;
  offsetY = 0;
  constructor(x, y, isSwimmingLeft) {
    super().loadImage("img/Explosion_2.png");
    this.x = x - 40;
    this.y = y;
    this.lightningShot(isSwimmingLeft, this.offsetX);
  }
}
