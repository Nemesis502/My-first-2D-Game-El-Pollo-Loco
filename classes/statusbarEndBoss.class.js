/**
 * Represents the status bar for the end boss in the game.
 * Extends the `DrawableObject` class to display the health of the end boss dynamically.
 */
class StatusbarEndBoss extends DrawableObject {
  /**
   * The percentage value representing the health of the end boss.
   * @type {number}
   * @default 100
   */
  percentage = 100;

  /**
   * Array of file paths for the end boss status bar images based on health levels.
   * @type {string[]}
   */
  imagesEndBoss = [
    "adds/img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
    "adds/img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
    "adds/img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
    "adds/img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "adds/img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "adds/img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
  ];

  /**
   * Creates an instance of the `StatusbarEndBoss` class.
   * Initializes the images, position, size, and sets the default percentage to 100.
   */
  constructor() {
    super();
    this.loadImages(this.imagesEndBoss);
    this.setPercentage(100);

    /**
     * The vertical position of the status bar on the canvas.
     * @type {number}
     * @default 10
     */
    this.position_y = 10;

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
    if (this.percentage == 100 && percentage > 0) {
      this.percentage = 100;
    } else {
      this.percentage += percentage;
    }
    let path = this.imagesEndBoss[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index of the image to display based on the current percentage.
   * @returns {number} The index of the corresponding image in `imagesEndBoss`.
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
