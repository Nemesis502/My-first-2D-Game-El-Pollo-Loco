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
    checkBelowMusicStorage();
    checkBelowSoundStorage();
  } else if (isMobileDevice) {
    document.getElementById("mobileButtons").classList.remove("hidden");
    checkTopMusicStorage();
    checkTopSoundStorage();
  }
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
