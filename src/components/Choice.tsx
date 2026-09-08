import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cx } from '../cx.ts'
import { plex } from '../type.ts'
import { useChoiceGroup } from './ChoiceGroup.tsx'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean
  value?: string
  children: ReactNode
}

export function Choice({
  selected = false,
  value,
  className,
  type = 'button',
  onClick,
  children,
  ...props
}: Props) {
  const group = useChoiceGroup()
  const isSelected = group && value != null ? group.value === value : selected
  const isRadio = group?.kind === 'radio'

  return (
    <button
      {...props}
      type={type}
      role={isRadio ? 'radio' : undefined}
      aria-checked={isRadio ? isSelected : undefined}
      aria-pressed={isRadio ? undefined : isSelected}
      data-selected={isSelected ? 'true' : undefined}
      data-value={value}
      className={cx(
        plex,
        'av-choice bg-av-surface text-av-text cursor-pointer rounded-lg border border-transparent p-3 transition-[background-color,border-color,box-shadow] duration-90 disabled:cursor-not-allowed',
        className,
      )}
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
