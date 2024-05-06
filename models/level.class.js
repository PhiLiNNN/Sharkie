class Level {
  enemies;
  endboss;
  regularJellyFish;
  dangerousJellyFish;
  backgroundObject;
  level_end_x = 2160;

  constructor(enemies, regularJellyFish, dangerousJellyFish, endboss, backgroundObject) {
    this.enemies = enemies;
    this.endboss = endboss;
    this.regularJellyFish = regularJellyFish;
    this.dangerousJellyFish = dangerousJellyFish;
    this.backgroundObject = backgroundObject;
  }
}
