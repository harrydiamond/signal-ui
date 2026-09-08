import type { Preview } from '@storybook/react-vite'
import { RESPONSIVE_VIEWPORT_VALUE } from 'storybook/viewport'
import { AV } from '../src/tokens.ts'
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
          { value: 'dark', title: 'Dark' },
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
        dark: allModes.dark,
        editorial: allModes.editorial,
      },
    },
    a11y: {
      test: 'error',
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
          'Foundations',
          ['Color', 'Heading', 'Text', 'Atmosphere', 'Theme'],
          'Components',
        ],
      },
    },
  },
  initialGlobals: {
    theme: 'dark',
    viewport: { value: RESPONSIVE_VIEWPORT_VALUE, isRotated: false },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme ?? 'dark'
      const root = document.documentElement
      if (theme === 'editorial') {
        root.style.background = '#F0F0F0'
        root.style.colorScheme = 'light dark'
        document.body.style.background = '#F0F0F0'
      } else {
        root.style.background = AV.page
        root.style.colorScheme = 'dark'
        document.body.style.background = AV.page
      }
      document.body.style.margin = '0'
      document.body.style.minHeight = '100%'
      return Story()
    },
  ],
}

export default preview
