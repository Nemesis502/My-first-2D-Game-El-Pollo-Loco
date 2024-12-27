class Coins extends MovableObject {
  position_y = 340;
  height = 100;
  width = 100;

  imagesCoins = ["adds/img/8_coin/coin_2.png"];
  constructor() {
    super().loadImage(this.imagesCoins[0]);
    this.loadImages(this.imagesCoins);

    this.position_x = 200 + Math.random() * 1500;
  }
}
