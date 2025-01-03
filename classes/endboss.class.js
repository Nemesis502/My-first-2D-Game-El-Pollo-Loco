class Endboss extends MovableObject {
  position_y = 60;
  height = 400;
  width = 400;
  images_Walking = [
    "adds/img/4_enemie_boss_chicken/1_walk/G1.png",
    "adds/img/4_enemie_boss_chicken/1_walk/G2.png",
    "adds/img/4_enemie_boss_chicken/1_walk/G3.png",
    "adds/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  constructor() {
    super().loadImage(this.images_Walking[0]);
    this.loadImages(this.images_Walking);
    this.position_x = 2000;
    this.animate();
  }

  animate() {
    // this.moveLeft();
    setInterval(() => {
      this.playAnimation(this.images_Walking);
    }, 1000 / 12);
  }

  eat() {}
}
