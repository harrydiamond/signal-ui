import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MediaFigure } from './MediaFigure.tsx'

describe('MediaFigure', () => {
  it('renders a figure with an image and alt text', () => {
    render(<MediaFigure src="/cover.jpg" alt="January cover art" />)
    const img = screen.getByRole('img', { name: 'January cover art' })
    expect(img).toHaveAttribute('src', '/cover.jpg')
    expect(img.closest('figure')).toBeTruthy()
  })

  it('defaults generated images to lazy loading', () => {
    render(<MediaFigure src="/cover.jpg" alt="Cover" />)
    expect(screen.getByRole('img', { name: 'Cover' })).toHaveAttribute(
      'loading',
      'lazy',
    )
  })

  it('lets heroes opt into eager loading', () => {
    render(<MediaFigure src="/cover.jpg" alt="Cover" loading="eager" />)
    expect(screen.getByRole('img', { name: 'Cover' })).toHaveAttribute(
      'loading',
      'eager',
    )
  })

  it('paints a bottom fade into surface when fade is set', () => {
    const { container, rerender } = render(
      <MediaFigure src="/cover.jpg" alt="Cover" fade />,
    )
    expect(container.querySelector('[data-media-fade]')).toBeInTheDocument()
    rerender(<MediaFigure src="/cover.jpg" alt="Cover" />)
    expect(container.querySelector('[data-media-fade]')).not.toBeInTheDocument()
  })

  it('exposes an optional caption as figcaption', () => {
    render(
      <MediaFigure
        src="/cover.jpg"
        alt="Cover"
        caption="Cover Art — January 2026"
      />,
    )
    expect(screen.getByText('Cover Art — January 2026').tagName).toBe(
      'FIGCAPTION',
    )
  })

  it('lets children replace the generated image (video plane)', () => {
    render(
      <MediaFigure aspect="16/9">
        <video aria-label="Process recording" />
      </MediaFigure>,
    )
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Process recording').tagName).toBe('VIDEO')
  })

  it('renders a placeholder when there is no src or children', () => {
    const { container } = render(<MediaFigure />)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(container.querySelector('[aria-hidden]')).toHaveClass(
      'bg-av-surface-2',
    )
  })

  it('does not force img fill height in auto aspect', () => {
    const { container, rerender } = render(
      <MediaFigure src="/cover.jpg" alt="Cover" aspect="auto" />,
    )
    const autoPlane = container.querySelector('[data-media-plane]')
    expect(autoPlane?.className).toContain('[&_img]:h-auto')
    expect(autoPlane?.className).not.toContain('[&_img]:h-full')
    rerender(<MediaFigure src="/cover.jpg" alt="Cover" aspect="4/3" />)
    expect(container.querySelector('[data-media-plane]')?.className).toContain(
      '[&_img]:h-full',
    )
  })

  it('rounds gallery thumbs when radius is sm', () => {
    const { container, rerender } = render(
      <MediaFigure src="/cover.jpg" alt="Cover" />,
    )
    expect(
      container.querySelector('[data-media-plane]')?.className,
    ).not.toContain('rounded-sm')
    rerender(<MediaFigure src="/cover.jpg" alt="Cover" radius="sm" />)
    expect(container.querySelector('[data-media-plane]')?.className).toContain(
      'rounded-sm',
    )
  })
})
