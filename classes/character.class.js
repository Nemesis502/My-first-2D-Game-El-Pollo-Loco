class Character extends MovableObject {
  imagesWalking = [
    "../adds/img/2_character_pepe/2_walk/W-26.png",
    "../adds/img/2_character_pepe/2_walk/W-22.png",
    "../adds/img/2_character_pepe/2_walk/W-23.png",
    "../adds/img/2_character_pepe/2_walk/W-24.png",
    "../adds/img/2_character_pepe/2_walk/W-25.png",
    "../adds/img/2_character_pepe/2_walk/W-26.png"
  ];

  constructor() {
    super().loadImage("adds/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.imagesWalking);
    this.animate();
  }

  animate() {
    setInterval(() => {
      let i = this.currentImage % this.imagesWalking.length; // let i = 0 % 6; => 0, Rest 6
      let path = this.imagesWalking[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 1000 / 12);
  }

  jump() {}
}
