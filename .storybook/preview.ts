import type { Preview } from '@storybook/react-vite'
import { RESPONSIVE_VIEWPORT_VALUE } from 'storybook/viewport'
import { AV } from '../src/tokens.ts'
import '../src/fonts.css'
import '../src/tailwind.css'
import '../src/styles.css'
import '../src/stories/story.css'

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      options: {
        avtech: { name: 'avtech', value: AV.page },
        surface: { name: 'surface', value: AV.surface },
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
    backgrounds: { value: 'avtech' },
    viewport: { value: RESPONSIVE_VIEWPORT_VALUE, isRotated: false },
  },
  decorators: [
    Story => {
      const root = document.documentElement
      root.style.background = AV.page
      root.style.colorScheme = 'dark'
      document.body.style.background = AV.page
      document.body.style.margin = '0'
      document.body.style.minHeight = '100%'
      return Story()
    },
  ],
}

export default preview
