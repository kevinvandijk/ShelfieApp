export function calculateHitSlop(size, minimalTouchArea) {
  if (size > minimalTouchArea) {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
  }

  const extraSurface = minimalTouchArea - size;

  return {
    top: extraSurface,
    right: extraSurface,
    bottom: extraSurface,
    left: extraSurface
  };
}
