class Level {
  pufferFishes;
  endboss;
  regularJellyFish;
  dangerousJellyFish;
  backgroundObject;
  level_rightEnd = 2160;
  level_leftEnd = 0;
  level_topEnd = 0;
  level_bottomEnd = 320;

  constructor(pufferFishes, regularJellyFish, dangerousJellyFish, endboss, backgroundObject) {
    this.pufferFishes = pufferFishes;
    this.endboss = endboss;
    this.regularJellyFish = regularJellyFish;
    this.dangerousJellyFish = dangerousJellyFish;
    this.backgroundObject = backgroundObject;
  }
}
