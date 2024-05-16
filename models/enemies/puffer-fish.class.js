class PufferFish extends MovableObject {
  x;
  y;
  height = 40;
  width = 40;
  offsetHeight = 8;
  speed = 0.15 + Math.random() * 0.5;
  damage = 100;
  energy = 1;
  fishType;
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
  ENEMY_RED_TRANSITION = [
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition5.png",
  ];
  ENEMY_ORANGE_TRANSITION = [
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition5.png",
  ];
  ENEMY_GREEN_TRANSITION = [
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png",
  ];

  constructor(fishType, fishIndex, x, y) {
    super().loadImage(`img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/${fishIndex}.swim1.png`);
    this.loadImages(this[`ENEMY_${fishType.toUpperCase()}`]);
    this.loadImages(this.ENEMY_ORANGE_DEAD);
    this.loadImages(this.ENEMY_GREEN_DEAD);
    this.loadImages(this.ENEMY_RED_DEAD);
    this.loadImages(this[`ENEMY_${fishType}_TRANSITION`]);
    this.fishType = fishType;
    this.x = x;
    this.y = y;
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
