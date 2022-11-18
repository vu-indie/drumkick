import * as Phaser from "phaser";

import Game from "./game/game";
import Player from "./game/player";
import { Track } from "./game/track";

import "./style.css";

const config = {
  type: Phaser.AUTO,
  backgroundColor: "#fff",
  width: 1024,
  height: 640,
  scene: [Game, Player, Track],
};

new Phaser.Game(config);
