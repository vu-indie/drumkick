import Phaser from "phaser";
import { THitEvent } from "./game";
import { Note } from "./note";

export class Track extends Phaser.Scene {
  private hit: Phaser.GameObjects.Sprite;

  private keyZ: Phaser.Input.Keyboard.Key;
  private keyX: Phaser.Input.Keyboard.Key;
  private keyPressed: boolean = false;
  private debugText: Phaser.GameObjects.Text;

  private missedNotes: Phaser.GameObjects.Sprite[] = [];
  private createdNotes: Phaser.GameObjects.Sprite[] = [];

  private chart: THitEvent[];
  private chartIndex: number = 0;

  constructor() {
    super("track");
  }

  create(data: any): void {
    this.add.sprite(this.renderer.width / 2, 500, "lane");
    this.hit = this.add.sprite(120, 500, "hit");
    this.chart = data.hits as THitEvent[];

    this.debugText = this.add.text(24, 24, "", {
      color: "#000",
      fontSize: "31px",
      font: "Arial",
    });

    this.keyZ = this.input.keyboard.addKey("Z");
    this.keyX = this.input.keyboard.addKey("X");

    // Adding absolute time for creating to the notes in chart
    const startTime = Date.now();
    const timeK = 1200;

    this.chart = this.chart.map((hit) => {
      return {
        ...hit,
        startTime: startTime + timeK * hit.noteTime,
      };
    });
  }

  update(time: number, delta: number): void {
    // Hit circle animation
    if (this.keyZ.isDown || this.keyX.isDown) {
      if (!this.keyPressed) {
        const shadow = this.add
          .sprite(this.hit.x, this.hit.y, "hit")
          .setAlpha(0.2);
        this.tweens.add({
          targets: shadow,
          scale: 1.25,
          alpha: 0,
          duration: 300,
          ease: "Sine.inOut",
          onComplete: () => shadow.destroy(),
        });
        this.tweens.add({
          targets: this.hit,
          scale: 0.95,
          duration: 200,
          ease: "Sine.inOut",
          yoyo: true,
        });
      }
      this.keyPressed = true;
    } else {
      this.keyPressed = false;
    }

    // Create notes on timing
    const now = Date.now();
    const chartNote = this.chart[this.chartIndex];

    if (Math.abs(chartNote.startTime - now) < 8) {
      // const note = new Note(this, this.renderer.width, 500, chartNote.type);
      const note = this.add
        .sprite(this.renderer.width, 500, chartNote.type)
        .setName();
      this.createdNotes.push(note);

      if (this.chartIndex !== this.chart.length - 1) {
        this.chartIndex = this.chartIndex + 1;
      }
    }

    this.createdNotes.forEach((note) => {
      if (note.x < this.hit.x - 50) {
        // this.createdNotes = this.createdNotes.filter(
        //   (n) => note.index === n.index
        // );
        this.tweens.add({
          targets: note,
          scaleX: 1.5,
          scaleY: 1.5,
          alpha: 0,
          ease: "Sine.easeInOut",
          duration: 100,
          onComplete: () => note.destroy(),
        });
      }

      note.setX(note.x - 2);
    });

    this.debugText.setText(`
      CurrentNote: ${JSON.stringify(this.createdNotes[0])}\n
      CurrentNote: ${JSON.stringify(chartNote)}\n
      TimeNow: ${now}\n
      TimeForCreate: ${now - chartNote.startTime}\n
      Index: ${this.chartIndex}\n\n
      Notes: ${this.createdNotes.length}\n
      Missed: ${this.missedNotes.length}
    `);
  }
}
