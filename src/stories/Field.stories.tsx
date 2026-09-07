import type { Meta, StoryObj } from '@storybook/react-vite'
import { Field } from '../components/Field.tsx'
import { Input } from '../components/Input.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/Field',
  component: Field,
  decorators: [withStoryPad],
  args: { label: 'Input', htmlFor: 'demo-input' },
  parameters: {
    docs: {
      description: {
        component: 'Label, control, and optional hint or error on Plex.',
      },
    },
  },
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => (
    <Field {...args}>
      <Input id="demo-input" defaultValue="120" />
    </Field>
  ),
}

export const Hint: Story = {
  args: {
    label: 'Notes',
    htmlFor: 'demo-notes',
    hint: 'Optional caption under a field.',
  },
  render: args => (
    <Field {...args}>
      <Input id="demo-notes" defaultValue="Cue 14 — hold 2s" />
    </Field>
  ),
}

export const Error: Story = {
  args: {
    label: 'Meters',
    htmlFor: 'demo-error',
    hint: 'At 20 °C',
    error: 'Enter a number',
  },
  render: args => (
    <Field {...args}>
      <Input id="demo-error" defaultValue="x" />
    </Field>
  ),
}
