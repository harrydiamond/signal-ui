import type { Meta, StoryObj } from '@storybook/react-vite'
import { MetaLabel } from '../components/MetaLabel.tsx'
import { NavLink } from '../components/NavLink.tsx'
import { SiteFooter } from '../components/SiteFooter.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/SiteFooter',
  component: SiteFooter,
  decorators: [withStoryPad],
  parameters: {
    docs: {
      description: {
        component:
          'Simple centered children, or brand / links / copyright slots for content sites.',
      },
    },
  },
} satisfies Meta<typeof SiteFooter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: '© Example',
  },
}

export const Slotted: Story = {
  args: {},
  render: () => (
    <SiteFooter
      brand={<MetaLabel>Built for signal</MetaLabel>}
      links={
        <>
          <NavLink href="#gear">Gear</NavLink>
          <NavLink href="#github">GitHub</NavLink>
        </>
      }
      copyright="© 2026"
    />
  ),
}
