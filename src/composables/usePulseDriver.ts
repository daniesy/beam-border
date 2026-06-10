import { watchEffect, type ComputedRef, type Ref } from 'vue'
import { registerPulseInstance } from '../pulseDriver'
import type { PulseDriverConfig } from '../styles'

export function usePulseDriver(
  elementRef: Ref<HTMLElement | null>,
  driverConfig: ComputedRef<PulseDriverConfig | null>,
  isActive: Ref<boolean>,
  isFading: Ref<boolean>,
  isVisible: Ref<boolean>,
) {
  watchEffect((onCleanup) => {
    if (!driverConfig.value) return
    if (!(isActive.value || isFading.value) || !isVisible.value) return

    const element = elementRef.value
    if (!element) return

    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    onCleanup(registerPulseInstance(element, driverConfig.value))
  })
}
