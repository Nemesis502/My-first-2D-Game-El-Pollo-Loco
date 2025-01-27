/**
 * Represents the status bar for bottles in the game.
 * Extends the `DrawableObject` class to include percentage-based updates and dynamic image rendering.
 */
class StatusbarBottle extends DrawableObject {
  /**
   * The percentage value representing the fill level of the bottle status bar.
   * @type {number}
   * @default 0
   */
  percentage = 0;

  /**
   * Array of file paths for the status bar images based on percentage levels.
   * @type {string[]}
   */
  imagesBottle = [
    "adds/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "adds/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "adds/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "adds/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "adds/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "adds/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  /**
   * Creates an instance of the `StatusbarBottle` class.
   * Initializes the images, position, size, and sets the default percentage to 0.
   */
  constructor() {
    super();
    this.loadImages(this.imagesBottle);
    this.setPercentage(0);

    /**
     * The vertical position of the status bar on the canvas.
     * @type {number}
     * @default 60
     */
    this.position_y = 60;

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
   * @param {number} percentage - The percentage to add to the current value.
   */
  setPercentage(percentage) {
    if (this.percentage == 100 && percentage > 0) {
      this.percentage = 100;
    } else {
      this.percentage += percentage;
    }
    let path = this.imagesBottle[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index of the image to display based on the current percentage.
   * @returns {number} The index of the corresponding image in `imagesBottle`.
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
