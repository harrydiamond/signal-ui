import type { HTMLAttributes } from 'react'
import { cx } from '../cx.ts'
import { tv } from '../tv.ts'

const metaLabel = tv({
  base: 'font-mono text-[10px] tracking-[1px] uppercase',
  variants: {
    tone: {
      muted: 'text-av-muted',
      accent: 'text-av-signal',
      ink: 'text-av-ink',
    },
  },
  defaultVariants: {
    tone: 'muted',
  },
})

type Props = HTMLAttributes<HTMLSpanElement> & {
  tone?: 'muted' | 'accent' | 'ink'
}

/** Mono uppercase micro-label (meta / category). */
export function MetaLabel({ tone = 'muted', className, ...props }: Props) {
  return <span className={cx(metaLabel({ tone }), className)} {...props} />
}
