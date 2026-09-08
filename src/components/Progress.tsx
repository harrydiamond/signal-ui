import { AV } from '../tokens.ts'
import { cx } from '../cx.ts'
import { plex } from '../type.ts'
import { LedMatrixBar } from './LedMatrixBar.tsx'
import { Spinner } from './Spinner.tsx'

type Props = {
  value?: number
  max?: number
  label?: string
  className?: string
}

export function Progress({
  value,
  max = 1,
  label,
  className,
}: Props) {
  const determinate = value != null && Number.isFinite(value)
  const clampedMax = max > 0 ? max : 1
  const pct = determinate
    ? Math.min(100, Math.max(0, (value / clampedMax) * 100))
    : 0

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={clampedMax}
      aria-valuenow={determinate ? value : undefined}
      className={cx('flex flex-col gap-2', className)}
    >
      {label ? (
        <span className={`${plex} text-av-muted text-xs font-medium`}>
          {label}
        </span>
      ) : null}
      {determinate ? (
        <LedMatrixBar fills={[{ pct, color: AV.phosphor }]} />
      ) : (
        <div className="flex items-center gap-3">
          <Spinner size="sm" label="Working" />
          <LedMatrixBar className="min-w-0 flex-1" />
        </div>
      )}
    </div>
  )
}
