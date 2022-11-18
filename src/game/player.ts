import Phaser from "phaser";

import { Button } from "./button";

class Player extends Phaser.Scene {
  score: number = 0;
  multiplier: number = 1;
  beat: number = 100;
  scoreText: Phaser.GameObjects.BitmapText;
  multiplierText: Phaser.GameObjects.BitmapText;

  constructor() {
    super("player");
  }

  preload(): void {
    // this.scene.launch("track").remove();
  }

  create(): void {
    this.add
      .image(this.renderer.width / 2, this.renderer.height / 2, "meme")
      .setScale(0.8);
    new Button(this, 88, 88, "back", () => {
      this.scene.stop("track");
      this.scene.stop("player");
      this.scene.start("Game");
    });

    this.scoreText = this.add
      .bitmapText(this.renderer.width - 88, 100, "montserrat", "00000000")
      .setOrigin(1, 0.5);
    this.multiplierText = this.add
      .bitmapText(this.renderer.width - 88, 140, "montserrat", "x1")
      .setOrigin(1, 0.5);

    const trackScene = this.scene.get("track");

    trackScene.events.on(
      "addScore",
      (score: number) => {
        this.multiplier += 1;
        this.score += score * this.multiplier;

        this.tweens.add({
          targets: this.scoreText,
          scale: 1.5,
          duration: 100,
          ease: "Sine.inOut",
          yoyo: true,
        });

        this.tweens.add({
          targets: this.multiplierText,
          scale: 1.5,
          duration: 100,
          ease: "Sine.inOut",
          yoyo: true,
        });
      },
      this
    );

    trackScene.events.on("addMultiplier", () => {}, this);

    trackScene.events.on(
      "resetMultiplier",
      () => {
        this.multiplier = 1;

        this.tweens.add({
          targets: this.multiplierText,
          scale: 1.5,
          duration: 100,
          ease: "Sine.inOut",
          yoyo: true,
        });
      },
      this
    );

    this.score = 0;
    this.multiplier = 0;
    this.beat = 100;
  }

  update(): void {
    this.scoreText.setText(`${this.score}`.padStart(10, "0"));
    this.multiplierText.setText(`x${this.multiplier}`);
  }
}

export default Player;
