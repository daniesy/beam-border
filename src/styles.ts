import type { SizeConfig, ThemeColors, BorderBeamColorVariant, BorderBeamCornerShape, BorderBeamSize } from './types';

/**
 * Size presets for border radius and dimensions
 */
export const sizePresets: Record<BorderBeamSize, SizeConfig> = {
  sm: {
    borderRadius: 32,
    borderWidth: 1,
    width: 70,
    height: 36,
  },
  md: {
    borderRadius: 16,
    borderWidth: 1,
  },
  line: {
    borderRadius: 16,
    borderWidth: 1,
  },
  'pulse-outside': {
    borderRadius: 16,
    borderWidth: 1,
  },
  'pulse-inner': {
    borderRadius: 16,
    borderWidth: 1,
  },
};

/**
 * Per-size theme presets matching the tuned v5 control panel defaults
 */
export const sizeThemePresets: Record<BorderBeamSize, Record<'dark' | 'light', ThemeColors>> = {
  sm: {
    dark: {
      strokeOpacity: 0.46,
      innerOpacity: 0.24,
      bloomOpacity: 0.38,
      innerShadow: 'rgba(255, 255, 255, 0.3)',
      saturation: 1.2,
    },
    light: {
      strokeOpacity: 0.12,
      innerOpacity: 0.3,
      bloomOpacity: 0.16,
      innerShadow: 'rgba(0, 0, 0, 0.14)',
      saturation: 1.8,
    },
  },
  md: {
    dark: {
      strokeOpacity: 0.26,
      innerOpacity: 0.42,
      bloomOpacity: 0.24,
      innerShadow: 'rgba(255, 255, 255, 0.27)',
      saturation: 1.2,
    },
    light: {
      strokeOpacity: 0.12,
      innerOpacity: 0.26,
      bloomOpacity: 0.34,
      innerShadow: 'rgba(0, 0, 0, 0.14)',
      saturation: 1.5,
    },
  },
  line: {
    dark: {
      strokeOpacity: 1.14,
      innerOpacity: 0.7,
      bloomOpacity: 0.8,
      innerShadow: 'rgba(255, 255, 255, 0.1)',
      saturation: 1.2,
    },
    light: {
      strokeOpacity: 0.16,
      innerOpacity: 0.32,
      bloomOpacity: 0.3,
      innerShadow: 'rgba(0, 0, 0, 0.14)',
      saturation: 1.95,
    },
  },
  // Pulse Outside — outward-blooming breathe (ported from v5 "Breathe Outside Uncropped" / c6)
  'pulse-outside': {
    dark: {
      strokeOpacity: 0.94,
      innerOpacity: 0.34,
      bloomOpacity: 0.3,
      innerShadow: 'transparent',
      saturation: 1.2,
      brightness: 1.9,
      // v5 Card 5 frames the card with a single 1px hairline (its box-shadow at
      // 0.3). Wrapped components here already supply their own ~equivalent 1px
      // border, so the beam must NOT add a second hairline on top or the edge
      // reads brighter than v5. Kept at 0 to match v5's single-hairline look.
      hairlineOpacity: 0,
    },
    light: {
      strokeOpacity: 1.96,
      innerOpacity: 1.04,
      bloomOpacity: 0.42,
      innerShadow: 'transparent',
      saturation: 0.6,
      brightness: 1.7,
      hairlineOpacity: 0,
    },
  },
  // Pulse Inner — contained breathe (ported from v5 "Breathe" / c4)
  'pulse-inner': {
    dark: {
      strokeOpacity: 1.54,
      innerOpacity: 0.44,
      bloomOpacity: 0.66,
      innerShadow: 'transparent',
      saturation: 1.2,
      brightness: 0.75,
    },
    light: {
      strokeOpacity: 0.32,
      innerOpacity: 0.4,
      bloomOpacity: 0.8,
      innerShadow: 'transparent',
      saturation: 0.75,
      brightness: 1.3,
    },
  },
};

/**
 * @deprecated Use `sizeThemePresets` for per-size theme values.
 * Retained for backward compatibility — maps to `md` size presets.
 */
export const themeColors: Record<'dark' | 'light', ThemeColors> = {
  dark: { ...sizeThemePresets.md.dark },
  light: { ...sizeThemePresets.md.light },
};

/**
 * Color palettes for each color variant
 */
const colorPalettes = {
  colorful: {
    border: [
      { color: 'rgb(255, 50, 100)', pos: '33% -7.4%', size: '70px 40px' },
      { color: 'rgb(40, 140, 255)', pos: '12% -5%', size: '60px 35px' },
      { color: 'rgb(50, 200, 80)', pos: '2.1% 68.3%', size: '40px 70px' },
      { color: 'rgb(30, 185, 170)', pos: '2.1% 68.3%', size: '20px 35px' },
      { color: 'rgb(100, 70, 255)', pos: '74.4% 100%', size: '180px 32px' },
      { color: 'rgb(40, 140, 255)', pos: '55% 100%', size: '85px 26px' },
      { color: 'rgb(255, 120, 40)', pos: '93.9% 0%', size: '74px 32px' },
      { color: 'rgb(240, 50, 180)', pos: '100% 27.1%', size: '26px 42px' },
      { color: 'rgb(180, 40, 240)', pos: '100% 27.1%', size: '52px 48px' },
    ],
    spike: { primary: 'rgb(255, 60, 80)', secondary: 'rgba(40, 190, 180, 0.98)' },
    spikeLt: { primary: 'rgb(200, 30, 60)', secondary: 'rgb(20, 150, 140)' },
  },
  mono: {
    border: [
      { color: 'rgb(180, 180, 180)', pos: '33% -7.4%', size: '70px 40px' },
      { color: 'rgb(140, 140, 140)', pos: '12% -5%', size: '60px 35px' },
      { color: 'rgb(160, 160, 160)', pos: '2.1% 68.3%', size: '40px 70px' },
      { color: 'rgb(130, 130, 130)', pos: '2.1% 68.3%', size: '20px 35px' },
      { color: 'rgb(170, 170, 170)', pos: '74.4% 100%', size: '180px 32px' },
      { color: 'rgb(150, 150, 150)', pos: '55% 100%', size: '85px 26px' },
      { color: 'rgb(190, 190, 190)', pos: '93.9% 0%', size: '74px 32px' },
      { color: 'rgb(145, 145, 145)', pos: '100% 27.1%', size: '26px 42px' },
      { color: 'rgb(165, 165, 165)', pos: '100% 27.1%', size: '52px 48px' },
    ],
    spike: { primary: 'rgb(200, 200, 200)', secondary: 'rgb(170, 170, 170)' },
    spikeLt: { primary: 'rgb(80, 80, 80)', secondary: 'rgb(120, 120, 120)' },
  },
  ocean: {
    border: [
      { color: 'rgb(100, 80, 220)', pos: '33% -7.4%', size: '70px 40px' },
      { color: 'rgb(60, 120, 255)', pos: '12% -5%', size: '60px 35px' },
      { color: 'rgb(80, 100, 200)', pos: '2.1% 68.3%', size: '40px 70px' },
      { color: 'rgb(50, 140, 220)', pos: '2.1% 68.3%', size: '20px 35px' },
      { color: 'rgb(120, 80, 255)', pos: '74.4% 100%', size: '180px 32px' },
      { color: 'rgb(70, 130, 255)', pos: '55% 100%', size: '85px 26px' },
      { color: 'rgb(140, 100, 240)', pos: '93.9% 0%', size: '74px 32px' },
      { color: 'rgb(90, 110, 230)', pos: '100% 27.1%', size: '26px 42px' },
      { color: 'rgb(130, 70, 255)', pos: '100% 27.1%', size: '52px 48px' },
    ],
    spike: { primary: 'rgb(100, 120, 255)', secondary: 'rgba(130, 100, 220, 0.98)' },
    spikeLt: { primary: 'rgb(60, 60, 180)', secondary: 'rgb(80, 100, 200)' },
  },
  sunset: {
    border: [
      { color: 'rgb(255, 80, 50)', pos: '33% -7.4%', size: '70px 40px' },
      { color: 'rgb(255, 160, 40)', pos: '12% -5%', size: '60px 35px' },
      { color: 'rgb(255, 120, 60)', pos: '2.1% 68.3%', size: '40px 70px' },
      { color: 'rgb(255, 200, 50)', pos: '2.1% 68.3%', size: '20px 35px' },
      { color: 'rgb(255, 100, 80)', pos: '74.4% 100%', size: '180px 32px' },
      { color: 'rgb(255, 180, 60)', pos: '55% 100%', size: '85px 26px' },
      { color: 'rgb(255, 60, 60)', pos: '93.9% 0%', size: '74px 32px' },
      { color: 'rgb(255, 140, 50)', pos: '100% 27.1%', size: '26px 42px' },
      { color: 'rgb(255, 90, 70)', pos: '100% 27.1%', size: '52px 48px' },
    ],
    spike: { primary: 'rgb(255, 140, 80)', secondary: 'rgba(255, 100, 60, 0.98)' },
    spikeLt: { primary: 'rgb(200, 80, 40)', secondary: 'rgb(220, 120, 30)' },
  },
};

/**
 * Small size color palettes (compact gradients for button-sized elements)
 */
const smallColorPalettes = {
  colorful: {
    border: [
      { color: 'rgb(50, 200, 80)', pos: '2% 68%', size: '9px 18px' },
      { color: 'rgb(30, 185, 170)', pos: '2% 68%', size: '4px 8px' },
      { color: 'rgb(255, 120, 40)', pos: '72% -3%', size: '59px 9px' },
      { color: 'rgb(100, 70, 255)', pos: '74% 100%', size: '42px 7px' },
      { color: 'rgb(240, 50, 180)', pos: '100% 27%', size: '10px 17px' },
      { color: 'rgb(180, 40, 240)', pos: '100% 27%', size: '10px 18px' },
      { color: 'rgb(40, 140, 255)', pos: '100% 27%', size: '5px 10px' },
      { color: 'rgb(255, 50, 100)', pos: '100% 27%', size: '11px 12px' },
    ],
    inner: [
      { color: 'rgba(50, 200, 80, 0.5)', pos: '2% 68%', size: '9px 18px' },
      { color: 'rgba(30, 185, 170, 0.45)', pos: '2% 68%', size: '4px 8px' },
      { color: 'rgba(255, 120, 40, 0.35)', pos: '72% -3%', size: '59px 9px' },
      { color: 'rgba(100, 70, 255, 0.35)', pos: '74% 100%', size: '42px 7px' },
      { color: 'rgba(240, 50, 180, 0.3)', pos: '100% 27%', size: '10px 17px' },
      { color: 'rgba(180, 40, 240, 0.4)', pos: '100% 27%', size: '10px 18px' },
      { color: 'rgba(40, 140, 255, 0.3)', pos: '100% 27%', size: '5px 10px' },
      { color: 'rgba(255, 50, 100, 0.3)', pos: '100% 27%', size: '11px 12px' },
    ],
  },
  mono: {
    border: [
      { color: 'rgb(160, 160, 160)', pos: '2% 68%', size: '9px 18px' },
      { color: 'rgb(140, 140, 140)', pos: '2% 68%', size: '4px 8px' },
      { color: 'rgb(180, 180, 180)', pos: '72% -3%', size: '59px 9px' },
      { color: 'rgb(150, 150, 150)', pos: '74% 100%', size: '42px 7px' },
      { color: 'rgb(170, 170, 170)', pos: '100% 27%', size: '10px 17px' },
      { color: 'rgb(155, 155, 155)', pos: '100% 27%', size: '10px 18px' },
      { color: 'rgb(145, 145, 145)', pos: '100% 27%', size: '5px 10px' },
      { color: 'rgb(165, 165, 165)', pos: '100% 27%', size: '11px 12px' },
    ],
    inner: [
      { color: 'rgba(160, 160, 160, 0.25)', pos: '2% 68%', size: '9px 18px' },
      { color: 'rgba(140, 140, 140, 0.22)', pos: '2% 68%', size: '4px 8px' },
      { color: 'rgba(180, 180, 180, 0.17)', pos: '72% -3%', size: '59px 9px' },
      { color: 'rgba(150, 150, 150, 0.17)', pos: '74% 100%', size: '42px 7px' },
      { color: 'rgba(170, 170, 170, 0.15)', pos: '100% 27%', size: '10px 17px' },
      { color: 'rgba(155, 155, 155, 0.20)', pos: '100% 27%', size: '10px 18px' },
      { color: 'rgba(145, 145, 145, 0.15)', pos: '100% 27%', size: '5px 10px' },
      { color: 'rgba(165, 165, 165, 0.15)', pos: '100% 27%', size: '11px 12px' },
    ],
  },
  ocean: {
    border: [
      { color: 'rgb(60, 140, 200)', pos: '2% 68%', size: '9px 18px' },
      { color: 'rgb(50, 120, 180)', pos: '2% 68%', size: '4px 8px' },
      { color: 'rgb(100, 80, 220)', pos: '72% -3%', size: '59px 9px' },
      { color: 'rgb(80, 100, 255)', pos: '74% 100%', size: '42px 7px' },
      { color: 'rgb(120, 70, 240)', pos: '100% 27%', size: '10px 17px' },
      { color: 'rgb(90, 80, 220)', pos: '100% 27%', size: '10px 18px' },
      { color: 'rgb(70, 110, 255)', pos: '100% 27%', size: '5px 10px' },
      { color: 'rgb(110, 90, 230)', pos: '100% 27%', size: '11px 12px' },
    ],
    inner: [
      { color: 'rgba(60, 140, 200, 0.5)', pos: '2% 68%', size: '9px 18px' },
      { color: 'rgba(50, 120, 180, 0.45)', pos: '2% 68%', size: '4px 8px' },
      { color: 'rgba(100, 80, 220, 0.35)', pos: '72% -3%', size: '59px 9px' },
      { color: 'rgba(80, 100, 255, 0.35)', pos: '74% 100%', size: '42px 7px' },
      { color: 'rgba(120, 70, 240, 0.3)', pos: '100% 27%', size: '10px 17px' },
      { color: 'rgba(90, 80, 220, 0.4)', pos: '100% 27%', size: '10px 18px' },
      { color: 'rgba(70, 110, 255, 0.3)', pos: '100% 27%', size: '5px 10px' },
      { color: 'rgba(110, 90, 230, 0.3)', pos: '100% 27%', size: '11px 12px' },
    ],
  },
  sunset: {
    border: [
      { color: 'rgb(255, 180, 50)', pos: '2% 68%', size: '9px 18px' },
      { color: 'rgb(255, 150, 40)', pos: '2% 68%', size: '4px 8px' },
      { color: 'rgb(255, 80, 60)', pos: '72% -3%', size: '59px 9px' },
      { color: 'rgb(255, 100, 80)', pos: '74% 100%', size: '42px 7px' },
      { color: 'rgb(255, 60, 80)', pos: '100% 27%', size: '10px 17px' },
      { color: 'rgb(255, 120, 60)', pos: '100% 27%', size: '10px 18px' },
      { color: 'rgb(255, 200, 50)', pos: '100% 27%', size: '5px 10px' },
      { color: 'rgb(255, 90, 70)', pos: '100% 27%', size: '11px 12px' },
    ],
    inner: [
      { color: 'rgba(255, 180, 50, 0.5)', pos: '2% 68%', size: '9px 18px' },
      { color: 'rgba(255, 150, 40, 0.45)', pos: '2% 68%', size: '4px 8px' },
      { color: 'rgba(255, 80, 60, 0.35)', pos: '72% -3%', size: '59px 9px' },
      { color: 'rgba(255, 100, 80, 0.35)', pos: '74% 100%', size: '42px 7px' },
      { color: 'rgba(255, 60, 80, 0.3)', pos: '100% 27%', size: '10px 17px' },
      { color: 'rgba(255, 120, 60, 0.4)', pos: '100% 27%', size: '10px 18px' },
      { color: 'rgba(255, 200, 50, 0.3)', pos: '100% 27%', size: '5px 10px' },
      { color: 'rgba(255, 90, 70, 0.3)', pos: '100% 27%', size: '11px 12px' },
    ],
  },
};

