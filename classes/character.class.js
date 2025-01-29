class Character extends MovableObject {
  world;
  speed = 10;
  position_y = 160;
  idleTimer = 0;
  isLongIdle = false;
  idleInterval = null;
  images_Idle = [
    "adds/img/2_character_pepe/1_idle/idle/I-1.png",
    "adds/img/2_character_pepe/1_idle/idle/I-2.png",
    "adds/img/2_character_pepe/1_idle/idle/I-3.png",
    "adds/img/2_character_pepe/1_idle/idle/I-4.png",
    "adds/img/2_character_pepe/1_idle/idle/I-5.png",
    "adds/img/2_character_pepe/1_idle/idle/I-6.png",
    "adds/img/2_character_pepe/1_idle/idle/I-8.png",
    "adds/img/2_character_pepe/1_idle/idle/I-9.png",
    "adds/img/2_character_pepe/1_idle/idle/I-10.png",
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
    "adds/img/2_character_pepe/2_walk/W-26.png",
    "adds/img/2_character_pepe/2_walk/W-22.png",
    "adds/img/2_character_pepe/2_walk/W-23.png",
    "adds/img/2_character_pepe/2_walk/W-24.png",
    "adds/img/2_character_pepe/2_walk/W-25.png",
    "adds/img/2_character_pepe/2_walk/W-26.png",
  ];
  images_Jumping = [
    "adds/img/2_character_pepe/3_jump/J-31.png",
    "adds/img/2_character_pepe/3_jump/J-32.png",
    "adds/img/2_character_pepe/3_jump/J-33.png",
    "adds/img/2_character_pepe/3_jump/J-34.png",
    "adds/img/2_character_pepe/3_jump/J-35.png",
    "adds/img/2_character_pepe/3_jump/J-36.png",
    "adds/img/2_character_pepe/3_jump/J-37.png",
    "adds/img/2_character_pepe/3_jump/J-38.png",
    "adds/img/2_character_pepe/3_jump/J-39.png",
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
    top: 100,
    bottom: 0,
    left: 60,
    right: 50,
  };
  walking_Sound = new Audio("audio/walking_sound.mp3");
  jump_Sound = new Audio("audio/jumping_sound.mp3");
  player_Hit_Sound = new Audio("audio/character_hit_not_loud.mp3");
  snoring_sound = new Audio("audio/snoring.mp3");

  /**
   * Creates an instance of the Character.
   * Initializes animations, sounds, and starts the idle timer.
   */
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

  /**
   * Animates the character based on player input and state.
   * Handles movement, jumping, and animation switching.
   */
  animate() {
    this.movementCharacter();
    this.differentAnimation();
  }
  /**
   * Moves the character based on keyboard input.
   */
  movementCharacter() {
    setInterval(() => {
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
    }, 1000 / 45);
  }
  /**
   * Determines and plays the appropriate animation for the character.
   */
  differentAnimation() {
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
    }, 150);
  }

  /**
   * Plays the long idle animation and snoring sound.
   */
  playLongIdle() {
    this.playAnimation(this.images_LongIdle);
    this.snoring_sound.play();
  }

  /**
   * Plays the dead animation.
   */
  playDead() {
    this.playAnimation(this.images_Dead);
  }

  /**
   * Plays the hurt animation and associated sound.
   */
  playHurt() {
    this.playAnimation(this.images_Hurt);
    this.player_Hit_Sound.play();
  }

  /**
   * Plays the jumping animation.
   */
  playJump() {
    this.playAnimation(this.images_Jumping);
  }

  /**
   * Checks and plays the appropriate walking or idle animation.
   */
  checkMovementAnimation() {
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.images_Walking);
    } else {
      this.playAnimation(this.images_Idle);
    }
  }

  /**
   * Resets the snoring sound to its initial state.
   */
  resetSnoring() {
    this.snoring_sound.pause();
    this.snoring_sound.currentTime = 0;
  }

  /**
   * Starts the idle timer to track inactivity and triggers long idle state.
   */
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
        if (this.idleTimer >= 10) {
          this.isLongIdle = true;
        }
      }
    }, 50);
  }

  /**
   * Stops all sounds associated with the character.
   */
  stopAllSounds() {
    this.stopWalkingSound();
    this.stopJumpSound();
    this.stopHitSound();
    this.stopSnoringSound();
  }

  /**
   * Stops the walking sound and resets its playback state.
   */
  stopWalkingSound() {
    this.walking_Sound.pause();
    this.walking_Sound.currentTime = 0;
    this.walking_Sound.volume = 0.0;
  }

  /**
   * Stops the jumping sound and resets its playback state.
   */
  stopJumpSound() {
    this.jump_Sound.pause();
    this.jump_Sound.currentTime = 0;
    this.jump_Sound.volume = 0.0;
  }

  /**
   * Stops the hit sound and resets its playback state.
   */
  stopHitSound() {
    this.player_Hit_Sound.pause();
    this.player_Hit_Sound.currentTime = 0;
    this.player_Hit_Sound.volume = 0.0;
  }

  /**
   * Stops the snoring sound and resets its playback state.
   */
  stopSnoringSound() {
    this.snoring_sound.pause();
    this.snoring_sound.currentTime = 0;
    this.snoring_sound.volume = 0.0;
  }
}
