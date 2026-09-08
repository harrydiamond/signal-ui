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
  default: `border border-transparent bg-av-surface-2 text-av-text enabled:hover:bg-[color-mix(in_srgb,var(--color-av-muted)_14%,var(--color-av-surface-2))] enabled:active:scale-[0.98] enabled:active:bg-av-surface enabled:active:text-white enabled:active:shadow-[inset_0_0_28px_rgb(255_255_255_/_0.04)] enabled:data-[pressed]:scale-[0.98] enabled:data-[pressed]:bg-av-surface enabled:data-[pressed]:text-white enabled:data-[pressed]:shadow-[inset_0_0_28px_rgb(255_255_255_/_0.04)] ${MOTION}`,
  primary: `border border-transparent bg-white text-av-page enabled:hover:bg-av-text enabled:active:scale-[0.98] enabled:active:bg-[color-mix(in_srgb,var(--color-av-muted)_35%,white)] enabled:active:text-av-page enabled:active:shadow-[inset_0_1px_0_rgb(255_255_255_/_0.35)] enabled:data-[pressed]:scale-[0.98] enabled:data-[pressed]:bg-[color-mix(in_srgb,var(--color-av-muted)_35%,white)] enabled:data-[pressed]:text-av-page enabled:data-[pressed]:shadow-[inset_0_1px_0_rgb(255_255_255_/_0.35)] ${MOTION}`,
  ghost: `text-av-muted border border-transparent bg-av-surface enabled:hover:bg-[color-mix(in_srgb,var(--color-av-signal-hot)_8%,var(--color-av-surface))] enabled:hover:text-av-phosphor-bright enabled:active:scale-[0.98] enabled:active:bg-[color-mix(in_srgb,var(--color-av-signal-hot)_12%,var(--color-av-surface))] enabled:active:text-[#ffc19a] enabled:data-[pressed]:scale-[0.98] enabled:data-[pressed]:bg-[color-mix(in_srgb,var(--color-av-signal-hot)_12%,var(--color-av-surface))] enabled:data-[pressed]:text-[#ffc19a] ${MOTION}`,
  panel: `border border-[color-mix(in_srgb,var(--color-av-signal-hot)_28%,var(--color-av-hairline))] bg-[#090a0c] text-av-phosphor enabled:hover:border-[color-mix(in_srgb,var(--color-av-signal-hot)_55%,transparent)] enabled:hover:bg-[color-mix(in_srgb,var(--color-av-signal-hot)_10%,#090a0c)] enabled:hover:text-[#ffc19a] enabled:hover:shadow-[0_0_18px_rgb(230_74_25_/_0.12)] enabled:active:scale-[0.98] enabled:active:border-[color-mix(in_srgb,var(--color-av-signal-hot)_65%,transparent)] enabled:active:bg-[color-mix(in_srgb,var(--color-av-signal-hot)_16%,#090a0c)] enabled:active:text-[#ffd2b4] enabled:active:shadow-[inset_0_0_28px_rgb(230_74_25_/_0.22),0_0_14px_rgb(230_74_25_/_0.18)] enabled:data-[pressed]:scale-[0.98] enabled:data-[pressed]:border-[color-mix(in_srgb,var(--color-av-signal-hot)_65%,transparent)] enabled:data-[pressed]:bg-[color-mix(in_srgb,var(--color-av-signal-hot)_16%,#090a0c)] enabled:data-[pressed]:text-[#ffd2b4] enabled:data-[pressed]:shadow-[inset_0_0_28px_rgb(230_74_25_/_0.22),0_0_14px_rgb(230_74_25_/_0.18)] ${MOTION}`,
  pad: `group border border-[color-mix(in_srgb,var(--color-av-signal-hot)_22%,transparent)] bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgb(230_74_25_/_0.07),transparent_70%),#050607] shadow-[inset_0_0_80px_rgb(230_74_25_/_0.05)] transition-[background-color,border-color,transform,box-shadow] duration-90 ease-linear enabled:hover:border-[color-mix(in_srgb,var(--color-av-signal-hot)_38%,transparent)] enabled:hover:shadow-[inset_0_0_90px_rgb(230_74_25_/_0.08)] enabled:active:scale-[0.99] enabled:active:border-[color-mix(in_srgb,var(--color-av-signal-hot)_55%,transparent)] enabled:active:bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgb(230_74_25_/_0.16),transparent_70%),#0a0b0e] enabled:active:shadow-[inset_0_0_56px_rgb(230_74_25_/_0.2),0_0_24px_rgb(230_74_25_/_0.12)] enabled:data-[pressed]:scale-[0.99] enabled:data-[pressed]:border-[color-mix(in_srgb,var(--color-av-signal-hot)_55%,transparent)] enabled:data-[pressed]:bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgb(230_74_25_/_0.16),transparent_70%),#0a0b0e] enabled:data-[pressed]:shadow-[inset_0_0_56px_rgb(230_74_25_/_0.2),0_0_24px_rgb(230_74_25_/_0.12)] motion-reduce:transition-[background-color,border-color,box-shadow] motion-reduce:enabled:active:scale-100 motion-reduce:enabled:data-[pressed]:scale-100`,
  danger: `border border-transparent bg-av-danger text-av-page enabled:hover:bg-[color-mix(in_srgb,white_18%,var(--color-av-danger))] enabled:active:scale-[0.98] enabled:active:bg-[color-mix(in_srgb,var(--color-av-muted)_28%,var(--color-av-danger))] enabled:active:text-av-page enabled:active:shadow-[inset_0_1px_0_rgb(255_255_255_/_0.28)] enabled:data-[pressed]:scale-[0.98] enabled:data-[pressed]:bg-[color-mix(in_srgb,var(--color-av-muted)_28%,var(--color-av-danger))] enabled:data-[pressed]:text-av-page enabled:data-[pressed]:shadow-[inset_0_1px_0_rgb(255_255_255_/_0.28)] ${MOTION}`,
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
        <span className="text-av-phosphor group-enabled:group-active:text-av-phosphor-bright group-enabled:group-data-[pressed]:text-av-phosphor-bright [text-shadow:0_0_1px_rgb(255_180_140_/_0.5),0_0_6px_rgb(230_74_25_/_0.3)] group-enabled:group-active:[text-shadow:0_0_1px_rgb(255_210_180_/_0.65),0_0_6px_rgb(230_74_25_/_0.4)] group-enabled:group-data-[pressed]:[text-shadow:0_0_1px_rgb(255_210_180_/_0.65),0_0_6px_rgb(230_74_25_/_0.4)]">
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  )
})
