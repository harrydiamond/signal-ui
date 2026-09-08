import type { ReactNode } from 'react'
import { tv } from '../tv.ts'

export type AlertTone = 'info' | 'success' | 'warning' | 'error'

type Props = {
  tone?: AlertTone
  title?: string
  children: ReactNode
  onDismiss?: () => void
  className?: string
}

const alert = tv({
  slots: {
    root: 'bg-av-surface relative flex items-start gap-3 overflow-hidden rounded-lg px-3.5 py-3 before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:content-[""]',
    title: 'm-0 text-sm font-bold tracking-wider',
    body: 'text-av-text text-sm leading-snug',
  },
  variants: {
    tone: {
      info: {
        root: 'before:bg-av-sync',
        title: 'text-av-sync',
      },
      success: {
        root: 'before:bg-av-audio',
        title: 'text-av-audio',
      },
      warning: {
        root: 'before:bg-av-meter',
        title: 'text-av-meter',
      },
      error: {
        root: 'before:bg-av-danger',
        title: 'text-av-danger',
      },
    },
    hasTitle: {
      true: {
        body: 'mt-0.5',
      },
      false: {},
    },
  },
  defaultVariants: {
    tone: 'info',
    hasTitle: false,
  },
})

export function Alert({
  tone = 'info',
  title,
  children,
  onDismiss,
  className,
}: Props) {
  const styles = alert({ tone, hasTitle: Boolean(title) })

  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={styles.root({ className })}
    >
      <div className="min-w-0 flex-1">
        {title ? <p className={styles.title()}>{title}</p> : null}
        <div className={styles.body()}>{children}</div>
      </div>
      {onDismiss ? (
        <button
          type="button"
          className="text-av-text shrink-0 rounded-sm border-0 bg-transparent px-1.5 py-0.5 text-xs font-medium opacity-90 hover:opacity-100"
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          Close
        </button>
      ) : null}
    </div>
  )
}
