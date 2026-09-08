import type { Preview } from '@storybook/react-vite'
import { allModes } from './modes.ts'
import '../src/fonts.css'
import '../src/tailwind.css'
import '../src/styles.css'
import '../src/stories/story.css'

const preview: Preview = {
  tags: ['autodocs'],
  globalTypes: {
    theme: {
      description: 'Kit theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'phosphor', title: 'Phosphor' },
          { value: 'editorial', title: 'Editorial' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    layout: 'fullscreen',
    // Theme toolbar owns the canvas plate — hide Storybook backgrounds.
    backgrounds: { disable: true },
    chromatic: {
      modes: {
        phosphor: allModes.phosphor,
        editorial: allModes.editorial,
        'editorial-dark': allModes['editorial-dark'],
      },
    },
    a11y: {
      test: 'error',
      // Keep axe payloads small for Vitest — full `passes` arrays can OOM large runs.
      options: {
        resultTypes: ['violations', 'incomplete'],
      },
    },
    docs: {
      story: {
        inline: true,
        height: 'auto',
      },
    },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Examples',
          ['Portfolio', 'Article', 'Instrument', 'Settings', 'Studio'],
          'Foundations',
          ['Color', 'Heading', 'Text', 'Atmosphere', 'Theme'],
          'Components',
        ],
      },
    },
  },
  initialGlobals: {
    theme: 'phosphor',
  },
}

export default preview
