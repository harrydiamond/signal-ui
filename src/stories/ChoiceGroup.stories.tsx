import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'
import { Choice } from '../components/Choice.tsx'
import { ChoiceGroup } from '../components/ChoiceGroup.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/ChoiceGroup',
  component: ChoiceGroup,
  decorators: [withStoryPad],
  args: { label: 'Mode', defaultValue: 'voltage' },
  parameters: {
    docs: {
      description: {
        component:
          'Exclusive Choice chips as toggle buttons. Pass value on each Choice.',
      },
    },
  },
} satisfies Meta<typeof ChoiceGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render(args) {
    const [choice, setChoice] = useState(args.defaultValue ?? 'voltage')
    return (
      <ChoiceGroup
        {...args}
        value={choice}
        onChange={setChoice}
        className="sm:grid-cols-3"
      >
        <Choice value="voltage">voltage</Choice>
        <Choice value="power">power</Choice>
        <Choice value="spl">spl</Choice>
      </ChoiceGroup>
    )
  },
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'power' }))
    await expect(
      canvas.getByRole('button', { name: 'power' }),
    ).toHaveAttribute('aria-pressed', 'true')
    await expect(
      canvas.getByRole('button', { name: 'voltage' }),
    ).toHaveAttribute('aria-pressed', 'false')
  },
}
