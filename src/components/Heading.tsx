import type { HTMLAttributes } from 'react'
import { cx } from '../cx.ts'
import { doto, plex } from '../type.ts'

type Level = 1 | 2 | 3 | 4

type Props = HTMLAttributes<HTMLHeadingElement> & {
  level?: Level
}

const LEVEL: Record<Level, string> = {
  1: `${doto} m-0 text-[1.875rem] text-white sm:text-[2.25rem]`,
  2: `${doto} m-0 text-xl text-white`,
  3: `${plex} m-0 text-sm font-semibold tracking-wider text-white`,
  4: `${plex} m-0 text-xs font-medium tracking-widest text-av-muted uppercase`,
}

export function Heading({ level = 2, className, ...props }: Props) {
  const Tag = `h${level}` as const
  return <Tag className={cx(LEVEL[level], className)} {...props} />
}
