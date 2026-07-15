import { computed, type ComputedRef, type Ref } from 'vue'
import { beamCssKey, generateBeamCSS, getPulseDriverConfig, sizePresets, sizeThemePresets } from '../styles'
import type { BeamStyle, BorderBeamProps, BorderBeamTheme } from '../types'

interface UseBeamStylesOptions {
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

  // The generated CSS depends only on these inputs, so all instances sharing a
  // key share one injected stylesheet (see useBeamStylesheet). The key is also
  // the wrapper's data-beam attribute value, which the CSS selectors target.
  const cssKey = computed(() =>
    beamCssKey({
      size: size.value,
      colorVariant: colorVariant.value,
      staticColors: finalStaticColors.value,
      theme: options.resolvedTheme.value,
      tint: tint.value,
    }),
  )

  const cssStyles = computed(() =>
    generateBeamCSS({
      size: size.value,
      colorVariant: colorVariant.value,
      staticColors: finalStaticColors.value,
      theme: options.resolvedTheme.value,
      tint: tint.value,
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
        )
      : null,
  )

  // Everything per-instance flows into the shared CSS through these custom
  // properties, set inline on the wrapper element.
  const wrapperStyle = computed<BeamStyle>(() => {
    // The line variant renders mono at full opacity; the other variants halve it.
    const monoMul = colorVariant.value === 'mono' && size.value !== 'line' ? 0.5 : 1
    const borderWidth = sizeConfig.value.borderWidth
    const theme = themeConfig.value

    return {
      '--beam-strength': toVisualStrength(strength.value),
      '--beam-radius': `${finalBorderRadius.value}px`,
      '--beam-inner-radius': `${Math.max(0, finalBorderRadius.value - borderWidth)}px`,
      '--beam-border-width': `${borderWidth}px`,
      '--beam-duration': `${finalDuration.value}s`,
      '--beam-stroke-mul': (theme.strokeOpacity * monoMul).toFixed(2),
      '--beam-inner-mul': (theme.innerOpacity * monoMul).toFixed(2),
      '--beam-bloom-mul': (theme.bloomOpacity * monoMul).toFixed(2),
      '--beam-inner-shadow': theme.innerShadow,
      '--beam-brightness': finalBrightness.value.toFixed(2),
      '--beam-saturation': finalSaturation.value.toFixed(2),
      '--beam-hue-range': `${finalHueRange.value}deg`,
      ...(size.value === 'pulse-outside'
        ? {
            '--pulse-glow-sx': options.pulseGlowScale.value.x,
            '--pulse-glow-sy': options.pulseGlowScale.value.y,
            '--beam-hairline-o': (theme.hairlineOpacity ?? 0).toFixed(2),
          }
        : {}),
    }
  })

  return {
    isPulse,
    finalBorderRadius,
    finalDuration,
    finalSaturation,
    finalBrightness,
    finalHueRange,
    finalStaticColors,
    cssKey,
    cssStyles,
    driverConfig,
    wrapperStyle,
  }
}
