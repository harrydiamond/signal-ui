import type { CSSProperties } from 'react'
import { body, proseMuted } from '../type.ts'
import { cx } from '../cx.ts'

/**
 * Documentary chip for spacing, radius, and motion scales.
 */
export function TokenSample({
  name,
  value,
  note,
  cssVar,
  utility,
  preview,
  previewValue,
}: {
  name: string
  value: string
  note: string
  cssVar: string
  utility: string
  preview: 'space' | 'radius' | 'motion'
  /** CSS length for the chip (space/radius) or bar width (motion). */
  previewValue: string
}) {
  return (
    <li className="av-swatch">
      <span
        className={cx(
          'av-swatch-chip',
          preview === 'space' && 'av-token-space',
          preview === 'radius' && 'av-token-radius',
          preview === 'motion' && 'av-token-motion',
        )}
        style={{ '--av-token-preview': previewValue } as CSSProperties}
        aria-hidden="true"
      />
      <div>
        <p className={`${body} av-swatch-name`}>{name}</p>
        <p className={`${proseMuted} av-swatch-meta`}>
          {cssVar} · {value}
        </p>
        <p className={`${proseMuted} av-swatch-meta`}>
          {utility} · {note}
        </p>
      </div>
    </li>
  )
}
