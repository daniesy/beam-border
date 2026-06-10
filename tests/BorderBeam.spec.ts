import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BorderBeam from '../src/components/BorderBeam.vue'

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
    expect(wrapper.get('style').text()).toContain('[data-beam=')
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

    const styleText = wrapper.get('style').text()
    const root = wrapper.get('[data-beam]')

    expect(root.attributes('style')).toContain('--beam-strength: 1.75')
    expect(styleText).toContain('3.1s linear infinite')
    expect(styleText).not.toContain('hue-rotate(-13deg)')
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
      animationName: 'beam-fade-out-test',
    })

    expect(wrapper.emitted('deactivate')).toHaveLength(1)
    expect(wrapper.get('[data-beam]').attributes('data-active')).toBeUndefined()
    expect(wrapper.get('[data-beam]').attributes('data-fading')).toBeUndefined()
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

    expect(wrapper.get('style').text()).toContain('#ec4899')
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
  })
})
