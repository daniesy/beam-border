# @daniesy/beam-border

Animated border beam effect for Vue 3. This package is a Vue port of Jakub Antalik's original React [`border-beam`](https://github.com/Jakubantalik/border-beam) project, adapted to Vue single-file components, Composition API composables, Vue events, and Vue fallthrough attributes.

It adds a traveling or breathing glow around any slotted element: cards, buttons, inputs, search bars, panels, and other UI surfaces.

## Install

```sh
npm install @daniesy/beam-border
```

Vue is a peer dependency:

```sh
npm install vue
```

## Quick start

```vue
<script setup lang="ts">
import { BorderBeam } from "@daniesy/beam-border";
</script>

<template>
  <BorderBeam>
    <div class="card">Your content here</div>
  </BorderBeam>
</template>

<style scoped>
.card {
  border-radius: 16px;
  padding: 32px;
  background: #1d1d1d;
}
</style>
```

The component wraps your default slot and overlays the animated beam effect. It auto-detects the `border-radius` of the first slotted element unless you pass `border-radius` explicitly.

## Types

Built-in presets control the glow style and motion. They fall into two families.

### Rotate

```vue
<template>
  <BorderBeam size="md">
    <Card />
  </BorderBeam>

  <BorderBeam size="sm">
    <IconButton />
  </BorderBeam>

  <BorderBeam size="line">
    <SearchBar />
  </BorderBeam>
</template>
```

- `md` is the default full border glow.
- `sm` is tuned for compact elements.
- `line` is a bottom-only traveling glow.

### Pulse

```vue
<template>
  <BorderBeam size="pulse-inner">
    <Card />
  </BorderBeam>

  <BorderBeam size="pulse-outside">
    <Card />
  </BorderBeam>
</template>
```

- `pulse-inner` is a contained breathing border glow.
- `pulse-outside` is an outward-blooming halo around the element.

Both pulse types support all color variants, `strength`, `theme`, `tint`, and `duration`. Pulse defaults to a `2.3` second cycle.

`pulse-outside` needs an opaque wrapped child. The colorful core and halo render behind your content and bloom outward, so transparent children will show the inner glow. The wrapper uses `overflow: visible`, so surrounding layout should allow the halo to spill.

`pulse-outside` expects your child to provide its own subtle 1px edge, such as a border or `box-shadow: inset 0 0 0 1px`. This keeps the idle edge defined without double-painting the border.

## Color variants

```vue
<template>
  <BorderBeam color-variant="colorful" />
  <BorderBeam color-variant="mono" />
  <BorderBeam color-variant="ocean" />
  <BorderBeam color-variant="sunset" />
</template>
```

- `colorful` is the default rainbow spectrum.
- `mono` is grayscale.
- `ocean` uses blue and purple tones.
- `sunset` uses orange, yellow, and red tones.

All variants except `mono` animate through a hue-shift cycle unless `static-colors` is enabled.

## Custom tint

Use `tint` when you want the original motion geometry with one custom color.

```vue
<template>
  <BorderBeam size="pulse-outside" tint="#22c55e">
    <div class="card">Custom tinted pulse</div>
  </BorderBeam>
</template>
```

When `tint` is provided, colors are treated as static so the custom color stays stable.

## Theme

```vue
<template>
  <BorderBeam theme="dark" />
  <BorderBeam theme="light" />
  <BorderBeam theme="auto" />
</template>
```

- `dark` is the default.
- `light` adapts opacity and contrast for light backgrounds.
- `auto` follows `prefers-color-scheme`.

## Strength

Control the overall intensity without affecting the wrapped content.

```vue
<template>
  <BorderBeam :strength="0.7">
    <Card />
  </BorderBeam>
</template>
```

`strength` accepts `0` to `1`. Internally, max strength is visually amplified so `1` reads clearly in real UI.

## Play and pause

```vue
<script setup lang="ts">
import { shallowRef } from "vue";
import { BorderBeam } from "@daniesy/beam-border";

const active = shallowRef(true);
</script>

<template>
  <BorderBeam :active="active" @deactivate="console.log('faded out')">
    <Card />
  </BorderBeam>
</template>
```

