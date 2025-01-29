class DrawableObject {
  img;
  imageCache = [];
  currentImage = 0;
  position_x = 20;
  position_y = 20;
  height = 280;
  width = 150;

  /**
   * Loads an image from the specified file path.
   * @param {string} path - The file path of the image to load.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the object on the specified canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.drawImage(
      this.img,
      this.position_x,
      this.position_y,
      this.width,
      this.height
    );
  }

  /**
   * Draws a frame (bounding box) around the object for debugging purposes.
   * Adds a blue frame for certain object types and a red frame for collision boundaries.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawFrame(ctx) {
    if (
      this instanceof ThrowableObject ||
      this instanceof Chicken ||
      this instanceof Character ||
      this instanceof MiniChicken ||
      this instanceof Endboss 
    ) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.position_x, this.position_y, this.width, this.height);
      ctx.stroke();
    }
    if (
      this instanceof Chicken ||
      this instanceof Character ||
      this instanceof MiniChicken ||
      this instanceof Endboss
    ) {
      let offsetX = this.offset.left || 0;
      let offsetY = this.offset.top || 0;
      let offsetWidth =
        this.width - (this.offset.left + this.offset.right || 0);
      let offsetHeight =
        this.height - (this.offset.top + this.offset.bottom || 0);

      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "red";
      ctx.rect(
        this.position_x + offsetX,
        this.position_y + offsetY,
        offsetWidth,
        offsetHeight
      );
      ctx.stroke();
    }
  }

  /**
   * Loads multiple images and caches them in the `imageCache` property.
   * @param {string[]} arr - An array of file paths for the images to load.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
