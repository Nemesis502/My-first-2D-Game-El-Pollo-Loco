class DrawableObject {
  img;
  imageCache = [];
  currentImage = 0;
  position_x = 20;
  position_y = 20;
  height = 280;
  width = 150;

  loadImage(path) {
    this.img = new Image(); // <=> this.img = document.getElementById('image') <img id="image" src>
    this.img.src = path;
  }

  draw(ctx) {
    try {
      ctx.drawImage(
        this.img,
        this.position_x,
        this.position_y,
        this.width,
        this.height
      );
    } catch (error) {
      console.warn("Error Image", error);
      console.log("could not load img:", this.img);
    }
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
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
