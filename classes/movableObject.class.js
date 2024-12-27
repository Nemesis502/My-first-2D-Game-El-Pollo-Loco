class MovableObject {
  img;
  position_x = 20;
  height = 280;
  width = 150;
  speed = 0.15;
  imageCache = [];
  currentImage = 0;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.0;

  applyGravity(){
    setInterval(() => {
      if (this.isAboveGround()) {
        this.position_y -= this.speedY;
        this.speedY -= this.acceleration;
      }

    }, 1000 / 25)
  }

  isAboveGround(){
    return this.position_y < 160
  }

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
