class ThrowableObject extends MovableObject {
  imagesBottle_Rotation = [
    "adds/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "adds/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "adds/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "adds/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];
  imagesBottle_Splash = [
    "adds/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "adds/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "adds/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "adds/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "adds/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "adds/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, y) {
    super();
    this.loadImage("adds/img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.imagesBottle_Rotation);
    this.loadImages(this.imagesBottle_Splash);
    this.position_y = y;
    this.position_x = x;
    this.width = 100;
    this.height = 100;
    this.trow();
  }

  trow() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.position_x += 10;
    }, 25);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.imagesBottle_Rotation);
    }, 200);
  }

  animateSplash() {
    this.speedY = 0;
    this.speed = 0;
  
    let animationInterval = setInterval(() => {
      this.playAnimation(this.imagesBottle_Splash);
    }, 200);
  
    // Stoppe die Animation nach 1 Sekunde
    setTimeout(() => {
      clearInterval(animationInterval);
    }, 1000);
  }
}
