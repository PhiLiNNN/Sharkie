/**
 * @fileoverview This file handles the audio functionalities for the game, including sound effects and background music.
 */

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
const endboss_fight = new Audio("./audio/endboss_fight.mp3");
const win = new Audio("./audio/win.wav");
const lose = new Audio("./audio/lose.wav");
const punch = new Audio("./audio/punch.wav");
const bite = new Audio("./audio/bite.mp3");
const snore = new Audio("./audio/snore.mp3");

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
  endboss_fight,
  win,
  lose,
  punch,
  bite,
  snore,
];

/**
 * Toggles the sound state between mute and unmute.
 */
function toggleSound() {
  sound = !sound;
  handlerSound(sound);
}

/**
 * Handles the sound state by muting or unmuting all sounds based on the given state.
 * @param {boolean} sound - The sound state to set. True for unmuted, false for muted.
 */
function handlerSound(sound) {
  if (sound === false) {
    setMuteImg();
    muteAllSounds();
  } else {
    setSoundImg();
    unmuteAllSounds();
  }
}

/**
 * Mutes all sounds in the game.
 */
function muteAllSounds() {
  sounds.forEach((sound) => {
    sound.muted = true;
  });
}

/**
 * Sets the mute image for the sound icon.
 */
function setMuteImg() {
  const soundEl = document.getElementById("sound-menu-icon");
  soundEl.src = "./img/6.Botones/OpenMenu/soundOff2.png";
}

/**
 * Unmutes all sounds in the game.
 */
function unmuteAllSounds() {
  sounds.forEach((sound) => {
    sound.muted = false;
  });
}

/**
 * Sets the sound image for the sound icon.
 */
function setSoundImg() {
  const soundEl = document.getElementById("sound-menu-icon");
  soundEl.src = "./img/6.Botones/OpenMenu/sound2.png";
}

/**
 * Plays a given audio sound with specified volume and loop settings.
 * @param {HTMLAudioElement} audio - The audio element to play.
 * @param {number} volume - The volume level to set for the audio.
 * @param {boolean} [loop=false] - Whether the audio should loop.
 */
function playSound(audio, volume, loop = false) {
  audio.volume = volume;
  audio.currentTime = 0;
  audio.loop = loop;
  audio.play();
}

/**
 * Stops a given audio sound and resets its playback position.
 * @param {HTMLAudioElement} audio - The audio element to stop.
 */
function stopSound(audio) {
  audio.pause();
  audio.currentTime = 0;
}
