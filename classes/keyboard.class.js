/**
 * Represents the keyboard input handler for the game.
 * Tracks the state of keyboard keys and touch buttons to enable player controls.
 */
class Keyboard {
  /**
   * Flag indicating whether the left movement key or button is pressed.
   * @type {boolean}
   * @default false
   */
  LEFT = false;

  /**
   * Flag indicating whether the right movement key or button is pressed.
   * @type {boolean}
   * @default false
   */
  RIGHT = false;

  /**
   * Flag indicating whether the up movement key or button is pressed.
   * @type {boolean}
   * @default false
   */
  UP = false;

  /**
   * Flag indicating whether the down movement key or button is pressed.
   * @type {boolean}
   * @default false
   */
  DOWN = false;

  /**
   * Flag indicating whether the spacebar (jump) key or button is pressed.
   * @type {boolean}
   * @default false
   */
  SPACE = false;

  /**
   * Flag indicating whether the throw (G) key or button is pressed.
   * @type {boolean}
   * @default false
   */
  G = false;

  /**
   * Creates an instance of the Keyboard class.
   * Initializes event listeners for touch buttons.
   */
  constructor() {
    this.checkButtonsEvent();
  }

  /**
   * Sets up event listeners for touch button inputs.
   * Updates the corresponding key state when a button is pressed or released.
   */
  checkButtonsEvent() {
    document
      .getElementById("buttonLeft")
      .addEventListener("touchstart", (e) => {
        e.preventDefault();
        this.LEFT = true;
      });
    document.getElementById("buttonLeft").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.LEFT = false;
    });

    document
      .getElementById("buttonRight")
      .addEventListener("touchstart", (e) => {
        e.preventDefault();
        this.RIGHT = true;
      });
    document
      .getElementById("buttonRight")
      .addEventListener("touchend", (e) => {
        e.preventDefault();
        this.RIGHT = false;
      });

    document.getElementById("buttonUp").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.SPACE = true;
    });
    document.getElementById("buttonUp").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.SPACE = false;
    });

    document
      .getElementById("buttonThrow")
      .addEventListener("touchstart", (e) => {
        e.preventDefault();
        this.G = true;
      });
    document
      .getElementById("buttonThrow")
      .addEventListener("touchend", (e) => {
        e.preventDefault();
        this.G = false;
      });
  }
}

/**
 * Event listener for keydown events.
 * Updates the corresponding key state in the global `keyboard` instance.
 */
window.addEventListener("keydown", (event) => {
  if (event.keyCode === 87) {
    keyboard.UP = true;
  }
  if (event.keyCode === 65) {
    keyboard.LEFT = true;
  }
  if (event.keyCode === 83 || event.keyCode === 40) {
    keyboard.DOWN = true;
  }
  if (event.keyCode === 68) {
    keyboard.RIGHT = true;
  }
  if (event.keyCode === 32) {
    keyboard.SPACE = true;
  }
  if (event.keyCode === 71) {
    keyboard.G = true;
  }
});

/**
 * Event listener for keyup events.
 * Resets the corresponding key state in the global `keyboard` instance.
 */
window.addEventListener("keyup", (event) => {
  if (event.keyCode === 87) {
    keyboard.UP = false;
  }
  if (event.keyCode === 65) {
    keyboard.LEFT = false;
  }
  if (event.keyCode === 83 || event.keyCode === 40) {
    keyboard.DOWN = false;
  }
  if (event.keyCode === 68) {
    keyboard.RIGHT = false;
  }
  if (event.keyCode === 32) {
    keyboard.SPACE = false;
  }
  if (event.keyCode === 71) {
    keyboard.G = false;
  }
});
