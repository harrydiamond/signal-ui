import { forwardRef, type InputHTMLAttributes } from 'react'
import { cx } from '../cx.ts'
import { body } from '../type.ts'

type Props = InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cx(
        body,
        'bg-av-surface-2 text-av-text h-11 w-full rounded-lg border border-transparent px-3 text-base transition-colors duration-90',
        className,
      )}
      {...props}
    />
  )
})
