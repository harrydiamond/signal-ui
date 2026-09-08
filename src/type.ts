/** Shared type faces and field chrome for Tailwind-styled primitives. */
export const heading =
  'font-heading font-bold tracking-wider [text-rendering:geometricPrecision]'

export const body = 'font-body [text-rendering:optimizeLegibility]'

export const prose = `${body} av-prose text-av-text max-w-[65ch] text-base font-normal leading-relaxed tracking-wide [&_strong]:font-bold [&_strong]:text-av-ink [&_a]:text-av-signal [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-av-link-hover`

export const proseMuted = `${body} av-prose-muted text-av-prose-muted max-w-[65ch] text-sm font-normal leading-relaxed tracking-wide`

export const meta = `${body} font-medium tracking-wider uppercase`

export const fieldLabel = `${body} text-av-muted block text-xs font-medium`

export const fieldHint = `${body} text-av-muted mt-1.5 block text-xs`

export const fieldError = `${body} text-av-danger mt-1.5 block text-xs`

export const ledText = 'av-led-text'

export const ledHot = 'av-led-hot'
