class MiniChicken extends MovableObject {
  position_y = 370;
  height = 60;
  width = 60;
  currentHit = false;
  hitSoundPlayed = false;
  name = "MiniChicken";
  images_Walking = [
    "adds/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "adds/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "adds/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
  images_Dead = ["adds/img/3_enemies_chicken/chicken_small/2_dead/dead.png"];
  hit_Sound = new Audio("audio/chicken_hit.mp3");
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  /**
   * Creates an instance of the MiniChicken class.
   * Initializes animations, random position, speed, and starts the animation loop.
   */
  constructor() {
    super().loadImage(this.images_Walking[0]);
    this.loadImages(this.images_Walking);
    this.loadImages(this.images_Dead);
    this.position_x = 300 + Math.random() * 900;
    this.speed = 0.3 + Math.random() * 0.25;

    this.animate();
  }

  /**
   * Starts the animation loop for the mini chicken.
   * Handles movement, animations, and hit detection.
   */
  animate() {
    this.movementLeftMini();
    this.diffrentAnimationMini();
    this.hitAnimationMini();
  }
  /**
   * Moves the mini chicken to the left unless it has been hit.
   */
  movementLeftMini() {
    this.movementInterval = setInterval(() => {
      if (!this.currentHit) {
        this.moveLeft();
      }
    }, 1000 / 60);
  }

  /**
   * Updates the mini chicken's animation based on its current state.
   * If hit, it switches to the dead image and stops movement.
   * Otherwise, it plays the walking animation.
   */
  diffrentAnimationMini() {
    this.animationInterval = setInterval(() => {
      if (this.currentHit) {
        this.loadImage(this.images_Dead[0]);
        this.speed = 0;
        clearInterval(this.animationInterval);
        if (!this.hitSoundPlayed) {
          this.hit_Sound.play();
          this.hitSoundPlayed = true;
        }
      } else {
        this.playAnimation(this.images_Walking);
      }
    }, 1000 / 12);
  }
  /**
   * Checks if the mini chicken has been hit and updates its state accordingly.
   */
  hitAnimationMini() {
    this.checkHitInterval = setInterval(() => {
      if (this.isHurt() && !this.currentHit) {
        this.currentHit = true;
      }
    }, 200);
  }

  /**
   * Cancels all animation and interval loops for the mini chicken.
   * Stops the mini chicken's movement and animations.
   */
  cancelAnimation() {
    clearInterval(this.movementInterval);
    clearInterval(this.animationInterval);
    clearInterval(this.checkHitInterval);
  }
}
