import Phaser from "phaser";

import logo from "../assets/logo.png";
import play from "../assets/play.png";
import editor from "../assets/editor.png";
import backButton from "../assets/back.png";
import hitCircle from "../assets/hit.png";
import lane from "../assets/lane.png";
import note1 from "../assets/note.png";
import note2 from "../assets/note2.png";

import { Button } from "./button";

export enum NoteType {
  NOTE1 = "note1",
  NOTE2 = "note2",
}

export type THitEvent = {
  index: number;
  noteTime: number;
  startTime?: number;
  type: NoteType;
};

class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload(): void {
    this.load.image("logo", logo);
    this.load.image("play", play);
    this.load.image("editor", editor);
    this.load.image("back", backButton);
    this.load.image("hit", hitCircle);
    this.load.image("lane", lane);
    this.load.image("note1", note1);
    this.load.image("note2", note2);
  }

  create(): void {
    this.add.sprite(100, 100, "logo").setOrigin(0);

    const playButton = new Button(
      this,
      100,
      this.game.renderer.height - 120,
      "play",
      () => {
        this.scene
          .launch("player")
          .launch("track", {
            hits: [
              { id: 0, noteTime: 2.5, type: NoteType.NOTE1 },
              { id: 1, noteTime: 4.4, type: NoteType.NOTE2 },
              { id: 2, noteTime: 4.8, type: NoteType.NOTE1 },
            ],
          })
          .remove();
      }
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
