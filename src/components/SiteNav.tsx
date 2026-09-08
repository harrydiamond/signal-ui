import { useId, useState, type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '../cx.ts'

type Props = HTMLAttributes<HTMLElement> & {
  brand: ReactNode
  links: ReactNode
  /** Optional custom mobile panel body; defaults to the same `links` stack. */
  mobileLinks?: ReactNode
}

function HamburgerIcon() {
  return (
    <svg
      aria-hidden
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      aria-hidden
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  )
}

/** Sticky frosted site header with desktop links and a simple mobile drawer. */
export function SiteNav({
  brand,
  links,
  mobileLinks,
  className,
  ...props
}: Props) {
  const [open, setOpen] = useState(false)
  const titleId = useId()

  return (
    <header
      className={cx(
        'bg-av-surface/95 supports-backdrop-filter:bg-av-surface/80 sticky top-0 z-50 backdrop-blur',
        className,
      )}
      {...props}
    >
      <div className="mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex min-w-0 items-center gap-3">{brand}</div>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {links}
        </nav>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls={titleId}
          className="border-av-border text-av-muted hover:text-av-ink flex items-center justify-center rounded-sm border bg-transparent p-2 transition-colors md:hidden"
          onClick={() => setOpen(true)}
        >
          <HamburgerIcon />
        </button>
      </div>
      <div className="bg-av-border h-px w-full" />

      {open ? (
        <div className="fixed inset-0 z-[100] md:hidden" role="presentation">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div
            id={titleId}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            className="border-av-border bg-av-surface absolute inset-y-0 right-0 z-[101] flex w-full max-w-sm flex-col border-l p-6 shadow-lg"
          >
            <div className="mb-8 flex items-center justify-end">
              <button
                type="button"
                aria-label="Close menu"
                className="border-av-border text-av-muted hover:text-av-ink flex items-center justify-center rounded-sm border bg-transparent p-2 transition-colors"
                onClick={() => setOpen(false)}
              >
                <CloseIcon />
              </button>
            </div>
            <nav
              className="flex flex-col gap-4"
              aria-label="Primary"
              onClick={() => setOpen(false)}
            >
              {mobileLinks ?? links}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  )
}
