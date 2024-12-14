class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Cloud()];
  background = [
    new BackgroundObject("../adds/img/5_background/layers/1_first_layer/1.png", 0, 20),
  ];
  canvas;
  ctx;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.addToMap(this.character);
    this.addObjectsToMap(this.background);
    this.addObjectsToMap(this.enemies);
    this.addObjectsToMap(this.clouds);

    // this.enemies.forEach((enemy) => {
    //   this.addToMap(enemy);
    // });

    // this.clouds.forEach((cloud) => {
    //   this.addToMap(cloud);
    // });

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(object) {
    object.forEach(o => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    this.ctx.drawImage(
      mo.img,
      mo.position_x,
      mo.position_y,
      mo.width,
      mo.height
    );
  }
}
