class Statusbar_Health extends MovableObject {
  position_y = 5;
  position_x = 5;
  height = 80;
  width = 300;

  images_Statusbar_Health = [
    "adds/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
    "adds/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "adds/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "adds/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "adds/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "adds/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
  ];

  constructor() {
    super().loadImage(this.images_Statusbar_Health[0]);
    this.loadImages(this.images_Statusbar_Health);
  }
}
