import { render, screen } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button.tsx'

describe('Button', () => {
  it('renders a primary action and fires click', () => {
    const onClick = vi.fn()
    render(
      <Button variant="primary" onClick={onClick}>
        Calculate
      </Button>,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Calculate' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('marks pressed state on pad', () => {
    render(
      <Button variant="pad" pressed>
        TAP
      </Button>,
    )
    const button = screen.getByRole('button', { name: 'TAP' })
    expect(button).toHaveAttribute('data-pressed', 'true')
    expect(button.className).toContain('av-btn-pad')
  })

  it('renders a danger action', () => {
    render(<Button variant="danger">Delete</Button>)
    expect(screen.getByRole('button', { name: 'Delete' }).className).toContain(
      'bg-av-danger',
    )
  })
})
