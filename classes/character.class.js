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
  imagesHurt = [
    "adds/img/2_character_pepe/4_hurt/H-41.png",
    "adds/img/2_character_pepe/4_hurt/H-42.png",
    "adds/img/2_character_pepe/4_hurt/H-43.png",
  ];
  imagesDead = [
    "adds/img/2_character_pepe/5_dead/D-51.png",
    "adds/img/2_character_pepe/5_dead/D-52.png",
    "adds/img/2_character_pepe/5_dead/D-53.png",
    "adds/img/2_character_pepe/5_dead/D-54.png",
    "adds/img/2_character_pepe/5_dead/D-55.png",
    "adds/img/2_character_pepe/5_dead/D-56.png",
    "adds/img/2_character_pepe/5_dead/D-57.png",
  ];

  offset = {
    top: 120,
    bottom: 30,
    left: 40,
    right: 30,
  };
  walking_sound = new Audio("audio/walking_sound.mp3");
  waiting_sound = new Audio("audio/waiting_sound.mp3");
  jump_sound = new Audio("audio/jumping_sound.mp3");
  background_sound = new Audio("audio/background_music_party.mp3");

  constructor() {
    super().loadImage(this.images_Idle[0]);
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesJumping);
    this.loadImages(this.images_Idle);
    this.loadImages(this.imagesHurt);
    this.loadImages(this.imagesDead);
    this.applyGravity();
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.background_sound.volume = 0.5;
      // this.background_sound.play(); später wieder aktivieren
      this.walking_sound.volume = 1.0;
      if (
        this.world.keyboard.RIGHT &&
        this.position_x < this.world.level.level_end_x
      ) {
        this.walking_sound.play();
        this.moveRight();
      }
      if (this.world.keyboard.LEFT && this.position_x > 0) {
        this.walking_sound.play();
        this.otherDirection = true;
        this.moveLeft();
      }
      if (!this.world.keyboard.LEFT && !this.world.keyboard.RIGHT) {
        this.walking_sound.pause();
      }

      if (
        this.world.keyboard.UP ||
        (this.world.keyboard.SPACE && !this.isAboveGround())
      ) {
        this.jump();
      }
      this.world.camara_x = -this.position_x + 100;
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.images_Idle);
      console.log(this.energy)
       if (this.world.checkCollision()) {
         this.playAnimation(this.imagesHurt);
         console.log("Test hit");
       }

      if (this.isDead()) {
        this.playAnimation(this.imagesDead);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.imagesJumping);
        this.walking_sound.pause();
        this.jump_sound.play();
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playAnimation(this.imagesWalking);
        }
      }
    }, 200);
  }
}
