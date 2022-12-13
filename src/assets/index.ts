import logo from "./logo.png";

export const images = {
  logo,
};

export const sounds = {};

export const music = {};

export const assets = {
  images,
  music,
  sounds,
};

export type AssetType = keyof typeof assets;
