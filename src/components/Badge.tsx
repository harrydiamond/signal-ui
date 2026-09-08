import { tv } from '../tv.ts'

export type BadgeTone = 'muted' | 'meter'
export type BadgeSurface = 'surface' | 'page'

type Props = {
  label: string
  tone?: BadgeTone
  surface?: BadgeSurface
  className?: string
}

const badge = tv({
  base: 'inline-flex items-center rounded-md px-1.5 py-0.5 text-[0.6875rem] font-medium tracking-wide uppercase',
  variants: {
    tone: {
      muted: 'text-av-muted',
      meter: 'text-av-meter',
    },
    surface: {
      surface: 'bg-av-surface-2',
      page: 'bg-av-surface',
    },
  },
  defaultVariants: {
    tone: 'muted',
    surface: 'surface',
  },
})

export function Badge({
  label,
  tone = 'muted',
  surface = 'surface',
  className,
}: Props) {
  return <span className={badge({ tone, surface, className })}>{label}</span>
}
