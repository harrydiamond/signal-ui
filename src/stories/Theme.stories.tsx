import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../components/Button.tsx'
import { Card, CardBody } from '../components/Card.tsx'
import { Theme } from '../components/Theme.tsx'
import { Prose, ProseMuted } from '../components/Text.tsx'

const meta = {
  title: 'Foundations/Theme',
  component: Theme,
  parameters: {
    docs: {
      description: {
        component:
          'Applies the avtech atmosphere, type, and focus rules. Use asPage for full-viewport chrome.',
      },
    },
  },
} satisfies Meta<typeof Theme>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Theme>
      <div className="px-4 py-6">
        <Card>
          <CardBody>
            <ProseMuted>
              Theme paints the page plate, washes, grain, and focus rings.
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

export const AsPage: Story = {
  args: { asPage: true },
  render: args => (
    <Theme {...args}>
      <div className="flex-1 px-4 py-6">
        <Prose>asPage stretches Theme to the viewport and stacks as a column.</Prose>
      </div>
    </Theme>
  ),
}
