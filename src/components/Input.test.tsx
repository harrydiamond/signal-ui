import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Input } from './Input.tsx'

describe('Input', () => {
  it('renders a labelled text control', () => {
    render(
      <label>
        Meters
        <Input defaultValue="12" />
      </label>,
    )
    expect(screen.getByLabelText('Meters')).toHaveValue('12')
  })

  it('fires onChange', () => {
    const onChange = vi.fn()
    render(<Input aria-label="Throw" onChange={onChange} />)
    fireEvent.change(screen.getByLabelText('Throw'), { target: { value: '8' } })
    expect(onChange).toHaveBeenCalled()
    expect(screen.getByLabelText('Throw')).toHaveValue('8')
  })

  it('forwards a ref to the input', () => {
    const ref = { current: null as HTMLInputElement | null }
    render(<Input aria-label="Throw" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
    expect(ref.current).toBe(screen.getByLabelText('Throw'))
  })
})
