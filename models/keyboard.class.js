/**
 * @class Keyboard
 * Represents a keyboard controller for handling user input.
 */
class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  PRIMARY = false;
  SECONDARY = false;
  buttons = [
    {id: "left-id", key: "LEFT"},
    {id: "right-id", key: "RIGHT"},
    {id: "up-id", key: "UP"},
    {id: "down-id", key: "DOWN"},
    {id: "primary-id", key: "PRIMARY"},
    {id: "secondary-id", key: "SECONDARY"},
  ];

  /**
   * Creates an instance of Keyboard.
   * It initializes event listeners for key press and release events.
   */
  constructor() {
    document.addEventListener("keypress", (e) => this.handleKeyPress(e, true));
    document.addEventListener("keyup", (e) => this.handleKeyPress(e, false));
    this.bindBtsPressEvents();
  }

  /**
   * Handles key press events.
   * @param {KeyboardEvent} e - The keyboard event.
   * @param {boolean} isPressed - Indicates whether the key is pressed or released.
   */
  handleKeyPress(e, isPressed) {
    if (e.key === "w" || e.key === "W") this.UP = isPressed;
    if (e.key === "a" || e.key === "A") this.LEFT = isPressed;
    if (e.key === "s" || e.key === "S") this.DOWN = isPressed;
    if (e.key === "d" || e.key === "D") this.RIGHT = isPressed;
    if (e.key === "Escape") openMenu();
  }

  /**
   * Binds touch events to corresponding keyboard actions.
   */
  bindBtsPressEvents() {
    this.buttons.forEach((button) => {
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
