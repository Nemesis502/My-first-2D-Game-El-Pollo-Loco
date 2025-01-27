/**
 * The starting screen element.
 * @type {HTMLElement}
 */
let startDiv = document.getElementById("startDiv");

/**
 * The settings screen element.
 * @type {HTMLElement}
 */
let settingDiv = document.getElementById("settingDiv");

/**
 * The legal notice screen element.
 * @type {HTMLElement}
 */
let legalNotice = document.getElementById("legalNotice");

/**
 * The flag element used to switch languages.
 * @type {HTMLElement}
 */
let flag = document.getElementById("flag");

/**
 * Toggles visibility between the start screen and the settings screen.
 * Shows or hides the respective elements.
 */
function switchStartSettings() {
  settingDiv.classList.toggle("hidden");
  startDiv.classList.toggle("hidden");
}

/**
 * Toggles visibility between the start screen and the story screen.
 * Shows or hides the respective elements.
 */
function switchStartStory() {
  startDiv.classList.toggle("hidden");
  storyDiv.classList.toggle("hidden");
}

/**
 * Toggles visibility between the start screen and the legal notice screen.
 * Shows or hides the respective elements.
 */
function switchStartLegalNotice() {
  startDiv.classList.toggle("hidden");
  legalNotice.classList.toggle("hidden");
}

/**
 * Toggles visibility between the settings screen and the story screen.
 * Shows or hides the respective elements.
 */
function switchSettingsStory() {
  settingDiv.classList.toggle("hidden");
  storyDiv.classList.toggle("hidden");
}

/**
 * Toggles visibility between the settings screen and the legal notice screen.
 * Shows or hides the respective elements.
 */
function switchSettingLegalNotice() {
  settingDiv.classList.toggle("hidden");
  legalNotice.classList.toggle("hidden");
}

/**
 * Toggles visibility between the story screen and the legal notice screen.
 * Shows or hides the respective elements.
 */
function switchStoryLegalNotice() {
  storyDiv.classList.toggle("hidden");
  legalNotice.classList.toggle("hidden");
}

/**
 * Switches the language to German and updates all relevant UI elements.
 * Updates text and images for menus, settings, story, and legal notice screens.
 */
function switchLanguageToGer() {
  changeMenuNamesToGer();
  changeSettingsToGer();
  changeBelowControllToGer();
  changeStoryToGer();
  changeLegalNoticeToGer();
  flag.removeEventListener("click", switchLanguageToGer);
  flag.addEventListener("click", switchLanguageToEng);
  changeFlagToEng();
}

/**
 * Updates the flag image to the English version.
 * Changes the flag icon to indicate English as the selected language.
 */
function changeFlagToEng() {
  if (flag && flag.src.includes("icons8-deutschland-48.png")) {
    flag.src = "adds/img/10_other/icons8-uk-48.png";
  }
}

/**
 * Updates the flag image to the German version.
 * Changes the flag icon to indicate German as the selected language.
 */
function changeFlagToGer() {
  if (flag && flag.src.includes("icons8-uk-48.png")) {
    flag.src = "adds/img/10_other/icons8-deutschland-48.png";
  }
}

/**
 * Updates menu names to German.
 * Changes the text for menu buttons on the start screen.
 */
function changeMenuNamesToGer() {
  document.getElementById("settingStart").innerHTML = "Einstellung";
  document.getElementById("legalNoticeStart").innerHTML = "Impressum";
}

/**
 * Updates the settings screen to German.
 * Changes the text for settings options and controls.
 */
function changeSettingsToGer() {
  document.getElementById("returnSetting").innerHTML = "Zurück zum Start";
  document.getElementById("returnSetting").classList.add("german-size");
  document.getElementById("moveRight").innerHTML = "Laufen Rechts: D";
  document.getElementById("moveLeft").innerHTML = "Laufen Links: A";
  document.getElementById("jump").innerHTML = "Springen: Leertaste";
  document.getElementById("throw").innerHTML = "Flasche werfen: G";
  document.getElementById("switchLanguage").innerHTML = "Sprache wechseln zu:";
  document.getElementById("settingControl").innerHTML = "Einstellung";
  document.getElementById("legalNoticeSetting").innerHTML = "Impressum";
}

/**
 * Updates the below-control screen to German.
 * Changes the text for in-game control instructions and settings options.
 */
