import {
  createContext,
  useContext,
  useId,
  useLayoutEffect,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { cx } from '../cx.ts'
import { proseMuted } from '../type.ts'
import { FocusTrap } from './FocusTrap.tsx'
import { Heading } from './Heading.tsx'
import { Portal } from './Portal.tsx'

type DialogContextValue = {
  titleId?: string
  setTitleId: (id: string | undefined) => void
  descriptionId?: string
  setDescriptionId: (id: string | undefined) => void
}

const DialogContext = createContext<DialogContextValue | null>(null)

function useDialogContext() {
  const ctx = useContext(DialogContext)
  if (!ctx) {
    throw new Error(
      'DialogTitle and DialogDescription must be used inside Dialog',
    )
  }
  return ctx
}

function useScrollLock(active: boolean) {
  useLayoutEffect(() => {
    if (!active) return
    const html = document.documentElement
    const previous = html.style.overflow
    html.style.overflow = 'hidden'
    return () => {
      html.style.overflow = previous
    }
  }, [active])
}

type DialogProps = Omit<HTMLAttributes<HTMLDivElement>, 'role'> & {
  open?: boolean
  onClose: () => void
  /** Mount node forwarded to `Portal`. */
  container?: Element | null
  children: ReactNode
}

/**
 * Modal overlay for confirmations and in-context forms.
 * Portals to `document.body`, traps focus, restores it on close, and closes on Escape.
 */
export function Dialog({
  open = true,
  onClose,
  container,
  children,
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  ...props
}: DialogProps) {
  const [titleId, setTitleId] = useState<string>()
  const [descriptionId, setDescriptionId] = useState<string>()

  useScrollLock(open)

  useLayoutEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || event.defaultPrevented) return
      event.preventDefault()
      onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  const labelledBy = ariaLabelledby ?? titleId
  const describedBy = ariaDescribedby ?? descriptionId

  return (
    <Portal container={container}>
      <div className="fixed inset-0 z-[100]">
        <div
          aria-hidden
          className="absolute inset-0 bg-black/50"
          onClick={onClose}
        />
        <div className="relative flex min-h-dvh items-center justify-center p-4">
          <DialogContext.Provider
            value={{ titleId, setTitleId, descriptionId, setDescriptionId }}
          >
            <FocusTrap
              {...props}
              role="dialog"
              aria-modal="true"
              aria-label={ariaLabel}
              aria-labelledby={labelledBy}
              aria-describedby={describedBy}
              className={cx(
                'av-card bg-av-surface relative max-h-[min(36rem,calc(100dvh-2rem))] w-full max-w-md overflow-y-auto px-4 py-5 sm:px-5 sm:py-6',
                className,
              )}
            >
              {children}
            </FocusTrap>
          </DialogContext.Provider>
        </div>
      </div>
    </Portal>
  )
}

type DialogTitleProps = HTMLAttributes<HTMLHeadingElement>

export function DialogTitle({
  className,
  id: idProp,
  ...props
}: DialogTitleProps) {
  const { setTitleId } = useDialogContext()
  const generatedId = useId()
  const id = idProp ?? generatedId

  useLayoutEffect(() => {
    setTitleId(id)
    return () => setTitleId(undefined)
  }, [id, setTitleId])

  return <Heading level={2} id={id} className={className} {...props} />
}

type DialogDescriptionProps = HTMLAttributes<HTMLParagraphElement>

export function DialogDescription({
  className,
  id: idProp,
  ...props
}: DialogDescriptionProps) {
  const { setDescriptionId } = useDialogContext()
  const generatedId = useId()
  const id = idProp ?? generatedId

  useLayoutEffect(() => {
    setDescriptionId(id)
    return () => setDescriptionId(undefined)
  }, [id, setDescriptionId])

  return (
    <p
      id={id}
      className={cx(proseMuted, 'mt-2 max-w-none', className)}
      {...props}
    />
  )
}

type DialogFooterProps = HTMLAttributes<HTMLDivElement>

export function DialogFooter({ className, ...props }: DialogFooterProps) {
  return (
    <div
      className={cx('mt-6 flex flex-wrap justify-end gap-2', className)}
      {...props}
    />
  )
}
