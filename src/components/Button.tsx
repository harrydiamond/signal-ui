import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cx } from '../cx.ts'
import { doto, plex } from '../type.ts'

export type ButtonVariant =
  'default' | 'primary' | 'ghost' | 'panel' | 'pad' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  pressed?: boolean
  children: ReactNode
}

const MOTION =
  'transition-[background-color,border-color,color,transform,box-shadow] duration-90 ease-linear motion-reduce:transition-[background-color,border-color,color,box-shadow] motion-reduce:enabled:active:scale-100 motion-reduce:enabled:data-[pressed]:scale-100'

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  default: `av-btn-default border border-transparent bg-av-surface-2 text-av-text enabled:active:scale-[0.98] enabled:active:bg-av-surface enabled:active:text-white enabled:data-[pressed]:scale-[0.98] enabled:data-[pressed]:bg-av-surface enabled:data-[pressed]:text-white ${MOTION}`,
  primary: `av-btn-primary border border-transparent bg-white text-av-page enabled:hover:bg-av-text enabled:active:scale-[0.98] enabled:active:text-av-page enabled:data-[pressed]:scale-[0.98] enabled:data-[pressed]:text-av-page ${MOTION}`,
  ghost: `av-btn-ghost text-av-muted border border-transparent bg-av-surface enabled:hover:text-av-phosphor-bright enabled:active:scale-[0.98] enabled:data-[pressed]:scale-[0.98] ${MOTION}`,
  panel: `av-btn-panel enabled:active:scale-[0.98] enabled:data-[pressed]:scale-[0.98] ${MOTION}`,
  pad: `av-btn-pad group transition-[background-color,border-color,transform,box-shadow] duration-90 ease-linear enabled:active:scale-[0.99] enabled:data-[pressed]:scale-[0.99] motion-reduce:transition-[background-color,border-color,box-shadow] motion-reduce:enabled:active:scale-100 motion-reduce:enabled:data-[pressed]:scale-100`,
  danger: `av-btn-danger border border-transparent bg-av-danger text-av-page enabled:active:scale-[0.98] enabled:active:text-av-page enabled:data-[pressed]:scale-[0.98] enabled:data-[pressed]:text-av-page ${MOTION}`,
}

const SIZE_CLASS: Record<ButtonSize, string> = {
  sm: 'rounded-md px-3 py-2 text-xs',
  md: 'rounded-md px-3 py-2 text-[0.8125rem]',
  lg: 'rounded-lg px-4 py-3 text-sm',
}

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
      className={cx(
        variant === 'pad' ? doto : plex,
        'cursor-pointer disabled:cursor-not-allowed',
        VARIANT_CLASS[variant],
        SIZE_CLASS[size],
        variant === 'pad' && size === 'lg' && 'min-h-32 w-full rounded-lg',
        className,
      )}
      {...props}
    >
      {variant === 'pad' ? (
        <span className="av-btn-pad-label">{children}</span>
      ) : (
        children
      )}
    </button>
  )
})
