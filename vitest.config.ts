/// <reference types="vitest/config" />
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'
import { allModes } from './.storybook/modes.ts'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const configDir = path.join(dirname, '.storybook')

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  // Vite Plugin types are structurally version-bound: @vitejs/plugin-react@6 ships Vite 8
  // Plugin typings, while vitest (under bun) may still resolve Vite 7's Plugin — TS then
  // rejects react() as incompatible. Cast until versions align.
  plugins: [react() as never],
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'jsdom',
          setupFiles: ['./vitest.setup.ts'],
          include: ['src/**/*.{test,spec}.{ts,tsx}'],
          css: false,
        },
      },
      // One project per Chromatic mode — pins globals + Playwright color-scheme for a11y.
      ...Object.entries(allModes).map(([name, globals]) => ({
        extends: true as const,
        plugins: [
          storybookTest({
            configDir,
            initialGlobals: globals,
          }),
        ],
        test: {
          name: `storybook-${name}`,
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({
              contextOptions: { colorScheme: globals.colorScheme },
            }),
            instances: [{ browser: 'chromium' }],
          },
        },
      })),
    ],
  },
})
