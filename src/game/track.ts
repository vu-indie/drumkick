import Phaser from "phaser";
import { NoteType, THitEvent } from "./game";
import { Note } from "./note";

export class Track extends Phaser.Scene {
  private hit: Phaser.GameObjects.Sprite;

  private keyZ: Phaser.Input.Keyboard.Key;
  private keyX: Phaser.Input.Keyboard.Key;
  private keyPressed: boolean = false;
  private debugText: Phaser.GameObjects.Text;

  private missedNotes: string[] = [];
  private completedNotes: string[] = [];
  private createdNotes: Phaser.GameObjects.Sprite[] = [];
  private noteIndex: number = 0;

  private chart: THitEvent[];
  private chartIndex: number = 0;

  constructor() {
    super("track");
  }

  create(data: any): void {
    this.add.sprite(this.renderer.width / 2, 500, "lane");
    this.hit = this.add.sprite(120, 500, "hit");
    this.chart = data.hits as THitEvent[];

    this.debugText = this.add.text(24, 48, "", {
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

    if (Math.abs(chartNote.startTime - now) < 10) {
      const note = this.add
        .sprite(this.renderer.width - 40, 500, chartNote.type)
        .setName(`n${chartNote.index}`)
        .setScale(0)
        .setAlpha(0);

      this.tweens.add({
        targets: note,
        scaleX: 1,
        scaleY: 1,
        alpha: 1,
        ease: "Sine.easeInOut",
        duration: 250,
      });

      this.createdNotes.push(note);

      if (this.chartIndex !== this.chart.length - 1) {
        this.chartIndex = this.chartIndex + 1;
      }
    }

    // Animation for missed note
    this.createdNotes.forEach((note) => {
      if (note.x < this.hit.x - 60) {
        this.missNote(note);
      } else {
        // Note movement if not missed
        note.setX(note.x - 2);
      }
    });

    // Get a first note from chart
    const currentNote = this.createdNotes[this.noteIndex];
    const firstChartNote = this.chart[this.noteIndex];

    // Missed note
    if (currentNote && currentNote.x < this.hit.x - 60) {
      if (!this.missedNotes.includes(currentNote.name)) {
        this.missedNotes.push(currentNote.name);
      }
      this.noteIndex++;
    }

    this.keyZ.onDown = () => {
      if (
        currentNote &&
        currentNote.x > this.hit.x - 32 &&
        currentNote.x < this.hit.x + 32
      ) {
        if (firstChartNote.type === NoteType.NOTE1) {
          this.addScore(currentNote.x, this.hit.x);
          this.completeNote(currentNote);
        } else {
          this.missNote(currentNote);
        }
        this.noteIndex++;
      }
    };

    this.keyX.onDown = () => {
      if (
        currentNote &&
        currentNote.x > this.hit.x - 30 &&
        currentNote.x < this.hit.x + 30
      ) {
        if (firstChartNote.type === NoteType.NOTE2) {
          this.addScore(currentNote.x, this.hit.x);
          this.completeNote(currentNote);
        } else {
          this.missNote(currentNote);
        }
        this.noteIndex++;
      }
    };

    this.debugText.setText(`
      FirstNote: ${JSON.stringify(currentNote)}\n
      ChartNote: ${JSON.stringify(chartNote)}\n
      MissedNotes: ${this.missedNotes.length}\n
      Z: ${this.keyZ.isDown}\n
      X: ${this.keyX.isDown}
    `);
  }

  // TODO: Score add to global var
  private addScore(circleX: number, hitX: number) {
    if (circleX > hitX - 16 && circleX < hitX + 16) {
      console.log(600);
    } else if (circleX > hitX - 24 && circleX < hitX + 24) {
      console.log(300);
    } else if (circleX > hitX - 32 && circleX < hitX + 32) {
      console.log(50);
    }
  }

  private completeNote(note: Phaser.GameObjects.Sprite) {
    this.tweens.add({
      targets: note,
      y: 400,
      x: note.x,
      alpha: 0,
      ease: "Sine.easeInOut",
      duration: 200,
      onComplete: () => {
        note.destroy();
      },
    });
  }

  private missNote(note: Phaser.GameObjects.Sprite) {
    this.tweens.add({
      targets: note,
      scaleX: 3,
      scaleY: 3,
      alpha: 0,
      ease: "Sine.easeInOut",
      duration: 100,
      completeDelay: 1000,
      onComplete: () => {
        note.destroy();
      },
    });
  }
}
