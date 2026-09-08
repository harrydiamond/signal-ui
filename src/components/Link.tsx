import type { AnchorHTMLAttributes } from 'react'
import { cx } from '../cx.ts'

type Props = AnchorHTMLAttributes<HTMLAnchorElement>

/** Theme-colored text link. Hover uses `--av-link-hover` (phosphor-bright / signal-hot). */
export function Link({ className, ...props }: Props) {
  return (
    <a
      className={cx(
        'av-link text-av-signal hover:text-av-link-hover',
        className,
      )}
      {...props}
    />
  )
}
