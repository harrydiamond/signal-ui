import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select } from '../components/Select.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/Select',
  component: Select,
  decorators: [withStoryPad],
  args: { defaultValue: 'voltage' },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => (
    <Select {...args}>
      <option value="voltage">Voltage</option>
      <option value="power">Power</option>
      <option value="spl">SPL</option>
    </Select>
  ),
}
