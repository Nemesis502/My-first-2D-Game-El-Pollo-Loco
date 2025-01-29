class Salsa extends MovableObject {
  position_y = 340;
  height = 100;
  width = 100;
  imagesSalsa = ["adds/img/6_salsa_bottle/1_salsa_bottle_on_ground.png"];
  offset = {
    top: 10,
    bottom: 10,
    left: 40,
    right: 20,
  };

  /**
   * Creates an instance of the Salsa class.
   * Initializes the image, loads animations, and sets a random horizontal position.
   */
  constructor() {
    super().loadImage(this.imagesSalsa[0]);
    this.loadImages(this.imagesSalsa);
    this.position_x = 200 + Math.random() * 1500;
  }
}
