import type { InputHTMLAttributes } from 'react'
import { cx } from '../cx.ts'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string
}

export function Checkbox({ label, className, disabled, ...props }: Props) {
  return (
    <label
      className={cx(
        'relative inline-flex cursor-pointer items-center gap-2.5',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
    >
      <input
        type="checkbox"
        className="peer sr-only focus-visible:outline-none"
        disabled={disabled}
        {...props}
      />
      <span
        aria-hidden
        className="bg-av-surface-2 peer-checked:after:border-av-audio peer-focus-visible:outline-av-focus relative inline-block size-[1.125rem] shrink-0 rounded-sm transition-[background-color,box-shadow] duration-[90ms] ease-linear peer-checked:bg-[color-mix(in_srgb,var(--color-av-audio)_10%,var(--color-av-surface))] peer-checked:shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--color-av-audio)_25%,transparent)] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-checked:after:absolute peer-checked:after:top-0.5 peer-checked:after:left-1.5 peer-checked:after:h-2.5 peer-checked:after:w-1.5 peer-checked:after:rotate-45 peer-checked:after:border-r-2 peer-checked:after:border-b-2 peer-checked:after:content-['']"
      />
      <span className="font-body text-av-text [font-feature-settings:'tnum'_1] text-sm font-medium tracking-wide [font-variation-settings:normal]">
        {label}
      </span>
    </label>
  )
}
