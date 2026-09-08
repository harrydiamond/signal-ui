import {
  createContext,
  useContext,
  useId,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { cx } from '../cx.ts'
import { fieldLabel } from '../type.ts'

type ContextValue = {
  value: string
  onChange: (next: string) => void
}

const RadioGroupContext = createContext<ContextValue | null>(null)

export function useRadioGroup() {
  return useContext(RadioGroupContext)
}

type Props = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  label?: string
  children: ReactNode
}

/** Exclusive Choice chips with radio keyboard and ARIA. */
export function RadioGroup({
  value,
  defaultValue = '',
  onChange,
  label,
  className,
  onKeyDown,
  children,
  ...props
}: Props) {
  const labelId = useId()
  const [uncontrolled, setUncontrolled] = useState(defaultValue)
  const current = value ?? uncontrolled

  const setValue = (next: string) => {
    if (value === undefined) setUncontrolled(next)
    onChange?.(next)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event)
    if (event.defaultPrevented) return
    if (
      event.key !== 'ArrowLeft' &&
      event.key !== 'ArrowRight' &&
      event.key !== 'ArrowUp' &&
      event.key !== 'ArrowDown'
    ) {
      return
    }

    const radios = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        '[role="radio"]:not(:disabled)',
      ),
    )
    const index = radios.indexOf(document.activeElement as HTMLElement)
    if (index < 0 || radios.length === 0) return

    event.preventDefault()
    const delta =
      event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1
    const next = radios[(index + delta + radios.length) % radios.length]
    next.focus()
    const nextValue = next?.dataset.value
    if (nextValue) setValue(nextValue)
  }

  return (
    <RadioGroupContext.Provider value={{ value: current, onChange: setValue }}>
      <div className="flex flex-col gap-2.5">
        {label ? (
          <label id={labelId} className={fieldLabel}>
            {label}
          </label>
        ) : null}
        <div
          role="radiogroup"
          aria-labelledby={label ? labelId : undefined}
          className={cx('grid gap-2 sm:grid-cols-3', className)}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {children}
        </div>
      </div>
    </RadioGroupContext.Provider>
  )
}
