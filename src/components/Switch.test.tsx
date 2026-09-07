import { render, screen } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Switch } from './Switch.tsx'

describe('Switch', () => {
  it('exposes a switch role with the label', () => {
    render(<Switch checked={false} label="Meters" />)
    expect(screen.getByRole('switch', { name: 'Meters' })).toHaveAttribute(
      'aria-checked',
      'false',
    )
  })

  it('notifies when toggled', () => {
    const onCheckedChange = vi.fn()
    render(
      <Switch
        checked={false}
        label="Meters"
        onCheckedChange={onCheckedChange}
      />,
    )
    fireEvent.click(screen.getByRole('switch', { name: 'Meters' }))
    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })
})
