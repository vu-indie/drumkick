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
    const h = this.game.renderer.height;

    this.add.sprite(100, 100, "logo").setOrigin(0);

    new Button(this, 100, h - 120, "play", () => this.goToPlayer());
    new Button(this, 210, h - 120, "editor");
  }

  update(): void {}

  private goToPlayer() {
    this.scene
      .launch("player")
      .launch("track", {
        hits: [
          { index: 0, noteTime: 2.5, type: NoteType.NOTE1 },
          { index: 1, noteTime: 4.4, type: NoteType.NOTE1 },
          { index: 2, noteTime: 4.8, type: NoteType.NOTE1 },
          { index: 3, noteTime: 6.1, type: NoteType.NOTE1 },
          { index: 4, noteTime: 6.4, type: NoteType.NOTE2 },
          { index: 5, noteTime: 6.7, type: NoteType.NOTE2 },
          { index: 6, noteTime: 7.0, type: NoteType.NOTE2 },
        ],
      })
      .remove();
  }
}

export default Game;
