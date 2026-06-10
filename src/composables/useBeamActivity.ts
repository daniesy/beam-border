import { shallowRef, watch, type Ref } from 'vue'

interface UseBeamActivityOptions {
  active: Ref<boolean>
  onActivate: () => void
  onDeactivate: () => void
  onAnimationEnd?: (event: AnimationEvent) => void
}

export function useBeamActivity(options: UseBeamActivityOptions) {
  const isActive = shallowRef(options.active.value)
  const isFading = shallowRef(false)

  watch(options.active, (active) => {
    if (active && !isActive.value && !isFading.value) {
      isActive.value = true
    } else if (!active && isActive.value && !isFading.value) {
      isFading.value = true
    }
  })

  const handleAnimationEnd = (event: AnimationEvent) => {
    const animationName = event.animationName

    if (animationName.includes('fade-out')) {
      isActive.value = false
      isFading.value = false
      options.onDeactivate()
    } else if (animationName.includes('fade-in')) {
      options.onActivate()
    }

    options.onAnimationEnd?.(event)
  }

  return {
    isActive,
    isFading,
    handleAnimationEnd,
  }
}
