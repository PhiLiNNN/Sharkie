/**
 * @class DrawableObject
 * Represents a drawable object in the game.
 */
class DrawableObject {
  x;
  y;
  height;
  width;
  offsetX = 0;
  offsetY = 0;
  offsetHeight = 0;
  offsetWidth = 0;
  img;
  imageCache = {};
  currentImage = 0;
  hurtSoundPlayed;

  /**
   * Plays a sound only once when the object is deade.
   * @param {Audio} sound - The sound to be played.
   */
  playDeadSound(sound) {
    if (this.isDead() && !this.hurtSoundPlayed) {
      playSound(sound, 0.2);
      sound.currentTime = 0;
      this.hurtSoundPlayed = true;
    }
  }

  /**
   * Loads an image for the drawable object.
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads multiple images into the image cache.
   * @param {string[]} arr - An array of image paths to be loaded.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;

      this.imageCache[path] = img;
    });
  }

  /**
   * Plays an animation sequence once.
   * @param {string[]} arr - An array of image paths representing the animation frames.
   * @param {number} ms - The duration in milliseconds between each frame.
   */
  playAnimationOnce(arr, ms) {
    let idx = 0;
    const updateAnimation = setInterval(() => {
      if (idx < arr.length && !pauseGame) {
        let path = arr[idx];
        this.img = this.imageCache[path];
        idx++;
      } else clearInterval(updateAnimation);
    }, ms);
  }

  /**
   * Plays an animation sequence repeatedly.
   * @param {string[]} arr - An array of image paths representing the animation frames.
   */
  playAnimation(arr) {
    let idx = this.currentImage % arr.length;
    let path = arr[idx];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Draws a frame around the drawable object.
   * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
   */
  drawFrame(ctx) {
    if (this instanceof Character || this instanceof MovableObject || this instanceof PoisonItem) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(
        this.x + this.offsetX,
        this.y + this.offsetY,
        this.width - this.offsetWidth,
        this.height - this.offsetHeight
      );
    } else if (this instanceof ThrowableObject) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
    }
    ctx.stroke();
  }

  /**
   * Draws the drawable object on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
