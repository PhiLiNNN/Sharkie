class Border extends DrawableObject {
  width = 300;
  height = 480;
  x;
  constructor(x) {
    super().loadImage("img/3. Background/Barrier/3.png");
    console.log("x :>> ", x);
    this.x = x;
    this.y = 0;
  }
}
