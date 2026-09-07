import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent } from 'storybook/test'
import { Button } from '../components/Button.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/Button',
  component: Button,
  decorators: [withStoryPad],
  args: { children: 'Calculate', onClick: fn() },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'ghost', 'panel', 'pad', 'danger'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Default operable chrome has no visible border. Primary is white fill. Danger uses the danger token. Panel and pad are instrument-hot.',
      },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('button'))
    await expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}

export const Primary: Story = {
  args: { variant: 'primary', children: 'Primary' },
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('button'))
    await expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ghost' },
}

export const Panel: Story = {
  args: { variant: 'panel', children: 'Panel' },
}

export const Disabled: Story = {
  args: { variant: 'primary', disabled: true, children: 'Disabled' },
}

export const Danger: Story = {
  args: { variant: 'danger', children: 'Delete' },
}

export const Pressed: Story = {
  args: { pressed: true, children: 'Default' },
}

export const PressedPrimary: Story = {
  args: { variant: 'primary', pressed: true, children: 'Primary' },
}

export const PressedGhost: Story = {
  args: { variant: 'ghost', pressed: true, children: 'Ghost' },
}

export const PressedPanel: Story = {
  args: { variant: 'panel', pressed: true, children: 'Panel' },
}

export const PressedDanger: Story = {
  args: { variant: 'danger', pressed: true, children: 'Delete' },
}

export const Pad: Story = {
  args: { variant: 'pad', size: 'lg', children: 'TAP' },
}
