import type { AnchorHTMLAttributes } from 'react'
import { cx } from '../cx.ts'

type Props = AnchorHTMLAttributes<HTMLAnchorElement>

export function Link({ className, ...props }: Props) {
  return (
    <a
      className={cx('text-av-signal hover:text-av-phosphor-bright', className)}
      {...props}
    />
  )
}
