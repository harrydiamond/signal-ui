import {
  createContext,
  useContext,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { cx } from '../cx.ts'

export type ChoiceGroupKind = 'choice' | 'radio'

type ContextValue = {
  value: string
  onChange: (next: string) => void
  kind: ChoiceGroupKind
}

const ChoiceGroupContext = createContext<ContextValue | null>(null)

export function useChoiceGroup() {
  return useContext(ChoiceGroupContext)
}

type GroupProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  label?: string
  children: ReactNode
}

function Group({
  kind,
  value,
  defaultValue = '',
  onChange,
  label,
  className,
  onKeyDown,
  children,
  ...props
}: GroupProps & { kind: ChoiceGroupKind }) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue)
  const current = value ?? uncontrolled

  const setValue = (next: string) => {
    if (value === undefined) setUncontrolled(next)
    onChange?.(next)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event)
    if (event.defaultPrevented || kind !== 'radio') return
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
    const nextValue = next.dataset.value
    if (nextValue) setValue(nextValue)
  }

  return (
    <ChoiceGroupContext.Provider
      value={{ value: current, onChange: setValue, kind }}
    >
      <div
        role={kind === 'radio' ? 'radiogroup' : 'group'}
        aria-label={label}
        className={cx('grid gap-2 sm:grid-cols-3', className)}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    </ChoiceGroupContext.Provider>
  )
}

/** Exclusive Choice chips as toggle buttons. */
export function ChoiceGroup(props: GroupProps) {
  return <Group kind="choice" {...props} />
}

/** Exclusive Choice chips with radio keyboard and ARIA. */
export function RadioGroup(props: GroupProps) {
  return <Group kind="radio" {...props} />
}
