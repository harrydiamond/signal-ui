import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card, CardBody, CardFooter } from '../components/Card.tsx'
import { Heading } from '../components/Heading.tsx'
import { List, ListRow } from '../components/List.tsx'
import { LedText, Meta as MetaLine, ProseMuted } from '../components/Text.tsx'
import { withStoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/Card',
  component: Card,
  decorators: [withStoryPad],
  parameters: {
    docs: {
      description: {
        component:
          'Each section is its own card. Packed rows use hairline dividers and LED values.',
      },
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Body: Story = {
  render: () => (
    <Card>
      <CardBody>
        <Heading level={2}>Levels</Heading>
        <ProseMuted>Stacked rows inside a surface card.</ProseMuted>
      </CardBody>
    </Card>
  ),
}

export const WithList: Story = {
  render: () => (
    <Card>
      <CardBody>
        <Heading level={2}>Levels</Heading>
        <ProseMuted>Stacked rows inside a surface card.</ProseMuted>
      </CardBody>
      <List>
        <ListRow label="Packed row label" value="+6 dB" />
        <ListRow label="Another value" value="0 dB" />
      </List>
    </Card>
  ),
}

export const WithFooter: Story = {
  render: () => (
    <Card>
      <CardBody>
        <Heading level={2}>Levels</Heading>
        <ProseMuted>Stacked rows inside a surface card.</ProseMuted>
      </CardBody>
      <List>
        <ListRow label="Packed row label" value="+6 dB" />
        <ListRow label="Another value" value="0 dB" />
      </List>
      <CardFooter>
        <MetaLine className="av-type-label">Result</MetaLine>
        <LedText hot className="av-type-readout">
          +6.02
        </LedText>
      </CardFooter>
    </Card>
  ),
}
