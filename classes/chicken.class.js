class Chicken extends MovableObject {
  position_y = 330;
  height = 100;
  width = 100;

  constructor() {
    super().loadImage('../adds/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.position_x = 200 + Math.random() * 500;
    this.walk()
  }

 walk(){
  
 }

  eat() {
  }
}
