type DrumProps = {
  scene: Phaser.Scene;
  x: number;
  y: number;
  hitKey?: string;
  snareKey?: string;
};

const DEFAULT_HIT = "Z";
const DEFAULT_SNARE = "X";

class Drum extends Phaser.GameObjects.Sprite {
  private keyHit: Phaser.Input.Keyboard.Key;
  private keySnare: Phaser.Input.Keyboard.Key;

  private playHit() {
    this.scene.sound.play("hit");
  }

  private playSnare() {
    this.scene.sound.play("snare");
  }

  private listenKeys() {
    this.keyHit.on("down", () => {
      this.playHit();
    });

    this.keySnare.on("down", () => {
      this.playSnare();
    });
  }

  constructor({ scene, x, y, hitKey, snareKey }: DrumProps) {
    super(scene, x, y, "circle");

    this.keyHit = this.scene.input.keyboard.addKey(hitKey || DEFAULT_HIT);
    this.keySnare = this.scene.input.keyboard.addKey(snareKey || DEFAULT_SNARE);

    this.listenKeys();
    this.scene.add.existing(this);
  }
}

export default Drum;
