import type { Meta, StoryObj } from '@storybook/react-vite'
import { PageHeader } from '../components/PageHeader.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/PageHeader',
  component: PageHeader,
  decorators: [withStoryPad],
  args: {
    title: 'Delay',
    description: 'ms ↔ meters from speed of sound.',
  },
} satisfies Meta<typeof PageHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithBadge: Story = {
  args: {
    title: 'dB Calculator',
    description: 'Convert voltage, power, and SPL ratios to decibels.',
    badge: 'Tool',
  },
}

export const CustomBrand: Story = {
  args: {
    title: 'Delay',
    description:
      'A second site built only from these primitives — same phosphor console, different product.',
    brand: { name: 'stage', tld: '.tools', href: '#top' },
  },
}
