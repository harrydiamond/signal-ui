import type { Meta, StoryObj } from '@storybook/react-vite'
import { Heading } from '../components/Heading.tsx'
import { MediaFigure } from '../components/MediaFigure.tsx'
import { MetaLabel } from '../components/MetaLabel.tsx'
import { PreviewCard } from '../components/PreviewCard.tsx'
import { ProseMuted } from '../components/Text.tsx'
import { demoCover } from './demoCovers.ts'
import { withStoryPad } from './StoryPad.tsx'

const cover = demoCover(12, 'Activity')

const meta = {
  title: 'Components/MediaFigure',
  component: MediaFigure,
  decorators: [withStoryPad],
  args: {
    src: cover,
    alt: 'Abstract cover for an activity card',
    fade: false,
    aspect: '4/3',
  },
  argTypes: {
    aspect: {
      control: 'select',
      options: ['4/3', '16/9', '21/9', 'square', 'auto'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Image or video plane for activity cards and gallery cells. Optional `fade` is the harrydiamond.com bottom wash into `--av-surface` — it re-themes on phosphor (dark surface) and editorial light/dark. Compose inside `PreviewCard padded={false}` rather than a second media slot. Pass `<video>` (or `<picture>`) as children when you need a motion plane.',
      },
    },
  },
} satisfies Meta<typeof MediaFigure>

export default meta
type Story = StoryObj<typeof meta>

export const Image: Story = {}

export const Fade: Story = {
  args: { fade: true },
  parameters: {
    docs: {
      description: {
        story:
          'Activity-card treatment: gradient from `--av-surface` at the bottom so the plane melts into the card body.',
      },
    },
  },
}

export const FadeOff: Story = {
  args: { fade: false, aspect: 'square' },
}

export const Caption: Story = {
  args: {
    fade: true,
    caption: 'Cover Art — January 2026',
  },
}

export const Video: Story = {
  args: { children: null },
  render: () => (
    <MediaFigure aspect="16/9">
      <img src={demoCover(200, 'Tape')} alt="Process recording poster" />
    </MediaFigure>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Children replace the generated image — same slot as `<video>` or `<picture>`. Prefer a real video element with captions in the app; this specimen uses a poster still so a11y checks stay green.',
      },
    },
  },
}

export const InPreviewCard: Story = {
  args: { fade: true },
  render: () => (
    <PreviewCard padded={false} className="max-w-sm">
      <MediaFigure src={cover} alt="January cover art" fade />
      <div className="p-5">
        <MetaLabel tone="accent">artwork</MetaLabel>
        <Heading level={3} className="mt-2">
          Cover Art — January 2026
        </Heading>
        <ProseMuted className="mt-2">
          Collection of pieces created in January 2026.
        </ProseMuted>
      </div>
    </PreviewCard>
  ),
}
