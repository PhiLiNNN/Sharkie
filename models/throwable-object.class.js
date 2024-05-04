class ThrowableObject extends MovableObject {
  constructor(x, y, isSwimmingLeft) {
    super().loadImage("img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;

    this.blow(isSwimmingLeft);
  }

  blow(isSwimmingLeft) {
    let angle = 0;
    setInterval(() => {
      this.y += Math.sin(angle) * 1;
      if (isSwimmingLeft) this.x -= 1;
      else this.x += 1;
      angle += 0.1;
    }, 1);
  }
}
