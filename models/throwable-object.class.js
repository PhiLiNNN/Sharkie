class ThrowableObject extends MovableObject {
  BUBBLESPEED = 1;
  offsetX = 0;
  offsetY = 0;
  offsetHeight = 0;
  offsetWidth = 0;

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
      if (isSwimmingLeft) this.x -= this.BUBBLESPEED;
      else this.x += this.BUBBLESPEED;
      angle += 0.1;
    }, 1);
  }
}
