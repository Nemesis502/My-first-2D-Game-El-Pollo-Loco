class Chicken extends MovableObject {
  position_y = 330;
  height = 100;
  width = 100;
  imagesWalking = [
    "adds/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "adds/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "adds/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"
  ]

  constructor() {
    super().loadImage('adds/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.position_x = 200 + Math.random() * 500;
    this.loadImages(this.imagesWalking);
    this.animate();
  }

  animate() {
    setInterval(() => {
      let i = this.currentImage % this.imagesWalking.length; // let i = 0 % 6; => 0, Rest 6
      let path = this.imagesWalking[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 1000 / 12);
  }

  eat() {
  }
}
