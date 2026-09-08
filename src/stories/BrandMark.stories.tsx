import type { Meta, StoryObj } from '@storybook/react-vite'
import { BrandMark } from '../components/BrandMark.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/BrandMark',
  component: BrandMark,
  decorators: [withStoryPad],
  parameters: {
    docs: {
      description: {
        component:
          'Signal name, quieter white TLD. Size inherits from the parent.',
      },
    },
  },
} satisfies Meta<typeof BrandMark>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  decorators: [
    Story => (
      <p style={{ fontSize: '1.5rem' }}>
        <Story />
      </p>
    ),
  ],
}

export const Custom: Story = {
  args: { name: 'stage', tld: '.tools' },
  decorators: [
    Story => (
      <p style={{ fontSize: '1.5rem' }}>
        <Story />
      </p>
    ),
  ],
}
