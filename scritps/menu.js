let startDiv = document.getElementById("startDiv");
let settingDiv = document.getElementById("settingDiv");
let legalNotice = document.getElementById("legalNotice");
let flag = document.getElementById("flag");

function switchStartSettings() {
  settingDiv.classList.toggle("hidden");
  startDiv.classList.toggle("hidden");
}

function switchStartStory() {
  startDiv.classList.toggle("hidden");
  storyDiv.classList.toggle("hidden");
}

function switchStartLegalNotice() {
  startDiv.classList.toggle("hidden");
  legalNotice.classList.toggle("hidden");
}

function switchSettingsStory() {
  settingDiv.classList.toggle("hidden");
  storyDiv.classList.toggle("hidden");
}

function switchSettingLegalNotice() {
  settingDiv.classList.toggle("hidden");
  legalNotice.classList.toggle("hidden");
}

function switchStoryLegalNotice() {
  storyDiv.classList.toggle("hidden");
  legalNotice.classList.toggle("hidden");
}

function switchLanguageToGer() {
  changeMenuNamesToGer();
  changeSettingsToGer();
  changeStoryToGer();
  changeLegalNoticeToGer();
  flag.removeEventListener("click", switchLanguageToGer);
  flag.addEventListener("click", switchLanguageToEng);
  changeFlagToEng();
}
function changeFlagToEng() {
  if (flag && flag.src.includes("icons8-deutschland-48.png")) {
    flag.src = "adds/img/10_other/union-jack-1027898_640.jpg";
    console.log("Changing flag to Union Jack");
  }
}

function changeFlagToGer() {
  if (
    flag &&
    flag.src.includes("adds/img/10_other/union-jack-1027898_640.jpg")
  ) {
    flag.src = "adds/img/10_other/icons8-deutschland-48.png";
    console.log("Changing flag to German");
  }
}

function changeMenuNamesToGer() {
  document.getElementById("settingStart").innerHTML = "Einstellung";
  document.getElementById("legalNoticeStart").innerHTML = "Impressum";
}

function changeSettingsToGer() {
  document.getElementById("returnSetting").innerHTML = "Zurück zum Start";
  document.getElementById("moveRight").innerHTML = "Laufen Rechts: D";
  document.getElementById("moveLeft").innerHTML = "Laufen Links: A";
  document.getElementById("jump").innerHTML = "Springen: Leertaste";
  document.getElementById("throw").innerHTML = "Flasche werfen: G";
  document.getElementById("audioSound").innerHTML =
    "Soundeffekte stummschalten:";
  document.getElementById("audioMusic").innerHTML = "Musik stummschalten:";
  document.getElementById("switchLanguage").innerHTML = "Sprache wechseln zu:";
  document.getElementById("audioControl").innerHTML =
    "Zeige dauerhaft Audio Steuerung:";
  document.getElementById("settingControl").innerHTML = "Einstellung";
  document.getElementById("legalNoticeSetting").innerHTML = "Impressum";
}

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

function switchLanguageToEng() {
  changeFlagToGer();
}
