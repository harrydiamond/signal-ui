import { cx } from '../cx.ts'
import { tv } from '../tv.ts'

export type SpinnerSize = 'sm' | 'md' | 'lg'

type Props = {
  size?: SpinnerSize
  label?: string
  className?: string
}

const spinnerDisc = tv({
  base: 'av-spinner-disc block shrink-0 animate-spin rounded-full motion-reduce:animate-none',
  variants: {
    size: {
      sm: 'size-4',
      md: 'size-6',
      lg: 'size-9',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export function Spinner({ size = 'md', label = 'Loading', className }: Props) {
  return (
    <span
      className={cx('relative inline-flex align-middle', className)}
      role="status"
    >
      <span aria-hidden className={spinnerDisc({ size })} />
      <span className="sr-only">{label}</span>
    </span>
  )
}
