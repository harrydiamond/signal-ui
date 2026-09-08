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
    theme: 'phosphor',
    viewport: { value: RESPONSIVE_VIEWPORT_VALUE, isRotated: false },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme ?? 'phosphor'
      const colorScheme = context.globals.colorScheme as
        'light' | 'dark' | undefined
      const root = document.documentElement
      if (theme === 'editorial') {
        const preferDark =
          colorScheme === 'dark' ||
          (colorScheme !== 'light' &&
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
        const page = preferDark ? '#161618' : '#F0F0F0'
        root.style.background = page
        root.style.colorScheme = preferDark ? 'dark' : 'light'
        document.body.style.background = page
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
