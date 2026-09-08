import type { Meta, StoryObj } from '@storybook/react-vite'
import { NavLink } from '../components/NavLink.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/NavLink',
  component: NavLink,
  decorators: [withStoryPad],
  parameters: {
    docs: {
      description: {
        component: 'Mono uppercase site-nav item with active / muted states.',
      },
    },
  },
} satisfies Meta<typeof NavLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Posts', href: '#posts' },
}

export const Active: Story = {
  args: { children: 'Home', href: '#', active: true },
}

export const Row: Story = {
  args: { children: 'Home', href: '#' },
  render: () => (
    <nav className="flex items-center gap-6">
      <NavLink href="#home" active>
        Home
      </NavLink>
      <NavLink href="#posts">Posts</NavLink>
      <NavLink href="#projects">Projects</NavLink>
    </nav>
  ),
}
