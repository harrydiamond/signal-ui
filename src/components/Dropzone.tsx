import { useRef, useState, type ReactNode } from 'react'
import { fieldHint, body } from '../type.ts'
import { tv } from '../tv.ts'

type Props = {
  accept?: string
  multiple?: boolean
  disabled?: boolean
  hasFiles?: boolean
  onFiles?: (files: File[]) => void
  label?: string
  hint?: string
  icon?: ReactNode
  className?: string
  children?: ReactNode
  'aria-label'?: string
}

const dropzone = tv({
  base: `${body} bg-av-surface enabled:hover:bg-[color-mix(in_srgb,var(--av-muted)_8%,var(--av-surface))] data-[dragging=true]:border-[color-mix(in_srgb,var(--av-signal)_45%,transparent)] data-[dragging=true]:bg-[color-mix(in_srgb,var(--av-signal)_8%,var(--av-surface))] data-[has-files=true]:bg-[color-mix(in_srgb,var(--av-audio)_8%,var(--av-surface))] flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-transparent px-4 py-8 text-center transition-[background-color,border-color,box-shadow] duration-90 disabled:cursor-not-allowed`,
})

export function Dropzone({
  accept,
  multiple = false,
  disabled = false,
  hasFiles,
  onFiles,
  label = 'Drop files, or click to browse',
  hint,
  icon,
  className,
  children,
  'aria-label': ariaLabel,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const dragCount = useRef(0)
  const [dragging, setDragging] = useState(false)
  const [picked, setPicked] = useState(false)
  const showHasFiles = hasFiles ?? picked

  const takeFiles = (list: FileList | null) => {
    if (!list?.length) return
    const files = Array.from(list)
    setPicked(true)
    onFiles?.(files)
  }

  const resetDrag = () => {
    dragCount.current = 0
    setDragging(false)
  }

  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={ariaLabel ?? label}
      data-dragging={dragging || undefined}
      data-has-files={showHasFiles || undefined}
      className={dropzone({ className })}
      onClick={() => inputRef.current?.click()}
      onDragEnter={event => {
        event.preventDefault()
        if (disabled) return
        dragCount.current += 1
        setDragging(true)
      }}
      onDragOver={event => {
        event.preventDefault()
      }}
      onDragLeave={event => {
        event.preventDefault()
        dragCount.current = Math.max(0, dragCount.current - 1)
        if (dragCount.current === 0) setDragging(false)
      }}
      onDrop={event => {
        event.preventDefault()
        resetDrag()
        if (disabled) return
        takeFiles(event.dataTransfer.files)
      }}
    >
      <input
        ref={inputRef}
        type="file"
        hidden
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={event => {
          takeFiles(event.target.files)
          event.target.value = ''
        }}
      />
      {children ?? (
        <>
          {icon ? (
            <span className="text-av-signal mb-1" aria-hidden>
              {icon}
            </span>
          ) : null}
          <strong className="text-av-text text-sm font-medium">{label}</strong>
          {hint ? <span className={fieldHint}>{hint}</span> : null}
        </>
      )}
    </button>
  )
}
