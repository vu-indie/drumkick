import * as Phaser from "phaser";

import Game from "./game/game";

import "./style.css";

const config = {
  type: Phaser.AUTO,
  backgroundColor: "#fff",
  width: 1024,
  height: 640,
  scene: [Game],
};

new Phaser.Game(config);
