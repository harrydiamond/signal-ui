import type { ReactNode } from 'react'
import { cx } from '../cx.ts'
import { plex, proseMuted } from '../type.ts'
import { Badge } from './Badge.tsx'

type Props = {
  href: string
  title: string
  description: string
  variant?: 'tool' | 'reference'
  density?: 'card' | 'row'
  badge?: string
  icon?: ReactNode
  /** Icon slot — used when `icon` is omitted (Astro children). */
  children?: ReactNode
  ctaLabel?: string
  headingLevel?: 3 | 4
  className?: string
}

export function Tile({
  href,
  title,
  description,
  variant = 'tool',
  density = 'card',
  badge,
  icon,
  children,
  ctaLabel,
  headingLevel = 3,
  className,
}: Props) {
  const isReference = variant === 'reference'
  const isRow = density === 'row'
  const label = ctaLabel ?? (isReference ? 'View reference' : 'Open tool')
  const TitleTag = headingLevel === 4 ? 'h4' : 'h3'
  const glyph = icon ?? children

  return (
    <a
      href={href}
      className={cx(
        plex,
        'group relative flex overflow-hidden rounded-lg border border-transparent text-inherit no-underline transition-[background-color,transform,box-shadow] duration-160 ease-linear hover:-translate-y-0.5 hover:text-inherit active:translate-y-0 motion-reduce:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        isRow
          ? 'items-center gap-4 px-4 py-3.5 sm:gap-5 sm:px-5 sm:py-4'
          : 'h-full min-h-[14.5rem] flex-col p-5 sm:p-6',
        isReference
          ? 'av-link-tile-ref bg-av-surface-2/60 hover:bg-av-surface'
          : 'av-link-tile-tool bg-av-surface',
        className,
      )}
    >
      {glyph ? (
        <div
          className={cx(
            'flex shrink-0 items-center justify-center transition-colors duration-150',
            isRow ? 'size-12' : 'mb-4 size-20',
            isReference
              ? 'text-av-muted group-hover:text-av-text'
              : 'text-av-signal group-hover:text-av-phosphor-bright',
          )}
        >
          {glyph}
        </div>
      ) : null}
      {isRow ? (
        <>
          <div className="min-w-0 flex-1">
            <div className="flex min-h-7 flex-wrap items-center gap-x-2 gap-y-1">
              <TitleTag
                className={cx(
                  plex,
                  'group-hover:text-av-signal m-0 text-lg font-medium text-white transition-colors duration-150',
                )}
              >
                {title}
              </TitleTag>
              {badge ? (
                <Badge label={badge} tone="meter" surface="page" />
              ) : null}
            </div>
            <p className={cx(proseMuted, 'mt-0.5 max-w-none')}>{description}</p>
          </div>
          <span
            aria-hidden="true"
            className="text-av-signal inline-block shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
          >
            →
          </span>
        </>
      ) : (
        <>
          <div className="flex min-h-7 flex-wrap items-center gap-x-2 gap-y-1">
            <TitleTag
              className={cx(
                plex,
                'group-hover:text-av-signal m-0 text-lg font-medium text-white transition-colors duration-150',
              )}
            >
              {title}
            </TitleTag>
            {badge ? <Badge label={badge} tone="meter" surface="page" /> : null}
          </div>
          <p className={cx(proseMuted, 'mt-2 max-w-none')}>{description}</p>
          <span className="text-av-signal mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium">
            {label}
            <span
              aria-hidden="true"
              className="text-av-signal inline-block transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
            >
              →
            </span>
          </span>
        </>
      )}
    </a>
  )
}
