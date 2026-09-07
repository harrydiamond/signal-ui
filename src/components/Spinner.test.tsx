import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Spinner } from './Spinner.tsx'

describe('Spinner', () => {
  it('exposes a status with the default label', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toHaveTextContent('Loading')
  })

  it('uses a custom label', () => {
    render(<Spinner label="Exporting" />)
    expect(screen.getByRole('status')).toHaveTextContent('Exporting')
  })
})
