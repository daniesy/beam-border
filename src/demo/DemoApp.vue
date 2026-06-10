<script setup lang="ts">
import { shallowRef } from 'vue'
import { BorderBeam, type BorderBeamColorVariant, type BorderBeamSize, type BorderBeamTheme } from '../index'

const active = shallowRef(true)
const size = shallowRef<BorderBeamSize>('md')
const theme = shallowRef<BorderBeamTheme>('dark')
const colorVariant = shallowRef<BorderBeamColorVariant>('colorful')
const useTint = shallowRef(false)
const tint = shallowRef('#22c55e')
const strength = shallowRef(1)

const sizes: Array<{ label: string; value: BorderBeamSize }> = [
  { label: 'Large Rotate', value: 'md' },
  { label: 'Small Rotate', value: 'sm' },
  { label: 'Line', value: 'line' },
  { label: 'Pulse Inner', value: 'pulse-inner' },
  { label: 'Pulse Outside', value: 'pulse-outside' },
]
const themes: BorderBeamTheme[] = ['dark', 'light', 'auto']
const variants: BorderBeamColorVariant[] = ['colorful', 'mono', 'ocean', 'sunset']
</script>

<template>
  <main class="demo" :class="`demo--${theme === 'auto' ? 'dark' : theme}`">
    <section class="demo__toolbar" aria-label="Beam controls">
      <div class="demo__group">
        <button
          v-for="item in sizes"
          :key="item.value"
          class="demo__button"
          :class="{ 'demo__button--active': size === item.value }"
          type="button"
          @click="size = item.value"
        >
          {{ item.label }}
        </button>
      </div>

      <div class="demo__group">
        <button
          v-for="item in themes"
          :key="item"
          class="demo__button"
          :class="{ 'demo__button--active': theme === item }"
          type="button"
          @click="theme = item"
        >
          {{ item }}
        </button>
      </div>

      <div class="demo__group">
        <button
          v-for="item in variants"
          :key="item"
          class="demo__button"
          :class="{ 'demo__button--active': colorVariant === item && !useTint }"
          type="button"
          @click="useTint = false; colorVariant = item"
        >
          {{ item }}
        </button>
      </div>

      <label class="demo__tint">
        <input v-model="useTint" type="checkbox" />
        <span>Custom tint</span>
        <input v-model="tint" class="demo__color" type="color" />
      </label>

      <label class="demo__slider">
        <span>Strength</span>
        <input v-model.number="strength" min="0" max="1" step="0.05" type="range" />
      </label>

      <label class="demo__toggle">
        <input v-model="active" type="checkbox" />
        <span>Active</span>
      </label>
    </section>

    <section class="demo__preview" aria-label="Beam preview">
      <BorderBeam
        :active="active"
        :color-variant="colorVariant"
        :size="size"
        :strength="strength"
        :theme="theme"
        :tint="useTint ? tint : undefined"
      >
        <article class="demo__card" :class="`demo__card--${size}`">
          <span class="demo__label">{{ size }}</span>
          <strong>Vue 3 BorderBeam</strong>
          <p>Slot content stays interactive while the decorative beam renders above and behind it.</p>
        </article>
      </BorderBeam>
    </section>
  </main>
</template>
