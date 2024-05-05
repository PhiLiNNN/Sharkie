class EnemyAttack extends ThrowableObject {
  width = 20;
  height = 20;
  offsetX = -30;
  offsetY = 0;
  constructor(x, y, isSwimmingLeft) {
    super().loadImage("img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
    this.x = x;
    this.y = y;
    this.blow(isSwimmingLeft, this.offsetX);
  }
}
