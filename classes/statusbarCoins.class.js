/**
 * Represents the status bar for coins in the game.
 * Extends the `DrawableObject` class to include percentage-based updates and dynamic image rendering.
 */
class StatusbarCoins extends DrawableObject {
  /**
   * The percentage value representing the coin collection progress in the status bar.
   * @type {number}
   * @default 0
   */
  percentage = 0;

  /**
   * Array of file paths for the status bar images based on percentage levels.
   * @type {string[]}
   */
  imagesCoins = [
    "adds/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "adds/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "adds/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "adds/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "adds/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "adds/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  /**
   * Creates an instance of the `StatusbarCoins` class.
   * Initializes the images, position, size, and sets the default percentage to 0.
   */
  constructor() {
    super();
    this.loadImages(this.imagesCoins);
    this.setPercentage(0);

    /**
     * The vertical position of the status bar on the canvas.
     * @type {number}
     * @default 65
     */
    this.position_y = 65;

    /**
     * The horizontal position of the status bar on the canvas.
     * @type {number}
     * @default 450
     */
    this.position_x = 450;

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
   * @param {number} percentage - The percentage to add to the current value.
   */
  setPercentage(percentage) {
    if (this.percentage == 120 && percentage > 0) {
      this.percentage = 120;
    } else {
      this.percentage += percentage;
    }
    let path = this.imagesCoins[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index of the image to display based on the current percentage.
   * @returns {number} The index of the corresponding image in `imagesCoins`.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
