import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Choice } from './Choice.tsx'

describe('Choice', () => {
  it('marks the selected chip', () => {
    render(<Choice selected>H.264</Choice>)
    const button = screen.getByRole('button', { name: 'H.264' })
    expect(button).toHaveAttribute('data-selected', 'true')
    expect(button).toHaveAttribute('aria-pressed', 'true')
  })

  it('fires click', () => {
    const onClick = vi.fn()
    render(<Choice onClick={onClick}>H.265</Choice>)
    fireEvent.click(screen.getByRole('button', { name: 'H.265' }))
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('button', { name: 'H.265' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
  })
})
