type PupilZoomInput = {
  progress: number;
  width: number;
  height: number;
  portraitWidth: number;
  pupilStartX: number;
  pupilStartY: number;
  sourcePupilRadius: number;
  sourcePortraitWidth: number;
};

function ramp(value: number, start: number, end: number) {
  const progress = Math.min(1, Math.max(0, (value - start) / (end - start)));
  return progress * progress * (3 - 2 * progress);
}

export function calculatePupilZoom({
  progress,
  width,
  height,
  portraitWidth,
  pupilStartX,
  pupilStartY,
  sourcePupilRadius,
  sourcePortraitWidth,
}: PupilZoomInput) {
  const centerProgress = ramp(progress, 0.02, 0.32);
  const pupilX = pupilStartX + (width / 2 - pupilStartX) * centerProgress;
  const pupilY = pupilStartY + (height / 2 - pupilStartY) * centerProgress;
  const baseRadius = (sourcePupilRadius * portraitWidth) / sourcePortraitWidth;
  const cornerDistance = Math.hypot(width / 2, height / 2);
  // The pupil's opaque center must cover every corner before the video appears.
  const fullBlackScale = (cornerDistance + 4) / (baseRadius * 0.8);
  const finalScale = Math.max(1, fullBlackScale * 1.8);
  const cameraProgress = ramp(progress, 0.025, 0.61);
  const scale = Math.exp(Math.log(finalScale) * cameraProgress);
  const radius = baseRadius * scale;
  const immersion = ramp(
    Math.log(scale),
    Math.log(fullBlackScale * 1.06),
    Math.log(finalScale),
  );

  return {
    pupilX,
    pupilY,
    scale,
    radius,
    blackOpacity: ramp(Math.log(scale), Math.log(2), Math.log(9)),
    portraitVisible: radius * 0.8 < cornerDistance + 4,
    mediaOpacity: immersion,
    mediaScale: 1.08 + immersion * 0.1,
  };
}
