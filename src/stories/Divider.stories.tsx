import type { Meta, StoryObj } from '@storybook/react-vite'
import { Divider } from '../components/List.tsx'
import { Prose, ProseMuted } from '../components/Text.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/Divider',
  component: Divider,
  decorators: [withStoryPad],
  parameters: {
    docs: {
      description: {
        component: 'Hairline rule between stacked blocks. Not a list row.',
      },
    },
  },
} satisfies Meta<typeof Divider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <>
      <Prose>Copy above the rule.</Prose>
      <Divider className="my-6" />
      <ProseMuted>Copy below the rule.</ProseMuted>
    </>
  ),
}
