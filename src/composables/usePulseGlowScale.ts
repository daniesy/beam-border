import { computed, nextTick, onMounted, onUnmounted, shallowRef, watch, type Ref } from 'vue'
import type { BorderBeamSize } from '../types'

const REF_WIDTH = 350
const REF_HEIGHT = 140
const MIN_SCALE = 0.35
const MAX_SCALE = 4

function clampScale(value: number) {
  return Math.max(MIN_SCALE, Math.min(MAX_SCALE, value))
}

export function usePulseGlowScale(
  elementRef: Ref<HTMLElement | null>,
  size: Ref<BorderBeamSize>,
) {
  const scale = shallowRef({ x: 1, y: 1 })
  let observer: ResizeObserver | undefined
  let mutationObserver: MutationObserver | undefined

  const measure = () => {
    const child = elementRef.value?.firstElementChild
    if (!(child instanceof HTMLElement)) return

    const rect = child.getBoundingClientRect()
    if (!rect.width || !rect.height) return

    const x = Number(clampScale(rect.width / REF_WIDTH).toFixed(3))
    const y = Number(clampScale(rect.height / REF_HEIGHT).toFixed(3))
    if (scale.value.x !== x || scale.value.y !== y) {
      scale.value = { x, y }
    }
  }

  const observe = async () => {
    observer?.disconnect()
    observer = undefined
    mutationObserver?.disconnect()
    mutationObserver = undefined

    if (size.value !== 'pulse-outside') {
      scale.value = { x: 1, y: 1 }
      return
    }

    await nextTick()

    const child = elementRef.value?.firstElementChild
    if (!(child instanceof HTMLElement)) return

    measure()
    if (typeof ResizeObserver === 'undefined') return

    observer = new ResizeObserver(measure)
    observer.observe(child)

    const element = elementRef.value
    if (!element) return

    mutationObserver = new MutationObserver(observe)
    mutationObserver.observe(element, { childList: true, subtree: false })
  }

  onMounted(observe)
  watch(size, observe)

  onUnmounted(() => {
    observer?.disconnect()
    mutationObserver?.disconnect()
  })

  return computed(() => scale.value)
}
