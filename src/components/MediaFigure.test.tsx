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
})
