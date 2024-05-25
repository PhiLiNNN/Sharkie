/**
 * @class Level
 * Represents a level in the game.
 */
class Level {
  pufferFishes;
  endboss;
  regularJellies;
  dangerousJellies;
  backgroundObject;
  poisonItems;
  leftBorder;
  rightBorder;
  level_rightEnd = 5300;
  level_leftEnd = 0;
  level_topEnd = 0;
  level_bottomEnd = 320;

  /**
   * Creates an instance of Level.
   * @param {PufferFish[]} pufferFishes - The array of puffer fishes in the level.
   * @param {JellyRegular[]} regularJellies - The array of regular jellies in the level.
   * @param {JellyDangerous[]} dangerousJellies - The array of dangerous jellies in the level.
   * @param {Endboss} endboss - The endboss object in the level.
   * @param {BackgroundObject[]} backgroundObject - The array of background objects in the level.
   * @param {Border} leftBorder - The left border object in the level.
   * @param {Border} rightBorder - The right border object in the level.
   * @param {PoisonItem[]} poisonItems - The array of poison items in the level.
   * @param {HeartItem[]} heartItems - The array of heart items in the level.
   */
  constructor(
    pufferFishes,
    regularJellies,
    dangerousJellies,
    endboss,
    backgroundObject,
    leftBorder,
    rightBorder,
    poisonItems,
    heartItems
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
  }
}
