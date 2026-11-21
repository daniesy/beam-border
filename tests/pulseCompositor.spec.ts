import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import BorderBeam from '../src/components/BorderBeam.vue'
import { BEAM_BASE_CSS, generateBeamCSS, pulseLayerSpecs } from '../src/styles'
import type { GenerateStylesOptions } from '../src/styles'

type PulseSize = 'pulse-inner' | 'pulse-outside'

const PULSE_SIZES: PulseSize[] = ['pulse-inner', 'pulse-outside']

// Every configuration axis that changes the generated pulse CSS.
function* pulseConfigs(): Generator<GenerateStylesOptions> {
  for (const size of PULSE_SIZES)
    for (const theme of ['dark', 'light'] as const)
      for (const colorVariant of ['colorful', 'mono', 'ocean', 'sunset'] as const)
        for (const staticColors of [false, true])
          for (const tint of [undefined, '#22c55e'])
            for (const cornerShape of ['round', 'squircle'] as const)
              yield { size, theme, colorVariant, staticColors, tint, cornerShape }
}

const label = (o: GenerateStylesOptions) =>
  `${o.size}/${o.theme}/${o.colorVariant}/${o.staticColors ? 'static' : 'anim'}/${o.tint ?? 'no-tint'}/${o.cornerShape}`

/** Every `prop: value;` declaration in a CSS string (values may span lines). */
function declarations(css: string, prop: string): string[] {
  const out: string[] = []
  const re = new RegExp(String.raw`(?:^|[\s{;])${prop}\s*:\s*([^;{}]+);`, 'g')
  for (const m of css.matchAll(re)) out.push(m[1].trim())
  return out
}

