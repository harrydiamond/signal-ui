import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  AV_DURATION,
  AV_EASE,
  AV_RADIUS,
  AV_SPACE,
  type AvDurationName,
  type AvEaseName,
  type AvRadiusName,
  type AvSpaceName,
} from '../tokens.ts'
import { TokenSample } from './Tokens.tsx'
import { withStoryPad } from './StoryPad.tsx'
import { ProseMuted } from '../components/Text.tsx'

const spaceKeys: {
  name: AvSpaceName
  note: string
  utility: string
}[] = [
  { name: '1', note: 'Tight chrome (4px)', utility: 'p-av-1' },
  { name: '2', note: 'Chip / badge (8px)', utility: 'gap-av-2' },
  { name: '3', note: 'Control padding (12px)', utility: 'px-av-3' },
  { name: '4', note: 'Default inset / grid (16px)', utility: 'p-av-4' },
  { name: '5', note: 'Tile pad (20px)', utility: 'p-av-5' },
  { name: '6', note: 'Page chrome (24px)', utility: 'px-av-6' },
  { name: '8', note: 'Stack / dropzone (32px)', utility: 'gap-av-8' },
  { name: '10', note: 'Stack at sm (40px)', utility: 'gap-av-10' },
  { name: '12', note: 'Container vertical (48px)', utility: 'py-av-12' },
  { name: '24', note: 'Page section band (96px)', utility: 'gap-av-24' },
]

const radiusKeys: {
  name: AvRadiusName
  note: string
  utility: string
}[] = [
  { name: 'sm', note: 'Icon buttons, checkbox', utility: 'rounded-av-sm' },
  { name: 'md', note: 'Button sm/md, Chip, Badge', utility: 'rounded-av-md' },
  { name: 'lg', note: 'Card, Input, List (default)', utility: 'rounded-av-lg' },
  { name: 'xl', note: 'PreviewCard / media', utility: 'rounded-av-xl' },
  { name: 'full', note: 'Pills, Switch', utility: 'rounded-av-full' },
]

const durationKeys: {
  name: AvDurationName
  note: string
  utility: string
}[] = [
  {
    name: 'control',
    note: 'Chrome color / state',
    utility: 'duration-av-control',
  },
  { name: 'fast', note: 'Tile internals', utility: 'duration-av-fast' },
  { name: 'enter', note: 'fade-in-up', utility: 'duration-av-enter' },
  {
    name: 'stagger',
    note: 'Sequence delay (AV_STAGGER_MS)',
    utility: 'duration-av-stagger',
  },
]

const easeKeys: {
  name: AvEaseName
  note: string
  utility: string
}[] = [
  { name: 'linear', note: 'Control chrome', utility: 'ease-av-linear' },
  { name: 'out', note: 'Enter / settle', utility: 'ease-av-out' },
]

const meta = {
  title: 'Foundations/Tokens',
  component: TokenSample,
  decorators: [withStoryPad],
  parameters: {
    // Documentary chips — contrast rules don't apply to the scale itself.
    a11y: { test: 'off' },
    docs: {
      description: {
        component:
          'Shared spacing, radius, and motion scales for both themes. CSS `--av-*` custom properties map through `@theme` to utilities (`p-av-4`, `rounded-av-lg`, `duration-av-control`). JS maps (`AV_SPACE`, `AV_RADIUS`, `AV_DURATION`, `AV_EASE`) match. Components still use ad-hoc Tailwind in places — mapping chrome onto these names is a later pass.',
      },
    },
  },
} satisfies Meta<typeof TokenSample>

export default meta
type Story = StoryObj<typeof meta>

export const Spacing: Story = {
  render: () => (
    <ul className="av-swatch-grid">
      {spaceKeys.map(c => (
        <TokenSample
          key={c.name}
          name={c.name}
          value={AV_SPACE[c.name]}
          note={c.note}
          cssVar={`--av-space-${c.name}`}
          utility={c.utility}
          preview="space"
          previewValue={AV_SPACE[c.name]}
        />
      ))}
    </ul>
  ),
}

export const Radius: Story = {
  render: () => (
    <ul className="av-swatch-grid">
      {radiusKeys.map(c => (
        <TokenSample
          key={c.name}
          name={c.name}
          value={AV_RADIUS[c.name]}
          note={c.note}
          cssVar={`--av-radius-${c.name}`}
          utility={c.utility}
          preview="radius"
          previewValue={AV_RADIUS[c.name]}
        />
      ))}
    </ul>
  ),
}

export const Motion: Story = {
  render: () => (
    <div className="gap-av-6 flex flex-col">
      <ul className="av-swatch-grid">
        {durationKeys.map(c => (
          <TokenSample
            key={c.name}
            name={c.name}
            value={`${AV_DURATION[c.name]}ms`}
            note={c.note}
            cssVar={`--av-duration-${c.name}`}
            utility={c.utility}
            preview="motion"
            previewValue={`${AV_DURATION[c.name]}px`}
          />
        ))}
        {easeKeys.map(c => (
          <TokenSample
            key={c.name}
            name={c.name}
            value={AV_EASE[c.name]}
            note={c.note}
            cssVar={`--av-ease-${c.name}`}
            utility={c.utility}
            preview="motion"
            previewValue="2.5rem"
          />
        ))}
      </ul>
      <ProseMuted>
        Hover the tile to feel `duration-av-fast` + `ease-av-out`. Mapping kit
        chrome onto these names is a separate pass.
      </ProseMuted>
      <div className="rounded-av-lg bg-av-surface-2 border-av-hairline h-av-12 w-av-24 duration-av-fast ease-av-out border transition-transform hover:-translate-y-0.5" />
    </div>
  ),
}
