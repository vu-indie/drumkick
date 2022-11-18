export class Note extends Phaser.GameObjects.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture
  ) {
    super(scene, x, y, texture);
    scene.add.sprite(x, y, texture);
  }

  update() {
    this.setX(-2);
  }
}