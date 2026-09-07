import type { Meta, StoryObj } from '@storybook/react-vite'
import { LedText, Meta as MetaLine, Prose, ProseMuted } from '../components/Text.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Foundations/Text',
  component: Prose,
  decorators: [withStoryPad],
  parameters: {
    docs: {
      description: {
        component:
          'IBM Plex Mono for body, captions, and micro chrome. Doto for LED readouts.',
      },
    },
  },
} satisfies Meta<typeof Prose>

export default meta
type Story = StoryObj<typeof meta>

export const Body: Story = {
  render: () => (
    <Prose>
      Body paragraph for primers and blurbs. Prefer this over muted gray so Plex
      stays readable at length. Use <strong>strong</strong> for emphasis inside
      a sentence.
    </Prose>
  ),
}

export const Muted: Story = {
  render: () => (
    <ProseMuted>
      Secondary caption or section intro — warmer than instrument muted, still
      quieter than body.
    </ProseMuted>
  ),
}

export const Micro: Story = {
  render: () => (
    <MetaLine className="av-type-meta">
      ~100% of an I · Plex Mono chrome
    </MetaLine>
  ),
}

export const Led: Story = {
  render: () => <LedText className="av-type-readout">128.000</LedText>,
}

export const LedHot: Story = {
  render: () => (
    <LedText hot className="av-type-readout">
      128.000
    </LedText>
  ),
}

export const InlineLink: Story = {
  render: () => (
    <Prose>
      Inline links use signal orange so they stand out from cream body text.{' '}
      <a href="#color">Home</a>
      {' · '}
      <a href="#color">DMX Reference</a>
    </Prose>
  ),
}
