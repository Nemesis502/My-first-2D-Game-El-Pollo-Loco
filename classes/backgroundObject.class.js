class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;

  /**
   * Creates an instance of BackgroundObject.
   * @param {string} imagePath - The path to the image file for the background.
   * @param {number} x - The initial horizontal position of the background object.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.position_x = x;
    this.position_y = 480 - this.height;
  }
}
