import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'
import { Switch } from '../components/Switch.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/Switch',
  component: Switch,
  decorators: [withStoryPad],
  args: { label: 'Meters', checked: false },
  parameters: {
    docs: {
      description: {
        component:
          'Settings toggle, not a form checkbox. On uses audio fill; the track has no border.',
      },
    },
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Off: Story = {
  render: function Render(args) {
    const [checked, setChecked] = useState(args.checked)
    return <Switch {...args} checked={checked} onCheckedChange={setChecked} />
  },
  play: async ({ canvas }) => {
    const sw = canvas.getByRole('switch', { name: 'Meters' })
    await expect(sw).toHaveAttribute('aria-checked', 'false')
    await userEvent.click(sw)
    await expect(sw).toHaveAttribute('aria-checked', 'true')
  },
}

export const On: Story = {
  args: { label: 'Meters', checked: true },
  render: function Render(args) {
    const [checked, setChecked] = useState(args.checked)
    return <Switch {...args} checked={checked} onCheckedChange={setChecked} />
  },
}

export const Disabled: Story = {
  args: { label: 'Disabled', checked: false, disabled: true },
}

export const DisabledOn: Story = {
  args: { label: 'Disabled on', checked: true, disabled: true },
}
