/**
 * Represents a coin collectible in the game.
 * Extends the `MovableObject` class to include animations and random positioning.
 */
class Coins extends MovableObject {
  /**
   * The vertical position of the coin on the canvas.
   * @type {number}
   * @default 340
   */
  position_y = 340;

  /**
   * The height of the coin in pixels.
   * @type {number}
   * @default 100
   */
  height = 100;

  /**
   * The width of the coin in pixels.
   * @type {number}
   * @default 100
   */
  width = 100;

  /**
   * Array of file paths for coin images.
   * @type {string[]}
   */
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

    /**
     * The horizontal position of the coin, randomized within a range.
     * @type {number}
     */
    this.position_x = 200 + Math.random() * 1500;

    /**
     * The vertical position of the coin, randomized within a range.
     * @type {number}
     */
    this.position_y = 200 + Math.random() * 100;
  }
}
