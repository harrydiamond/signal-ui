import { render, screen } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FocusTrap } from './FocusTrap.tsx'

describe('FocusTrap', () => {
  it('focuses the trap and restores focus on unmount', () => {
    function Demo({ open }: { open: boolean }) {
      return (
        <>
          <button type="button">Trigger</button>
          {open ? (
            <FocusTrap>
              <button type="button">Inside</button>
            </FocusTrap>
          ) : null}
        </>
      )
    }

    const { rerender } = render(<Demo open={false} />)
    const trigger = screen.getByRole('button', { name: 'Trigger' })
    trigger.focus()
    expect(trigger).toHaveFocus()

    rerender(<Demo open={true} />)
    expect(
      screen.getByRole('button', { name: 'Inside' }).closest('[tabindex]'),
    ).toHaveFocus()

    rerender(<Demo open={false} />)
    expect(trigger).toHaveFocus()
  })

  it('cycles Tab from the last control back to the first', () => {
    render(
      <FocusTrap>
        <button type="button">One</button>
        <button type="button">Two</button>
      </FocusTrap>,
    )

    const one = screen.getByRole('button', { name: 'One' })
    const two = screen.getByRole('button', { name: 'Two' })
    two.focus()
    fireEvent.keyDown(document, { key: 'Tab' })
    expect(one).toHaveFocus()

    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true })
    expect(two).toHaveFocus()
  })
})
