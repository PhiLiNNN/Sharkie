class PoisonItem extends DrawableObject {
  width = 55;
  height = 55;
  POISON_ITEM_SWIMMING = [
    "img/4. Marcadores/Posión/Animada/1.png",
    "img/4. Marcadores/Posión/Animada/2.png",
    "img/4. Marcadores/Posión/Animada/3.png",
    "img/4. Marcadores/Posión/Animada/4.png",
    "img/4. Marcadores/Posión/Animada/5.png",
    "img/4. Marcadores/Posión/Animada/6.png",
    "img/4. Marcadores/Posión/Animada/7.png",
    "img/4. Marcadores/Posión/Animada/8.png",
  ];

  POISON_ITEM_GROUND = [
    "img/4. Marcadores/Posión/ground_animated/1.png",
    "img/4. Marcadores/Posión/ground_animated/2.png",
    "img/4. Marcadores/Posión/ground_animated/3.png",
    "img/4. Marcadores/Posión/ground_animated/4.png",
    "img/4. Marcadores/Posión/ground_animated/5.png",
    "img/4. Marcadores/Posión/ground_animated/6.png",
    "img/4. Marcadores/Posión/ground_animated/7.png",
    "img/4. Marcadores/Posión/ground_animated/8.png",
  ];
  constructor(type, x, y) {
    super().loadImage(this[`POISON_ITEM_${type.toUpperCase()}`][0]);
    this.loadImages(this[`POISON_ITEM_${type.toUpperCase()}`]);
    this.x = x;
    this.y = y;
    this.animate(type.toUpperCase());
  }
  animate(type) {
    let updatePoisonItem = setInterval(() => {
      this.playAnimation(this[`POISON_ITEM_${type}`]);
    }, Math.random() * (300 - 200) + 200);
    intervalIds.push(updatePoisonItem);
  }
}
