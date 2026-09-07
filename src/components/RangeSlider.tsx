import { useCallback, useState, type CSSProperties } from 'react'
import { AV_RGB } from '../tokens.ts'
import {
  LED_MATRIX_COLS_FALLBACK,
  LED_MATRIX_PITCH,
  LED_MATRIX_ROWS,
  LED_MATRIX_UNLIT,
  LedMatrixBar,
} from './LedMatrixBar.tsx'
import { cx } from '../cx.ts'
import { plex } from '../type.ts'

export const SLIDER_LED_PITCH = LED_MATRIX_PITCH
export const SLIDER_LED_ROWS = LED_MATRIX_ROWS
export const SLIDER_LED_COLS_FALLBACK = LED_MATRIX_COLS_FALLBACK

type Props = {
  id: string
  min: number
  max: number
  step: number
  value: number
  onChange: (value: number) => void
  minLabel: string
  maxLabel: string
  ariaLabel: string
  variant?: 'default' | 'quality'
  className?: string
}

export function RangeSlider({
  id,
  min,
  max,
  step,
  value,
  onChange,
  minLabel,
  maxLabel,
  ariaLabel,
  variant = 'default',
  className,
}: Props) {
  const [cols, setCols] = useState(LED_MATRIX_COLS_FALLBACK)
  const onColsChange = useCallback((n: number) => setCols(n), [])

  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0
  const isQuality = variant === 'quality'
  const litCols = Math.round((pct / 100) * cols)
  const accent = isQuality ? `hsl(${pct * 1.2} 78% 42%)` : undefined
  const trackHeight = LED_MATRIX_ROWS * LED_MATRIX_PITCH

  const colorForColumn = useCallback(
    (col: number, total: number) => {
      const lit = col < litCols
      if (!lit) return LED_MATRIX_UNLIT
      if (!isQuality) return `rgb(${AV_RGB.signalHot})`
      const hue = (col / Math.max(1, total - 1)) * 120
      return `hsl(${hue} 78% 42%)`
    },
    [isQuality, litCols],
  )

  return (
    <div className={className}>
      <div className="relative flex h-7 items-center">
        <LedMatrixBar
          className="pointer-events-none absolute inset-x-0"
          colorForColumn={colorForColumn}
          onColsChange={onColsChange}
        />
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          aria-label={ariaLabel}
          onChange={e => onChange(Number(e.target.value))}
          className={cx(
            'tool-slider relative z-1',
            isQuality && 'tool-slider--quality',
          )}
          style={
            {
              '--slider-pct': `${pct}%`,
              '--slider-track-h': `${trackHeight}px`,
              ...(accent ? { '--slider-accent': accent } : {}),
            } as CSSProperties
          }
        />
      </div>
      <div
        className={cx(
          plex,
          'text-av-muted mt-0.5 flex justify-between text-xs tabular-nums',
        )}
      >
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  )
}
