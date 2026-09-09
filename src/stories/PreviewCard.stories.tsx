import type { Meta, StoryObj } from '@storybook/react-vite'
import { Heading } from '../components/Heading.tsx'
import { MediaFigure } from '../components/MediaFigure.tsx'
import { MetaLabel } from '../components/MetaLabel.tsx'
import { PreviewCard } from '../components/PreviewCard.tsx'
import { ProseMuted } from '../components/Text.tsx'
import { demoCover } from './demoCovers.ts'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/PreviewCard',
  component: PreviewCard,
  decorators: [withStoryPad],
  parameters: {
    docs: {
      description: {
        component:
          'Soft-elevation preview shell with opaque `--av-surface` fill, padding / transparent surfaces, and optional stagger. For a media plane, compose `MediaFigure fade` as a child (`padded={false}`) — the wash matches the card body. There is no separate PreviewCard media slot.',
      },
    },
  },
} satisfies Meta<typeof PreviewCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: null },
  render: () => (
    <PreviewCard>
      <MetaLabel tone="accent">Projects</MetaLabel>
      <Heading level={3} className="mt-2">
        Soft elevation
      </Heading>
      <ProseMuted className="mt-2">
        Preview card with default padding.
      </ProseMuted>
    </PreviewCard>
  ),
}

export const Staggered: Story = {
  args: { children: null },
  render: () => (
    <div className="grid gap-4 sm:grid-cols-2">
      {['Alpha', 'Beta', 'Gamma', 'Delta'].map((title, index) => (
        <PreviewCard key={title} index={index}>
          <Heading level={3}>{title}</Heading>
          <ProseMuted className="mt-2">Staggered fade-in-up.</ProseMuted>
        </PreviewCard>
      ))}
    </div>
  ),
}

export const Transparent: Story = {
  args: { children: null },
  render: () => (
    <PreviewCard surface="transparent" padded={false}>
      <MediaFigure
        src={demoCover(168, 'Glitch')}
        alt="Glitch collection frame"
        aspect="16/9"
      />
      <div className="p-4">
        <Heading level={3}>Transparent shell</Heading>
      </div>
    </PreviewCard>
  ),
}
