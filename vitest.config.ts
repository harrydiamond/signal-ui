/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Vite Plugin types are structurally version-bound: @vitejs/plugin-react@6 ships Vite 8
  // Plugin typings, while vitest (under bun) may still resolve Vite 7's Plugin — TS then
  // rejects react() as incompatible. Cast until versions align.
  plugins: [react() as never],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    css: false,
  },
})
