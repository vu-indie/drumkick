import * as Phaser from "phaser";

import Menu from "./scenes/menu.scene";
import Preload from "./scenes/preload.scene";

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
  scene: [Preload, Menu],
};

new Phaser.Game(config);
