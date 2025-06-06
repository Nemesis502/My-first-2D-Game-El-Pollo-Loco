let level1;
/**
 * Initializes the first level of the game (`level1`).
 * Sets up the background layers, enemies, salsa bottles, coins, and clouds for the level.
 */
function initLevel1() {
  level1 = new Level(

    [
      new BackgroundObject("adds/img/5_background/layers/air.png", -719),
      new BackgroundObject(
        "adds/img/5_background/layers/3_third_layer/2.png",
        -719
      ),
      new BackgroundObject(
        "adds/img/5_background/layers/2_second_layer/2.png",
        -719
      ),
      new BackgroundObject(
        "adds/img/5_background/layers/1_first_layer/2.png",
        -719
      ),

      new BackgroundObject("adds/img/5_background/layers/air.png", 0),
      new BackgroundObject(
        "adds/img/5_background/layers/3_third_layer/1.png",
        0
      ),
      new BackgroundObject(
        "adds/img/5_background/layers/2_second_layer/1.png",
        0
      ),
      new BackgroundObject(
        "adds/img/5_background/layers/1_first_layer/1.png",
        0
      ),

      new BackgroundObject("adds/img/5_background/layers/air.png", 719),
      new BackgroundObject(
        "adds/img/5_background/layers/3_third_layer/2.png",
        719
      ),
      new BackgroundObject(
        "adds/img/5_background/layers/2_second_layer/2.png",
        719
      ),
      new BackgroundObject(
        "adds/img/5_background/layers/1_first_layer/2.png",
        719
      ),

      new BackgroundObject("adds/img/5_background/layers/air.png", 719 * 2),
      new BackgroundObject(
        "adds/img/5_background/layers/3_third_layer/1.png",
        719 * 2
      ),
      new BackgroundObject(
        "adds/img/5_background/layers/2_second_layer/1.png",
        719 * 2
      ),
      new BackgroundObject(
        "adds/img/5_background/layers/1_first_layer/1.png",
        719 * 2
      ),

      new BackgroundObject("adds/img/5_background/layers/air.png", 719 * 3),
      new BackgroundObject(
        "adds/img/5_background/layers/3_third_layer/2.png",
        719 * 3
      ),
      new BackgroundObject(
        "adds/img/5_background/layers/2_second_layer/2.png",
        719 * 3
      ),
      new BackgroundObject(
        "adds/img/5_background/layers/1_first_layer/2.png",
        719 * 3
      ),
    ],
    [
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new MiniChicken(),
      new MiniChicken(),
      new MiniChicken(),
      new MiniChicken(),
      new Endboss(),
    ],
    [
      new Salsa(),
      new Salsa(),
      new Salsa(),
      new Salsa(),
      new Salsa(),
      new Salsa(),
      new Salsa(),
      new Salsa(),
      new Salsa(),
      new Salsa(),
    ],
    [
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
    ],
    [
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
    ]
  );
}
