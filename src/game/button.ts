import Phaser from "phaser";

export class Button extends Phaser.GameObjects.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture
  ) {
    super(scene, x, y, texture);

    const image = scene.add
      .sprite(x, y, texture)
      .setOrigin(0)
      .setInteractive({ cursor: "pointer" });

    const offsetY = y + 10;
    const duration = 150;
    const ease = "Sine.easeInOut";

    image.addListener("pointerover", () => {
      scene.tweens.add({
        targets: image,
        y: offsetY,
        ease,
        duration,
      });
    });

    image.addListener("pointerout", () => {
      scene.tweens.add({
        targets: image,
        y,
        ease,
        duration,
      });
    });
  }

  update(...args: any[]): void {}
}
