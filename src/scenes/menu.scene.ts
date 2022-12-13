import Phaser from "phaser";
import Drum from "../objects/drum.object";
import Chart from "../objects/Chart.object";

class Menu extends Phaser.Scene {
  constructor() {
    super("Menu");
  }

  create(): void {
    const cx = this.renderer.width / 2;
    const cy = this.renderer.height / 2;

    this.add
      .image(0, 0, "background")
      .setOrigin(0)
      .setDisplaySize(this.renderer.width, this.renderer.height)
      .setAlpha(0.5);

    this.add.image(cx, cy - 100, "logo").setScale(0.5);

    new Chart({
      scene: this,
      y: cy + 150,
      width: this.renderer.width,
    });

    new Drum({
      scene: this,
      x: 100,
      y: 150,
      hitKey: "A",
      snareKey: "S",
    });
  }

  update(): void {}
}

export default Menu;
