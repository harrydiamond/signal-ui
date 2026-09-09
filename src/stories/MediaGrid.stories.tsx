import type { Meta, StoryObj } from '@storybook/react-vite'
import { MediaFigure } from '../components/MediaFigure.tsx'
import { MediaGrid } from '../components/MediaGrid.tsx'
import { DEMO_FRAMES, demoCover } from './demoCovers.ts'
import { withStoryPad } from './StoryPad.tsx'

const frames = DEMO_FRAMES.map(frame => ({
  ...frame,
  src: demoCover(frame.hue, frame.label),
  alt: `${frame.label} collection frame`,
}))

const meta = {
  title: 'Components/MediaGrid',
  component: MediaGrid,
  decorators: [withStoryPad],
  parameters: {
    docs: {
      description: {
        component:
          'Gallery-style responsive grid. Default matches harrydiamond.com `/gallery/all` (2 / 3 / 4 columns). `compact` is the denser thumb strip. Put `MediaFigure` in as children — this is layout, not a second card. Lightbox / Dialog is out of scope; wrap items in your own links or buttons when you add overlays.',
      },
    },
  },
} satisfies Meta<typeof MediaGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Grid: Story = {
  args: { children: null },
  render: () => (
    <MediaGrid>
      {frames.map(frame => (
        <MediaFigure
          key={frame.label}
          src={frame.src}
          alt={frame.alt}
          aspect="square"
          radius="sm"
        />
      ))}
    </MediaGrid>
  ),
}

export const Compact: Story = {
  args: { children: null, layout: 'compact' },
  render: () => (
    <MediaGrid layout="compact">
      {frames.map(frame => (
        <MediaFigure
          key={frame.label}
          src={frame.src}
          alt={frame.alt}
          aspect="square"
          radius="sm"
        />
      ))}
    </MediaGrid>
  ),
}

export const Staggered: Story = {
  args: { children: null, stagger: true },
  render: () => (
    <MediaGrid stagger>
      {frames.map(frame => (
        <MediaFigure
          key={frame.label}
          src={frame.src}
          alt={frame.alt}
          aspect="square"
          radius="sm"
        />
      ))}
    </MediaGrid>
  ),
}

export const Linked: Story = {
  args: { children: null },
  render: () => (
    <MediaGrid>
      {frames.map(frame => (
        <a
          key={frame.label}
          href={`#${frame.label.toLowerCase()}`}
          className="block"
        >
          <MediaFigure
            src={frame.src}
            alt={frame.alt}
            aspect="square"
            radius="sm"
          />
        </a>
      ))}
    </MediaGrid>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Wrap each `MediaFigure` in your own link or button. MediaGrid only lays out list items — it does not own click or lightbox behavior.',
      },
    },
  },
}
