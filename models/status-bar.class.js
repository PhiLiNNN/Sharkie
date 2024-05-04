class StatusBar extends DrawableObject {
  IMAGES = [
    "img/4. Marcadores/orange/0_copia.png",
    "img/4. Marcadores/orange/20_copia.png",
    "img/4. Marcadores/orange/40_copia.png",
    "img/4. Marcadores/orange/60_copia.png",
    "img/4. Marcadores/orange/80_copia.png",
    "img/4. Marcadores/orange/100_copia.png",
  ];
  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 30;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage === 100) return 5;
    else if (this.percentage > 80) return 4;
    else if (this.percentage > 60) return 3;
    else if (this.percentage > 40) return 2;
    else if (this.percentage > 20) return 1;
    else return 0;
  }
}
