/**
 * Represents a salsa bottle object in the game.
 * Extends the `MovableObject` class to include animations and positioning.
 */
class Salsa extends MovableObject {
  /**
   * The vertical position of the salsa bottle on the canvas.
   * @type {number}
   * @default 340
   */
  position_y = 340;

  /**
   * The height of the salsa bottle in pixels.
   * @type {number}
   * @default 100
   */
  height = 100;

  /**
   * The width of the salsa bottle in pixels.
   * @type {number}
   * @default 100
   */
  width = 100;

  /**
   * Array of file paths for the salsa bottle images.
   * @type {string[]}
   */
  imagesSalsa = ["adds/img/6_salsa_bottle/1_salsa_bottle_on_ground.png"];

  /**
   * Creates an instance of the Salsa class.
   * Initializes the image, loads animations, and sets a random horizontal position.
   */
  constructor() {
    super().loadImage(this.imagesSalsa[0]);
    this.loadImages(this.imagesSalsa);

    /**
     * The horizontal position of the salsa bottle, randomized within a range.
     * @type {number}
     */
    this.position_x = 200 + Math.random() * 1500;
  }
}
