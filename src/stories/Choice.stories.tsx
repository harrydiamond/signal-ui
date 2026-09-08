import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent } from 'storybook/test'
import { Choice } from '../components/Choice.tsx'
import { RadioGroup } from '../components/RadioGroup.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/Choice',
  component: Choice,
  decorators: [withStoryPad],
  args: { children: 'Voltage', onClick: fn() },
  parameters: {
    docs: {
      description: {
        component:
          'Choice chips use a hairline keyline by default and keep an audio-tinted inset when selected.',
      },
    },
  },
} satisfies Meta<typeof Choice>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Voltage' }))
    await expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}

export const Selected: Story = {
  args: { selected: true, children: 'Voltage' },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('button', { name: 'Voltage' }),
    ).toHaveAttribute('aria-pressed', 'true')
  },
}

export const Group: Story = {
  render: function Render() {
    const [choice, setChoice] = useState('voltage')
    return (
      <RadioGroup
        label="Mode"
        value={choice}
        onChange={setChoice}
        className="sm:grid-cols-3"
      >
        <Choice value="voltage">voltage</Choice>
        <Choice value="power">power</Choice>
        <Choice value="spl">spl</Choice>
      </RadioGroup>
    )
  },
}
