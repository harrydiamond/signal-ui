import type { HTMLAttributes, LiHTMLAttributes, OlHTMLAttributes } from 'react'
import { cx } from '../cx.ts'
import { ledText, body } from '../type.ts'

type ListProps = OlHTMLAttributes<HTMLUListElement>

export function List({ className, ...props }: ListProps) {
  return (
    <ul
      className={cx(
        'av-list bg-av-surface border-av-hairline m-0 list-none overflow-hidden rounded-lg border p-0',
        className,
      )}
      {...props}
    />
  )
}

type RowProps = LiHTMLAttributes<HTMLLIElement> & {
  label: string
  value?: string
}

export function ListRow({
  label,
  value,
  className,
  children,
  ...props
}: RowProps) {
  return (
    <li
      className={cx(
        'border-av-hairline flex items-center justify-between gap-3 border-b p-3 last:border-b-0',
        className,
      )}
      {...props}
    >
      <span className="text-av-text min-w-0 text-sm">{label}</span>
      {value ? (
        <span className={cx(body, ledText, 'shrink-0 text-sm')}>{value}</span>
      ) : (
        children
      )}
    </li>
  )
}

export function Divider({
  className,
  ...props
}: HTMLAttributes<HTMLHRElement>) {
  return (
    <hr
      className={cx('border-av-hairline m-0 border-0 border-t', className)}
      {...props}
    />
  )
}
