import type { HTMLAttributes } from 'react'
import { doto, plex } from '../type.ts'
import { tv } from '../tv.ts'

type Level = 1 | 2 | 3 | 4

type Props = HTMLAttributes<HTMLHeadingElement> & {
  level?: Level
}

const heading = tv({
  base: 'm-0',
  variants: {
    level: {
      1: `${doto} text-av-ink text-[1.875rem] sm:text-[2.25rem]`,
      2: `${doto} text-av-ink text-xl`,
      3: `${plex} text-av-ink text-sm font-semibold tracking-wider`,
      4: `${plex} text-av-muted text-xs font-medium tracking-widest uppercase`,
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
