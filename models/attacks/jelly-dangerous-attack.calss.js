class JellyDangerousFishAttack extends ThrowableObject {
  width = 60;
  height = 30;
  offsetX = -60;
  offsetY = 0;
  offsetHeight = 5;
  offsetWidth = 0;
  shotSpeed = dangerousShotSpeed;

  constructor(x, y, isSwimmingLeft) {
    super().loadImage("img/Explosion_2.png");
    this.x = x - 40;
    this.y = y;
    this.lightningShot(isSwimmingLeft, this.offsetX, this.shotSpeed);
  }
}
