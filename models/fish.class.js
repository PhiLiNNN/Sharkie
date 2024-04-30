class Fish extends MovableObject {
  y = Math.random() * 430;
  height = 40;
  width = 40;
  ENEMY_RED = [
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png",
  ];
  ENEMY_GREEN = [
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png",
  ];
  ENEMY_ORANGE = [
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png",
  ];

  constructor(fishType, fishIndex) {
    super().loadImage(`img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/${fishIndex}.swim1.png`);
    this.x = 400 + Math.random() * 250;
    this.loadImages(this[`ENEMY_${fishType.toUpperCase()}`]);
    this.animate(fishType.toUpperCase());
  }

  animate(fishType) {
    setInterval(() => {
      let idx = this.currentImage % this[`ENEMY_${fishType}`].length;
      let path = this[`ENEMY_${fishType}`][idx];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 200);
  }
}
