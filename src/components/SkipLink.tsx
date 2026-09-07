import { cx } from '../cx.ts'
import { plex } from '../type.ts'

type Props = {
  href?: string
  className?: string
  children?: string
}

export function SkipLink({
  href = '#main-content',
  className,
  children = 'Skip to main content',
}: Props) {
  return (
    <a
      href={href}
      className={cx(
        plex,
        'text-av-page sr-only border border-transparent bg-white no-underline focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:m-0 focus:h-auto focus:w-auto focus:overflow-visible focus:rounded-md focus:px-4 focus:py-3 focus:whitespace-normal',
        className,
      )}
    >
      {children}
    </a>
  )
}
