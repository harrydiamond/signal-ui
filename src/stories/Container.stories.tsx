import type { Meta, StoryObj } from '@storybook/react-vite'
import { Container } from '../components/Container.tsx'
import { Prose, ProseMuted } from '../components/Text.tsx'
import { StoryPad } from './StoryPad.tsx'

const meta = {
  title: 'Components/Container',
  component: Container,
  decorators: [
    (Story, context) => (
      <StoryPad pad={false} asPage={context.viewMode === 'story'}>
        <Story />
      </StoryPad>
    ),
  ],
  argTypes: {
    width: {
      control: 'select',
      options: ['default', 'wide', 'wider'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Centered content column. default is max-w-3xl, wide is max-w-5xl, wider is max-w-7xl.',
      },
    },
  },
} satisfies Meta<typeof Container>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Container>
      <Prose>Default column — same width as a typical tool page.</Prose>
      <ProseMuted>max-w-3xl with page padding.</ProseMuted>
    </Container>
  ),
}

export const Wide: Story = {
  args: { width: 'wide' },
  render: args => (
    <Container {...args}>
      <Prose>Wide column for denser charts and tables.</Prose>
      <ProseMuted>max-w-5xl.</ProseMuted>
    </Container>
  ),
}

export const Wider: Story = {
  args: { width: 'wider' },
  render: args => (
    <Container {...args}>
      <Prose>Extra-wide column for multi-pane tools.</Prose>
      <ProseMuted>max-w-7xl.</ProseMuted>
    </Container>
  ),
}
