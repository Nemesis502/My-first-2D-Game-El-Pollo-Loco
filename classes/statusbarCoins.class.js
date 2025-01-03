class Statusbar_Coins extends MovableObject {
  position_y = 60;
  position_x = 5;
  height = 80;
  width = 300;

  images_Statusbar_Coin = [
    "adds/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
    "adds/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "adds/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "adds/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "adds/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "adds/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
  ];

  constructor() {
    super().loadImage(this.images_Statusbar_Coin[0]);
    this.loadImages(this.images_Statusbar_Coin);
  }
}
