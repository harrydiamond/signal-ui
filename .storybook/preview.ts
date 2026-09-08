import type { Preview } from '@storybook/react-vite'
import { DecoratorHelpers } from '@storybook/addon-themes'
import { Theme, type ThemeName } from '../src/components/Theme.tsx'
import { allModes } from './modes.ts'
import '../src/fonts.css'
import '../src/tailwind.css'
import '../src/styles.css'
import '../src/stories/story.css'

const { initializeThemeState, pluckThemeFromContext } = DecoratorHelpers

initializeThemeState(['phosphor', 'editorial'], 'phosphor')

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
          ['Color', 'Heading', 'Text', 'Atmosphere', 'Theme'],
          'Components',
        ],
      },
    },
  },
  initialGlobals: {
    theme: 'phosphor',
  },
  decorators: [
    // Wrap the story only — never set data-av-theme on <html>, or kit type
    // rules restyle Storybook’s own preview/docs chrome.
    (Story, context) => {
      const themeOverride = context.parameters.themes?.themeOverride as
        | ThemeName
        | undefined
      const selected = pluckThemeFromContext(context) as ThemeName | ''
      const theme = (themeOverride || selected || 'phosphor') as ThemeName

      if (typeof document !== 'undefined') {
        document.documentElement.removeAttribute('data-av-theme')
      }

      return (
        <Theme asPage={context.viewMode === 'story'} theme={theme}>
          <Story />
        </Theme>
      )
    },
  ],
}

export default preview
