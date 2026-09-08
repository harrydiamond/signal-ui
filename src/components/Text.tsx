import type { HTMLAttributes } from 'react'
import { cx } from '../cx.ts'
import { heading, ledHot, ledText, meta, prose, proseMuted } from '../type.ts'

type Props = HTMLAttributes<HTMLParagraphElement>

export function Prose({ className, ...props }: Props) {
  return <p className={cx(prose, className)} {...props} />
}

export function ProseMuted({ className, ...props }: Props) {
  return <p className={cx(proseMuted, className)} {...props} />
}

export function Meta({ className, ...props }: Props) {
  return <p className={cx(meta, className)} {...props} />
}

export function LedText({
  className,
  hot = false,
  ...props
}: Props & { hot?: boolean }) {
  return (
    <p className={cx(heading, hot ? ledHot : ledText, className)} {...props} />
  )
}
