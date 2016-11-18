export function calculateHitSlop(size, minimalTouchArea) {
  const extraSurface = (minimalTouchArea - size) / 2;
  return {
    top: extraSurface,
    right: extraSurface,
    bottom: extraSurface,
    left: extraSurface
  };
}
