import type { Meta, StoryObj } from '@storybook/react-vite'
import { Link } from '../components/Link.tsx'
import { SiteFooter } from '../components/SiteFooter.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/SiteFooter',
  component: SiteFooter,
  decorators: [withStoryPad],
} satisfies Meta<typeof SiteFooter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        Made by <Link href="https://harrydiamond.com">Harry Diamond</Link>
        {' · '}
        <Link href="#style">Style guide</Link>
      </>
    ),
  },
}
