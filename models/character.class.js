class Character extends MovableObject {
  height = 190;
  width = 190;
  x = 80;
  y = 130;

  constructor() {
    super().loadImage("img/1.Sharkie/1.IDLE/1.png");
  }

  jump() {}
}
