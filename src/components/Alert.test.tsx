import { render, screen } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Alert } from './Alert.tsx'

describe('Alert', () => {
  it('uses status for non-error tones', () => {
    render(<Alert title="Saved">Config written.</Alert>)
    expect(screen.getByRole('status')).toHaveTextContent('Config written.')
  })

  it('uses alert for errors and dismisses', () => {
    const onDismiss = vi.fn()
    render(
      <Alert tone="error" title="Could not save" onDismiss={onDismiss}>
        Check the patch.
      </Alert>,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('Check the patch.')
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }))
    expect(onDismiss).toHaveBeenCalledTimes(1)
  })
})
