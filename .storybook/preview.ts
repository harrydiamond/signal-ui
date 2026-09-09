import type { Preview, ReactRenderer } from '@storybook/react-vite'
import { withThemeByDataAttribute } from '@storybook/addon-themes'
import { allModes } from './modes.ts'
import '../src/fonts.css'
import '../src/tailwind.css'
import '../src/styles.css'
import '../src/stories/story.css'

const preview: Preview = {
  tags: ['autodocs'],
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
          ['Color', 'Tokens', 'Heading', 'Text', 'Atmosphere', 'Theme'],
          'Components',
        ],
      },
    },
  },
  initialGlobals: {
    theme: 'phosphor',
  },
  decorators: [
    // Kit themes toggle via `data-av-theme` (see Theme + styles.css), not Tailwind `.dark`.
    withThemeByDataAttribute<ReactRenderer>({
      themes: {
        phosphor: 'phosphor',
        editorial: 'editorial',
      },
      defaultTheme: 'phosphor',
      attributeName: 'data-av-theme',
    }),
  ],
}

export default preview
