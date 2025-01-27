/**
 * Represents a smaller variant of the chicken enemy in the game.
 * Extends the `MovableObject` class to include animations, sounds, and interactions.
 */
class MiniChicken extends MovableObject {
  /**
   * The vertical position of the mini chicken on the canvas.
   * @type {number}
   * @default 370
   */
  position_y = 370;

  /**
   * The height of the mini chicken in pixels.
   * @type {number}
   * @default 60
   */
  height = 60;

  /**
   * The width of the mini chicken in pixels.
   * @type {number}
   * @default 60
   */
  width = 60;

  /**
   * Flag indicating whether the mini chicken is currently hit.
   * @type {boolean}
   * @default false
   */
  currentHit = false;

  /**
   * Flag indicating whether the hit sound has already been played.
   * @type {boolean}
   * @default false
   */
  hitSoundPlayed = false;

  /**
   * The name of the mini chicken.
   * @type {string}
   * @default "MiniChicken"
   */
  name = "MiniChicken";

  /**
   * Array of file paths for walking animation images.
   * @type {string[]}
   */
  images_Walking = [
    "adds/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "adds/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "adds/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  /**
   * Array of file paths for dead animation images.
   * @type {string[]}
   */
  images_Dead = ["adds/img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  /**
   * Audio file for the hit sound effect.
   * @type {Audio}
   */
  hit_Sound = new Audio("audio/chicken_hit.mp3");

  /**
   * Offset values for collision boundaries of the mini chicken.
   * @type {Object}
   * @property {number} top - Offset from the top boundary.
   * @property {number} bottom - Offset from the bottom boundary.
   * @property {number} left - Offset from the left boundary.
   * @property {number} right - Offset from the right boundary.
   */
  offset = {
    top: 0,
    bottom: 10,
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

    /**
     * The horizontal position of the mini chicken, randomized within a range.
     * @type {number}
     */
    this.position_x = 300 + Math.random() * 900;

    /**
     * The movement speed of the mini chicken, randomized within a range.
     * @type {number}
     */
    this.speed = 0.30 + Math.random() * 0.25;

    this.animate();
  }

  /**
   * Starts the animation loop for the mini chicken.
   * Handles movement, animations, and hit detection.
   */
  animate() {
    // Handles movement to the left
    this.movementInterval = setInterval(() => {
      if (!this.currentHit) {
        this.moveLeft();
      }
    }, 1000 / 60);

    // Handles animation updates for walking or dead states
    this.animationInterval = setInterval(() => {
      if (this.currentHit) {
        this.loadImage(this.images_Dead[0]);
        this.speed = 0;

        if (!this.hitSoundPlayed) {
          this.hit_Sound.play();
          this.hitSoundPlayed = true;
        }
      } else {
        this.playAnimation(this.images_Walking);
      }
    }, 1000 / 12);

    // Checks if the mini chicken has been hurt and updates its state
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
