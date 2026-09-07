import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Field } from './Field.tsx'
import { Input } from './Input.tsx'

describe('Field', () => {
  it('associates a label with the control', () => {
    render(
      <Field label="Meters" htmlFor="meters">
        <Input id="meters" defaultValue="12" />
      </Field>,
    )
    expect(screen.getByLabelText('Meters')).toHaveValue('12')
  })

  it('shows an error instead of the hint', () => {
    render(
      <Field label="Meters" hint="At 20 °C" error="Enter a number">
        <Input defaultValue="x" />
      </Field>,
    )
    const control = screen.getByLabelText('Meters')
    const alert = screen.getByRole('alert')
    expect(alert).toHaveTextContent('Enter a number')
    expect(screen.queryByText('At 20 °C')).not.toBeInTheDocument()
    expect(control).toHaveAttribute('aria-invalid', 'true')
    expect(control).toHaveAttribute('aria-describedby', alert.id)
  })

  it('points the control at the hint when there is no error', () => {
    render(
      <Field label="Notes" hint="Optional caption">
        <Input defaultValue="Cue 14" />
      </Field>,
    )
    const control = screen.getByLabelText('Notes')
    const hintId = control.getAttribute('aria-describedby')
    expect(hintId).toBeTruthy()
    expect(document.getElementById(hintId!)).toHaveTextContent(
      'Optional caption',
    )
  })
})
