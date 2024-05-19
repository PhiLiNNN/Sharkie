class StatusBar extends DrawableObject {
  x = 10;
  y = -10;
  width = 190;
  height = 60;
  percentage = 100;
  IMAGES = [
    "./img/4. Marcadores/orange/0_copia.png",
    "./img/4. Marcadores/orange/20_copia.png",
    "./img/4. Marcadores/orange/40_copia.png",
    "./img/4. Marcadores/orange/60_copia.png",
    "./img/4. Marcadores/orange/80_copia.png",
    "./img/4. Marcadores/orange/100_copia.png",
  ];

  constructor() {
    super().loadImages(this.IMAGES);
    this.setPercentage(this.percentage);
  }

  setPercentage(percentage) {
    this.percentage = percentage;

    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage === 100) return 5;
    else if (this.percentage >= 80) return 4;
    else if (this.percentage >= 60) return 3;
    else if (this.percentage >= 40) return 2;
    else if (this.percentage >= 20) return 1;
    else return 0;
  }
}
