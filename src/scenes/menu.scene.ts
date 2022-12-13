import Phaser from "phaser";

class Menu extends Phaser.Scene {
  constructor() {
    super("Menu");
  }

  create(): void {
    const cx = this.renderer.width / 2;
    const cy = this.renderer.height / 2;

    this.add.image(cx, cy, "logo").setScale(0.5);
  }

  update(): void {}
}

export default Menu;
