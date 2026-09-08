import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { body } from '../type.ts'
import { tv } from '../tv.ts'
import { useRadioGroup } from './RadioGroup.tsx'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean
  value?: string
  children: ReactNode
}

const choice = tv({
  base: `${body} av-choice bg-av-surface text-av-text cursor-pointer rounded-lg border border-av-hairline p-3 transition-[background-color,border-color,box-shadow] duration-90 disabled:cursor-not-allowed`,
})

export function Choice({
  selected = false,
  value,
  className,
  type = 'button',
  onClick,
  children,
  ...props
}: Props) {
  const group = useRadioGroup()
  const isSelected = group && value != null ? group.value === value : selected
  const inGroup = Boolean(group)

  return (
    <button
      {...props}
      type={type}
      role={inGroup ? 'radio' : undefined}
      aria-checked={inGroup ? isSelected : undefined}
      aria-pressed={inGroup ? undefined : isSelected}
      data-selected={isSelected ? 'true' : undefined}
      data-value={value}
      className={choice({ className })}
      onClick={event => {
        onClick?.(event)
        if (!event.defaultPrevented && group && value != null) {
          group.onChange(value)
        }
      }}
    >
      {children}
    </button>
  )
}
