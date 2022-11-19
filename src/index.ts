import * as Phaser from "phaser";

import Game from "./game/game";
import Player from "./game/player";
import { Track } from "./game/track";

import "./style.css";

const config = {
  type: Phaser.AUTO,
  backgroundColor: "#fff",
  width: screen.width,
  height: screen.height,
  scale: {
    mode: Phaser.Scale.RESIZE,
    parent: "canvas",
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Game, Player, Track],
};

const game = new Phaser.Game(config);

// document.onload = () => {
//   game.scale.startFullscreen();
// };
