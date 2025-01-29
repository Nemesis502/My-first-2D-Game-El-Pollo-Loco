class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  curentJump = false;
  acceleration = 2.0;
  energy = 100;
  lastHit = 0;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  /**
   * Applies gravity to the object, causing it to fall or jump.
   * Continues to update the vertical position and speed due to gravity.
   */
  applyGravity() {
    this.gravityInterval = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.position_y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Stops the gravity effect by clearing the gravity interval.
   */
  stopGravity() {
    if (this.gravityInterval) {
      clearInterval(this.gravityInterval);
      this.gravityInterval = null;
    }
  }

  /**
   * Checks whether the object is above the ground level.
   * For throwable objects, it always returns true.
   * @returns {boolean} True if the object is above the ground, false otherwise.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.position_y < 160;
    }
  }

  /**
   * Checks if the object is colliding with another movable object.
   * @param {MovableObject} mo - The other movable object to check collision with.
   * @returns {boolean} True if the objects are colliding, false otherwise.
   */
  isColliding(mo) {
    return (
      this.position_x + this.width - this.offset.right >=
        mo.position_x + mo.offset.left &&
      this.position_y + this.height - this.offset.bottom >
        mo.position_y + mo.offset.top &&
      this.position_x + this.offset.left <
        mo.position_x + mo.width - mo.offset.right &&
      this.position_y + this.offset.top <
        mo.position_y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Reduces the energy of the object by the specified damage amount.
   * Sets the `lastHit` timestamp if energy remains after the hit.
   * @param {number} damage - The amount of damage to apply.
   */
  hit(damage) {
    this.energy -= damage;

    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the object is currently hurt.
   * Determines this based on the time elapsed since the last hit.
   * @returns {boolean} True if the object is hurt, false otherwise.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * Checks if the object is dead (i.e., energy level is 0).
   * @returns {boolean} True if the object is dead, false otherwise.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Moves the object to the right by its current speed.
   * Also sets the `otherDirection` flag to false.
   */
  moveRight() {
    this.position_x += this.speed;
    this.otherDirection = false;
  }

  /**
   * Moves the object to the left by its current speed.
   */
  moveLeft() {
    this.position_x -= this.speed;
  }

  /**
   * Causes the object to jump by setting its vertical speed.
   */
  jump() {
    this.speedY = 25;
  }

  /**
   * Plays an animation by cycling through the provided images.
   * Updates the object's current image based on its animation frame index.
   * @param {string[]} images - An array of image paths for the animation frames.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
