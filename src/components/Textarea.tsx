import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cx } from '../cx.ts'
import { plex } from '../type.ts'

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  function Textarea({ className, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={cx(
          plex,
          'bg-av-surface-2 text-av-text min-h-24 w-full resize-y rounded-lg border border-transparent p-3 text-sm transition-colors duration-90',
          className,
        )}
        {...props}
      />
    )
  },
)