function changeBelowControllToGer() {
  document.getElementById("moveRight-below").innerHTML = "Laufen Rechts: D";
  document.getElementById("moveLeft-below").innerHTML = "Laufen Links: A";
  document.getElementById("jump-below").innerHTML = "Springen: Leertaste";
  document.getElementById("throw-below").innerHTML = "Flasche werfen: G";
  document.getElementById("audioSoundBelow").innerHTML =
    "Soundeffekte stummschalten:";
  document.getElementById("returnButtonEnd").innerHTML = "Zurück zum Start";
  document.getElementById("newStartButtonEnd").innerHTML = "Neustart";
  document.getElementById("audioMusicBelow").innerHTML = "Musik stummschalten:";
}

/**
 * Updates the story screen to German.
 * Changes the text for the story content and related buttons.
 */

function changeStoryToGer() {
  document.getElementById("backStart").innerHTML = "Zurück zum Start";
  document.getElementById("story").innerHTML = `
  Es war einmal der mutige Pepe, ein Taco-Verkäufer mit einer geheimen
  Superkraft: der Fähigkeit, Salsa-Flaschen mit unglaublicher
  Präzision zu werfen. Doch eines schicksalhaften Tages stahl eine
  Bande verrückter Hühner seine geheime Guacamole-Rezeptur!
  Entschlossen, seine Ehre und sein Rezept zurückzuholen, schnappte
  sich Pepe seine Salsa-Vorräte und machte sich auf den Weg. Er sprang
  über wütende Küken, wich den pickenden Schnäbeln gefährlicher Hühner
  aus und brachte mit scharfen Salsa-Schüssen alles durcheinander.
  Doch dann erschien der Boss der Bande: El Pollo Supremo, das größte
  aller gefiederten Biester! Mit einem gewagten Sprung in die Luft
  schleuderte Pepe eine extra-scharfe Salsa mitten ins Gefieder. El
  Pollo Supremo gab auf, und Pepe rettete die Guacamole. Er kehrte als
  Held der Taco-Welt zurück – bereit für die nächste Fiesta!
  `;
  document.getElementById("settingStory").innerHTML = "Einstellung";
  document.getElementById("legalNoticeStory").innerHTML = "Impressum";
}

/**
 * Updates the legal notice screen to German.
 * Changes the text for the legal notice and related buttons.
 */
function changeLegalNoticeToGer() {
  document.getElementById("returnLegalNotice").innerHTML = "Zurück zum Start";
  document.getElementById("settingLegalNotice").innerHTML = "Einstellung";
  document.getElementById("legalNoticeControl").innerHTML = "Impressum";
  document.getElementById("legalNoticeText").innerHTML = `
  <p>Impressum Angaben gemäß § 5 TMG und Art. 13 DSGVO</p>
  <p>Anbieter: Bastian Klawes Stadtweg, 26 38176,Bortfeld Deutschland</p>
  <p>Kontakt: Telefon: 01747945251 E-Mail: bastianklawes@gmail.com</p>
  <p>
    Website:
    https://bastian-klawes.developerakademie.net/meine_seite_2/El_Pollo_Loco_Project/
  </p>
  <p>
    Umsatzsteuer-ID: Umsatzsteuer-Identifikationsnummer gemäß § 27a
    Umsatzsteuergesetz: nicht vorhanden
  </p>
  <p>
    Verantwortlich für den Inhalt gemäß § 55 Abs. 2 RStV: Bastian Klawes
    Stadtweg, 26 38176,Bortfeld Deutschland Hinweis auf
    EU-Streitschlichtung: Die Europäische Kommission stellt eine Plattform
    zur Online-Streitbeilegung (OS) bereit:
    https://ec.europa.eu/consumers/odr Unsere E-Mail-Adresse findest du
    oben im Impressum. Haftungsausschluss: Die Inhalte dieser Website
    wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
    Vollständigkeit und Aktualität der Inhalte können wir jedoch keine
    Gewähr übernehmen. Urheberrecht: Die durch den Anbieter erstellten
    Inhalte und Werke auf dieser Website unterliegen dem deutschen
    Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die
    Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung
    außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
    Zustimmung des jeweiligen Autors bzw. Erstellers.
  </p>
  `;
}

/**
 * Switches the language to English and updates all relevant UI elements.
 * Updates text and images for menus, settings, story, and legal notice screens.
 */

function switchLanguageToEng() {
  changeMenuNamesToEng();
  changeSettingsToEng();
  changeBelowControllToEng();
  changeStoryToEng();
  changeLegalNoticeToEng();
  flag.removeEventListener("click", switchLanguageToEng);
  flag.addEventListener("click", switchLanguageToGer);
  changeFlagToGer();
}

/**
 * Updates menu names to English.
 * Changes the text for menu buttons on the start screen.
 */
function changeMenuNamesToEng() {
  document.getElementById("settingStart").innerHTML = "Setting";
  document.getElementById("legalNoticeStart").innerHTML = "Legal Notice";
}

