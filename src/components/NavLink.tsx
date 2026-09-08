import type { AnchorHTMLAttributes } from 'react'
import { cx } from '../cx.ts'
import { tv } from '../tv.ts'

const navLink = tv({
  base: 'font-mono text-[10px] tracking-[1px] uppercase no-underline transition-colors',
  variants: {
    active: {
      true: 'text-av-ink',
      false: 'text-av-muted hover:text-av-ink',
    },
  },
  defaultVariants: {
    active: false,
  },
})

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  active?: boolean
}

/** Mono uppercase site-nav item. */
export function NavLink({ active = false, className, ...props }: Props) {
  return <a className={cx(navLink({ active }), className)} {...props} />
}
