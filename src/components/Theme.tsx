import type { HTMLAttributes } from 'react'
import { cx } from '../cx.ts'
import { plex } from '../type.ts'

export type ThemeName = 'dark' | 'editorial'

type Props = HTMLAttributes<HTMLDivElement> & {
  asPage?: boolean
  /** Palette assignment. `dark` is phosphor console; `editorial` follows system light/dark. */
  theme?: ThemeName
}

/** Applies kit atmosphere, type, and focus rules. */
export function Theme({
  asPage = false,
  theme = 'dark',
  className,
  children,
  ...props
}: Props) {
  return (
    <div
      className={cx(
        'av-theme',
        plex,
        'text-av-text relative isolate [line-height:1.55] [&_button:disabled]:cursor-not-allowed [&_button:not(:disabled)]:cursor-pointer',
        theme === 'dark' ? 'scheme-dark' : 'scheme-light dark:scheme-dark',
        asPage && 'flex min-h-dvh flex-col',
        className,
      )}
      data-av-theme={theme}
      {...props}
    >
      {children}
    </div>
  )
}
