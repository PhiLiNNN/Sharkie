class PoisonBar extends DrawableObject {
  POISON_BAR = [
    "img/4. Marcadores/green/poisoned bubbles/0_copia.png",
    "img/4. Marcadores/green/poisoned bubbles/20_copia.png",
    "img/4. Marcadores/green/poisoned bubbles/40_copia.png",
    "img/4. Marcadores/green/poisoned bubbles/60_copia.png",
    "img/4. Marcadores/green/poisoned bubbles/80_copia.png",
    "img/4. Marcadores/green/poisoned bubbles/100_copia.png",
  ];
  percentage = 100;

  constructor() {
    super().loadImage(this.POISON_BAR[0]);
    this.x = 100;
    this.y = 40;
    this.width = 190;
    this.height = 60;
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }
  resolveImageIndex() {
    if (this.percentage === 100) return 5;
    else if (this.percentage > 60) return 4;
    else if (this.percentage > 40) return 3;
    else if (this.percentage > 20) return 2;
    else if (this.percentage > 20) return 1;
    else return 0;
  }
}
