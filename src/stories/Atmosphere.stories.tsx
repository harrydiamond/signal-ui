import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../components/Button.tsx'
import { Card, CardBody } from '../components/Card.tsx'
import { Prose, ProseMuted } from '../components/Text.tsx'
import { Atmosphere } from './Atmosphere.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Foundations/Atmosphere',
  component: Atmosphere,
  decorators: [withStoryPad],
  parameters: {
    docs: {
      description: {
        component:
          'Quiet vignette and faint grain on the dark page plate. Editorial uses a solid page color instead — switch the Theme toolbar to compare.',
      },
    },
  },
} satisfies Meta<typeof Atmosphere>

export default meta
type Story = StoryObj<typeof meta>

export const Theme: Story = {
  render: () => (
    <Card>
      <CardBody>
        <div className="flex flex-col gap-4">
          <ProseMuted>
            Grain and vignette live on `.av-theme` (page plate, washes, and a
            faint grain background layer). Cards sit on opaque surface fill.
          </ProseMuted>
          <Prose>Tab the control below for the sync outline.</Prose>
          <div className="flex flex-wrap gap-2">
            <Button variant="primary">Tab to me</Button>
            <Button>Default</Button>
          </div>
        </div>
      </CardBody>
    </Card>
  ),
}
