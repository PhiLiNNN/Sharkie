class MovableObject {
  height;
  width;
  x;
  y;
  img;
  imageCache = {};
  currentImage = 0;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
  swimRight() {
    console.log("moving right :>> ");
  }
  swimLeft() {}
}
