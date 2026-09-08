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
  base: `${body} bg-av-surface text-av-text border-av-hairline enabled:hover:bg-[color-mix(in_srgb,var(--av-muted)_8%,var(--av-surface))] data-[selected=true]:border-[color-mix(in_srgb,var(--av-audio)_45%,transparent)] data-[selected=true]:bg-[color-mix(in_srgb,var(--av-audio)_10%,var(--av-surface))] data-[selected=true]:shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--av-audio)_25%,transparent)] cursor-pointer rounded-lg border p-3 transition-[background-color,border-color,box-shadow] duration-90 disabled:cursor-not-allowed`,
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
