import type { Meta, StoryObj } from '@storybook/react-vite'
import { BackLink } from '../components/BackLink.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/BackLink',
  component: BackLink,
  decorators: [withStoryPad],
  parameters: {
    docs: {
      description: {
        component: 'Mono uppercase back / breadcrumb link.',
      },
    },
  },
} satisfies Meta<typeof BackLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    href: '#',
    children: 'All posts',
  },
}
