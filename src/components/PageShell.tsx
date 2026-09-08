import type { HTMLAttributes } from 'react'
import { cx } from '../cx.ts'

type Props = HTMLAttributes<HTMLElement>

/**
 * Main content column rhythm (editorial-style page body).
 * Compose under `Theme asPage` with `SiteNav` / `SiteFooter` as needed.
 */
export function PageShell({ className, ...props }: Props) {
  return (
    <main
      className={cx(
        'mx-auto grid w-full flex-1 grid-cols-[100%] gap-24 px-3 py-8 lg:px-6 xl:mx-auto 2xl:max-w-[100rem]',
        className,
      )}
      {...props}
    />
  )
}
