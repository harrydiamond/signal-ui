/** Chromatic snapshot modes — one capture per kit theme (and editorial dark). */
export const allModes = {
  phosphor: {
    theme: 'phosphor',
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
