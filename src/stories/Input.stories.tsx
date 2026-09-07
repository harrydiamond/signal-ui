import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from '../components/Input.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/Input',
  component: Input,
  decorators: [withStoryPad],
  args: { defaultValue: '120' },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
