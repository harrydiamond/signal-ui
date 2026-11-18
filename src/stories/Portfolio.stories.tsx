import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Heading,
  MediaFigure,
  MetaLabel,
  PageShell,
  PreviewCard,
  Prose,
  ProseMuted,
  SectionHeader,
  TagLink,
} from '../index.ts'
import { DEMO_COVER } from './demoCovers.ts'
import { SiteChrome, themeFromGlobals } from './ExampleChrome.tsx'

const meta = {
  title: 'Examples/Portfolio',
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { disable: true },
  },
} satisfies Meta

export default meta
type Story = StoryObj

/** Hoisted leaf — name must match the title segment. */
export const Portfolio: Story = {
  render: (_args, { globals }) => {
    const theme = themeFromGlobals(globals)
    return (
      <SiteChrome theme={theme} active="work">
        <PageShell>
          <section>
            <SectionHeader title="Selected work" pulse />
            <Heading level={1} className="mt-2">
              Projects that ship.
            </Heading>
            <ProseMuted className="mt-3">
              Soft shells, micro-labels, and nav chrome — a simple content index
              without inventing site-local Tailwind.
            </ProseMuted>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <PreviewCard padded={false} index={0}>
                <MediaFigure src={DEMO_COVER} alt="Prism cover art" fade />
                <div className="p-5">
                  <MetaLabel tone="accent">Case study</MetaLabel>
                  <Heading level={2} className="mt-2">
                    Stage delay
                  </Heading>
                  <Prose className="mt-2">
                    Instrument UI for timing cues across a live floor.
                  </Prose>
                </div>
              </PreviewCard>
              <PreviewCard index={1}>
                <MetaLabel tone="accent">Product</MetaLabel>
                <Heading level={2} className="mt-2">
                  Field notes
                </Heading>
                <Prose className="mt-2">
                  Editorial reading surfaces with soft elevation.
                </Prose>
              </PreviewCard>
              <PreviewCard index={2}>
                <MetaLabel tone="accent">System</MetaLabel>
                <Heading level={2} className="mt-2">
                  Signal kit
                </Heading>
                <Prose className="mt-2">
                  Shared primitives for phosphor tools and content sites.
                </Prose>
              </PreviewCard>
              <PreviewCard index={3} surface="transparent" padded={false}>
                <div className="border-av-hairline rounded-xl border border-dashed p-6">
                  <MetaLabel>Empty slot</MetaLabel>
                  <ProseMuted className="mt-2">
                    Transparent PreviewCard for media or collage layouts.
                  </ProseMuted>
                </div>
              </PreviewCard>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <TagLink href="#react" index={0}>
                react
              </TagLink>
              <TagLink href="#design" index={1}>
                design
              </TagLink>
              <TagLink href="#audio" index={2}>
                audio
              </TagLink>
            </div>
          </section>
        </PageShell>
      </SiteChrome>
    )
  },
}
