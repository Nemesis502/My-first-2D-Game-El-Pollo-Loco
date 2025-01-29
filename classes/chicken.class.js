/**
 * Represents a chicken enemy in the game.
 * Extends the `MovableObject` class to include animations, sound effects, and interactions.
 */
class Chicken extends MovableObject {
  /**
   * The vertical position of the chicken on the canvas.
   * @type {number}
   * @default 330
   */
  position_y = 330;

  /**
   * The height of the chicken in pixels.
   * @type {number}
   * @default 100
   */
  height = 100;

  /**
   * The width of the chicken in pixels.
   * @type {number}
   * @default 100
   */
  width = 100;

  /**
   * Flag indicating whether the chicken is currently hit.
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
   * The name of the chicken enemy.
   * @type {string}
   * @default "Chicken"
   */
  name = "Chicken";

  /**
   * Array of file paths for walking animation images.
   * @type {string[]}
   */
  images_Walking = [
    "adds/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "adds/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "adds/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  /**
   * Array of file paths for the dead animation image.
   * @type {string[]}
   */
  images_Dead = ["adds/img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  /**
   * Audio file for the hit sound effect.
   * @type {Audio}
   */
  hit_Sound = new Audio("audio/chicken_hit.mp3");

  /**
   * Offset values for collision boundaries of the chicken.
   * @type {Object}
   * @property {number} top - Offset from the top boundary.
   * @property {number} bottom - Offset from the bottom boundary.
   * @property {number} left - Offset from the left boundary.
   * @property {number} right - Offset from the right boundary.
   */
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

    /**
     * The horizontal position of the chicken, randomized within a range.
     * @type {number}
     */
    this.position_x = 300 + Math.random() * 1200;

    /**
     * The movement speed of the chicken, randomized within a range.
     * @type {number}
     */
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

  movementLeft() {

    this.movementInterval = setInterval(() => {
      if (!this.currentHit) {
        this.moveLeft();
      }
    }, 1000 / 60);
  }

  diffrentAnimation() {

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
  }

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
