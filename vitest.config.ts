import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'vitest.setup.ts',
        'src/test-utils.tsx',
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        '**/types/**',
      ],
    },
  },
  resolve: {
    alias: {
      '~components': path.resolve(__dirname, './src/components'),
      '~queries': path.resolve(__dirname, './src/queries'),
      '~utils': path.resolve(__dirname, './src/utils'),
      '~theme': path.resolve(__dirname, './src/theme'),
      '~i18n': path.resolve(__dirname, './src/i18n'),
      '~constants': path.resolve(__dirname, './src/constants'),
      '~routes': path.resolve(__dirname, './src/router/routes.tsx'),
      '~elements': path.resolve(__dirname, './src/elements'),
    },
  },
})
