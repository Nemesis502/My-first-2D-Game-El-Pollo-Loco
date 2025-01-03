class Chicken extends MovableObject {
  position_y = 330;
  height = 100;
  width = 100;
  images_Walking = [
    "adds/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "adds/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "adds/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  offset = {
    top: 120,
    bottom: 30,
    left: 40,
    right: 30
  }

  constructor() {
    super().loadImage(this.images_Walking[0]);
    this.loadImages(this.images_Walking);

    this.position_x = 200 + Math.random() * 500;
    this.speed = 0.15 + Math.random() * 0.25;

    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.images_Walking);
    }, 1000 / 12);
  }

  eat() {}
}
