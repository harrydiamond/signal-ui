import type { Meta, StoryObj } from '@storybook/react-vite'
import { SkipLink } from '../components/SkipLink.tsx'
import { ProseMuted } from '../components/Text.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/SkipLink',
  component: SkipLink,
  decorators: [withStoryPad],
  parameters: {
    docs: {
      description: {
        component: 'Visually hidden until focused. Tab once to reveal it.',
      },
    },
  },
} satisfies Meta<typeof SkipLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => (
    <>
      <SkipLink {...args} />
      <ProseMuted>Tab once for the skip link.</ProseMuted>
    </>
  ),
}
