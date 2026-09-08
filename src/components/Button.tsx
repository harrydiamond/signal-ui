import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { body, heading } from '../type.ts'
import { tv } from '../tv.ts'

export type ButtonVariant =
  'default' | 'primary' | 'ghost' | 'panel' | 'pad' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  pressed?: boolean
  children: ReactNode
}

const button = tv({
  base: `${body} border border-transparent transition-colors duration-90 disabled:opacity-50`,
  variants: {
    variant: {
      default:
        'bg-av-surface-2 text-av-text enabled:hover:bg-av-surface enabled:data-[pressed]:bg-av-surface enabled:data-[pressed]:text-av-ink',
      primary:
        'bg-av-ink text-av-on-primary enabled:hover:bg-av-text enabled:data-[pressed]:bg-av-text',
      ghost:
        'bg-transparent text-av-muted enabled:hover:bg-av-surface enabled:hover:text-av-ink enabled:data-[pressed]:bg-av-surface enabled:data-[pressed]:text-av-ink',
      panel:
        'border-av-hairline bg-av-panel text-av-phosphor enabled:hover:bg-av-surface-2 enabled:data-[pressed]:bg-av-surface-2',
      pad: `${heading} av-btn-pad`,
      danger:
        'bg-av-danger text-av-on-primary enabled:hover:bg-av-signal-hot enabled:data-[pressed]:bg-av-signal-hot',
    },
    size: {
      sm: 'rounded-md px-3 py-2 text-xs',
      md: 'rounded-md px-3 py-2 text-[0.8125rem]',
      lg: 'rounded-lg px-4 py-3 text-sm',
    },
  },
  compoundVariants: [
    { variant: 'pad', size: 'lg', class: 'min-h-32 w-full rounded-lg' },
  ],
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  {
    variant = 'default',
    size = 'md',
    pressed,
    className,
    type = 'button',
    children,
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      data-pressed={pressed || undefined}
      className={button({ variant, size, className })}
      {...props}
    >
      {children}
    </button>
  )
})
