import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tile } from '../components/Tile.tsx'
import { withStoryPad } from './StoryPad.tsx'

function IconMark() {
  return <span className="av-icon-placeholder" />
}

const meta = {
  title: 'Components/Tile',
  component: Tile,
  decorators: [withStoryPad],
  args: {
    href: '#tile',
    title: 'Tap BPM',
    description: 'Tap a tempo. Read BPM, Hz, and note values.',
    density: 'row',
    variant: 'tool',
  },
  argTypes: {
    variant: { control: 'select', options: ['tool', 'reference'] },
    density: { control: 'select', options: ['card', 'row'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Catalog listings. Tools sit on surface; references are quieter. Row density is the home-page pattern.',
      },
    },
  },
} satisfies Meta<typeof Tile>

export default meta
type Story = StoryObj<typeof meta>

export const ToolRow: Story = {
  render: args => <Tile {...args} icon={<IconMark />} />,
}

export const ReferenceRow: Story = {
  args: {
    title: 'DMX Reference',
    description: 'Universes, start codes, and dimmer curves.',
    variant: 'reference',
  },
  render: args => <Tile {...args} icon={<IconMark />} />,
}

export const BetaRow: Story = {
  args: {
    title: 'Case Packer',
    description: 'Fit gear into a road case with foam.',
    badge: 'Beta',
  },
  render: args => <Tile {...args} icon={<IconMark />} />,
}

export const ToolCard: Story = {
  args: {
    title: 'Bitrate calculator',
    description: 'Estimate file size from codec, resolution, and duration.',
    density: 'card',
  },
  render: args => <Tile {...args} icon={<IconMark />} />,
}

export const ChildrenIcon: Story = {
  name: 'Children as icon',
  render: args => (
    <Tile {...args}>
      <IconMark />
    </Tile>
  ),
}

export const ReferenceCard: Story = {
  args: {
    title: 'Chroma subsampling',
    description: '4:4:4, 4:2:2, and 4:2:0 side by side.',
    variant: 'reference',
    density: 'card',
  },
  render: args => <Tile {...args} icon={<IconMark />} />,
}
