let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas);
}

window.addEventListener("keydown", (event) => {
  if (event.keyCode === 87 || event.keyCode === 38) {
    up = true;
    console.log("Up:", up);
  }
  if (event.keyCode === 65 || event.keyCode === 37) {
    left = true;
    console.log("Left:", left);
  }
  if (event.keyCode === 83 || event.keyCode === 40) {
    down = true;
    console.log("Down:", down);
  }
  if (event.keyCode === 68 || event.keyCode === 39) {
    right = true;
    console.log("Right:", right);
  }
  if (event.keyCode === 32) {
    space = true;
    console.log("Space:", space);
  }
});

window.addEventListener("keyup", (event) => {
  if (event.keyCode === 87 || event.keyCode === 38) {
    up = false;
    console.log("Up:", up);
  }
  if (event.keyCode === 65 || event.keyCode === 37) {
    left = false;
    console.log("Left:", left);
  }
  if (event.keyCode === 83 || event.keyCode === 40) {
    down = false;
    console.log("Down:", down);
  }
  if (event.keyCode === 68 || event.keyCode === 39) {
    right = false;
    console.log("Right:", right);
  }
  if (event.keyCode === 32) {
    space = false;
    console.log("Space:", space);
  }
});
