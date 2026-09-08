import type { Meta, StoryObj } from '@storybook/react-vite'
import { NavLink } from '../components/NavLink.tsx'
import { SectionHeader } from '../components/SectionHeader.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/SectionHeader',
  component: SectionHeader,
  decorators: [withStoryPad],
  parameters: {
    docs: {
      description: {
        component:
          'Section title with accent micro-label, PulseDot, and optional action.',
      },
    },
  },
} satisfies Meta<typeof SectionHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'This week',
  },
}

export const WithAction: Story = {
  args: { title: 'Projects' },
  render: () => (
    <SectionHeader
      title="Projects"
      action={
        <NavLink href="#all" className="leading-none">
          View all →
        </NavLink>
      }
    />
  ),
}

export const Pulsing: Story = {
  args: { title: 'Live', pulse: true },
}
