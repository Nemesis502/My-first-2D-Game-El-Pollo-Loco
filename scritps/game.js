let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas);
}

window.addEventListener("keypress", (event) => {
  console.log(event.key);
  if ((event.key = "w")) {
    up = true;
    console.log(up);
  } else if ((event.key = "a")) {
    left = true;
    console.log(left);
  } else if ((event.key = "s")) {
    down = true;
    console.log(down);
  } else if ((event.key = "d")) {
    right = true;
    console.log(right);
  } else if ((event.key = " ")) {
    space = true;
    console.log(space);
  }
});
