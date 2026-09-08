import type { Meta, StoryObj } from '@storybook/react-vite'
import { MetaLabel } from '../components/MetaLabel.tsx'
import { NavLink } from '../components/NavLink.tsx'
import { SiteNav } from '../components/SiteNav.tsx'
import { Theme, type ThemeName } from '../components/Theme.tsx'

const meta = {
  title: 'Components/SiteNav',
  component: SiteNav,
  parameters: {
    docs: {
      description: {
        component:
          'Sticky frosted header shell. Pass brand and link nodes — no hardcoded routes.',
      },
    },
  },
} satisfies Meta<typeof SiteNav>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    brand: null,
    links: null,
  },
  render: (_args, { globals }) => {
    const theme = (globals.theme as ThemeName | undefined) ?? 'phosphor'
    return (
      <Theme asPage theme={theme}>
        <SiteNav
          brand={
            <a href="#" className="flex flex-col no-underline">
              <MetaLabel tone="ink">Signal UI</MetaLabel>
              <MetaLabel>Design kit</MetaLabel>
            </a>
          }
          links={
            <>
              <NavLink href="#home" active>
                Home
              </NavLink>
              <NavLink href="#posts">Posts</NavLink>
              <NavLink href="#projects">Projects</NavLink>
            </>
          }
        />
        <div className="flex-1 px-6 py-10">
          <p className="text-av-muted font-mono text-xs tracking-[1px] uppercase">
            Resize below md to open the mobile drawer.
          </p>
        </div>
      </Theme>
    )
  },
}
