import { assets } from "../assets";

class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload(): void {
    this.load.image("logo", assets.images.logo);
    // this.load.image("play", play);
    // this.load.image("editor", editor);
    // this.load.image("back", backButton);
    // this.load.image("hit", hitCircle);
    // this.load.image("lane", lane);
    // this.load.image("note1", note1);
    // this.load.image("note2", note2);
    // this.load.image("meme", meme);
    // this.load.bitmapFont("montserrat", font, fontXML);
    // this.load.audio("demo", demo);
    // this.load.audio("drum", drum);
    // this.load.audio("hit", hitclap);

    this.load.on("complete", () => {
      this.scene.start("Menu");
    });
  }
}

export default Preload;
