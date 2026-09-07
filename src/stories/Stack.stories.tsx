import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card, CardBody } from '../components/Card.tsx'
import { Stack } from '../components/Container.tsx'
import { Prose, ProseMuted } from '../components/Text.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/Stack',
  component: Stack,
  decorators: [withStoryPad],
  parameters: {
    docs: {
      description: {
        component: 'Vertical stack with page-scale gaps between sections.',
      },
    },
  },
} satisfies Meta<typeof Stack>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Stack>
      <Prose>First block in the stack.</Prose>
      <Card>
        <CardBody>
          <ProseMuted>Second block — a card sitting in the same column.</ProseMuted>
        </CardBody>
      </Card>
      <ProseMuted>Third block after the default gap.</ProseMuted>
    </Stack>
  ),
}
