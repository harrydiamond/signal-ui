import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'
import { Step, Steps } from '../components/Steps.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/Steps',
  component: Steps,
  decorators: [withStoryPad],
  parameters: {
    docs: {
      description: {
        component:
          'Step N of M indicator. Current index is ink fill; complete uses the audio cue. Labels stay in the consumer.',
      },
    },
  },
} satisfies Meta<typeof Steps>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { defaultValue: 'song', label: 'Studio' },
  render: function Render(args) {
    const [step, setStep] = useState(args.defaultValue ?? 'song')
    return (
      <Steps {...args} value={step} onChange={setStep}>
        <Step value="art" label="Artwork" complete />
        <Step value="song" label="Song" />
        <Step value="loop" label="Loop" />
        <Step value="export" label="Export" />
      </Steps>
    )
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('button', { name: 'Song, step 2 of 4' }),
    ).toHaveAttribute('aria-current', 'step')
    await userEvent.click(
      canvas.getByRole('button', { name: 'Loop, step 3 of 4' }),
    )
    await expect(
      canvas.getByRole('button', { name: 'Loop, step 3 of 4' }),
    ).toHaveAttribute('aria-current', 'step')
  },
}
