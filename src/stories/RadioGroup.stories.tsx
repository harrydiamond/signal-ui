import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'
import { Choice } from '../components/Choice.tsx'
import { RadioGroup } from '../components/ChoiceGroup.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  decorators: [withStoryPad],
  args: { label: 'Mode', defaultValue: 'voltage' },
  parameters: {
    docs: {
      description: {
        component:
          'Exclusive Choice chips with radio ARIA and arrow-key movement.',
      },
    },
  },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render(args) {
    const [choice, setChoice] = useState(args.defaultValue ?? 'voltage')
    return (
      <RadioGroup
        {...args}
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
  play: async ({ canvas }) => {
    const voltage = canvas.getByRole('radio', { name: 'voltage' })
    await userEvent.click(voltage)
    await userEvent.keyboard('{ArrowRight}')
    await expect(canvas.getByRole('radio', { name: 'power' })).toHaveAttribute(
      'aria-checked',
      'true',
    )
  },
}
