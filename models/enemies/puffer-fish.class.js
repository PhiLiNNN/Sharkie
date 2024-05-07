class PufferFish extends MovableObject {
  y = 90 + Math.random() * 320;
  height = 40;
  width = 40;
  offsetX = 0;
  offsetY = 0;
  offsetHeight = 8;
  offsetWidth = 0;
  energy = 1;
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
  ENEMY_ORANGE_DEAD = [
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/orange1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/orange2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/orange3.png",
  ];
  ENEMY_GREEN_DEAD = [
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/green1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/green2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/green3.png",
  ];
  ENEMY_RED_DEAD = [
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/red1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/red2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/red3.png",
  ];

  constructor(fishType, fishIndex) {
    super().loadImage(`img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/${fishIndex}.swim1.png`);
    this.loadImages(this[`ENEMY_${fishType.toUpperCase()}`]);
    this.loadImages(this.ENEMY_ORANGE_DEAD);
    this.loadImages(this.ENEMY_GREEN_DEAD);
    this.loadImages(this.ENEMY_RED_DEAD);

    this.x = 800 + Math.random() * 250;
    this.speed = 0.15 + Math.random() * 0.5;
    this.damage = 100;

    this.animate(fishType.toUpperCase());
  }

  animate(fishType) {
    this.moveLeft();

    const animateFunction = () => {
      if (this.isDead()) {
        this.img = this.imageCache[this[`ENEMY_${fishType.toUpperCase()}_DEAD`][0]];
        this.y -= 2;
        setTimeout(animateFunction, 20);
      } else {
        this.playAnimation(this[`ENEMY_${fishType}`]);
        setTimeout(animateFunction, 200);
      }
    };
    animateFunction();
  }
}
