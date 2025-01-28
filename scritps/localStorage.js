function checkTopMusicStorage() {
  let musicLocalStorage = JSON.parse(localStorage.getItem("topMusicImg"));
  if (musicLocalStorage == null) {
    return;
  } else {
    restoreImageState(musicLocalStorage, "topMusicImg");
    checkmuteMusicTop("topMusicImg");
  }
}

function checkBelowMusicStorage() {
  let musicLocalStorage = JSON.parse(
    localStorage.getItem("audioMusicBelowCheckBox")
  );
  if (musicLocalStorage == null) {
    return;
  } else {
    restoreCheckboxState(musicLocalStorage, "audioMusicBelowCheckBox");
    muteMusicBelow("audioMusicBelowCheckBox");
  }
}

function checkBelowSoundStorage() {
  let musicLocalStorage = JSON.parse(
    localStorage.getItem("audioSoundBelowCheckBox")
  );
  if (musicLocalStorage == null) {
    return;
  } else {
    restoreCheckboxState(musicLocalStorage, "audioSoundBelowCheckBox");
    muteSoundeffectsBelow("audioSoundBelowCheckBox");
  }
}

function checkTopSoundStorage() {
  let soundLocalStorage = JSON.parse(localStorage.getItem("topSoundeffctImg"));
  if (soundLocalStorage == null) {
    return;
  } else {
    restoreImageState(soundLocalStorage, "topSoundeffctImg");
    checkmuteEffectsTop("topSoundeffctImg");
  }
}

function saveCheckboxState(checkboxId) {
  let checkbox = document.getElementById(checkboxId);
  localStorage.setItem(checkboxId, JSON.stringify(checkbox.checked));
}

function saveImageState(imageId) {
  let imageElement = document.getElementById(imageId);
  if (imageElement) {
    localStorage.setItem(imageId, JSON.stringify(imageElement.src));
  }
}

function restoreImageState(localStorage, id) {
  let images = document.getElementById(id);
  let savedSrc = localStorage;
  images.src = savedSrc;
}

function restoreCheckboxState(localStorage, id) {
  let checkboxes = document.getElementById(id);
  let savedState = localStorage;
  checkboxes.checked = savedState;
}
