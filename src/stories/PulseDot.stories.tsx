import type { Meta, StoryObj } from '@storybook/react-vite'
import { PulseDot } from '../components/PulseDot.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/PulseDot',
  component: PulseDot,
  decorators: [withStoryPad],
  parameters: {
    docs: {
      description: {
        component: 'Accent status / section marker (optional pulse).',
      },
    },
  },
} satisfies Meta<typeof PulseDot>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Pulsing: Story = {
  args: { pulse: true },
}

export const InLabel: Story = {
  render: () => (
    <p className="text-av-muted flex items-center gap-2 font-mono text-xs uppercase">
      <PulseDot pulse /> Status
    </p>
  ),
}