function tintColor(tint: string | undefined, opacity = 1): string | undefined {
  if (!tint) return undefined;
  if (opacity >= 1) return tint;
  return `color-mix(in srgb, ${tint} ${+(opacity * 100).toFixed(2)}%, transparent)`;
}

function getSmallColorGradients(colorVariant: BorderBeamColorVariant, tint?: string): string {
  const palette = smallColorPalettes[colorVariant];
  return palette.border
    .map(c => `radial-gradient(ellipse ${c.size} at ${c.pos}, ${tintColor(tint) ?? c.color}, transparent)`)
    .join(',\n    ');
}

function getSmallInnerGradients(colorVariant: BorderBeamColorVariant, tint?: string): string {
  const palette = smallColorPalettes[colorVariant];
  return palette.inner
    .map(c => `radial-gradient(ellipse ${c.size} at ${c.pos}, ${tintColor(tint, 0.35) ?? c.color}, transparent)`)
    .join(',\n    ');
}

function getColorGradients(colorVariant: BorderBeamColorVariant, tint?: string): string {
  const palette = colorPalettes[colorVariant];
  return palette.border
    .map(c => `radial-gradient(ellipse ${c.size} at ${c.pos}, ${tintColor(tint) ?? c.color}, transparent)`)
    .join(',\n    ');
}

function getInnerGradients(colorVariant: BorderBeamColorVariant, tint?: string): string {
  const palette = colorPalettes[colorVariant];
  // Mono variant gets 50% lower opacity
  const baseOpacity = colorVariant === 'mono' ? 0.225 : 0.45;
  return palette.border
    .map(c => {
      const rgba = tintColor(tint, baseOpacity) ?? c.color.replace('rgb(', 'rgba(').replace(')', `, ${baseOpacity})`);
      const smallerSize = c.size.split(' ').map(s => {
        const val = parseInt(s);
        return `${Math.round(val * 0.9)}px`;
      }).join(' ');
      return `radial-gradient(ellipse ${smallerSize} at ${c.pos}, ${rgba}, transparent)`;
    })
    .join(',\n    ');
}

function getSpikeColors(colorVariant: BorderBeamColorVariant, isDark: boolean) {
  const palette = colorPalettes[colorVariant];
  return isDark ? palette.spike : palette.spikeLt;
}

const lineColorPalettes = {
  colorful: {
    dark: [
      { color: 'rgb(255, 50, 100)', sizeW: 36, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: 'rgb(40, 180, 220)', sizeW: 30, sizeH: 32, offsetX: 39, offsetY: 0 },
      { color: 'rgb(50, 200, 80)', sizeW: 33, sizeH: 28, offsetX: -36, offsetY: 2 },
      { color: 'rgb(180, 40, 240)', sizeW: 29, sizeH: 34, offsetX: -54, offsetY: 0 },
      { color: 'rgb(255, 160, 30)', sizeW: 27, sizeH: 30, offsetX: 51, offsetY: -1 },
      { color: 'rgb(100, 70, 255)', sizeW: 36, sizeH: 24, offsetX: 21, offsetY: 1 },
      { color: 'rgb(40, 140, 255)', sizeW: 30, sizeH: 22, offsetX: -21, offsetY: 0 },
      { color: 'rgb(240, 50, 180)', sizeW: 25, sizeH: 28, offsetX: 66, offsetY: 1 },
      { color: 'rgb(30, 185, 170)', sizeW: 23, sizeH: 30, offsetX: -66, offsetY: -1 },
    ],
    light: [
      { color: 'rgb(255, 50, 100)', sizeW: 45, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: 'rgb(40, 140, 255)', sizeW: 35, sizeH: 32, offsetX: 65, offsetY: 0 },
      { color: 'rgb(50, 200, 80)', sizeW: 40, sizeH: 28, offsetX: -60, offsetY: 2 },
      { color: 'rgb(180, 40, 240)', sizeW: 35, sizeH: 34, offsetX: -90, offsetY: 0 },
      { color: 'rgb(30, 185, 170)', sizeW: 38, sizeH: 30, offsetX: 85, offsetY: -1 },
      { color: 'rgb(100, 70, 255)', sizeW: 50, sizeH: 24, offsetX: 35, offsetY: 1 },
      { color: 'rgb(40, 140, 255)', sizeW: 40, sizeH: 22, offsetX: -35, offsetY: 0 },
      { color: 'rgb(255, 120, 40)', sizeW: 35, sizeH: 28, offsetX: 110, offsetY: 1 },
      { color: 'rgb(240, 50, 180)', sizeW: 30, sizeH: 30, offsetX: -110, offsetY: -1 },
    ],
  },
  mono: {
    dark: [
      { color: 'rgb(200, 200, 200)', sizeW: 36, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: 'rgb(170, 170, 170)', sizeW: 30, sizeH: 32, offsetX: 39, offsetY: 0 },
      { color: 'rgb(155, 155, 155)', sizeW: 33, sizeH: 28, offsetX: -36, offsetY: 2 },
      { color: 'rgb(185, 185, 185)', sizeW: 29, sizeH: 34, offsetX: -54, offsetY: 0 },
      { color: 'rgb(165, 165, 165)', sizeW: 27, sizeH: 30, offsetX: 51, offsetY: -1 },
      { color: 'rgb(180, 180, 180)', sizeW: 36, sizeH: 24, offsetX: 21, offsetY: 1 },
      { color: 'rgb(160, 160, 160)', sizeW: 30, sizeH: 22, offsetX: -21, offsetY: 0 },
      { color: 'rgb(175, 175, 175)', sizeW: 25, sizeH: 28, offsetX: 66, offsetY: 1 },
      { color: 'rgb(190, 190, 190)', sizeW: 23, sizeH: 30, offsetX: -66, offsetY: -1 },
    ],
    light: [
      { color: 'rgb(100, 100, 100)', sizeW: 45, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: 'rgb(80, 80, 80)', sizeW: 35, sizeH: 32, offsetX: 65, offsetY: 0 },
      { color: 'rgb(90, 90, 90)', sizeW: 40, sizeH: 28, offsetX: -60, offsetY: 2 },
      { color: 'rgb(70, 70, 70)', sizeW: 35, sizeH: 34, offsetX: -90, offsetY: 0 },
      { color: 'rgb(85, 85, 85)', sizeW: 38, sizeH: 30, offsetX: 85, offsetY: -1 },
      { color: 'rgb(95, 95, 95)', sizeW: 50, sizeH: 24, offsetX: 35, offsetY: 1 },
      { color: 'rgb(75, 75, 75)', sizeW: 40, sizeH: 22, offsetX: -35, offsetY: 0 },
      { color: 'rgb(105, 105, 105)', sizeW: 35, sizeH: 28, offsetX: 110, offsetY: 1 },
      { color: 'rgb(65, 65, 65)', sizeW: 30, sizeH: 30, offsetX: -110, offsetY: -1 },
    ],
  },
  ocean: {
    dark: [
      { color: 'rgb(100, 80, 220)', sizeW: 36, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: 'rgb(60, 120, 255)', sizeW: 30, sizeH: 32, offsetX: 39, offsetY: 0 },
      { color: 'rgb(80, 100, 200)', sizeW: 33, sizeH: 28, offsetX: -36, offsetY: 2 },
      { color: 'rgb(130, 70, 255)', sizeW: 29, sizeH: 34, offsetX: -54, offsetY: 0 },
      { color: 'rgb(70, 130, 255)', sizeW: 27, sizeH: 30, offsetX: 51, offsetY: -1 },
      { color: 'rgb(120, 80, 255)', sizeW: 36, sizeH: 24, offsetX: 21, offsetY: 1 },
      { color: 'rgb(90, 110, 230)', sizeW: 30, sizeH: 22, offsetX: -21, offsetY: 0 },
      { color: 'rgb(110, 90, 240)', sizeW: 25, sizeH: 28, offsetX: 66, offsetY: 1 },
      { color: 'rgb(140, 100, 255)', sizeW: 23, sizeH: 30, offsetX: -66, offsetY: -1 },
    ],
    light: [
      { color: 'rgb(80, 60, 200)', sizeW: 45, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: 'rgb(50, 100, 220)', sizeW: 35, sizeH: 32, offsetX: 65, offsetY: 0 },
      { color: 'rgb(70, 90, 190)', sizeW: 40, sizeH: 28, offsetX: -60, offsetY: 2 },
      { color: 'rgb(110, 60, 220)', sizeW: 35, sizeH: 34, offsetX: -90, offsetY: 0 },
      { color: 'rgb(60, 110, 230)', sizeW: 38, sizeH: 30, offsetX: 85, offsetY: -1 },
      { color: 'rgb(100, 70, 240)', sizeW: 50, sizeH: 24, offsetX: 35, offsetY: 1 },
      { color: 'rgb(80, 100, 210)', sizeW: 40, sizeH: 22, offsetX: -35, offsetY: 0 },
      { color: 'rgb(90, 80, 225)', sizeW: 35, sizeH: 28, offsetX: 110, offsetY: 1 },
      { color: 'rgb(120, 90, 245)', sizeW: 30, sizeH: 30, offsetX: -110, offsetY: -1 },
    ],
  },
  sunset: {
    dark: [
      { color: 'rgb(255, 100, 60)', sizeW: 36, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: 'rgb(255, 180, 50)', sizeW: 30, sizeH: 32, offsetX: 39, offsetY: 0 },
      { color: 'rgb(255, 140, 70)', sizeW: 33, sizeH: 28, offsetX: -36, offsetY: 2 },
      { color: 'rgb(255, 80, 80)', sizeW: 29, sizeH: 34, offsetX: -54, offsetY: 0 },
      { color: 'rgb(255, 200, 60)', sizeW: 27, sizeH: 30, offsetX: 51, offsetY: -1 },
      { color: 'rgb(255, 120, 50)', sizeW: 36, sizeH: 24, offsetX: 21, offsetY: 1 },
      { color: 'rgb(255, 160, 80)', sizeW: 30, sizeH: 22, offsetX: -21, offsetY: 0 },
      { color: 'rgb(255, 90, 60)', sizeW: 25, sizeH: 28, offsetX: 66, offsetY: 1 },
      { color: 'rgb(255, 70, 70)', sizeW: 23, sizeH: 30, offsetX: -66, offsetY: -1 },
    ],
    light: [
      { color: 'rgb(220, 80, 40)', sizeW: 45, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: 'rgb(230, 150, 30)', sizeW: 35, sizeH: 32, offsetX: 65, offsetY: 0 },
      { color: 'rgb(210, 110, 50)', sizeW: 40, sizeH: 28, offsetX: -60, offsetY: 2 },
      { color: 'rgb(200, 60, 60)', sizeW: 35, sizeH: 34, offsetX: -90, offsetY: 0 },
      { color: 'rgb(220, 170, 40)', sizeW: 38, sizeH: 30, offsetX: 85, offsetY: -1 },
      { color: 'rgb(210, 100, 30)', sizeW: 50, sizeH: 24, offsetX: 35, offsetY: 1 },
      { color: 'rgb(230, 130, 60)', sizeW: 40, sizeH: 22, offsetX: -35, offsetY: 0 },
      { color: 'rgb(190, 70, 50)', sizeW: 35, sizeH: 28, offsetX: 110, offsetY: 1 },
      { color: 'rgb(180, 50, 50)', sizeW: 30, sizeH: 30, offsetX: -110, offsetY: -1 },
    ],
  },
};

function getLineColorGradients(colorVariant: BorderBeamColorVariant, isDark: boolean, tint?: string): string {
  const palette = lineColorPalettes[colorVariant][isDark ? 'dark' : 'light'];
  return palette
    .map(c => {
      const offsetXStr = c.offsetX === 0 ? '' : (c.offsetX > 0 ? ` + ${c.offsetX}px` : ` - ${Math.abs(c.offsetX)}px`);
      const offsetYStr = c.offsetY === 0 ? '' : (c.offsetY > 0 ? ` + ${c.offsetY}px` : ` - ${Math.abs(c.offsetY)}px`);
      return `radial-gradient(ellipse calc(${c.sizeW}px * var(--beam-w)) calc(${c.sizeH}px * var(--beam-h)) at calc(var(--beam-x) * 100%${offsetXStr}) calc(100%${offsetYStr}), ${tintColor(tint) ?? c.color}, transparent)`;
    })
    .join(',\n       ');
}

