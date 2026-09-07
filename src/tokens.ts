/** Kit palette — keep in sync with `styles.css` theme assignment (dark) and `tailwind.css`. */
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

export const AV_RGB = {
  signal: '255,168,143',
  signalHot: '230,74,25',
  muted: '164,168,176',
  audio: '7,182,130',
  sync: '58,165,255',
  text: '238,225,224',
} as const

export type AvColorName = keyof typeof AV
