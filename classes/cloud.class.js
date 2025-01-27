/**
 * Represents a cloud in the game environment.
 * Extends the `MovableObject` class to include animations and positioning.
 */
class Cloud extends MovableObject {
  /**
   * The vertical position of the cloud on the canvas.
   * @type {number}
   * @default 50
   */
  position_y = 50;

  /**
   * The height of the cloud in pixels.
   * @type {number}
   * @default 250
   */
  height = 250;

  /**
   * The width of the cloud in pixels.
   * @type {number}
   * @default 450
   */
  width = 450;

  /**
   * Creates an instance of the Cloud class.
   * Initializes the cloud's image and random horizontal position, then starts the animation loop.
   */
  constructor() {
    super().loadImage("adds/img/5_background/layers/4_clouds/1.png");

    /**
     * The horizontal position of the cloud, randomized within a range.
     * @type {number}
     */
    this.position_x = 0 + Math.random() * 1700;

    this.animate();
  }

  /**
   * Starts the animation loop for the cloud.
   * Continuously moves the cloud to the left to simulate motion.
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
