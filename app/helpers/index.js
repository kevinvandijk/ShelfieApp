export function calculateHitSlop(size, minimalTouchArea) {
  if (size > minimalTouchArea) {
    return {
      top: size,
      right: size,
      bottom: size,
      left: size
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
