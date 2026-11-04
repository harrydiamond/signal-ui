import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { cx } from '../cx.ts'

type Props = {
  children: ReactNode
  /** Mount node. `undefined` uses `document.body`; `null` waits. */
  container?: Element | null
  className?: string
}

function themeFrom(source: Element | null): string {
  return source?.getAttribute('data-av-theme') || 'phosphor'
}

/**
 * Render children into a mount node (default `document.body`) while copying
 * the nearest `.av-theme` so overlay tokens match the page.
 */
export function Portal({ children, container, className }: Props) {
  const anchorRef = useRef<HTMLSpanElement>(null)
  const [target, setTarget] = useState<Element | null>(null)
  const [themeName, setThemeName] = useState('phosphor')

  useLayoutEffect(() => {
    const nextTarget = container === undefined ? document.body : container
    setTarget(nextTarget)

    const source = anchorRef.current?.closest('.av-theme') ?? null
    setThemeName(themeFrom(source))
    if (!source) return

    const observer = new MutationObserver(() => {
      setThemeName(themeFrom(source))
    })
    observer.observe(source, {
      attributes: true,
      attributeFilter: ['data-av-theme'],
    })
    return () => observer.disconnect()
  }, [container])

  return (
    <>
      <span ref={anchorRef} hidden />
      {target
        ? createPortal(
            <div
              className={cx('av-theme', className)}
              data-av-theme={themeName}
              data-av-overlay=""
            >
              {children}
            </div>,
            target,
          )
        : null}
    </>
  )
}
