import type { ButtonHTMLAttributes } from 'react'
import { cx } from '../cx.ts'

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> & {
  checked: boolean
  onCheckedChange?: (checked: boolean) => void
  label: string
}

export function Switch({
  checked,
  onCheckedChange,
  label,
  className,
  type = 'button',
  disabled,
  onClick,
  ...props
}: Props) {
  return (
    <button
      type={type}
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      className={cx(
        "font-body text-av-text inline-flex items-center gap-2.5 border-0 bg-transparent p-0 [font-feature-settings:'tnum'_1] text-sm font-medium tracking-wide [font-variation-settings:normal] disabled:opacity-50",
        className,
      )}
      {...props}
      onClick={event => {
        onClick?.(event)
        if (event.defaultPrevented || disabled) return
        onCheckedChange?.(!checked)
      }}
    >
      <span
        aria-hidden
        className={cx(
          'relative inline-block h-5 w-9 shrink-0 rounded-full transition-[background-color,box-shadow] duration-[90ms] ease-linear motion-reduce:transition-none',
          checked
            ? 'bg-[color-mix(in_srgb,var(--color-av-audio)_10%,var(--color-av-surface))] shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--color-av-audio)_25%,transparent)]'
            : 'bg-av-surface-2',
        )}
      >
        <span
          className={cx(
            'absolute top-[0.1875rem] left-[0.1875rem] size-3.5 rounded-full transition-[transform,background-color] duration-[90ms] ease-linear motion-reduce:transition-none',
            checked ? 'bg-av-audio translate-x-4' : 'bg-av-muted',
          )}
        />
      </span>
      <span>{label}</span>
    </button>
  )
}
