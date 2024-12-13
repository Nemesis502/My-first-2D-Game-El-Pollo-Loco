class MovableObject {
  img;

  loadImage(path){
    this.img = new Image(); // <=> thi.img = document.getElementById('image') <img id="image" src>
    this.img.src = path
  }

  moveRight() {
  }

  moveLeft() {
  }
}
