import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import BorderBeam from '../src/components/BorderBeam.vue'
import { parseCornerShape } from '../src/composables/useDetectedCornerShape'

describe('parseCornerShape', () => {
  it('reads Chrome\'s computed serialisation of squircle', () => {
    // Chrome computes `corner-shape: squircle` to `superellipse(2)`.
    expect(parseCornerShape('superellipse(2)')).toBe('squircle')
    expect(parseCornerShape('superellipse(2.0)')).toBe('squircle')
    expect(parseCornerShape(' superellipse( 2 ) ')).toBe('squircle')
    expect(parseCornerShape('superellipse(2) superellipse(2) round round')).toBe('squircle')
    expect(parseCornerShape('squircle')).toBe('squircle')
  })

  it('treats every other supported shape as round and unsupported as unknown', () => {
    expect(parseCornerShape('round')).toBe('round')
    expect(parseCornerShape('superellipse(1)')).toBe('round')
    expect(parseCornerShape('superellipse(4)')).toBe('round')
    expect(parseCornerShape('superellipse(infinity)')).toBe('round')
    expect(parseCornerShape('bevel')).toBe('round')
    expect(parseCornerShape('')).toBeNull()
  })
})

describe('useDetectedCornerShape (via BorderBeam)', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  const mountWith = async (computed: Record<string, string>) => {
    const real = window.getComputedStyle.bind(window)
    vi.spyOn(window, 'getComputedStyle').mockImplementation((el: Element, pseudo?: string | null) => {
      const style = real(el, pseudo)
      if (!(el as HTMLElement).classList?.contains('child')) return style
      return new Proxy(style, {
        get(target, prop, receiver) {
          if (prop === 'getPropertyValue') {
            return (name: string) => computed[name] ?? target.getPropertyValue(name)
          }
          if (prop === 'borderTopLeftRadius') return '12px'
          const value = Reflect.get(target, prop, receiver)
          return typeof value === 'function' ? value.bind(target) : value
        },
      })
    })
    const wrapper = mount(BorderBeam, {
      props: { size: 'pulse-inner' },
      slots: { default: '<button class="child">Go</button>' },
    })
    await flushPromises()
    return wrapper
  }

  it('detects a squircle child from the superellipse(2) shorthand', async () => {
    const wrapper = await mountWith({ 'corner-shape': 'superellipse(2)' })
    expect(wrapper.get('[data-beam]').attributes('data-beam')).toBe('pulse-inner_dark_colorful_anim_squircle')
    wrapper.unmount()
  })

  it('falls back to the per-corner longhand when the shorthand is empty', async () => {
    const wrapper = await mountWith({ 'corner-shape': '', 'corner-top-left-shape': 'superellipse(2)' })
    expect(wrapper.get('[data-beam]').attributes('data-beam')).toBe('pulse-inner_dark_colorful_anim_squircle')
    wrapper.unmount()
  })

  it('keeps round geometry for round or unsupported children', async () => {
    const round = await mountWith({ 'corner-shape': 'round' })
    expect(round.get('[data-beam]').attributes('data-beam')).toBe('pulse-inner_dark_colorful_anim')
    round.unmount()

    const unsupported = await mountWith({})
    expect(unsupported.get('[data-beam]').attributes('data-beam')).toBe('pulse-inner_dark_colorful_anim')
    unsupported.unmount()
  })
})
