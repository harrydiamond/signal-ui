import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Heading,
  MediaFigure,
  MediaGrid,
  MetaLabel,
  PageShell,
  PreviewCard,
  Prose,
  ProseMuted,
  SectionHeader,
} from '../index.ts'
import { DEMO_FRAMES, demoCover } from './demoCovers.ts'
import { SiteChrome, themeFromGlobals } from './ExampleChrome.tsx'

const frames = DEMO_FRAMES.map(frame => ({
  ...frame,
  src: demoCover(frame.hue, frame.label),
  alt: `${frame.label} collection frame`,
}))

const meta = {
  title: 'Examples/Gallery',
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { disable: true },
  },
} satisfies Meta

export default meta
type Story = StoryObj

/** Hoisted leaf — name must match the title segment. */
export const Gallery: Story = {
  render: (_args, { globals }) => {
    const theme = themeFromGlobals(globals)
    return (
      <SiteChrome theme={theme} active="work">
        <PageShell>
          <section>
            <SectionHeader title="Gallery" pulse />
            <Heading level={1} className="mt-2">
              Frames from the desk.
            </Heading>
            <ProseMuted className="mt-3">
              MediaGrid is the gallery layout. Cells are MediaFigure — not a
              second card or chip. Fade belongs on activity and collection
              cards, not on every thumb.
            </ProseMuted>
            <MediaGrid className="mt-8" stagger>
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
          </section>
          <section>
            <SectionHeader title="Collections" />
            <div className="grid gap-5 md:grid-cols-2">
              <PreviewCard padded={false} index={0}>
                <MediaFigure src={frames[0].src} alt={frames[0].alt} fade />
                <div className="p-5">
                  <MetaLabel tone="accent">Collection</MetaLabel>
                  <Heading level={2} className="mt-2">
                    Mechanical Beast
                  </Heading>
                  <Prose className="mt-2">
                    Cover studies sampled from a single cartoon episode.
                  </Prose>
                </div>
              </PreviewCard>
              <PreviewCard padded={false} index={1}>
                <MediaFigure src={frames[2].src} alt={frames[2].alt} fade />
                <div className="p-5">
                  <MetaLabel tone="accent">Collection</MetaLabel>
                  <Heading level={2} className="mt-2">
                    Glitch
                  </Heading>
                  <Prose className="mt-2">
                    Bottom fade into the card surface — the activity-card
                    treatment.
                  </Prose>
                </div>
              </PreviewCard>
            </div>
          </section>
        </PageShell>
      </SiteChrome>
    )
  },
}
