class MovableObject {
  height;
  width;
  x;
  y;
  img;
  imageCache = {};
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;
  spawnAnimation = true;
  offsetX;
  offsetY;
  offsetHeight;
  offsetWidth;
  energy = 100;
  damage = 5;
  lastHit = 0;
  recovery = 1;
  isAlive = true;

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

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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
      ctx.stroke();
    }
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }

  playAnimation(arr) {
    let idx = this.currentImage % arr.length;
    let path = arr[idx];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  isColliding(obj) {
    return (
      this.x + this.offsetX + this.width - this.offsetWidth >= obj.x &&
      this.x + this.offsetX <= obj.x + obj.width &&
      this.y + this.offsetY + this.height - this.offsetHeight >= obj.y &&
      this.y + this.offsetY <= obj.y + obj.height - obj.offsetHeight
    );
  }
  hit() {
    this.energy -= this.damage;
    if (this.energy < 0) this.energy = 0;
    else {
      this.lastHit = new Date().getTime();
    }
  }

  isDead() {
    return this.energy === 0;
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < this.recovery;
  }
}
