let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
}

function initLevel() {
  initLevel1();
  world = new World(canvas, keyboard);
  console.log(world);

  document.getElementById("startDiv").classList.add("hidden");
  document.getElementById("canvas").classList.remove("hidden");
}

function muteSoundeffects() {
  let audioSoundBelowCheckBox = document.getElementById(
    "audioSoundBelowCheckBox"
  );
  let audioSoundCheckBox = document.getElementById("audioSoundCheckBox");

  if (audioSoundCheckBox.checked) {
    audioSoundBelowCheckBox.checked = true;
    setSoundeffectsVolumeOff();
  } else if (!audioSoundCheckBox.checked) {
    audioSoundBelowCheckBox.checked = false;
    setSoundeffectsVolumeOn();
  }
}

function muteSoundeffectsBelow() {
  let audioSoundBelowCheckBox = document.getElementById(
    "audioSoundBelowCheckBox"
  );
  let audioSoundCheckBox = document.getElementById("audioSoundCheckBox");

  if (audioSoundBelowCheckBox.checked) {
    audioSoundCheckBox.checked = true;
    setSoundeffectsVolumeOff();
  } else if (!audioSoundBelowCheckBox.checked) {
    audioSoundCheckBox.checked = false;
    setSoundeffectsVolumeOn();
  }
}

function muteMusic() {
  let audioMusicBelowCheckBox = document.getElementById(
    "audioMusicBelowCheckBox"
  );
  let audioMusicCheckBox = document.getElementById("audioMusicCheckBox");

  if (audioMusicCheckBox.checked) {
    audioMusicBelowCheckBox.checked = true;
    world.background_Sound.volume = 0.0;
  } else if (!audioMusicCheckBox.checked) {
    audioMusicBelowCheckBox.checked = false;
    world.background_Sound.volume = 0.7;
  }
}

function setSoundeffectsVolumeOff() {
  world.character.snoring_sound.volume = 0.0;
  world.character.player_Hit_Sound.volume = 0.0;
  world.character.jump_Sound.volume = 0.0;
  world.character.waiting_Sound.volume = 0.0;
  world.character.walking_Sound.volume = 0.0;
  console.log(world.level.enemies);
  world.endBossChicken.attack_Sound.volume = 0.0;
  world.endBossChicken.alert_Sound.volume = 0.0;
}

function setSoundeffectsVolumeOn() {
  world.character.snoring_sound.volume = 1.0;
  world.character.hit_Sound.volume = 1.0;
  world.character.jump_Sound.volume = 1.0;
  world.character.waiting_Sound.volume = 1.0;
  world.character.walking_Sound.volume = 1.0;
  world.endBossChicken.attack_Sound.volume = 1.0;
  world.endBossChicken.alert_Sound.volume = 1.0;
}

function muteMusicBelow() {
  let audioMusicBelowCheckBox = document.getElementById(
    "audioMusicBelowCheckBox"
  );
  let audioMusicCheckBox = document.getElementById("audioMusicCheckBox");

  if (audioMusicBelowCheckBox.checked) {
    audioMusicCheckBox.checked = true;
    world.background_Sound.volume = 0.0;
  } else if (!audioMusicBelowCheckBox.checked) {
    audioMusicCheckBox.checked = false;
    world.background_Sound.volume = 0.7;
  }
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

window.addEventListener("keydown", (event) => {
  if (event.keyCode === 87) {
    keyboard.UP = true;
  }
  if (event.keyCode === 65) {
    keyboard.LEFT = true;
  }
  if (event.keyCode === 83 || event.keyCode === 40) {
    keyboard.DOWN = true;
  }
  if (event.keyCode === 68) {
    keyboard.RIGHT = true;
  }
  if (event.keyCode === 32) {
    keyboard.SPACE = true;
  }
  if (event.keyCode === 71) {
    keyboard.G = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.keyCode === 87) {
    keyboard.UP = false;
  }
  if (event.keyCode === 65) {
    keyboard.LEFT = false;
  }
  if (event.keyCode === 83 || event.keyCode === 40) {
    keyboard.DOWN = false;
  }
  if (event.keyCode === 68) {
    keyboard.RIGHT = false;
  }
  if (event.keyCode === 32) {
    keyboard.SPACE = false;
  }
  if (event.keyCode === 71) {
    keyboard.G = false;
  }
});
