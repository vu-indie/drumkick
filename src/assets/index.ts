import logo from "./logo.png";
import background from "./background.jpg";

export const images = {
  logo,
  background,
};

export const sounds = {};

export const music = {};

export const assets = {
  images,
  music,
  sounds,
};

export type AssetType = keyof typeof assets;
