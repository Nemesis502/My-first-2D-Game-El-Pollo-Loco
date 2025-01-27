class DrawableObject {
  img;
  imageCache = [];
  currentImage = 0;
  position_x = 20;
  position_y = 20;
  height = 280;
  width = 150;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(
      this.img,
      this.position_x,
      this.position_y,
      this.width,
      this.height
    );
  }

  drwaFrame(ctx) {
    ctx.beginPath();
    ctx.rect(this.position_x, this.position_y, this.width, this.height);
    ctx.stroke();
  }

  drwaFrame(ctx) {
    if (
      this instanceof BackgroundObject ||
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

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
