import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../cx.ts'
import { MetaLabel } from './MetaLabel.tsx'
import { PulseDot } from './PulseDot.tsx'

type Props = HTMLAttributes<HTMLDivElement> & {
  title: string
  /** Optional trailing action (e.g. “View all” link). */
  action?: ReactNode
  pulse?: boolean
}

/** Section title row with accent micro-label and optional action. */
export function SectionHeader({
  title,
  action,
  pulse = false,
  className,
  children,
  ...props
}: Props) {
  return (
    <div
      className={cx('mb-4 flex w-full items-center justify-between', className)}
      {...props}
    >
      <h2 className="m-0 inline-flex items-center gap-2">
        <PulseDot pulse={pulse} />
        <MetaLabel tone="accent">{title}</MetaLabel>
      </h2>
      {action ?? children}
    </div>
  )
}
