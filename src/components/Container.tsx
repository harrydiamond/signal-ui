import type { HTMLAttributes } from 'react'
import { cx } from '../cx.ts'

type Width = 'default' | 'wide' | 'wider'

type Props = HTMLAttributes<HTMLDivElement> & {
  width?: Width
}

const WIDTH_CLASS: Record<Width, string> = {
  default: 'max-w-3xl',
  wide: 'max-w-5xl',
  wider: 'max-w-7xl',
}

export function Container({ width = 'default', className, ...props }: Props) {
  return (
    <div
      className={cx(
        'mx-auto w-full px-4 py-5 sm:px-6 sm:py-12',
        WIDTH_CLASS[width],
        className,
      )}
      {...props}
    />
  )
}

export function Stack({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cx('flex flex-col gap-8 sm:gap-10', className)}
      {...props}
    />
  )
}
