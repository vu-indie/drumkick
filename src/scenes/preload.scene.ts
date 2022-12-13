import { assets } from "../assets";

class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload(): void {
    const cx = this.renderer.width / 2;
    const cy = this.renderer.height / 2;

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(cx - 150, cy, 300, 40);

    // --- loading image assets
    this.load.image("logo", assets.images.logo);
    this.load.image("background", assets.images.background);
    this.load.image("hitBlue", assets.images.hitBlue);
    this.load.image("hitRed", assets.images.hitRed);
    this.load.image("chart", assets.images.chart);
    this.load.image("circle", assets.images.circle);

    // --- loading sound assets
    this.load.audio("snare", assets.sounds.drumSnare);
    this.load.audio("hit", assets.sounds.drumHit);

    // this.load.bitmapFont("montserrat", font, fontXML);

    this.load.on("complete", () => {
      this.scene.start("Menu");
    });

    this.load.on("progress", function (value: number) {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(cx - 140, cy + 10, 280 * value, 20);
    });
  }
}

export default Preload;
