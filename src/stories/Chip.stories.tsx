import type { Meta, StoryObj } from '@storybook/react-vite'
import { Chip, ChipCard } from '../components/Chip.tsx'
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
        component: 'Chips name a channel — sync, audio, signal, meter.',
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

export const Card: Story = {
  render: () => (
    <ChipCard
      tone="sync"
      chip="Sync"
      title="Use-case title"
      description="Short caption under a chip card."
    />
  ),
}

export const CardSignal: Story = {
  render: () => (
    <ChipCard
      tone="signal"
      chip="Signal"
      title="Another card"
      description="Same pattern, signal accent."
    />
  ),
}

export const CardMeter: Story = {
  render: () => (
    <ChipCard
      tone="meter"
      chip="Meter"
      title="Caution card"
      description="Same pattern, meter accent."
    />
  ),
}
