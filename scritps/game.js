let canvas;
let ctx;
let world = new World(); 


function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  //   character.src = "../adds/img/2_character_pepe/1_idle/idle/I-1.png";

  console.log("My Character is", world.character);
}
