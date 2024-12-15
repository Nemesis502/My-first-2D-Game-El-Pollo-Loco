class Character extends MovableObject {
  constructor() {
    super().loadImage("../adds/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages([
      "../adds/img/2_character_pepe/2_walk/W-21.png",
      "../adds/img/2_character_pepe/2_walk/W-22.png",
      "../adds/img/2_character_pepe/2_walk/W-23.png",
      "../adds/img/2_character_pepe/2_walk/W-24.png",
      "../adds/img/2_character_pepe/2_walk/W-25.png",
      "../adds/img/2_character_pepe/2_walk/W-26.png"
    ])
  }

  jump() {}
}
