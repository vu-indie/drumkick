type ChartProps = {
  scene: Phaser.Scene;
  y: number;
  width: number;
};

class Chart extends Phaser.GameObjects.TileSprite {
  constructor({ scene, y, width }: ChartProps) {
    super(scene, 0, y, width, 100, "chart");

    this.scene.add.existing(this);
  }
}

export default Chart;
