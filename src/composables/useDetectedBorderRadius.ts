import { nextTick, onMounted, onUnmounted, shallowRef, watch, type Ref } from 'vue'

export function useDetectedBorderRadius(
  elementRef: Ref<HTMLElement | null>,
  customBorderRadius: Ref<number | undefined>,
) {
  const detectedRadius = shallowRef<number | null>(null)
  let observer: MutationObserver | undefined

  const detect = () => {
    if (customBorderRadius.value != null) return

    const child = elementRef.value?.firstElementChild
    if (!(child instanceof HTMLElement)) return

    const raw = Number.parseFloat(getComputedStyle(child).borderTopLeftRadius)
    if (!Number.isNaN(raw) && raw > 0) {
      detectedRadius.value = raw
    }
  }

  const observe = async () => {
    observer?.disconnect()
    observer = undefined

    await nextTick()

    const element = elementRef.value
    if (!element || customBorderRadius.value != null) return

    detect()
    observer = new MutationObserver(detect)
    observer.observe(element, { childList: true, subtree: false })
  }

  onMounted(observe)
  watch(customBorderRadius, observe)

  onUnmounted(() => {
    observer?.disconnect()
  })

  return detectedRadius
}
