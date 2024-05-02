class Level {
  enemies;
  backgroundObject;
  level_end_x = 300;

  constructor(enemies, backgroundObject) {
    this.enemies = enemies;
    this.backgroundObject = backgroundObject;
  }
}
