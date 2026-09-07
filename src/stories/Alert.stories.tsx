import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'
import { Alert } from '../components/Alert.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/Alert',
  component: Alert,
  decorators: [withStoryPad],
  args: {
    tone: 'info',
    title: 'Universe 1',
    children: 'Highlighted on the channel map.',
  },
  argTypes: {
    tone: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Inline status, not a toast. Surface fill with a straight left LED — no boxed border.',
      },
    },
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = {}

export const Success: Story = {
  args: {
    tone: 'success',
    title: 'Saved',
    children: 'Layout written to this browser.',
  },
}

export const Warning: Story = {
  args: {
    tone: 'warning',
    title: 'Headroom',
    children: 'Breaker is at 90% of rated load.',
  },
}

export const Error: Story = {
  args: {
    tone: 'error',
    title: 'Could not export',
    children: 'Check the frame size and try again.',
  },
}

export const Dismissible: Story = {
  args: {
    title: 'Dismissible',
    children: 'Close uses the same ghost control as toast.',
  },
  render: function Render(args) {
    const [visible, setVisible] = useState(true)
    return visible ? (
      <Alert {...args} onDismiss={() => setVisible(false)} />
    ) : null
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Dismissible')).toBeVisible()
    await userEvent.click(canvas.getByRole('button', { name: 'Dismiss' }))
    await expect(canvas.queryByText('Dismissible')).not.toBeInTheDocument()
  },
}
