/**
 * Represents the status bar for health in the game.
 * Extends the `DrawableObject` class to display the player's health dynamically.
 */
class StatusbarHealth extends DrawableObject {
  /**
   * The percentage value representing the player's health.
   * @type {number}
   * @default 100
   */
  percentage = 100;

  /**
   * Array of file paths for the health status bar images based on health levels.
   * @type {string[]}
   */
  imagesHealth = [
    "adds/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
    "adds/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "adds/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "adds/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "adds/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "adds/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
  ];

  /**
   * Creates an instance of the `StatusbarHealth` class.
   * Initializes the images, position, size, and sets the default percentage to 100.
   */
  constructor() {
    super();
    this.loadImages(this.imagesHealth);
    this.setPercentage(100);

    /**
     * The vertical position of the status bar on the canvas.
     * @type {number}
     * @default 0
     */
    this.position_y = 0;

    /**
     * The horizontal position of the status bar on the canvas.
     * @type {number}
     * @default 40
     */
    this.position_x = 40;

    /**
     * The height of the status bar in pixels.
     * @type {number}
     * @default 75
     */
    this.height = 75;

    /**
     * The width of the status bar in pixels.
     * @type {number}
     * @default 250
     */
    this.width = 250;
  }

  /**
   * Updates the percentage value of the status bar and resolves the corresponding image.
   * @param {number} percentage - The percentage to set for the current health.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.imagesHealth[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index of the image to display based on the current percentage.
   * @returns {number} The index of the corresponding image in `imagesHealth`.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 0;
    } else if (this.percentage > 80) {
      return 1;
    } else if (this.percentage > 60) {
      return 2;
    } else if (this.percentage > 40) {
      return 3;
    } else if (this.percentage > 20) {
      return 4;
    } else {
      return 5;
    }
  }
}
