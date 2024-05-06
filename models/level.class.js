class Level {
  enemies;
  backgroundObject;
  level_end_x = 1000;
  character;

  constructor(enemies, backgroundObject, character) {
    this.enemies = enemies;
    this.backgroundObject = backgroundObject;
    this.character = character;
    console.log("object :>> ", this.character);
  }
}