/** `@keyframes name { ... }` bodies, keyed by name. */
function keyframes(css: string): Map<string, string> {
  const out = new Map<string, string>()
  const re = /@keyframes\s+([\w-]+)\s*\{/g
  for (const m of css.matchAll(re)) {
    let depth = 1
    let i = m.index! + m[0].length
    const start = i
    while (depth > 0 && i < css.length) {
      if (css[i] === '{') depth++
      else if (css[i] === '}') depth--
      i++
    }
    out.set(m[1], css.slice(start, i - 1))
  }
  return out
}

/** Rule blocks (`selector { body }`) outside of @keyframes / @media wrappers. */
function rules(css: string): { selector: string; body: string }[] {
  const flat = css.replace(/@keyframes\s+[\w-]+\s*\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g, '')
  const out: { selector: string; body: string }[] = []
  for (const m of flat.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    out.push({ selector: m[1].trim(), body: m[2] })
  }
  return out
}

const varNames = (value: string) => [...value.matchAll(/var\((--[\w-]+)/g)].map((m) => m[1])

// Custom properties a painted background may reference: they only change on
// resize / re-configuration, never per frame.
const STATIC_BACKGROUND_VARS = /^--(?:pulse-glow-(?:sx|sy|boost)|beam-color-[a-z]+|beam-hairline-o)$/

describe('pulse variants run on the compositor', () => {
  it('no longer reference the JS-driven breathing custom properties anywhere', () => {
    for (const options of pulseConfigs()) {
      const css = generateBeamCSS(options)
      expect(css, label(options)).not.toMatch(/--beam-(?:bw|bh|bx|by)\d/)
      expect(css, label(options)).not.toMatch(/--beam-bgh\b/)
      expect(css, label(options)).not.toMatch(/--beam-bop-/)
      // `--beam-hue-base` / `--beam-hue-range` are static hooks; the animated
      // `--beam-hue` is gone.
      expect(css, label(options)).not.toMatch(/--beam-hue(?![\w-])/)
    }
    expect(BEAM_BASE_CSS).not.toMatch(/@property --beam-(?:bw|bh|bx|by|bgh|bop|hue\b)/)
  })

  it('paints every gradient layer statically (backgrounds hold no per-frame values)', () => {
    for (const options of pulseConfigs()) {
      const css = generateBeamCSS(options)
      const backgrounds = [...declarations(css, 'background'), ...declarations(css, 'background-image')]
      expect(backgrounds.length, label(options)).toBeGreaterThan(0)
      for (const value of backgrounds) {
        for (const name of varNames(value)) {
          expect(name, `${label(options)}: ${value.slice(0, 80)}`).toMatch(STATIC_BACKGROUND_VARS)
        }
      }
    }
  })

  it('animates only compositor properties (opacity / transform family / colour filters)', () => {
    for (const options of pulseConfigs()) {
      const sheet = generateBeamCSS(options)
      const all = new Map([...keyframes(BEAM_BASE_CSS), ...keyframes(sheet)])
      const used = new Set<string>()
      for (const value of [...declarations(sheet, 'animation'), ...declarations(sheet, 'animation-name')]) {
        // keyframe names are the `beam-…` idents (not the `--beam-…` vars)
        for (const m of value.matchAll(/(?<![\w-])(beam-[\w-]+)/g)) used.add(m[1])
      }
      // Only the wrapper fade still animates a custom property (one-shot).
      used.delete('beam-fade-in')
      used.delete('beam-fade-out')
      expect(used.size, label(options)).toBeGreaterThan(0)
      for (const name of used) {
        const body = all.get(name)
        expect(body, `${label(options)}: @keyframes ${name} missing`).toBeDefined()
        const props = [...body!.matchAll(/([\w-]+)\s*:/g)].map((m) => m[1])
        for (const prop of props) {
          expect(['opacity', 'translate', 'scale', 'transform', 'filter'], `${name}: ${prop}`).toContain(prop)
        }
        // Pixel-moving filters (blur) keep a filter animation off the compositor.
        expect(body, name).not.toMatch(/blur\(|drop-shadow\(/)
      }
    }
  })

  it('breathes each quadrant with an opacity animation that matches the old oscillator range', () => {
    const css = generateBeamCSS({ size: 'pulse-inner', theme: 'dark', colorVariant: 'colorful', staticColors: false })
    const opacityFrames = [...keyframes(css).entries()].filter(([, body]) => /opacity\s*:/.test(body))
    // The four quadrants share one range, 1 - op (0.52 for dark pulse-inner) -> 1 ...
    expect(opacityFrames).toHaveLength(1)
    const [name, body] = opacityFrames[0]
    expect(body).toMatch(/from\s*\{\s*opacity:\s*0\.52;\s*\}/)
    expect(body).toMatch(/to\s*\{\s*opacity:\s*1;\s*\}/)
    // ... and run with four different periods / phase offsets (bs, 1.32 bs, 0.84 bs, 1.58 bs).
    const timing = new RegExp(
      `${name} (calc\\(var\\(--beam-duration, 2\\.3s\\) \\* [\\d.]+\\)) cubic-bezier\\(0\\.37, 0, 0\\.63, 1\\) (0s|calc\\(var\\(--beam-duration, 2\\.3s\\) \\* -[\\d.]+\\)) infinite alternate`,
      'g',
    )
    const timings = new Set([...declarations(css, 'animation').join(',').matchAll(timing)].map((m) => `${m[1]} ${m[2]}`))
    expect(timings.size).toBe(4)
    // tl: half of bs = 1.9 s at the 2.3 s base duration -> 0.95 / 2.3
    expect(timings).toContain('calc(var(--beam-duration, 2.3s) * 0.413) 0s')
  })

  it('drifts and resizes the blobs with translate/scale keyframes instead of gradient sizes', () => {
    const css = generateBeamCSS({ size: 'pulse-outside', theme: 'dark', colorVariant: 'colorful', staticColors: false })
    const bodies = [...keyframes(css).values()].join('\n')
    expect(bodies).toMatch(/translate:\s*-14px 7\.7px/) // region 1 drift start (dr = 14, dark)
    expect(bodies).toMatch(/scale:\s*0\.72 1;/) // region 1 width start (1 - sp)
    expect(bodies).toMatch(/scale:\s*1 0\.84;/) // global height start (1 - gh)
    expect(bodies).toMatch(/transform:\s*scaleY\(/) // per-region height
  })

  it('rotates the hue with a continuous filter animation unless colours are static', () => {
    for (const size of PULSE_SIZES) {
      const animated = generateBeamCSS({ size, theme: 'dark', colorVariant: 'colorful', staticColors: false })
      const period = size === 'pulse-inner' ? 16 : 14
      expect(animated).toContain(`animation: beam-pulse-hue ${period}s linear infinite;`)
      const still = generateBeamCSS({ size, theme: 'dark', colorVariant: 'colorful', staticColors: true })
      expect(still).not.toContain('beam-pulse-hue')
      expect(still).not.toContain('hue-rotate')
    }
    const hue = keyframes(BEAM_BASE_CSS).get('beam-pulse-hue')!
    expect(hue).toContain('hue-rotate(calc(var(--beam-hue-base, 0deg) + 360deg))')
    expect(hue).toContain('brightness(var(--beam-brightness, 1.3)) saturate(var(--beam-saturation, 1.2))')
    const glow = keyframes(BEAM_BASE_CSS).get('beam-pulse-hue-glow')!
    expect(glow).toContain('var(--beam-glow-brightness, var(--beam-brightness, 1.3))')
  })

  it('pauses the layer animations offscreen and stops breathing under reduced motion', () => {
    const paused = BEAM_BASE_CSS.match(/([^{}]*\[data-paused\][^{}]*)\{([^{}]*)\}/)!
    for (const target of ['[data-beam-layer]', '[data-beam-blob]', '[data-beam-blob] > *', '[data-beam-bloom]']) {
      expect(paused[1]).toContain(target)
    }
    expect(paused[2]).toContain('animation-play-state: paused !important')

    const reduced = BEAM_BASE_CSS.slice(BEAM_BASE_CSS.indexOf('@media (prefers-reduced-motion: reduce)'))
    for (const target of ['[data-beam-layer]', '[data-beam-blob]', '[data-beam-blob] > *', '[data-beam-bloom]']) {
      expect(reduced).toContain(target)
    }
    expect(reduced).toContain('animation: none !important')
    // The wrapper's one-shot fade must keep running: it raises --beam-opacity
    // (otherwise the glow stays invisible) and ends in activate/deactivate.
    expect(reduced).not.toMatch(/\[data-beam\^="pulse-"\]\[data-(?:active|fading)\]\s*[,{]/)
  })

  it('emits geometry for exactly the blob elements the component renders', () => {
    for (const size of PULSE_SIZES) {
      const css = generateBeamCSS({ size, theme: 'dark', colorVariant: 'colorful', staticColors: false })
      for (const layer of pulseLayerSpecs(size)!) {
        for (let i = 0; i < layer.blobs; i++) {
          expect(css, `${size}/${layer.name}/${i}`).toContain(
            `> [data-beam-layer="${layer.name}"] > [data-beam-paint] > [data-beam-blob="${i}"] {`,
          )
        }
        expect(css).not.toContain(
          `> [data-beam-layer="${layer.name}"] > [data-beam-paint] > [data-beam-blob="${layer.blobs}"] {`,
        )
      }
    }
    expect(pulseLayerSpecs('md')).toBeNull()
  })

  it('gives every rounded layer the squircle geometry in squircle mode', () => {
    for (const size of PULSE_SIZES) {
      const css = generateBeamCSS({ size, theme: 'dark', colorVariant: 'colorful', staticColors: false, cornerShape: 'squircle' })
      expect(css).not.toContain('clip-path: inset(0 round')
      const rounded = rules(css).filter((r) => /border-radius:/.test(r.body))
      expect(rounded.some((r) => r.selector.includes('[data-beam-layer='))).toBe(true)
      for (const rule of rounded) {
        if (/keep-round/.test(rule.body)) continue
        expect(rule.body, rule.selector).toContain('corner-shape: squircle;')
      }
      const round = generateBeamCSS({ size, theme: 'dark', colorVariant: 'colorful', staticColors: false })
      expect(round).not.toContain('corner-shape')
    }
  })
})

describe('BorderBeam pulse layers', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it.each(PULSE_SIZES)('%s renders aria-hidden layer elements for every blob', (size) => {
    const wrapper = mount(BorderBeam, {
      props: { size },
      slots: { default: '<button>Go</button>' },
    })
    const root = wrapper.get('[data-beam]')
    const specs = pulseLayerSpecs(size)!
    const layers = root.findAll(':scope > [data-beam-layer]')
    expect(layers.map((l) => l.attributes('data-beam-layer'))).toEqual(specs.map((s) => s.name))
    for (const [i, layer] of layers.entries()) {
      expect(layer.attributes('aria-hidden')).toBe('true')
      const blobs = layer.findAll(':scope > [data-beam-paint] > [data-beam-blob]')
      expect(blobs).toHaveLength(specs[i].blobs)
      expect(blobs.map((b) => b.attributes('data-beam-blob'))).toEqual(
        Array.from({ length: specs[i].blobs }, (_, n) => String(n)),
      )
      for (const blob of blobs) expect(blob.element.children).toHaveLength(1)
    }
    expect(root.find(':scope > [data-beam-bloom] > [data-beam-paint]').exists()).toBe(true)
    // the slot keeps its place as the first child
    expect(root.element.firstElementChild?.tagName).toBe('BUTTON')
    wrapper.unmount()
  })

  it('renders no extra layers for the rotate / line variants', () => {
    for (const size of ['md', 'sm', 'line'] as const) {
      const wrapper = mount(BorderBeam, { props: { size }, slots: { default: '<div>Card</div>' } })
      expect(wrapper.find('[data-beam-layer]').exists()).toBe(false)
      expect(wrapper.find('[data-beam-bloom]').element.children).toHaveLength(0)
      wrapper.unmount()
    }
  })

  it('starts no requestAnimationFrame loop for the pulse variants', async () => {
    const raf = vi.spyOn(window, 'requestAnimationFrame')
    const wrappers = PULSE_SIZES.map((size) =>
      mount(BorderBeam, { props: { size, active: true }, slots: { default: '<div>Card</div>' } }),
    )
    await nextTick()
    await new Promise((resolve) => setTimeout(resolve, 50))
    expect(raf).not.toHaveBeenCalled()
    for (const w of wrappers) w.unmount()
  })
})
