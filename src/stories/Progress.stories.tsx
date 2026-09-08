import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { Progress } from '../components/Progress.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/Progress',
  component: Progress,
  decorators: [withStoryPad],
  args: {
    value: 0.4,
    max: 1,
    label: 'Encoding',
  },
  parameters: {
    docs: {
      description: {
        component:
          'Determinate fill on the LED matrix. Omit value for an indeterminate spinner plus unlit track.',
      },
    },
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Determinate: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('progressbar', { name: 'Encoding' }),
    ).toHaveAttribute('aria-valuenow', '0.4')
  },
}

export const Complete: Story = {
  args: { value: 1, label: 'Done' },
}

export const Indeterminate: Story = {
  args: { value: undefined, label: 'Working' },
}
