import type { Meta, StoryObj } from '@storybook/react-vite'
import { Link } from '../components/Link.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/Link',
  component: Link,
  decorators: [withStoryPad],
  args: { href: '#color', children: 'DMX Reference' },
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
