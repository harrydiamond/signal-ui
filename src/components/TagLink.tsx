import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { AV_STAGGER_MS } from '../tokens.ts'
import { cx } from '../cx.ts'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
  /** Optional stagger index for `animate-fade-in-up`. */
  index?: number
  symbol?: string | null
}

/** Soft-elevation tag / chip link. */
export function TagLink({
  children,
  className,
  index,
  symbol = '#',
  style,
  ...props
}: Props) {
  const animate = index !== undefined

  return (
    <a
      className={cx(
        'bg-av-surface text-av-ink hover:bg-av-surface-2 shadow-av-card rounded-lg px-3 py-2 align-baseline font-mono text-xs leading-none no-underline transition-colors duration-100',
        animate && 'motion-safe:animate-fade-in-up motion-safe:opacity-0',
        className,
      )}
      style={{
        ...(animate
          ? { animationDelay: `${index * AV_STAGGER_MS}ms` }
          : undefined),
        ...style,
      }}
      {...props}
    >
      {symbol ? (
        <span className="text-av-muted mr-1" aria-hidden>
          {symbol}
        </span>
      ) : null}
      {children}
    </a>
  )
}