// Inner gradient data matching v5.css exactly
const lineInnerGradientData = {
  colorful: [
    { color: 'rgba(255, 50, 100, 0.48)', sizeW: 33, sizeH: 30, offsetX: 0, offsetY: 0 },
    { color: 'rgba(40, 180, 220, 0.42)', sizeW: 24, sizeH: 26, offsetX: 39, offsetY: -3 },
    { color: 'rgba(50, 200, 80, 0.48)', sizeW: 27, sizeH: 24, offsetX: -36, offsetY: 0 },
    { color: 'rgba(180, 40, 240, 0.42)', sizeW: 23, sizeH: 28, offsetX: -54, offsetY: -2 },
    { color: 'rgba(255, 160, 30, 0.50)', sizeW: 24, sizeH: 24, offsetX: 51, offsetY: -1 },
    { color: 'rgba(100, 70, 255, 0.45)', sizeW: 30, sizeH: 20, offsetX: 21, offsetY: 0 },
    { color: 'rgba(40, 140, 255, 0.40)', sizeW: 25, sizeH: 18, offsetX: -21, offsetY: -2 },
    { color: 'rgba(240, 50, 180, 0.45)', sizeW: 21, sizeH: 24, offsetX: 66, offsetY: 0 },
    { color: 'rgba(30, 185, 170, 0.52)', sizeW: 18, sizeH: 26, offsetX: -66, offsetY: -1 },
  ],
  mono: [
    { color: 'rgba(200, 200, 200, 0.48)', sizeW: 33, sizeH: 30, offsetX: 0, offsetY: 0 },
    { color: 'rgba(170, 170, 170, 0.42)', sizeW: 24, sizeH: 26, offsetX: 39, offsetY: -3 },
    { color: 'rgba(155, 155, 155, 0.48)', sizeW: 27, sizeH: 24, offsetX: -36, offsetY: 0 },
    { color: 'rgba(185, 185, 185, 0.42)', sizeW: 23, sizeH: 28, offsetX: -54, offsetY: -2 },
    { color: 'rgba(165, 165, 165, 0.50)', sizeW: 24, sizeH: 24, offsetX: 51, offsetY: -1 },
    { color: 'rgba(180, 180, 180, 0.45)', sizeW: 30, sizeH: 20, offsetX: 21, offsetY: 0 },
    { color: 'rgba(160, 160, 160, 0.40)', sizeW: 25, sizeH: 18, offsetX: -21, offsetY: -2 },
    { color: 'rgba(175, 175, 175, 0.45)', sizeW: 21, sizeH: 24, offsetX: 66, offsetY: 0 },
    { color: 'rgba(190, 190, 190, 0.52)', sizeW: 18, sizeH: 26, offsetX: -66, offsetY: -1 },
  ],
  ocean: [
    { color: 'rgba(100, 80, 220, 0.48)', sizeW: 33, sizeH: 30, offsetX: 0, offsetY: 0 },
    { color: 'rgba(60, 120, 255, 0.42)', sizeW: 24, sizeH: 26, offsetX: 39, offsetY: -3 },
    { color: 'rgba(80, 100, 200, 0.48)', sizeW: 27, sizeH: 24, offsetX: -36, offsetY: 0 },
    { color: 'rgba(130, 70, 255, 0.42)', sizeW: 23, sizeH: 28, offsetX: -54, offsetY: -2 },
    { color: 'rgba(70, 130, 255, 0.50)', sizeW: 24, sizeH: 24, offsetX: 51, offsetY: -1 },
    { color: 'rgba(120, 80, 255, 0.45)', sizeW: 30, sizeH: 20, offsetX: 21, offsetY: 0 },
    { color: 'rgba(90, 110, 230, 0.40)', sizeW: 25, sizeH: 18, offsetX: -21, offsetY: -2 },
    { color: 'rgba(110, 90, 240, 0.45)', sizeW: 21, sizeH: 24, offsetX: 66, offsetY: 0 },
    { color: 'rgba(140, 100, 255, 0.52)', sizeW: 18, sizeH: 26, offsetX: -66, offsetY: -1 },
  ],
  sunset: [
    { color: 'rgba(255, 100, 60, 0.48)', sizeW: 33, sizeH: 30, offsetX: 0, offsetY: 0 },
    { color: 'rgba(255, 180, 50, 0.42)', sizeW: 24, sizeH: 26, offsetX: 39, offsetY: -3 },
    { color: 'rgba(255, 140, 70, 0.48)', sizeW: 27, sizeH: 24, offsetX: -36, offsetY: 0 },
    { color: 'rgba(255, 80, 80, 0.42)', sizeW: 23, sizeH: 28, offsetX: -54, offsetY: -2 },
    { color: 'rgba(255, 200, 60, 0.50)', sizeW: 24, sizeH: 24, offsetX: 51, offsetY: -1 },
    { color: 'rgba(255, 120, 50, 0.45)', sizeW: 30, sizeH: 20, offsetX: 21, offsetY: 0 },
    { color: 'rgba(255, 160, 80, 0.40)', sizeW: 25, sizeH: 18, offsetX: -21, offsetY: -2 },
    { color: 'rgba(255, 90, 60, 0.45)', sizeW: 21, sizeH: 24, offsetX: 66, offsetY: 0 },
    { color: 'rgba(255, 70, 70, 0.52)', sizeW: 18, sizeH: 26, offsetX: -66, offsetY: -1 },
  ],
};

function getLineInnerGradients(colorVariant: BorderBeamColorVariant, tint?: string): string {
  const data = lineInnerGradientData[colorVariant];
  return data
    .map(c => {
      const offsetXStr = c.offsetX === 0 ? '' : (c.offsetX > 0 ? ` + ${c.offsetX}px` : ` - ${Math.abs(c.offsetX)}px`);
      const offsetYStr = c.offsetY === 0 ? '' : ` - ${Math.abs(c.offsetY)}px`;
      return `radial-gradient(ellipse calc(${c.sizeW}px * var(--beam-w)) calc(${c.sizeH}px * var(--beam-h)) at calc(var(--beam-x) * 100%${offsetXStr}) calc(100%${offsetYStr}), ${tintColor(tint, 0.48) ?? c.color}, transparent)`;
    })
    .join(',\n    ');
}

const lineBloomColors = {
  colorful: {
    dark: {
      spikes: [
        { color1: 'rgb(100, 70, 255)', color2: 'rgba(100, 70, 255, 1)' },              // 36%
        { color1: 'rgba(255, 170, 40, 0.59)', color2: 'rgba(255, 170, 40, 0.29)' },    // 50%
        { color1: 'rgb(50, 200, 100)', color2: 'rgba(50, 200, 100, 1)' },              // 64%
        { color1: 'rgba(200, 50, 240, 0.91)', color2: 'rgba(200, 50, 240, 0.45)' },    // 78%
        { color1: 'rgb(40, 140, 255)', color2: 'rgba(40, 140, 255, 1)' },              // 92%
      ],
    },
    light: {
      spikes: [
        { color1: 'rgb(80, 50, 200)', color2: 'rgba(80, 50, 200, 0.8)' },      // 36%
        { color1: 'rgba(210, 130, 0, 0.7)', color2: 'rgba(210, 130, 0, 0.46)' }, // 50%
        { color1: 'rgb(30, 160, 70)', color2: 'rgba(30, 160, 70, 0.82)' },     // 64%
        { color1: 'rgb(160, 30, 190)', color2: 'rgba(160, 30, 190, 0.7)' },    // 78%
        { color1: 'rgb(30, 100, 200)', color2: 'rgba(30, 100, 200, 0.78)' },   // 92%
      ],
    },
  },
  mono: {
    dark: {
      spikes: [
        { color1: 'rgb(200, 200, 200)', color2: 'rgba(200, 200, 200, 1)' },
        { color1: 'rgba(180, 180, 180, 0.59)', color2: 'rgba(180, 180, 180, 0.29)' },
        { color1: 'rgb(190, 190, 190)', color2: 'rgba(190, 190, 190, 1)' },
        { color1: 'rgba(170, 170, 170, 0.91)', color2: 'rgba(170, 170, 170, 0.45)' },
        { color1: 'rgb(185, 185, 185)', color2: 'rgba(185, 185, 185, 1)' },
      ],
    },
    light: {
      spikes: [
        { color1: 'rgb(80, 80, 80)', color2: 'rgba(80, 80, 80, 0.8)' },
        { color1: 'rgba(100, 100, 100, 0.7)', color2: 'rgba(100, 100, 100, 0.46)' },
        { color1: 'rgb(70, 70, 70)', color2: 'rgba(70, 70, 70, 0.82)' },
        { color1: 'rgb(90, 90, 90)', color2: 'rgba(90, 90, 90, 0.7)' },
        { color1: 'rgb(85, 85, 85)', color2: 'rgba(85, 85, 85, 0.78)' },
      ],
    },
  },
  ocean: {
    dark: {
      spikes: [
        { color1: 'rgb(100, 80, 255)', color2: 'rgb(100, 80, 255)' },
        { color1: 'rgba(80, 130, 220, 0.59)', color2: 'rgba(80, 130, 220, 0.29)' },
        { color1: 'rgb(60, 100, 255)', color2: 'rgb(60, 100, 255)' },
        { color1: 'rgba(90, 120, 200, 0.91)', color2: 'rgba(90, 120, 200, 0.45)' },
        { color1: 'rgb(120, 90, 255)', color2: 'rgb(120, 90, 255)' },
      ],
    },
    light: {
      spikes: [
        { color1: 'rgb(50, 40, 180)', color2: 'rgba(50, 40, 180, 0.8)' },
        { color1: 'rgba(40, 80, 200, 0.7)', color2: 'rgba(40, 80, 200, 0.46)' },
        { color1: 'rgb(30, 50, 190)', color2: 'rgba(30, 50, 190, 0.82)' },
        { color1: 'rgb(60, 90, 180)', color2: 'rgba(60, 90, 180, 0.7)' },
        { color1: 'rgb(70, 60, 200)', color2: 'rgba(70, 60, 200, 0.78)' },
      ],
    },
  },
  sunset: {
    dark: {
      spikes: [
        { color1: 'rgb(255, 100, 80)', color2: 'rgb(255, 100, 80)' },
        { color1: 'rgba(255, 150, 80, 0.59)', color2: 'rgba(255, 150, 80, 0.29)' },
        { color1: 'rgb(255, 80, 60)', color2: 'rgb(255, 80, 60)' },
        { color1: 'rgba(255, 120, 50, 0.91)', color2: 'rgba(255, 120, 50, 0.45)' },
        { color1: 'rgb(255, 140, 70)', color2: 'rgb(255, 140, 70)' },
      ],
    },
    light: {
      spikes: [
        { color1: 'rgb(200, 60, 30)', color2: 'rgba(200, 60, 30, 0.8)' },
        { color1: 'rgba(220, 100, 20, 0.7)', color2: 'rgba(220, 100, 20, 0.46)' },
        { color1: 'rgb(180, 40, 20)', color2: 'rgba(180, 40, 20, 0.82)' },
        { color1: 'rgb(210, 80, 10)', color2: 'rgba(210, 80, 10, 0.7)' },
        { color1: 'rgb(190, 70, 30)', color2: 'rgba(190, 70, 30, 0.78)' },
      ],
    },
  },
};

function withAlpha(color: string, alpha: number): string {
  const rgbaMatch = color.match(/^rgba\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*[\d.]+\s*\)$/);
  if (rgbaMatch) return `rgba(${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]}, ${alpha})`;
  const rgbMatch = color.match(/^rgb\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)$/);
  if (rgbMatch) return `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, ${alpha})`;
  return color;
}

function attenuateSpike(color: string, factor: number): string {
  const rgbaMatch = color.match(/^rgba\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)$/);
  if (rgbaMatch) return `rgba(${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]}, ${(parseFloat(rgbaMatch[4]) * factor).toFixed(2)})`;
  const rgbMatch = color.match(/^rgb\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)$/);
  if (rgbMatch) return `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, ${factor.toFixed(2)})`;
  return color;
}

