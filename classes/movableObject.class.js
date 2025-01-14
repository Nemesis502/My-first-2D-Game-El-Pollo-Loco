class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  curentJump = false;
  acceleration = 2.0;
  energy = 100;
  lastHit = 0;

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
      // Throwable object should always fall
      return true;
    } else {
      return this.position_y < 160;
    }
  }

  isColliding(mo) {
    return (
      this.position_x + this.width > mo.position_x &&
      this.position_y + this.height > mo.position_y &&
      this.position_x < mo.position_x &&
      this.position_y < mo.position_y + mo.height
    );
  }

  //  isColliding (obj) {
  //    return  (this.X + this.width) >= obj.X && this.X <= (obj.X + obj.width) &&
  //            (this.Y + this.offsetY + this.height) >= obj.Y &&
  //            (this.Y + this.offsetY) <= (obj.Y + obj.height) &&
  //            obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.

  //  }

  hit() {
    this.energy -= 3;

    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
    timepassed = timepassed / 1000; // Difference in s
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
    let i = this.currentImage % images.length; // let i = 0 % 6; => 0, Rest 6
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
