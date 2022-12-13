import * as Phaser from "phaser";

import Menu from "./scenes/menu.scene";
import Preload from "./scenes/preload.scene";

import "./style.css";

const config = {
  type: Phaser.AUTO,
  backgroundColor: "#000",
  width: 800,
  height: 480,
  scale: {
    mode: Phaser.Scale.RESIZE,
    parent: "app",
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Preload, Menu],
};

new Phaser.Game(config);
