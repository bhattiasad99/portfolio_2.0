const ASSET_ORIGIN = "https://pub-ebf5a357636442a88fc054d3f991d771.r2.dev";

export const PORTFOLIO_MEDIA = {
  portrait: `${ASSET_ORIGIN}/base_image.webp`,
  poster: `${ASSET_ORIGIN}/work-opening-frame.webp`,
  video: `${ASSET_ORIGIN}/work-scroll-1080p.mp4`,
};

export const ORIGINAL_PORTRAIT_URL = `${ASSET_ORIGIN}/base_image.png`;

// Coordinates in the uploaded 3584 × 4800 portrait, before responsive layout.
export const PORTRAIT = {
  width: 3584,
  height: 4800,
  pupilX: 1576 / 3584,
  pupilY: 1325 / 4800,
};
