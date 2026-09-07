import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from '../components/Badge.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  decorators: [withStoryPad],
  args: { label: 'Reference', tone: 'muted' },
  argTypes: {
    tone: { control: 'select', options: ['muted', 'meter'] },
    surface: { control: 'select', options: ['surface', 'page'] },
  },
  parameters: {
    docs: {
      description: {
        component: 'Badges mark status on a tile or header.',
      },
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Muted: Story = {}

export const Meter: Story = {
  args: { label: 'Beta', tone: 'meter' },
}
