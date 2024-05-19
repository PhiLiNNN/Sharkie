class DrawableObject {
  x;
  y;
  height;
  width;
  offsetX = 0;
  offsetY = 0;
  offsetHeight = 0;
  offsetWidth = 0;
  img;
  imageCache = {};
  currentImage = 0;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  playAnimationOnce(arr, ms) {
    let idx = 0;
    const updateAnimation = setInterval(() => {
      if (idx < arr.length && !pauseGame) {
        let path = arr[idx];
        this.img = this.imageCache[path];
        idx++;
      } else clearInterval(updateAnimation);
    }, ms);
  }

  playAnimation(arr) {
    let idx = this.currentImage % arr.length;
    let path = arr[idx];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;

      this.imageCache[path] = img;
    });
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof MovableObject || this instanceof PoisonItem) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(
        this.x + this.offsetX,
        this.y + this.offsetY,
        this.width - this.offsetWidth,
        this.height - this.offsetHeight
      );
    } else if (this instanceof ThrowableObject) {
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
