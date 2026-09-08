import type { Meta, StoryObj } from '@storybook/react-vite'
import { ExternalLink } from '../components/ExternalLink.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/ExternalLink',
  component: ExternalLink,
  decorators: [withStoryPad],
  parameters: {
    docs: {
      description: {
        component: 'Soft-elevation pill for outbound links with a trailing ↗.',
      },
    },
  },
} satisfies Meta<typeof ExternalLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    href: 'https://example.com',
    children: 'example.com',
  },
}

export const Row: Story = {
  args: { href: '#', children: 'Link' },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <ExternalLink href="https://github.com">GitHub</ExternalLink>
      <ExternalLink href="https://example.com">Docs</ExternalLink>
    </div>
  ),
}
