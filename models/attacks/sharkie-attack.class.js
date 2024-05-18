class SharkieAttack extends ThrowableObject {
  width = 40;
  height = 40;
  offsetX = 0;
  shotSpeed = 1.5;
  primaryAttackBubble = "img/1.Sharkie/4.Attack/Bubble trap/Bubble.png";
  specialAttackBubble = "img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble.png";
  constructor(x, y, isSwimmingLeft, specialAttack) {
    super();
    specialAttack
      ? this.loadImage(this.specialAttackBubble)
      : this.loadImage(this.primaryAttackBubble);
    this.x = x;
    this.y = y;
    this.blow(isSwimmingLeft, this.offsetX, this.shotSpeed);
  }
}
