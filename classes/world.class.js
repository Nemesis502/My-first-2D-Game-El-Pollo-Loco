class World {
  character = new Character();
  endBossChicken;
  statusBarHealth = new StatusbarHealth();
  statusBarBottle = new StatusbarBottle();
  statusbarEndBoss = new StatusbarEndBoss();
  statusbarCoins = new StatusbarCoins();
  background_Sound = new Audio("audio/background_music_party_V2.mp3");
  winning_Sound = new Audio("audio/winning_sound.mp3");
  losing_Sound = new Audio("audio/losing_sound.mp3");
  throwableObject = [];
  splashAnimations = [];
  level = level1;
  currentEnemy;
  canvas;
  ctx;
  keyboard;
  camara_x = 0;
  animationId = null;
  intervalId = null;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.resetGameState();
    this.setupAudio();
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  setupAudio() {
    this.background_Sound.volume = 0.7;
    this.background_Sound.loop = true;
    this.background_Sound.addEventListener("canplaythrough", () => {
      this.background_Sound.play().catch(() => {
        window.addEventListener("click", () => {
          this.background_Sound.play();
        });
      });
    });
  }

  run() {
    this.intervalId = setInterval(() => {
      this.checkCollision();
      this.checkThrowableObject();
    }, 100);
  }

  resetGameState() {
    this.isGameOver = false;
    this.animationId = null;
    this.throwableObject = [];
    this.splashAnimations = [];
  }

  checkCollision() {
    this.checkCharacter();
    this.checkSalsa();
    this.checkCoins();
    this.checkBottle();
  }

  checkCharacter() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.name == "EndBoss") {
        this.endBossChicken = enemy;
      }
      if (this.character.isColliding(enemy)) {
        if (!enemy.currentHit && !this.character.isAboveGround()) {
          this.character.hit(3);
          this.statusBarHealth.setPercentage(this.character.energy);
          this.checkCollisionWithEndBoss(enemy);
          this.checkGameOver();
        } else if (
          this.character.speedY < 0 &&
          enemy.isColliding(this.character) &&
          this.character.isAboveGround()
        ) {
          enemy.hit(20);
        }
      }
    });
  }

  checkCollisionWithEndBoss(enemy) {
    if (enemy.name == "EndBoss") {
      this.endBossChicken.setPlayerCloseRange(1);
    }
  }

  checkSalsa() {
    this.level.salsa = this.level.salsa.filter((salsa) => {
      if (
        this.character.isColliding(salsa) &&
        this.statusBarBottle.percentage < 100
      ) {
        this.statusBarBottle.setPercentage(20);
        return false;
      }
      return true;
    });
  }

  checkCoins() {
    this.level.coins = this.level.coins.filter((coins) => {
      if (this.character.isColliding(coins)) {
        this.statusbarCoins.setPercentage(20);
        if (this.statusbarCoins.percentage == 120) {
          this.statusBarHealth.setPercentage(100);
          this.statusbarCoins.setPercentage(-120);
        }
        return false;
      }
      return true;
    });
  }

  checkBottle() {
    this.level.enemies.forEach((enemy) => {
      this.throwableObject = this.throwableObject.filter((bottle) => {
        if (enemy.isColliding(bottle)) {
          return this.splashAction(enemy, bottle);
        }
        return true;
      });
    });
  }

  splashAction(enemy, bottle) {
    enemy.hit(20);
    if (enemy.name == "EndBoss") {
      this.checkHitEndboss(enemy);
    }
    bottle.animateSplash();
    this.splashAnimations.push(bottle);
    setTimeout(() => {
      this.splashAnimations = this.splashAnimations.filter(
        (obj) => obj !== bottle
      );
    }, 1000);
    return false;
  }

  checkHitEndboss(enemy) {
    this.statusbarEndBoss.setPercentage(-20);
    enemy.setCurrentHit(1);
    this.checkGameOver();
  }

  checkApproachEndBoss() {
    if (this.endBossChicken.position_x - this.character.position_x <= 350) {
      this.endBossChicken.setPlayerNearby(1);
      setTimeout(() => {
        this.endBossChicken.setPlayerNearby(0);
      }, 3000);
    }
  }

  checkThrowableObject() {
    if (this.keyboard.G && this.statusBarBottle.percentage >= 20) {
      let bottle = new ThrowableObject(
        this.character.position_x + 100,
        this.character.position_y + 100
      );
      this.throwableObject.push(bottle);
      this.statusBarBottle.setPercentage(-20);
    }
  }

  checkGameOver() {
    if (this.character.energy <= 0) {
      this.isGameOver = true;
      this.stopGameEnemyWin();
    } else if (this.endBossChicken.energy <= 0) {
      this.isGameOver = true;
      this.stopGamePlayerWin();
    }
  }

  stopGamePlayerWin() {
    if (this.isGameOver) {
      setTimeout(() => {
        cancelAnimationFrame(this.animationId);
        clearInterval(this.intervalId);
        this.background_Sound.pause();
        this.endBossChicken.stopAllSounds();
        this.character.stopAllSounds();
        this.showPlayerEndScreenWin();
      }, 1000);
    }
  }

  showPlayerEndScreenWin() {
    document.getElementById("endScreen").classList.remove("hidden");
    document.getElementById("startDiv").classList.add("hidden");
    document.getElementById("canvas").classList.add("hidden");
    document.getElementById("endScreen").classList.add("end-div-win");
    this.winning_Sound.play();
  }

  stopGameEnemyWin() {
    if (this.isGameOver) {
      setTimeout(() => {
        cancelAnimationFrame(this.animationId);
        clearInterval(this.intervalId);
        this.background_Sound.pause();
        this.endBossChicken.stopAllSounds();
        this.character.stopAllSounds();
        this.showPlayerEndScreenLost();
      }, 1000);
    }
  }

  showPlayerEndScreenLost() {
    document.getElementById("endScreen").classList.remove("hidden");
    document.getElementById("startDiv").classList.add("hidden");
    document.getElementById("canvas").classList.add("hidden");
    document.getElementById("endScreen").classList.add("end-div-lost");
    this.losing_Sound.play();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camara_x, 0);
    this.addObjectsToMap(this.level.background);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.salsa);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.throwableObject);
    this.addObjectsToMap(this.splashAnimations);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);

    // ------- Space for fixed obkects -------
    this.ctx.translate(-this.camara_x, 0);
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusbarEndBoss);
    this.addToMap(this.statusbarCoins);
    this.ctx.translate(this.camara_x, 0);

    this.ctx.translate(-this.camara_x, 0);

    let self = this;
    this.animationId = requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(object) {
    object.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.spinImage(mo);
    }

    mo.draw(this.ctx);
    // mo.drwaFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  spinImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.position_x = mo.position_x * -1;
  }

  flipImageBack(mo) {
    mo.position_x = mo.position_x * -1;
    this.ctx.restore();
  }
}
