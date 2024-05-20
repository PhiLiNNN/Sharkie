class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  PRIMARY = false;
  SECONDARY = false;

  constructor() {
    document.addEventListener("keypress", (e) => this.handleKeyPress(e, true));
    document.addEventListener("keyup", (e) => this.handleKeyPress(e, false));
    this.bindBtsPressEvents();
  }

  handleKeyPress(e, isPressed) {
    if (e.key === "w" || e.key === "W") this.UP = isPressed;
    if (e.key === "a" || e.key === "A") this.LEFT = isPressed;
    if (e.key === "s" || e.key === "S") this.DOWN = isPressed;
    if (e.key === "d" || e.key === "D") this.RIGHT = isPressed;
    if (e.key === "Escape") openMenu();
  }

  bindBtsPressEvents() {
    const buttons = [
      {id: "left-id", key: "LEFT"},
      {id: "right-id", key: "RIGHT"},
      {id: "up-id", key: "UP"},
      {id: "down-id", key: "DOWN"},
      {id: "primary-id", key: "PRIMARY"},
      {id: "secondary-id", key: "SECONDARY"},
    ];

    buttons.forEach((button) => {
      const element = document.getElementById(button.id);
      element.addEventListener("touchstart", (e) => {
        e.preventDefault();
        this[button.key] = true;
      });
      element.addEventListener("touchend", (e) => {
        e.preventDefault();
        this[button.key] = false;
      });
    });
  }
}