function getLineBloomGradients(colorVariant: BorderBeamColorVariant, isDark: boolean, tint?: string): string {
  if (tint) {
    const glow = tintColor(tint, isDark ? 0.95 : 0.7);
    const mid = tintColor(tint, isDark ? 0.5 : 0.35);
    const soft = tintColor(tint, isDark ? 0.2 : 0.16);

    return `radial-gradient(ellipse calc(12px * var(--beam-spike)) calc(78px * var(--beam-h)) at 12% calc(100% - 2px), ${glow}, ${mid} 35%, transparent 90%),
       radial-gradient(ellipse calc(16px * var(--beam-spike2)) calc(56px * var(--beam-h)) at 32% calc(100% - 3px), ${mid}, ${soft} 55%, transparent 96%),
       radial-gradient(ellipse calc(18px * (2 - var(--beam-spike))) calc(68px * var(--beam-h)) at 58% calc(100% - 3px), ${glow}, ${mid} 40%, transparent 92%),
       radial-gradient(ellipse calc(10px * (2 - var(--beam-spike2))) calc(52px * var(--beam-h)) at 84% calc(100% - 3px), ${mid}, ${soft} 45%, transparent 92%),
       radial-gradient(ellipse calc(48px * var(--beam-w)) calc(42px * var(--beam-h)) at calc(var(--beam-x) * 100%) 100%, ${soft} 0%, transparent 82%)`;
  }

  const spikeColors = getSpikeColors(colorVariant, isDark);
  const bloomData = lineBloomColors[colorVariant][isDark ? 'dark' : 'light'];
  const isMono = colorVariant === 'mono';

  // Mono uses uniform gray so thin spikes at full opacity look like harsh bars.
  // Attenuate opacity and widen the thin gradients so they appear as soft glows.
  const att = isMono ? 0.14 : 1;
  const sc1     = isMono ? attenuateSpike(spikeColors.primary, 0.14) : spikeColors.primary;
  const sc1_mid = isMono ? attenuateSpike(spikeColors.primary, 0.09) : spikeColors.primary;
  const sc2     = isMono ? attenuateSpike(spikeColors.secondary, 0.12) : spikeColors.secondary;
  const sc2_mid = isMono ? withAlpha(spikeColors.secondary, 0.06) : withAlpha(spikeColors.secondary, 0.49);

  const spikes = bloomData.spikes.map(s => isMono
    ? { color1: attenuateSpike(s.color1, att), color2: attenuateSpike(s.color2, att * 0.7) }
    : s
  );

  // Mono: wide, blurred soft spikes; shortened heights
  const thinW1 = isMono ? '12px'  : '0.8px';
  const thinW2 = isMono ? '14px'  : '2px';
  const thinW3 = isMono ? '12px'  : '1.2px';
  const thinW4 = isMono ? '10px'  : '0.6px';
  const thinH1 = isMono ? '42px'  : '92px';
  const thinH2 = isMono ? '38px'  : '72px';
  const thinH3 = isMono ? '40px'  : '85px';
  const thinH4 = isMono ? '32px'  : '60px';
  const thinLW = isMono ? '12px'  : '1px';

  // Main glow: center dot + ambient — mono gets 50% lower opacity
  const glowDotC   = isMono ? 'rgba(255, 255, 255, 0.5)'  : 'rgba(255, 255, 255, 1)';
  const glowDot20  = isMono ? 'rgba(255, 255, 255, 0.45)' : 'rgba(255, 255, 255, 0.9)';
  const glowDot50  = isMono ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.5)';
  const glowAmbC   = isMono ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.3)';
  const glowAmb25  = isMono ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.12)';
  const glowAmb55  = isMono ? 'rgba(255, 255, 255, 0.015)': 'rgba(255, 255, 255, 0.03)';

  if (isDark) {
    return `radial-gradient(ellipse calc(${thinW1} * var(--beam-spike)) calc(${thinH1} * var(--beam-h)) at 8% calc(100% - 2px), ${sc1}, ${sc1_mid} 30%, transparent 88%),
       radial-gradient(ellipse calc(10px * var(--beam-spike2)) calc(35px * var(--beam-h)) at 22% calc(100% - 4px), ${sc2}, ${sc2_mid} 50%, transparent 95%),
       radial-gradient(ellipse calc(${thinW2} * (2 - var(--beam-spike))) calc(${thinH2} * var(--beam-h)) at 36% calc(100% - 3px), ${spikes[0].color1}, ${spikes[0].color2} 40%, transparent 90%),
       radial-gradient(ellipse calc(14px * var(--beam-spike2)) calc(28px * var(--beam-h)) at 50% calc(100% - 2px), ${spikes[1].color1}, ${spikes[1].color2} 55%, transparent 96%),
       radial-gradient(ellipse calc(${thinW3} * (2 - var(--beam-spike2))) calc(${thinH3} * var(--beam-h)) at 64% calc(100% - 4px), ${spikes[2].color1}, ${spikes[2].color2} 35%, transparent 89%),
       radial-gradient(ellipse calc(7px * var(--beam-spike)) calc(45px * var(--beam-h)) at 78% calc(100% - 2px), ${spikes[3].color1}, ${spikes[3].color2} 48%, transparent 94%),
       radial-gradient(ellipse calc(${thinW4} * (2 - var(--beam-spike))) calc(${thinH4} * var(--beam-h)) at 92% calc(100% - 3px), ${spikes[4].color1}, ${spikes[4].color2} 42%, transparent 91%),
       radial-gradient(ellipse calc(21px * var(--beam-spike)) calc(15px * var(--beam-spike2)) at calc(var(--beam-x) * 100%) calc(100% + 1px), ${glowDotC} 0%, ${glowDot20} 20%, ${glowDot50} 50%, transparent 100%),
       radial-gradient(ellipse calc(42px * var(--beam-w)) calc(40px * var(--beam-h)) at calc(var(--beam-x) * 100%) 100%, ${glowAmbC} 0%, ${glowAmb25} 25%, ${glowAmb55} 55%, transparent 80%)`;
  } else {
    const sc1_lt = isMono ? attenuateSpike(spikeColors.primary, 0.11) : withAlpha(spikeColors.primary, 0.85);
    const sc2_lt = isMono ? attenuateSpike(spikeColors.secondary, 0.09) : withAlpha(spikeColors.secondary, 0.7);
    return `radial-gradient(ellipse calc(${thinW1} * var(--beam-spike)) calc(${thinH1} * var(--beam-h)) at 8% calc(100% - 2px), ${sc1}, ${sc1_lt} 30%, transparent 88%),
       radial-gradient(ellipse calc(10px * var(--beam-spike2)) calc(35px * var(--beam-h)) at 22% calc(100% - 4px), ${sc2}, ${sc2_lt} 50%, transparent 95%),
       radial-gradient(ellipse calc(${thinW2} * (2 - var(--beam-spike))) calc(${thinH2} * var(--beam-h)) at 36% calc(100% - 3px), ${spikes[0].color1}, ${spikes[0].color2} 40%, transparent 90%),
       radial-gradient(ellipse calc(14px * var(--beam-spike2)) calc(28px * var(--beam-h)) at 50% calc(100% - 2px), ${spikes[1].color1}, ${spikes[1].color2} 55%, transparent 96%),
       radial-gradient(ellipse calc(${thinW3} * (2 - var(--beam-spike2))) calc(${thinH3} * var(--beam-h)) at 64% calc(100% - 4px), ${spikes[2].color1}, ${spikes[2].color2} 35%, transparent 89%),
       radial-gradient(ellipse calc(7px * var(--beam-spike)) calc(45px * var(--beam-h)) at 78% calc(100% - 2px), ${spikes[3].color1}, ${spikes[3].color2} 48%, transparent 94%),
       radial-gradient(ellipse calc(${thinLW} * (2 - var(--beam-spike))) calc(${thinH4} * var(--beam-h)) at 92% calc(100% - 3px), ${spikes[4].color1}, ${spikes[4].color2} 42%, transparent 91%),
       radial-gradient(ellipse calc(50px * var(--beam-w)) calc(32px * var(--beam-h)) at calc(var(--beam-x) * 100%) calc(100%), rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.18) 30%, rgba(0, 0, 0, 0.03) 60%, transparent 85%)`;
  }
}

/* ──────────────────────────────────────────────────────────────────────────
 * Pulse family (breathing glow, no rotation) — ported from the v5 prototype
 * Card 4 ("pulse-inner", contained) and Card 5 ("pulse-outside", outward bloom).
 *
 * Both effects animate three independent size/drift regions (g1/g2/g3) and four
 * per-quadrant opacity oscillators (tl/tr/bl/br) on desynced periods, plus a
 * global height oscillator (gh) and a hue-shift filter. The gradient COLORS come
 * from the shared `colorPalettes` (so every color variant + strength works), while
 * the geometry below (sizes/positions/region/quadrant) is identical across colors.
 *
 * Compositor rendering: every breathing gradient is painted ONCE, by itself, in
 * its own blob element (see pulseBlobRules), and the breathing runs as CSS
 * keyframes on compositor-only properties — `opacity` (quadrant alpha),
 * `translate` (drift), `scale` / `transform: scaleY()` (size) and the layer
 * container's colour `filter` (hue drift). Chrome runs those on the compositor
 * thread at the display refresh rate: no style recalc, no repaint, no JS per
 * frame. Each oscillator keeps its original amplitude, period and phase offset.
 * ──────────────────────────────────────────────────────────────────────────*/

type PulseRegion = 1 | 2 | 3;
type PulseQuad = 'tl' | 'tr' | 'bl' | 'br';

// Which size-region (g1/g2/g3) and opacity-quadrant each of the 9 palette
// gradients belongs to (taken from the v5 Card 4 ::after ordering).
const PULSE_RING_MAP: { region: PulseRegion; quad: PulseQuad }[] = [
  { region: 1, quad: 'tl' },
  { region: 2, quad: 'tl' },
  { region: 3, quad: 'bl' },
  { region: 1, quad: 'bl' },
  { region: 2, quad: 'br' },
  { region: 3, quad: 'br' },
  { region: 1, quad: 'tr' },
  { region: 2, quad: 'tr' },
  { region: 3, quad: 'tr' },
];

// Card 4 inner-perimeter (::before) gradient sizes — slightly smaller than the ring.
const PULSE_INNER_SIZES: [number, number][] = [
  [65, 35], [55, 30], [35, 65], [15, 30], [173, 28], [80, 22], [69, 28], [22, 38], [47, 44],
];

interface PulseGradientDef {
  ci: number; // index into colorPalettes[variant].border
  region: PulseRegion;
  quad: PulseQuad;
  w: number;
  h: number;
  x?: string; // explicit position (outer effect); falls back to palette pos
  y?: string;
}

// Card 4 bloom — 7 of the 9 colors, expanded sizes (positions come from palette).
const PULSE_INNER_BLOOM: PulseGradientDef[] = [
  { ci: 0, region: 1, quad: 'tl', w: 84, h: 48 },
  { ci: 1, region: 2, quad: 'tl', w: 72, h: 42 },
  { ci: 2, region: 3, quad: 'bl', w: 48, h: 84 },
  { ci: 4, region: 2, quad: 'br', w: 216, h: 38 },
  { ci: 5, region: 3, quad: 'br', w: 102, h: 31 },
  { ci: 6, region: 1, quad: 'tr', w: 89, h: 38 },
  { ci: 8, region: 3, quad: 'tr', w: 62, h: 58 },
];

// Card 5 outward core (::after hairline + ::before glow share this edge-positioned set).
const PULSE_OUTER_CORE: PulseGradientDef[] = [
  { ci: 0, region: 1, quad: 'tl', w: 80, h: 19, x: '27%', y: '0%' },
  { ci: 6, region: 2, quad: 'tr', w: 74, h: 11, x: '73%', y: '-1%' },
  { ci: 7, region: 3, quad: 'tr', w: 15, h: 44, x: '100%', y: '33%' },
  { ci: 8, region: 1, quad: 'br', w: 19, h: 38, x: '101%', y: '72%' },
  { ci: 4, region: 2, quad: 'br', w: 84, h: 13, x: '67%', y: '100%' },
  { ci: 1, region: 3, quad: 'bl', w: 60, h: 21, x: '24%', y: '101%' },
  { ci: 2, region: 1, quad: 'bl', w: 17, h: 40, x: '0%', y: '60%' },
  { ci: 3, region: 2, quad: 'tl', w: 13, h: 32, x: '-1%', y: '28%' },
];

// Card 5 outward bloom — wider/blurred halo (7 gradients).
const PULSE_OUTER_BLOOM: PulseGradientDef[] = [
  { ci: 0, region: 1, quad: 'tl', w: 110, h: 30, x: '27%', y: '3%' },
  { ci: 6, region: 2, quad: 'tr', w: 100, h: 20, x: '73%', y: '1%' },
  { ci: 7, region: 3, quad: 'tr', w: 26, h: 62, x: '100%', y: '33%' },
  { ci: 8, region: 1, quad: 'br', w: 30, h: 56, x: '101%', y: '72%' },
  { ci: 4, region: 2, quad: 'br', w: 120, h: 22, x: '67%', y: '99%' },
  { ci: 1, region: 3, quad: 'bl', w: 88, h: 32, x: '24%', y: '99%' },
  { ci: 2, region: 1, quad: 'bl', w: 28, h: 58, x: '0%', y: '60%' },
];

/** One breathing gradient, painted ONCE in its own blob element. */
interface PulseBlob {
  /** Fill at full alpha (palette colour, tint, or a corner-accent rgba). */
  color: string;
  /** Ellipse radii in px. */
  w: number;
  h: number;
  /** Centre relative to the layer box (same meaning as the old `at x y`). */
  x: string;
  y: string;
  /** Size/drift oscillator set; omitted for the fixed corner accents. */
  region?: PulseRegion;
  /** Opacity oscillator. */
  quad: PulseQuad;
  /** Gradient end stop (default `transparent`). */
  end?: string;
  /** Scale the radii with `--pulse-glow-sx/sy` × `--pulse-glow-boost`. */
  glowScaled: boolean;
}

// The 9-gradient perimeter ring (Card 4 ::after) — positions + sizes come
// straight from the palette, region/quad from PULSE_RING_MAP.
function pulseRingBlobs(variant: BorderBeamColorVariant, tint?: string): PulseBlob[] {
  return colorPalettes[variant].border.map((c, i): PulseBlob => {
    const [x, y] = c.pos.split(' ');
    const [w, h] = c.size.split(' ').map(parseFloat);
    return { color: tintColor(tint) ?? c.color, w, h, x, y, ...PULSE_RING_MAP[i], glowScaled: true };
  });
}

// Card 4 inner-perimeter gradients (smaller sizes) plus the bright corner
// accents, which breathe in opacity only.
function pulseInnerBlobs(variant: BorderBeamColorVariant, isDark: boolean, tint?: string): PulseBlob[] {
  const blobs = colorPalettes[variant].border.map((c, i): PulseBlob => {
    const [x, y] = c.pos.split(' ');
    const [w, h] = PULSE_INNER_SIZES[i];
    return { color: tintColor(tint) ?? c.color, w, h, x, y, ...PULSE_RING_MAP[i], glowScaled: true };
  });
  const cornerColor = isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(0, 0, 0, 0.08)';
  const corners: [string, string, PulseQuad][] = [
    ['0%', '0%', 'tl'],
    ['100%', '0%', 'tr'],
    ['0%', '100%', 'bl'],
    ['100%', '100%', 'br'],
  ];
  return [
    ...blobs,
    ...corners.map(
      ([x, y, quad]): PulseBlob => ({ color: cornerColor, w: 60, h: 60, x, y, quad, end: 'transparent 70%', glowScaled: false }),
    ),
  ];
}

// Card 5 edge-positioned set (shared by the stroke and the core glow).
function pulseOuterCoreBlobs(variant: BorderBeamColorVariant, tint?: string): PulseBlob[] {
  const palette = colorPalettes[variant].border;
  return PULSE_OUTER_CORE.map((e): PulseBlob => {
    const c = palette[e.ci];
    const [px, py] = c.pos.split(' ');
    return {
      color: tintColor(tint) ?? c.color,
      w: e.w,
      h: e.h,
      x: e.x ?? px,
      y: e.y ?? py,
      region: e.region,
      quad: e.quad,
      glowScaled: true,
    };
  });
}

/** The layer elements BorderBeam renders for a pulse size (DOM order). */
export interface PulseLayerSpec {
  /** Value of the container's `data-beam-layer` attribute. */
  name: string;
  /** Number of `[data-beam-blob]` elements inside its `[data-beam-paint]`. */
  blobs: number;
}

const PULSE_INNER_LAYERS: readonly PulseLayerSpec[] = [
  { name: 'inner', blobs: PULSE_RING_MAP.length + 4 },
  { name: 'ring', blobs: PULSE_RING_MAP.length },
];

const PULSE_OUTER_LAYERS: readonly PulseLayerSpec[] = [
  { name: 'core', blobs: PULSE_OUTER_CORE.length },
  { name: 'stroke', blobs: PULSE_OUTER_CORE.length },
];

/**
 * Layer elements the component renders for the compositor-driven pulse
 * variants, or null for the other sizes. The generated CSS addresses exactly
 * these elements: `[data-beam-layer=name] > [data-beam-paint] > [data-beam-blob=i]`.
 */
export function pulseLayerSpecs(size: BorderBeamSize): readonly PulseLayerSpec[] | null {
  if (size === 'pulse-inner') return PULSE_INNER_LAYERS;
  if (size === 'pulse-outside') return PULSE_OUTER_LAYERS;
  return null;
}

/**
 * CSS for one breathing layer's blobs. Each blob is
 *   <div data-beam-blob="i"><div></div></div>
 * The outer element is a 2w × 2h box centred on the gradient centre; it
 * carries the drift (`translate`) and the width breathing (`scale: bw 1`).
 * The inner element paints the gradient once and carries the height breathing
 * (`transform: scaleY(bh)` × `scale: 1 bgh`) and the quadrant alpha
 * (`opacity`). Everything scales about the blob centre, so the result matches
 * the old `ellipse calc(w*bw) calc(h*bh*bgh) at calc(x+bx) calc(y+by)`
 * gradient with alpha `--beam-bop-<quad>`.
 *
 * Each layer's `blobs` are in background-list order (first = on top); DOM
 * order is the reverse, so later siblings paint on top exactly like the old
 * layer list. Blobs with the same oscillators share one `animation` rule.
 */
