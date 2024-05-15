class PoisonItem extends DrawableObject {
  width;
  height;
  x;
  y;
  offsetX = 5;
  offsetY = 22;
  offsetWidth = 10;
  offsetHeight = 22;
  POISON_ITEM = [
    "img/4. Marcadores/Posión/Animada/1.png",
    "img/4. Marcadores/Posión/Animada/2.png",
    "img/4. Marcadores/Posión/Animada/3.png",
    "img/4. Marcadores/Posión/Animada/4.png",
    "img/4. Marcadores/Posión/Animada/5.png",
    "img/4. Marcadores/Posión/Animada/6.png",
    "img/4. Marcadores/Posión/Animada/7.png",
    "img/4. Marcadores/Posión/Animada/8.png",
  ];
  constructor(x, y) {
    super().loadImage(this.POISON_ITEM[0]);
    this.loadImages(this.POISON_ITEM);
    this.x = x;
    this.y = y;
    this.width = 55;
    this.height = 55;
    this.animate();
  }
  animate() {
    setInterval(() => {
      this.playAnimation(this.POISON_ITEM);
    }, 200);
  }
}
