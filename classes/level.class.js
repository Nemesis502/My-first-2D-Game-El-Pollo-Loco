class Level {
  background;
  enemies;
  salsa;
  coins;
  clouds;
  level_end_x = 2200;
  constructor(background, enemies, salsa, coins, clouds) {
    this.background = background;
    this.enemies = enemies;
    this.salsa = salsa;
    this.coins = coins;
    this.clouds = clouds;
  }
}
