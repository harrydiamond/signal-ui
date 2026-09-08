import type { AnchorHTMLAttributes } from 'react'
import { cx } from '../cx.ts'

type Props = AnchorHTMLAttributes<HTMLAnchorElement>

/** Theme-colored text link. Underlined so it stays distinguishable in body copy. */
export function Link({ className, ...props }: Props) {
  return (
    <a
      className={cx(
        'av-link text-av-signal underline underline-offset-2 hover:text-av-link-hover',
        className,
      )}
      {...props}
    />
  )
}
