class Character extends MovableObject {
  world;
  speed = 10;
  position_y = 160;
  images_Idle = [
    "../adds/img/2_character_pepe/1_idle/idle/I-1.png",
    "../adds/img/2_character_pepe/1_idle/idle/I-2.png",
    "../adds/img/2_character_pepe/1_idle/idle/I-3.png",
    "../adds/img/2_character_pepe/1_idle/idle/I-4.png",
    "../adds/img/2_character_pepe/1_idle/idle/I-5.png",
    "../adds/img/2_character_pepe/1_idle/idle/I-6.png",
    "../adds/img/2_character_pepe/1_idle/idle/I-8.png",
    "../adds/img/2_character_pepe/1_idle/idle/I-9.png",
    "../adds/img/2_character_pepe/1_idle/idle/I-10.png",
  ];
  images_LongIdle = [
    "../adds/img/2_character_pepe/1_idle/idle/I-11.png",
    "../adds/img/2_character_pepe/1_idle/idle/I-12.png",
    "../adds/img/2_character_pepe/1_idle/idle/I-13.png",
    "../adds/img/2_character_pepe/1_idle/idle/I-14.png",
    "../adds/img/2_character_pepe/1_idle/idle/I-15.png",
    "../adds/img/2_character_pepe/1_idle/idle/I-16.png",
    "../adds/img/2_character_pepe/1_idle/idle/I-18.png",
    "../adds/img/2_character_pepe/1_idle/idle/I-19.png",
    "../adds/img/2_character_pepe/1_idle/idle/I-20.png",
  ];
  imagesWalking = [
    "../adds/img/2_character_pepe/2_walk/W-26.png",
    "../adds/img/2_character_pepe/2_walk/W-22.png",
    "../adds/img/2_character_pepe/2_walk/W-23.png",
    "../adds/img/2_character_pepe/2_walk/W-24.png",
    "../adds/img/2_character_pepe/2_walk/W-25.png",
    "../adds/img/2_character_pepe/2_walk/W-26.png",
  ];
  imagesJumping = [
    "../adds/img/2_character_pepe/3_jump/J-31.png",
    "../adds/img/2_character_pepe/3_jump/J-32.png",
    "../adds/img/2_character_pepe/3_jump/J-33.png",
    "../adds/img/2_character_pepe/3_jump/J-34.png",
    "../adds/img/2_character_pepe/3_jump/J-35.png",
    "../adds/img/2_character_pepe/3_jump/J-36.png",
    "../adds/img/2_character_pepe/3_jump/J-37.png",
    "../adds/img/2_character_pepe/3_jump/J-38.png",
    "../adds/img/2_character_pepe/3_jump/J-39.png",
  ];
  walking_sound = new Audio("audio/walking_sound.mp3");
  wating_sound = new Audio("audio/waiting_sound.mp3");

  constructor() {
    super().loadImage(this.images_Idle[0]);
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesJumping);
    this.loadImages(this.images_Idle);
    this.applyGravity();
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
      this.playAnimation(this.images_Idle);
      if (this.isAboveGround()) {
        this.playAnimation(this.imagesJumping);
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playAnimation(this.imagesWalking);
        }
      }
    }, 100);
  }

  jump() {}
}
