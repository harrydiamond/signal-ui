import type { ReactNode } from 'react'
import { cx } from '../cx.ts'
import { plex } from '../type.ts'

type Props = {
  className?: string
  children?: ReactNode
}

export function SiteFooter({ className, children }: Props) {
  return (
    <footer
      className={cx(
        'text-av-muted border-av-hairline border-t bg-clip-content px-4 py-3 text-center text-[11px] sm:px-6',
        className,
      )}
    >
      <p className={plex}>{children}</p>
    </footer>
  )
}
