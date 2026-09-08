import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card, CardBody } from '../components/Card.tsx'
import { Heading } from '../components/Heading.tsx'
import { MetaLabel } from '../components/MetaLabel.tsx'
import { NavLink } from '../components/NavLink.tsx'
import { PageShell } from '../components/PageShell.tsx'
import { PreviewCard } from '../components/PreviewCard.tsx'
import { SectionHeader } from '../components/SectionHeader.tsx'
import { SiteFooter } from '../components/SiteFooter.tsx'
import { SiteNav } from '../components/SiteNav.tsx'
import { TagLink } from '../components/TagLink.tsx'
import { Theme, type ThemeName } from '../components/Theme.tsx'
import { Prose, ProseMuted } from '../components/Text.tsx'

const meta = {
  title: 'Components/PageShell',
  component: PageShell,
  parameters: {
    docs: {
      description: {
        component:
          'Main column rhythm. Compose with Theme asPage, SiteNav, and SiteFooter.',
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
              <NavLink href="#work" active>
                Work
              </NavLink>
              <NavLink href="#writing">Writing</NavLink>
            </>
          }
        />
        <PageShell>
          <section>
            <SectionHeader title="Featured" />
            <Heading level={1} className="mt-2">
              Soft-elevation cards
            </Heading>
            <ProseMuted className="mt-3">
              PageShell sets content gap and horizontal padding. Cards and
              preview shells pick up theme shadow tokens under editorial.
            </ProseMuted>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <PreviewCard index={0}>
                <Heading level={2}>Project one</Heading>
                <Prose className="mt-2">A short preview of the work.</Prose>
              </PreviewCard>
              <PreviewCard index={1}>
                <Heading level={2}>Project two</Heading>
                <Prose className="mt-2">Another soft card on the page.</Prose>
              </PreviewCard>
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
        <SiteFooter
          brand={<MetaLabel>Example Site</MetaLabel>}
          copyright="© Example"
        />
      </Theme>
    )
  },
}
