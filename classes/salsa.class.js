class Salsa extends MovableObject {
  position_y = 340;
  height = 100;
  width = 100;

  imagesSalsa = ["adds/img/6_salsa_bottle/1_salsa_bottle_on_ground.png"];

  constructor() {
    super().loadImage(this.imagesSalsa[0]);
    this.loadImages(this.imagesSalsa);

    this.position_x = 200 + Math.random() * 1500;
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.imagesSalsa);
    }, 1000 / 12);
  }
}
