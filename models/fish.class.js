class Fish extends MovableObject {
  y = Math.random() * 430;
  height = 40;
  width = 40;
  offsetX = 0;
  offsetY = 0;
  offsetHeight = 8;
  offsetWidth = 0;
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

    this.x = 400 + Math.random() * 250;
    this.speed = 0.15 + Math.random() * 0.25;
    this.damage = 100;

    this.animate(fishType.toUpperCase());
  }

  animate(fishType) {
    this.moveLeft();

    setInterval(() => {
      if (this.isDead()) {
        // let idx = this.currentImage % this[`ENEMY_${fishType.toUpperCase()}_DEAD`].length;
        // if (idx === 2) {
        //   this.endAnimation = true;
        // }
        // if (!this.endAnimation) {
        //   this.playAnimation(this.ENEMY_ORANGE_DEAD);
        //   console.log("2222222");
        //   this.y = -50;
        // }
        this.playAnimation(this[`ENEMY_${fishType}_DEAD`]);
        this.y -= 10;
      } else {
        this.playAnimation(this[`ENEMY_${fishType}`]);
      }
    }, 200);
  }
}
