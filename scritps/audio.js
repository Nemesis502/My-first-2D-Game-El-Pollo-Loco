function checkmuteMusicTop(imageId) {
  let topMusicImg = document.getElementById(imageId);
  if (topMusicImg && topMusicImg.src.includes("music_mute.png")) {
    world.background_Sound.volume = 0.0;
  } else if (topMusicImg && topMusicImg.src.includes("music_on.png")) {
    world.background_Sound.volume = 0.7;
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
    world.winning_Sound.volume = 0.0;
    world.losing_Sound.volume = 0.0;
  } else if (!audioMusicBelowCheckBox.checked) {
    world.background_Sound.volume = 0.7;
    world.winning_Sound.volume = 1.0;
    world.losing_Sound.volume = 1.0;
  }
  saveCheckboxState(checkboxId);
}

function muteMusicTop(imageId) {
  let topMusicImg = document.getElementById(imageId);
  if (topMusicImg && topMusicImg.src.includes("music_on.png")) {
    topMusicImg.src = "adds/img/10_other/music_mute.png";
    world.background_Sound.volume = 0.0;
    world.winning_Sound.volume = 0.0;
    world.losing_Sound.volume = 0.0;
  } else if (topMusicImg && topMusicImg.src.includes("music_mute.png")) {
    topMusicImg.src = "adds/img/10_other/music_on.png";
    world.background_Sound.volume = 0.7;
    world.winning_Sound.volume = 1.0;
    world.losing_Sound.volume = 1.0;
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