function pulseBlobRules(layers: [layer: string, blobs: PulseBlob[]][], motion: PulseMotion): string {
  const out: string[] = [];
  const groups = new Map<string, string[]>(); // animation value -> selectors
  const group = (value: string, selector: string) => {
    if (!value) return;
    const list = groups.get(value);
    if (list) list.push(selector);
    else groups.set(value, [selector]);
  };

  for (const [layer, blobs] of layers) [...blobs].reverse().forEach((b, i) => {
    const sel = `${layer} > [data-beam-paint] > [data-beam-blob="${i}"]`;
    const rx = b.glowScaled ? `${b.w}px * var(--pulse-glow-sx, 1) * var(--pulse-glow-boost, 1)` : `${b.w}px`;
    const ry = b.glowScaled ? `${b.h}px * var(--pulse-glow-sy, 1) * var(--pulse-glow-boost, 1)` : `${b.h}px`;
    out.push(`${sel} {
  left: calc(${b.x} - ${rx});
  top: calc(${b.y} - ${ry});
  width: calc(${rx} * 2);
  height: calc(${ry} * 2);
}

${sel} > * {
  background: radial-gradient(closest-side, ${b.color}, ${b.end ?? 'transparent'});
}`);
    group(motion.outer(b.region), sel);
    group(motion.inner(b.region, b.quad), `${sel} > *`);
  });

  for (const [value, selectors] of groups) {
    out.push(`${selectors.join(',\n')} {\n  animation: ${value};\n}`);
  }
  return out.join('\n\n');
}

// Frozen bloom gradients: literal sizes/positions with a fixed per-blob alpha
// (the time-average of the breathing range, `1 - op / 2`). The bloom's heavily
// blurred bitmap is painted ONCE and cached by the compositor; only its colour
// filter animates.
function pulseTableGradientsStatic(
  table: PulseGradientDef[],
  variant: BorderBeamColorVariant,
  frozenAlpha: number,
  tint?: string
): string {
  const palette = colorPalettes[variant].border;
  const a = +frozenAlpha.toFixed(3);
  return table
    .map(e => {
      const c = palette[e.ci];
      const [px, py] = c.pos.split(' ');
      const x = e.x ?? px;
      const y = e.y ?? py;
      const tinted = tintColor(tint, a);
      if (tinted) {
        return `radial-gradient(ellipse calc(${e.w}px * var(--pulse-glow-sx, 1) * var(--pulse-glow-boost, 1)) calc(${e.h}px * var(--pulse-glow-sy, 1) * var(--pulse-glow-boost, 1)) at ${x} ${y}, ${tinted}, transparent)`;
      }

      const m = c.color.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/);
      const rgb = m ? `${m[1]}, ${m[2]}, ${m[3]}` : '255, 255, 255';
      // Scale the blob to the measured element via `--pulse-glow-sx/sy` (same as
      // the live stroke/core layers). The var only changes on resize, so the
      // blurred bloom bitmap is still painted once and cached between resizes.
      // Defaults to 1 (pulse-inner never sets it), leaving inner geometry as-is.
      return `radial-gradient(ellipse calc(${e.w}px * var(--pulse-glow-sx, 1) * var(--pulse-glow-boost, 1)) calc(${e.h}px * var(--pulse-glow-sy, 1) * var(--pulse-glow-boost, 1)) at ${x} ${y}, rgba(${rgb}, ${a}), transparent)`;
    })
    .join(',\n    ');
}

// ── Shared base stylesheet ───────────────────────────────────────────────────
// Everything that is identical for every BorderBeam instance lives here and is
// injected into <head> exactly once (see useBeamStylesheet): the @property
// registrations, every keyframe (parameterized through inherited custom
// properties, so one definition serves all instances), the offscreen pause rule
// and the reduced-motion rule for the pulse family.

const propertyReg = (name: string, syntax: string, initial: string): string =>
  `@property ${name} {\n  syntax: "${syntax}";\n  initial-value: ${initial};\n  inherits: true;\n}`;

const BEAM_PROPERTY_REGS = [
  // Rotating beam (sm/md)
  propertyReg('--beam-angle', '<angle>', '0deg'),
  // Shared fade
  propertyReg('--beam-opacity', '<number>', '0'),
  // Line travel
  propertyReg('--beam-x', '<number>', '0'),
  propertyReg('--beam-w', '<number>', '1'),
  propertyReg('--beam-h', '<number>', '1'),
  propertyReg('--beam-spike', '<number>', '1'),
  propertyReg('--beam-spike2', '<number>', '1'),
  propertyReg('--beam-edge', '<number>', '1'),
  // (The pulse family registers nothing: its breathing animates opacity /
  // transform / filter directly, see pulseMotion.)
].join('\n\n');

export const BEAM_BASE_CSS = `
${BEAM_PROPERTY_REGS}

@keyframes beam-spin {
  to { --beam-angle: 360deg; }
}

@keyframes beam-fade-in {
  to { --beam-opacity: 1; }
}

@keyframes beam-fade-out {
  from { --beam-opacity: 1; }
  to { --beam-opacity: 0; }
}

@keyframes beam-hue-shift {
  0% { filter: hue-rotate(calc(var(--beam-hue-base, 0deg) - var(--beam-hue-range, 30deg))) brightness(var(--beam-brightness, 1.3)) saturate(var(--beam-saturation, 1.2)); }
  50% { filter: hue-rotate(calc(var(--beam-hue-base, 0deg) + var(--beam-hue-range, 30deg))) brightness(var(--beam-brightness, 1.3)) saturate(var(--beam-saturation, 1.2)); }
  100% { filter: hue-rotate(calc(var(--beam-hue-base, 0deg) - var(--beam-hue-range, 30deg))) brightness(var(--beam-brightness, 1.3)) saturate(var(--beam-saturation, 1.2)); }
}

@keyframes beam-hue-shift-bloom {
  0% { filter: blur(8px) hue-rotate(calc(var(--beam-hue-base, 0deg) - var(--beam-hue-range, 30deg) - 10deg)) brightness(var(--beam-brightness, 1.3)) saturate(var(--beam-saturation, 1.2)); }
  50% { filter: blur(8px) hue-rotate(calc(var(--beam-hue-base, 0deg) + var(--beam-hue-range, 30deg) + 10deg)) brightness(var(--beam-brightness, 1.3)) saturate(var(--beam-saturation, 1.2)); }
  100% { filter: blur(8px) hue-rotate(calc(var(--beam-hue-base, 0deg) - var(--beam-hue-range, 30deg) - 10deg)) brightness(var(--beam-brightness, 1.3)) saturate(var(--beam-saturation, 1.2)); }
}

/* Pulse hue drift: one full, continuous hue revolution on the layer
   containers' colour filter (no pixel-moving functions, so Chrome runs it on
   the compositor). The glow variant feeds the pulse-outside core/halo. */
@keyframes beam-pulse-hue {
  from { filter: hue-rotate(var(--beam-hue-base, 0deg)) brightness(var(--beam-brightness, 1.3)) saturate(var(--beam-saturation, 1.2)); }
  to { filter: hue-rotate(calc(var(--beam-hue-base, 0deg) + 360deg)) brightness(var(--beam-brightness, 1.3)) saturate(var(--beam-saturation, 1.2)); }
}

@keyframes beam-pulse-hue-glow {
  from { filter: hue-rotate(var(--beam-hue-base, 0deg)) brightness(var(--beam-glow-brightness, var(--beam-brightness, 1.3))) saturate(var(--beam-glow-saturate, var(--beam-saturation, 1.2))); }
  to { filter: hue-rotate(calc(var(--beam-hue-base, 0deg) + 360deg)) brightness(var(--beam-glow-brightness, var(--beam-brightness, 1.3))) saturate(var(--beam-glow-saturate, var(--beam-saturation, 1.2))); }
}

@keyframes beam-travel {
  0%   { --beam-x: 0.06;  --beam-w: 0.5; }
  10%  { --beam-x: 0.15;  --beam-w: 0.8; }
  20%  { --beam-x: 0.25;  --beam-w: 1.1; }
  30%  { --beam-x: 0.35;  --beam-w: 1.3; }
  40%  { --beam-x: 0.44;  --beam-w: 1.45; }
  50%  { --beam-x: 0.5;   --beam-w: 1.5; }
  60%  { --beam-x: 0.56;  --beam-w: 1.45; }
  70%  { --beam-x: 0.65;  --beam-w: 1.3; }
  80%  { --beam-x: 0.75;  --beam-w: 1.1; }
  90%  { --beam-x: 0.85;  --beam-w: 0.8; }
  100% { --beam-x: 0.94;  --beam-w: 0.5; }
}

@keyframes beam-edge-fade {
  0%    { --beam-edge: 0; }
  12.5% { --beam-edge: 0; }
  32.5% { --beam-edge: 1; }
  67.5% { --beam-edge: 1; }
  87.5% { --beam-edge: 0; }
  100%  { --beam-edge: 0; }
}

@keyframes beam-breathe {
  0%, 100% { --beam-h: 0.8; }
  25%      { --beam-h: 1.25; }
  55%      { --beam-h: 0.85; }
  80%      { --beam-h: 1.3; }
}

@keyframes beam-spike {
  0%   { --beam-spike: 0.8; }
  25%  { --beam-spike: 1.3; }
  50%  { --beam-spike: 0.9; }
  75%  { --beam-spike: 1.4; }
  100% { --beam-spike: 0.8; }
}

@keyframes beam-spike2 {
  0%   { --beam-spike2: 1.2; }
  25%  { --beam-spike2: 0.7; }
  50%  { --beam-spike2: 1.4; }
  75%  { --beam-spike2: 0.8; }
  100% { --beam-spike2: 1.2; }
}

/* Pauses every animation on an instance (wrapper + pseudo layers + bloom +
   pulse layer elements) when it carries the data-paused attribute. Driven by an
   IntersectionObserver so beams scrolled offscreen stop animating entirely. */
[data-beam][data-paused],
[data-beam][data-paused]::after,
[data-beam][data-paused]::before,
[data-beam][data-paused] > [data-beam-bloom],
[data-beam][data-paused] > [data-beam-layer],
[data-beam][data-paused] > [data-beam-layer] [data-beam-blob],
[data-beam][data-paused] > [data-beam-layer] [data-beam-blob] > * {
  animation-play-state: paused !important;
}

/* Reduced motion: the pulse family stops breathing and drifting hue and shows
   its resting glow. The wrapper's one-shot fade keeps running: it is an
   opacity fade, not motion, and it is what raises --beam-opacity to 1 and
   emits activate/deactivate (without it the glow stayed invisible and a
   deactivating beam stayed stuck in data-fading). */
@media (prefers-reduced-motion: reduce) {
  [data-beam^="pulse-"] > [data-beam-layer],
  [data-beam^="pulse-"] > [data-beam-layer] [data-beam-blob],
  [data-beam^="pulse-"] > [data-beam-layer] [data-beam-blob] > *,
  [data-beam^="pulse-"] > [data-beam-bloom] {
    animation: none !important;
  }
}
`;

