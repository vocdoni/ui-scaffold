import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { defineConfig } from 'vitest/config'

// Generate aliases from tsconfig.paths.json
function getAliasesFromTsConfig() {
  const tsconfigPath = path.resolve(__dirname, './tsconfig.paths.json')
  const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf-8'))
  const paths = tsconfig.compilerOptions.paths
  const aliases: Record<string, string> = {}

  Object.keys(paths).forEach((alias) => {
    // Remove the /* suffix from the alias key
    const aliasKey = alias.replace(/\/\*$/, '')
    // Get the first path value (remove /* suffix and resolve)
    const aliasPath = paths[alias][0].replace(/\/\*$/, '')
    // Resolve to absolute path
    aliases[aliasKey] = path.resolve(__dirname, './src', aliasPath)
  })

  return aliases
}

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    css: true,
    exclude: ['e2e/**', 'node_modules/**', 'dist/**'],
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
    server: {
      deps: {
        inline: ['@plausible-analytics/tracker', 'react-gtm-module'],
      },
    },
  },
  resolve: {
    alias: {
      ...getAliasesFromTsConfig(),
      // Mock problematic packages for testing
      '@plausible-analytics/tracker': path.resolve(__dirname, './src/__mocks__/@plausible-analytics/tracker.ts'),
      'react-gtm-module': path.resolve(__dirname, './src/__mocks__/react-gtm-module.ts'),
    },
  },
})
