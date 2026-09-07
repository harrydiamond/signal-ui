import {
  createContext,
  useContext,
  useId,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { cx } from '../cx.ts'

type TabsContextValue = {
  value: string
  setValue: (value: string) => void
  baseId: string
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabs() {
  const ctx = useContext(TabsContext)
  if (!ctx) {
    throw new Error('TabList, Tab, and TabPanel must be used inside Tabs')
  }
  return ctx
}

type TabsProps = {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  children: ReactNode
  className?: string
}

export function Tabs({
  value,
  defaultValue = '',
  onChange,
  children,
  className,
}: TabsProps) {
  const baseId = useId()
  const [uncontrolled, setUncontrolled] = useState(defaultValue)
  const current = value ?? uncontrolled

  const setValue = (next: string) => {
    if (value === undefined) setUncontrolled(next)
    onChange?.(next)
  }

  return (
    <TabsContext.Provider value={{ value: current, setValue, baseId }}>
      <div className={cx(className)}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabList({
  className,
  onKeyDown,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { setValue } = useTabs()

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event)
    if (event.defaultPrevented) return
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return

    const tabs = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        '[role="tab"]:not(:disabled)',
      ),
    )
    const index = tabs.indexOf(document.activeElement as HTMLElement)
    if (index < 0 || tabs.length === 0) return

    event.preventDefault()
    const delta = event.key === 'ArrowRight' ? 1 : -1
    const next = tabs[(index + delta + tabs.length) % tabs.length]
    next?.focus()
    const tabValue = next?.dataset.tabValue
    if (tabValue) setValue(tabValue)
  }

  return (
    <div
      role="tablist"
      className={cx('border-av-hairline flex flex-wrap border-b', className)}
      {...props}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  )
}

type TabProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string
}

export function Tab({
  value,
  className,
  children,
  disabled,
  onClick,
  type = 'button',
  ...props
}: TabProps) {
  const { value: current, setValue, baseId } = useTabs()
  const selected = current === value

  return (
    <button
      type={type}
      role="tab"
      id={`${baseId}-tab-${value}`}
      aria-controls={`${baseId}-panel-${value}`}
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      disabled={disabled}
      data-tab-value={value}
      className={cx(
        "font-body text-av-muted hover:enabled:text-av-text aria-selected:border-av-signal aria-selected:text-av-signal -mb-px border-0 border-b-2 border-transparent bg-transparent px-3 py-2.5 [font-feature-settings:'tnum'_1] text-[0.6875rem] font-medium tracking-wider uppercase [font-variation-settings:normal] disabled:opacity-50",
        className,
      )}
      {...props}
      onClick={event => {
        onClick?.(event)
        if (event.defaultPrevented || disabled) return
        setValue(value)
      }}
    >
      {children}
    </button>
  )
}

type TabPanelProps = HTMLAttributes<HTMLDivElement> & {
  value: string
}

export function TabPanel({
  value,
  className,
  children,
  ...props
}: TabPanelProps) {
  const { value: current, baseId } = useTabs()
  const selected = current === value

  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      hidden={!selected}
      className={cx('pt-4', className)}
      {...props}
    >
      {children}
    </div>
  )
}
