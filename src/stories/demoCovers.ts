/** Deterministic SVG covers for media stories (no network). */
export function demoCover(hue: number, label: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" width="640" height="480"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${hue} 42% 42%)"/><stop offset="1" stop-color="hsl(${hue} 36% 28%)"/></linearGradient></defs><rect width="640" height="480" fill="url(#g)"/><circle cx="430" cy="150" r="110" fill="hsl(${hue} 55% 62%)" opacity="0.4"/><rect x="48" y="56" width="160" height="220" fill="hsl(${hue} 30% 22%)" opacity="0.55"/><text x="40" y="430" fill="#fff" font-size="26" font-family="system-ui">${label}</text></svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

export const DEMO_FRAMES = [
  { hue: 12, label: 'Beast' },
  { hue: 265, label: 'Blob' },
  { hue: 168, label: 'Glitch' },
  { hue: 42, label: 'Prism' },
  { hue: 200, label: 'Hex' },
  { hue: 330, label: 'Field' },
  { hue: 88, label: 'Grid' },
  { hue: 18, label: 'Tape' },
] as const
