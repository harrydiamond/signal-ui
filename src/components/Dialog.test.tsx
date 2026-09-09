import { useState } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Theme } from './Theme.tsx'
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from './Dialog.tsx'

function Confirmation({
  onClose = () => {},
  open = true,
}: {
  onClose?: () => void
  open?: boolean
}) {
  return (
    <Theme>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Delete layout</DialogTitle>
        <DialogDescription>
          This removes the saved patch from this browser.
        </DialogDescription>
        <DialogFooter>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="button">Delete</button>
        </DialogFooter>
      </Dialog>
    </Theme>
  )
}

describe('Dialog', () => {
  it('opens as a labelled modal dialog', () => {
    render(<Confirmation />)
    const dialog = screen.getByRole('dialog', { name: 'Delete layout' })
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveAttribute('aria-labelledby')
    expect(dialog).toHaveAttribute('aria-describedby')
    expect(
      screen.getByText('This removes the saved patch from this browser.'),
    ).toBeInTheDocument()
  })

  it('closes on Escape', () => {
    const onClose = vi.fn()
    render(<Confirmation onClose={onClose} />)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('closes when the backdrop is clicked', () => {
    const onClose = vi.fn()
    render(<Confirmation onClose={onClose} />)
    fireEvent.click(
      document.querySelector('[data-av-overlay] [aria-hidden]') as Element,
    )
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not render when closed', () => {
    render(<Confirmation open={false} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('restores focus to the trigger on close', () => {
    function Demo() {
      const [open, setOpen] = useState(false)
      return (
        <Theme>
          <button type="button" onClick={() => setOpen(true)}>
            Open
          </button>
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Rename patch</DialogTitle>
            <button type="button" onClick={() => setOpen(false)}>
              Cancel
            </button>
          </Dialog>
        </Theme>
      )
    }

    render(<Demo />)
    const trigger = screen.getByRole('button', { name: 'Open' })
    trigger.focus()
    fireEvent.click(trigger)
    expect(screen.getByRole('dialog', { name: 'Rename patch' })).toBeVisible()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })

  it('accepts an aria-label when there is no title', () => {
    render(
      <Theme>
        <Dialog onClose={() => {}} aria-label="Save patch">
          <button type="button">Save</button>
        </Dialog>
      </Theme>,
    )
    expect(screen.getByRole('dialog', { name: 'Save patch' })).toBeVisible()
  })
})
