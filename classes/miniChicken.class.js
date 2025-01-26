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
    bottom: 10,
    left: 0,
    right: 0,
  };

  constructor() {
    super().loadImage(this.images_Walking[0]);
    this.loadImages(this.images_Walking);
    this.loadImages(this.images_Dead);
    this.position_x = 300 + Math.random() * 900;
    this.speed = 0.30 + Math.random() * 0.25;
    this.animate();
  }

  animate() {
    this.movementInterval = setInterval(() => {
      if (!this.currentHit) {
        this.moveLeft();
      }
    }, 1000 / 60);

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

    this.checkHitInterval = setInterval(() => {
      if (this.isHurt() && !this.currentHit) {
        this.currentHit = true;
      }
    }, 200);
  }

  cancelAnimation() {
    clearInterval(this.movementInterval);
    clearInterval(this.animationInterval);
    clearInterval(this.checkHitInterval);
  }
}
