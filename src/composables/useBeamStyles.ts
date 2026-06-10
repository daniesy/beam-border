import { computed, type ComputedRef, type Ref } from 'vue'
import { generateBeamCSS, getPulseDriverConfig, sizePresets, sizeThemePresets } from '../styles'
import type { BeamStyle, BorderBeamProps, BorderBeamTheme } from '../types'

interface UseBeamStylesOptions {
  id: string
  props: Readonly<BorderBeamProps>
  detectedRadius: Ref<number | null>
  resolvedTheme: ComputedRef<Exclude<BorderBeamTheme, 'auto'>>
  pulseGlowScale: ComputedRef<{ x: number; y: number }>
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))
const MAX_VISUAL_STRENGTH = 1.75

const toVisualStrength = (value: number) => Number((clamp(value, 0, 1) * MAX_VISUAL_STRENGTH).toFixed(3))

export function useBeamStyles(options: UseBeamStylesOptions) {
  const size = computed(() => options.props.size ?? 'md')
  const colorVariant = computed(() => options.props.colorVariant ?? 'colorful')
  const staticColors = computed(() => options.props.staticColors ?? false)
  const tint = computed(() => options.props.tint)
  const hueRange = computed(() => options.props.hueRange ?? 30)
  const strength = computed(() => options.props.strength ?? 1)
  const isPulse = computed(() => size.value === 'pulse-inner' || size.value === 'pulse-outside')
  const sizeConfig = computed(() => sizePresets[size.value])
  const themeConfig = computed(() => sizeThemePresets[size.value][options.resolvedTheme.value])
  const finalBorderRadius = computed(
    () => options.props.borderRadius ?? options.detectedRadius.value ?? sizeConfig.value.borderRadius,
  )
  const finalDuration = computed(() => options.props.duration ?? (size.value === 'line' ? 3.1 : isPulse.value ? 2.3 : 1.96))
  const finalSaturation = computed(() => options.props.saturation ?? themeConfig.value.saturation)
  const finalBrightness = computed(() => options.props.brightness ?? themeConfig.value.brightness ?? 1.3)
  const finalHueRange = computed(() => (size.value === 'line' ? Math.min(hueRange.value, 13) : hueRange.value))
  const finalStaticColors = computed(() => (tint.value || colorVariant.value === 'mono' ? true : staticColors.value))

  const cssStyles = computed(() =>
    generateBeamCSS({
      id: options.id,
      borderRadius: finalBorderRadius.value,
      borderWidth: sizeConfig.value.borderWidth,
      duration: finalDuration.value,
      strokeOpacity: themeConfig.value.strokeOpacity,
      innerOpacity: themeConfig.value.innerOpacity,
      bloomOpacity: themeConfig.value.bloomOpacity,
      innerShadow: themeConfig.value.innerShadow,
      size: size.value,
      colorVariant: colorVariant.value,
      staticColors: finalStaticColors.value,
      brightness: finalBrightness.value,
      saturation: finalSaturation.value,
      hueRange: finalHueRange.value,
      theme: options.resolvedTheme.value,
      tint: tint.value,
      hairlineOpacity: themeConfig.value.hairlineOpacity,
    }),
  )

  const driverConfig = computed(() =>
    isPulse.value
      ? getPulseDriverConfig(
          size.value,
          options.resolvedTheme.value,
          finalDuration.value,
          finalHueRange.value,
          finalStaticColors.value,
          options.id,
        )
      : null,
  )

  const wrapperStyle = computed<BeamStyle>(() => ({
    '--beam-strength': toVisualStrength(strength.value),
    ...(size.value === 'pulse-outside'
      ? {
          '--pulse-glow-sx': options.pulseGlowScale.value.x,
          '--pulse-glow-sy': options.pulseGlowScale.value.y,
        }
      : {}),
  }))

  return {
    isPulse,
    finalBorderRadius,
    finalDuration,
    finalSaturation,
    finalBrightness,
    finalHueRange,
    finalStaticColors,
    cssStyles,
    driverConfig,
    wrapperStyle,
  }
}
