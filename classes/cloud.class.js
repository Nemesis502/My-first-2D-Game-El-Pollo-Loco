class Cloud extends MovableObject {
  constructor() {
    super().loadImage("../adds/img/5_background/layers/4_clouds/1.png");
    this.position_x = 0 + Math.random() * 500;
    this.position_y = 50;
    this.height = 250;
    this.width = 450;
    this.animate();
  }

  animate(){
    setInterval(() => {
      this.position_x -= 0.15;
    }, 1000 / 60);
    
  }
}


