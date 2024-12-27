class Character extends MovableObject {
  world;
  speed = 10;
  imagesWalking = [
    "../adds/img/2_character_pepe/2_walk/W-26.png",
    "../adds/img/2_character_pepe/2_walk/W-22.png",
    "../adds/img/2_character_pepe/2_walk/W-23.png",
    "../adds/img/2_character_pepe/2_walk/W-24.png",
    "../adds/img/2_character_pepe/2_walk/W-25.png",
    "../adds/img/2_character_pepe/2_walk/W-26.png",
  ];
  walking_sound = new Audio("audio/walking_sound.mp3");
  wating_sound = new Audio("audio/waiting_sound.mp3");

  constructor() {
    super().loadImage("adds/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.imagesWalking);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.wating_sound.volume = 0.1;
      this.wating_sound.play();
      if (
        this.world.keyboard.RIGHT &&
        this.position_x < this.world.level.level_end_x
      ) {
        this.position_x += this.speed;
        this.otherDirection = false;
      }
      if (this.world.keyboard.LEFT && this.position_x > 0) {
        this.position_x -= this.speed;
        this.otherDirection = true;
      }
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.walking_sound.volume = 1.0;
        this.walking_sound.play();
      } else {
        this.walking_sound.pause();
      }
      this.world.camara_x = -this.position_x + 100;
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.imagesWalking);
      }
    }, 100);
  }

  jump() {}
}
