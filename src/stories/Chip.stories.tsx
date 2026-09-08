import type { Meta, StoryObj } from '@storybook/react-vite'
import { Chip } from '../components/Chip.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/Chip',
  component: Chip,
  decorators: [withStoryPad],
  args: { children: 'Signal', tone: 'signal' },
  argTypes: {
    tone: { control: 'select', options: ['sync', 'audio', 'signal', 'meter'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Chips name a channel — sync, audio, signal, meter. For a titled callout with a chip, use ChipCard.',
      },
    },
  },
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

export const Signal: Story = {}

export const Sync: Story = {
  args: { tone: 'sync', children: 'Sync' },
}

export const Audio: Story = {
  args: { tone: 'audio', children: 'Audio' },
}

export const Meter: Story = {
  args: { tone: 'meter', children: 'Meter' },
}
