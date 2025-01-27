/**
 * Represents a level in the game.
 * Contains information about the background, enemies, collectibles, and other elements within the level.
 */
class Level {
  /**
   * The background elements of the level.
   * @type {BackgroundObject[]}
   */
  background;

  /**
   * The enemies present in the level.
   * @type {MovableObject[]}
   */
  enemies;

  /**
   * The salsa obstacles present in the level.
   * @type {MovableObject[]}
   */
  salsa;

  /**
   * The coin collectibles present in the level.
   * @type {Coins[]}
   */
  coins;

  /**
   * The cloud elements present in the level.
   * @type {Cloud[]}
   */
  clouds;

  /**
   * The x-coordinate where the level ends.
   * @type {number}
   * @default 2200
   */
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
