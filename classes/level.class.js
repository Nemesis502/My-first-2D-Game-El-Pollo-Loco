class Level {
  background;
  enemies;
  salsa;
  coins;
  clouds;
  level_end_x = 2200;

  /**
   * Creates an instance of the Level class.
   * @param {BackgroundObject[]} background - The background elements of the level.
   * @param {MovableObject[]} enemies - The enemies present in the level.
   * @param {MovableObject[]} salsa - The salsa obstacles in the level.
   * @param {Coins[]} coins - The coins to be collected in the level.
   * @param {Cloud[]} clouds - The cloud elements in the level.
   */
  constructor(background, enemies, salsa, coins, clouds) {
    this.background = background;
    this.enemies = enemies;
    this.salsa = salsa;
    this.coins = coins;
    this.clouds = clouds;
  }
}
