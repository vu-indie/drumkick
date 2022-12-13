import * as Phaser from "phaser";

import Preload from "./scenes/preload.scene";
import Menu from "./scenes/menu.scene";
import Catalog from "./scenes/catalog.scene";
import Game from "./scenes/game.scene";

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
  scene: [Preload, Menu, Catalog, Game],
};

new Phaser.Game(config);
