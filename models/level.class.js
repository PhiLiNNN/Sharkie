class Level {
  pufferFishes;
  endboss;
  regularJellies;
  dangerousJellies;
  backgroundObject;
  poisonItems;
  leftBorder;
  rightBorder;
  level_rightEnd = 3800;
  level_leftEnd = 0;
  level_topEnd = 0;
  level_bottomEnd = 320;
  keys;

  constructor(
    pufferFishes,
    regularJellies,
    dangerousJellies,
    endboss,
    backgroundObject,
    leftBorder,
    rightBorder,
    poisonItems,
    heartItems,
    keys
  ) {
    this.pufferFishes = pufferFishes;
    this.regularJellies = regularJellies;
    this.dangerousJellies = dangerousJellies;
    this.endboss = endboss;
    this.backgroundObject = backgroundObject;
    this.leftBorder = leftBorder;
    this.rightBorder = rightBorder;
    this.poisonItems = poisonItems;
    this.heartItems = heartItems;
    this.keys = keys;
  }
}
