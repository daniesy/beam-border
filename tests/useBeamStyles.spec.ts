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
      id: 'beam-test',
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
      '--pulse-glow-sx': 1.25,
      '--pulse-glow-sy': 0.75,
    })
    expect(beam.cssStyles.value).toContain('[data-beam="beam-test"]')
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
      id: 'beam-tint',
      props,
      detectedRadius,
      resolvedTheme,
      pulseGlowScale,
    })

    expect(beam.cssStyles.value).toContain('#22c55e')
    expect(beam.finalStaticColors.value).toBe(true)
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
      id: 'beam-spectacular',
      props: legacyProps,
      detectedRadius,
      resolvedTheme,
      pulseGlowScale,
    })

    expect(beam.cssStyles.value).not.toContain('data-beam-aura')
    expect(beam.cssStyles.value).not.toContain('beam-aura-drift-beam-spectacular')
  })
})
