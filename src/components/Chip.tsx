import type { ReactNode } from 'react'
import { cx } from '../cx.ts'
import { plex, proseMuted } from '../type.ts'

export type ChipTone = 'sync' | 'audio' | 'signal' | 'meter'

type ChipProps = {
  tone?: ChipTone
  className?: string
  children: ReactNode
}

const TONE: Record<ChipTone, string> = {
  sync: 'text-av-sync bg-av-sync/15',
  audio: 'text-av-audio bg-av-audio/15',
  signal: 'text-av-signal bg-av-signal/15',
  meter: 'text-av-meter bg-av-meter/15',
}

export function Chip({ tone = 'signal', className, children }: ChipProps) {
  return (
    <span
      className={cx(
        plex,
        'inline-flex items-center self-start rounded-md px-2 py-0.5 text-xs',
        TONE[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

type ChipCardProps = {
  tone?: ChipTone
  title: string
  description?: string
  chip?: string
  className?: string
}

const CARD_TONE: Record<ChipTone, string> = {
  sync: 'border-av-sync/40',
  audio: 'border-av-audio/40',
  signal: 'border-av-signal/40',
  meter: 'border-av-meter/40',
}

export function ChipCard({
  tone = 'signal',
  title,
  description,
  chip = 'Chip',
  className,
}: ChipCardProps) {
  return (
    <div
      className={cx(
        'bg-av-surface-2 rounded-lg border p-3',
        CARD_TONE[tone],
        className,
      )}
    >
      <Chip tone={tone}>{chip}</Chip>
      <p className="mt-2.5 mb-0 text-sm font-medium text-white">{title}</p>
      {description ? (
        <p className={cx(proseMuted, 'mt-1 max-w-none')}>{description}</p>
      ) : null}
    </div>
  )
}
