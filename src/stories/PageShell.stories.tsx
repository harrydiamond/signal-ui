import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card, CardBody } from '../components/Card.tsx'
import { Heading } from '../components/Heading.tsx'
import { MetaLabel } from '../components/MetaLabel.tsx'
import { PageShell } from '../components/PageShell.tsx'
import { SiteFooter } from '../components/SiteFooter.tsx'
import { SiteNav } from '../components/SiteNav.tsx'
import { TagLink } from '../components/TagLink.tsx'
import { Theme, type ThemeName } from '../components/Theme.tsx'
import { Prose, ProseMuted } from '../components/Text.tsx'
import { cx } from '../cx.ts'

const linkClass = (active = false) =>
  cx(
    'font-mono text-[10px] tracking-[1px] uppercase transition-colors',
    active ? 'text-av-ink' : 'text-av-muted hover:text-av-ink',
  )

const meta = {
  title: 'Components/PageShell',
  component: PageShell,
  parameters: {
    docs: {
      description: {
        component:
          'Editorial-style main column rhythm. Compose with Theme asPage, SiteNav, and SiteFooter.',
      },
    },
  },
} satisfies Meta<typeof PageShell>

export default meta
type Story = StoryObj<typeof meta>

export const Composition: Story = {
  args: {},
  render: (_args, { globals }) => {
    const theme = (globals.theme as ThemeName | undefined) ?? 'phosphor'
    return (
      <Theme asPage theme={theme}>
        <SiteNav
          brand={
            <a href="#" className="flex flex-col no-underline">
              <MetaLabel tone="ink">Example Site</MetaLabel>
              <MetaLabel>Portfolio</MetaLabel>
            </a>
          }
          links={
            <>
              <a href="#work" className={linkClass(true)}>
                Work
              </a>
              <a href="#writing" className={linkClass()}>
                Writing
              </a>
            </>
          }
        />
        <PageShell>
          <section>
            <MetaLabel tone="accent">Featured</MetaLabel>
            <Heading level={1} className="mt-2">
              Soft-elevation cards
            </Heading>
            <ProseMuted className="mt-3">
              PageShell sets content gap and horizontal padding. Cards pick up
              theme shadow tokens automatically under editorial.
            </ProseMuted>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <Card className="motion-safe:animate-fade-in-up">
                <CardBody>
                  <Heading level={3}>Project one</Heading>
                  <Prose className="mt-2">A short preview of the work.</Prose>
                </CardBody>
              </Card>
              <Card
                className="motion-safe:animate-fade-in-up motion-safe:opacity-0"
                style={{ animationDelay: '75ms' }}
              >
                <CardBody>
                  <Heading level={3}>Project two</Heading>
                  <Prose className="mt-2">Another soft card on the page.</Prose>
                </CardBody>
              </Card>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <TagLink href="#react" index={0}>
                react
              </TagLink>
              <TagLink href="#design" index={1}>
                design
              </TagLink>
            </div>
          </section>
        </PageShell>
        <SiteFooter>© Example</SiteFooter>
      </Theme>
    )
  },
}
