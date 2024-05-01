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
  keyboard;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }

  setWorld() {
    this.character.world = this;
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
    if (mo.otherDirection) this.flipImage(mo);
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    if (mo.otherDirection) this.flipImageBack(mo);
  }
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
