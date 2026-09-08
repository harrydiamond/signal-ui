import type { HTMLAttributes } from 'react'
import { cx } from '../cx.ts'
import { tv } from '../tv.ts'

const pulseDot = tv({
  base: 'bg-av-signal mb-0.5 inline-block h-1 w-1 shrink-0 rounded-full',
  variants: {
    pulse: {
      true: 'animate-pulse',
      false: '',
    },
  },
  defaultVariants: {
    pulse: false,
  },
})

type Props = HTMLAttributes<HTMLSpanElement> & {
  pulse?: boolean
}

/** Accent status / section marker. */
export function PulseDot({ pulse = false, className, ...props }: Props) {
  return (
    <span
      className={cx(pulseDot({ pulse }), className)}
      aria-hidden
      {...props}
    />
  )
}
