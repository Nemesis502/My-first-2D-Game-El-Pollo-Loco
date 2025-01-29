class Coins extends MovableObject {
  position_y = 340;
  height = 100;
  width = 100;
  imagesCoins = ["adds/img/8_coin/coin_2.png"];
  offset = {
    top: 30,
    bottom: 30,
    left: 30,
    right: 30,
  };

  /**
   * Creates an instance of the Coins class.
   * Initializes the coin's image, animation, and random position within a specified range.
   */
  constructor() {
    super().loadImage(this.imagesCoins[0]);
    this.loadImages(this.imagesCoins);
    this.position_x = 200 + Math.random() * 1500;
    this.position_y = 200 + Math.random() * 100;
  }
}
