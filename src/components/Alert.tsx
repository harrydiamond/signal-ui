import type { ReactNode } from 'react'
import { cx } from '../cx.ts'

export type AlertTone = 'info' | 'success' | 'warning' | 'error'

const TONE_BAR: Record<AlertTone, string> = {
  info: 'before:bg-av-sync',
  success: 'before:bg-av-audio',
  warning: 'before:bg-av-meter',
  error: 'before:bg-av-danger',
}

const TONE_TITLE: Record<AlertTone, string> = {
  info: 'text-av-sync',
  success: 'text-av-audio',
  warning: 'text-av-meter',
  error: 'text-av-danger',
}

type Props = {
  tone?: AlertTone
  title?: string
  children: ReactNode
  onDismiss?: () => void
  className?: string
}

export function Alert({
  tone = 'info',
  title,
  children,
  onDismiss,
  className,
}: Props) {
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={cx(
        'bg-av-surface relative flex items-start gap-3 overflow-hidden rounded-lg px-3.5 py-3 before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:content-[""]',
        TONE_BAR[tone],
        className,
      )}
    >
      <div className="min-w-0 flex-1">
        {title ? (
          <p
            className={cx(
              'm-0 text-sm font-bold tracking-wider',
              TONE_TITLE[tone],
            )}
          >
            {title}
          </p>
        ) : null}
        <div
          className={cx('text-av-text text-sm leading-snug', title && 'mt-0.5')}
        >
          {children}
        </div>
      </div>
      {onDismiss ? (
        <button
          type="button"
          className="shrink-0 rounded-sm border-0 bg-transparent px-1.5 py-0.5 text-xs font-medium text-inherit opacity-70 hover:opacity-100"
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          Close
        </button>
      ) : null}
    </div>
  )
}
