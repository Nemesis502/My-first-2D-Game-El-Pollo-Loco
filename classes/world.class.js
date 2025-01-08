class World {
  character = new Character();
  statusBarHealth = new StatusbarHealth();
  statusBarBottle = new StatusbarBottle();
  statusbarEndBoss = new StatusbarEndBoss();
  statusbarCoins = new StatusbarCoins();
  throwableObject = [];
  level = level1;
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
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !enemy.currentHit) {
        this.character.hit();
        this.statusBarHealth.setPercentage(this.character.energy);
        this.checkGameOver();
      } else if (enemy.isColliding(this.character)){
        console.log(enemy.currentHit);
        enemy.hit();
      }
    });
  }

  checkThrowableObject(){
    if(this.keyboard.G){
      let bottle = new ThrowableObject(this.character.position_x + 100, this.character.position_y + 100);
      this.throwableObject.push(bottle);
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
