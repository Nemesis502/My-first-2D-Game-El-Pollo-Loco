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

function checkAudioTouchDevice() {
  if (!isMobileDevice) {
    document.getElementById("belowControlAudio").classList.remove("hidden");
  } else if (isMobileDevice) {
    document.getElementById("topAudioContainer").classList.remove("hidden");
  }
}

/**
 * Initializes the game level and creates a new `World` instance.
 * Hides the start screen and displays the game canvas.
 */
function initLevel() {
  initLevel1();
  setWorld();

  checkMobileDevice();
  checkAudioTouchDevice();
  document.getElementById("startDiv").classList.add("hidden");
  document.getElementById("canvasContainer").classList.remove("hidden");
  // restoreImageState();
  // restoreCheckboxState();
}

function setWorld() {
  world = new World(canvas, keyboard);
}

/**
 * Checks if the game is running on a mobile device and displays the appropriate controls.
 */
function checkMobileDevice() {
  if (!isMobileDevice) {
    document.getElementById("belowControl").classList.remove("hidden");
  } else if (isMobileDevice) {
    document.getElementById("mobileButtons").classList.remove("hidden");
    checkMusicStorage();
    checkSoundStorage();
  }
}

function checkMusicStorage() {
  let musicLocalStorage = JSON.parse(localStorage.getItem("topMusicImg"));
  if (musicLocalStorage == null) {
    return;
  } else {
    restoreImageState(musicLocalStorage, "topMusicImg");
    checkmuteMusicTop("topMusicImg");
  }
}

function checkmuteMusicTop(imageId) {
  let topMusicImg = document.getElementById(imageId);
  if (topMusicImg && topMusicImg.src.includes("music_mute.png")) {
    world.background_Sound.volume = 0.0;
  } else if (topMusicImg && topMusicImg.src.includes("music_on.png")) {
    world.background_Sound.volume = 0.7;
  }
}

function checkSoundStorage() {
  let soundLocalStorage = JSON.parse(localStorage.getItem("topSoundeffctImg"));
  console.log(soundLocalStorage);

  if (soundLocalStorage == null) {
    return;
  } else {
    restoreImageState(soundLocalStorage, "topSoundeffctImg");
    checkmuteEffectsTop("topSoundeffctImg");
  }
}

function checkmuteEffectsTop(imageId) {
  let soundEffctImg = document.getElementById(imageId);
  if (soundEffctImg && soundEffctImg.src.includes("effects_mute.png")) {
    setSoundeffectsVolumeOff();
  } else if (soundEffctImg && soundEffctImg.src.includes("effects_on.png")) {
    setSoundeffectsVolumeOn();
  }
}

/**
 * Toggles the sound effects in the game based on the state of the checkbox.
 */
function muteSoundeffectsBelow(checkboxId) {
  let audioSoundBelowCheckBox = document.getElementById(checkboxId);

  if (audioSoundBelowCheckBox.checked) {
    setSoundeffectsVolumeOff();
  } else if (!audioSoundBelowCheckBox.checked) {
    setSoundeffectsVolumeOn();
  }
  saveCheckboxState(checkboxId);
}

function muteSoundEffectsTop(imageId) {
  console.log(imageId);
  let soundEffctImg = document.getElementById(imageId);
  if (soundEffctImg && soundEffctImg.src.includes("effects_on.png")) {
    soundEffctImg.src = "adds/img/10_other/effects_mute.png";
    setSoundeffectsVolumeOff();
  } else if (soundEffctImg && soundEffctImg.src.includes("effects_mute.png")) {
    soundEffctImg.src = "adds/img/10_other/effects_on.png";
    setSoundeffectsVolumeOn();
  }
  saveImageState(imageId);
}

/**
 * Toggles the background music in the game based on the state of the checkbox.
 */
function muteMusicBelow(checkboxId) {
  let audioMusicBelowCheckBox = document.getElementById(checkboxId);
  if (audioMusicBelowCheckBox.checked) {
    world.background_Sound.volume = 0.0;
  } else if (!audioMusicBelowCheckBox.checked) {
    world.background_Sound.volume = 0.7;
  }
  saveCheckboxState(checkboxId);
}

function muteMusicTop(imageId) {
  let topMusicImg = document.getElementById(imageId);
  if (topMusicImg && topMusicImg.src.includes("music_on.png")) {
    topMusicImg.src = "adds/img/10_other/music_mute.png";
    world.background_Sound.volume = 0.0;
  } else if (topMusicImg && topMusicImg.src.includes("music_mute.png")) {
    topMusicImg.src = "adds/img/10_other/music_on.png";
    world.background_Sound.volume = 0.7;
  }
  saveImageState(imageId);
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

function saveCheckboxState(checkboxId) {
  let checkbox = document.getElementById(checkboxId);
  localStorage.setItem(checkboxId, JSON.stringify(checkbox.checked));
  // console.log(localStorage);
}

function saveImageState(imageId) {
  let imageElement = document.getElementById(imageId);
  if (imageElement) {
    console.log(imageElement);
    localStorage.setItem(imageId, JSON.stringify(imageElement.src));
  }
  // console.log(localStorage);
}

function restoreImageState(localStorage, id) {
  let images = document.getElementById(id);
  // console.log(images);
  let savedSrc = localStorage;
  // console.log(savedSrc);
  images.src = savedSrc;
  // console.log(images.src);
}

function restoreCheckboxState() {
  let checkboxes = document.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach((checkbox) => {
    let savedState = localStorage.getItem(checkbox.id);
    if (savedState !== null) {
      checkbox.checked = savedState === "true";
    }
  });
  muteMusicBelow("audioMusicBelowCheckBox");
  muteSoundeffectsBelow("audioSoundBelowCheckBox");
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
