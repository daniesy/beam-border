import { onMounted, onUnmounted, shallowRef } from 'vue'

export type SystemTheme = 'dark' | 'light'

function getCurrentSystemTheme(): SystemTheme {
  if (typeof window === 'undefined' || !window.matchMedia) return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useSystemTheme() {
  const systemTheme = shallowRef<SystemTheme>(getCurrentSystemTheme())
  let mediaQuery: MediaQueryList | undefined

  const syncTheme = () => {
    systemTheme.value = mediaQuery?.matches ? 'dark' : 'light'
  }

  onMounted(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return

    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    syncTheme()
    mediaQuery.addEventListener('change', syncTheme)
  })

  onUnmounted(() => {
    mediaQuery?.removeEventListener('change', syncTheme)
  })

  return systemTheme
}
