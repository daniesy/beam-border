import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BorderBeam from '../src/components/BorderBeam.vue'

const headStyleElements = () =>
  Array.from(document.head.querySelectorAll<HTMLStyleElement>('style[data-beam-style]'))

const headStylesText = () => headStyleElements().map((el) => el.textContent).join('\n')

describe('BorderBeam', () => {
  it('renders slotted content with Vue fallthrough attributes and default beam state', () => {
    const wrapper = mount(BorderBeam, {
      attrs: {
        id: 'beam-card',
        class: 'custom-wrapper',
      },
      slots: {
        default: '<button class="child">Pay now</button>',
      },
    })

    const root = wrapper.get('[data-beam]')

    expect(root.attributes('id')).toBe('beam-card')
    expect(root.classes()).toContain('custom-wrapper')
    expect(root.attributes('data-active')).toBe('')
    expect(root.attributes('data-fading')).toBeUndefined()
    expect(root.get('.child').text()).toBe('Pay now')

    // No inline <style> element in the component output — styles are shared
    // sheets injected into document.head instead.
    expect(wrapper.find('style').exists()).toBe(false)
    expect(root.attributes('data-beam')).toBe('md_dark_colorful_anim')
    expect(headStylesText()).toContain('[data-beam="md_dark_colorful_anim"]')

    wrapper.unmount()
  })

  it('shares one stylesheet between instances with the same configuration', () => {
    const first = mount(BorderBeam, { slots: { default: '<div>A</div>' } })
    const second = mount(BorderBeam, { slots: { default: '<div>B</div>' } })

    const matching = headStyleElements().filter(
      (el) => el.dataset.beamStyle === 'md_dark_colorful_anim',
    )
    expect(matching).toHaveLength(1)

    first.unmount()
    expect(
      headStyleElements().some((el) => el.dataset.beamStyle === 'md_dark_colorful_anim'),
    ).toBe(true)

    second.unmount()
    expect(
      headStyleElements().some((el) => el.dataset.beamStyle === 'md_dark_colorful_anim'),
    ).toBe(false)
  })

  it('resolves mono line mode with clamped hue, strength, and line duration', () => {
    const wrapper = mount(BorderBeam, {
      props: {
        size: 'line',
        colorVariant: 'mono',
        hueRange: 40,
        strength: 2,
      },
      slots: {
        default: '<div class="child">Search</div>',
      },
    })

    const root = wrapper.get('[data-beam]')
    const rootStyle = root.attributes('style')

    expect(rootStyle).toContain('--beam-strength: 1.75')
    expect(rootStyle).toContain('--beam-duration: 3.1s')
    expect(rootStyle).toContain('--beam-hue-range: 13deg')
    // mono forces static colors, so the sheet carries no hue-shift animation
    expect(root.attributes('data-beam')).toBe('line_dark_mono_static')
    const lineSheet = headStyleElements().find((el) => el.dataset.beamStyle === 'line_dark_mono_static')
    expect(lineSheet?.textContent).toContain('beam-travel var(--beam-duration, 3.1s) linear infinite')
    expect(lineSheet?.textContent).not.toContain('beam-hue-shift 12s')

    wrapper.unmount()
  })

  it('emits deactivate when a fade-out animation completes', async () => {
    const wrapper = mount(BorderBeam, {
      props: {
        active: true,
      },
      slots: {
        default: '<div>Card</div>',
      },
    })

    await wrapper.setProps({ active: false })
    expect(wrapper.get('[data-beam]').attributes('data-fading')).toBe('')

    await wrapper.get('[data-beam]').trigger('animationend', {
      animationName: 'beam-fade-out',
    })

    expect(wrapper.emitted('deactivate')).toHaveLength(1)
    expect(wrapper.get('[data-beam]').attributes('data-active')).toBeUndefined()
    expect(wrapper.get('[data-beam]').attributes('data-fading')).toBeUndefined()

    wrapper.unmount()
  })

  it('supports a custom tint prop', () => {
    const wrapper = mount(BorderBeam, {
      props: {
        tint: '#ec4899',
        size: 'pulse-outside',
      },
      slots: {
        default: '<div>Card</div>',
      },
    })

    const key = wrapper.get('[data-beam]').attributes('data-beam')!
    expect(key).toContain('tint-')
    const sheet = headStyleElements().find((el) => el.dataset.beamStyle === key)
    expect(sheet?.textContent).toContain('#ec4899')

    wrapper.unmount()
  })

  it('does not render removed spectacular aura markup', () => {
    const wrapper = mount(BorderBeam, {
      props: {
        spectacular: true,
      },
      slots: {
        default: '<div>Card</div>',
      },
    })

    expect(wrapper.get('[data-beam]').attributes('data-spectacular')).toBeUndefined()
    expect(wrapper.find('[data-beam-aura]').exists()).toBe(false)

    wrapper.unmount()
  })
})
