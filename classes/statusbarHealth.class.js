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

  constructor() {
    super();
    this.loadImages(this.imagesHealth);
    this.setPercentage(100);
    this.position_y = 0;
    this.position_x = 40;
    this.height = 75;
    this.width = 250;
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.imagesHealth[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

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
