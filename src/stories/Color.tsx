import { plex, proseMuted } from '../type.ts'

/**
 * Surfaces, text, and accents. Operable chrome uses fill contrast — not a
 * border. Hairline is structural only.
 */
export function Color({
  name,
  hex,
  note,
  sample,
}: {
  name: string
  hex: string
  note: string
  sample?: 'text'
}) {
  return (
    <li className="av-swatch">
      <span
        className="av-swatch-chip"
        style={sample === 'text' ? { color: hex } : { background: hex }}
        aria-hidden="true"
      >
        {sample === 'text' ? 'Aa' : null}
      </span>
      <div>
        <p className={`${plex} av-swatch-name`}>{name}</p>
        <p className={`${proseMuted} av-swatch-meta`}>
          {hex} · {note}
        </p>
      </div>
    </li>
  )
}
