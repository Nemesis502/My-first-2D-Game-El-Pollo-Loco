class MovableObject {
  img;
  position_x = 20;
  position_y = 120;
  height = 250;
  width = 150;

  loadImage(path){
    this.img = new Image(); // <=> thi.img = document.getElementById('image') <img id="image" src>
    this.img.src = path
  }

  moveRight() {
  }

  moveLeft() {
  }
}
