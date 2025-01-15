class Chicken extends MovableObject {
  position_y = 330;
  height = 100;
  width = 100;
  currentHit = false;
  name = "Chicken";
  images_Walking = [
    "adds/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "adds/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "adds/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  images_Dead = ["adds/img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  offset = {
    top: 120,
    bottom: 30,
    left: 40,
    right: 30,
  };

  constructor() {
    super().loadImage(this.images_Walking[0]);
    this.loadImages(this.images_Walking);
    this.loadImages(this.images_Dead);

    this.position_x = 200 + Math.random() * 1200;
    this.speed = 0.15 + Math.random() * 0.25;

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

  

