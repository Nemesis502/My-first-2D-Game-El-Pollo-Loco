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

  drwaFrame(ctx) {
    ctx.beginPath();
    ctx.rect(this.position_x, this.position_y, this.width, this.height);
    ctx.stroke();
  }

  //  drwaFrame(ctx) {
  //    if (
  //      this instanceof BackgroundObject ||
  //      this instanceof ThrowableObject ||
  //      this instanceof Chicken ||
  //      this instanceof Character ||
  //      this instanceof MiniChicken ||
  //      this instanceof Endboss
  //    ) {
  //      ctx.beginPath();
  //      ctx.lineWidth = "5";
  //      ctx.strokeStyle = "blue";
  //      ctx.rect(this.position_x, this.position_y, this.width, this.height);
  //      ctx.stroke();
  //    }
  //  }

  // drwaFrame(ctx) {
  //   // Zeichne die Standard-Umrisse (gesamte Objektgröße)
  //   if (
  //     this instanceof BackgroundObject ||
  //     this instanceof ThrowableObject ||
  //     this instanceof Chicken ||
  //     this instanceof Character ||
  //     this instanceof MiniChicken ||
  //     this instanceof Endboss
  //   ) {
  //     // Standard-Umriss
  //     ctx.beginPath();
  //     ctx.lineWidth = "5";
  //     ctx.strokeStyle = "blue";
  //     ctx.rect(this.position_x, this.position_y, this.width, this.height);
  //     ctx.stroke();
  //   }

  //   // Zeichne die Offset-Boxen für Chicken, Character und MiniChicken
  //   if (
  //     this instanceof Chicken ||
  //     this instanceof Character ||
  //     this instanceof MiniChicken ||
  //     this instanceof Endboss
  //   ) {
  //     const offsetX = this.offset.left || 0;
  //     const offsetY = this.offset.top || 0;
  //     const offsetWidth = this.width - (this.offset.left + this.offset.right || 0);
  //     const offsetHeight =
  //       this.height - (this.offset.top + this.offset.bottom || 0);

  //     ctx.beginPath();
  //     ctx.lineWidth = "2";
  //     ctx.strokeStyle = "red"; // Rot für die Offset-Box
  //     ctx.rect(
  //       this.position_x + offsetX, // Linke obere Ecke mit Offset
  //       this.position_y + offsetY, // Obere Ecke mit Offset
  //       offsetWidth, // Breite der Offset-Box
  //       offsetHeight // Höhe der Offset-Box
  //     );
  //     ctx.stroke();
  //   }
  // }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
