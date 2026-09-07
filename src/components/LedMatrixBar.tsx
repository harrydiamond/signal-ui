import { useLayoutEffect, useRef, useState } from 'react'
import { AV_RGB } from '../tokens.ts'
import { cx } from '../cx.ts'

export const LED_MATRIX_PITCH = 4
export const LED_MATRIX_SIZE = Math.max(2, Math.round(LED_MATRIX_PITCH * 0.58))
export const LED_MATRIX_ROWS = 3
export const LED_MATRIX_COLS_FALLBACK = 48
export const LED_MATRIX_UNLIT = `rgba(${AV_RGB.signalHot}, 0.34)`

export type LedMatrixFill = {
  pct: number
  color: string
}

type Props = {
  fills?: readonly LedMatrixFill[]
  colorForColumn?: (col: number, cols: number) => string
  className?: string
  'aria-label'?: string
  onColsChange?: (cols: number) => void
}

function colsForWidth(width: number): number {
  if (width <= 0) return LED_MATRIX_COLS_FALLBACK
  return Math.max(8, Math.floor(width / LED_MATRIX_PITCH))
}

function columnColor(
  col: number,
  cols: number,
  fills: readonly LedMatrixFill[],
  colorForColumn?: (col: number, cols: number) => string,
): string {
  if (colorForColumn) return colorForColumn(col, cols)
  const t = ((col + 0.5) / cols) * 100
  let color = LED_MATRIX_UNLIT
  for (const layer of fills) {
    if (t <= layer.pct) color = layer.color
  }
  return color
}

export function LedMatrixBar({
  fills = [],
  colorForColumn,
  className = '',
  'aria-label': ariaLabel,
  onColsChange,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [cols, setCols] = useState(LED_MATRIX_COLS_FALLBACK)

  useLayoutEffect(() => {
    const el = trackRef.current
    if (!el) return

    const measure = () => {
      const next = colsForWidth(el.clientWidth)
      setCols(next)
      onColsChange?.(next)
    }
    measure()

    if (typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [onColsChange])

  const trackHeight = LED_MATRIX_ROWS * LED_MATRIX_PITCH

  return (
    <div
      ref={trackRef}
      className={cx('grid w-full', className)}
      style={{
        height: trackHeight,
        gridTemplateColumns: `repeat(${cols}, ${LED_MATRIX_PITCH}px)`,
        gridTemplateRows: `repeat(${LED_MATRIX_ROWS}, ${LED_MATRIX_PITCH}px)`,
      }}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    >
      {Array.from({ length: LED_MATRIX_ROWS * cols }, (_, i) => {
        const col = i % cols
        const fill = columnColor(col, cols, fills, colorForColumn)
        return (
          <span key={i} className="grid place-items-center">
            <span
              className="rounded-none"
              style={{
                width: LED_MATRIX_SIZE,
                height: LED_MATRIX_SIZE,
                backgroundColor: fill,
              }}
            />
          </span>
        )
      })}
    </div>
  )
}
