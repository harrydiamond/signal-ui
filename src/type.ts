/** Shared type faces and field chrome for Tailwind-styled primitives. */
export const doto =
  "font-doto font-bold tracking-wider [font-feature-settings:'tnum'_1] [font-variation-settings:'ROND'_0] [text-rendering:geometricPrecision]"

export const plex =
  "font-body [font-feature-settings:'tnum'_1] [font-variation-settings:normal] [text-rendering:optimizeLegibility]"

export const prose = `${plex} text-av-text max-w-[65ch] text-base font-normal leading-relaxed tracking-wide [&_strong]:font-bold [&_strong]:text-white [&_a]:text-av-signal [&_a:hover]:text-av-phosphor-bright`

export const proseMuted = `${plex} text-av-prose-muted max-w-[65ch] text-sm font-normal leading-relaxed tracking-wide`

export const meta = `${plex} font-medium tracking-wider uppercase`

export const fieldLabel = `${plex} text-av-muted block text-xs font-medium`

export const fieldHint = `${plex} text-av-muted mt-1.5 block text-xs`

export const fieldError = `${plex} text-av-danger mt-1.5 block text-xs`

export const ledText =
  'text-av-phosphor [text-shadow:0_0_1px_color-mix(in_srgb,var(--color-av-phosphor-bright)_55%,transparent),0_0_6px_color-mix(in_srgb,var(--color-av-signal-hot)_35%,transparent)]'

export const ledHot =
  'text-av-phosphor-bright [text-shadow:0_0_1px_color-mix(in_srgb,var(--color-av-phosphor-bright)_70%,white),0_0_5px_color-mix(in_srgb,var(--color-av-signal-hot)_40%,transparent),0_0_12px_color-mix(in_srgb,var(--color-av-signal-hot)_20%,transparent)]'
