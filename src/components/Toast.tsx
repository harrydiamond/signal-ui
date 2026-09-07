import { useEffect } from 'react'
import { cx } from '../cx.ts'

type Props = {
  message: string
  tone?: 'success' | 'error'
  onDismiss: () => void
  className?: string
  durationMs?: number
}

export function Toast({
  message,
  tone = 'success',
  onDismiss,
  className,
  durationMs = 3200,
}: Props) {
  useEffect(() => {
    if (durationMs <= 0) return
    const id = window.setTimeout(onDismiss, durationMs)
    return () => window.clearTimeout(id)
  }, [message, tone, durationMs, onDismiss])

  return (
    <div
      role="status"
      aria-live={tone === 'error' ? 'assertive' : 'polite'}
      className={cx(
        'bg-av-surface fixed right-4 bottom-4 z-50 flex max-w-[min(24rem,calc(100vw-2rem))] items-start gap-3 rounded-lg px-3.5 py-3 text-sm shadow-lg shadow-black/40',
        tone === 'success' ? 'text-av-audio' : 'text-av-danger',
        className,
      )}
    >
      <p className="m-0 min-w-0 flex-1 leading-snug">{message}</p>
      <button
        type="button"
        onClick={onDismiss}
        className="shrink-0 rounded border-0 bg-transparent px-1.5 py-0.5 text-xs font-medium text-inherit opacity-70 hover:opacity-100"
        aria-label="Dismiss"
      >
        Close
      </button>
    </div>
  )
}
