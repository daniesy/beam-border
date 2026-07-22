import { nextTick, onMounted, onUnmounted, shallowRef, watch, type Ref } from 'vue'
import type { BorderBeamCornerShape } from '../types'

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

    const raw = getComputedStyle(child).getPropertyValue('corner-shape').trim()
    if (raw.includes('squircle')) {
      detectedShape.value = 'squircle'
    } else if (raw) {
      detectedShape.value = 'round'
    }
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
