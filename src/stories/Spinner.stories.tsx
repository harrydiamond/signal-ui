import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../components/Button.tsx'
import { Spinner } from '../components/Spinner.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  decorators: [withStoryPad],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Phosphor ring, not a generic border spinner. Label stays for assistive tech.',
      },
    },
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Medium: Story = {}

export const Small: Story = {
  args: { size: 'sm' },
}

export const Large: Story = {
  args: { size: 'lg' },
}

export const InButton: Story = {
  args: { size: 'sm', label: 'Saving' },
  render: args => (
    <Button variant="primary" disabled>
      <Spinner {...args} className="me-2" />
      Saving
    </Button>
  ),
}
