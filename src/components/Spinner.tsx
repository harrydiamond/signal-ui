import { cx } from '../cx.ts'

export type SpinnerSize = 'sm' | 'md' | 'lg'

const SIZE: Record<SpinnerSize, string> = {
  sm: 'size-4',
  md: 'size-6',
  lg: 'size-9',
}

type Props = {
  size?: SpinnerSize
  label?: string
  className?: string
}

export function Spinner({ size = 'md', label = 'Loading', className }: Props) {
  return (
    <span
      className={cx('relative inline-flex align-middle', className)}
      role="status"
    >
      <span
        aria-hidden
        className={cx(
          'block shrink-0 animate-spin rounded-full bg-[conic-gradient(from_0deg,var(--color-av-sync),var(--color-av-signal),transparent_72%)] [mask-image:radial-gradient(farthest-side,transparent_calc(100%-2px),#000_calc(100%-1.5px))] [-webkit-mask-image:radial-gradient(farthest-side,transparent_calc(100%-2px),#000_calc(100%-1.5px))] motion-reduce:animate-none',
          SIZE[size],
        )}
      />
      <span className="sr-only">{label}</span>
    </span>
  )
}
