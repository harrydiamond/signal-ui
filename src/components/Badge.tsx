import { cx } from '../cx.ts'

export type BadgeTone = 'muted' | 'meter'
export type BadgeSurface = 'surface' | 'page'

type Props = {
  label: string
  tone?: BadgeTone
  surface?: BadgeSurface
  className?: string
}

export function Badge({
  label,
  tone = 'muted',
  surface = 'surface',
  className,
}: Props) {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-md px-1.5 py-0.5 text-[0.6875rem] font-medium tracking-wide uppercase',
        tone === 'meter' ? 'text-av-meter' : 'text-av-muted',
        surface === 'page' ? 'bg-av-surface' : 'bg-av-surface-2',
        className,
      )}
    >
      {label}
    </span>
  )
}
