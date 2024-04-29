class Fish extends MovableObject {
  y = Math.random() * 430;
  height = 40;
  width = 40;
  constructor() {
    super().loadImage("img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png");
    this.x = 400 + Math.random() * 250;
  }
}
