import Phaser from "phaser";

import logo from "../assets/logo.png";
import play from "../assets/play.png";
import editor from "../assets/editor.png";

import { Button } from "./button";

class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload(): void {
    this.load.image("logo", logo);
    this.load.image("play", play);
    this.load.image("editor", editor);
  }

  create(): void {
    this.add.sprite(100, 100, "logo").setOrigin(0);

    const playButton = new Button(
      this,
      100,
      this.game.renderer.height - 120,
      "play"
    );

    const editorButton = new Button(
      this,
      210,
      this.game.renderer.height - 120,
      "editor"
    );
  }

  update(): void {}
}

export default Game;
