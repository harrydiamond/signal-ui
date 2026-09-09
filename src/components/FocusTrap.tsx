import {
  useLayoutEffect,
  useRef,
  type HTMLAttributes,
  type RefObject,
} from 'react'

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

function isShown(el: HTMLElement) {
  if (el.hidden || el.getAttribute('aria-hidden') === 'true') return false
  if (el.closest('[inert]')) return false
  return true
}

function getFocusable(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter(el => el.tabIndex !== -1 && isShown(el))
}

function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  active: boolean,
) {
  useLayoutEffect(() => {
    if (!active) return
    const container = containerRef.current
    if (!container) return

    const previous =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null

    const alreadyInside =
      previous && previous !== container && container.contains(previous)
    if (!alreadyInside) {
      container.focus({ preventScroll: true })
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || event.defaultPrevented) return
      const focusables = getFocusable(container)
      if (focusables.length === 0) {
        event.preventDefault()
        container.focus({ preventScroll: true })
        return
      }

      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const activeEl = document.activeElement

      if (event.shiftKey) {
        if (activeEl === first || activeEl === container) {
          event.preventDefault()
          last.focus()
        }
      } else if (activeEl === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      if (previous && document.contains(previous)) previous.focus()
    }
  }, [active, containerRef])
}

type Props = HTMLAttributes<HTMLDivElement> & {
  /** When false, render children without trapping or restoring focus. */
  active?: boolean
}

/**
 * Keyboard focus stays inside this node while `active`. Restores focus to the
 * previously focused element on unmount.
 */
export function FocusTrap({ active = true, children, ...props }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  useFocusTrap(ref, active)

  return (
    <div
      {...props}
      ref={ref}
      tabIndex={props.tabIndex ?? (active ? -1 : undefined)}
    >
      {children}
    </div>
  )
}
