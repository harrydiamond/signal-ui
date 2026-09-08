import type { ReactNode } from 'react'
import { body, proseMuted } from '../type.ts'
import { tv } from '../tv.ts'
import { cx } from '../cx.ts'

export type ChipTone = 'sync' | 'audio' | 'signal' | 'meter'

type ChipProps = {
  tone?: ChipTone
  className?: string
  children: ReactNode
}

const chip = tv({
  base: `${body} inline-flex items-center self-start rounded-md px-2 py-0.5 text-xs`,
  variants: {
    tone: {
      sync: 'text-av-sync bg-av-sync/15',
      audio: 'text-av-audio bg-av-audio/15',
      signal: 'text-av-signal bg-av-signal/15',
      meter: 'text-av-meter bg-av-meter/15',
    },
  },
  defaultVariants: {
    tone: 'signal',
  },
})

export function Chip({ tone = 'signal', className, children }: ChipProps) {
  return <span className={chip({ tone, className })}>{children}</span>
}

export type ChipCardProps = {
  /** Channel accent — matches the embedded Chip. */
  tone?: ChipTone
  /** Primary line under the chip. */
  title: string
  /** Optional caption under the title. */
  description?: string
  /** Label rendered inside the Chip. Defaults to "Chip". */
  chip?: string
  className?: string
}

const chipCard = tv({
  base: 'av-chip-card bg-av-surface-2 rounded-lg border p-3',
  variants: {
    tone: {
      sync: 'border-av-sync/40',
      audio: 'border-av-audio/40',
      signal: 'border-av-signal/40',
      meter: 'border-av-meter/40',
    },
  },
  defaultVariants: {
    tone: 'signal',
  },
})

export function ChipCard({
  tone = 'signal',
  title,
  description,
  chip: chipLabel = 'Chip',
  className,
}: ChipCardProps) {
  return (
    <div className={chipCard({ tone, className })}>
      <Chip tone={tone}>{chipLabel}</Chip>
      <p className="text-av-ink mt-2.5 mb-0 text-sm font-medium">{title}</p>
      {description ? (
        <p className={cx(proseMuted, 'mt-1 max-w-none')}>{description}</p>
      ) : null}
    </div>
  )
}
