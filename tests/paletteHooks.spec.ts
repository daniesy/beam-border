import { describe, expect, it } from 'vitest';
import { applyColorfulPaletteHooks, colorfulPaletteHooks, generateBeamCSS } from '../src/styles';
import type { GenerateStylesOptions } from '../src/styles';
import type { BorderBeamSize } from '../src/types';

const SIZES: BorderBeamSize[] = ['sm', 'md', 'line', 'pulse-inner', 'pulse-outside'];

// Every rgb triple the colorful tables use, in every shade family.
const COLORFUL_TRIPLES = [
  '255, 50, 100', '200, 30, 60', '255, 60, 80',
  '40, 140, 255', '30, 100, 200',
  '50, 200, 80', '50, 200, 100', '30, 160, 70',
  '30, 185, 170', '40, 190, 180', '20, 150, 140', '40, 180, 220',
  '100, 70, 255', '80, 50, 200',
  '180, 40, 240', '200, 50, 240', '160, 30, 190',
  '240, 50, 180',
  '255, 120, 40', '255, 160, 30', '255, 170, 40', '210, 130, 0',
];

function css(overrides: Partial<GenerateStylesOptions> = {}): string {
  return generateBeamCSS({
    size: 'pulse-inner',
    colorVariant: 'colorful',
    staticColors: false,
    theme: 'dark',
    ...overrides,
  });
}

describe('colorful palette hooks', () => {
  it('exposes the nine hue families', () => {
    expect(colorfulPaletteHooks).toEqual([
      'pink', 'red', 'blue', 'green', 'teal',
      'purple', 'violet', 'magenta', 'orange',
    ]);
  });

  it.each(SIZES)('%s: every colorful palette colour goes through a --beam-color-* hook', size => {
    for (const theme of ['dark', 'light'] as const) {
      const out = css({ size, theme });
      for (const triple of COLORFUL_TRIPLES) {
        // No bare palette colour survives: every remaining rgb()/rgba() of a
        // palette triple must be the fallback inside its var(--beam-color-…).
        for (const match of out.matchAll(new RegExp(`rgba?\\(${triple}[,)]`, 'g'))) {
          const before = out.slice(Math.max(0, match.index! - 40), match.index!);
          expect(before, `${size}/${theme}: bare ${match[0]} at ${match.index}`).toContain('var(--beam-color-');
        }
      }
    }
  });

  it('keeps the original colour as the fallback, so unset hooks change nothing', () => {
    const out = css();
    expect(out).toContain('var(--beam-color-pink, rgb(255, 50, 100))');
    expect(out).toContain('var(--beam-color-blue, rgb(40, 140, 255))');
    // Alpha'd occurrences render identically via color-mix of the hook.
    expect(out).toMatch(
      /color-mix\(in srgb, var\(--beam-color-[a-z]+, rgb\(\d+, \d+, \d+\)\) calc\((?:[\d.]+|var\(--[\w-]+\)) \* 100%\), transparent\)/,
    );
  });

  it('folds a custom-property alpha into the color-mix percentage', () => {
    // (No generated variant emits a var() alpha any more — the pulse breathing
    // animates element opacity — but the hook rewrite still supports it.)
    expect(applyColorfulPaletteHooks('rgba(255, 50, 100, var(--alpha))')).toBe(
      'color-mix(in srgb, var(--beam-color-pink, rgb(255, 50, 100)) calc(var(--alpha) * 100%), transparent)',
    );
  });

  it('hooks the full-alpha blob fills of the compositor pulse layers', () => {
    const out = css();
    expect(out).toContain('radial-gradient(closest-side, var(--beam-color-pink, rgb(255, 50, 100)), transparent)');
  });

  it('leaves the other variants untouched', () => {
    for (const colorVariant of ['mono', 'ocean', 'sunset'] as const) {
      const out = css({ colorVariant });
      expect(out).not.toContain('--beam-color-');
    }
  });

  it('white/black overlay colours are not hooked', () => {
    const out = css({ size: 'line' });
    expect(out).toContain('rgba(255, 255, 255,');
    expect(out).not.toContain('var(--beam-color-white');
  });
});
