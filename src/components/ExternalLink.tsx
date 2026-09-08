import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { cx } from '../cx.ts'

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string
  children: ReactNode
}

/** Soft-elevation external pill link with trailing ↗. */
export function ExternalLink({ href, children, className, ...props }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cx(
        'group/ext shadow-av-card bg-av-surface text-av-ink hover:bg-av-surface-2 inline-flex w-fit shrink-0 items-center justify-center gap-2 rounded-full px-3 py-2 align-baseline text-sm leading-none no-underline transition-colors duration-100',
        className,
      )}
      {...props}
    >
      {children}
      <span
        className="text-av-muted transition-all group-hover/ext:ml-2"
        aria-hidden
      >
        ↗
      </span>
    </a>
  )
}
