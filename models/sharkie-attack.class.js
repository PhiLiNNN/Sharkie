class SharkieAttack extends ThrowableObject {
  width = 40;
  height = 40;
  offsetX = -30;
  offsetY = 0;
  constructor(x, y, isSwimmingLeft) {
    super().loadImage("img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
    this.x = x;
    this.y = y;
    this.blow(isSwimmingLeft, this.offsetX);
  }
}
