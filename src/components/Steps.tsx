import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
} from 'react'
import { cx } from '../cx.ts'
import { plex } from '../type.ts'
import { tv } from '../tv.ts'

type StepsContextValue = {
  value: string
  setValue: (next: string) => void
}

const StepsContext = createContext<StepsContextValue | null>(null)

function useSteps() {
  const ctx = useContext(StepsContext)
  if (!ctx) {
    throw new Error('Step must be used inside Steps')
  }
  return ctx
}

type StepsProps = Omit<HTMLAttributes<HTMLOListElement>, 'onChange'> & {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  label?: string
  children: ReactNode
}

const list = tv({
  base: 'm-0 flex list-none flex-wrap gap-1 p-0 sm:gap-2',
})

export function Steps({
  value,
  defaultValue = '',
  onChange,
  label = 'Steps',
  className,
  children,
  onKeyDown,
  ...props
}: StepsProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue)
  const current = value ?? uncontrolled

  const setValue = (next: string) => {
    if (value === undefined) setUncontrolled(next)
    onChange?.(next)
  }

  const items = Children.toArray(children).filter(isValidElement)
  const total = items.length

  const handleKeyDown = (event: KeyboardEvent<HTMLOListElement>) => {
    onKeyDown?.(event)
    if (event.defaultPrevented) return
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return

    const buttons = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        '[data-step-value]:not(:disabled)',
      ),
    )
    const index = buttons.indexOf(document.activeElement as HTMLElement)
    if (index < 0 || buttons.length === 0) return

    event.preventDefault()
    const delta = event.key === 'ArrowRight' ? 1 : -1
    const next = buttons[(index + delta + buttons.length) % buttons.length]
    next?.focus()
    const nextValue = next?.dataset.stepValue
    if (nextValue) setValue(nextValue)
  }

  return (
    <StepsContext.Provider value={{ value: current, setValue }}>
      <ol
        aria-label={label}
        className={list({ className })}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {items.map((child, index) =>
          cloneElement(child as ReactElement<StepInjectedProps>, {
            index: index + 1,
            total,
          }),
        )}
      </ol>
    </StepsContext.Provider>
  )
}

type StepProps = {
  value: string
  label: string
  complete?: boolean
  disabled?: boolean
  className?: string
}

type StepInjectedProps = StepProps & {
  index?: number
  total?: number
}

const stepButton = tv({
  base: `${plex} av-step flex min-w-0 flex-1 cursor-pointer flex-col items-center gap-1.5 border-0 bg-transparent px-1 py-1 text-[0.6875rem] font-medium tracking-wider uppercase disabled:cursor-not-allowed disabled:opacity-50`,
})

export function Step({
  value,
  label,
  complete = false,
  disabled = false,
  className,
  index = 0,
  total = 0,
}: StepInjectedProps) {
  const { value: current, setValue } = useSteps()
  const selected = current === value
  const name = [
    label,
    total > 0 ? `step ${index} of ${total}` : null,
    complete ? 'complete' : null,
  ]
    .filter(Boolean)
    .join(', ')

  return (
    <li className="min-w-0 flex-1">
      <button
        type="button"
        aria-label={name}
        aria-current={selected ? 'step' : undefined}
        data-step-value={value}
        data-complete={complete || undefined}
        disabled={disabled}
        tabIndex={selected ? 0 : -1}
        className={stepButton({ className })}
        onClick={() => {
          if (!disabled) setValue(value)
        }}
      >
        <span
          aria-hidden
          className={cx(
            'grid size-7 place-items-center rounded-full text-xs font-medium',
            'av-step-index',
          )}
        >
          {index}
        </span>
        <span className="truncate">{label}</span>
      </button>
    </li>
  )
}
