import type { AnchorHTMLAttributes } from 'react'
import { cx } from '../cx.ts'

type Props = AnchorHTMLAttributes<HTMLAnchorElement>

/** Mono uppercase ← back / breadcrumb link. */
export function BackLink({ className, children, ...props }: Props) {
  return (
    <a
      className={cx(
        'text-av-muted hover:text-av-ink mb-6 inline-block font-mono text-[10px] tracking-[1px] uppercase no-underline transition-colors',
        className,
      )}
      {...props}
    >
      ← {children}
    </a>
  )
}
