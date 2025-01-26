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

  applyGravity() {
    this.gravityInterval = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.position_y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  stopGravity() {
    if (this.gravityInterval) {
      clearInterval(this.gravityInterval);
      this.gravityInterval = null;
    }
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.position_y < 160;
    }
  }

  isColliding(mo) {
    return (
      this.position_x + this.width - this.offset.right >
        mo.position_x + mo.offset.left &&
      this.position_y + this.height - this.offset.bottom >
        mo.position_y + mo.offset.top &&
      this.position_x + this.offset.left <
        mo.position_x + mo.width - mo.offset.right &&
      this.position_y + this.offset.top <
        mo.position_y + mo.height - mo.offset.bottom
    );
  }

  hit(damage) {
    this.energy -= damage;

    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  moveRight() {
    this.position_x += this.speed;
    this.otherDirection = false;
  }

  moveLeft() {
    this.position_x -= this.speed;
  }

  jump() {
    this.speedY = 25;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
