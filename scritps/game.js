/**
 * The main canvas element for rendering the game.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * The game world instance.
 * @type {World}
 */
let world;

/**
 * The keyboard input handler.
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * Flag indicating whether the device is a mobile device.
 * @type {boolean}
 * @default false
 */
let isMobileDevice = false;

/**
 * Initializes the game setup, including canvas and device detection.
 */
function init() {
  canvas = document.getElementById("canvas");
  isTouchDevice();
}

/**
 * Detects whether the current device is a touch device.
 * @returns {boolean} True if the device supports touch input, false otherwise.
 */
function isTouchDevice() {
  return window.matchMedia("(pointer: coarse)").matches;
}

if (isTouchDevice()) {
  isMobileDevice = true;
  document.getElementById("keyboardSetting").classList.add("hidden");
} else {
  isMobileDevice = false;
}

/**
 * Initializes the game level and creates a new `World` instance.
 * Hides the start screen and displays the game canvas.
 */
function initLevel() {
  initLevel1();
  world = new World(canvas, keyboard);
  document.getElementById("startDiv").classList.add("hidden");
  document.getElementById("canvas").classList.remove("hidden");
  checkMobileDevice();
  document.getElementById("belowControlAudio").classList.remove("hidden");
}

/**
 * Checks if the game is running on a mobile device and displays the appropriate controls.
 */
function checkMobileDevice() {
  if (!isMobileDevice) {
    document.getElementById("belowControl").classList.remove("hidden");
  } else if (isMobileDevice) {
    document.getElementById("mobileButtons").classList.remove("hidden");
  }
}

/**
 * Toggles the sound effects in the game based on the state of the checkbox.
 */
function muteSoundeffectsBelow() {
  let audioSoundBelowCheckBox = document.getElementById(
    "audioSoundBelowCheckBox"
  );

  if (audioSoundBelowCheckBox.checked) {
    setSoundeffectsVolumeOff();
  } else if (!audioSoundBelowCheckBox.checked) {
    setSoundeffectsVolumeOn();
  }
}

/**
 * Toggles the background music in the game based on the state of the checkbox.
 */
function muteMusicBelow() {
  let audioMusicBelowCheckBox = document.getElementById(
    "audioMusicBelowCheckBox"
  );

  if (audioMusicBelowCheckBox.checked) {
    world.background_Sound.volume = 0.0;
  } else if (!audioMusicBelowCheckBox.checked) {
    world.background_Sound.volume = 0.7;
  }
}

/**
 * Mutes all sound effects in the game.
 */
function setSoundeffectsVolumeOff() {
  world.character.snoring_sound.volume = 0.0;
  world.character.player_Hit_Sound.volume = 0.0;
  world.character.jump_Sound.volume = 0.0;
  world.character.walking_Sound.volume = 0.0;
  world.endBossChicken.attack_Sound.volume = 0.0;
  world.endBossChicken.alert_Sound.volume = 0.0;
  muteAllMinionEnemies();
}

/**
 * Mutes the sound effects for all minion enemies in the game.
 */
function muteAllMinionEnemies() {
  world.level.enemies.forEach((enemy) => {
    enemy.hit_Sound.volume = 0.0;
  });
}

/**
 * Enables all sound effects in the game.
 */
function setSoundeffectsVolumeOn() {
  world.character.snoring_sound.volume = 1.0;
  world.character.player_Hit_Sound.volume = 1.0;
  world.character.jump_Sound.volume = 1.0;
  world.character.walking_Sound.volume = 1.0;
  world.endBossChicken.attack_Sound.volume = 1.0;
  world.endBossChicken.alert_Sound.volume = 1.0;
  entmuteAllMinionEnemies();
}

/**
 * Enables the sound effects for all minion enemies in the game.
 */
function entmuteAllMinionEnemies() {
  world.level.enemies.forEach((enemy) => {
    enemy.hit_Sound.volume = 1.0;
  });
}

/**
 * Returns to the main menu, reloading the index page.
 */
function returnToMainMenu() {
  window.open("index.html", "_self");
  document.getElementById("endScreen").classList.add("hidden");
  document.getElementById("startDiv").classList.remove("hidden");
}

/**
 * Restarts the game by resetting the game state and reinitializing the level.
 */
function restartGame() {
  if (world) {
    cancelAnimationFrame(world.animationId);
    clearInterval(world.intervalId);
  }
  world = null;
  level1 = null;
  document.getElementById("endScreen").classList.add("hidden");
  document
    .getElementById("endScreen")
    .classList.remove("end-div-win", "end-div-lost");
  document.getElementById("audioSoundBelowCheckBox").checked = false;
  document.getElementById("audioMusicBelowCheckBox").checked = false;
  initLevel();
}
