import { nextTick, onMounted, onUnmounted, shallowRef, watch, type Ref } from 'vue'
import type { BorderBeamCornerShape } from '../types'

// Physical per-corner longhands, read when the shorthand serialises to ''
// (e.g. because the corners differ). Top-left wins, like border-radius
// detection, which reads borderTopLeftRadius.
const CORNER_LONGHANDS = [
  'corner-top-left-shape',
  'corner-top-right-shape',
  'corner-bottom-right-shape',
  'corner-bottom-left-shape',
] as const

/**
 * Map a computed `corner-shape` value to the beam geometry.
 *
 * Chrome serialises the computed `squircle` keyword as `superellipse(2)`, so
 * both spellings mean squircle. Only the first value counts when the
 * shorthand lists one shape per corner. Any other shape renders as round;
 * an empty value (no `corner-shape` support) is unknown.
 */
export function parseCornerShape(raw: string): BorderBeamCornerShape | null {
  const value = raw.trim().toLowerCase()
  if (!value) return null

  const first = value.match(/^(?:superellipse\(\s*[^)]*\)|[a-z-]+)/)?.[0] ?? value
  if (first === 'squircle') return 'squircle'

  const superellipse = first.match(/^superellipse\(\s*([+-]?(?:\d+\.?\d*|\.\d+))\s*\)$/)
  if (superellipse && Math.abs(Number(superellipse[1]) - 2) < 1e-6) return 'squircle'

  return 'round'
}

/**
 * Mirror of useDetectedBorderRadius for the CSS `corner-shape` property:
 * reads the first slotted element's computed corner shape so squircle
 * children get a squircle beam without configuration. Browsers without
 * corner-shape support report an empty string and fall back to `round`.
 */
export function useDetectedCornerShape(
  elementRef: Ref<HTMLElement | null>,
  customCornerShape: Ref<BorderBeamCornerShape | undefined>,
) {
  const detectedShape = shallowRef<BorderBeamCornerShape | null>(null)
  let observer: MutationObserver | undefined

  const detect = () => {
    if (customCornerShape.value != null) return

    const child = elementRef.value?.firstElementChild
    if (!(child instanceof HTMLElement)) return

    const style = getComputedStyle(child)
    let shape = parseCornerShape(style.getPropertyValue('corner-shape'))
    for (const longhand of CORNER_LONGHANDS) {
      if (shape) break
      shape = parseCornerShape(style.getPropertyValue(longhand))
    }
    if (shape) detectedShape.value = shape
  }

  const observe = async () => {
    observer?.disconnect()
    observer = undefined

    await nextTick()

    const element = elementRef.value
    if (!element || customCornerShape.value != null) return

    detect()
    observer = new MutationObserver(detect)
    observer.observe(element, { childList: true, subtree: false })
  }

  onMounted(observe)
  watch(customCornerShape, observe)

  onUnmounted(() => {
    observer?.disconnect()
  })

  return detectedShape
}
