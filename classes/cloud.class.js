class Cloud extends MovableObject {
  position_y = 50;
  height = 250;
  width = 450;

  /**
   * Creates an instance of the Cloud class.
   * Initializes the cloud's image and random horizontal position, then starts the animation loop.
   */
  constructor() {
    super().loadImage("adds/img/5_background/layers/4_clouds/1.png");
    this.position_x = 0 + Math.random() * 1700;

    this.animate();
  }

  /**
   * Starts the animation loop for the cloud.
   * Continuously moves the cloud to the left to simulate motion.
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
