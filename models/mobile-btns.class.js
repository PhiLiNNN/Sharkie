class MobileButton extends DrawableObject {
  LEFT = "img/6.Botones/Key/left_key.png";
  RIGHT = "img/6.Botones/Key/right_key.png";
  UP = "img/6.Botones/Key/up_key.png";
  DOWN = "img/6.Botones/Key/down_key.png";
  PRIMARY = "img/6.Botones/Key/primary_attack.png";
  SECONDARY = "img/6.Botones/Key/secondary_attack.png";
  width = 40;
  height = 40;

  constructor(key, x, y) {
    super().loadImage(this[`${key.toUpperCase()}`]);
    this.x = x;
    this.y = y;
  }
}
