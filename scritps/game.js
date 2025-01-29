let canvas;
let world;
let keyboard = new Keyboard();
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

/**
 * Determines if the current device is a touch device and updates the `isMobileDevice` flag.
 * Also adjusts UI elements based on the device type.
 */
if (isTouchDevice()) {
  isMobileDevice = true;
  document.getElementById("keyboardSetting").classList.add("hidden");
} else {
  isMobileDevice = false;
}

/**
 * Checks the current device type and adjusts audio control visibility accordingly.
 */
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

/**
 * Sets up the game world by creating a new instance of `World`.
 */
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
