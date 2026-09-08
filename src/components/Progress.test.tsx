import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Progress } from './Progress.tsx'

describe('Progress', () => {
  it('exposes a determinate progressbar', () => {
    render(<Progress value={0.4} label="Encoding" />)
    const bar = screen.getByRole('progressbar', { name: 'Encoding' })
    expect(bar).toHaveAttribute('aria-valuenow', '0.4')
    expect(bar).toHaveAttribute('aria-valuemax', '1')
    expect(screen.getByText('Encoding')).toBeInTheDocument()
  })

  it('omits valuemow when indeterminate', () => {
    render(<Progress label="Working" />)
    const bar = screen.getByRole('progressbar', { name: 'Working' })
    expect(bar).not.toHaveAttribute('aria-valuenow')
  })
})
