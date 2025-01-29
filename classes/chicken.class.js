class Chicken extends MovableObject {
  position_y = 330;
  height = 100;
  width = 100;
  currentHit = false;
  hitSoundPlayed = false;
  name = "Chicken";
  images_Walking = [
    "adds/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "adds/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "adds/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  images_Dead = ["adds/img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];
  hit_Sound = new Audio("audio/chicken_hit.mp3");
  offset = {
    top: 0,
    bottom: 100,
    left: 0,
    right: 0,
  };

  /**
   * Creates an instance of the Chicken class.
   * Initializes animations, random position and speed, and starts the animation loop.
   */
  constructor() {
    super().loadImage(this.images_Walking[0]);
    this.loadImages(this.images_Walking);
    this.loadImages(this.images_Dead);

    this.position_x = 300 + Math.random() * 1200;

    this.speed = 0.15 + Math.random() * 0.25;

    this.animate();
  }

  /**
   * Starts the animation loop for the chicken.
   * Handles movement, animation updates, and hit detection.
   */
  animate() {
    this.movementLeft();
    this.diffrentAnimation();
    this.hitAnimation();
  }
  /**
   * Moves the chicken to the left unless it has been hit.
   */
  movementLeft() {
    this.movementInterval = setInterval(() => {
      if (!this.currentHit) {
        this.moveLeft();
      }
    }, 1000 / 60);
  }
  /**
   * Updates the chicken's animation based on its current state.
   */
  diffrentAnimation() {
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
   * Checks if the chicken has been hit and updates its state accordingly.
   */
  hitAnimation() {
    this.checkHitInterval = setInterval(() => {
      if (this.isHurt() && !this.currentHit) {
        this.currentHit = true;
      }
    }, 200);
  }

  /**
   * Cancels all animation and interval loops for the chicken.
   * Used to stop the chicken's movement and animations.
   */
  cancelAnimation() {
    clearInterval(this.movementInterval);
    clearInterval(this.animationInterval);
    clearInterval(this.checkHitInterval);
  }
}
