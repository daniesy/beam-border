import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useSystemTheme } from '../src/composables/useSystemTheme'

describe('useSystemTheme', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('initializes from prefers-color-scheme on the client', () => {
    vi.stubGlobal('window', {
      matchMedia: vi.fn().mockReturnValue({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    })

    const ThemeProbe = defineComponent({
      setup() {
        const theme = useSystemTheme()
        return { theme }
      },
      template: '<span>{{ theme }}</span>',
    })

    const wrapper = mount(ThemeProbe)

    expect(wrapper.text()).toBe('light')
  })
})
