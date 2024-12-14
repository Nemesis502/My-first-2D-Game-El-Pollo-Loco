class BackgroundObject extends MovableObject {
  width = 720;
  height = 400;
  constructor(imagePath, x, y) {
    super().loadImage(imagePath);
    this.position_x = x;
    this.position_y = y;
  }
}
