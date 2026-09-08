import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  AV,
  AV_EDITORIAL,
  AV_EDITORIAL_DARK,
  type AvColorName,
} from '../tokens.ts'
import { themeFromGlobals } from './ExampleChrome.tsx'
import { Color } from './Color.tsx'
import { withStoryPad } from './StoryPad.tsx'

type Palette = Record<AvColorName, string>

function colorSchemeFromGlobals(globals: {
  colorScheme?: string
}): 'light' | 'dark' {
  if (globals.colorScheme === 'light' || globals.colorScheme === 'dark') {
    return globals.colorScheme
  }
  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark'
  }
  return 'light'
}

function paletteFromGlobals(globals: {
  theme?: string
  colorScheme?: string
}): Palette {
  const theme = themeFromGlobals(globals)
  if (theme === 'editorial') {
    return colorSchemeFromGlobals(globals) === 'dark'
      ? AV_EDITORIAL_DARK
      : AV_EDITORIAL
  }
  return AV
}

const surfaceKeys = [
  { name: 'page', key: 'page', note: 'Page plate (.av-theme)' },
  { name: 'surface', key: 'surface', note: 'Cards, tiles' },
  { name: 'surface-2', key: 'surface2', note: 'Inputs, nested panels' },
  { name: 'hairline', key: 'hairline', note: 'Dividers only' },
  { name: 'border', key: 'border', note: 'Optional selection edge' },
] as const

const textKeys = [
  { name: 'text / body', key: 'text', note: 'Primary copy' },
  { name: 'muted', key: 'muted', note: 'Labels, hints' },
] as const

const accentKeys = [
  { name: 'signal', key: 'signal', note: 'Links, icons' },
  { name: 'signal-hot', key: 'signalHot', note: 'LED core' },
  { name: 'phosphor', key: 'phosphor', note: 'Readouts' },
  { name: 'phosphor-bright', key: 'phosphorBright', note: 'Hot digits' },
  { name: 'audio', key: 'audio', note: 'Selected / success' },
  { name: 'sync', key: 'sync', note: 'Focus + sync chips' },
  { name: 'focus', key: 'focus', note: 'Keyboard outline' },
  { name: 'meter', key: 'meter', note: 'Beta / caution' },
  { name: 'accent-soft', key: 'accentSoft', note: 'Rare highlight' },
  { name: 'danger', key: 'danger', note: 'Errors, destructive' },
] as const

const meta = {
  title: 'Foundations/Color',
  component: Color,
  decorators: [withStoryPad],
  parameters: {
    // Swatches are documentary chips — contrast rules don't apply to the palette itself.
    a11y: { test: 'off' },
    docs: {
      description: {
        component:
          'Surfaces, text, and accents for the active kit theme (toolbar + system/Chromatic color scheme). Operable chrome uses fill contrast — not a border. Hairline is structural only.',
      },
    },
  },
} satisfies Meta<typeof Color>

export default meta
type Story = StoryObj<typeof meta>

export const Surfaces: Story = {
  render: (_args, { globals }) => {
    const palette = paletteFromGlobals(globals)
    return (
      <ul className="av-swatch-grid">
        {surfaceKeys.map(c => (
          <Color key={c.name} name={c.name} hex={palette[c.key]} note={c.note} />
        ))}
      </ul>
    )
  },
}

export const Text: Story = {
  render: (_args, { globals }) => {
    const palette = paletteFromGlobals(globals)
    return (
      <ul className="av-swatch-grid">
        {textKeys.map(c => (
          <Color
            key={c.name}
            name={c.name}
            hex={palette[c.key]}
            note={c.note}
            sample="text"
          />
        ))}
      </ul>
    )
  },
}

export const Accents: Story = {
  render: (_args, { globals }) => {
    const palette = paletteFromGlobals(globals)
    return (
      <ul className="av-swatch-grid">
        {accentKeys.map(c => (
          <Color key={c.name} name={c.name} hex={palette[c.key]} note={c.note} />
        ))}
      </ul>
    )
  },
}
