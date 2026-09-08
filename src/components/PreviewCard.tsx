import type { HTMLAttributes, ReactNode } from 'react'
import type { VariantProps } from 'tailwind-variants'
import { AV_STAGGER_MS } from '../tokens.ts'
import { cx } from '../cx.ts'
import { tv } from '../tv.ts'

const previewCard = tv({
  base: 'group/preview shadow-av-card overflow-hidden rounded-xl',
  variants: {
    surface: {
      card: 'bg-av-surface/60',
      transparent: 'bg-transparent',
    },
    padded: {
      true: 'p-4 md:p-6',
      false: 'p-0',
    },
  },
  defaultVariants: {
    surface: 'card',
    padded: true,
  },
})

type Props = HTMLAttributes<HTMLElement> &
  VariantProps<typeof previewCard> & {
    children: ReactNode
    /** Stagger index for `animate-fade-in-up`. */
    index?: number
  }

/** Soft-elevation preview / media shell. */
export function PreviewCard({
  children,
  className,
  surface = 'card',
  padded = true,
  index,
  style,
  ...props
}: Props) {
  const animate = index !== undefined

  return (
    <article
      className={cx(
        previewCard({ surface, padded }),
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
      {children}
    </article>
  )
}
