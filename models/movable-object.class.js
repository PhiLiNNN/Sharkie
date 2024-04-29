class MovableObject {
  height;
  width;
  x;
  y;
  img;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }
  swimRight() {
    console.log("moving right :>> ");
  }
  swimLeft() {}
}
