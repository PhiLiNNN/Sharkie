class Level {
  enemies;
  backgroundObject;
  level_end_x = 1000;

  constructor(enemies, backgroundObject) {
    this.enemies = enemies;
    this.backgroundObject = backgroundObject;
  }
}
