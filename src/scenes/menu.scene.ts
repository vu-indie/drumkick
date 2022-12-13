import Phaser from "phaser";
import Drum from "../objects/drum.object";
import Chart from "../objects/Chart.object";
import Background from "../objects/background.object";

class Menu extends Phaser.Scene {
  background: Background;

  constructor() {
    super("Menu");
  }

  create(): void {
    // this.sound.play("theme");

    const cx = this.renderer.width / 2;
    const cy = this.renderer.height / 2;

    this.background = new Background({
      scene: this,
      x: cx,
      y: cy,
      texture: "background",
    });

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

  update(): void {
    this.background.parallax();
  }
}

export default Menu;
