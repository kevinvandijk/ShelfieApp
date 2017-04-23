export function calculateHitSlop(size, minimalTouchArea) {
  const extraSurface = minimalTouchArea - size;

  return {
    top: extraSurface,
    right: extraSurface,
    bottom: extraSurface,
    left: extraSurface
  };
}