The component fades in and out smoothly when `active` changes. It also pauses animation work when the wrapper is offscreen.

## Props

| Prop                             | Type                                                         | Default        | Description                         |
| -------------------------------- | ------------------------------------------------------------ | -------------- | ----------------------------------- |
| `size`                           | `'sm' \| 'md' \| 'line' \| 'pulse-outside' \| 'pulse-inner'` | `'md'`         | Size/type preset                    |
| `colorVariant` / `color-variant` | `'colorful' \| 'mono' \| 'ocean' \| 'sunset'`                | `'colorful'`   | Color palette                       |
| `theme`                          | `'dark' \| 'light' \| 'auto'`                                | `'dark'`       | Background adaptation               |
| `strength`                       | `number`                                                     | `1`            | Effect intensity, clamped to `0..1` |
| `duration`                       | `number`                                                     | per size       | Animation cycle duration in seconds |
| `active`                         | `boolean`                                                    | `true`         | Whether the animation is active     |
| `borderRadius` / `border-radius` | `number`                                                     | auto-detected  | Custom border radius in px          |
| `brightness`                     | `number`                                                     | per size/theme | Glow brightness multiplier          |
| `saturation`                     | `number`                                                     | per size/theme | Glow saturation multiplier          |
| `hueRange` / `hue-range`         | `number`                                                     | `30`           | Hue rotation range in degrees       |
| `tint`                           | `string`                                                     | `undefined`    | Custom single-color beam tint       |
| `staticColors` / `static-colors` | `boolean`                                                    | `false`        | Disable hue-shift animation         |

All standard fallthrough attributes are forwarded to the wrapper element. That includes `id`, `class`, `style`, ARIA attributes, and DOM listeners.

## Events

| Event          | Description                           |
| -------------- | ------------------------------------- |
| `activate`     | Emitted when fade-in completes        |
| `deactivate`   | Emitted when fade-out completes       |
| `animationend` | Re-emits the wrapper `AnimationEvent` |

## How it works

`BorderBeam` renders a wrapper `div` with:

- `::after`: the beam stroke
- `::before`: the inner glow layer
- `[data-beam-bloom]`: the outer bloom/glow child

The effect layers are absolutely positioned and use `pointer-events: none`, so they do not block interaction with your slot content.

Rotate and line modes animate with CSS custom properties and keyframes. Pulse modes use a shared, frame-rate-capped `requestAnimationFrame` driver exposed through Vue composables, so multiple instances share one loop and can pause when inactive, offscreen, or reduced motion is preferred.

## Project structure

```txt
beam-border/
├── src/
│   ├── index.ts
│   ├── components/BorderBeam.vue
│   ├── composables/
│   ├── pulseDriver.ts
│   ├── styles.ts
│   └── types.ts
├── tests/
├── dist/
├── .github/workflows/publish.yml
├── package.json
└── README.md
```

## Requirements

- Vue `>=3.5.0`
- Modern browser support for CSS masks, gradients, custom properties, and `ResizeObserver`

## Development

```sh
npm install
npm run dev
npm run typecheck
npm run test
npm run build
npm run pack:dry-run
```

The demo runs with Vite:

```sh
npm run dev
```

## Publishing to npm with GitHub Actions

This repo includes `.github/workflows/publish.yml`. It uses GitHub Actions and npm Trusted Publishing, with no paid third-party publishing service and no long-lived npm publish token.

To publish:

1. In npm, configure Trusted Publishing for this package.
2. Set the trusted publisher to this GitHub repository and the `publish.yml` workflow filename.
3. Make sure `package.json` has the package name and version you want to publish.
4. Publish a GitHub release, or run the workflow manually from the Actions tab.

The workflow runs `npm ci`, `npm run typecheck`, `npm run test`, `npm run build`, then `npm publish --access public`. npm automatically generates provenance when publishing from GitHub Actions through Trusted Publishing.

## Attribution

This is a Vue 3 port of [`Jakubantalik/border-beam`](https://github.com/Jakubantalik/border-beam). The visual behavior and API concepts come from the original React package; this version adapts them to Vue slots, Vue props/events, and composables.

## License

MIT. See [LICENSE](./LICENSE).
