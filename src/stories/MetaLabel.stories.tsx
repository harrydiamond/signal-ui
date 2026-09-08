import type { Meta, StoryObj } from '@storybook/react-vite'
import { MetaLabel } from '../components/MetaLabel.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/MetaLabel',
  component: MetaLabel,
  decorators: [withStoryPad],
  parameters: {
    docs: {
      description: {
        component:
          'Mono uppercase micro-label for meta rows and category accents.',
      },
    },
  },
} satisfies Meta<typeof MetaLabel>

export default meta
type Story = StoryObj<typeof meta>

export const Muted: Story = {
  args: { children: 'Updated Mar 2026', tone: 'muted' },
}

export const Accent: Story = {
  args: { children: 'Projects', tone: 'accent' },
}

export const Ink: Story = {
  args: { children: 'Signal UI', tone: 'ink' },
}
