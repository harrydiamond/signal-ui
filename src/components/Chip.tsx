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
  sync: 'text-av-sync bg-[color-mix(in_srgb,var(--color-av-sync)_15%,transparent)]',
  audio:
    'text-av-audio bg-[color-mix(in_srgb,var(--color-av-audio)_15%,transparent)]',
  signal:
    'text-av-signal bg-[color-mix(in_srgb,var(--color-av-signal)_15%,transparent)]',
  meter:
    'text-av-meter bg-[color-mix(in_srgb,var(--color-av-meter)_15%,transparent)]',
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
  sync: 'border-[color-mix(in_srgb,var(--color-av-sync)_40%,transparent)]',
  audio: 'border-[color-mix(in_srgb,var(--color-av-audio)_40%,transparent)]',
  signal: 'border-[color-mix(in_srgb,var(--color-av-signal)_40%,transparent)]',
  meter: 'border-[color-mix(in_srgb,var(--color-av-meter)_40%,transparent)]',
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
