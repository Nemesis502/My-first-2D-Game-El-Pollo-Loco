class Character extends MovableObject {

  constructor() {
    super().loadImage("../adds/img/2_character_pepe/1_idle/idle/I-1.png");
    this.position_x = 20;
    this.position_y = 50;
    this.height = 250;
    this.width = 150;
  }

  jump() {}
}
