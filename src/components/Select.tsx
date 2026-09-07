import { forwardRef, type SelectHTMLAttributes } from 'react'
import { cx } from '../cx.ts'
import { plex } from '../type.ts'

type Props = SelectHTMLAttributes<HTMLSelectElement>

export const Select = forwardRef<HTMLSelectElement, Props>(function Select(
  { className, ...props },
  ref,
) {
  return (
    <select
      ref={ref}
      className={cx(
        plex,
        'bg-av-surface-2 text-av-text h-11 w-full rounded-lg border border-transparent px-3 text-base transition-colors duration-90',
        className,
      )}
      {...props}
    />
  )
})
