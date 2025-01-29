class StatusbarHealth extends DrawableObject {
  percentage = 100;
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
    this.position_y = 0;
    this.position_x = 40;
    this.height = 75;
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
