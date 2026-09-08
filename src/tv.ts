import { createTV } from 'tailwind-variants'

/** Kit `tv` helper — Tailwind merge enabled (same conflict resolution as `cx`). */
export const tv = createTV({
  twMerge: true,
})
