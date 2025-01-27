/**
 * Represents a background object in the game.
 * Extends the functionality of `MovableObject` to manage background images.
 */
class BackgroundObject extends MovableObject {
  /**
   * The width of the background object in pixels.
   * @type {number}
   * @default 720
   */
  width = 720;

  /**
   * The height of the background object in pixels.
   * @type {number}
   * @default 480
   */
  height = 480;

  /**
   * Creates an instance of BackgroundObject.
   * @param {string} imagePath - The path to the image file for the background.
   * @param {number} x - The initial horizontal position of the background object.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    
    /**
     * The x-coordinate of the background object.
     * @type {number}
     */
    this.position_x = x;

    /**
     * The y-coordinate of the background object.
     * Set to align the bottom of the object with the canvas.
     * @type {number}
     */
    this.position_y = 480 - this.height;
  }
}
