/**
 * Represents the game world.
 * Manages all game elements such as the character, enemies, level objects, status bars, and interactions.
 */
class World {
  /**
   * The main character in the game.
   * @type {Character}
   */
  character = new Character();

  /**
   * The end boss enemy in the game.
   * @type {EndBoss|undefined}
   */
  endBossChicken;

  /**
   * The status bar for the character's health.
   * @type {StatusbarHealth}
   */
  statusBarHealth = new StatusbarHealth();

  /**
   * The status bar for the salsa bottles collected by the character.
   * @type {StatusbarBottle}
   */
  statusBarBottle = new StatusbarBottle();

  /**
   * The status bar for the end boss's health.
   * @type {StatusbarEndBoss}
   */
  statusbarEndBoss = new StatusbarEndBoss();

  /**
   * The status bar for the coins collected by the character.
   * @type {StatusbarCoins}
   */
  statusbarCoins = new StatusbarCoins();

  /**
   * The background sound of the game.
   * @type {Audio}
   */
  background_Sound = new Audio("audio/background_music_party_V2.mp3");

  /**
   * The sound effect played when the player wins.
   * @type {Audio}
   */
  winning_Sound = new Audio("audio/winning_sound.mp3");

  /**
   * The sound effect played when the player loses.
   * @type {Audio}
   */
  losing_Sound = new Audio("audio/losing_sound.mp3");

  /**
   * An array of throwable objects (e.g., salsa bottles).
   * @type {ThrowableObject[]}
   */
  throwableObject = [];

  /**
   * An array of splash animations triggered by throwable objects.
   * @type {ThrowableObject[]}
   */
  splashAnimations = [];

  /**
   * The current level of the game.
   * @type {Level}
   */
  level = level1;

  /**
   * The current enemy being interacted with.
   * @type {MovableObject|undefined}
   */
  currentEnemy;

  /**
   * The canvas element used for rendering the game.
   * @type {HTMLCanvasElement}
   */
  canvas;

  /**
   * The rendering context for the canvas.
   * @type {CanvasRenderingContext2D}
   */
  ctx;

  /**
   * The keyboard input handler.
   * @type {Keyboard}
   */
  keyboard;

  /**
   * The x-coordinate for the camera offset.
   * @type {number}
   * @default 0
   */
  camara_x = 0;

  /**
   * The ID of the animation frame for rendering.
   * @type {number|null}
   */
  animationId = null;

  /**
   * The ID of the interval for game logic updates.
   * @type {number|null}
   */
  intervalId = null;

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
      if (enemy.name === "EndBoss") {
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
      if (this.character.isColliding(coin)) {
        this.statusbarCoins.setPercentage(20);
        if (this.statusbarCoins.percentage === 120) {
          this.statusBarHealth.setPercentage(100);
          this.statusbarCoins.setPercentage(-120);
        }
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
        if (enemy.isColliding(bottle)) {
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
  if (this.keyboard.G && this.statusBarBottle.percentage >= 20) {
    /**
     * Creates a new throwable object (salsa bottle) at the character's position.
     * The horizontal position is offset by 100 pixels, and the vertical position is offset by 100 pixels.
     * @type {ThrowableObject}
     */
    let bottle = new ThrowableObject(
      this.character.position_x + 100,
      this.character.position_y + 100
    );

    // Adds the created throwable object to the game's throwable object array.
    this.throwableObject.push(bottle);

    // Reduces the bottle percentage in the status bar by 20% after throwing.
    this.statusBarBottle.setPercentage(-20);
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

  /**
   * Displays the victory screen for the player.
   */
  showPlayerEndScreenWin() {
    document.getElementById("endScreen").classList.remove("hidden");
    document.getElementById("startDiv").classList.add("hidden");
    document.getElementById("canvas").classList.add("hidden");
    document.getElementById("endScreen").classList.add("end-div-win");
    this.winning_Sound.play();
  }

  /**
   * Stops the game and displays the loss screen if the player loses.
   */
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

  /**
   * Displays the loss screen for the player.
   */
  showPlayerEndScreenLost() {
    document.getElementById("endScreen").classList.remove("hidden");
    document.getElementById("startDiv").classList.add("hidden");
    document.getElementById("canvas").classList.add("hidden");
    document.getElementById("endScreen").classList.add("end-div-lost");
    this.losing_Sound.play();
  }

  /**
   * Draws all elements of the game world on the canvas.
   */
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

    // Fixed UI elements
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
