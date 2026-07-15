import { onUnmounted, watch, type ComputedRef } from 'vue'
import { BEAM_BASE_CSS } from '../styles'

interface SheetEntry {
  el: HTMLStyleElement
  refs: number
}

const BASE_KEY = 'base'

// Module-level registry: one <style> element per distinct stylesheet key,
// shared by every BorderBeam instance with that configuration and removed
// from <head> when the last instance using it unmounts.
const sheets = new Map<string, SheetEntry>()

function acquire(key: string, css: string): void {
  const entry = sheets.get(key)
  if (entry) {
    entry.refs++
    return
  }
  const el = document.createElement('style')
  el.dataset.beamStyle = key
  el.textContent = css
  document.head.appendChild(el)
  sheets.set(key, { el, refs: 1 })
}

function release(key: string): void {
  const entry = sheets.get(key)
  if (!entry) return
  entry.refs--
  if (entry.refs <= 0) {
    entry.el.remove()
    sheets.delete(key)
  }
}

/**
 * Keeps the shared BorderBeam stylesheets mounted in `document.head` for the
 * lifetime of a component instance: the static base sheet (@property
 * registrations, keyframes, pause/reduced-motion rules) plus the generated
 * sheet for this instance's configuration key. Sheets are reference-counted,
 * so any number of beams with the same configuration share a single <style>
 * element. No-op during SSR — styles attach on the client.
 */
export function useBeamStylesheet(key: ComputedRef<string>, css: ComputedRef<string>): void {
  if (typeof document === 'undefined') return

  acquire(BASE_KEY, BEAM_BASE_CSS)

  let activeKey: string | null = null

  watch(
    key,
    (next) => {
      if (next === activeKey) return
      acquire(next, css.value)
      if (activeKey !== null) release(activeKey)
      activeKey = next
    },
    { immediate: true },
  )

  onUnmounted(() => {
    if (activeKey !== null) release(activeKey)
    activeKey = null
    release(BASE_KEY)
  })
}
