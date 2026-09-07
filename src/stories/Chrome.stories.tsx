import type { Meta, StoryObj } from '@storybook/react-vite'
import { BrandMark } from '../components/BrandMark.tsx'
import { Container } from '../components/Container.tsx'
import { Heading } from '../components/Heading.tsx'
import { Link } from '../components/Link.tsx'
import { PageHeader } from '../components/PageHeader.tsx'
import { SiteFooter } from '../components/SiteFooter.tsx'
import { SkipLink } from '../components/SkipLink.tsx'
import { ProseMuted } from '../components/Text.tsx'
import { Theme } from '../components/Theme.tsx'

const meta = {
  title: 'Components/Chrome',
  parameters: {
    docs: {
      description: {
        story: 'Skip link, page header, brand, and footer on a full page.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Page: Story = {
  render: () => (
    <Theme asPage>
      <SkipLink />
      <div className="flex-1">
        <Container>
          <PageHeader
            title="dB Calculator"
            description="Convert voltage, power, and SPL ratios to decibels."
            badge="Tool"
          />
          <Heading level={2}>Brand</Heading>
          <ProseMuted>
            Signal name, quieter white TLD. Tab once for the skip link.
          </ProseMuted>
          <p className="av-story-row" style={{ fontSize: '1.5rem' }}>
            <BrandMark />
          </p>
          <p className="av-story-row" style={{ fontSize: '1.5rem' }}>
            <BrandMark name="stage" tld=".tools" />
          </p>
        </Container>
      </div>
      <SiteFooter>
        Made by <Link href="https://harrydiamond.com">Harry Diamond</Link>
        {' · '}
        <Link href="#style">Style guide</Link>
      </SiteFooter>
    </Theme>
  ),
}
