import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Tile } from './Tile.tsx'

describe('Tile', () => {
  it('renders a tool row with CTA', () => {
    render(
      <Tile
        href="/tools/tap-bpm"
        title="Tap BPM"
        description="Tap a tempo."
        density="row"
      />,
    )
    expect(screen.getByRole('link', { name: /Tap BPM/ })).toHaveAttribute(
      'href',
      '/tools/tap-bpm',
    )
    expect(screen.getByText('Tap a tempo.')).toBeInTheDocument()
  })

  it('renders children as the icon', () => {
    render(
      <Tile
        href="/tools/tap-bpm"
        title="Tap BPM"
        description="Tap a tempo."
        density="row"
      >
        <span data-testid="tile-icon">icon</span>
      </Tile>,
    )
    expect(screen.getByTestId('tile-icon')).toBeInTheDocument()
  })

  it('uses reference CTA copy', () => {
    render(
      <Tile
        href="/reference/dmx-info"
        title="DMX Reference"
        description="Universes and start codes."
        variant="reference"
      />,
    )
    expect(screen.getByText('View reference')).toBeInTheDocument()
  })
})
