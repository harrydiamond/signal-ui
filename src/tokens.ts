/**
 * Kit palettes — keep hex values in sync with `styles.css` theme assignments.
 *
 * - `AV` ↔ `[data-av-theme='phosphor']` (and `.av-theme` default)
 * - `AV_EDITORIAL` ↔ `[data-av-theme='editorial']` light defaults
 * - `AV_EDITORIAL_DARK` ↔ editorial `@media (prefers-color-scheme: dark)`
 *
 * Shared space / radius / motion (`AV_SPACE`, `AV_RADIUS`, `AV_DURATION`,
 * `AV_EASE`) live on `.av-theme` in `styles.css` (both themes) and `@theme`.
 *
 * Canvas/LED/slider fills use `AV` (phosphor). Editorial UI reads CSS variables;
 * these maps exist so docs, stories, and agents share the same hexes.
 */
export const AV = {
  /** Page plate under atmosphere — not a fill utility. */
  page: '#0A0B0D',
  surface: '#16181C',
  surface2: '#1E2126',
  /** Section rules, card chrome, list row dividers. */
  hairline: '#2C3038',
  /** Optional selection/focus edge; default operable chrome uses fill, not border. */
  border: '#5A606A',
  text: '#EEE1E0',
  body: '#EEE1E0',
  muted: '#A4A8B0',
  /** High-contrast ink (headings, strong). Dark = white. */
  ink: '#FFFFFF',
  /** Foreground on primary/danger fills. Dark = page plate. */
  onPrimary: '#0A0B0D',
  /** Panel / pad plate fills (button chrome). */
  panel: '#090A0C',
  pad: '#050607',
  signal: '#FFA88F',
  /** Lit LED / matrix phosphor (slightly hotter than signal fill). */
  phosphor: '#FF9A68',
  phosphorBright: '#FFB08A',
  signalHot: '#E64A19',
  audio: '#07B682',
  sync: '#3AA5FF',
  /** Opaque keyboard focus ring (matches sync). */
  focus: '#3AA5FF',
  meter: '#F7CD1B',
  accentSoft: '#FFB7F1',
  /** Errors, destructive actions, field/toast error copy. */
  danger: '#FCA5A5',
} as const

/** Editorial light — WCAG-tuned accents; hairline/border are solid stand-ins (CSS uses color-mix). */
export const AV_EDITORIAL = {
  page: '#F0F0F0',
  surface: '#FFFFFF',
  surface2: '#F5F5F5',
  hairline: '#161618',
  border: '#161618',
  text: '#161618',
  body: '#161618',
  muted: '#5C5F66',
  ink: '#161618',
  onPrimary: '#FFFFFF',
  panel: '#FFFFFF',
  pad: '#F0F0F0',
  signal: '#9B1C1C',
  phosphor: '#9B1C1C',
  phosphorBright: '#B71C1C',
  signalHot: '#7F1515',
  audio: '#057A56',
  sync: '#161618',
  focus: '#161618',
  meter: '#7A5F00',
  accentSoft: '#F5C2C2',
  danger: '#9B1C1C',
} as const

/** Editorial dark (prefers-color-scheme: dark). */
export const AV_EDITORIAL_DARK = {
  page: '#161618',
  surface: '#2C2D30',
  surface2: '#36373B',
  hairline: '#FFFFFF',
  border: '#FFFFFF',
  text: '#E6E6E6',
  body: '#E6E6E6',
  muted: '#A4A7AD',
  ink: '#FFFFFF',
  onPrimary: '#161618',
  panel: '#2C2D30',
  pad: '#161618',
  signal: '#FF8585',
  phosphor: '#FF8585',
  phosphorBright: '#FFB0B0',
  signalHot: '#FF9A9A',
  audio: '#1EC995',
  sync: '#FFFFFF',
  focus: '#FFFFFF',
  meter: '#F0D45A',
  accentSoft: '#5A3030',
  danger: '#FF8585',
} as const

export const AV_RGB = {
  signal: '255,168,143',
  signalHot: '230,74,25',
  muted: '164,168,176',
  audio: '7,182,130',
  sync: '58,165,255',
  text: '238,225,224',
} as const

/**
 * Shared spacing (both themes). CSS `--av-space-*` → `@theme` `--spacing-av-*`
 * (`p-av-4`, `gap-av-8`, …). Kit steps only — not a full 4px ladder.
 * Keep values in sync with `styles.css`.
 */
export const AV_SPACE = {
  '1': '0.25rem',
  '2': '0.5rem',
  '3': '0.75rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '8': '2rem',
  '10': '2.5rem',
  '12': '3rem',
  '24': '6rem',
} as const

/**
 * Shared radius (both themes). CSS `--av-radius-*` → `@theme` `--radius-av-*`
 * (`rounded-av-lg`). `--av-radius` aliases `lg` (cards / inputs).
 * Keep values in sync with `styles.css`.
 */
export const AV_RADIUS = {
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  full: '9999px',
} as const

/**
 * Shared motion durations in milliseconds (both themes).
 * CSS `--av-duration-*` includes the `ms` unit; `@theme` `--duration-av-*`
 * (`duration-av-control`). `stagger` is a sequence delay, not a transition.
 * Keep values in sync with `styles.css`.
 */
export const AV_DURATION = {
  control: 90,
  fast: 150,
  enter: 400,
  stagger: 75,
} as const

/**
 * Shared easing (both themes). CSS `--av-ease-*` → `@theme` `--ease-av-*`
 * (`ease-av-out`). Keep values in sync with `styles.css`.
 */
export const AV_EASE = {
  linear: 'linear',
  out: 'ease-out',
} as const

/** Stagger delay for `animate-fade-in-up` sequences (`AV_DURATION.stagger`). */
export const AV_STAGGER_MS = AV_DURATION.stagger

export type AvColorName = keyof typeof AV
export type AvSpaceName = keyof typeof AV_SPACE
export type AvRadiusName = keyof typeof AV_RADIUS
export type AvDurationName = keyof typeof AV_DURATION
export type AvEaseName = keyof typeof AV_EASE
