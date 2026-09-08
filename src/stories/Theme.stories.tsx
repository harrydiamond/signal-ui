import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../components/Button.tsx'
import { Card, CardBody } from '../components/Card.tsx'
import { Theme } from '../components/Theme.tsx'
import { Heading } from '../components/Heading.tsx'
import { Prose, ProseMuted } from '../components/Text.tsx'

const meta = {
  title: 'Foundations/Theme',
  component: Theme,
  parameters: {
    docs: {
      description: {
        component:
          'Applies kit atmosphere, type, and focus rules. `dark` is phosphor console; `editorial` follows system light/dark with a solid page color.',
      },
    },
  },
} satisfies Meta<typeof Theme>

export default meta
type Story = StoryObj<typeof meta>

export const Dark: Story = {
  args: { theme: 'dark' },
  render: args => (
    <Theme {...args}>
      <div className="px-4 py-6">
        <Card>
          <CardBody>
            <ProseMuted>
              Dark paints the page plate, washes, grain, and focus rings.
            </ProseMuted>
            <div className="mt-5">
              <Button>Default</Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </Theme>
  ),
}

export const Editorial: Story = {
  args: { theme: 'editorial' },
  render: args => (
    <Theme {...args}>
      <div className="px-4 py-6">
        <Card>
          <CardBody>
            <Heading level={2}>Editorial</Heading>
            <ProseMuted className="mt-2">
              Solid page color, soft-elevation cards, system light/dark.
              Override `--av-font` / `--av-font-body` to inject consumer faces.
            </ProseMuted>
            <Prose className="mt-4">
              Body prose uses muted link underlines and sans headings.
            </Prose>
            <div className="mt-5">
              <Button variant="primary">Primary</Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </Theme>
  ),
}

export const AsPage: Story = {
  args: { asPage: true, theme: 'dark' },
  render: args => (
    <Theme {...args}>
      <div className="flex-1 px-4 py-6">
        <Prose>
          asPage stretches Theme to the viewport and stacks as a column.
        </Prose>
      </div>
    </Theme>
  ),
}
