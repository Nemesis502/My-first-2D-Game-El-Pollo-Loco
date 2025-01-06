class ThrowableObject extends MovableObject {
  imagesBottle_Splash = [
    "adds/img/1_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "adds/img/2_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "adds/img/3_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "adds/img/4_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "adds/img/5_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "adds/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
  ];

  constructor(x, y) {
    super();
    this.loadImage("adds/img/6_salsa_bottle/salsa_bottle.png");
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
  }
}
