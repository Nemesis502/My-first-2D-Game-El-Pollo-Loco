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
  i = 0;

  /**
   * Creates an instance of the Endboss class.
   * Initializes animations, positions, and starts the animation loop.
   */
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

  /**
   * Starts the animation loop for the end boss.
   * Handles movement, animations, and player interactions.
   */
  animate() {
    this.playWalk();
    setInterval(() => {
      this.playalert();
      if (this.isDead()) {
        this.playAnimation(this.images_Dead);
        this.speed = 0;
      } else if (this.currentHit) {
        this.playHurtAnimation();
      } else if (this.playerAttackRange) {
        this.playAttackRange();
      } else if (this.i < 10) {
        this.playAnimation(this.images_Alert);
      } else {
        this.playAnimation(this.images_Walking);
      }
      this.i++;
    }, 200);
  }

  /**
   * Plays the walking animation and moves the end boss to the left.
   * @param {number} i - Frame index for animation.
   */
  playWalk() {
    setInterval(() => {
      if (this.i > 10) {
        this.moveLeft();
      }
    }, 1000 / 60);
  }
  /**
   * Triggers the alert animation and plays the alert sound if the player is detected nearby.
   */
  playalert() {
    if (world.character.position_x < 1450 && !this.firstContact) {
      this.i = 0;
    } else if (world.character.position_x > 1450 && !this.firstContact) {
      this.firstContact = true;
      this.alert_Sound.play();
      setTimeout(() => {
        this.alert_Sound.pause();
      }, 2000);
    }
  }

  /**
   * Plays the dead animation and stops movement.
   */
  playDead() {
    setInterval(() => {
      this.playAnimation(this.images_Dead);
      this.speed = 0;
    }, 1000 / 7);
  }
  /**
   * Triggers the hurt animation and transitions into attack mode after a delay.
   */
  playHurtAnimation() {
    this.playEndBossHurt();
    setTimeout(() => {
      this.playEndBossAttack();
    }, 2000);
  }

  /**
   * Plays the hurt animation and temporarily stops movement.
   */
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

  /**
   * Plays the attack animation and increases movement speed.
   */
  playEndBossAttack() {
    if (this.isAttackActive) return;
    this.isAttackActive = true;
    let attackInterval = setInterval(() => {
      this.speed = 4.5;
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

  /**
   * Plays the attack range animation when the player is within range.
   */
  playAttackRange() {
    setInterval(() => {
      this.speed = 0;
      this.playAnimation(this.images_Attack);
      this.playAttackSound();
    }, 2000);
  }

  /**
   * Plays the alert animation and sound when the player is detected nearby.
   */
  playAlert() {
    setInterval(() => {
      this.speed = 0;
      this.playAnimation(this.images_Alert);
      this.playAlertSound();
      this.playersNearby = false;
      this.firstContact = false;
    }, 1500);
  }

  /**
   * Sets the player's close range flag for interactions.
   * @param {number} i - Indicator to set the flag.
   */
  setPlayerCloseRange(i) {
    if (i === 1) {
      this.playerAttackRange = true;
    }
    setTimeout(() => {
      this.playerAttackRange = false;
    }, 2000);
  }

  /**
   * Sets the current hit status and activates attack mode.
   * @param {number} i - Indicator to set the hit status.
   */
  setCurrentHit(i) {
    if (i === 1) {
      this.currentHit = true;
      this.attackMode = true;
    }
  }

  /**
   * Plays the attack sound effect.
   */
  playAttackSound() {
    this.alert_Sound.pause();
    this.alert_Sound.currentTime = 0;
    this.attack_Sound.play();
  }

  /**
   * Plays the alert sound effect.
   */
  playAlertSound() {
    this.attack_Sound.pause();
    this.attack_Sound.currentTime = 0;
    this.alert_Sound.play();
  }

  /**
   * Stops all sound effects associated with the end boss.
   */
  stopAllSounds() {
    this.stopAlertSound();
    this.stopAttackSound();
    this.stopHitSound();
  }

  /**
   * Stops the alert sound effect and resets its state.
   */
  stopAlertSound() {
    this.alert_Sound.pause();
    this.alert_Sound.currentTime = 0;
    this.alert_Sound.volume = 0.0;
  }

  /**
   * Stops the attack sound effect and resets its state.
   */
  stopAttackSound() {
    this.attack_Sound.pause();
    this.attack_Sound.currentTime = 0;
    this.attack_Sound.volume = 0.0;
  }

  /**
   * Stops the hit sound effect and resets its state.
   */
  stopHitSound() {
    this.hit_Sound.pause();
    this.hit_Sound.currentTime = 0;
    this.hit_Sound.volume = 0.0;
  }
}
