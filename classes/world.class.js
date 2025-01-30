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
  i = 20;

  /**
   * Creates an instance of the `World` class.
   * Initializes the game world, sets up audio, draws the canvas, and starts the game loop.
   * @param {HTMLCanvasElement} canvas - The canvas element used for rendering the game.
   * @param {Keyboard} keyboard - The keyboard input handler.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.resetGameState();
    this.setupAudio();
    this.setendBossChicken();
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Links the game world to the character for interactions.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Identifies and sets the EndBoss character in the game.
   */
  setendBossChicken() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.name === "EndBoss") {
        this.endBossChicken = enemy;
      }
    });
  }

  /**
   * Sets up the background audio with volume and looping configurations.
   */
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

  /**
   * Starts the game loop, checking for collisions and throwable objects.
   */
  run() {
    this.intervalId = setInterval(() => {
      this.checkCollision();
      this.checkThrowableObject();
      this.i++;
    }, 100);
  }

  /**
   * Resets the game state, clearing animations and arrays.
   */
  resetGameState() {
    this.isGameOver = false;
    this.animationId = null;
    this.throwableObject = [];
    this.splashAnimations = [];
  }

  /**
   * Checks all types of collisions in the game world.
   */
  checkCollision() {
    this.checkCharacter();
    this.checkSalsa();
    this.checkCoins();
    this.checkBottle();
  }

  /**
   * Checks collisions between the character and enemies.
   */
  checkCharacter() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (!enemy.currentHit && !this.character.isAboveGround()) {
          this.setCharacterDamge(enemy);
        } else if (
          enemy.isColliding(this.character) &&
          this.character.isAboveGround() &&
          this.character.speedY < 0
        ) {
          enemy.hit(20);
        }
      }
    });
  }
  
  /**
   * Applies damage to the character when colliding with an enemy.
   * Reduces the character's health, updates the health bar,
   * checks for collision with the end boss, and verifies if the game is over.
   *
   * @param {Object} enemy - The enemy object that caused the damage.
   */
  setCharacterDamge(enemy) {
    this.character.hit(3);
    this.statusBarHealth.setPercentage(this.character.energy);
    this.checkCollisionWithEndBoss(enemy);
    this.checkGameOver();
  }

  /**
   * Checks collisions between the character and the end boss.
   * @param {MovableObject} enemy - The end boss enemy.
   */
  checkCollisionWithEndBoss(enemy) {
    if (enemy.name === "EndBoss") {
      this.endBossChicken.setPlayerCloseRange(1);
    }
  }

  /**
   * Checks collisions between the character and salsa bottles.
   */
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

  /**
   * Checks collisions between the character and coins.
   */
  checkCoins() {
    this.level.coins = this.level.coins.filter((coin) => {
      if (
        this.character.isColliding(coin) &&
        this.statusbarCoins.percentage < 100
      ) {
        this.statusbarCoins.setPercentage(20);
        return false;
      }
      return true;
    });
  }

  /**
   * Checks collisions between throwable objects and enemies.
   */
  checkBottle() {
    this.level.enemies.forEach((enemy) => {
      this.throwableObject = this.throwableObject.filter((bottle) => {
        if (enemy.isColliding(bottle) && !enemy.currentHit) {
          return this.splashAction(enemy, bottle);
        }
        return true;
      });
    });
  }

  /**
   * Handles the splash animation and damage when a throwable object hits an enemy.
   * @param {MovableObject} enemy - The enemy hit by the throwable object.
   * @param {ThrowableObject} bottle - The throwable object that hit the enemy.
   * @returns {boolean} Whether the throwable object should be kept in the array.
   */
  splashAction(enemy, bottle) {
    enemy.hit(20);
    if (enemy.name === "EndBoss") {
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

  /**
   * Checks if the end boss was hit and updates its health.
   * @param {MovableObject} enemy - The end boss enemy.
   */
  checkHitEndboss(enemy) {
    this.statusbarEndBoss.setPercentage(-20);
    enemy.setCurrentHit(1);
    this.checkGameOver();
  }

  /**
   * Checks if the player has pressed the "G" key and has enough bottles available to throw.
   * If the conditions are met, a new throwable object (salsa bottle) is created and added to the game.
   * The status bar for bottles is updated accordingly.
   */
  checkThrowableObject() {
    console.log(this.character.otherDirection);
    
    if (this.keyboard.G && !this.character.otherDirection && this.statusBarBottle.percentage > 0 && this.i > 20) {
      let bottle = new ThrowableObject(
        this.character.position_x + 100,
        this.character.position_y + 100
      );
      this.throwableObject.push(bottle);
      this.statusBarBottle.setPercentage(-20);
      this.i = 0;
    }
  }

  /**
   * Checks if the player or the end boss has won and ends the game accordingly.
   */
  checkGameOver() {
    if (this.character.energy <= 0) {
      this.isGameOver = true;
      this.stopGameEnemyWin();
    } else if (this.endBossChicken.energy <= 0) {
      this.isGameOver = true;
      this.stopGamePlayerWin();
    }
  }

  /**
   * Stops the game and displays the victory screen if the player wins.
   */
  stopGamePlayerWin() {
    if (this.isGameOver) {
      cancelAnimationFrame(this.animationId);
      clearInterval(this.intervalId);
      this.background_Sound.pause();
      this.endBossChicken.stopAllSounds();
      this.character.stopAllSounds();
      this.showPlayerEndScreenWin();
    }
  }

  /**
   * Displays the victory screen for the player.
   */
  showPlayerEndScreenWin() {
    this.winning_Sound.play();
    document.getElementById("endScreen").classList.remove("hidden");
    document.getElementById("startDiv").classList.add("hidden");
    document.getElementById("canvasContainer").classList.add("hidden");
    document.getElementById("endScreen").classList.add("end-div-win");
  }

  /**
   * Stops the game and displays the loss screen if the player loses.
   */
  stopGameEnemyWin() {
    if (this.isGameOver) {
      cancelAnimationFrame(this.animationId);
      clearInterval(this.intervalId);
      this.background_Sound.pause();
      this.endBossChicken.stopAllSounds();
      this.character.stopAllSounds();
      this.showPlayerEndScreenLost();
    }
  }

  /**
   * Displays the loss screen for the player.
   */
  showPlayerEndScreenLost() {
    this.losing_Sound.play();
    document.getElementById("endScreen").classList.remove("hidden");
    document.getElementById("startDiv").classList.add("hidden");
    document.getElementById("canvasContainer").classList.add("hidden");
    document.getElementById("endScreen").classList.add("end-div-lost");
  }

  /**
   * Draws all elements of the game world on the canvas.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.nonFixUI();
    this.fixUI();
    let self = this;
    this.animationId = requestAnimationFrame(function () {
      self.draw();
    });
  }
  /**
   * Draws non-fixed UI elements in the game world.
   */
  nonFixUI() {
    this.ctx.translate(this.camara_x, 0);
    this.addObjectsToMap(this.level.background);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.salsa);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.throwableObject);
    this.addObjectsToMap(this.splashAnimations);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
  }
  /**
   * Draws fixed UI elements in the game world.
   */
  fixUI() {
    this.ctx.translate(-this.camara_x, 0);
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusbarEndBoss);
    this.addToMap(this.statusbarCoins);
    this.ctx.translate(this.camara_x, 0);

    this.ctx.translate(-this.camara_x, 0);
  }

  /**
   * Adds an array of objects to the canvas.
   * @param {DrawableObject[]} object - The array of drawable objects to add to the canvas.
   */
  addObjectsToMap(object) {
    object.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a single drawable object to the canvas, handling its direction.
   * @param {DrawableObject} mo - The drawable object to add to the canvas.
   * If a frame is needed for collision checking,
   * then add the function: mo.drawFrame(this.ctx) after mo.draw.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.spinImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips the object image horizontally for a mirrored effect.
   * @param {DrawableObject} mo - The object to flip.
   */
  spinImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.position_x = mo.position_x * -1;
  }

  /**
   * Restores the image to its original orientation after being flipped.
   * @param {DrawableObject} mo - The object to restore.
   */
  flipImageBack(mo) {
    mo.position_x = mo.position_x * -1;
    this.ctx.restore();
  }
}
