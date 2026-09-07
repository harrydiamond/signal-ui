import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'
import { Checkbox } from '../components/Checkbox.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  decorators: [withStoryPad],
  args: { label: 'Include foam' },
  parameters: {
    docs: {
      description: {
        component:
          'Form boolean. The box is fill, not a native tick — checked uses the same audio inset as choice chips.',
      },
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    const box = canvas.getByRole('checkbox', { name: 'Include foam' })
    await expect(box).not.toBeChecked()
    await userEvent.click(box)
    await expect(box).toBeChecked()
  },
}

export const Checked: Story = {
  args: { label: 'Show graticule', defaultChecked: true },
}

export const Disabled: Story = {
  args: { label: 'Disabled', disabled: true },
}

export const DisabledOn: Story = {
  args: { label: 'Disabled on', disabled: true, defaultChecked: true },
}
