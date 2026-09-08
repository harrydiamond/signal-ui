import type { HTMLAttributes } from 'react'
import { tv } from '../tv.ts'

type Level = 1 | 2 | 3 | 4

type Props = HTMLAttributes<HTMLHeadingElement> & {
  level?: Level
}

/** Sizes only — face/weight come from theme heading rules in styles.css. */
const heading = tv({
  base: 'm-0',
  variants: {
    level: {
      1: 'text-av-ink text-[1.875rem] sm:text-[2.25rem]',
      2: 'text-av-ink text-xl',
      3: 'text-av-ink text-sm font-semibold',
      4: 'text-av-muted text-xs font-medium tracking-widest uppercase',
    },
  },
  defaultVariants: {
    level: 2,
  },
})

export function Heading({ level = 2, className, ...props }: Props) {
  const Tag = `h${level}` as const
  return <Tag className={heading({ level, className })} {...props} />
}
