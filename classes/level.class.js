class Level {
  enemies;
  clouds;
  salsa;
  coins;
  background;
  statusbar_health;
  statusbar_coins;
  level_end_x = 2200;
  constructor(enemies, clouds, salsa, coins, background, statusbar_health, statusbar_coins) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.salsa = salsa;
    this.coins = coins;
    this.background = background;
    this.statusbar_health = statusbar_health;
    this.statusbar_coins = statusbar_coins;
  }
}
