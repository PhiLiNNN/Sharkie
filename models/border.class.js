class Border extends DrawableObject {
  width = 300;
  height = 480;
  y = 0;
  constructor(x) {
    super().loadImage("img/3. Background/Barrier/3.png");
    this.x = x;
  }
}
