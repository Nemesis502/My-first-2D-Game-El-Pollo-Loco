let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas);
}

window.addEventListener("keydown", (event) => {
  switch (event.keyCode) {
    case 87:
    case 38:
      up = true;
      console.log("Up:", up);
      break;

    case 65:
    case 37:
      left = true;
      console.log("Left:", left);
      break;

    case 83:
    case 40:
      down = true;
      console.log("Down:", down);
      break;

    case 68:
    case 39:
      right = true;
      console.log("Right:", right);
      break;

    case 32:
      space = true;
      console.log("Space:", space);
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.keyCode) {
    case 87:
    case 38:
      up = false;
      console.log("Up:", up);
      break;

    case 65:
    case 37:
      left = false;
      console.log("Left:", left);
      break;

    case 83:
    case 40:
      down = false;
      console.log("Down:", down);
      break;

    case 68:
    case 39:
      right = false;
      console.log("Right:", right);
      break;

    case 32:
      space = false;
      console.log("Space:", space);
      break;
  }
});
