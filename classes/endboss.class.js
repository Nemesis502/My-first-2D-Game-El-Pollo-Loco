class Endboss extends MovableObject {
  position_y = 60;
  height = 400;
  width = 400;
  name = "EndBoss";
  currentHit = false;
  firstContact = false;
  playerAttackRange = false;
  attackMode = false;
  speed = 0.5;
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
  alert_Sound = new Audio("audio/chicken_alert.mp3");
  attack_Sound = new Audio("audio/chicken_attack.mp3");
  hit_Sound = new Audio("audio/chicken_attack.mp3");

  offset = {
    top: 50,
    bottom: 20,
    left: 20,
    right: 50,
  };

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
    let i = 0;
    setInterval(() => {
      if (i > 10) {
        this.moveLeft();
      }
    }, 1000 / 60);
    setInterval(() => {
      if (world.character.position_x < 1450 && !this.firstContact) {
        i = 0;
      } else if (world.character.position_x > 1450 && !this.firstContact) {
        this.firstContact = true;
        this.alert_Sound.play();
        setTimeout(() => {
          this.alert_Sound.pause();
        }, 2000);
      }
      if (this.isDead()) {
        this.playAnimation(this.images_Dead);
        this.speed = 0;
      } else if (this.currentHit) {
        this.playEndBossHurt();
        setTimeout(() => {
          this.playEndBossAttack();
        }, 2000);
      } else if (this.playerAttackRange) {
        this.playAttackRange();
      } else if (i < 10) {
        this.playAnimation(this.images_Alert);
      } else {
        this.playAnimation(this.images_Walking);
      }
      i++;
    }, 200);
  }

  playDead() {
    setInterval(() => {
      this.playAnimation(this.images_Dead);
      this.speed = 0;
    }, 1000 / 7);
  }

  playEndBossHurt() {
    if (this.isHurtActive) return;
    this.isHurtActive = true;
    let hurtInterval = setInterval(() => {
      this.speed = 0;
      this.playAnimation(this.images_Hurt);
      this.hit_Sound.play();
    }, 1000 / 3);

    setTimeout(() => {
      this.currentHit = false;
      this.attackMode = false;
      clearInterval(hurtInterval);
      this.isHurtActive = false;
      this.speed = 0.5;
    }, 1500);
  }

  playEndBossAttack() {
    if (this.isAttackActive) return;
    this.isAttackActive = true;
    let attackInterval = setInterval(() => {
      this.speed = 1.5;
      this.attack_Sound.play();
      this.playAnimation(this.images_Attack);
    }, 1000 / 3);

    setTimeout(() => {
      this.speed = 0.5;
      this.attack_Sound.pause();
      clearInterval(attackInterval);
      this.currentHit = false;
      this.isAttackActive = false;
    }, 1500);
  }

  playAttackRange() {
    setInterval(() => {
      this.speed = 0;
      this.playAnimation(this.images_Attack);
      this.playAttackSound();
    }, 2000);
  }

  playAlert() {
    setInterval(() => {
      this.speed = 0;
      this.playAnimation(this.images_Alert);
      this.playAlertSound();
      this.playersNearby = false;
      this.firstContact = false;
    }, 1500);
  }

  playWalk(i) {
    setInterval(() => {
      if (i > 10) {
        this.moveLeft();
      }
    }, 1000 / 5);
  }

  setPlayerCloseRange(i) {
    if (i === 1) {
      this.playerAttackRange = true;
    }
    setTimeout(() => {
      this.playerAttackRange = false;
    }, 2000);
  }

  setCurrentHit(i) {
    if (i === 1) {
      this.currentHit = true;
      this.attackMode = true;
    }
  }

  playAttackSound() {
    this.alert_Sound.pause();
    this.alert_Sound.currentTime = 0;
    this.attack_Sound.play();
  }

  playAlertSound() {
    this.attack_Sound.pause();
    this.attack_Sound.currentTime = 0;
    this.alert_Sound.play();
  }

  stopAllSounds() {
    this.stopAlertSound();
    this.stopAttackSound();
    this.stopHitSound();
  }

  stopAlertSound() {
    this.alert_Sound.pause();
    this.alert_Sound.currentTime = 0;
    this.alert_Sound.volume = 0.0;
  }
  stopAttackSound() {
    this.attack_Sound.pause();
    this.attack_Sound.currentTime = 0;
    this.attack_Sound.volume = 0.0;
  }
  stopHitSound() {
    this.hit_Sound.pause();
    this.hit_Sound.currentTime = 0;
    this.hit_Sound.volume = 0.0;
  }
}
