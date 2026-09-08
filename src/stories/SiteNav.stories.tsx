import type { Meta, StoryObj } from '@storybook/react-vite'
import { MetaLabel } from '../components/MetaLabel.tsx'
import { SiteNav } from '../components/SiteNav.tsx'
import { Theme } from '../components/Theme.tsx'
import { cx } from '../cx.ts'

const linkClass = (active = false) =>
  cx(
    'font-mono text-[10px] tracking-[1px] uppercase transition-colors',
    active ? 'text-av-ink' : 'text-av-muted hover:text-av-ink',
  )

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

function DemoNav({ theme }: { theme: 'dark' | 'editorial' }) {
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
            <a href="#home" className={linkClass(true)}>
              Home
            </a>
            <a href="#posts" className={linkClass()}>
              Posts
            </a>
            <a href="#projects" className={linkClass()}>
              Projects
            </a>
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
}

export const Dark: Story = {
  args: {
    brand: null,
    links: null,
  },
  render: () => <DemoNav theme="dark" />,
}

export const Editorial: Story = {
  args: {
    brand: null,
    links: null,
  },
  render: () => <DemoNav theme="editorial" />,
}
