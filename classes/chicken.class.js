class Chicken extends MovableObject {

  constructor() {
    super().loadImage('../adds/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.position_x = 200 + Math.random() * 500;
    this.position_y = 290;
    this.height = 150;
    this.width = 150;
  }

  eat() {
  }
}
