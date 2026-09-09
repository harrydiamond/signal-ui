import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../cx.ts'
import { proseMuted } from '../type.ts'
import { tv } from '../tv.ts'

export type MediaFigureAspect = '4/3' | '16/9' | '21/9' | 'square' | 'auto'

const plane = tv({
  base: 'relative w-full overflow-hidden rounded-sm [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&_video]:h-full [&_video]:w-full [&_video]:object-cover motion-safe:[&_img]:transition-transform motion-safe:[&_img]:duration-200 motion-safe:[&_video]:transition-transform motion-safe:[&_video]:duration-200 motion-safe:group-hover:[&_img]:scale-105 motion-safe:group-hover/preview:[&_img]:scale-105 motion-safe:group-hover:[&_video]:scale-105 motion-safe:group-hover/preview:[&_video]:scale-105',
  variants: {
    aspect: {
      '4/3': 'aspect-4/3',
      '16/9': 'aspect-video',
      '21/9': 'aspect-21/9',
      square: 'aspect-square',
      auto: '',
    },
  },
  defaultVariants: {
    aspect: '4/3',
  },
})

type Props = HTMLAttributes<HTMLElement> & {
  /** Image URL. Ignored when `children` provide the media. */
  src?: string
  /**
   * Accessible name for the generated `<img>`. Required when `src` is set;
   * decorative covers may pass `""`.
   */
  alt?: string
  /**
   * Bottom fade into `--av-surface` (harrydiamond.com activity / collection
   * cards). Re-themes on phosphor via the same token — not editorial-only.
   */
  fade?: boolean
  aspect?: MediaFigureAspect
  caption?: ReactNode
  /** Custom media (`<img>`, `<video>`, `<picture>`). Wins over `src`. */
  children?: ReactNode
}

/** Image / video plane with optional bottom fade into the theme surface. */
export function MediaFigure({
  src,
  alt = '',
  fade = false,
  aspect = '4/3',
  caption,
  children,
  className,
  ...props
}: Props) {
  const media =
    children ??
    (src ? (
      <img src={src} alt={alt} />
    ) : (
      <div className="bg-av-surface-2 h-full min-h-24 w-full" aria-hidden />
    ))

  return (
    <figure className={cx('group m-0 w-full', className)} {...props}>
      <div className={plane({ aspect })}>
        {media}
        {fade ? (
          <div
            className="from-av-surface pointer-events-none absolute inset-0 bg-linear-to-t via-transparent to-transparent"
            data-media-fade=""
            aria-hidden
          />
        ) : null}
      </div>
      {caption ? (
        <figcaption className={cx(proseMuted, 'mt-2 max-w-none')}>
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}
