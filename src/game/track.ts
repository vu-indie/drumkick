import Phaser from "phaser";
import { NoteType, THitEvent } from "./game";
import { Note } from "./note";

export class Track extends Phaser.Scene {
  private hit: Phaser.GameObjects.Sprite;

  private keyZ: Phaser.Input.Keyboard.Key;
  private keyX: Phaser.Input.Keyboard.Key;

  private missedNotes: string[] = [];
  private createdNotes: Phaser.GameObjects.Sprite[] = [];
  private noteIndex: number = 0;

  private chart: THitEvent[];
  private chartIndex: number = 0;
  debugText: Phaser.GameObjects.Text;
  music: Phaser.Sound.BaseSound;
  startTime: number;
  currentTime: number;
  soundHit: Phaser.Sound.BaseSound;
  soundDrum: Phaser.Sound.BaseSound;

  constructor() {
    super("track");
  }

  create(data: any): void {
    this.music = this.sound.add("demo");
    this.sound.pauseOnBlur = false;

    this.soundHit = this.sound.add("hit");
    this.soundDrum = this.sound.add("drum");

    this.missedNotes = [];
    this.createdNotes = [];
    this.noteIndex = 0;
    this.chartIndex = 0;
    this.chart = [];
    // this.events.shutdown();

    this.add.sprite(this.renderer.width / 2, 500, "lane");
    this.hit = this.add.sprite(120, 500, "hit");
    this.chart = data.hits as THitEvent[];

    this.keyZ = this.input.keyboard.addKey("Z");
    this.keyX = this.input.keyboard.addKey("X");

    this.debugText = this.add.text(0, 0, "", {
      fontFamily: "Arial",
      color: "black",
    });

    // Adding absolute time for creating to the notes in chart
    this.startTime = Date.now();
    this.currentTime = 0;
    const timeK = 1000;

    this.chart = this.chart.map((hit) => {
      return {
        ...hit,
        startTime: this.startTime + timeK * hit.noteTime,
      };
    });

    this.events.once("startPlaying", () => {
      this.music.play();
      console.log("play!");
    });

    this.events.once("shutdown", () => {
      this.events.off("addScore");
      this.events.off("resetMultiplier");

      this.music.stop();
    });
  }

  update(time: number, delta: number): void {
    // Create notes on timing
    const now = Date.now();
    const chartNote = this.chart[this.chartIndex];
    this.currentTime = now - this.startTime;

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

    // Notes movement
    this.createdNotes.forEach((note) => {
      note.setX(note.x - 1.5);
    });

    // Get a first note from chart
    const currentNote = this.createdNotes[this.noteIndex];
    const firstChartNote = this.chart[this.noteIndex];

    if (this.createdNotes[0] && this.createdNotes[0].x < this.hit.x + 64) {
      this.events.emit("startPlaying");
    }

    // ------------- HACK
    // if (
    //   currentNote &&
    //   currentNote.x > this.hit.x - 8 &&
    //   currentNote.x < this.hit.x + 8
    // ) {
    //   if (firstChartNote && firstChartNote?.type === NoteType.NOTE1) {
    //     this.soundDrum.play();
    //   }

    //   if (firstChartNote && firstChartNote?.type === NoteType.NOTE2) {
    //     this.soundHit.play();
    //   }
    //   this.hitCircle();
    //   this.addScore(currentNote.x, this.hit.x);
    //   this.completeNote(currentNote);
    //   this.noteIndex++;
    // }

    // Missed note
    if (currentNote && currentNote.x < this.hit.x - 60) {
      this.missNote(currentNote);

      this.noteIndex++;
    }

    this.keyZ.onDown = () => {
      this.soundDrum.play();
      this.hitCircle();
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
      this.soundHit.play();
      this.hitCircle();
      if (
        currentNote &&
        currentNote.x > this.hit.x - 30 &&
        currentNote.x < this.hit.x + 30
      ) {
        if (firstChartNote.type === NoteType.NOTE2) {
          this.completeNote(currentNote);
        } else {
          this.missNote(currentNote);
        }
        this.noteIndex++;
      }
    };

    // this.debugText.setText(`
    //   ${currentNote?.name}\n

    // `);
  }

  private addScore(circleX: number, hitX: number): number {
    if (circleX > hitX - 16 && circleX < hitX + 16) {
      return 300;
    } else if (circleX > hitX - 24 && circleX < hitX + 24) {
      return 150;
    } else if (circleX > hitX - 32 && circleX < hitX + 32) {
      return 50;
    }
    return 0;
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
    const score = this.addScore(note.x, this.hit.x);
    this.events.emit("addScore", score);
  }

  private missNote(note: Phaser.GameObjects.Sprite) {
    this.tweens.add({
      targets: note,
      scaleX: 3,
      scaleY: 3,
      alpha: 0,
      x: note.x,
      ease: "Sine.easeInOut",
      duration: 100,
      completeDelay: 1000,
      onComplete: () => {
        note.destroy();
      },
    });
    this.missedNotes.push(note.name);
    this.events.emit("resetMultiplier");
  }

  private hitCircle() {
    const shadow = this.add.sprite(this.hit.x, this.hit.y, "hit").setAlpha(0.2);
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
}
