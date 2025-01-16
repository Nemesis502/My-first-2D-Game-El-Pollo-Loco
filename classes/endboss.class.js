class Endboss extends MovableObject {
  position_y = 60;
  height = 400;
  width = 400;
  name = "EndBoss";
  currentHit = false;
  images_Walking = [
    "adds/img/4_enemie_boss_chicken/1_walk/G1.png",
    "adds/img/4_enemie_boss_chicken/1_walk/G2.png",
    "adds/img/4_enemie_boss_chicken/1_walk/G3.png",
    "adds/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  images_Hurt = [
    "adds/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "adds/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "adds/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  images_Alert = [
    "adds/img/4_enemie_boss_chicken/2_alert/G5.png",
    "adds/img/4_enemie_boss_chicken/2_alert/G6.png",
    "adds/img/4_enemie_boss_chicken/2_alert/G7.png",
    "adds/img/4_enemie_boss_chicken/2_alert/G8.png",
    "adds/img/4_enemie_boss_chicken/2_alert/G9.png",
    "adds/img/4_enemie_boss_chicken/2_alert/G10.png",
    "adds/img/4_enemie_boss_chicken/2_alert/G11.png",
    "adds/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  images_Attack = [
    "adds/img/4_enemie_boss_chicken/3_attack/G13.png",
    "adds/img/4_enemie_boss_chicken/3_attack/G14.png",
    "adds/img/4_enemie_boss_chicken/3_attack/G15.png",
    "adds/img/4_enemie_boss_chicken/3_attack/G16.png",
    "adds/img/4_enemie_boss_chicken/3_attack/G17.png",
    "adds/img/4_enemie_boss_chicken/3_attack/G18.png",
    "adds/img/4_enemie_boss_chicken/3_attack/G19.png",
    "adds/img/4_enemie_boss_chicken/3_attack/G20.png",
  ];
  images_Dead = [
    "adds/img/4_enemie_boss_chicken/5_dead/G24.png",
    "adds/img/4_enemie_boss_chicken/5_dead/G25.png",
    "adds/img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super().loadImage(this.images_Walking[0]);
    this.loadImages(this.images_Walking);
    this.loadImages(this.images_Hurt);
    this.loadImages(this.images_Alert);
    this.loadImages(this.images_Attack);
    this.loadImages(this.images_Dead);
    this.position_x = 2000;
    this.animate();
  }

  animate() {
    // this.moveLeft();

    setInterval(() => {
      if (this.currentHit) {
        this.playAnimation(this.images_Hurt);
      } else if (this.isDead()) {
        this.playAnimation(this.images_Dead);
      } else {
        this.playAnimation(this.images_Walking);
      }
    }, 1000 / 7.5);
  }

  setCurrentHit(i) {
    if ((i = 1)) {
      this.currentHit = true;
    }
    setTimeout(() => {
      this.currentHit = false;
    }, 3000);
  }
}
