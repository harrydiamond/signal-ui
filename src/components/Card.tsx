import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../cx.ts'
import { plex } from '../type.ts'

type CardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode
}

export function Card({ className, ...props }: CardProps) {
  return (
    <section
      className={cx(
        plex,
        'bg-av-surface border-av-hairline overflow-hidden rounded-lg border',
        className,
      )}
      {...props}
    />
  )
}

export function CardBody({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cx('px-4 py-6 sm:px-5 sm:py-8', className)} {...props} />
  )
}

export function CardFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cx(
        'border-av-hairline bg-av-surface-2 border-t px-4 py-6 text-center sm:px-5',
        className,
      )}
      {...props}
    />
  )
}
