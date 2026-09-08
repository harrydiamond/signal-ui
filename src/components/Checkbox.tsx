import type { InputHTMLAttributes } from 'react'
import { tv } from '../tv.ts'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string
}

const checkbox = tv({
  slots: {
    root: 'relative inline-flex cursor-pointer items-center gap-2.5',
    mark: "av-check-mark bg-av-surface-2 peer-checked:after:border-av-audio peer-focus-visible:outline-av-focus relative inline-block size-[1.125rem] shrink-0 rounded-sm transition-[background-color,box-shadow] duration-[90ms] ease-linear peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-checked:after:absolute peer-checked:after:top-0.5 peer-checked:after:left-1.5 peer-checked:after:h-2.5 peer-checked:after:w-1.5 peer-checked:after:rotate-45 peer-checked:after:border-r-2 peer-checked:after:border-b-2 peer-checked:after:content-['']",
    label:
      'font-body text-av-text text-sm font-medium tracking-wide [text-rendering:optimizeLegibility]',
  },
  variants: {
    disabled: {
      true: {
        root: 'cursor-not-allowed opacity-50',
      },
      false: {},
    },
  },
  defaultVariants: {
    disabled: false,
  },
})

export function Checkbox({ label, className, disabled, ...props }: Props) {
  const styles = checkbox({ disabled: Boolean(disabled) })

  return (
    <label className={styles.root({ className })}>
      <input
        type="checkbox"
        className="peer sr-only focus-visible:outline-none"
        disabled={disabled}
        {...props}
      />
      <span aria-hidden className={styles.mark()} />
      <span className={styles.label()}>{label}</span>
    </label>
  )
}