/**
 * Updates the settings screen to English.
 * Changes the text for settings options and controls.
 */
function changeSettingsToEng() {
  document.getElementById("returnSetting").innerHTML = "Return to Start";
  document.getElementById("returnSetting").classList.remove("german-size");
  document.getElementById("moveRight").innerHTML = "Move Right: D";
  document.getElementById("moveLeft").innerHTML = "Move Left: A";
  document.getElementById("jump").innerHTML = "Jump: Space";
  document.getElementById("throw").innerHTML = "Throw Bottle: G";
  document.getElementById("switchLanguage").innerHTML = "Switch Language to:";
  document.getElementById("settingControl").innerHTML = "Setting";
  document.getElementById("legalNoticeSetting").innerHTML = "Legal Notice";
}

/**
 * Updates the below-control screen to English.
 * Changes the text for in-game control instructions and settings options.
 */
function changeBelowControllToEng() {
  document.getElementById("moveRight-below").innerHTML = "Move Right: D";
  document.getElementById("moveLeft-below").innerHTML = "Move Left: A";
  document.getElementById("jump-below").innerHTML = "Jump: Space";
  document.getElementById("throw-below").innerHTML = "Throw Bottle: G";
  document.getElementById("audioSoundBelow").innerHTML = "Mute Soundeffects:";
  document.getElementById("audioMusicBelow").innerHTML = "Mute Music:";
  document.getElementById("returnButtonEnd").innerHTML = "Return to Main Menu";
  document.getElementById("newStartButtonEnd").innerHTML = "Restart";
}

/**
 * Updates the story screen to English.
 * Changes the text for the story content and related buttons.
 */
function changeStoryToEng() {
  document.getElementById("backStart").innerHTML = "Return to Start";
  document.getElementById("story").innerHTML = `
  Once upon a time, there was a brave hero named Pepe, a taco vendor
  with a secret superpower: the ability to throw salsa bottles with
  incredible precision. But one fateful day, a gang of crazy chickens
  stole his secret guacamole recipe! Determined to reclaim his honor
  and his recipe, Pepe grabbed his stash of salsa and set out on a
  daring quest. He leapt over angry chicks, dodged the pecking beaks
  of dangerous chickens, and caused chaos with his spicy salsa shots.
  But then, the gang’s boss appeared: El Pollo Supremo, the largest of
  all feathered beasts! With a daring leap into the air, Pepe hurled
  an extra-spicy salsa straight into its feathers. El Pollo Supremo
  surrendered, and Pepe saved the guacamole. He returned as the hero
  of the taco world – ready for the next fiesta!
  `;
  document.getElementById("settingStory").innerHTML = "Setting";
  document.getElementById("legalNoticeStory").innerHTML = "Legal Notice";
}

/**
 * Updates the legal notice screen to English.
 * Changes the text for the legal notice and related buttons.
 */
function changeLegalNoticeToEng() {
  document.getElementById("returnLegalNotice").innerHTML = "Return to Start";
  document.getElementById("settingLegalNotice").innerHTML = "Setting";
  document.getElementById("legalNoticeControl").innerHTML = "Legal Notice";
  document.getElementById("legalNoticeText").innerHTML = `
  <p>Imprint Information pursuant to § 5 TMG and Art. 13 GDPR</p>
  <p>Provider: Bastian Klawes Stadtweg, 26 38176, Bortfeld Germany</p>
  <p>Contact: Phone: 01747945251 Email: bastianklawes@gmail.com</p>
  <p>
    Website:
    https://bastian-klawes.developerakademie.net/meine_seite_2/El_Pollo_Loco_Project/
  </p>
  <p>
    VAT ID: VAT identification number pursuant to § 27a of the German
    Value Added Tax Act: not available
  </p>
  <p>
    Responsible for content according to § 55 Abs. 2 RStV: Bastian Klawes
    Stadtweg, 26 38176, Bortfeld Germany
  </p>
  <p>
    Note on EU Dispute Resolution: The European Commission provides a
    platform for online dispute resolution (ODR):
    https://ec.europa.eu/consumers/odr. Our email address can be found
    above in the imprint.
  </p>
  <p>
    Disclaimer: The contents of this website have been created with the
    greatest care. However, we cannot guarantee the accuracy,
    completeness, or timeliness of the contents.
  </p>
  <p>
    Copyright: The contents and works created by the provider on this
    website are subject to German copyright law. Contributions by third
    parties are marked as such. The duplication, processing, distribution,
    and any kind of exploitation outside the limits of copyright require
    the written consent of the respective author or creator.
  </p>
  `;
}
