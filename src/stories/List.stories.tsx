import type { Meta, StoryObj } from '@storybook/react-vite'
import { List, ListRow } from '../components/List.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/List',
  component: List,
  decorators: [withStoryPad],
  parameters: {
    docs: {
      description: {
        component:
          'Packed rows use hairline dividers and LED values. Standalone lists keep their own radius; inside Card they sit flush.',
      },
    },
  },
} satisfies Meta<typeof List>

export default meta
type Story = StoryObj<typeof meta>

export const Rows: Story = {
  render: () => (
    <List>
      <ListRow label="Packed row label" value="+6 dB" />
      <ListRow label="Another value" value="0 dB" />
    </List>
  ),
}
