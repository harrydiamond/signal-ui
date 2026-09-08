import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from '../components/Textarea.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  decorators: [withStoryPad],
  args: { defaultValue: 'Cue 14 — hold 2s', 'aria-label': 'Cue notes' },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
