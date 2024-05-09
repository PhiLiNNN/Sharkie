class Level {
  pufferFishes;
  endboss;
  regularJellyFishes;
  dangerousJellyFishes;
  backgroundObject;
  level_rightEnd = 2160;
  level_leftEnd = 0;
  level_topEnd = 0;
  level_bottomEnd = 320;

  constructor(pufferFishes, regularJellyFishes, dangerousJellyFishes, endboss, backgroundObject) {
    this.pufferFishes = pufferFishes;
    this.regularJellyFishes = regularJellyFishes;
    this.dangerousJellyFishes = dangerousJellyFishes;
    this.endboss = endboss;
    this.backgroundObject = backgroundObject;
  }
}
