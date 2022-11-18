import Phaser from "phaser";

import { Button } from "./button";

class Player extends Phaser.Scene {
  constructor() {
    super("player");
  }

  preload(): void {
    // this.scene.launch("track").remove();
  }

  create(): void {
    new Button(this, 88, 88, "back");

    // this.add.sprite(this.renderer.width / 2, 460, "lane");
    // this.add.sprite(120, 460, "hit");
  }

  update(): void {}
}

export default Player;
