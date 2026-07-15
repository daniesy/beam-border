<script setup lang="ts">
import { computed, useAttrs, useTemplateRef } from 'vue'
import type { StyleValue } from 'vue'
import { useBeamActivity } from '../composables/useBeamActivity'
import { useBeamStyles } from '../composables/useBeamStyles'
import { useBeamStylesheet } from '../composables/useBeamStylesheet'
import { useDetectedBorderRadius } from '../composables/useDetectedBorderRadius'
import { useElementVisibility } from '../composables/useElementVisibility'
import { usePulseDriver } from '../composables/usePulseDriver'
import { usePulseGlowScale } from '../composables/usePulseGlowScale'
import { useSystemTheme } from '../composables/useSystemTheme'
import type { BorderBeamProps } from '../types'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<BorderBeamProps>(), {
  size: 'md',
  colorVariant: 'colorful',
  theme: 'dark',
  staticColors: false,
  active: true,
  hueRange: 30,
  strength: 1,
})

const emit = defineEmits<{
  activate: []
  deactivate: []
  animationend: [event: AnimationEvent]
}>()

const attrs = useAttrs()
const wrapperRef = useTemplateRef<HTMLElement>('wrapper')
const systemTheme = useSystemTheme()
const resolvedTheme = computed(() => (props.theme === 'auto' ? systemTheme.value : props.theme))
const size = computed(() => props.size)
const customBorderRadius = computed(() => props.borderRadius)
const detectedRadius = useDetectedBorderRadius(wrapperRef, customBorderRadius)
const isVisible = useElementVisibility(wrapperRef)
const pulseGlowScale = usePulseGlowScale(wrapperRef, size)
const beamStyles = useBeamStyles({
  props,
  detectedRadius,
  resolvedTheme,
  pulseGlowScale,
})
const beamKey = beamStyles.cssKey

useBeamStylesheet(beamStyles.cssKey, beamStyles.cssStyles)

const { isActive, isFading, handleAnimationEnd } = useBeamActivity({
  active: computed(() => props.active),
  onActivate: () => emit('activate'),
  onDeactivate: () => emit('deactivate'),
  onAnimationEnd: (event) => emit('animationend', event),
})

usePulseDriver(wrapperRef, beamStyles.driverConfig, isActive, isFading, isVisible)

const forwardedAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs
  return rest
})

const mergedStyle = computed<StyleValue>(() => [attrs.style as StyleValue, beamStyles.wrapperStyle.value])
</script>

<template>
  <div
    v-bind="forwardedAttrs"
    ref="wrapper"
    :class="attrs.class"
    :style="mergedStyle"
    :data-beam="beamKey"
    :data-active="isActive && !isFading ? '' : undefined"
    :data-fading="isFading ? '' : undefined"
    :data-paused="isActive && !isFading && !isVisible ? '' : undefined"
    @animationend="handleAnimationEnd"
  >
    <slot />
    <div data-beam-bloom />
  </div>
</template>
