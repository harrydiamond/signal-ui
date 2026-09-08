/** Shared Storybook modes for Chromatic snapshots and Vitest a11y projects. */
export const allModes = {
  phosphor: {
    theme: 'phosphor',
    colorScheme: 'dark',
  },
  editorial: {
    theme: 'editorial',
    colorScheme: 'light',
  },
  'editorial-dark': {
    theme: 'editorial',
    colorScheme: 'dark',
  },
} as const

export type StorybookModeName = keyof typeof allModes
