import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { AV, AV_RGB } from '../tokens.ts'
import { LedMatrixBar } from '../components/LedMatrixBar.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/LedMatrixBar',
  component: LedMatrixBar,
  decorators: [withStoryPad],
  parameters: {
    docs: {
      description: {
        component:
          'LED matrix fill track (phosphor canvas palette via `AV`). Prefer phosphor theme — editorial remaps CSS accents but canvas fills stay on the JS palette. Layer fills back to front by pct; later layers paint over earlier ones.',
      },
    },
  },
} satisfies Meta<typeof LedMatrixBar>

export default meta
type Story = StoryObj<typeof meta>

export const Unlit: Story = {}

export const Fill: Story = {
  args: {
    'aria-label': 'Throw 6 of 12 metres',
    fills: [{ pct: 50, color: `rgb(${AV_RGB.signalHot})` }],
  },
}

export const Layered: Story = {
  args: {
    'aria-label': 'YouTube: 8 Mbps of 15 Mbps limit',
    fills: [
      { pct: 100, color: `rgba(${AV_RGB.muted}, 0.22)` },
      { pct: 75, color: `rgba(${AV_RGB.sync}, 0.38)` },
      { pct: 45, color: `rgb(${AV_RGB.sync})` },
    ],
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('img', { name: 'YouTube: 8 Mbps of 15 Mbps limit' }),
    ).toBeVisible()
  },
}

export const OverLimit: Story = {
  args: {
    'aria-label': 'Twitch: 12 Mbps of 8 Mbps limit',
    fills: [
      { pct: 100, color: `rgba(${AV_RGB.muted}, 0.22)` },
      { pct: 55, color: `rgba(${AV_RGB.sync}, 0.38)` },
      { pct: 80, color: AV.meter },
    ],
  },
}

export const Gradient: Story = {
  args: {
    'aria-label': 'Quality',
  },
  render: args => (
    <LedMatrixBar
      {...args}
      colorForColumn={(col, cols) => {
        const hue = (col / Math.max(1, cols - 1)) * 120
        return `hsl(${hue} 78% 42%)`
      }}
    />
  ),
}
