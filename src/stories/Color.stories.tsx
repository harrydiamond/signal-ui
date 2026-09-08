import type { Meta, StoryObj } from '@storybook/react-vite'
import { AV } from '../tokens.ts'
import { Color } from './Color.tsx'
import { withStoryPad } from './StoryPad.tsx'

const surfaces = [
  { name: 'page', hex: AV.page, note: 'Page plate (.av-theme)' },
  { name: 'surface', hex: AV.surface, note: 'Cards, tiles' },
  { name: 'surface-2', hex: AV.surface2, note: 'Inputs, nested panels' },
  { name: 'hairline', hex: AV.hairline, note: 'Dividers only' },
  { name: 'border', hex: AV.border, note: 'Optional selection edge' },
] as const

const text = [
  { name: 'text / body', hex: AV.text, note: 'Primary copy' },
  { name: 'muted', hex: AV.muted, note: 'Labels, hints' },
] as const

const accents = [
  { name: 'signal', hex: AV.signal, note: 'Links, icons' },
  { name: 'signal-hot', hex: AV.signalHot, note: 'LED core' },
  { name: 'phosphor', hex: AV.phosphor, note: 'Readouts' },
  { name: 'phosphor-bright', hex: AV.phosphorBright, note: 'Hot digits' },
  { name: 'audio', hex: AV.audio, note: 'Selected / success' },
  { name: 'sync', hex: AV.sync, note: 'Focus + sync chips' },
  { name: 'focus', hex: AV.focus, note: 'Keyboard outline' },
  { name: 'meter', hex: AV.meter, note: 'Beta / caution' },
  { name: 'accent-soft', hex: AV.accentSoft, note: 'Rare highlight' },
  { name: 'danger', hex: AV.danger, note: 'Errors, destructive' },
] as const

const meta = {
  title: 'Foundations/Color',
  component: Color,
  decorators: [withStoryPad],
  parameters: {
    docs: {
      description: {
        component:
          'Surfaces, text, and accents. Operable chrome uses fill contrast — not a border. Hairline is structural only.',
      },
    },
  },
} satisfies Meta<typeof Color>

export default meta
type Story = StoryObj<typeof meta>

export const Surfaces: Story = {
  render: () => (
    <ul className="av-swatch-grid">
      {surfaces.map(c => (
        <Color key={c.name} {...c} />
      ))}
    </ul>
  ),
}

export const Text: Story = {
  render: () => (
    <ul className="av-swatch-grid">
      {text.map(c => (
        <Color key={c.name} {...c} sample="text" />
      ))}
    </ul>
  ),
}

export const Accents: Story = {
  render: () => (
    <ul className="av-swatch-grid">
      {accents.map(c => (
        <Color key={c.name} {...c} />
      ))}
    </ul>
  ),
}
