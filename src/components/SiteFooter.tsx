import type { ReactNode } from 'react'
import { cx } from '../cx.ts'
import { body } from '../type.ts'

type Props = {
  className?: string
  /** Simple centered copyright/meta (legacy). Ignored when slot props are set. */
  children?: ReactNode
  brand?: ReactNode
  links?: ReactNode
  copyright?: ReactNode
}

/** Site footer — simple children, or brand / links / copyright slots. */
export function SiteFooter({
  className,
  children,
  brand,
  links,
  copyright,
}: Props) {
  const slotted = brand != null || links != null || copyright != null

  return (
    <footer
      className={cx(
        'av-site-footer text-av-muted border-av-hairline border-t bg-clip-content',
        slotted ? 'px-6 py-8' : 'px-4 py-3 text-center text-[11px] sm:px-6',
        className,
      )}
    >
      {slotted ? (
        <div className="mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
          {brand ? (
            <div className="flex items-center gap-3">{brand}</div>
          ) : null}
          {links ? (
            <div className="flex flex-wrap items-center justify-center gap-6">
              {links}
            </div>
          ) : null}
          {copyright ? (
            <div className={cx(body, 'text-[11px]')}>{copyright}</div>
          ) : null}
        </div>
      ) : (
        <p className={body}>{children}</p>
      )}
    </footer>
  )
}
