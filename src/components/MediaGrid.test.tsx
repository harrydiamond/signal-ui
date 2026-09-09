import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MediaFigure } from './MediaFigure.tsx'
import { MediaGrid } from './MediaGrid.tsx'

describe('MediaGrid', () => {
  it('lists MediaFigure children as grid items', () => {
    render(
      <MediaGrid>
        <MediaFigure src="/a.jpg" alt="Frame A" aspect="square" />
        <MediaFigure src="/b.jpg" alt="Frame B" aspect="square" />
      </MediaGrid>,
    )
    const list = screen.getByRole('list')
    expect(list.className).toContain('grid-cols-2')
    expect(list.className).toContain('sm:grid-cols-3')
    expect(list.className).toContain('lg:grid-cols-4')
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByRole('img', { name: 'Frame A' })).toBeInTheDocument()
  })

  it('uses the compact thumb layout', () => {
    render(
      <MediaGrid layout="compact">
        <MediaFigure src="/a.jpg" alt="Thumb" aspect="square" />
      </MediaGrid>,
    )
    expect(screen.getByRole('list').className).toContain('xl:grid-cols-10')
  })
})
