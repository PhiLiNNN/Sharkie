class Level {
  enemies;
  endboss;
  jellyFish;
  backgroundObject;
  level_end_x = 2160;

  constructor(enemies, jellyFish, endboss, backgroundObject) {
    this.enemies = enemies;
    this.endboss = endboss;
    this.jellyFish = jellyFish;
    this.backgroundObject = backgroundObject;
  }
}
