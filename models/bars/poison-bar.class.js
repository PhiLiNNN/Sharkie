class PoisonBar extends DrawableObject {
  percentage = 0;
  x = 10;
  y = 40;
  width = 190;
  height = 60;
  POISON_BAR = [
    "img/4. Marcadores/green/poisoned bubbles/0_copia.png",
    "img/4. Marcadores/green/poisoned bubbles/20_copia.png",
    "img/4. Marcadores/green/poisoned bubbles/40_copia.png",
    "img/4. Marcadores/green/poisoned bubbles/60_copia.png",
    "img/4. Marcadores/green/poisoned bubbles/80_copia.png",
    "img/4. Marcadores/green/poisoned bubbles/100_copia.png",
  ];

  constructor() {
    super().loadImage(this.POISON_BAR[0]);
    this.loadImages(this.POISON_BAR);
    this.setPercentage(this.percentage);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.POISON_BAR[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage === 0) return 0;
    else if (this.percentage === 20) return 1;
    else if (this.percentage === 40) return 2;
    else if (this.percentage === 60) return 3;
    else if (this.percentage === 80) return 4;
    else return 5;
  }
}
