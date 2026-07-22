import type { CSSProperties } from 'vue'

/**
 * Size/type preset for the border beam effect.
 */
export type BorderBeamSize = 'sm' | 'md' | 'line' | 'pulse-outside' | 'pulse-inner'

/**
 * Theme mode for adapting beam colors to background.
 */
export type BorderBeamTheme = 'dark' | 'light' | 'auto'

/**
 * Color variant for the beam effect.
 */
export type BorderBeamColorVariant = 'colorful' | 'mono' | 'ocean' | 'sunset'

/**
 * Corner geometry for the beam layers. `squircle` follows the CSS
 * `corner-shape: squircle` superellipse (Chromium's experimental property);
 * browsers without support fall back to the rounded-rect rendering.
 */
export type BorderBeamCornerShape = 'round' | 'squircle'

/**
 * Configuration for a size preset.
 */
export interface SizeConfig {
  borderRadius: number
  borderWidth: number
  width?: number
  height?: number
}

/**
 * Theme color configuration.
 */
export interface ThemeColors {
  strokeOpacity: number
  innerOpacity: number
  bloomOpacity: number
  innerShadow: string
  saturation: number
  /** Optional per-type default brightness. Falls back to 1.3. */
  brightness?: number
  /** Optional opacity of the 1px hairline border that frames the element. */
  hairlineOpacity?: number
}

export interface BorderBeamProps {
  /**
   * Size/type preset.
   * @default 'md'
   */
  size?: BorderBeamSize
  /**
   * Color variant for the beam effect.
   * @default 'colorful'
   */
  colorVariant?: BorderBeamColorVariant
  /**
   * Theme mode; `auto` follows prefers-color-scheme.
   * @default 'dark'
   */
  theme?: BorderBeamTheme
  /**
   * Disable the hue-shift animation for static colors.
   * @default false
   */
  staticColors?: boolean
  /**
   * Rotation/travel duration in seconds.
   */
  duration?: number
  /**
   * Whether the animation is active.
   * @default true
   */
  active?: boolean
  /**
   * Custom border radius in pixels. When omitted, the wrapper detects the
   * first slotted element's border radius and falls back to the size preset.
   */
  borderRadius?: number
  /**
   * Corner geometry for the beam layers. When omitted, the wrapper detects
   * the first slotted element's `corner-shape` so squircle children get a
   * squircle beam automatically.
   * @default detected, falling back to 'round'
   */
  cornerShape?: BorderBeamCornerShape
  /**
   * Brightness multiplier for the glow effect.
   */
  brightness?: number
  /**
   * Saturation multiplier for the glow effect.
   */
  saturation?: number
  /**
   * Hue rotation range in degrees.
   * @default 30
   */
  hueRange?: number
  /**
   * Custom beam color. When provided, the selected size/type keeps its motion
   * geometry but renders a single tinted beam instead of a preset palette.
   */
  tint?: string
  /**
   * Overall strength/opacity of the effect, clamped to 0..1.
   * The visual multiplier is amplified internally so `1` renders strongly.
   * @default 1
   */
  strength?: number
}

export type BeamStyle = CSSProperties & Record<`--${string}`, string | number>
