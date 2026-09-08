import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChipCard } from '../components/Chip.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/ChipCard',
  component: ChipCard,
  decorators: [withStoryPad],
  args: {
    tone: 'sync',
    chip: 'Sync',
    title: 'Use-case title',
    description: 'Short caption under a chip card.',
  },
  argTypes: {
    tone: { control: 'select', options: ['sync', 'audio', 'signal', 'meter'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Titled block with a channel Chip. Use for feature or use-case callouts — not for status tags (Badge) or bare channel labels (Chip).',
      },
    },
  },
} satisfies Meta<typeof ChipCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Signal: Story = {
  args: {
    tone: 'signal',
    chip: 'Signal',
    title: 'Another card',
    description: 'Same pattern, signal accent.',
  },
}

export const Meter: Story = {
  args: {
    tone: 'meter',
    chip: 'Meter',
    title: 'Caution card',
    description: 'Same pattern, meter accent.',
  },
}
