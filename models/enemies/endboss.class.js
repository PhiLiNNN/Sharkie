class Endboss extends MovableObject {
  y = -10;
  height = 350;
  width = 350;
  offsetX = 25;
  offsetY = 60;
  offsetHeight = 110;
  offsetWidth = 40;
  energy = 10;
  speed = 5.0;
  world;
  ENDBOSS_APPEARS = [
    "./img/2.Enemy/3 Final Enemy/1.Introduce/1.png",
    "./img/2.Enemy/3 Final Enemy/1.Introduce/2.png",
    "./img/2.Enemy/3 Final Enemy/1.Introduce/3.png",
    "./img/2.Enemy/3 Final Enemy/1.Introduce/4.png",
    "./img/2.Enemy/3 Final Enemy/1.Introduce/5.png",
    "./img/2.Enemy/3 Final Enemy/1.Introduce/6.png",
    "./img/2.Enemy/3 Final Enemy/1.Introduce/7.png",
    "./img/2.Enemy/3 Final Enemy/1.Introduce/8.png",
    "./img/2.Enemy/3 Final Enemy/1.Introduce/9.png",
    "./img/2.Enemy/3 Final Enemy/1.Introduce/10.png",
  ];
  ENDBOSS_SWIMMING = [
    "./img/2.Enemy/3 Final Enemy/2.floating/1.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/2.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/3.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/4.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/5.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/6.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/7.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/8.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/9.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/10.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/11.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/12.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/13.png",
  ];
  ENDBOSS_HURT = [
    "./img/2.Enemy/3 Final Enemy/Hurt/1.png",
    "./img/2.Enemy/3 Final Enemy/Hurt/2.png",
    "./img/2.Enemy/3 Final Enemy/Hurt/3.png",
    "./img/2.Enemy/3 Final Enemy/Hurt/4.png",
  ];
  ENDBOSS_DEAD = [
    "./img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png",
    "./img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png",
    "./img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png",
    "./img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png",
    "./img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png",
    "./img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png",
  ];
  ENDBOSS_ATTACK = [
    "./img/2.Enemy/3 Final Enemy/Attack/1.png",
    "./img/2.Enemy/3 Final Enemy/Attack/2.png",
    "./img/2.Enemy/3 Final Enemy/Attack/3.png",
    "./img/2.Enemy/3 Final Enemy/Attack/4.png",
    "./img/2.Enemy/3 Final Enemy/Attack/5.png",
    "./img/2.Enemy/3 Final Enemy/Attack/6.png",
  ];

  constructor(x) {
    super().loadImage(this.ENDBOSS_APPEARS[0]);
    this.loadImages(this.ENDBOSS_SWIMMING);
    this.loadImages(this.ENDBOSS_APPEARS);
    this.loadImages(this.ENDBOSS_HURT);
    this.loadImages(this.ENDBOSS_DEAD);
    this.loadImages(this.ENDBOSS_ATTACK);
    this.spawnAnimationPlayed = false;
    this.x = x;
    this.spawnEndboss();
    this.moveEndboss();
  }

  spawnEndboss() {
    let updateSpawnAnimation = setInterval(() => {
      if (this.spawnAnimation && !this.spawnAnimationPlayed) {
        this.playAnimation(this.ENDBOSS_APPEARS);
        setTimeout(() => (this.spawnAnimationPlayed = true), 786);
      }
    }, 85);
    intervalIds.push(updateSpawnAnimation);
  }

  moveEndboss() {
    let updateMovToCha;
    let updateMoveEndboss = setInterval(() => {
      if (this.spawnAnimationPlayed && !pauseGame) {
        this.animate();
        if (!updateMovToCha) {
          updateMovToCha = setInterval(() => {
            if (!this.isDead() && !pauseGame) this.moveToCharacter();
          }, 100);
          intervalIds.push(updateMovToCha);
        }
      }
    }, 200);
    intervalIds.push(updateMoveEndboss);
  }

  animate() {
    if (this.isDead()) {
      let idx = this.currentImage % this.ENDBOSS_DEAD.length;
      if (idx === this.ENDBOSS_DEAD.length - 1) this.deadAnimation = true;
      if (!this.deadAnimation) {
        toggleVisibility("you-win-id", false);
        this.playAnimation(this.ENDBOSS_DEAD);
      }

      setTimeout(() => {
        const updateSinkToGround = setInterval(() => {
          this.y += 0.03;
          if (this.y >= 220) {
            this.y = 220;
            clearInterval(updateSinkToGround);
          }
        }, 20);
      }, 300);
    } else if (this.isHurt()) this.playAnimation(this.ENDBOSS_HURT);
    else {
      this.playAnimation(this.ENDBOSS_SWIMMING);
    }
  }

  moveToCharacter() {
    if (this.world.character.isDead() || this.isDead()) return;
    let dx = this.world.character.x - this.x - 100;
    let dy = this.world.character.y - this.y - 100;
    let distance = Math.sqrt(dx * dx + dy * dy);
    this.otherDirection = dx >= 0;
    if (dx >= -270 && dx <= 230 && dy <= 100 && dy >= -110) this.handlerCharacterEndbossCollision();
    dx /= distance;
    dy /= distance;
    this.x += dx * this.speed;
    this.y += dy * this.speed;
  }

  handlerCharacterEndbossCollision() {
    let currentTime = new Date().getTime();
    let timeSinceLastHit = currentTime - this.world.lastHitTime;
    if (timeSinceLastHit >= 1000) {
      this.world.lastHitTime = currentTime;
      this.playAnimationOnce(this.ENDBOSS_ATTACK, 100);
      setTimeout(() => {
        this.world.character.pushCharacterBack();
        this.world.character.hit(this.world.collisionDmgWithEndboss);
        this.world.statusBar.setPercentage(this.world.character.energy);
      }, 400);
    }
  }
}
