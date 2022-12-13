import logo from "./logo.png";
import background from "./background.jpg";
import hitBlue from "./hit-blue.png";
import hitRed from "./hit-red.png";
import chart from "./chart.png";
import circle from "./circle.png";

import drumHit from "./drum-hit.wav";
import drumSnare from "./drum-snare.wav";


export const images = {
  logo,
  background,
  hitBlue,
  hitRed,
  chart,
  circle,
};

export const sounds = {
  drumHit,
  drumSnare,
};

export const music = {};

export const assets = {
  images,
  music,
  sounds,
};

export type AssetType = keyof typeof assets;
