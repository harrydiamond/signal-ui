import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../components/Button.tsx'
import { Toast } from '../components/Toast.tsx'
import { useToast } from '../hooks/useToast.ts'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/Toast',
  component: Toast,
  decorators: [withStoryPad],
  args: {
    message: 'Config saved',
    tone: 'success',
    durationMs: 0,
    onDismiss: () => {},
  },
  argTypes: {
    tone: { control: 'select', options: ['success', 'error'] },
  },
  parameters: {
    docs: {
      description: {
        component: 'Fixed corner status. Auto-dismisses unless duration is 0.',
      },
    },
  },
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(true)
    return open ? <Toast {...args} onDismiss={() => setOpen(false)} /> : null
  },
}

export const Error: Story = {
  args: { message: 'Could not save', tone: 'error' },
  render: function Render(args) {
    const [open, setOpen] = useState(true)
    return open ? <Toast {...args} onDismiss={() => setOpen(false)} /> : null
  },
}

export const Interactive: Story = {
  render: function Render() {
    const { toast, showToast, dismissToast } = useToast()
    return (
      <>
        <div className="flex flex-wrap gap-2">
          <Button variant="primary" onClick={() => showToast('Config saved')}>
            Success
          </Button>
          <Button onClick={() => showToast('Could not save', 'error')}>
            Error
          </Button>
        </div>
        {toast ? (
          <Toast
            message={toast.message}
            tone={toast.tone}
            onDismiss={dismissToast}
          />
        ) : null}
      </>
    )
  },
}
