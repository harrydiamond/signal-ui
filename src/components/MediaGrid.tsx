import { Children, type HTMLAttributes, type ReactNode } from 'react'
import { AV_STAGGER_MS } from '../tokens.ts'
import { cx } from '../cx.ts'
import { tv } from '../tv.ts'

export type MediaGridLayout = 'grid' | 'compact'

const mediaGrid = tv({
  base: 'm-0 grid list-none p-0',
  variants: {
    layout: {
      grid: 'grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4',
      compact:
        'grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10',
    },
  },
  defaultVariants: {
    layout: 'grid',
  },
})

type Props = HTMLAttributes<HTMLUListElement> & {
  children: ReactNode
  /**
   * `grid` — Gallery / all-images (2 / 3 / 4 columns).
   * `compact` — denser thumb strip. Not masonry.
   */
  layout?: MediaGridLayout
  /** Stagger `animate-fade-in-up` on each item. */
  stagger?: boolean
}

/**
 * Responsive media grid for Gallery-style pages.
 * Compose with `MediaFigure` — not a second card or chip system.
 */
export function MediaGrid({
  children,
  className,
  layout = 'grid',
  stagger = false,
  ...props
}: Props) {
  return (
    <ul className={cx(mediaGrid({ layout }), className)} {...props}>
      {Children.map(children, (child, index) => (
        <li
          className={cx(
            'group min-w-0',
            stagger && 'motion-safe:animate-fade-in-up motion-safe:opacity-0',
          )}
          style={
            stagger
              ? { animationDelay: `${index * AV_STAGGER_MS}ms` }
              : undefined
          }
        >
          {child}
        </li>
      ))}
    </ul>
  )
}
