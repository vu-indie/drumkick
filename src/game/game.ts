import Phaser from "phaser";

import logo from "../assets/logo.png";
import play from "../assets/play.png";
import editor from "../assets/editor.png";
import backButton from "../assets/back.png";
import hitCircle from "../assets/hit.png";
import lane from "../assets/lane.png";
import note1 from "../assets/note.png";
import note2 from "../assets/note2.png";
import meme from "../assets/mme.png";

import font from "../assets/font_0.png";
import fontXML from "../assets/font.xml";

import demo from "../assets/audio.mp3";
import drum from "../assets/drum-hitnormal.ogg";
import hitclap from "../assets/soft-hitclap.ogg";

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
    this.load.image("meme", meme);

    this.load.bitmapFont("montserrat", font, fontXML);

    this.load.audio("demo", demo);
    this.load.audio("drum", drum);
    this.load.audio("hit", hitclap);
  }

  create(): void {
    const h = this.game.renderer.height;

    this.add.sprite(100, 100, "logo").setOrigin(0);

    new Button(this, 100, h - 120, "play", () => this.goToPlayer());
    new Button(this, 210, h - 120, "editor");
  }

  update(): void {}

  private goToPlayer() {
    const offset = 6;
    this.scene.stop("Game");
    this.scene.launch("player").launch("track", {
      hits: [
        { index: 0, noteTime: 0.664, type: NoteType.NOTE1 },
        { index: 1, noteTime: 1.015, type: NoteType.NOTE1 },
        { index: 2, noteTime: 1.367, type: NoteType.NOTE2 },
        { index: 3, noteTime: 2.539, type: NoteType.NOTE1 },
        { index: 4, noteTime: 2.89, type: NoteType.NOTE1 },
        { index: 5, noteTime: 3.242, type: NoteType.NOTE2 },
        { index: 6, noteTime: 4.414, type: NoteType.NOTE2 },
        { index: 7, noteTime: 4.765, type: NoteType.NOTE1 },
        { index: 8, noteTime: 5.117, type: NoteType.NOTE2 },
        { index: 9, noteTime: 6.289, type: NoteType.NOTE1 },
        { index: 10, noteTime: 6.64, type: NoteType.NOTE1 },
        { index: 11, noteTime: 6.992, type: NoteType.NOTE2 },
        { index: 12, noteTime: 7.46, type: NoteType.NOTE2 },
        { index: 13, noteTime: 7.695, type: NoteType.NOTE2 },
        { index: 14, noteTime: 8.164, type: NoteType.NOTE1 },
        { index: 15, noteTime: 8.515, type: NoteType.NOTE1 },
        { index: 16, noteTime: 8.867, type: NoteType.NOTE2 },
        { index: 17, noteTime: 10.039, type: NoteType.NOTE1 },
        { index: 18, noteTime: 10.39, type: NoteType.NOTE1 },
        { index: 19, noteTime: 10.742, type: NoteType.NOTE2 },
        { index: 20, noteTime: 11.914, type: NoteType.NOTE2 },
        { index: 21, noteTime: 12.265, type: NoteType.NOTE1 },
        { index: 22, noteTime: 12.617, type: NoteType.NOTE2 },
        { index: 23, noteTime: 13.789, type: NoteType.NOTE1 },
        { index: 24, noteTime: 14.257, type: NoteType.NOTE2 },
        { index: 25, noteTime: 14.492, type: NoteType.NOTE2 },
        { index: 26, noteTime: 14.726, type: NoteType.NOTE1 },
        { index: 27, noteTime: 14.96, type: NoteType.NOTE1 },
        { index: 28, noteTime: 15.195, type: NoteType.NOTE2 },
        { index: 29, noteTime: 15.664, type: NoteType.NOTE1 },
        { index: 30, noteTime: 16.601, type: NoteType.NOTE2 },
        { index: 31, noteTime: 16.953, type: NoteType.NOTE2 },
        { index: 32, noteTime: 17.304, type: NoteType.NOTE2 },
        { index: 33, noteTime: 17.539, type: NoteType.NOTE1 },
        { index: 34, noteTime: 18.007, type: NoteType.NOTE1 },
        { index: 35, noteTime: 18.476, type: NoteType.NOTE2 },
        { index: 36, noteTime: 18.828, type: NoteType.NOTE1 },
        { index: 37, noteTime: 19.179, type: NoteType.NOTE1 },
        { index: 38, noteTime: 19.414, type: NoteType.NOTE1 },
        { index: 39, noteTime: 19.882, type: NoteType.NOTE1 },
        { index: 40, noteTime: 20.351, type: NoteType.NOTE2 },
        { index: 41, noteTime: 20.703, type: NoteType.NOTE2 },
        { index: 42, noteTime: 21.054, type: NoteType.NOTE2 },
        { index: 43, noteTime: 21.289, type: NoteType.NOTE1 },
        { index: 44, noteTime: 21.757, type: NoteType.NOTE1 },
        { index: 45, noteTime: 21.992, type: NoteType.NOTE1 },
        { index: 46, noteTime: 22.226, type: NoteType.NOTE2 },
        { index: 47, noteTime: 22.695, type: NoteType.NOTE2 },
        { index: 48, noteTime: 22.929, type: NoteType.NOTE1 },
        { index: 49, noteTime: 23.164, type: NoteType.NOTE1 },
        { index: 50, noteTime: 24.101, type: NoteType.NOTE2 },
        { index: 51, noteTime: 24.453, type: NoteType.NOTE1 },
        { index: 52, noteTime: 24.804, type: NoteType.NOTE1 },
        { index: 53, noteTime: 25.039, type: NoteType.NOTE1 },
        { index: 54, noteTime: 25.507, type: NoteType.NOTE1 },
        { index: 55, noteTime: 25.976, type: NoteType.NOTE2 },
        { index: 56, noteTime: 26.328, type: NoteType.NOTE1 },
        { index: 57, noteTime: 26.679, type: NoteType.NOTE2 },
        { index: 58, noteTime: 26.914, type: NoteType.NOTE1 },
        { index: 59, noteTime: 27.382, type: NoteType.NOTE1 },
        { index: 60, noteTime: 27.851, type: NoteType.NOTE2 },
        { index: 61, noteTime: 28.203, type: NoteType.NOTE2 },
        { index: 62, noteTime: 28.554, type: NoteType.NOTE2 },
        { index: 63, noteTime: 28.789, type: NoteType.NOTE1 },
        { index: 64, noteTime: 29.257, type: NoteType.NOTE2 },
        { index: 65, noteTime: 29.492, type: NoteType.NOTE2 },
        { index: 66, noteTime: 29.726, type: NoteType.NOTE1 },
        { index: 67, noteTime: 29.96, type: NoteType.NOTE1 },
        { index: 68, noteTime: 30.195, type: NoteType.NOTE2 },
        { index: 69, noteTime: 30.664, type: NoteType.NOTE1 },
        { index: 70, noteTime: 31.367, type: NoteType.NOTE2 },
        { index: 71, noteTime: 32.539, type: NoteType.NOTE2 },
        { index: 72, noteTime: 32.89, type: NoteType.NOTE1 },
        { index: 73, noteTime: 33.242, type: NoteType.NOTE2 },
        { index: 74, noteTime: 34.414, type: NoteType.NOTE1 },
        { index: 75, noteTime: 34.765, type: NoteType.NOTE1 },
        { index: 76, noteTime: 35.117, type: NoteType.NOTE2 },
        { index: 77, noteTime: 36.289, type: NoteType.NOTE1 },
        { index: 78, noteTime: 36.64, type: NoteType.NOTE1 },
        { index: 79, noteTime: 36.992, type: NoteType.NOTE2 },
        { index: 80, noteTime: 37.46, type: NoteType.NOTE2 },
        { index: 81, noteTime: 37.929, type: NoteType.NOTE2 },
        { index: 82, noteTime: 38.164, type: NoteType.NOTE1 },
        { index: 83, noteTime: 38.515, type: NoteType.NOTE1 },
        { index: 84, noteTime: 38.867, type: NoteType.NOTE2 },
        { index: 85, noteTime: 40.039, type: NoteType.NOTE1 },
        { index: 86, noteTime: 40.39, type: NoteType.NOTE1 },
        { index: 87, noteTime: 40.742, type: NoteType.NOTE2 },
        { index: 88, noteTime: 41.914, type: NoteType.NOTE2 },
        { index: 89, noteTime: 42.265, type: NoteType.NOTE1 },
        { index: 90, noteTime: 42.617, type: NoteType.NOTE2 },
        { index: 91, noteTime: 43.789, type: NoteType.NOTE1 },
        { index: 92, noteTime: 44.14, type: NoteType.NOTE1 },
        { index: 93, noteTime: 44.492, type: NoteType.NOTE2 },
        { index: 94, noteTime: 44.96, type: NoteType.NOTE2 },
        { index: 95, noteTime: 45.429, type: NoteType.NOTE2 },
        { index: 96, noteTime: 45.664, type: NoteType.NOTE1 },
        { index: 97, noteTime: 46.601, type: NoteType.NOTE2 },
        { index: 98, noteTime: 46.953, type: NoteType.NOTE2 },
        { index: 99, noteTime: 47.304, type: NoteType.NOTE2 },
        { index: 100, noteTime: 47.539, type: NoteType.NOTE1 },
        { index: 101, noteTime: 48.007, type: NoteType.NOTE1 },
        { index: 102, noteTime: 48.476, type: NoteType.NOTE2 },
        { index: 103, noteTime: 48.828, type: NoteType.NOTE1 },
        { index: 104, noteTime: 49.179, type: NoteType.NOTE1 },
        { index: 105, noteTime: 49.414, type: NoteType.NOTE1 },
        { index: 106, noteTime: 49.882, type: NoteType.NOTE1 },
        { index: 107, noteTime: 50.351, type: NoteType.NOTE2 },
        { index: 108, noteTime: 50.703, type: NoteType.NOTE2 },
        { index: 109, noteTime: 51.054, type: NoteType.NOTE2 },
        { index: 110, noteTime: 51.289, type: NoteType.NOTE1 },
        { index: 111, noteTime: 51.757, type: NoteType.NOTE1 },
        { index: 112, noteTime: 51.992, type: NoteType.NOTE1 },
        { index: 113, noteTime: 52.226, type: NoteType.NOTE2 },
        { index: 114, noteTime: 52.695, type: NoteType.NOTE2 },
        { index: 115, noteTime: 52.929, type: NoteType.NOTE1 },
        { index: 116, noteTime: 53.164, type: NoteType.NOTE1 },
        { index: 117, noteTime: 54.101, type: NoteType.NOTE2 },
        { index: 118, noteTime: 54.453, type: NoteType.NOTE1 },
        { index: 119, noteTime: 54.804, type: NoteType.NOTE1 },
        { index: 120, noteTime: 55.039, type: NoteType.NOTE1 },
        { index: 121, noteTime: 55.507, type: NoteType.NOTE1 },
        { index: 122, noteTime: 55.976, type: NoteType.NOTE2 },
        { index: 123, noteTime: 56.328, type: NoteType.NOTE1 },
        { index: 124, noteTime: 56.679, type: NoteType.NOTE2 },
        { index: 125, noteTime: 56.914, type: NoteType.NOTE1 },
        { index: 126, noteTime: 57.382, type: NoteType.NOTE1 },
        { index: 127, noteTime: 57.851, type: NoteType.NOTE2 },
        { index: 128, noteTime: 58.203, type: NoteType.NOTE2 },
        { index: 129, noteTime: 58.554, type: NoteType.NOTE2 },
        { index: 130, noteTime: 58.789, type: NoteType.NOTE1 },
        { index: 131, noteTime: 59.257, type: NoteType.NOTE2 },
        { index: 132, noteTime: 59.492, type: NoteType.NOTE2 },
        { index: 133, noteTime: 59.726, type: NoteType.NOTE1 },
        { index: 134, noteTime: 59.96, type: NoteType.NOTE1 },
        { index: 135, noteTime: 60.195, type: NoteType.NOTE2 },
        { index: 136, noteTime: 60.664, type: NoteType.NOTE1 },
      ],
    });
  }
}

export default Game;
