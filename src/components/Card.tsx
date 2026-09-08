import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../cx.ts'
import { body } from '../type.ts'

type CardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode
}

export function Card({ className, ...props }: CardProps) {
  return (
    <section
      className={cx(
        body,
        'av-card bg-av-surface border-av-hairline overflow-hidden rounded-lg border [&>.av-list]:rounded-none [&>.av-list]:border-x-0 [&>.av-list]:border-b-0',
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
