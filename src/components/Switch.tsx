import type { ButtonHTMLAttributes } from 'react'
import { tv } from '../tv.ts'

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> & {
  checked: boolean
  onCheckedChange?: (checked: boolean) => void
  label: string
}

const switchRoot = tv({
  base: "font-body text-av-text inline-flex items-center gap-2.5 border-0 bg-transparent p-0 [font-feature-settings:'tnum'_1] text-sm font-medium tracking-wide [font-variation-settings:normal] disabled:opacity-50",
})

const switchTrack = tv({
  base: 'relative inline-block h-5 w-9 shrink-0 rounded-full transition-[background-color,box-shadow] duration-[90ms] ease-linear motion-reduce:transition-none',
  variants: {
    checked: {
      true: 'av-switch-track-on',
      false: 'bg-av-surface-2',
    },
  },
})

const switchThumb = tv({
  base: 'absolute top-[0.1875rem] left-[0.1875rem] size-3.5 rounded-full transition-[transform,background-color] duration-[90ms] ease-linear motion-reduce:transition-none',
  variants: {
    checked: {
      true: 'bg-av-audio translate-x-4',
      false: 'bg-av-muted',
    },
  },
})

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
      className={switchRoot({ className })}
      {...props}
      onClick={event => {
        onClick?.(event)
        if (event.defaultPrevented || disabled) return
        onCheckedChange?.(!checked)
      }}
    >
      <span aria-hidden className={switchTrack({ checked })}>
        <span className={switchThumb({ checked })} />
      </span>
      <span>{label}</span>
    </button>
  )
}
