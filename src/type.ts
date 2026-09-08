/** Shared type faces and field chrome for Tailwind-styled primitives. */
export const doto =
  'font-doto font-bold tracking-wider [text-rendering:geometricPrecision]'

export const plex = 'font-body [text-rendering:optimizeLegibility]'

export const prose = `${plex} av-prose text-av-text max-w-[65ch] text-base font-normal leading-relaxed tracking-wide [&_strong]:font-bold [&_strong]:text-av-ink [&_a]:text-av-signal [&_a:hover]:text-av-link-hover`

export const proseMuted = `${plex} av-prose-muted text-av-prose-muted max-w-[65ch] text-sm font-normal leading-relaxed tracking-wide`

export const meta = `${plex} font-medium tracking-wider uppercase`

export const fieldLabel = `${plex} text-av-muted block text-xs font-medium`

export const fieldHint = `${plex} text-av-muted mt-1.5 block text-xs`

export const fieldError = `${plex} text-av-danger mt-1.5 block text-xs`

export const ledText = 'av-led-text'

export const ledHot = 'av-led-hot'
