class Character extends MovableObject {
  imagesWalking = [
    "../adds/img/2_character_pepe/2_walk/W-26.png",
    "../adds/img/2_character_pepe/2_walk/W-22.png",
    "../adds/img/2_character_pepe/2_walk/W-23.png",
    "../adds/img/2_character_pepe/2_walk/W-24.png",
    "../adds/img/2_character_pepe/2_walk/W-25.png",
    "../adds/img/2_character_pepe/2_walk/W-26.png",
  ];
  world;
  speed = 10;

  constructor() {
    super().loadImage("adds/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.imagesWalking);
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT) {
        this.position_x += this.speed;
        this.otherDirection = false;
      }
      if (this.world.keyboard.LEFT) {
        this.position_x -= this.speed;
        this.otherDirection = true;
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.position_x += this.speed;
        let i = this.currentImage % this.imagesWalking.length; // let i = 0 % 6; => 0, Rest 6
        let path = this.imagesWalking[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      }
    }, 100);
  }

  jump() {}
}
