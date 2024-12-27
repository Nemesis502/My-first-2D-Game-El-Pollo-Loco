class MovableObject {
  img;
  position_x = 20;
  position_y = 160;
  height = 280;
  width = 150;
  speed = 0.15;
  imageCache = [];
  currentImage = 0;
  otherDirection = false;

  loadImage(path) {
    this.img = new Image(); // <=> this.img = document.getElementById('image') <img id="image" src>
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  moveRight() {}

  moveLeft() {
    setInterval(() => {
      this.position_x -= this.speed;
    }, 1000 / 60);
  }

  playAnimation(images) {
    let i = this.currentImage % images.length; // let i = 0 % 6; => 0, Rest 6
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
