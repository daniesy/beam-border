import { onMounted, onUnmounted, shallowRef, type Ref } from 'vue'

export function useElementVisibility(
  elementRef: Ref<HTMLElement | null>,
  options: IntersectionObserverInit = { rootMargin: '256px' },
) {
  const isVisible = shallowRef(true)
  let observer: IntersectionObserver | undefined

  onMounted(() => {
    const element = elementRef.value
    if (!element || typeof IntersectionObserver === 'undefined') return

    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        isVisible.value = entry.isIntersecting
      }
    }, options)
    observer.observe(element)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return isVisible
}
