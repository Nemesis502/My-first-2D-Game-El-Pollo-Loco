class Level {
  enemies;
  clouds;
  salsa;
  coins;
  background;
  level_end_x = 2200;
  constructor(enemies, clouds, salsa, coins, background) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.salsa = salsa;
    this.coins = coins;
    this.background = background;
  }
}
