import {
  cloneElement,
  isValidElement,
  useId,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react'
import { cx } from '../cx.ts'
import { fieldError, fieldHint, fieldLabel } from '../type.ts'

type Props = HTMLAttributes<HTMLDivElement> & {
  label: string
  hint?: string
  error?: string
  htmlFor?: string
  children: ReactNode
}

type ControlProps = {
  id?: string
  'aria-invalid'?: boolean | 'true' | 'false'
  'aria-describedby'?: string
}

export function Field({
  label,
  hint,
  error,
  className,
  children,
  htmlFor,
  ...props
}: Props) {
  const generatedId = useId()
  const child = isValidElement<ControlProps>(children) ? children : null
  const controlId = child?.props.id ?? htmlFor ?? generatedId
  const hintId = `${controlId}-hint`
  const errorId = `${controlId}-error`
  const describedBy = error ? errorId : hint ? hintId : undefined
  const control = child
    ? cloneElement(child as ReactElement<ControlProps>, {
        id: controlId,
        'aria-invalid': error ? true : child.props['aria-invalid'],
        'aria-describedby':
          [child.props['aria-describedby'], describedBy]
            .filter(Boolean)
            .join(' ') || undefined,
      })
    : children

  return (
    <div className={cx('flex flex-col gap-1.5', className)} {...props}>
      <label htmlFor={controlId} className={fieldLabel}>
        {label}
      </label>
      {control}
      {error ? (
        <span id={errorId} className={fieldError} role="alert">
          {error}
        </span>
      ) : hint ? (
        <span id={hintId} className={fieldHint}>
          {hint}
        </span>
      ) : null}
    </div>
  )
}
