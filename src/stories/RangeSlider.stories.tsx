import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { RangeSlider } from '../components/RangeSlider.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/RangeSlider',
  component: RangeSlider,
  decorators: [withStoryPad],
  args: {
    id: 'throw',
    min: 0,
    max: 12,
    step: 1,
    value: 6,
    minLabel: '0 m',
    maxLabel: '12 m',
    ariaLabel: 'Throw',
    onChange: () => {},
  },
  parameters: {
    docs: {
      description: {
        component: 'Sliders are an LED matrix, not a rounded track.',
      },
    },
  },
} satisfies Meta<typeof RangeSlider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render(args) {
    const [value, setValue] = useState(args.value)
    return <RangeSlider {...args} value={value} onChange={setValue} />
  },
}

export const Quality: Story = {
  args: {
    id: 'quality',
    max: 9,
    value: 7,
    minLabel: '0%',
    maxLabel: '100%',
    ariaLabel: 'Quality',
    variant: 'quality',
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.value)
    return <RangeSlider {...args} value={value} onChange={setValue} />
  },
}