/** Tiny stable string hash (djb2) — keys arbitrary tint strings CSS-safely. */
function hashString(value: string): string {
  let hash = 5381;
  for (let i = 0; i < value.length; i++) {
    hash = ((hash << 5) + hash + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash).toString(36);
}

/**
 * Deterministic key for one generated-CSS configuration. Instances with the
 * same key share the same injected stylesheet; the key doubles as the value of
 * the wrapper's `data-beam` attribute, which every generated selector targets.
 * (The reduced-motion rule in BEAM_BASE_CSS relies on pulse keys starting with
 * "pulse-".)
 */
export function beamCssKey(options: GenerateStylesOptions): string {
  const parts: string[] = [
    options.size,
    options.theme,
    options.colorVariant,
    options.staticColors ? 'static' : 'anim',
  ];
  if (options.tint) parts.push(`tint-${hashString(options.tint)}`);
  if (options.cornerShape === 'squircle') parts.push('squircle');
  return parts.join('_');
}

// ── Pulse breathing motion ───────────────────────────────────────────────────
// History: the breathing used to animate ~17 custom properties that fed the
// painted gradients (first as CSS @property keyframes, then from a shared
// requestAnimationFrame loop capped at 30 fps). Both repainted the gradient
// layers on every update, and the 30 fps cap made the motion visibly step on
// 60 Hz+ screens.
//
// Now every oscillator becomes a two-keyframe CSS animation on a compositor
// property of a blob element (pulseBlobRules): `alternate` + a sine-shaped
// ease reproduces the old ping-pong `a + (b - a) * (1 - cos 2πt/T) / 2`, the
// iteration is half the period, and the old phase offset becomes a negative
// animation-delay. Durations scale with the per-instance `--beam-duration`.

/** Breathing parameters are tuned for this cycle; `duration` scales them. */
const PULSE_BASE_DURATION = 2.3;

/** Cubic-bezier fit of the sine ease-in-out `(1 - cos πx) / 2`. */
const PULSE_EASE = 'cubic-bezier(0.37, 0, 0.63, 1)';

/** One oscillator: ping-pongs between `a` and `b` over `period` seconds, starting at `a` at t = `delay`. */
interface PulseOsc {
  a: number;
  b: number;
  period: number;
  delay: number;
}

/** Theme/size/duration-tuned breathing parameters. */
function pulseParams(size: BorderBeamSize, theme: 'dark' | 'light', duration: number) {
  const isDark = theme === 'dark';
  const durScale = duration / PULSE_BASE_DURATION;
  if (size === 'pulse-inner') {
    return {
      sp: 0.28,
      dr: isDark ? 33 : 40,
      op: isDark ? 0.48 : 0.45,
      gh: isDark ? 0.34 : 0.22,
      bs: (isDark ? 1.9 : 2.6) * durScale,
      ss: (isDark ? 2.6 : 4.6) * durScale,
      ghs: (isDark ? 2.4 : 5.5) * durScale,
      // Full hue revolution period (seconds) — colors continuously cycle.
      huePeriod: 16,
    };
  }
  return {
    sp: isDark ? 0.28 : 0.36,
    dr: isDark ? 14 : 19,
    op: isDark ? 0.46 : 0,
    gh: isDark ? 0.16 : 0.58,
    bs: (isDark ? 2.3 : 3.7) * durScale,
    ss: (isDark ? 6.4 : 4.6) * durScale,
    ghs: (isDark ? 2.4 : 3.8) * durScale,
    // Full hue revolution period (seconds) — colors continuously cycle.
    huePeriod: 14,
  };
}

/** The oscillator table (unchanged amplitudes, periods and phase offsets). */
function pulseOscillators(p: ReturnType<typeof pulseParams>) {
  const { sp, dr, op, gh, bs, ss, ghs } = p;
  const o = (a: number, b: number, period: number, delay = 0): PulseOsc => ({ a, b, period, delay });
  return {
    bw1: o(1 - sp, 1 + sp * 1.1, ss * 0.9),
    bh1: o(1 + sp * 0.9, 1 - sp * 0.85, ss * 1.26),
    bx1: o(-dr, dr * 0.9, bs * 1.6),
    by1: o(dr * 0.55, -dr * 0.7, bs * 1.6),
    bw2: o(1 + sp, 1 - sp * 0.85, ss * 1.1),
    bh2: o(1 - sp * 0.8, 1 + sp * 1.05, ss * 0.81),
    bx2: o(dr * 0.8, -dr * 0.9, bs * 1.88),
    by2: o(-dr, dr * 0.65, bs * 1.88),
    bw3: o(1 - sp * 0.6, 1 + sp * 1.15, ss * 0.98),
    bh3: o(1 + sp * 0.75, 1 - sp, ss * 1.4),
    bx3: o(-dr * 0.6, dr, bs * 1.45),
    by3: o(-dr * 0.85, dr * 0.45, bs * 1.45),
    bgh: o(1 - gh, 1 + gh, ghs),
    tl: o(1 - op, 1, bs),
    tr: o(1 - op, 1, bs * 1.32, bs * 0.28),
    bl: o(1 - op, 1, bs * 0.84, bs * 0.55),
    br: o(1 - op, 1, bs * 1.58, bs * 0.83),
  };
}

/** Keyframes + per-blob animation lists for one size × theme. */
interface PulseMotion {
  keyframes: string;
  /** Animations of a blob's outer element (drift + width); '' for none. */
  outer(region?: PulseRegion): string;
  /** Animations of a blob's painted element (height + quadrant alpha); '' for none. */
  inner(region: PulseRegion | undefined, quad: PulseQuad): string;
}

const fmt = (value: number): string => String(+value.toFixed(4));

/** A time that follows the per-instance `--beam-duration`. */
const pulseTime = (seconds: number): string =>
  seconds === 0 ? '0s' : `calc(var(--beam-duration, ${PULSE_BASE_DURATION}s) * ${fmt(seconds / PULSE_BASE_DURATION)})`;

function pulseMotion(size: 'pulse-inner' | 'pulse-outside', theme: 'dark' | 'light'): PulseMotion {
  const osc = pulseOscillators(pulseParams(size, theme, PULSE_BASE_DURATION));
  // Keyframes depend on size × theme only, so the name does too: sheets of
  // other colour variants / tints / corner shapes define identical copies.
  const prefix = `beam-${size === 'pulse-inner' ? 'pi' : 'po'}-${theme}`;
  const frames = new Map<string, string>(); // keyframes body -> name
  const anims = new Map<string, string>();

  const define = (id: string, timing: PulseOsc, from: string, to: string, changes: boolean) => {
    if (!changes) return; // e.g. light pulse-outside has no opacity breathing
    // Oscillators with the same range (the four quadrant alphas) share one
    // @keyframes; they differ only in duration and delay.
    const body = `  from { ${from} }\n  to { ${to} }`;
    const name = frames.get(body) ?? `${prefix}-${id}`;
    frames.set(body, name);
    // The old phase offset: start `delay` seconds later, expressed as a
    // negative delay of whole periods so the animation runs from t = 0.
    const delay = timing.delay === 0 ? 0 : timing.delay - timing.period * Math.ceil(timing.delay / timing.period);
    anims.set(id, `${name} ${pulseTime(timing.period / 2)} ${PULSE_EASE} ${pulseTime(delay)} infinite alternate`);
  };

  for (const r of [1, 2, 3] as const) {
    const bx = osc[`bx${r}`];
    const by = osc[`by${r}`];
    const bw = osc[`bw${r}`];
    const bh = osc[`bh${r}`];
    // x/y drift share period and phase in every region: one straight-line translate.
    define(`d${r}`, bx, `translate: ${fmt(bx.a)}px ${fmt(by.a)}px;`, `translate: ${fmt(bx.b)}px ${fmt(by.b)}px;`, bx.a !== bx.b || by.a !== by.b);
    define(`w${r}`, bw, `scale: ${fmt(bw.a)} 1;`, `scale: ${fmt(bw.b)} 1;`, bw.a !== bw.b);
    define(`h${r}`, bh, `transform: scaleY(${fmt(bh.a)});`, `transform: scaleY(${fmt(bh.b)});`, bh.a !== bh.b);
  }
  define('gh', osc.bgh, `scale: 1 ${fmt(osc.bgh.a)};`, `scale: 1 ${fmt(osc.bgh.b)};`, osc.bgh.a !== osc.bgh.b);
  for (const q of ['tl', 'tr', 'bl', 'br'] as const) {
    define(`o-${q}`, osc[q], `opacity: ${fmt(osc[q].a)};`, `opacity: ${fmt(osc[q].b)};`, osc[q].a !== osc[q].b);
  }

  const list = (...ids: string[]) =>
    ids
      .map(id => anims.get(id))
      .filter((v): v is string => !!v)
      .join(',\n    ');

  return {
    keyframes: [...frames].map(([body, name]) => `@keyframes ${name} {\n${body}\n}`).join('\n\n'),
    outer: region => (region ? list(`d${region}`, `w${region}`) : ''),
    inner: (region, quad) => (region ? list(`h${region}`, 'gh', `o-${quad}`) : list(`o-${quad}`)),
  };
}

// The pulse wrapper only runs the short one-shot fade (it animates
// --beam-opacity, which every layer's opacity multiplies in).
function pulseWrapperAnimation(fadeName: string, fadeDur: number): string {
  return `  animation: ${fadeName} ${fadeDur}s ease forwards;`;
}

export interface GenerateStylesOptions {
  size: BorderBeamSize;
  colorVariant: BorderBeamColorVariant;
  staticColors: boolean;
  theme: 'dark' | 'light';
  /** Custom single-color tint for all generated beam gradients. */
  tint?: string;
  /** Corner geometry for every beam layer. Defaults to rounded rects. */
  cornerShape?: BorderBeamCornerShape;
}

/**
 * Generate the shared CSS for one BorderBeam configuration (size × theme ×
 * color variant × staticColors × tint). Everything per-instance — radius,
 * duration, opacities, brightness/saturation, hue range — is consumed through
 * CSS custom properties that the component sets inline on its wrapper, so all
 * instances with the same configuration share this stylesheet verbatim.
 */
/* ──────────────────────────────────────────────────────────────────────────
 * Palette hooks — re-theme the `colorful` variant from CSS.
 *
 * Every colour the colorful palette paints (across ALL size presets: ring,
 * inner glow, bloom, spikes, line trail) belongs to one of nine hue
 * families. The generated CSS references each family through a CSS custom
 * property with the original colour as fallback, so by default nothing
 * changes, and a consumer can re-brand the whole effect by defining:
 *
 *   :root {
 *     --beam-color-pink:    #ff3366;
 *     --beam-color-blue:    #3366ff;
 *     --beam-color-green:   #33cc66;
 *     ...
 *   }
 *
 * Families: pink, red, blue, green, teal, purple, violet, magenta, orange.
 * Darker light-mode/spike shades of a hue map to the SAME hook, so one
 * variable re-colours the family everywhere. Alpha'd occurrences are emitted
 * as `color-mix(... calc(<alpha> * 100%), transparent)`, which renders
 * identically to the original `rgba()` while inheriting the hook colour.
 * ──────────────────────────────────────────────────────────────────────────*/

/** The nine CSS hooks (as `--beam-color-<name>`) the colorful palette exposes. */
export const colorfulPaletteHooks = [
  'pink',
  'red',
  'blue',
  'green',
  'teal',
  'purple',
  'violet',
  'magenta',
  'orange',
] as const;

// Every rgb triple the colorful tables emit, mapped to its hue family.
// (Triples are written exactly as they appear in the generated CSS.)
const COLORFUL_HOOK_TRIPLES: [triple: string, hook: (typeof colorfulPaletteHooks)[number]][] = [
  ['255, 50, 100', 'pink'],
  ['200, 30, 60', 'pink'],
  ['255, 60, 80', 'red'],
  ['40, 140, 255', 'blue'],
  ['30, 100, 200', 'blue'],
  ['50, 200, 80', 'green'],
  ['50, 200, 100', 'green'],
  ['30, 160, 70', 'green'],
  ['30, 185, 170', 'teal'],
  ['40, 190, 180', 'teal'],
  ['20, 150, 140', 'teal'],
  ['40, 180, 220', 'teal'],
  ['100, 70, 255', 'purple'],
  ['80, 50, 200', 'purple'],
  ['180, 40, 240', 'violet'],
  ['200, 50, 240', 'violet'],
  ['160, 30, 190', 'violet'],
  ['240, 50, 180', 'magenta'],
  ['255, 120, 40', 'orange'],
  ['255, 160, 30', 'orange'],
  ['255, 170, 40', 'orange'],
  ['210, 130, 0', 'orange'],
];

/**
 * Post-process a colorful variant's generated CSS, routing every palette
 * colour through its `--beam-color-<family>` hook. Runs on the FINAL string
 * (not the palette tables) because several generators parse `rgb(...)`
 * literals with regexes (withAlpha/attenuateSpike/pulseTableGradientsStatic)
 * that a `var()` in the tables would break. Alpha expressions are folded into
 * the color-mix percentage, whether numeric (`0.3`) or a custom property
 * (`var(--x)`; no variant emits one today).
 */
export function applyColorfulPaletteHooks(css: string): string {
  for (const [triple, hook] of COLORFUL_HOOK_TRIPLES) {
    const fallback = `rgb(${triple})`;
    const hooked = `var(--beam-color-${hook}, ${fallback})`;
    css = css.replaceAll(fallback, hooked);
    const rgba = new RegExp(
      String.raw`rgba\(${triple.replaceAll(', ', String.raw`,\s*`)},\s*([\d.]+|var\(--[\w-]+\))\s*\)`,
      'g',
    );
    css = css.replace(
      rgba,
      (_, alpha: string) =>
        `color-mix(in srgb, ${hooked} calc(${alpha} * 100%), transparent)`,
    );
  }
  return css;
}

export function generateBeamCSS(options: GenerateStylesOptions): string {
  const { size } = options;

  let css: string;
  if (size === 'line') {
    css = generateLineVariantCSS(options);
  } else if (size === 'sm') {
    css = generateSmallVariantCSS(options);
  } else if (size === 'pulse-inner') {
    css = generatePulseInnerVariantCSS(options);
  } else if (size === 'pulse-outside') {
    css = generatePulseOuterVariantCSS(options);
  } else {
    css = generateBorderVariantCSS(options);
  }

  if (options.colorVariant === 'colorful') {
    css = applyColorfulPaletteHooks(css);
  }

  if (options.cornerShape === 'squircle') {
    css = applySquircleCorners(css);
  }

  return css;
}

/**
 * Rewrite a variant's CSS for `corner-shape: squircle` children:
 * every rounded layer gains the squircle corner geometry, and the rounded
 * clip-paths are relaxed to plain insets — `clip-path: inset(.. round ..)`
 * always clips a rounded RECT, which would shave the squircle's wider
 * shoulders; the layers' own border-radius (+ corner-shape) already bounds
 * the painted area, so the plain inset only needs to contain blur overflow.
 */
function applySquircleCorners(css: string): string {
  return css
    .replaceAll(
      // `/* keep-round */` marks layers whose shape comes from a ring MASK
      // plus blur (the outward glow layers): Chromium renders corner-shape:
      // squircle on those as square corners, and after a 7-16px blur a
      // rounded rect is indistinguishable from a squircle anyway.
      /border-radius: ([^;]+);(?! \/\* keep-round)/g,
      'border-radius: $1;\n  corner-shape: squircle;',
    )
    .replaceAll(
      /clip-path: inset\(0 round [^;]+\);/g,
      'clip-path: inset(0);',
    );
}

function generateSmallVariantCSS(options: GenerateStylesOptions): string {
  const { colorVariant, tint, staticColors, theme } = options;
  const key = beamCssKey(options);

  const hueShiftAnimation = staticColors
    ? ''
    : `animation: beam-hue-shift 12s ease-in-out infinite;`;

  const isDark = theme === 'dark';
  
  const whiteGradient = isDark
    ? `conic-gradient(
        from var(--beam-angle),
        transparent 0%, transparent 54%,
        rgba(255, 255, 255, 0.1) 57%,
        rgba(255, 255, 255, 0.3) 60%,
        rgba(255, 255, 255, 0.6) 63%,
        rgba(255, 255, 255, 0.75) 66%,
        rgba(255, 255, 255, 0.6) 69%,
        rgba(255, 255, 255, 0.3) 72%,
        rgba(255, 255, 255, 0.1) 75%,
        transparent 78%, transparent 100%
      )`
    : `conic-gradient(
        from var(--beam-angle),
        transparent 0%, transparent 54%,
        rgba(0, 0, 0, 0.08) 57%,
        rgba(0, 0, 0, 0.2) 60%,
        rgba(0, 0, 0, 0.4) 63%,
        rgba(0, 0, 0, 0.55) 66%,
        rgba(0, 0, 0, 0.4) 69%,
        rgba(0, 0, 0, 0.2) 72%,
        rgba(0, 0, 0, 0.08) 75%,
        transparent 78%, transparent 100%
      )`;

  const colorGradients = getSmallColorGradients(colorVariant, tint);
  const innerGradients = getSmallInnerGradients(colorVariant, tint);

  const bloomGradient = isDark
    ? `conic-gradient(
        from var(--beam-angle),
        transparent 0%, transparent 58%,
        rgba(255, 255, 255, 0.03) 62%,
        rgba(255, 255, 255, 0.08) 65%,
        rgba(255, 255, 255, 0.2) 67%,
        rgba(255, 255, 255, 0.45) 69%,
        rgba(255, 255, 255, 0.85) 70%,
        rgba(255, 255, 255, 0.85) 70.5%,
        rgba(255, 255, 255, 0.45) 71.5%,
        rgba(255, 255, 255, 0.2) 73%,
        rgba(255, 255, 255, 0.08) 75%,
        rgba(255, 255, 255, 0.03) 78%,
        transparent 82%
      )`
    : `conic-gradient(
        from var(--beam-angle),
        transparent 0%, transparent 58%,
        rgba(0, 0, 0, 0.02) 62%,
        rgba(0, 0, 0, 0.08) 65%,
        rgba(0, 0, 0, 0.2) 67%,
        rgba(0, 0, 0, 0.4) 69%,
        rgba(0, 0, 0, 0.6) 70%,
        rgba(0, 0, 0, 0.6) 70.5%,
        rgba(0, 0, 0, 0.4) 71.5%,
        rgba(0, 0, 0, 0.2) 73%,
        rgba(0, 0, 0, 0.08) 75%,
        rgba(0, 0, 0, 0.02) 78%,
        transparent 82%
      )`;

  // Small variant uses wider mask to show more of the beam around the smaller element
  const smallMask = `conic-gradient(
    from var(--beam-angle),
    transparent 0%, transparent 22%,
    rgba(255, 255, 255, 0.12) 28%, rgba(255, 255, 255, 0.4) 36%,
    white 46%, white 82%,
    rgba(255, 255, 255, 0.4) 88%, rgba(255, 255, 255, 0.12) 94%,
    transparent 97%, transparent 100%
  )`;

  return `
[data-beam="${key}"] {
  position: relative;
  border-radius: var(--beam-radius, 16px);
  overflow: hidden;
}

[data-beam="${key}"][data-active] {
  animation:
    beam-spin var(--beam-duration, 1.96s) linear infinite,
    beam-fade-in 0.6s ease forwards;
}

[data-beam="${key}"][data-fading] {
  animation:
    beam-spin var(--beam-duration, 1.96s) linear infinite,
    beam-fade-out 0.5s ease forwards;
}

[data-beam="${key}"][data-active]::after,
[data-beam="${key}"][data-fading]::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: var(--beam-inner-radius, 15px);
  padding: var(--beam-border-width, 1px);
  clip-path: inset(0 round var(--beam-radius, 16px));
  background: ${whiteGradient},${colorGradients};
  -webkit-mask:
    conic-gradient(
      from var(--beam-angle),
      transparent 0%, transparent 30%,
      rgba(255, 255, 255, 0.1) 36%, rgba(255, 255, 255, 0.35) 44%,
      white 52%, white 80%,
      rgba(255, 255, 255, 0.35) 86%, rgba(255, 255, 255, 0.1) 92%,
      transparent 95%, transparent 100%
    ),
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: source-in, xor;
  mask:
    conic-gradient(
      from var(--beam-angle),
      transparent 0%, transparent 30%,
      rgba(255, 255, 255, 0.1) 36%, rgba(255, 255, 255, 0.35) 44%,
      white 52%, white 80%,
      rgba(255, 255, 255, 0.35) 86%, rgba(255, 255, 255, 0.1) 92%,
      transparent 95%, transparent 100%
    ),
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: intersect, exclude;
  pointer-events: none;
  z-index: 2;
  opacity: calc(var(--beam-opacity) * var(--beam-stroke-mul, 1) * var(--beam-stroke-opacity, 1) * var(--beam-strength, 1));
  ${hueShiftAnimation}
}

[data-beam="${key}"][data-active]::before,
[data-beam="${key}"][data-fading]::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: var(--beam-radius, 16px);
  clip-path: inset(0 round var(--beam-radius, 16px));
  background: ${innerGradients};
  box-shadow: inset 0 0 5px 1px var(--beam-inner-shadow, transparent);
  -webkit-mask-image: ${smallMask};
  -webkit-mask-composite: source-over;
  mask-image: ${smallMask};
  mask-composite: add;
  pointer-events: none;
  z-index: 1;
  opacity: calc(var(--beam-opacity) * var(--beam-inner-mul, 1) * var(--beam-inner-opacity, 1) * var(--beam-strength, 1));
  ${hueShiftAnimation}
}

[data-beam="${key}"] [data-beam-bloom] {
  display: none;
  position: absolute;
  inset: 0;
  border-radius: var(--beam-inner-radius, 15px);
  clip-path: inset(0 round var(--beam-radius, 16px));
  background: ${bloomGradient};
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  padding: var(--beam-border-width, 1px);
  filter: blur(8px) brightness(var(--beam-brightness, 1.3)) saturate(var(--beam-saturation, 1.2));
  pointer-events: none;
  z-index: 3;
  opacity: 0;
}

[data-beam="${key}"][data-active] [data-beam-bloom],
[data-beam="${key}"][data-fading] [data-beam-bloom] {
  display: block;
  opacity: calc(var(--beam-opacity) * var(--beam-bloom-mul, 1) * var(--beam-bloom-opacity, 1) * var(--beam-strength, 1));
}

`;
}

function generateBorderVariantCSS(options: GenerateStylesOptions): string {
  const { colorVariant, tint, staticColors, theme } = options;
  const key = beamCssKey(options);

  const hueShiftAnimation = staticColors
    ? ''
    : `animation: beam-hue-shift 12s ease-in-out infinite;`;

  const isDark = theme === 'dark';
  
  const whiteGradient = isDark
    ? `conic-gradient(
        from var(--beam-angle),
        transparent 0%, transparent 54%,
        rgba(255, 255, 255, 0.1) 57%,
        rgba(255, 255, 255, 0.3) 60%,
        rgba(255, 255, 255, 0.6) 63%,
        rgba(255, 255, 255, 0.75) 66%,
        rgba(255, 255, 255, 0.6) 69%,
        rgba(255, 255, 255, 0.3) 72%,
        rgba(255, 255, 255, 0.1) 75%,
        transparent 78%, transparent 100%
      )`
    : `conic-gradient(
        from var(--beam-angle),
        transparent 0%, transparent 54%,
        rgba(0, 0, 0, 0.08) 57%,
        rgba(0, 0, 0, 0.2) 60%,
        rgba(0, 0, 0, 0.4) 63%,
        rgba(0, 0, 0, 0.55) 66%,
        rgba(0, 0, 0, 0.4) 69%,
        rgba(0, 0, 0, 0.2) 72%,
        rgba(0, 0, 0, 0.08) 75%,
        transparent 78%, transparent 100%
      )`;

  const colorGradients = getColorGradients(colorVariant, tint);
  const innerGradients = getInnerGradients(colorVariant, tint);

  const bloomGradient = isDark
    ? `conic-gradient(
        from var(--beam-angle),
        transparent 0%, transparent 58%,
        rgba(255, 255, 255, 0.03) 62%,
        rgba(255, 255, 255, 0.08) 65%,
        rgba(255, 255, 255, 0.2) 67%,
        rgba(255, 255, 255, 0.45) 69%,
        rgba(255, 255, 255, 0.85) 70%,
        rgba(255, 255, 255, 0.85) 70.5%,
        rgba(255, 255, 255, 0.45) 71.5%,
        rgba(255, 255, 255, 0.2) 73%,
        rgba(255, 255, 255, 0.08) 75%,
        rgba(255, 255, 255, 0.03) 78%,
        transparent 82%
      )`
    : `conic-gradient(
        from var(--beam-angle),
        transparent 0%, transparent 58%,
        rgba(0, 0, 0, 0.02) 62%,
        rgba(0, 0, 0, 0.08) 65%,
        rgba(0, 0, 0, 0.2) 67%,
        rgba(0, 0, 0, 0.4) 69%,
        rgba(0, 0, 0, 0.6) 70%,
        rgba(0, 0, 0, 0.6) 70.5%,
        rgba(0, 0, 0, 0.4) 71.5%,
        rgba(0, 0, 0, 0.2) 73%,
        rgba(0, 0, 0, 0.08) 75%,
        rgba(0, 0, 0, 0.02) 78%,
        transparent 82%
      )`;

  return `
[data-beam="${key}"] {
  position: relative;
  border-radius: var(--beam-radius, 16px);
  overflow: hidden;
}

[data-beam="${key}"][data-active] {
  animation:
    beam-spin var(--beam-duration, 1.96s) linear infinite,
    beam-fade-in 0.6s ease forwards;
}

[data-beam="${key}"][data-fading] {
  animation:
    beam-spin var(--beam-duration, 1.96s) linear infinite,
    beam-fade-out 0.5s ease forwards;
}

[data-beam="${key}"][data-active]::after,
[data-beam="${key}"][data-fading]::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: var(--beam-inner-radius, 15px);
  padding: var(--beam-border-width, 1px);
  clip-path: inset(0 round var(--beam-radius, 16px));
  background: ${whiteGradient},${colorGradients};
  -webkit-mask:
    conic-gradient(
      from var(--beam-angle),
      transparent 0%, transparent 30%,
      rgba(255, 255, 255, 0.1) 36%, rgba(255, 255, 255, 0.35) 44%,
      white 52%, white 80%,
      rgba(255, 255, 255, 0.35) 86%, rgba(255, 255, 255, 0.1) 92%,
      transparent 95%, transparent 100%
    ),
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: source-in, xor;
  mask:
    conic-gradient(
      from var(--beam-angle),
      transparent 0%, transparent 30%,
      rgba(255, 255, 255, 0.1) 36%, rgba(255, 255, 255, 0.35) 44%,
      white 52%, white 80%,
      rgba(255, 255, 255, 0.35) 86%, rgba(255, 255, 255, 0.1) 92%,
      transparent 95%, transparent 100%
    ),
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: intersect, exclude;
  pointer-events: none;
  z-index: 2;
  opacity: calc(var(--beam-opacity) * var(--beam-stroke-mul, 1) * var(--beam-stroke-opacity, 1) * var(--beam-strength, 1));
  ${hueShiftAnimation}
}

[data-beam="${key}"][data-active]::before,
[data-beam="${key}"][data-fading]::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: var(--beam-radius, 16px);
  background: ${innerGradients};
  box-shadow: inset 0 0 9px 1px var(--beam-inner-shadow, transparent);
  -webkit-mask-image:
    conic-gradient(
      from var(--beam-angle),
      transparent 0%, transparent 30%,
      rgba(255, 255, 255, 0.1) 36%, rgba(255, 255, 255, 0.35) 44%,
      white 52%, white 80%,
      rgba(255, 255, 255, 0.35) 86%, rgba(255, 255, 255, 0.1) 92%,
      transparent 95%, transparent 100%
    ),
    linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
    linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
  -webkit-mask-composite: source-in, source-over;
  mask-image:
    conic-gradient(
      from var(--beam-angle),
      transparent 0%, transparent 30%,
      rgba(255, 255, 255, 0.1) 36%, rgba(255, 255, 255, 0.35) 44%,
      white 52%, white 80%,
      rgba(255, 255, 255, 0.35) 86%, rgba(255, 255, 255, 0.1) 92%,
      transparent 95%, transparent 100%
    ),
    linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
    linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
  mask-composite: intersect, add;
  pointer-events: none;
  z-index: 1;
  opacity: calc(var(--beam-opacity) * var(--beam-inner-mul, 1) * var(--beam-inner-opacity, 1) * var(--beam-strength, 1));
  clip-path: inset(0 round var(--beam-radius, 16px));
  ${hueShiftAnimation}
}

[data-beam="${key}"] [data-beam-bloom] {
  display: none;
  position: absolute;
  inset: 0;
  border-radius: var(--beam-inner-radius, 15px);
  clip-path: inset(0 round var(--beam-radius, 16px));
  background: ${bloomGradient};
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  padding: var(--beam-border-width, 1px);
  filter: blur(8px) brightness(var(--beam-brightness, 1.3)) saturate(var(--beam-saturation, 1.2));
  pointer-events: none;
  z-index: 3;
  opacity: 0;
}

[data-beam="${key}"][data-active] [data-beam-bloom],
[data-beam="${key}"][data-fading] [data-beam-bloom] {
  display: block;
  opacity: calc(var(--beam-opacity) * var(--beam-bloom-mul, 1) * var(--beam-bloom-opacity, 1) * var(--beam-strength, 1));
}

`;
}

/** Layout shared by the pulse layer containers and their blob elements. */
function pulseLayerBaseCSS(root: string): string {
  return `${root} > [data-beam-layer] {
  display: none;
  position: absolute;
  pointer-events: none;
}

${root}[data-active] > [data-beam-layer],
${root}[data-fading] > [data-beam-layer] {
  display: block;
}

${root} > [data-beam-layer] > [data-beam-paint],
${root} > [data-beam-bloom] > [data-beam-paint] {
  position: absolute;
  inset: 0;
}

${root} > [data-beam-layer] > [data-beam-paint] > [data-beam-blob],
${root} > [data-beam-layer] > [data-beam-paint] > [data-beam-blob] > * {
  position: absolute;
}

${root} > [data-beam-layer] > [data-beam-paint] > [data-beam-blob] > * {
  inset: 0;
}`;
}

const PULSE_RING_MASK = `-webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;`;

/**
 * Pulse Inner — contained breathing glow (port of v5 Card 4).
 * A full colorful perimeter ring, an inner perimeter glow with corner accents,
 * and a soft blurred bloom, all clipped inside the element.
 *
 * Layers, bottom to top: inner glow `[data-beam-layer="inner"]` (z 1), ring
 * `[data-beam-layer="ring"]` (z 2), bloom `[data-beam-bloom]` (z 3). The
 * containers carry the masks, the opacity hooks and the colour filter (whose
 * hue drift animates on the compositor); the breathing layers hold one blob
 * element per gradient (pulseBlobRules); the bloom is painted once.
 */
function generatePulseInnerVariantCSS(options: GenerateStylesOptions): string {
  const { colorVariant, staticColors, theme, tint } = options;
  const key = beamCssKey(options);

  const isDark = theme === 'dark';
  const { op, huePeriod } = pulseParams('pulse-inner', theme, PULSE_BASE_DURATION);
  const bloomBlur = 8;
  const motion = pulseMotion('pulse-inner', theme);

  // Ring, inner glow and bloom share ONE hue rotation so the wide glow and the
  // tight ring stay colour-synced. The bloom's blur sits on its paint child:
  // a filter animation that contains blur() cannot run on the compositor.
  const colorFilter = staticColors
    ? `filter: brightness(var(--beam-brightness, 1.3)) saturate(var(--beam-saturation, 1.2));`
    : `filter: hue-rotate(var(--beam-hue-base, 0deg)) brightness(var(--beam-brightness, 1.3)) saturate(var(--beam-saturation, 1.2));
  animation: beam-pulse-hue ${huePeriod}s linear infinite;`;

  const root = `[data-beam="${key}"]`;
  const ring = `${root} > [data-beam-layer="ring"]`;
  const inner = `${root} > [data-beam-layer="inner"]`;
  const bloom = `${root} > [data-beam-bloom]`;

  // Frozen at the breathing time-average (midpoint of the [1-op, 1] opacity range).
  const bloomGradients = pulseTableGradientsStatic(PULSE_INNER_BLOOM, colorVariant, 1 - op * 0.5, tint);

  return `
${root} {
  position: relative;
  border-radius: var(--beam-radius, 16px);
  overflow: hidden;
  isolation: isolate;
}

${root}[data-active] {
${pulseWrapperAnimation('beam-fade-in', 0.6)}
}

${root}[data-fading] {
${pulseWrapperAnimation('beam-fade-out', 0.5)}
}

${pulseLayerBaseCSS(root)}

${ring} {
  inset: 0;
  border-radius: var(--beam-radius, 16px);
  padding: var(--beam-border-width, 1px);
  clip-path: inset(0 round var(--beam-radius, 16px));
  overflow: hidden;
  ${PULSE_RING_MASK}
  z-index: 2;
  opacity: calc(var(--beam-opacity) * var(--beam-stroke-mul, 1) * var(--beam-stroke-opacity, 1) * var(--beam-strength, 1));
  ${colorFilter}
}

${inner} {
  inset: 0;
  border-radius: var(--beam-radius, 16px);
  clip-path: inset(0 round var(--beam-radius, 16px));
  overflow: hidden;
  -webkit-mask-image:
    linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
    linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
  -webkit-mask-composite: source-over;
  mask-image:
    linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
    linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
  mask-composite: add;
  z-index: 1;
  opacity: calc(var(--beam-opacity) * var(--beam-inner-mul, 1) * var(--beam-inner-opacity, 1) * var(--beam-strength, 1));
  ${colorFilter}
}

${motion.keyframes}

${pulseBlobRules([[ring, pulseRingBlobs(colorVariant, tint)], [inner, pulseInnerBlobs(colorVariant, isDark, tint)]], motion)}

${bloom} {
  display: none;
  position: absolute;
  inset: 0;
  border-radius: var(--beam-radius, 16px);
  clip-path: inset(0 round var(--beam-radius, 16px));
  ${PULSE_RING_MASK}
  padding: var(--beam-border-width, 1px);
  pointer-events: none;
  z-index: 3;
  will-change: opacity;
  opacity: 0;
}

${bloom} > [data-beam-paint] {
  border-radius: inherit;
  background: ${bloomGradients};
  filter: blur(${bloomBlur}px);
}

${root}[data-active] > [data-beam-bloom],
${root}[data-fading] > [data-beam-bloom] {
  display: block;
  opacity: calc(var(--beam-opacity) * var(--beam-bloom-mul, 1) * var(--beam-bloom-opacity, 1) * var(--beam-strength, 1));
  ${colorFilter}
}

`;
}

/**
 * Pulse Outside — outward-blooming breathing glow (port of v5 Card 5).
 * A crisp 1px colored stroke hugs the outer edge, while the colorful core and
 * the soft halo (bloom) radiate OUTWARD behind the element (z-index:-1), so the
 * glow spills outside and is never cropped.
 *
 * Layers: core `[data-beam-layer="core"]` (z -1), bloom `[data-beam-bloom]`
 * (z -1, above the core), stroke `[data-beam-layer="stroke"]` (z 2). Core and
 * stroke breathe through blob elements (pulseBlobRules); the core's blur sits
 * on its paint child so the container's hue animation stays on the compositor.
 *
 * Requires the wrapped child to be opaque so the inner part is covered and only
 * the outward halo shows.
 */
function generatePulseOuterVariantCSS(options: GenerateStylesOptions): string {
  const { colorVariant, staticColors, theme, tint } = options;
  const key = beamCssKey(options);

  const isDark = theme === 'dark';

  // A constant 1px hairline frames the element. It is painted on the inner 1px
  // ring of the border-box (same place a standard `inset 0 0 0 1px` component
  // border sits) so the beam hairline/stroke align with the wrapped element's
  // own hairline instead of floating 1px outside it.
  const hairRGB = isDark ? '70, 70, 70' : '0, 0, 0';
  const hairlineLine = `linear-gradient(rgba(${hairRGB}, var(--beam-hairline-o, 0)), rgba(${hairRGB}, var(--beam-hairline-o, 0)))`;

  const { op, huePeriod } = pulseParams('pulse-outside', theme, PULSE_BASE_DURATION);
  const motion = pulseMotion('pulse-outside', theme);

  // Theme-dependent outward-glow constants (ported from v5 c6 defaults).
  // Glow scale 0.95 x 0.9 is baked into the transforms below (same in both themes).
  const glowBlur = isDark ? 3 : 6;
  const bloomBlur = isDark ? 22.5 : 15;

  const strokeFilter = staticColors
    ? `filter: brightness(var(--beam-brightness, 1.3)) saturate(var(--beam-saturation, 1.2));`
    : `filter: hue-rotate(var(--beam-hue-base, 0deg)) brightness(var(--beam-brightness, 1.3)) saturate(var(--beam-saturation, 1.2));
  animation: beam-pulse-hue ${huePeriod}s linear infinite;`;
  // Core and halo share the SAME hue rotation as the stroke so the wide glow
  // and the tight glow stay in color sync (most visible on blue/green).
  const glowFilter = `brightness(var(--beam-glow-brightness, var(--beam-brightness, 1.3))) saturate(var(--beam-glow-saturate, var(--beam-saturation, 1.2)))`;
  const glowColorFilter = staticColors
    ? `filter: ${glowFilter};`
    : `filter: hue-rotate(var(--beam-hue-base, 0deg)) ${glowFilter};
  animation: beam-pulse-hue-glow ${huePeriod}s linear infinite;`;

  const root = `[data-beam="${key}"]`;
  const stroke = `${root} > [data-beam-layer="stroke"]`;
  const core = `${root} > [data-beam-layer="core"]`;
  const bloom = `${root} > [data-beam-bloom]`;

  const coreBlobs = pulseOuterCoreBlobs(colorVariant, tint);
  // Frozen at the breathing time-average (midpoint of the [1-op, 1] opacity range).
  const bloomGradients = pulseTableGradientsStatic(PULSE_OUTER_BLOOM, colorVariant, 1 - op * 0.5, tint);

  return `
${root} {
  position: relative;
  border-radius: var(--beam-radius, 16px);
  overflow: visible;
  isolation: isolate;
}

${root}[data-active] {
${pulseWrapperAnimation('beam-fade-in', 0.6)}
}

${root}[data-fading] {
${pulseWrapperAnimation('beam-fade-out', 0.5)}
}

/* Idle hairline — painted above the (opaque) child in the inner 1px edge ring so
   it overlaps a standard inset component border exactly. */
${root}::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: var(--beam-radius, 16px);
  padding: 1px;
  clip-path: inset(0 round var(--beam-radius, 16px));
  background: ${hairlineLine};
  ${PULSE_RING_MASK}
  pointer-events: none;
  z-index: 2;
}

/* While the beam shows, the stroke layer paints the hairline (under the
   stroke opacity) in this same ring. */
${root}[data-active]::after,
${root}[data-fading]::after {
  content: none;
}

${pulseLayerBaseCSS(root)}

${stroke} {
  inset: 0;
  border-radius: var(--beam-radius, 16px);
  padding: 1px;
  clip-path: inset(0 round var(--beam-radius, 16px));
  overflow: hidden;
  background: ${hairlineLine};
  ${PULSE_RING_MASK}
  z-index: 2;
  opacity: calc(var(--beam-opacity) * var(--beam-stroke-mul, 1) * var(--beam-stroke-opacity, 1) * var(--beam-strength, 1));
  ${strokeFilter}
}

${core} {
  inset: var(--beam-core-inset, -10px);
  z-index: -1;
  border-radius: calc(var(--beam-radius, 16px) - var(--beam-core-inset, -10px));
  transform: scale(var(--pulse-glow-shrink-x, 0.95), var(--pulse-glow-shrink-y, 0.9));
  opacity: calc(var(--beam-opacity) * var(--beam-inner-mul, 1) * var(--beam-inner-opacity, 1) * var(--beam-strength, 1));
  ${glowColorFilter}
}

${core} > [data-beam-paint] {
  border-radius: inherit;
  overflow: hidden;
  filter: blur(var(--beam-core-blur, ${glowBlur}px));
}

${motion.keyframes}

${pulseBlobRules([[stroke, coreBlobs], [core, coreBlobs]], motion)}

${bloom} {
  display: none;
  position: absolute;
  inset: var(--beam-bloom-inset, -30px);
  z-index: -1;
  border-radius: calc(var(--beam-radius, 16px) - var(--beam-bloom-inset, -30px));
  transform: scale(var(--pulse-glow-shrink-x, 0.95), var(--pulse-glow-shrink-y, 0.9));
  pointer-events: none;
  will-change: transform;
  opacity: 0;
}

${bloom} > [data-beam-paint] {
  border-radius: inherit;
  background: ${bloomGradients};
  filter: blur(var(--beam-bloom-blur, ${bloomBlur}px));
}

${root}[data-active] > [data-beam-bloom],
${root}[data-fading] > [data-beam-bloom] {
  display: block;
  opacity: calc(var(--beam-opacity) * var(--beam-bloom-mul, 1) * var(--beam-bloom-opacity, 1) * var(--beam-strength, 1));
  ${glowColorFilter}
}

`;
}

function generateLineVariantCSS(options: GenerateStylesOptions): string {
  const { colorVariant, tint, staticColors, theme } = options;
  const key = beamCssKey(options);

  const isDark = theme === 'dark';

  const hueShiftAnimation = staticColors
    ? ''
    : `animation: beam-hue-shift 12s ease-in-out infinite;`;

  const hueShiftBloomAnimation = staticColors
    ? ''
    : `animation: beam-hue-shift-bloom 8s ease-in-out infinite;`;
  
  const whiteHighlight = isDark
    ? `radial-gradient(
        ellipse calc(24px * var(--beam-w)) calc(28px * var(--beam-h)) at calc(var(--beam-x) * 100%) calc(100% + 2px),
        rgba(255, 255, 255, 0.38) 0%,
        rgba(255, 255, 255, 0.12) 30%,
        transparent 65%
      )`
    : `radial-gradient(
        ellipse calc(35px * var(--beam-w)) calc(28px * var(--beam-h)) at calc(var(--beam-x) * 100%) calc(100% + 2px),
        rgba(0, 0, 0, 0.6) 0%,
        rgba(0, 0, 0, 0.25) 35%,
        transparent 70%
      )`;

  const colorGradients = getLineColorGradients(colorVariant, isDark, tint);
  const innerGradients = getLineInnerGradients(colorVariant, tint);

  const bloomGradients = getLineBloomGradients(colorVariant, isDark, tint);
  const monoBloomBlur = colorVariant === 'mono' ? 'filter: blur(6px);' : '';

  return `
[data-beam="${key}"] {
  position: relative;
  border-radius: var(--beam-radius, 16px);
  overflow: hidden;
}

[data-beam="${key}"][data-active] {
  animation:
    beam-travel var(--beam-duration, 3.1s) linear infinite,
    beam-edge-fade var(--beam-duration, 3.1s) linear infinite,
    beam-breathe calc(var(--beam-duration, 3.1s) * 1.3) ease-in-out infinite,
    beam-spike calc(var(--beam-duration, 3.1s) * 1.33) ease-in-out infinite,
    beam-spike2 calc(var(--beam-duration, 3.1s) * 1.7) ease-in-out infinite,
    beam-fade-in 0.6s ease forwards;
}

[data-beam="${key}"][data-fading] {
  animation:
    beam-travel var(--beam-duration, 3.1s) linear infinite,
    beam-edge-fade var(--beam-duration, 3.1s) linear infinite,
    beam-breathe calc(var(--beam-duration, 3.1s) * 1.3) ease-in-out infinite,
    beam-spike calc(var(--beam-duration, 3.1s) * 1.33) ease-in-out infinite,
    beam-spike2 calc(var(--beam-duration, 3.1s) * 1.7) ease-in-out infinite,
    beam-fade-out 0.5s ease forwards;
}

[data-beam="${key}"][data-active]::after,
[data-beam="${key}"][data-fading]::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: var(--beam-inner-radius, 15px);
  padding: var(--beam-border-width, 1px);
  clip-path: inset(0 round var(--beam-radius, 16px));
  background: ${whiteHighlight}, ${colorGradients};
  -webkit-mask:
    radial-gradient(
      ellipse calc(78px * var(--beam-w)) calc(60px * var(--beam-h)) at calc(var(--beam-x) * 100%) 100%,
      white 0%, rgba(255, 255, 255, 0.5) 45%, transparent 100%
    ),
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: source-in, xor;
  mask:
    radial-gradient(
      ellipse calc(78px * var(--beam-w)) calc(60px * var(--beam-h)) at calc(var(--beam-x) * 100%) 100%,
      white 0%, rgba(255, 255, 255, 0.5) 45%, transparent 100%
    ),
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: intersect, exclude;
  pointer-events: none;
  z-index: 2;
  opacity: calc(var(--beam-opacity) * var(--beam-edge) * var(--beam-stroke-mul, 1) * var(--beam-stroke-opacity, 1) * var(--beam-strength, 1));
  ${hueShiftAnimation}
}

[data-beam="${key}"][data-active]::before,
[data-beam="${key}"][data-fading]::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: var(--beam-radius, 16px);
  background: ${innerGradients};
  box-shadow: inset 0 0 9px 1px var(--beam-inner-shadow, transparent);
  -webkit-mask-image:
    radial-gradient(
      ellipse calc(78px * var(--beam-w)) calc(60px * var(--beam-h)) at calc(var(--beam-x) * 100%) 100%,
      white 0%, rgba(255, 255, 255, 0.5) 45%, transparent 100%
    ),
    linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
    linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
  -webkit-mask-composite: source-in, source-over;
  mask-image:
    radial-gradient(
      ellipse calc(78px * var(--beam-w)) calc(60px * var(--beam-h)) at calc(var(--beam-x) * 100%) 100%,
      white 0%, rgba(255, 255, 255, 0.5) 45%, transparent 100%
    ),
    linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
    linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
  mask-composite: intersect, add;
  pointer-events: none;
  z-index: 1;
  opacity: calc(var(--beam-opacity) * var(--beam-edge) * var(--beam-inner-mul, 1) * var(--beam-inner-opacity, 1) * var(--beam-strength, 1));
  clip-path: inset(0 round var(--beam-radius, 16px));
  ${hueShiftAnimation}
}

[data-beam="${key}"] [data-beam-bloom] {
  display: none;
  position: absolute;
  inset: 0;
  border-radius: var(--beam-inner-radius, 15px);
  clip-path: inset(0 round var(--beam-radius, 16px));
  padding: 0;
  -webkit-mask: radial-gradient(
    ellipse calc(84px * var(--beam-w)) calc(110px * var(--beam-h)) at calc(var(--beam-x) * 100%) 100%,
    white 0%, rgba(255, 255, 255, 0.5) 35%, transparent 100%
  );
  -webkit-mask-composite: source-over;
  mask: radial-gradient(
    ellipse calc(84px * var(--beam-w)) calc(110px * var(--beam-h)) at calc(var(--beam-x) * 100%) 100%,
    white 0%, rgba(255, 255, 255, 0.5) 35%, transparent 100%
  );
  mask-composite: add;
  background: ${bloomGradients};
  ${monoBloomBlur}
  pointer-events: none;
  z-index: 3;
  opacity: 0;
}

[data-beam="${key}"][data-active] [data-beam-bloom],
[data-beam="${key}"][data-fading] [data-beam-bloom] {
  display: block;
  opacity: calc(var(--beam-opacity) * var(--beam-edge) * var(--beam-bloom-mul, 1) * var(--beam-bloom-opacity, 1) * var(--beam-strength, 1));
  ${hueShiftBloomAnimation}
}

`;
}
