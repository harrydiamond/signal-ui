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
        'bg-av-surface text-av-text cursor-pointer rounded-lg border border-transparent p-3 transition-[background-color,border-color,box-shadow] duration-90 enabled:hover:bg-[color-mix(in_srgb,var(--color-av-muted)_8%,var(--color-av-surface))] disabled:cursor-not-allowed data-[selected]:border-[color-mix(in_srgb,var(--color-av-audio)_45%,transparent)] data-[selected]:bg-[color-mix(in_srgb,var(--color-av-audio)_10%,var(--color-av-surface))] data-[selected]:shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--color-av-audio)_25%,transparent)]',
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
