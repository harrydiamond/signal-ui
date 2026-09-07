import { render, screen } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Checkbox } from './Checkbox.tsx'

describe('Checkbox', () => {
  it('associates the label with the control', () => {
    render(<Checkbox label="Show graticule" />)
    expect(
      screen.getByRole('checkbox', { name: 'Show graticule' }),
    ).toBeInTheDocument()
  })

  it('toggles checked state', () => {
    const onChange = vi.fn()
    render(<Checkbox label="Lock" onChange={onChange} />)
    const box = screen.getByRole('checkbox', { name: 'Lock' })
    expect(box).not.toBeChecked()
    fireEvent.click(box)
    expect(onChange).toHaveBeenCalled()
    expect(box).toBeChecked()
  })
})
