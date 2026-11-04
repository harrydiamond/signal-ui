import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AV_STAGGER_MS } from '../tokens.ts'
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

  it('staggers fade-in-up on each item', () => {
    render(
      <MediaGrid stagger>
        <MediaFigure src="/a.jpg" alt="Frame A" aspect="square" />
        <MediaFigure src="/b.jpg" alt="Frame B" aspect="square" />
      </MediaGrid>,
    )
    const items = screen.getAllByRole('listitem')
    expect(items[0].className).toContain('animate-fade-in-up')
    expect(items[0]).toHaveStyle({ animationDelay: '0ms' })
    expect(items[1]).toHaveStyle({
      animationDelay: `${AV_STAGGER_MS}ms`,
    })
  })
})
