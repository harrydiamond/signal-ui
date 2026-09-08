import type { Meta, StoryObj } from '@storybook/react-vite'
import { Heading } from '../components/Heading.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Foundations/Heading',
  component: Heading,
  decorators: [withStoryPad],
  args: { children: 'Page title', level: 1 },
  argTypes: {
    level: { control: 'select', options: [1, 2, 3, 4] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Face and weight follow the active theme (Doto under phosphor, sans under editorial). h4 stays a quieter uppercase caption.',
      },
    },
  },
} satisfies Meta<typeof Heading>

export default meta
type Story = StoryObj<typeof meta>

export const PageTitle: Story = {}

export const Section: Story = {
  args: { level: 2, children: 'Section heading' },
}

export const Subsection: Story = {
  args: { level: 3, children: 'Subsection heading' },
}

export const Caption: Story = {
  args: { level: 4, children: 'Caption heading' },
}
