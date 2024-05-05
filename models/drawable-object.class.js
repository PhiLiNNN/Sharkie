class DrawableObject {
  x;
  y;
  height;
  width;
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

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Fish) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(
        this.x + this.offsetX,
        this.y + this.offsetY,
        this.width - this.offsetWidth,
        this.height - this.offsetHeight
      );
    }

    if (this instanceof ThrowableObject) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
    }
    ctx.stroke();
  }
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
