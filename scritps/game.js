let canvas;
let world;
let keyboard = new Keyboard();
let isMobileDevice = false;

function init() {
  canvas = document.getElementById("canvas");
  isTouchDevice();
}

function isTouchDevice() {
  return window.matchMedia("(pointer: coarse)").matches;
}

if (isTouchDevice()) {
  isMobileDevice = true;
  document.getElementById("keyboardSetting").classList.add("hidden");
} else {
  isMobileDevice = false;
}

function initLevel() {
  initLevel1();
  world = new World(canvas, keyboard);
  document.getElementById("startDiv").classList.add("hidden");
  document.getElementById("canvas").classList.remove("hidden");
  checkMobileDevice();
  document.getElementById("belowControlAudio").classList.remove("hidden");
}

function checkMobileDevice() {
  if (!isMobileDevice) {
    document.getElementById("belowControl").classList.remove("hidden");
  } else if (isMobileDevice) {
    document.getElementById("mobileButtons").classList.remove("hidden");
  }
}

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

function setSoundeffectsVolumeOff() {
  world.character.snoring_sound.volume = 0.0;
  world.character.player_Hit_Sound.volume = 0.0;
  world.character.jump_Sound.volume = 0.0;
  world.character.waiting_Sound.volume = 0.0;
  world.character.walking_Sound.volume = 0.0;
  world.endBossChicken.attack_Sound.volume = 0.0;
  world.endBossChicken.alert_Sound.volume = 0.0;
  muteAllMinionEnemies();
}

function muteAllMinionEnemies() {
  world.level.enemies.forEach((enemies) => {
    enemies.hit_Sound.volume = 0.0;
  });
}

function setSoundeffectsVolumeOn() {
  world.character.snoring_sound.volume = 1.0;
  world.character.player_Hit_Sound.volume = 1.0;
  world.character.jump_Sound.volume = 1.0;
  world.character.waiting_Sound.volume = 1.0;
  world.character.walking_Sound.volume = 1.0;
  world.endBossChicken.attack_Sound.volume = 1.0;
  world.endBossChicken.alert_Sound.volume = 1.0;
  entmuteAllMinionEnemies();
}

function entmuteAllMinionEnemies() {
  world.level.enemies.forEach((enemies) => {
    enemies.hit_Sound.volume = 1.0;
  });
}

function returnToMainMenu() {
  window.open("index.html", "_self");
  document.getElementById("endScreen").classList.add("hidden");
  document.getElementById("startDiv").classList.remove("hidden");
}

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
  initLevel();
}
