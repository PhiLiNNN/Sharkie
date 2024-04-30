class World {
  character = new Character();
  enemies = [
    new Fish("GREEN", 1),
    new Fish("RED", 3),
    new Fish("GREEN", 1),
    new Fish("RED", 3),
    new Fish("ORANGE", 2),
    new Fish("ORANGE", 2),
    new Fish("RED", 3),
    new Fish("GREEN", 1),
  ];
  backgroundObject = [
    new BackgroundObject("img/3. Background/Layers/5. Water/d1.png", 0),
    new BackgroundObject("img/3. Background/Layers/4. Fondo 2/D.png", 0),
    new BackgroundObject("img/3. Background/Layers/3. Fondo 1/D.png", 0),
    new BackgroundObject("img/3. Background/Layers/1. Light/1.png", 0),
    new BackgroundObject("img/3. Background/Layers/2. Floor/D.png", 0),
  ];
  canvas;
  ctx;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
  }
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.addObjectsToMap(this.backgroundObject);

    this.addToMap(this.character);

    this.addObjectsToMap(this.enemies);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }
  addToMap(mo) {
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
  }
}
