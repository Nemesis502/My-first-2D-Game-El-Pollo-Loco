class Level {
    enemies;
    clouds;
    salsa;
    background;
    level_end_x = 2200;   
    constructor(enemies, clouds, salsa, background){
      this.enemies = enemies;
      this.clouds = clouds;
      this.salsa = salsa;
      this.background = background;
    }
}