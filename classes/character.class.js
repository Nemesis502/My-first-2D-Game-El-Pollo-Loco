class Character extends MovableObject {
  world;
  speed = 10;
  position_y = 160;
  idleTimer = 0;
  isLongIdle = false;
  idleInterval = null;
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
    "adds/img/2_character_pepe/1_idle/long_idle/I-11.png",
    "adds/img/2_character_pepe/1_idle/long_idle/I-12.png",
    "adds/img/2_character_pepe/1_idle/long_idle/I-13.png",
    "adds/img/2_character_pepe/1_idle/long_idle/I-14.png",
    "adds/img/2_character_pepe/1_idle/long_idle/I-15.png",
    "adds/img/2_character_pepe/1_idle/long_idle/I-16.png",
    "adds/img/2_character_pepe/1_idle/long_idle/I-17.png",
    "adds/img/2_character_pepe/1_idle/long_idle/I-18.png",
    "adds/img/2_character_pepe/1_idle/long_idle/I-19.png",
    "adds/img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
  images_Walking = [
    "../adds/img/2_character_pepe/2_walk/W-26.png",
    "../adds/img/2_character_pepe/2_walk/W-22.png",
    "../adds/img/2_character_pepe/2_walk/W-23.png",
    "../adds/img/2_character_pepe/2_walk/W-24.png",
    "../adds/img/2_character_pepe/2_walk/W-25.png",
    "../adds/img/2_character_pepe/2_walk/W-26.png",
  ];
  images_Jumping = [
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
  images_Hurt = [
    "adds/img/2_character_pepe/4_hurt/H-41.png",
    "adds/img/2_character_pepe/4_hurt/H-42.png",
    "adds/img/2_character_pepe/4_hurt/H-43.png",
  ];
  images_Dead = [
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
  walking_Sound = new Audio("audio/walking_Sound.mp3");
  waiting_Sound = new Audio("audio/waiting_Sound.mp3");
  jump_Sound = new Audio("audio/jumping_sound.mp3");
  hit_Sound = new Audio("audio/character_hit_not_loud.mp3");
  snoring_sound = new Audio("audio/snoring.mp3");

  constructor() {
    super().loadImage(this.images_Idle[0]);
    this.loadImages(this.images_Walking);
    this.loadImages(this.images_Jumping);
    this.loadImages(this.images_Idle);
    this.loadImages(this.images_LongIdle);
    this.loadImages(this.images_Hurt);
    this.loadImages(this.images_Dead);
    this.applyGravity();
    this.animate();
    this.startIdleTimer();
  }

  animate() {
    setInterval(() => {

      this.walking_Sound.volume = 1.0;
      if (
        this.world.keyboard.RIGHT &&
        this.position_x < this.world.level.level_end_x
      ) {
        this.walking_Sound.play();
        this.moveRight();
      }
      if (this.world.keyboard.LEFT && this.position_x > 0) {
        this.walking_Sound.play();
        this.otherDirection = true;
        this.moveLeft();
      }
      if (!this.world.keyboard.LEFT && !this.world.keyboard.RIGHT) {
        this.walking_Sound.pause();
      }
      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
      }
      this.world.camara_x = -this.position_x + 100;
    }, 1000 / 60);

    setInterval(() => {
      if (this.isLongIdle) {
        this.playLongIdle();
      } else if (this.isDead()) {
        this.playDead();
      } else if (this.isHurt()) {
        this.playHurt();
      } else if (this.isAboveGround()) {
        this.playJump();
      } else {
        this.checkMovementAnimation();
      }
      if (!this.isLongIdle) {
        this.resetSnoring();
      }
    }, 200);
  }

  playLongIdle() {
    this.playAnimation(this.images_LongIdle);
    this.snoring_sound.play();
  }

  playDead() {
    this.playAnimation(this.images_Dead);
  }

  playHurt() {
    this.playAnimation(this.images_Hurt);
    this.hit_Sound.play();
  }

  playJump() {
    this.playAnimation(this.images_Jumping);
  }

  checkMovementAnimation() {
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.images_Walking);
    } else {
      this.playAnimation(this.images_Idle);
    }
  }

  resetSnoring() {
    this.snoring_sound.pause();
    this.snoring_sound.currentTime = 0;
  }

  startIdleTimer() {
    setInterval(() => {
      if (
        this.world.keyboard.LEFT ||
        this.world.keyboard.RIGHT ||
        this.world.keyboard.SPACE ||
        this.world.keyboard.UP ||
        this.world.keyboard.DOWN ||
        this.world.keyboard.G ||
        this.isHurt()
      ) {
        this.idleTimer = 0;
        this.isLongIdle = false;
      } else {
        this.idleTimer += 0.2;
        if (this.idleTimer >= 6) {
          this.isLongIdle = true;
        }
      }
    }, 200);
  }
}
