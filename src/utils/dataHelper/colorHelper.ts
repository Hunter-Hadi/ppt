import sha256 from 'crypto-js/sha256';

/**
 * 基于字符串生成随机颜色
 * @param str
 */
export const generateRandomColor = (str: string): string => {
  const hash = sha256(str).toString();
  const color = '#' + hash.substring(0, 6);
  return color;
};
export const generateRandomColorWithTheme = (
  str: string,
  isDarkMode: boolean,
) => {
  const color = generateRandomColor(str);
  if (isDarkMode) {
    return hexChangeLightnessAndSaturation(color, 0.75, 0.9);
  } else {
    return hexChangeLightnessAndSaturation(color, 0.3, 0.95);
  }
};

/**
 * 调整颜色的亮度
 * @param hex
 * @param targetLightness
 * @param targetSaturation
 */
export function hexChangeLightnessAndSaturation(
  hex: string,
  targetLightness: number,
  targetSaturation: number,
): string {
  // 将Hex转换为RGB
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  // 将RGB转换为HSL
  const rNormalized = r / 255;
  const gNormalized = g / 255;
  const bNormalized = b / 255;

  const max = Math.max(rNormalized, gNormalized, bNormalized);
  const min = Math.min(rNormalized, gNormalized, bNormalized);

  let h = 0;
  if (max !== min) {
    const d = max - min;
    switch (max) {
      case rNormalized:
        h =
          (gNormalized - bNormalized) / d + (gNormalized < bNormalized ? 6 : 0);
        break;
      case gNormalized:
        h = (bNormalized - rNormalized) / d + 2;
        break;
      case bNormalized:
        h = (rNormalized - gNormalized) / d + 4;
        break;
    }

    h /= 6;
  }

  // 调整亮度和饱和度
  const adjustedL = Math.max(0, Math.min(1, targetLightness));
  const adjustedS = Math.max(0, Math.min(1, targetSaturation));

  // 将HSL转换为Hex
  const hueToRgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q =
    adjustedL < 0.5
      ? adjustedL * (1 + adjustedS)
      : adjustedL + adjustedS - adjustedL * adjustedS;
  const p = 2 * adjustedL - q;

  const rAdjusted = Math.round(hueToRgb(p, q, h + 1 / 3) * 255);
  const gAdjusted = Math.round(hueToRgb(p, q, h) * 255);
  const bAdjusted = Math.round(hueToRgb(p, q, h - 1 / 3) * 255);

  const adjustedHex = `#${rAdjusted.toString(16).padStart(2, '0')}${gAdjusted
    .toString(16)
    .padStart(2, '0')}${bAdjusted.toString(16).padStart(2, '0')}`;

  return adjustedHex;
}
