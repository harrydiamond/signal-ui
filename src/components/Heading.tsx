import type { HTMLAttributes } from 'react'
import { tv } from '../tv.ts'

type Level = 1 | 2 | 3 | 4

type Props = HTMLAttributes<HTMLHeadingElement> & {
  level?: Level
}

/** Sizes/colors only — face, weight, and tracking come from theme rules in styles.css. */
const heading = tv({
  base: 'm-0',
  variants: {
    level: {
      1: 'text-av-ink text-3xl md:text-4xl',
      2: 'text-av-ink text-xl',
      3: 'text-av-ink text-sm',
      4: 'text-av-muted text-xs font-medium tracking-[1px] uppercase',
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
