import { useState, type FormEvent } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Button } from '../components/Button.tsx'
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '../components/Dialog.tsx'
import { Field } from '../components/Field.tsx'
import { Input } from '../components/Input.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  decorators: [withStoryPad],
  args: { onClose: () => {}, children: null },
  parameters: {
    docs: {
      description: {
        component: `
Modal overlay for confirmations and in-context forms on both **phosphor** (console) and **editorial** (archive) sites. The panel is an \`av-card\`: hairline on phosphor, soft elevation on editorial. Backdrop is the same \`bg-black/50\` dim as \`SiteNav\`’s mobile overlay — not phosphor grain (that stays on the page).

**Overlay a11y:** \`role="dialog"\` + \`aria-modal="true"\`, labelled by \`DialogTitle\` (or \`aria-label\`), optional \`DialogDescription\`, focus trap while open, focus restored to the trigger on close, Escape and backdrop click call \`onClose\`. Stacks at \`z-[100]\` with the SiteNav overlay; \`Toast\` stays at \`z-50\` underneath.

**Public primitives:** \`Portal\` (body mount + theme copy) and \`FocusTrap\` ship for Menu / Drawer later. Pass \`container\` to \`Dialog\` / \`Portal\` to choose a mount node.
`.trim(),
      },
    },
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

function page(canvasElement: HTMLElement) {
  return within(canvasElement.ownerDocument.body)
}

export const Confirmation: Story = {
  args: { onClose: () => {} },
  render: function Render() {
    const [open, setOpen] = useState(true)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Delete layout</Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Delete layout?</DialogTitle>
          <DialogDescription>
            This removes the saved patch from this browser. It cannot be undone.
          </DialogDescription>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => setOpen(false)}>
              Delete
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    )
  },
  play: async ({ canvasElement }) => {
    const dialog = page(canvasElement).getByRole('dialog', {
      name: 'Delete layout?',
    })
    await expect(dialog).toBeVisible()
    await expect(dialog).toHaveAttribute('aria-modal', 'true')
  },
}

export const Form: Story = {
  args: { onClose: () => {} },
  render: function Render() {
    const [open, setOpen] = useState(true)
    const [name, setName] = useState('Cue 14')

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setOpen(false)
    }

    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>
          Rename patch
        </Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <form onSubmit={onSubmit}>
            <DialogTitle>Rename patch</DialogTitle>
            <DialogDescription>
              The name shows on the instrument header and in the patch list.
            </DialogDescription>
            <Field label="Name" htmlFor="dialog-patch-name" className="mt-4">
              <Input
                id="dialog-patch-name"
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </Field>
            <DialogFooter>
              <Button type="button" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save
              </Button>
            </DialogFooter>
          </form>
        </Dialog>
      </>
    )
  },
  play: async ({ canvasElement }) => {
    const body = page(canvasElement)
    await expect(
      body.getByRole('dialog', { name: 'Rename patch' }),
    ).toBeVisible()
    await expect(body.getByLabelText('Name')).toHaveValue('Cue 14')
  },
}

export const OpenClose: Story = {
  args: { onClose: () => {} },
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story:
          'Starts closed. Click the trigger, then Escape restores focus. Used for interaction tests; Chromatic snapshots Confirmation / Form instead.',
      },
    },
  },
  render: function Render() {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Hold 2s</DialogTitle>
          <DialogDescription>
            Escape or Cancel returns focus to the trigger.
          </DialogDescription>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
          </DialogFooter>
        </Dialog>
      </>
    )
  },
  play: async ({ canvas, canvasElement }) => {
    const body = page(canvasElement)
    const trigger = canvas.getByRole('button', { name: 'Open dialog' })
    await userEvent.click(trigger)
    await expect(body.getByRole('dialog', { name: 'Hold 2s' })).toBeVisible()
    await userEvent.keyboard('{Escape}')
    await expect(body.queryByRole('dialog')).not.toBeInTheDocument()
    await expect(trigger).toHaveFocus()
  },
}
