class World {
  character = new Character();
  statusBarHealth = new StatusbarHealth();
  statusBarBottle = new StatusbarBottle();
  statusbarEndBoss = new StatusbarEndBoss();
  statusbarCoins = new StatusbarCoins();
  throwableObject = [];
  splashAnimations = [];
  level = level1;
  currentEnemy;
  canvas;
  ctx;
  keyboard;
  camara_x = 0;
  isGameOver = false;
  animationId = null;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollision();
      this.checkThrowableObject();
    }, 100);
  }

  checkCollision() {
    this.checkCharacter();
    this.checkSalsa();
    this.checkCoins();
    this.checkBottle();
  }

  checkCharacter() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !enemy.currentHit) {
        this.character.hit();
        this.statusBarHealth.setPercentage(this.character.energy);
        this.checkGameOver();
      } else if (enemy.isColliding(this.character)) {
        enemy.hit();
      }
    });
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
          console.log("Getroffen");
          enemy.hit();
          bottle.animateSplash(); // Splash-Animation starten
          this.splashAnimations.push(bottle); // Flasche in die Animationsliste verschieben

          // Entferne Flasche aus throwableObject, aber nicht aus splashAnimations
          setTimeout(() => {
            this.splashAnimations = this.splashAnimations.filter(
              (obj) => obj !== bottle
            );
          }, 1000); // Entferne Flasche nach der Splash-Animation (z. B. 1 Sekunde)
          return false; // Flasche aus throwableObject entfernen
        }
        return true; // Flasche bleibt im Array
      });
    });
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
      this.stopGame();
    }
  }

  stopGame() {
    if (this.isGameOver) {
      setTimeout(() => {
        cancelAnimationFrame(this.animationId);
      }, 1000);
    }
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
    mo.drwaFrame(this.ctx);

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
