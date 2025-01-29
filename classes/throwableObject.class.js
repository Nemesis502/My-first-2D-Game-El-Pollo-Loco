/**
 * Represents a throwable object in the game, such as a salsa bottle.
 * Extends the `MovableObject` class to include animations, gravity effects, and interactions.
 */
class ThrowableObject extends MovableObject {
  /**
   * Array of file paths for the bottle rotation animation images.
   * @type {string[]}
   */
  imagesBottle_Rotation = [
    "adds/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "adds/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "adds/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "adds/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  /**
   * Array of file paths for the bottle splash animation images.
   * @type {string[]}
   */
  imagesBottle_Splash = [
    "adds/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "adds/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "adds/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "adds/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "adds/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "adds/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Creates an instance of the `ThrowableObject` class.
   * Initializes the object with a specific position, size, animations, and movement.
   * @param {number} x - The initial horizontal position of the object.
   * @param {number} y - The initial vertical position of the object.
   */
  constructor(x, y) {
    super();
    this.loadImage("adds/img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.imagesBottle_Rotation);
    this.loadImages(this.imagesBottle_Splash);

    /**
     * The vertical position of the object on the canvas.
     * @type {number}
     */
    this.position_y = y;

    /**
     * The horizontal position of the object on the canvas.
     * @type {number}
     */
    this.position_x = x;

    /**
     * The width of the throwable object in pixels.
     * @type {number}
     * @default 100
     */
    this.width = 100;

    /**
     * The height of the throwable object in pixels.
     * @type {number}
     * @default 100
     */
    this.height = 100;

    this.trow();
  }

  /**
   * Throws the object by applying upward speed and forward movement.
   * Activates gravity and starts forward movement animation.
   */
  trow() {
    this.speedY = 30;
    this.applyGravity();
    /**
     * Moves the object forward continuously.
     * @type {number}
     */
    this.movmentForward = setInterval(() => {
      this.position_x += 10;
    }, 25);

    this.animate();
  }

  /**
   * Animates the rotation of the throwable object during flight.
   */
  animate() {
    /**
     * Handles the rotation animation of the object.
     * @type {number}
     */
    this.rotaionIntervall = setInterval(() => {
      this.playAnimation(this.imagesBottle_Rotation);
    }, 200);
  }

  /**
   * Animates the splash effect when the throwable object hits a surface.
   * Stops gravity and forward movement animations.
   */
  animateSplash() {
    this.speedY = 0;
    this.speed = 0;
    this.stopGravity();
    this.cancelAnimationForward();

    let animationInterval = setInterval(() => {
      this.playAnimation(this.imagesBottle_Splash);
    }, 1000 / 9);

    setTimeout(() => {
      clearInterval(animationInterval);
    }, 1000);
  }

  /**
   * Cancels the forward movement and rotation animations.
   */
  cancelAnimationForward() {
    clearInterval(this.movmentForward);
    clearInterval(this.rotaionIntervall);
  }
}
