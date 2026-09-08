import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  BackLink,
  Heading,
  Link,
  MetaLabel,
  PageShell,
  PreviewCard,
  Prose,
  ProseMuted,
  SectionHeader,
  TagLink,
} from '../index.ts'
import { SiteChrome, themeFromGlobals } from './ExampleChrome.tsx'

const meta = {
  title: 'Examples/Article',
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { disable: true },
  },
} satisfies Meta

export default meta
type Story = StoryObj

export const Article: Story = {
  render: (_args, { globals }) => {
    const theme = themeFromGlobals(globals)
    return (
      <SiteChrome theme={theme} active="writing">
        <PageShell>
          <article>
            <BackLink href="#writing">Writing</BackLink>
            <MetaLabel tone="accent">Essay</MetaLabel>
            <Heading level={1} className="mt-2">
              Soft elevation beats hairlines
            </Heading>
            <ProseMuted className="mt-3">
              Published 8 Sep 2026 · 6 min read
            </ProseMuted>
            <Prose className="mt-8">
              Content surfaces need quiet depth, not console chrome. Under
              editorial, cards and lists drop hard borders for soft shadow so
              reading stays calm. Phosphor keeps the instrument language when
              you need meters and pads.
            </Prose>
            <Prose className="mt-4">
              Use <strong>PreviewCard</strong> for teaser grids,{' '}
              <strong>SectionHeader</strong> for labeled bands, and{' '}
              <strong>TagLink</strong> for topic chips. Keep MetaLabel mono —
              it is the micro-label recipe, not body copy.
            </Prose>
            <div className="mt-8 flex flex-wrap gap-2">
              <TagLink href="#editorial" symbol={null}>
                editorial
              </TagLink>
              <TagLink href="#type" symbol={null}>
                type
              </TagLink>
            </div>
          </article>
          <section className="mt-12">
            <SectionHeader
              title="Related"
              action={
                <Link href="#writing" className="text-xs">
                  View all
                </Link>
              }
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <PreviewCard index={0}>
                <Heading level={2}>Theme tokens</Heading>
                <ProseMuted className="mt-2">
                  Heading and body faces as two CSS variables.
                </ProseMuted>
              </PreviewCard>
              <PreviewCard index={1}>
                <Heading level={2}>Nav recipes</Heading>
                <ProseMuted className="mt-2">
                  NavLink, BackLink, and SiteNav without story-local classes.
                </ProseMuted>
              </PreviewCard>
            </div>
          </section>
        </PageShell>
      </SiteChrome>
    )
  },
}
