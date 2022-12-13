type BackgroundProps = {
  scene: Phaser.Scene;
  x: number;
  y: number;
  texture: string | Phaser.Textures.Texture;
};

class Background extends Phaser.GameObjects.Image {
  public parallax() {
    const cx = this.scene.renderer.width / 2;
    const cy = this.scene.renderer.height / 2;
    const mx = this.scene.input.mousePointer.x / 2;
    const my = this.scene.input.mousePointer.y / 2;

    const dx = cx - (mx - cx) * 0.025;
    const dy = cy - (my - cy) * 0.025;

    this.setPosition(dx, dy);
    //  this.tweens.add({
    //   targets: [this.background],
    //   x: dx,
    //   y: dy,
    //   duration: 100,
    // });
  }

  constructor({ scene, x, y, texture }: BackgroundProps) {
    super(scene, x, y, texture);

    this.setDisplaySize(
      this.scene.renderer.width + 500,
      this.scene.renderer.height + 500
    );

    this.setAlpha(0.5);

    this.scene.add.existing(this);
  }
}

export default Background;
