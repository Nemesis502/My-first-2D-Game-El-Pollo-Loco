class Cloud extends MovableObject {
  position_y = 50;
  height = 250;
  width = 450;

  constructor() {
    super().loadImage("adds/img/5_background/layers/4_clouds/1.png");
    this.position_x = 0 + Math.random() * 1700;

    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }

}
