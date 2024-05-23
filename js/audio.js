const swimming_sound = new Audio("./audio/swim.mp3");
const character_shot = new Audio("./audio/bubble_shot.wav");
const character_bubble_hurt = new Audio("./audio/character_hit.wav");
const character_electro_hurt = new Audio("./audio/electro_shock.wav");
const puffer_dead = new Audio("./audio/puffer_dead.mp3");
const jelly_dead = new Audio("./audio/jelly_dead.mp3");
const bubble_pop = new Audio("./audio/bubble_pop.mp3");
const heart_collect = new Audio("./audio/heart_collect.mp3");
const poison_collect = new Audio("./audio/poison_collect.mp3");
const underwater = new Audio("./audio/underwater.mp3");

const sounds = [
  swimming_sound,
  character_shot,
  character_bubble_hurt,
  character_electro_hurt,
  puffer_dead,
  jelly_dead,
  bubble_pop,
  heart_collect,
  poison_collect,
  underwater,
];

function toggleSound() {
  sound = !sound;
  handlerSound(sound);
}

function handlerSound(sound) {
  if (sound === false) {
    setMuteImg();
    muteAllSounds();
  } else {
    setSoundImg();
    unmuteAllSounds();
  }
}

function muteAllSounds() {
  sounds.forEach((sound) => {
    sound.muted = true;
  });
}
function setMuteImg() {
  const soundEl = document.getElementById("sound-menu-icon");
  soundEl.src = "./img/6.Botones/OpenMenu/soundOff2.png";
}
function setSoundImg() {
  const soundEl = document.getElementById("sound-menu-icon");
  soundEl.src = "./img/6.Botones/OpenMenu/sound2.png";
}

function unmuteAllSounds() {
  sounds.forEach((sound) => {
    sound.muted = false;
  });
}
function playSound(sound, volume) {
  sound.volume = volume;
  sound.currentTime = 0;
  sound.play();
}
