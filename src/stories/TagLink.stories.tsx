import type { Meta, StoryObj } from '@storybook/react-vite'
import { TagLink } from '../components/TagLink.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/TagLink',
  component: TagLink,
  decorators: [withStoryPad],
  parameters: {
    docs: {
      description: {
        component:
          'Soft-elevation tag link with optional staggered fade-in-up.',
      },
    },
  },
} satisfies Meta<typeof TagLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'design-systems', href: '#' },
}

export const Staggered: Story = {
  args: {
    children: 'react',
    href: '#',
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      {['react', 'astro', 'tailwind', 'storybook'].map((tag, index) => (
        <TagLink key={tag} href={`#${tag}`} index={index}>
          {tag}
        </TagLink>
      ))}
    </div>
  ),
}
