class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
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
    document.getElementById("buttonLeft").addEventListener("touchstart", this.handleTouchStartLeft.bind(this),{ passive: false });
    document.getElementById("buttonLeft").addEventListener("touchend", this.handleTouchEndLeft.bind(this),{ passive: false });

    document.getElementById("buttonRight").addEventListener("touchstart", this.handleTouchStartRight.bind(this),{ passive: false });
    document.getElementById("buttonRight").addEventListener("touchend", this.handleTouchEndRight.bind(this),{ passive: false });

    document.getElementById("buttonUp").addEventListener("touchstart", this.handleTouchStartUp.bind(this),{ passive: false });
    document.getElementById("buttonUp").addEventListener("touchend", this.handleTouchEndUp.bind(this),{ passive: false });

    document.getElementById("buttonThrow").addEventListener("touchstart", this.handleTouchStartThrow.bind(this),{ passive: false });
    document.getElementById("buttonThrow").addEventListener("touchend", this.handleTouchEndThrow.bind(this),{ passive: false });
  }

  /**
   * Handles the touchstart event for the left button.
   * Sets the LEFT property to true.
   * @param {TouchEvent} e - The touch event object.
   */
  handleTouchStartLeft(e) {
    e.preventDefault();
    this.LEFT = true;
  }

  /**
   * Handles the touchend event for the left button.
   * Sets the LEFT property to false.
   * @param {TouchEvent} e - The touch event object.
   */
  handleTouchEndLeft(e) {
    e.preventDefault();
    this.LEFT = false;
  }

  /**
   * Handles the touchstart event for the right button.
   * Sets the RIGHT property to true.
   * @param {TouchEvent} e - The touch event object.
   */
  handleTouchStartRight(e) {
    e.preventDefault();
    this.RIGHT = true;
  }

  /**
   * Handles the touchend event for the right button.
   * Sets the RIGHT property to false.
   * @param {TouchEvent} e - The touch event object.
   */
  handleTouchEndRight(e) {
    e.preventDefault();
    this.RIGHT = false;
  }

  /**
   * Handles the touchstart event for the up button.
   * Sets the SPACE property to true.
   * @param {TouchEvent} e - The touch event object.
   */
  handleTouchStartUp(e) {
    e.preventDefault();
    this.SPACE = true;
  }

  /**
   * Handles the touchend event for the up button.
   * Sets the SPACE property to false.
   * @param {TouchEvent} e - The touch event object.
   */
  handleTouchEndUp(e) {
    e.preventDefault();
    this.SPACE = false;
  }

  /**
   * Handles the touchstart event for the throw button.
   * Sets the G property to true.
   * @param {TouchEvent} e - The touch event object.
   */
  handleTouchStartThrow(e) {
    e.preventDefault();
    this.G = true;
  }

  /**
   * Handles the touchend event for the throw button.
   * Sets the G property to false.
   * @param {TouchEvent} e - The touch event object.
   */
  handleTouchEndThrow(e) {
    e.preventDefault();
    this.G = false;
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
