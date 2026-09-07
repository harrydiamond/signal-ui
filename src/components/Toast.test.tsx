import { render, screen } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Toast } from './Toast.tsx'

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows the message and dismisses on close', () => {
    const onDismiss = vi.fn()
    render(
      <Toast message="Config saved" tone="success" onDismiss={onDismiss} />,
    )
    expect(screen.getByRole('status')).toHaveTextContent('Config saved')
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite')
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }))
    expect(onDismiss).toHaveBeenCalled()
  })

  it('uses an assertive live region for errors', () => {
    render(
      <Toast
        message="Could not save"
        tone="error"
        durationMs={0}
        onDismiss={() => {}}
      />,
    )
    expect(screen.getByRole('status')).toHaveAttribute(
      'aria-live',
      'assertive',
    )
  })

  it('auto-dismisses after the default delay', () => {
    const onDismiss = vi.fn()
    render(
      <Toast message="Layout saved." tone="success" onDismiss={onDismiss} />,
    )
    expect(onDismiss).not.toHaveBeenCalled()
    vi.advanceTimersByTime(3200)
    expect(onDismiss).toHaveBeenCalledTimes(1)
  })
})
