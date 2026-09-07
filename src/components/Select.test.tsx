import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Select } from './Select.tsx'

describe('Select', () => {
  it('renders options and the selected value', () => {
    render(
      <Select aria-label="Codec" defaultValue="h264">
        <option value="h264">H.264</option>
        <option value="h265">H.265</option>
      </Select>,
    )
    expect(screen.getByLabelText('Codec')).toHaveValue('h264')
    expect(screen.getByRole('option', { name: 'H.265' })).toBeInTheDocument()
  })

  it('fires onChange', () => {
    const onChange = vi.fn()
    render(
      <Select aria-label="Codec" defaultValue="h264" onChange={onChange}>
        <option value="h264">H.264</option>
        <option value="h265">H.265</option>
      </Select>,
    )
    fireEvent.change(screen.getByLabelText('Codec'), { target: { value: 'h265' } })
    expect(onChange).toHaveBeenCalled()
    expect(screen.getByLabelText('Codec')).toHaveValue('h265')
  })

  it('forwards a ref to the select', () => {
    const ref = { current: null as HTMLSelectElement | null }
    render(
      <Select aria-label="Codec" ref={ref} defaultValue="h264">
        <option value="h264">H.264</option>
      </Select>,
    )
    expect(ref.current).toBeInstanceOf(HTMLSelectElement)
    expect(ref.current).toBe(screen.getByLabelText('Codec'))
  })
})
