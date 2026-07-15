import { describe, expect, it } from 'vitest'
import { computed, shallowRef } from 'vue'
import { useBeamStyles } from '../src/composables/useBeamStyles'

describe('useBeamStyles', () => {
  it('derives React-compatible defaults and generated CSS inputs', () => {
    const props = {
      size: 'pulse-outside',
      colorVariant: 'colorful',
      theme: 'auto',
      active: true,
      staticColors: false,
      hueRange: 45,
      strength: 0.7,
    } as const

    const detectedRadius = shallowRef(21)
    const resolvedTheme = computed(() => 'light' as const)
    const pulseGlowScale = computed(() => ({ x: 1.25, y: 0.75 }))

    const beam = useBeamStyles({
      props,
      detectedRadius,
      resolvedTheme,
      pulseGlowScale,
    })

    expect(beam.isPulse.value).toBe(true)
    expect(beam.finalBorderRadius.value).toBe(21)
    expect(beam.finalDuration.value).toBe(2.3)
    expect(beam.finalBrightness.value).toBe(1.7)
    expect(beam.finalStaticColors.value).toBe(false)
    expect(beam.wrapperStyle.value).toMatchObject({
      '--beam-strength': 1.225,
      '--beam-radius': '21px',
      '--beam-duration': '2.3s',
      '--beam-hue-range': '45deg',
      '--beam-brightness': '1.70',
      '--pulse-glow-sx': 1.25,
      '--pulse-glow-sy': 0.75,
    })
    expect(beam.cssKey.value).toBe('pulse-outside_light_colorful_anim')
    expect(beam.cssStyles.value).toContain('[data-beam="pulse-outside_light_colorful_anim"]')
  })

  it('shares one stylesheet key and CSS between same-config instances', () => {
    const detectedRadius = shallowRef(null)
    const resolvedTheme = computed(() => 'dark' as const)
    const pulseGlowScale = computed(() => ({ x: 1, y: 1 }))

    const make = (strength: number) =>
      useBeamStyles({
        props: { size: 'md', colorVariant: 'sunset', theme: 'dark', strength } as const,
        detectedRadius,
        resolvedTheme,
        pulseGlowScale,
      })

    const a = make(0.4)
    const b = make(1)

    // Per-instance knobs differ only in inline vars; the generated CSS is identical.
    expect(a.cssKey.value).toBe(b.cssKey.value)
    expect(a.cssStyles.value).toBe(b.cssStyles.value)
    expect(a.wrapperStyle.value['--beam-strength']).not.toBe(b.wrapperStyle.value['--beam-strength'])
  })

  it('passes custom tint through generated beam CSS', () => {
    const props = {
      size: 'pulse-inner',
      colorVariant: 'colorful',
      theme: 'dark',
      tint: '#22c55e',
    } as const

    const detectedRadius = shallowRef(null)
    const resolvedTheme = computed(() => 'dark' as const)
    const pulseGlowScale = computed(() => ({ x: 1, y: 1 }))

    const beam = useBeamStyles({
      props,
      detectedRadius,
      resolvedTheme,
      pulseGlowScale,
    })

    expect(beam.cssStyles.value).toContain('#22c55e')
    expect(beam.cssKey.value).toContain('tint-')
    expect(beam.finalStaticColors.value).toBe(true)
  })

  it('exposes the upstream v1.3 pulse tuning hooks', () => {
    const props = {
      size: 'pulse-outside',
      colorVariant: 'colorful',
      theme: 'dark',
      staticColors: false,
    } as const
    const beam = useBeamStyles({
      props,
      detectedRadius: shallowRef(null),
      resolvedTheme: computed(() => 'dark' as const),
      pulseGlowScale: computed(() => ({ x: 1, y: 1 })),
    })

    expect(beam.cssStyles.value).toContain('var(--pulse-glow-boost, 1)')
    expect(beam.cssStyles.value).toContain('var(--beam-hue-base, 0deg)')
    expect(beam.cssStyles.value).toContain('var(--beam-stroke-opacity, 1)')
    expect(beam.cssStyles.value).toContain('var(--beam-inner-opacity, 1)')
    expect(beam.cssStyles.value).toContain('var(--beam-bloom-opacity, 1)')
    expect(beam.cssStyles.value).toContain('var(--beam-core-blur, 3px)')
    expect(beam.cssStyles.value).toContain('var(--beam-bloom-blur, 22.5px)')
    expect(beam.cssStyles.value).toContain('var(--beam-glow-brightness, var(--beam-brightness, 1.3))')
    expect(beam.cssStyles.value).toContain('var(--beam-glow-saturate, var(--beam-saturation, 1.2))')
    // brightness/saturation reach the CSS through inline wrapper vars now
    expect(beam.wrapperStyle.value['--beam-brightness']).toBe('1.90')
    expect(beam.wrapperStyle.value['--beam-saturation']).toBe('1.20')
  })

  it('does not generate removed spectacular aura CSS', () => {
    const baseProps = {
      size: 'md',
      colorVariant: 'sunset',
      theme: 'dark',
    } as const

    const detectedRadius = shallowRef(null)
    const resolvedTheme = computed(() => 'dark' as const)
    const pulseGlowScale = computed(() => ({ x: 1, y: 1 }))
    const legacyProps = { ...baseProps, spectacular: true } as unknown as typeof baseProps

    const beam = useBeamStyles({
      props: legacyProps,
      detectedRadius,
      resolvedTheme,
      pulseGlowScale,
    })

    expect(beam.cssStyles.value).not.toContain('data-beam-aura')
    expect(beam.cssStyles.value).not.toContain('beam-aura-drift')
  })
})
