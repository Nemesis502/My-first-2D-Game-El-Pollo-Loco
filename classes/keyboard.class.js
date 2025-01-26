class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  G = false;

  constructor() {
    this.checkButtonsEvent();
  }

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
    document.getElementById("buttonRight").addEventListener("touchend", (e) => {
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
    document.getElementById("buttonThrow").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.G = false;
    });
  }
}

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
